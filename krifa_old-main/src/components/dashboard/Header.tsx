import { Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="bg-gradient-primary border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">🌾</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-foreground">AgriSmart</h1>
                <p className="text-primary-foreground/80 text-xs">Smart Crop Advisory</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground text-xs font-bold">3</span>
              </span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-primary-foreground">Raj Patel</p>
                <p className="text-xs text-primary-foreground/80">Farmer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;