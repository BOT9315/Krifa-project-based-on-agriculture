import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import twilio from "twilio";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT || 3000;
const DB_PATH = "./sqlite.db";

// Twilio configuration
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const TWILIO_PHONE_NUMBER = process.env.TWILIO_NUMBER;

// Initialize SQLite database
const db = new Database(DB_PATH, { verbose: console.log });

// Database setup
const createTables = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      phoneNumber TEXT UNIQUE,
      onboardingCompleted BOOLEAN DEFAULT FALSE,
      state TEXT,
      district TEXT,
      village TEXT,
      farmSize TEXT,
      farmSizeUnit TEXT,
      landOwnership TEXT,
      yearsOfExperience TEXT,
      primaryCrops TEXT,
      farmingType TEXT,
      irrigationMethod TEXT,
      primaryGoals TEXT,
      budgetRange TEXT,
      technologyComfort TEXT,
      preferredLanguage TEXT,
      dateOfBirth TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      userId TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    -- IoT Tables
    CREATE TABLE IF NOT EXISTS iot_devices (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      location TEXT,
      status TEXT DEFAULT 'offline',
      lastSeen DATETIME,
      batteryLevel REAL,
      firmwareVersion TEXT,
      userId TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS iot_sensors (
      id TEXT PRIMARY KEY,
      deviceId TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      unit TEXT NOT NULL,
      minThreshold REAL,
      maxThreshold REAL,
      alertEnabled BOOLEAN DEFAULT TRUE,
      calibrationOffset REAL DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (deviceId) REFERENCES iot_devices(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS sensor_readings (
      id TEXT PRIMARY KEY,
      sensorId TEXT NOT NULL,
      value REAL NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      quality TEXT DEFAULT 'good',
      metadata TEXT,
      FOREIGN KEY (sensorId) REFERENCES iot_sensors(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS iot_alerts (
      id TEXT PRIMARY KEY,
      deviceId TEXT NOT NULL,
      sensorId TEXT,
      type TEXT NOT NULL,
      severity TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      value REAL,
      threshold REAL,
      acknowledged BOOLEAN DEFAULT FALSE,
      acknowledgedAt DATETIME,
      acknowledgedBy TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      resolvedAt DATETIME,
      FOREIGN KEY (deviceId) REFERENCES iot_devices(id) ON DELETE CASCADE,
      FOREIGN KEY (sensorId) REFERENCES iot_sensors(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS iot_automations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      triggerType TEXT NOT NULL,
      triggerCondition TEXT NOT NULL,
      actions TEXT NOT NULL,
      enabled BOOLEAN DEFAULT TRUE,
      userId TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      lastExecuted DATETIME,
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS iot_dashboards (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      userId TEXT NOT NULL,
      widgets TEXT NOT NULL,
      layout TEXT DEFAULT 'grid',
      refreshInterval INTEGER DEFAULT 30,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS iot_device_configs (
      id TEXT PRIMARY KEY,
      deviceId TEXT NOT NULL,
      config TEXT NOT NULL,
      appliedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      appliedBy TEXT NOT NULL,
      FOREIGN KEY (deviceId) REFERENCES iot_devices(id) ON DELETE CASCADE
    );

    -- Create indexes for better performance
    CREATE INDEX IF NOT EXISTS idx_iot_devices_user ON iot_devices(userId);
    CREATE INDEX IF NOT EXISTS idx_iot_sensors_device ON iot_sensors(deviceId);
    CREATE INDEX IF NOT EXISTS idx_sensor_readings_sensor ON sensor_readings(sensorId);
    CREATE INDEX IF NOT EXISTS idx_sensor_readings_timestamp ON sensor_readings(timestamp);
    CREATE INDEX IF NOT EXISTS idx_iot_alerts_device ON iot_alerts(deviceId);
    CREATE INDEX IF NOT EXISTS idx_iot_alerts_acknowledged ON iot_alerts(acknowledged);
  `);
};

createTables();

// Prepared statements
const statements = {
  insertUser: db.prepare(`
    INSERT INTO users (id, name, email, phoneNumber, onboardingCompleted)
    VALUES (?, ?, ?, ?, ?)
  `),
  getUserByEmail: db.prepare("SELECT * FROM users WHERE email = ?"),
  getUserByPhone: db.prepare("SELECT * FROM users WHERE phoneNumber = ?"),
  getUserById: db.prepare("SELECT * FROM users WHERE id = ?"),
  updateUser: db.prepare(`
    UPDATE users SET name = ?, email = ?, phoneNumber = ?, onboardingCompleted = ?,
    state = ?, district = ?, village = ?, farmSize = ?, farmSizeUnit = ?, landOwnership = ?,
    yearsOfExperience = ?, primaryCrops = ?, farmingType = ?, irrigationMethod = ?,
    primaryGoals = ?, budgetRange = ?, technologyComfort = ?, preferredLanguage = ?, dateOfBirth = ?
    WHERE id = ?
  `),
  insertSession: db.prepare("INSERT INTO sessions (token, userId) VALUES (?, ?)"),
  getSession: db.prepare("SELECT * FROM sessions WHERE token = ?"),
  deleteSession: db.prepare("DELETE FROM sessions WHERE token = ?"),
};

// Helper functions
const sanitizeForSQLite = (value) => {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (Buffer.isBuffer(value)) return value;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value) || typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const parseUserFields = (user) => ({
  ...user,
  primaryCrops: user.primaryCrops ? JSON.parse(user.primaryCrops) : [],
  primaryGoals: user.primaryGoals ? JSON.parse(user.primaryGoals) : [],
  onboardingCompleted: !!user.onboardingCompleted,
});

// In-memory storage for OTP (temporary demo) with expiration
const phoneOtps = new Map(); // Structure: { phoneNumber: { otp, expiresAt } }

// Auth logic
const auth = {
  signUp: (email, password, name) => {
    const existingUser = statements.getUserByEmail.get(email);
    if (existingUser) throw new Error("User already exists");

    const userId = Math.random().toString(36).substr(2, 9);
    const user = { id: userId, name, email, onboardingCompleted: false };

    statements.insertUser.run(
      sanitizeForSQLite(userId),
      sanitizeForSQLite(name),
      sanitizeForSQLite(email),
      sanitizeForSQLite(null),
      sanitizeForSQLite(false)
    );

    const token = Math.random().toString(36).substr(2, 15);
    statements.insertSession.run(sanitizeForSQLite(token), sanitizeForSQLite(userId));

    return { user, token };
  },

  signIn: (email, password) => {
    const user = statements.getUserByEmail.get(email);
    if (!user) throw new Error("Invalid credentials");

    const parsedUser = parseUserFields(user);
    const token = Math.random().toString(36).substr(2, 15);
    statements.insertSession.run(sanitizeForSQLite(token), sanitizeForSQLite(user.id));

    return { user: parsedUser, token };
  },

  requestPhoneOtp: async (phoneNumber) => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      
      phoneOtps.set(phoneNumber, { otp, expiresAt });
      
      // Send SMS via Twilio
      await twilioClient.messages.create({
        body: `Your Krifa verification code is: ${otp}. This code will expire in 10 minutes.`,
        from: TWILIO_PHONE_NUMBER,
        to: `+91${phoneNumber}`
      });
      
      console.log(`OTP sent to ${phoneNumber}: ${otp} (expires at ${expiresAt})`);
      return { success: true, message: "OTP sent successfully" };
    } catch (error) {
      console.error("Failed to send OTP:", error);
      throw new Error("Failed to send OTP. Please try again.");
    }
  },

  signInWithPhone: (phoneNumber, otp) => {
    const storedOtpData = phoneOtps.get(phoneNumber);
    if (!storedOtpData) throw new Error("OTP not found or expired");
    
    // Check if OTP is expired
    if (new Date() > storedOtpData.expiresAt) {
      phoneOtps.delete(phoneNumber);
      throw new Error("OTP has expired. Please request a new one.");
    }
    
    if (storedOtpData.otp !== otp) throw new Error("Invalid OTP");

    let user = statements.getUserByPhone.get(phoneNumber);
    if (!user) {
      const userId = Math.random().toString(36).substr(2, 9);
      user = {
        id: userId,
        name: `User ${phoneNumber}`,
        email: `${phoneNumber}@phone.local`,
        phoneNumber,
        onboardingCompleted: false,
      };
      statements.insertUser.run(
        sanitizeForSQLite(userId),
        sanitizeForSQLite(user.name),
        sanitizeForSQLite(user.email),
        sanitizeForSQLite(phoneNumber),
        sanitizeForSQLite(false)
      );
    } else {
      user = parseUserFields(user);
    }

    const token = Math.random().toString(36).substr(2, 15);
    statements.insertSession.run(sanitizeForSQLite(token), sanitizeForSQLite(user.id));

    // Clear the used OTP
    phoneOtps.delete(phoneNumber);

    return { user, token };
  },

  signUpWithPhone: (phoneNumber, otp, name) => {
    const storedOtpData = phoneOtps.get(phoneNumber);
    if (!storedOtpData) throw new Error("OTP not found or expired");
    
    // Check if OTP is expired
    if (new Date() > storedOtpData.expiresAt) {
      phoneOtps.delete(phoneNumber);
      throw new Error("OTP has expired. Please request a new one.");
    }
    
    if (storedOtpData.otp !== otp) throw new Error("Invalid OTP");

    const existingUser = statements.getUserByPhone.get(phoneNumber);
    if (existingUser) throw new Error("User already exists");

    const userId = Math.random().toString(36).substr(2, 9);
    const user = {
      id: userId,
      name,
      email: `${phoneNumber}@phone.local`,
      phoneNumber,
      onboardingCompleted: false,
    };

    statements.insertUser.run(
      sanitizeForSQLite(userId),
      sanitizeForSQLite(name),
      sanitizeForSQLite(user.email),
      sanitizeForSQLite(phoneNumber),
      sanitizeForSQLite(false)
    );

    const token = Math.random().toString(36).substr(2, 15);
    statements.insertSession.run(sanitizeForSQLite(token), sanitizeForSQLite(userId));
    
    // Clear the used OTP
    phoneOtps.delete(phoneNumber);

    return { user, token };
  },

  getSession: (token) => {
    const session = statements.getSession.get(token);
    if (!session) return null;

    const user = statements.getUserById.get(session.userId);
    if (!user) return null;

    return { user: parseUserFields(user), token };
  },

  signOut: (token) => {
    statements.deleteSession.run(sanitizeForSQLite(token));
    return true;
  },

  updateUser: (token, updates) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const user = statements.getUserById.get(session.userId);
    if (!user) throw new Error("User not found");

    const parsedUser = parseUserFields(user);
    const updatedUser = { ...parsedUser, ...updates };

    statements.updateUser.run(
      sanitizeForSQLite(updatedUser.name),
      sanitizeForSQLite(updatedUser.email),
      sanitizeForSQLite(updatedUser.phoneNumber),
      sanitizeForSQLite(updatedUser.onboardingCompleted),
      sanitizeForSQLite(updatedUser.state),
      sanitizeForSQLite(updatedUser.district),
      sanitizeForSQLite(updatedUser.village),
      sanitizeForSQLite(updatedUser.farmSize),
      sanitizeForSQLite(updatedUser.farmSizeUnit),
      sanitizeForSQLite(updatedUser.landOwnership),
      sanitizeForSQLite(updatedUser.yearsOfExperience),
      sanitizeForSQLite(JSON.stringify(updatedUser.primaryCrops || [])),
      sanitizeForSQLite(updatedUser.farmingType),
      sanitizeForSQLite(updatedUser.irrigationMethod),
      sanitizeForSQLite(JSON.stringify(updatedUser.primaryGoals || [])),
      sanitizeForSQLite(updatedUser.budgetRange),
      sanitizeForSQLite(updatedUser.technologyComfort),
      sanitizeForSQLite(updatedUser.preferredLanguage),
      sanitizeForSQLite(updatedUser.dateOfBirth),
      sanitizeForSQLite(user.id)
    );

    return updatedUser;
  },
};

// IoT API Routes
const iotRoutes = {
  // Device Management
  getDevices: (token) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const devices = db.prepare("SELECT * FROM iot_devices WHERE userId = ? ORDER BY createdAt DESC").all(session.userId);
    return devices.map(device => ({
      ...device,
      lastSeen: device.lastSeen ? new Date(device.lastSeen) : null,
      createdAt: new Date(device.createdAt),
      updatedAt: new Date(device.updatedAt)
    }));
  },

  registerDevice: (token, deviceData) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const deviceId = Math.random().toString(36).substr(2, 9);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO iot_devices (id, name, type, location, status, userId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      deviceId,
      deviceData.name,
      deviceData.type,
      deviceData.location,
      'offline',
      session.userId,
      now,
      now
    );

    // Register sensors for the device
    if (deviceData.sensors && deviceData.sensors.length > 0) {
      const insertSensor = db.prepare(`
        INSERT INTO iot_sensors (id, deviceId, name, type, unit, minThreshold, maxThreshold, alertEnabled)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      deviceData.sensors.forEach(sensor => {
        const sensorId = Math.random().toString(36).substr(2, 9);
        insertSensor.run(
          sensorId,
          deviceId,
          sensor.name,
          sensor.type,
          sensor.unit,
          sensor.minThreshold || null,
          sensor.maxThreshold || null,
          sensor.alertEnabled !== false
        );
      });
    }

    return { id: deviceId, ...deviceData, status: 'offline', userId: session.userId };
  },

  updateDevice: (token, deviceId, updates) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const device = db.prepare("SELECT * FROM iot_devices WHERE id = ? AND userId = ?").get(deviceId, session.userId);
    if (!device) throw new Error("Device not found");

    const updateFields = [];
    const values = [];

    Object.keys(updates).forEach(key => {
      if (['name', 'type', 'location', 'status', 'batteryLevel', 'firmwareVersion'].includes(key)) {
        updateFields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });

    if (updateFields.length > 0) {
      values.push(new Date().toISOString(), deviceId, session.userId);
      db.prepare(`UPDATE iot_devices SET ${updateFields.join(', ')}, updatedAt = ? WHERE id = ? AND userId = ?`).run(...values);
    }

    return { ...device, ...updates };
  },

  deleteDevice: (token, deviceId) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const device = db.prepare("SELECT * FROM iot_devices WHERE id = ? AND userId = ?").get(deviceId, session.userId);
    if (!device) throw new Error("Device not found");

    // Delete will cascade to sensors and readings due to foreign key constraints
    db.prepare("DELETE FROM iot_devices WHERE id = ? AND userId = ?").run(deviceId, session.userId);
    return { success: true };
  },

  // Sensor Data
  getSensors: (token, deviceId) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const sensors = db.prepare(`
      SELECT s.*, r.value as lastValue, r.timestamp as lastReadingTime
      FROM iot_sensors s
      LEFT JOIN sensor_readings r ON s.id = r.sensorId
      WHERE s.deviceId = ?
      AND s.deviceId IN (SELECT id FROM iot_devices WHERE userId = ?)
      ORDER BY s.createdAt DESC
    `).all(deviceId, session.userId);

    return sensors.map(sensor => ({
      ...sensor,
      lastReading: sensor.lastValue ? {
        value: sensor.lastValue,
        timestamp: new Date(sensor.lastReadingTime)
      } : null,
      lastValue: undefined,
      lastReadingTime: undefined
    }));
  },

  submitSensorData: (token, data) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    // Verify device belongs to user
    const device = db.prepare("SELECT * FROM iot_devices WHERE id = ? AND userId = ?").get(data.deviceId, session.userId);
    if (!device) throw new Error("Device not found");

    const insertReading = db.prepare(`
      INSERT INTO sensor_readings (id, sensorId, value, timestamp, quality, metadata)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const readings = [];
    data.readings.forEach(reading => {
      const readingId = Math.random().toString(36).substr(2, 9);
      const timestamp = reading.timestamp || new Date().toISOString();

      insertReading.run(
        readingId,
        reading.sensorId,
        reading.value,
        timestamp,
        reading.quality || 'good',
        reading.metadata ? JSON.stringify(reading.metadata) : null
      );

      readings.push({
        id: readingId,
        sensorId: reading.sensorId,
        value: reading.value,
        timestamp: new Date(timestamp),
        quality: reading.quality || 'good',
        metadata: reading.metadata
      });

      // Update device last seen
      db.prepare("UPDATE iot_devices SET lastSeen = ?, status = 'online', updatedAt = ? WHERE id = ?")
        .run(timestamp, timestamp, data.deviceId);

      // Check for alerts
      checkSensorAlerts(reading.sensorId, reading.value, timestamp);
    });

    return readings;
  },

  getSensorReadings: (token, sensorId, options = {}) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    // Verify sensor belongs to user's device
    const sensor = db.prepare(`
      SELECT s.* FROM iot_sensors s
      JOIN iot_devices d ON s.deviceId = d.id
      WHERE s.id = ? AND d.userId = ?
    `).get(sensorId, session.userId);

    if (!sensor) throw new Error("Sensor not found");

    const { limit = 100, startDate, endDate } = options;
    let query = "SELECT * FROM sensor_readings WHERE sensorId = ?";
    const params = [sensorId];

    if (startDate) {
      query += " AND timestamp >= ?";
      params.push(startDate);
    }

    if (endDate) {
      query += " AND timestamp <= ?";
      params.push(endDate);
    }

    query += " ORDER BY timestamp DESC LIMIT ?";
    params.push(limit);

    const readings = db.prepare(query).all(...params);
    return readings.map(reading => ({
      ...reading,
      timestamp: new Date(reading.timestamp),
      metadata: reading.metadata ? JSON.parse(reading.metadata) : null
    }));
  },

  // Alerts
  getAlerts: (token, options = {}) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const { acknowledged = false, limit = 50 } = options;
    const alerts = db.prepare(`
      SELECT a.*, d.name as deviceName, s.name as sensorName
      FROM iot_alerts a
      JOIN iot_devices d ON a.deviceId = d.id
      LEFT JOIN iot_sensors s ON a.sensorId = s.id
      WHERE d.userId = ? AND a.acknowledged = ?
      ORDER BY a.createdAt DESC
      LIMIT ?
    `).all(session.userId, acknowledged ? 1 : 0, limit);

    return alerts.map(alert => ({
      ...alert,
      createdAt: new Date(alert.createdAt),
      resolvedAt: alert.resolvedAt ? new Date(alert.resolvedAt) : null,
      acknowledgedAt: alert.acknowledgedAt ? new Date(alert.acknowledgedAt) : null
    }));
  },

  acknowledgeAlert: (token, alertId) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const alert = db.prepare(`
      SELECT a.* FROM iot_alerts a
      JOIN iot_devices d ON a.deviceId = d.id
      WHERE a.id = ? AND d.userId = ?
    `).get(alertId, session.userId);

    if (!alert) throw new Error("Alert not found");

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE iot_alerts
      SET acknowledged = 1, acknowledgedAt = ?, acknowledgedBy = ?
      WHERE id = ?
    `).run(now, session.userId, alertId);

    return { success: true };
  },

  // Automations
  getAutomations: (token) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const automations = db.prepare("SELECT * FROM iot_automations WHERE userId = ? ORDER BY createdAt DESC").all(session.userId);
    return automations.map(auto => ({
      ...auto,
      triggerCondition: JSON.parse(auto.triggerCondition),
      actions: JSON.parse(auto.actions),
      createdAt: new Date(auto.createdAt),
      lastExecuted: auto.lastExecuted ? new Date(auto.lastExecuted) : null
    }));
  },

  createAutomation: (token, automationData) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const automationId = Math.random().toString(36).substr(2, 9);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO iot_automations (id, name, description, triggerType, triggerCondition, actions, enabled, userId, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      automationId,
      automationData.name,
      automationData.description || '',
      automationData.triggerType,
      JSON.stringify(automationData.triggerCondition),
      JSON.stringify(automationData.actions),
      automationData.enabled !== false,
      session.userId,
      now
    );

    return {
      id: automationId,
      ...automationData,
      userId: session.userId,
      createdAt: new Date(now)
    };
  },

  // Stats
  getIoTStats: (token) => {
    const session = statements.getSession.get(token);
    if (!session) throw new Error("Invalid session");

    const stats = db.prepare(`
      SELECT
        COUNT(DISTINCT d.id) as totalDevices,
        COUNT(DISTINCT CASE WHEN d.status = 'online' THEN d.id END) as onlineDevices,
        COUNT(DISTINCT s.id) as totalSensors,
        COUNT(DISTINCT CASE WHEN a.acknowledged = 0 THEN a.id END) as activeAlerts,
        COUNT(DISTINCT CASE WHEN r.timestamp >= date('now', '-1 day') THEN r.id END) as dataPointsToday
      FROM iot_devices d
      LEFT JOIN iot_sensors s ON d.id = s.deviceId
      LEFT JOIN iot_alerts a ON d.id = a.deviceId
      LEFT JOIN sensor_readings r ON s.id = r.sensorId
      WHERE d.userId = ?
    `).get(session.userId);

    // Calculate uptime (simplified - in real app would track device uptime)
    const uptime = stats.totalDevices > 0 ? (stats.onlineDevices / stats.totalDevices) * 100 : 0;

    return {
      ...stats,
      uptime: Math.round(uptime * 100) / 100
    };
  }
};

// Helper function to check sensor alerts
const checkSensorAlerts = (sensorId, value, timestamp) => {
  const sensor = db.prepare("SELECT * FROM iot_sensors WHERE id = ?").get(sensorId);
  if (!sensor || !sensor.alertEnabled) return;

  let alertType = null;
  let title = '';
  let message = '';
  let severity = 'low';

  if (sensor.minThreshold !== null && value < sensor.minThreshold) {
    alertType = 'threshold_breached';
    title = `${sensor.name} Below Threshold`;
    message = `${sensor.name} reading (${value}${sensor.unit}) is below minimum threshold (${sensor.minThreshold}${sensor.unit})`;
    severity = value < sensor.minThreshold * 0.8 ? 'high' : 'medium';
  } else if (sensor.maxThreshold !== null && value > sensor.maxThreshold) {
    alertType = 'threshold_breached';
    title = `${sensor.name} Above Threshold`;
    message = `${sensor.name} reading (${value}${sensor.unit}) is above maximum threshold (${sensor.maxThreshold}${sensor.unit})`;
    severity = value > sensor.maxThreshold * 1.2 ? 'high' : 'medium';
  }

  if (alertType) {
    const alertId = Math.random().toString(36).substr(2, 9);
    db.prepare(`
      INSERT INTO iot_alerts (id, deviceId, sensorId, type, severity, title, message, value, threshold, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      alertId,
      sensor.deviceId,
      sensorId,
      alertType,
      severity,
      title,
      message,
      value,
      sensor.minThreshold || sensor.maxThreshold,
      timestamp
    );
  }
};

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

// Route handlers
const handleAuthRoute = (handler) => async (req, res) => {
  try {
    const result = await handler(req.body, req.headers);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

app.post("/api/auth/sign-up", handleAuthRoute(({ email, password, name }) => auth.signUp(email, password, name)));
app.post("/api/auth/sign-in", handleAuthRoute(({ email, password }) => auth.signIn(email, password)));
app.post("/api/auth/sign-out", handleAuthRoute((_, headers) => {
  const token = headers.authorization?.replace("Bearer ", "");
  return auth.signOut(token);
}));
app.get("/api/auth/session", handleAuthRoute((_, headers) => {
  const token = headers.authorization?.replace("Bearer ", "");
  const session = auth.getSession(token);
  if (!session) throw new Error("Invalid session");
  return { user: session.user };
}));
app.put("/api/auth/user", handleAuthRoute((updates, headers) => {
  const token = headers.authorization?.replace("Bearer ", "");
  return auth.updateUser(token, updates);
}));

app.post("/api/auth/request-otp", handleAuthRoute(async ({ phoneNumber }) => {
  if (!phoneNumber) throw new Error("Phone number is required");
  return await auth.requestPhoneOtp(phoneNumber);
}));
app.post("/api/auth/sign-in/phone", handleAuthRoute(({ phoneNumber, otp }) => {
  if (!phoneNumber || !otp) throw new Error("Phone number and OTP are required");
  return auth.signInWithPhone(phoneNumber, otp);
}));
app.post("/api/auth/sign-up/phone", handleAuthRoute(({ phoneNumber, otp, name }) => {
  if (!phoneNumber || !otp || !name) throw new Error("Phone number, OTP, and name are required");
  return auth.signUpWithPhone(phoneNumber, otp, name);
}));

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: "1.0.0"
  });
});

// IoT API Routes
const handleIoTRoute = (handler) => async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) throw new Error("Authentication required");

    const result = await handler(token, req.body, req.params, req.query);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Device Management
app.get("/api/iot/devices", handleIoTRoute((token) => iotRoutes.getDevices(token)));
app.post("/api/iot/devices", handleIoTRoute((token, body) => iotRoutes.registerDevice(token, body)));
app.put("/api/iot/devices/:deviceId", handleIoTRoute((token, body, params) => iotRoutes.updateDevice(token, params.deviceId, body)));
app.delete("/api/iot/devices/:deviceId", handleIoTRoute((token, body, params) => iotRoutes.deleteDevice(token, params.deviceId)));

// Sensor Management
app.get("/api/iot/devices/:deviceId/sensors", handleIoTRoute((token, body, params) => iotRoutes.getSensors(token, params.deviceId)));
app.post("/api/iot/sensor-data", handleIoTRoute((token, body) => iotRoutes.submitSensorData(token, body)));
app.get("/api/iot/sensors/:sensorId/readings", handleIoTRoute((token, body, params, query) => iotRoutes.getSensorReadings(token, params.sensorId, query)));

// Alerts
app.get("/api/iot/alerts", handleIoTRoute((token, body, params, query) => iotRoutes.getAlerts(token, query)));
app.put("/api/iot/alerts/:alertId/acknowledge", handleIoTRoute((token, body, params) => iotRoutes.acknowledgeAlert(token, params.alertId)));

// Automations
app.get("/api/iot/automations", handleIoTRoute((token) => iotRoutes.getAutomations(token)));
app.post("/api/iot/automations", handleIoTRoute((token, body) => iotRoutes.createAutomation(token, body)));

// Stats
app.get("/api/iot/stats", handleIoTRoute((token) => iotRoutes.getIoTStats(token)));

// Weather API Routes
app.get("/api/weather/current", async (req, res) => {
  try {
    // Mock weather data for development
    const mockWeather = {
      location: req.query.location || "Nashik, Maharashtra",
      temperature: 28 + Math.random() * 10 - 5, // Random temp between 23-33°C
      condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
      humidity: 50 + Math.random() * 30, // 50-80%
      windSpeed: 5 + Math.random() * 15, // 5-20 km/h
      rainfall: Math.random() * 5, // 0-5mm
      pressure: 1000 + Math.random() * 20, // 1000-1020 hPa
      visibility: 8 + Math.random() * 4, // 8-12 km
      uvIndex: Math.floor(Math.random() * 11), // 0-10
      lastUpdated: new Date().toISOString()
    };

    res.json({ success: true, data: mockWeather });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch weather data" });
  }
});

app.get("/api/weather/forecast", async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const forecast = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      forecast.push({
        date: date.toISOString().split('T')[0],
        day: i === 0 ? "Today" : i === 1 ? "Tomorrow" : date.toLocaleDateString('en-US', { weekday: 'short' }),
        temp: 25 + Math.random() * 10, // 25-35°C
        tempMin: 20 + Math.random() * 5, // 20-25°C
        tempMax: 30 + Math.random() * 8, // 30-38°C
        condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Thunderstorms"][Math.floor(Math.random() * 5)],
        icon: "partly-cloudy",
        humidity: 50 + Math.random() * 30,
        windSpeed: 5 + Math.random() * 15,
        rainfall: Math.random() * 10,
        chanceOfRain: Math.floor(Math.random() * 100)
      });
    }

    res.json({ success: true, data: forecast });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch forecast data" });
  }
});

app.get("/api/weather/alerts", async (req, res) => {
  try {
    // Mock weather alerts
    const alerts = [
      {
        id: "alert_1",
        type: "heat_wave",
        severity: "high",
        title: "Heat Wave Warning",
        description: "Extreme temperatures expected. Take precautions to avoid heat stress.",
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        affectedAreas: ["Nashik", "Pune", "Mumbai"]
      },
      {
        id: "alert_2",
        type: "rain",
        severity: "medium",
        title: "Heavy Rainfall Expected",
        description: "Heavy rainfall expected in the next 24 hours. Prepare for flooding in low-lying areas.",
        startTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 30 * 60 * 60 * 1000).toISOString(),
        affectedAreas: ["Nashik", "Dhule"]
      }
    ];

    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch weather alerts" });
  }
});

app.get("/api/weather/stations", async (req, res) => {
  try {
    // Mock weather stations
    const stations = [
      {
        id: "station_1",
        name: "Nashik Weather Station",
        location: "Nashik, Maharashtra",
        latitude: 19.9975,
        longitude: 73.7898,
        isActive: true,
        lastUpdate: new Date().toISOString(),
        sensors: {
          temperature: true,
          humidity: true,
          windSpeed: true,
          windDirection: true,
          rainfall: true,
          pressure: true,
          visibility: true,
          uvIndex: true
        }
      },
      {
        id: "station_2",
        name: "Pune Weather Station",
        location: "Pune, Maharashtra",
        latitude: 18.5204,
        longitude: 73.8567,
        isActive: true,
        lastUpdate: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        sensors: {
          temperature: true,
          humidity: true,
          windSpeed: true,
          windDirection: false,
          rainfall: true,
          pressure: true,
          visibility: false,
          uvIndex: true
        }
      }
    ];

    res.json({ success: true, data: stations });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch weather stations" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
