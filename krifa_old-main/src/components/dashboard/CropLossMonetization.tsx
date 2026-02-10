import { Package, Phone, MapPin, Clock, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CropLossMonetization = () => {
  const lossOpportunities = [
    {
      id: 1,
      buyer: "Maharashtra Food Processing Co.",
      crop: "Damaged Tomatoes",
      quantity: "50 tonnes",
      price: "₹8,000/tonne",
      distance: "15 km",
      contact: "+91 98765 43210",
      status: "Active",
      timeLeft: "2 days"
    },
    {
      id: 2,
      buyer: "Nashik Juice Industries",
      crop: "Overripe Oranges", 
      quantity: "30 tonnes",
      price: "₹12,000/tonne",
      distance: "8 km",
      contact: "+91 87654 32109",
      status: "Urgent",
      timeLeft: "6 hours"
    },
    {
      id: 3,
      buyer: "Animal Feed Corp",
      crop: "Mixed Vegetable Waste",
      quantity: "100 tonnes",
      price: "₹3,500/tonne",
      distance: "25 km", 
      contact: "+91 76543 21098",
      status: "Active",
      timeLeft: "5 days"
    }
  ];

  return (
    <Card className="shadow-soft border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Package className="h-5 w-5 text-destructive" />
          <span>Crop Loss Monetization</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Convert damaged crops into revenue</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lossOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="border border-border rounded-lg p-4 space-y-3 hover:shadow-soft transition-shadow">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{opportunity.buyer}</h4>
                    <Badge variant={opportunity.status === "Urgent" ? "destructive" : "default"}>
                      {opportunity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{opportunity.crop}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground flex items-center">
                    <IndianRupee className="h-4 w-4" />
                    {opportunity.price.replace("₹", "")}
                  </p>
                  <p className="text-xs text-muted-foreground">{opportunity.quantity}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{opportunity.distance} away</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{opportunity.timeLeft} left</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="default" size="sm" className="flex-1">
                  Accept Offer
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>Call</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
              <IndianRupee className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="font-medium text-success">Revenue Recovery Potential</p>
              <p className="text-sm text-muted-foreground mt-1">
                Convert up to ₹2.5 lakhs from damaged crops this month
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-success text-success hover:bg-success/10">
                Register Your Crop Loss
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropLossMonetization;