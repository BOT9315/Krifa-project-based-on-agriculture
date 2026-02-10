import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MarketPrices = () => {
  const [marketData, setMarketData] = useState([
    {
      crop: "Wheat",
      price: "₹2,250",
      change: "+5.2%",
      trend: "up" as const,
      market: "Nashik APMC",
      lastUpdated: new Date()
    },
    {
      crop: "Rice",
      price: "₹1,850",
      change: "-2.1%",
      trend: "down" as const,
      market: "Mumbai Market",
      lastUpdated: new Date()
    },
    {
      crop: "Onion",
      price: "₹45",
      change: "+12.8%",
      trend: "up" as const,
      market: "Lasalgaon",
      lastUpdated: new Date()
    },
    {
      crop: "Cotton",
      price: "₹7,200",
      change: "+3.5%",
      trend: "up" as const,
      market: "Nagpur APMC",
      lastUpdated: new Date()
    },
    {
      crop: "Soybean",
      price: "₹4,850",
      change: "-1.2%",
      trend: "down" as const,
      market: "Indore Mandi",
      lastUpdated: new Date()
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshPrices = () => {
    setIsRefreshing(true);
    // Simulate API call to update prices
    setTimeout(() => {
      setMarketData(prev => prev.map(item => {
        const priceChange = (Math.random() - 0.5) * 200;
        const newPrice = Math.max(100, parseInt(item.price.replace(/[₹,]/g, '')) + priceChange);
        const percentChange = ((priceChange / parseInt(item.price.replace(/[₹,]/g, ''))) * 100).toFixed(1);

        return {
          ...item,
          price: `₹${newPrice.toLocaleString()}`,
          change: `${percentChange.startsWith('-') ? '' : '+'}${percentChange}%`,
          trend: percentChange.startsWith('-') ? 'down' : 'up',
          lastUpdated: new Date()
        };
      }));
      setIsRefreshing(false);
    }, 1500);
  };

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(refreshPrices, 600000);
    return () => clearInterval(interval);
  }, []);

  const marketDataOld = [
    {
      crop: "Wheat",
      price: "₹2,250",
      change: "+5.2%",
      trend: "up" as const,
      market: "Nashik APMC"
    },
    {
      crop: "Rice",
      price: "₹1,850",
      change: "-2.1%",
      trend: "down" as const,
      market: "Mumbai Market"
    },
    {
      crop: "Onion",
      price: "₹45",
      change: "+12.8%",
      trend: "up" as const,
      market: "Lasalgaon"
    },
    {
      crop: "Cotton",
      price: "₹7,200",
      change: "+3.5%",
      trend: "up" as const,
      market: "Nagpur APMC"
    },
    {
      crop: "Soybean",
      price: "₹4,850",
      change: "-1.2%",
      trend: "down" as const,
      market: "Indore Mandi"
    }
  ];

  return (
    <Card className="shadow-soft border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-accent" />
            <span>Market Prices</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshPrices} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Live prices per quintal</p>
        <p className="text-xs text-muted-foreground">
          Last updated: {marketData[0]?.lastUpdated.toLocaleTimeString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-foreground">{item.crop}</p>
                  <Badge variant={item.trend === "up" ? "default" : "destructive"} className="text-xs">
                    {item.trend === "up" ? "↗" : "↘"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{item.market}</p>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-foreground">{item.price}</p>
                <div className="flex items-center space-x-1">
                  {item.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      item.trend === "up" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-sm text-accent-foreground font-medium">💡 Market Insight</p>
          <p className="text-xs text-muted-foreground mt-1">
            Onion prices are rising due to delayed monsoon. Consider harvesting stored onions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPrices;