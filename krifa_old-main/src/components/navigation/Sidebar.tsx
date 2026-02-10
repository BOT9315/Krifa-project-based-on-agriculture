import { useState } from "react";
import { 
  Home, 
  Leaf, 
  BarChart3, 
  Package, 
  Settings, 
  User, 
  Bell, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Wifi,
  WifiOff,
  DollarSign,
  Calendar,
  TestTube,
  FileText,
  Zap,
  Recycle,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
    { id: "crops", label: "My Crops", icon: Leaf, badge: "5" },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: null },
    { id: "marketplace", label: "Marketplace", icon: Package, badge: "3" },
    { id: "notifications", label: "Notifications", icon: Bell, badge: "12" },
    { id: "expenses", label: "Expenses", icon: DollarSign, badge: null },
    { id: "scheduler", label: "Task Scheduler", icon: Calendar, badge: "2" },
    { id: "soil-health", label: "Soil Health", icon: TestTube, badge: null },
    { id: "reports", label: "Reports", icon: FileText, badge: null },
    { id: "ai-features", label: "AI Features", icon: Zap, badge: null },
    { id: "sustainability", label: "Sustainability", icon: Recycle, badge: null },
    { id: "community", label: "Community", icon: MessageSquare, badge: null },
    { id: "profile", label: "Profile", icon: User, badge: null },
    { id: "settings", label: "Settings", icon: Settings, badge: null },
    { id: "help", label: "Help & Support", icon: HelpCircle, badge: null },
  ];

  return (
    <div className={cn(
      "bg-card border-r border-border shadow-soft transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🌾</span>
              </div>
              <div>
                <h2 className="font-bold text-foreground">AgriSmart</h2>
                <p className="text-xs text-muted-foreground">Smart Advisory</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-success" />
          ) : (
            <WifiOff className="h-4 w-4 text-destructive" />
          )}
          {!isCollapsed && (
            <span className={cn(
              "text-sm font-medium",
              isOnline ? "text-success" : "text-destructive"
            )}>
              {isOnline ? "Online" : "Offline Mode"}
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    isCollapsed ? "px-2" : "px-3",
                    isActive && "bg-primary text-primary-foreground shadow-soft"
                  )}
                  onClick={() => onPageChange(item.id)}
                >
                  <IconComponent className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Raj Patel</p>
              <p className="text-xs text-muted-foreground">Premium Farmer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;