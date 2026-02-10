import { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import CropManagement from "@/components/pages/CropManagement";
import Analytics from "@/components/pages/Analytics";
import Marketplace from "@/components/pages/Marketplace";
import Notifications from "@/components/pages/Notifications";
import ExpenseTracking from "@/components/pages/ExpenseTracking";
import TaskScheduler from "@/components/pages/TaskScheduler";
import SoilHealth from "@/components/pages/SoilHealth";
import Reports from "@/components/pages/Reports";
import AIFeatures from "@/components/pages/AIFeatures";
import Sustainability from "@/components/pages/Sustainability";
import Community from "@/components/pages/Community";
import { Wheat, BarChart3, Camera, Package, TrendingUp, Users, User } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import CropAdvisory from "@/components/dashboard/CropAdvisory";
import MarketPrices from "@/components/dashboard/MarketPrices";
import CropLossMonetization from "@/components/dashboard/CropLossMonetization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import heroImage from "@/assets/hero-farming.jpg";

// Placeholder components for pages not yet implemented
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Raj Patel",
    email: "raj.patel@example.com",
    phone: "+91 98765 43210",
    location: "Nashik, Maharashtra",
    farmSize: "15.5 acres",
    experience: "12 years",
    specialization: "Mixed cropping (Wheat, Cotton, Vegetables)",
    bio: "Passionate farmer focused on sustainable agriculture and smart farming technologies."
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Management</h1>
          <p className="text-muted-foreground">Manage your farmer profile and account settings</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo & Basic Info */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">Premium Farmer</p>
                <Badge variant="default" className="mt-2">Verified</Badge>
              </div>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.location}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Farm Information */}
      <Card>
        <CardHeader>
          <CardTitle>Farm Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="farmSize">Farm Size</Label>
              {isEditing ? (
                <Input
                  id="farmSize"
                  value={profile.farmSize}
                  onChange={(e) => setProfile({...profile, farmSize: e.target.value})}
                />
              ) : (
                <p className="text-foreground font-medium">{profile.farmSize}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              {isEditing ? (
                <Input
                  id="experience"
                  value={profile.experience}
                  onChange={(e) => setProfile({...profile, experience: e.target.value})}
                />
              ) : (
                <p className="text-foreground font-medium">{profile.experience}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              {isEditing ? (
                <Input
                  id="specialization"
                  value={profile.specialization}
                  onChange={(e) => setProfile({...profile, specialization: e.target.value})}
                />
              ) : (
                <p className="text-foreground font-medium">{profile.specialization}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows={3}
              />
            ) : (
              <p className="text-muted-foreground">{profile.bio}</p>
            )}
          </div>
          {isEditing && (
            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">15.5</p>
              <p className="text-sm text-muted-foreground">Total Acres</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">4</p>
              <p className="text-sm text-muted-foreground">Active Crops</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-foreground">₹15.2L</p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">12</p>
              <p className="text-sm text-muted-foreground">Years Farming</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      pestAlerts: true,
      weatherUpdates: true,
      marketPrices: true,
      cropReminders: true,
      governmentSchemes: true,
      emailNotifications: false,
      smsNotifications: true
    },
    privacy: {
      profileVisibility: "public",
      dataSharing: false,
      analyticsTracking: true
    },
    preferences: {
      language: "English",
      currency: "INR",
      timezone: "Asia/Kolkata",
      theme: "light"
    }
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your app preferences and account settings</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <p className="text-sm text-muted-foreground">Customize what notifications you receive</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pest & Disease Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified about crop health issues</p>
                    </div>
                    <Switch
                      checked={settings.notifications.pestAlerts}
                      onCheckedChange={(checked) => handleNotificationChange('pestAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weather Updates</p>
                      <p className="text-sm text-muted-foreground">Receive weather forecasts and advisories</p>
                    </div>
                    <Switch
                      checked={settings.notifications.weatherUpdates}
                      onCheckedChange={(checked) => handleNotificationChange('weatherUpdates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Market Price Alerts</p>
                      <p className="text-sm text-muted-foreground">Price changes and market opportunities</p>
                    </div>
                    <Switch
                      checked={settings.notifications.marketPrices}
                      onCheckedChange={(checked) => handleNotificationChange('marketPrices', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Crop Care Reminders</p>
                      <p className="text-sm text-muted-foreground">Irrigation, fertilizer, and activity reminders</p>
                    </div>
                    <Switch
                      checked={settings.notifications.cropReminders}
                      onCheckedChange={(checked) => handleNotificationChange('cropReminders', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Government Schemes</p>
                      <p className="text-sm text-muted-foreground">Updates on subsidies and government programs</p>
                    </div>
                    <Switch
                      checked={settings.notifications.governmentSchemes}
                      onCheckedChange={(checked) => handleNotificationChange('governmentSchemes', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium text-foreground mb-4">Delivery Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive alerts via text message</p>
                    </div>
                    <Switch
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive detailed reports via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <p className="text-sm text-muted-foreground">Control your data and privacy preferences</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-muted-foreground">Who can see your profile information</p>
                  </div>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="public">Public</option>
                    <option value="farmers">Farmers Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Sharing</p>
                    <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataSharing}
                    onCheckedChange={(checked) => handlePrivacyChange('dataSharing', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Tracking</p>
                    <p className="text-sm text-muted-foreground">Help improve the app with usage analytics</p>
                  </div>
                  <Switch
                    checked={settings.privacy.analyticsTracking}
                    onCheckedChange={(checked) => handlePrivacyChange('analyticsTracking', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <p className="text-sm text-muted-foreground">Customize your app experience</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={settings.preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Marathi">Marathi</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={settings.preferences.currency}
                    onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={settings.preferences.timezone}
                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <select
                    id="theme"
                    value={settings.preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <p className="text-sm text-muted-foreground">Manage your account security and data</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Change Password</h4>
                  <p className="text-sm text-muted-foreground mb-4">Update your account password</p>
                  <Button variant="outline">Change Password</Button>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                  <p className="text-sm text-muted-foreground mb-4">Irreversible actions</p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I add a new crop to my farm?",
      answer: "Go to the Crop Management page and click 'Add New Crop'. Fill in the crop details including name, variety, area, and planting date."
    },
    {
      question: "How does the AI crop advisory work?",
      answer: "Upload a photo of your crop or soil using the camera in the dashboard. Our AI will analyze the image and provide recommendations for pest control, irrigation, and fertilization."
    },
    {
      question: "How can I monetize damaged crops?",
      answer: "Use the Crop Loss Monetization feature in the Marketplace. List your damaged crops and connect with buyers who process them into animal feed or other products."
    },
    {
      question: "What government schemes am I eligible for?",
      answer: "Check the Government Schemes section in Marketplace. Based on your location and farm details, you'll see relevant subsidies and insurance programs."
    },
    {
      question: "How do I receive notifications?",
      answer: "Configure your notification preferences in Settings. You can choose to receive alerts for pest detection, weather updates, market prices, and more."
    }
  ];

  const supportOptions = [
    {
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      icon: "📚",
      action: "View Docs"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: "🎥",
      action: "Watch Videos"
    },
    {
      title: "Community Forum",
      description: "Connect with other farmers",
      icon: "👥",
      action: "Join Forum"
    },
    {
      title: "Live Support",
      description: "Chat with our support team",
      icon: "💬",
      action: "Start Chat"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
          <p className="text-muted-foreground">Get help with using the Smart Farming platform</p>
        </div>
        <Button>Contact Support</Button>
      </div>

      {/* Quick Help */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Help</CardTitle>
          <p className="text-sm text-muted-foreground">Common questions and answers</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0">
                <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportOptions.map((option, index) => (
          <Card key={index} className="text-center hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{option.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
              <Button variant="outline" size="sm">{option.action}</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <p className="text-sm text-muted-foreground">Get in touch with our support team</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📞</span>
              </div>
              <h4 className="font-medium text-foreground mb-1">Phone Support</h4>
              <p className="text-sm text-muted-foreground">+91 1800-XXX-XXXX</p>
              <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM IST</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✉️</span>
              </div>
              <h4 className="font-medium text-foreground mb-1">Email Support</h4>
              <p className="text-sm text-muted-foreground">support@agrismart.com</p>
              <p className="text-xs text-muted-foreground">Response within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📍</span>
              </div>
              <h4 className="font-medium text-foreground mb-1">Office Address</h4>
              <p className="text-sm text-muted-foreground">AgriSmart HQ<br />Mumbai, Maharashtra</p>
              <p className="text-xs text-muted-foreground">Visit by appointment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <p className="text-sm text-muted-foreground">Current status of our services</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="font-medium text-foreground">AI Advisory System</span>
              </div>
              <span className="text-sm text-success">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="font-medium text-foreground">Marketplace</span>
              </div>
              <span className="text-sm text-success">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="font-medium text-foreground">Weather Service</span>
              </div>
              <span className="text-sm text-success">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="font-medium text-foreground">SMS Notifications</span>
              </div>
              <span className="text-sm text-warning">Maintenance</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DashboardPage = () => (
  <div className="space-y-8">
    {/* Hero Section */}
    <div className="relative">
      <div 
        className="h-48 bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="px-8">
            <div className="max-w-2xl text-white">
              <h1 className="text-3xl font-bold mb-2">
                Smart Farming with AI-Powered Insights
              </h1>
              <p className="text-white/90">
                Maximize your crop yield and minimize losses with intelligent recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Land"
        value="15.5 acres"
        change="+2.3 acres"
        trend="up"
        icon={<Wheat className="h-6 w-6" />}
        color="success"
      />
      <StatsCard
        title="Monthly Revenue"
        value="₹2.8L"
        change="+18.5%"
        trend="up"
        icon={<TrendingUp className="h-6 w-6" />}
        color="success"
      />
      <StatsCard
        title="Crop Health Score"
        value="87%"
        change="+5.2%"
        trend="up"
        icon={<BarChart3 className="h-6 w-6" />}
        color="default"
      />
      <StatsCard
        title="Recovery Saved"
        value="₹45K"
        change="+₹12K"
        trend="up"
        icon={<Package className="h-6 w-6" />}
        color="warning"
      />
    </div>

    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-8">
        <CropAdvisory />
        <CropLossMonetization />
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        <WeatherWidget />
        <MarketPrices />
      </div>
    </div>

    {/* Impact Section */}
    <div className="bg-gradient-harvest rounded-xl p-8 text-white">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Your Farming Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="text-center">
            <div className="text-3xl font-bold">40%</div>
            <div className="text-white/90">Income Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">25%</div>
            <div className="text-white/90">Crop Loss Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">₹3.2L</div>
            <div className="text-white/90">Total Recovery</div>
          </div>
        </div>
        <p className="text-white/90 max-w-2xl mx-auto">
          Join thousands of farmers who are transforming their agriculture with smart technology 
          and data-driven decisions.
        </p>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "crops":
        return <CropManagement />;
      case "analytics":
        return <Analytics />;
      case "marketplace":
        return <Marketplace />;
      case "notifications":
        return <Notifications />;
      case "expenses":
        return <ExpenseTracking />;
      case "scheduler":
        return <TaskScheduler />;
      case "soil-health":
        return <SoilHealth />;
      case "reports":
        return <Reports />;
      case "ai-features":
        return <AIFeatures />;
      case "sustainability":
        return <Sustainability />;
      case "community":
        return <Community />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      case "help":
        return <HelpPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;