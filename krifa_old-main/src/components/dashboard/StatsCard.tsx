import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color?: "default" | "success" | "warning" | "destructive";
}

const StatsCard = ({ title, value, change, trend, icon, color = "default" }: StatsCardProps) => {
  const colorClasses = {
    default: "bg-card border-border",
    success: "bg-gradient-to-br from-success/10 to-success/5 border-success/20",
    warning: "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20",
    destructive: "bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20",
  };

  const iconColorClasses = {
    default: "text-primary",
    success: "text-success",
    warning: "text-accent-foreground",
    destructive: "text-destructive",
  };

  return (
    <Card className={`${colorClasses[color]} shadow-soft transition-all duration-300 hover:shadow-medium animate-fade-in`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <div className="flex items-center space-x-1">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend === "up" ? "text-success" : "text-destructive"
                }`}
              >
                {change}
              </span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${iconColorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;