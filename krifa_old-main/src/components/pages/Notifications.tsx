import { useState } from "react";
import { Bell, Check, Clock, AlertTriangle, Info, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "Pest Alert: Thrips detected in Onion Field",
      message: "Early signs of thrips infestation detected in Block A. Immediate action recommended.",
      time: "2 hours ago",
      read: false,
      actionRequired: true
    },
    {
      id: 2,
      type: "weather",
      title: "Weather Advisory: Heavy Rain Expected",
      message: "Rain forecast for next 3 days. Consider protecting tomato crops from waterlogging.",
      time: "4 hours ago",
      read: false,
      actionRequired: true
    },
    {
      id: 3,
      type: "market",
      title: "Price Alert: Wheat prices up 8%",
      message: "Wheat prices reached ₹2,250/quintal. Good time to sell stored wheat.",
      time: "6 hours ago",
      read: true,
      actionRequired: false
    },
    {
      id: 4,
      type: "crop",
      title: "Irrigation Reminder",
      message: "Cotton field irrigation due. Soil moisture at 45%.",
      time: "8 hours ago",
      read: false,
      actionRequired: true
    },
    {
      id: 5,
      type: "system",
      title: "Weekly Report Ready",
      message: "Your farming performance report for this week is now available.",
      time: "1 day ago",
      read: true,
      actionRequired: false
    },
    {
      id: 6,
      type: "government",
      title: "PM-KISAN Payment Received",
      message: "₹2,000 has been credited to your account under PM-KISAN scheme.",
      time: "2 days ago",
      read: true,
      actionRequired: false
    }
  ]);

  const [settings, setSettings] = useState({
    pestAlerts: true,
    weatherUpdates: true,
    marketPrices: true,
    cropReminders: true,
    governmentSchemes: true,
    emailNotifications: false,
    smsNotifications: true
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "weather": return <Info className="h-5 w-5 text-primary" />;
      case "market": return <Info className="h-5 w-5 text-success" />;
      case "crop": return <Clock className="h-5 w-5 text-accent-foreground" />;
      case "government": return <Info className="h-5 w-5 text-primary" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your farm activities and alerts</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="destructive" className="flex items-center space-x-1">
            <AlertTriangle className="h-3 w-3" />
            <span>{actionRequiredCount} Action Required</span>
          </Badge>
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">{actionRequiredCount}</p>
                <p className="text-sm text-muted-foreground">Action Required</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Check className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{notifications.length - unreadCount}</p>
                <p className="text-sm text-muted-foreground">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`shadow-soft border-border transition-all duration-200 ${
                !notification.read ? 'bg-primary/5 border-primary/20' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {notification.actionRequired && !notification.read && (
                          <Badge variant="destructive" className="text-xs">Action Required</Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                        {notification.actionRequired && !notification.read && (
                          <Button variant="default" size="sm">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications.filter(n => !n.read).map((notification) => (
            <Card key={notification.id} className="bg-primary/5 border-primary/20 shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium text-foreground">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
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
                      checked={settings.pestAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, pestAlerts: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weather Updates</p>
                      <p className="text-sm text-muted-foreground">Receive weather forecasts and advisories</p>
                    </div>
                    <Switch
                      checked={settings.weatherUpdates}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, weatherUpdates: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Market Price Alerts</p>
                      <p className="text-sm text-muted-foreground">Price changes and market opportunities</p>
                    </div>
                    <Switch
                      checked={settings.marketPrices}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, marketPrices: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Crop Care Reminders</p>
                      <p className="text-sm text-muted-foreground">Irrigation, fertilizer, and activity reminders</p>
                    </div>
                    <Switch
                      checked={settings.cropReminders}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, cropReminders: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Government Schemes</p>
                      <p className="text-sm text-muted-foreground">Updates on subsidies and government programs</p>
                    </div>
                    <Switch
                      checked={settings.governmentSchemes}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, governmentSchemes: checked }))
                      }
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
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, smsNotifications: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive detailed reports via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;