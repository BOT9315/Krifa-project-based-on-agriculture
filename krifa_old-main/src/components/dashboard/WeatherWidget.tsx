import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    location: "Nashik, Maharashtra",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.5,
    lastUpdated: new Date(),
    forecast: [
      { day: "Today", temp: "28°C", condition: "sunny", icon: Sun },
      { day: "Tomorrow", temp: "26°C", condition: "cloudy", icon: Cloud },
      { day: "Wed", temp: "24°C", condition: "rainy", icon: CloudRain },
      { day: "Thu", temp: "27°C", condition: "sunny", icon: Sun },
    ]
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshWeather = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setWeatherData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 4,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 20)),
        windSpeed: Math.max(5, Math.min(25, prev.windSpeed + (Math.random() - 0.5) * 10)),
        lastUpdated: new Date()
      }));
      setIsRefreshing(false);
    }, 1000);
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(refreshWeather, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-earth border-border shadow-soft">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Cloud className="h-5 w-5 text-primary" />
            <span>Weather Forecast</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshWeather} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{weatherData.location}</p>
        <p className="text-xs text-muted-foreground">
          Last updated: {weatherData.lastUpdated.toLocaleTimeString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-foreground">{weatherData.temperature}°C</p>
            <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
          </div>
          <Sun className="h-12 w-12 text-accent" />
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
          <div className="text-center">
            <Droplets className="h-4 w-4 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-semibold text-foreground">{weatherData.humidity}%</p>
          </div>
          <div className="text-center">
            <Wind className="h-4 w-4 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm font-semibold text-foreground">{weatherData.windSpeed} km/h</p>
          </div>
          <div className="text-center">
            <CloudRain className="h-4 w-4 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Rainfall</p>
            <p className="text-sm font-semibold text-foreground">{weatherData.rainfall} mm</p>
          </div>
        </div>

        {/* 4-Day Forecast */}
        <div className="space-y-2 pt-3 border-t border-border">
          <p className="text-sm font-medium text-foreground">4-Day Forecast</p>
          <div className="grid grid-cols-4 gap-2">
            {weatherData.forecast.map((day, index) => {
              const IconComponent = day.icon;
              return (
                <div key={index} className="text-center p-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">{day.day}</p>
                  <IconComponent className="h-4 w-4 text-primary mx-auto mb-1" />
                  <p className="text-xs font-semibold text-foreground">{day.temp}</p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;