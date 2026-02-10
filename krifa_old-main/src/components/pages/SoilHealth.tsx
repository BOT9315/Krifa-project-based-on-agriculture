import { useState } from "react";
import { TestTube, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Plus, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SoilHealth = () => {
  const [soilData] = useState([
    {
      id: 1,
      location: "Block A - Wheat Field",
      lastTested: "2025-01-10",
      ph: 6.8,
      nitrogen: 45,
      phosphorus: 28,
      potassium: 180,
      organicMatter: 2.3,
      status: "Good",
      recommendations: [
        "Maintain current fertilization schedule",
        "Monitor pH levels quarterly"
      ]
    },
    {
      id: 2,
      location: "Block B - Tomato Field",
      lastTested: "2025-01-08",
      ph: 7.2,
      nitrogen: 38,
      phosphorus: 22,
      potassium: 165,
      organicMatter: 1.8,
      status: "Fair",
      recommendations: [
        "Increase nitrogen fertilization",
        "Add organic compost",
        "Test soil again in 2 weeks"
      ]
    },
    {
      id: 3,
      location: "Block C - Cotton Field",
      lastTested: "2025-01-05",
      ph: 6.2,
      nitrogen: 52,
      phosphorus: 35,
      potassium: 195,
      organicMatter: 2.8,
      status: "Excellent",
      recommendations: [
        "Soil conditions optimal",
        "Continue current practices"
      ]
    },
    {
      id: 4,
      location: "Block D - Onion Field",
      lastTested: "2025-01-12",
      ph: 5.8,
      nitrogen: 28,
      phosphorus: 18,
      potassium: 140,
      organicMatter: 1.5,
      status: "Poor",
      recommendations: [
        "Immediate pH correction needed",
        "Increase potassium levels",
        "Add lime to raise pH",
        "Apply balanced NPK fertilizer"
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "default";
      case "Good": return "secondary";
      case "Fair": return "outline";
      case "Poor": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Excellent": return <CheckCircle className="h-4 w-4" />;
      case "Good": return <CheckCircle className="h-4 w-4" />;
      case "Fair": return <AlertTriangle className="h-4 w-4" />;
      case "Poor": return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getNutrientLevel = (value: number, type: string) => {
    const ranges = {
      ph: { min: 6.0, max: 7.5, optimal: [6.5, 7.0] },
      nitrogen: { min: 30, max: 60, optimal: [40, 50] },
      phosphorus: { min: 20, max: 40, optimal: [25, 35] },
      potassium: { min: 150, max: 250, optimal: [180, 220] },
      organicMatter: { min: 1.5, max: 3.0, optimal: [2.0, 2.5] }
    };

    const range = ranges[type as keyof typeof ranges];
    if (!range) return "Unknown";

    if (value >= range.optimal[0] && value <= range.optimal[1]) return "Optimal";
    if (value >= range.min && value <= range.max) return "Adequate";
    if (value < range.min) return "Low";
    return "High";
  };

  const getNutrientColor = (level: string) => {
    switch (level) {
      case "Optimal": return "text-success";
      case "Adequate": return "text-primary";
      case "Low": return "text-destructive";
      case "High": return "text-warning-foreground";
      default: return "text-muted-foreground";
    }
  };

  const overallHealthScore = Math.round(
    soilData.reduce((sum, soil) => {
      const score = soil.status === "Excellent" ? 100 :
                   soil.status === "Good" ? 80 :
                   soil.status === "Fair" ? 60 : 40;
      return sum + score;
    }, 0) / soilData.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Soil Health Dashboard</h1>
          <p className="text-muted-foreground">Monitor soil conditions and get recommendations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Soil Test
          </Button>
        </div>
      </div>

      {/* Overall Health Score */}
      <Card className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Overall Soil Health</h2>
              <p className="text-muted-foreground">Average health score across all fields</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-success">{overallHealthScore}%</div>
              <div className="w-32 mt-2">
                <Progress value={overallHealthScore} className="h-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">
                  {soilData.filter(s => s.status === "Excellent" || s.status === "Good").length}
                </p>
                <p className="text-sm text-muted-foreground">Healthy Fields</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning-foreground">
                  {soilData.filter(s => s.status === "Fair").length}
                </p>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">
                  {soilData.filter(s => s.status === "Poor").length}
                </p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <TestTube className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{soilData.length}</p>
                <p className="text-sm text-muted-foreground">Total Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Soil Analysis */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Field Overview</TabsTrigger>
          <TabsTrigger value="nutrients">Nutrient Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {soilData.map((soil) => (
              <Card key={soil.id} className="shadow-soft border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">{soil.location}</CardTitle>
                      <p className="text-sm text-muted-foreground">Last tested: {new Date(soil.lastTested).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={getStatusColor(soil.status)} className="flex items-center space-x-1">
                      {getStatusIcon(soil.status)}
                      <span>{soil.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">pH Level</p>
                      <p className="font-bold text-foreground">{soil.ph}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Organic Matter</p>
                      <p className="font-bold text-foreground">{soil.organicMatter}%</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Nutrient Levels (kg/ha)</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="text-muted-foreground">N</p>
                        <p className="font-bold">{soil.nitrogen}</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="text-muted-foreground">P</p>
                        <p className="font-bold">{soil.phosphorus}</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="text-muted-foreground">K</p>
                        <p className="font-bold">{soil.potassium}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nutrients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nutrient Status Across Fields</CardTitle>
              <p className="text-sm text-muted-foreground">Current nutrient levels and optimal ranges</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {soilData.map((soil) => (
                  <div key={soil.id} className="space-y-3">
                    <h4 className="font-medium text-foreground">{soil.location}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>pH</span>
                          <span className={getNutrientColor(getNutrientLevel(soil.ph, 'ph'))}>
                            {getNutrientLevel(soil.ph, 'ph')}
                          </span>
                        </div>
                        <div className="text-center font-bold text-lg">{soil.ph}</div>
                        <div className="text-xs text-muted-foreground text-center">Optimal: 6.5-7.0</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Nitrogen</span>
                          <span className={getNutrientColor(getNutrientLevel(soil.nitrogen, 'nitrogen'))}>
                            {getNutrientLevel(soil.nitrogen, 'nitrogen')}
                          </span>
                        </div>
                        <div className="text-center font-bold text-lg">{soil.nitrogen}</div>
                        <div className="text-xs text-muted-foreground text-center">Optimal: 40-50</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Phosphorus</span>
                          <span className={getNutrientColor(getNutrientLevel(soil.phosphorus, 'phosphorus'))}>
                            {getNutrientLevel(soil.phosphorus, 'phosphorus')}
                          </span>
                        </div>
                        <div className="text-center font-bold text-lg">{soil.phosphorus}</div>
                        <div className="text-xs text-muted-foreground text-center">Optimal: 25-35</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Potassium</span>
                          <span className={getNutrientColor(getNutrientLevel(soil.potassium, 'potassium'))}>
                            {getNutrientLevel(soil.potassium, 'potassium')}
                          </span>
                        </div>
                        <div className="text-center font-bold text-lg">{soil.potassium}</div>
                        <div className="text-xs text-muted-foreground text-center">Optimal: 180-220</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Organic Matter</span>
                          <span className={getNutrientColor(getNutrientLevel(soil.organicMatter, 'organicMatter'))}>
                            {getNutrientLevel(soil.organicMatter, 'organicMatter')}
                          </span>
                        </div>
                        <div className="text-center font-bold text-lg">{soil.organicMatter}%</div>
                        <div className="text-xs text-muted-foreground text-center">Optimal: 2.0-2.5%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-4">
            {soilData.map((soil) => (
              <Card key={soil.id} className="shadow-soft border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground">{soil.location}</CardTitle>
                    <Badge variant={getStatusColor(soil.status)}>
                      {soil.status} Health
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Recommended Actions:</h4>
                    <ul className="space-y-2">
                      {soil.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SoilHealth;
