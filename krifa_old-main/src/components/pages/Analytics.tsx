import { TrendingUp, DollarSign, BarChart3, Calendar, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analytics = () => {
  const performanceData = {
    monthlyRevenue: [
      { month: "Jul", revenue: 185000, expenses: 125000 },
      { month: "Aug", revenue: 225000, expenses: 135000 },
      { month: "Sep", revenue: 195000, expenses: 140000 },
      { month: "Oct", revenue: 275000, expenses: 155000 },
      { month: "Nov", revenue: 320000, expenses: 165000 },
      { month: "Dec", revenue: 380000, expenses: 175000 }
    ],
    cropYields: [
      { crop: "Wheat", predicted: 4.2, actual: 4.5, efficiency: 107 },
      { crop: "Tomatoes", predicted: 12.5, actual: 11.8, efficiency: 94 },
      { crop: "Cotton", predicted: 15.8, actual: 16.2, efficiency: 103 },
      { crop: "Onions", predicted: 8.2, actual: 7.9, efficiency: 96 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into your farming performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 6 Months
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">₹15.2L</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-xs text-success">+24% vs last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">₹8.9L</p>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-xs text-primary">+12% vs last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-foreground">70%</p>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-xs text-success">+8% vs last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">8%</p>
                <p className="text-sm text-muted-foreground">Crop Loss</p>
                <p className="text-xs text-destructive">-3% vs last period</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="crops">Crop Performance</TabsTrigger>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.monthlyRevenue.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{data.month}</span>
                        <span className="text-sm text-success">₹{(data.revenue - data.expenses).toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full relative"
                          style={{ width: `${(data.revenue / 400000) * 100}%` }}
                        >
                          <div 
                            className="bg-destructive h-2 rounded-full absolute top-0 left-0"
                            style={{ width: `${(data.expenses / data.revenue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Crop Sales</span>
                    <span className="text-success font-bold">₹12.8L (84%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Government Subsidies</span>
                    <span className="text-success font-bold">₹1.2L (8%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Crop Loss Recovery</span>
                    <span className="text-success font-bold">₹0.8L (5%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Other Income</span>
                    <span className="text-success font-bold">₹0.4L (3%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crops" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crop Yield Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Actual vs Predicted yields</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceData.cropYields.map((crop, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-foreground">{crop.crop}</h4>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        crop.efficiency >= 100 
                          ? 'bg-success/20 text-success' 
                          : 'bg-destructive/20 text-destructive'
                      }`}>
                        {crop.efficiency}% efficiency
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Predicted</p>
                        <p className="font-bold">{crop.predicted} tonnes</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Actual</p>
                        <p className="font-bold">{crop.actual} tonnes</p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          crop.efficiency >= 100 ? 'bg-success' : 'bg-destructive'
                        }`}
                        style={{ width: `${Math.min(crop.efficiency, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Price Trends (6 months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 rounded-lg">
                    <h4 className="font-medium text-success">Best Performing</h4>
                    <p className="text-sm text-muted-foreground">Onions: +45% price increase</p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg">
                    <h4 className="font-medium text-destructive">Declining</h4>
                    <p className="text-sm text-muted-foreground">Tomatoes: -12% price decrease</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-primary bg-primary/5">
                    <p className="text-sm font-medium">Seasonal Demand</p>
                    <p className="text-xs text-muted-foreground">Winter vegetables showing strong demand</p>
                  </div>
                  <div className="p-3 border-l-4 border-accent bg-accent/5">
                    <p className="text-sm font-medium">Export Opportunity</p>
                    <p className="text-xs text-muted-foreground">Cotton exports up 20% this quarter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Predictions</CardTitle>
              <p className="text-sm text-muted-foreground">Next 3 months forecast</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium text-primary">Revenue Forecast</h4>
                  <p className="text-2xl font-bold mt-2">₹4.8L - ₹5.2L</p>
                  <p className="text-sm text-muted-foreground">Expected revenue for next quarter</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h5 className="font-medium">Weather Impact</h5>
                    <p className="text-sm text-muted-foreground mt-1">Normal monsoon predicted - positive for Kharif crops</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h5 className="font-medium">Market Outlook</h5>
                    <p className="text-sm text-muted-foreground mt-1">Wheat prices expected to rise 8-12% by April</p>
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

export default Analytics;