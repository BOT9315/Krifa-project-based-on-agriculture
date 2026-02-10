import { useState } from "react";
import { Leaf, Droplets, Wind, Sun, Recycle, Award, TrendingDown, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Sustainability = () => {
  const [sustainabilityScore, setSustainabilityScore] = useState(78);
  const [carbonFootprint, setCarbonFootprint] = useState(2.3);
  const [waterUsage, setWaterUsage] = useState(2450);

  const sustainabilityMetrics = {
    carbonFootprint: {
      current: 2.3,
      target: 1.8,
      unit: "tons CO2/ha",
      trend: -12,
      status: "On Track"
    },
    waterEfficiency: {
      current: 0.85,
      target: 0.90,
      unit: "m³/ton",
      trend: 8,
      status: "Improving"
    },
    renewableEnergy: {
      current: 35,
      target: 50,
      unit: "%",
      trend: 15,
      status: "Good Progress"
    },
    wasteRecycling: {
      current: 68,
      target: 80,
      unit: "%",
      trend: 5,
      status: "Steady"
    }
  };

  const sustainablePractices = [
    {
      id: 1,
      practice: "Drip Irrigation System",
      implemented: true,
      impact: "35% water savings",
      cost: "₹45,000",
      payback: "18 months",
      description: "Precision irrigation reduces water waste and improves crop yield"
    },
    {
      id: 2,
      practice: "Solar Panel Installation",
      implemented: true,
      impact: "40% energy cost reduction",
      cost: "₹2,50,000",
      payback: "4 years",
      description: "Solar power for irrigation pumps and farm operations"
    },
    {
      id: 3,
      practice: "Organic Pest Management",
      implemented: false,
      impact: "60% reduction in chemical use",
      cost: "₹15,000",
      payback: "12 months",
      description: "Natural predators and organic pesticides for pest control"
    },
    {
      id: 4,
      practice: "Crop Rotation Planning",
      implemented: true,
      impact: "25% improvement in soil health",
      cost: "₹5,000",
      payback: "6 months",
      description: "Rotating crops to maintain soil fertility and reduce pests"
    },
    {
      id: 5,
      practice: "Composting System",
      implemented: false,
      impact: "50% waste reduction",
      cost: "₹8,000",
      payback: "8 months",
      description: "Convert farm waste into nutrient-rich compost"
    }
  ];

  const certifications = [
    {
      name: "Organic Farming Certification",
      status: "In Progress",
      progress: 75,
      requirements: ["3 years organic farming", "Soil testing", "Documentation"],
      benefits: ["Premium pricing", "Export opportunities", "Government subsidies"]
    },
    {
      name: "Carbon Neutral Certification",
      status: "Applied",
      progress: 60,
      requirements: ["Carbon audit", "Offset programs", "Monitoring system"],
      benefits: ["Brand value", "CSR compliance", "Market access"]
    },
    {
      name: "Water Conservation Award",
      status: "Eligible",
      progress: 90,
      requirements: ["Water audit", "Efficiency measures", "Documentation"],
      benefits: ["Recognition", "Incentives", "Best practices sharing"]
    }
  ];

  const environmentalImpact = {
    treesPlanted: 150,
    waterSaved: 125000,
    carbonReduced: 8.5,
    energyGenerated: 45000,
    wasteRecycled: 2500
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "default";
      case "Improving": return "secondary";
      case "Good Progress": return "outline";
      case "Steady": return "secondary";
      default: return "outline";
    }
  };

  const getPracticeStatusColor = (implemented: boolean) => {
    return implemented ? "default" : "outline";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sustainability Dashboard</h1>
          <p className="text-muted-foreground">Track your environmental impact and sustainable farming practices</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Set Goals
          </Button>
          <Button>
            <Award className="h-4 w-4 mr-2" />
            Get Certified
          </Button>
        </div>
      </div>

      {/* Overall Sustainability Score */}
      <Card className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Sustainability Score</h2>
              <p className="text-muted-foreground">Overall environmental performance</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-success">{sustainabilityScore}%</div>
              <div className="w-32 mt-2">
                <Progress value={sustainabilityScore} className="h-3" />
              </div>
              <p className="text-xs text-success mt-1">+5% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="practices">Sustainable Practices</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{sustainabilityMetrics.carbonFootprint.current}</p>
                    <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                    <p className="text-xs text-success">{sustainabilityMetrics.carbonFootprint.trend}% vs target</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">{(sustainabilityMetrics.waterEfficiency.current * 100).toFixed(0)}%</p>
                    <p className="text-sm text-muted-foreground">Water Efficiency</p>
                    <p className="text-xs text-success">+{sustainabilityMetrics.waterEfficiency.trend}% improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                    <Sun className="h-5 w-5 text-warning-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-warning-foreground">{sustainabilityMetrics.renewableEnergy.current}%</p>
                    <p className="text-sm text-muted-foreground">Renewable Energy</p>
                    <p className="text-xs text-success">+{sustainabilityMetrics.renewableEnergy.trend}% this year</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Recycle className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent-foreground">{sustainabilityMetrics.wasteRecycling.current}%</p>
                    <p className="text-sm text-muted-foreground">Waste Recycling</p>
                    <p className="text-xs text-success">+{sustainabilityMetrics.wasteRecycling.trend}% efficiency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Goals Progress</CardTitle>
              <p className="text-sm text-muted-foreground">Track progress towards your environmental targets</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(sustainabilityMetrics).map(([key, metric]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Target: {metric.target} {metric.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                        <p className="text-sm font-medium mt-1">
                          {metric.current} {metric.unit}
                        </p>
                      </div>
                    </div>
                    <Progress
                      value={(metric.current / metric.target) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practices" className="space-y-6">
          <Alert>
            <Leaf className="h-4 w-4" />
            <AlertDescription>
              <strong>Sustainable farming tip:</strong> Implementing drip irrigation can save up to 50% water while increasing crop yield by 20-30%.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {sustainablePractices.map((practice) => (
              <Card key={practice.id} className="shadow-soft border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-foreground text-lg">{practice.practice}</h4>
                        <Badge variant={getPracticeStatusColor(practice.implemented)}>
                          {practice.implemented ? "Implemented" : "Not Implemented"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{practice.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Environmental Impact</p>
                      <p className="font-bold text-success">{practice.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Investment</p>
                      <p className="font-bold text-foreground">{practice.cost}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Payback Period</p>
                      <p className="font-bold text-primary">{practice.payback}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ROI</p>
                      <p className="font-bold text-success">
                        {Math.round((parseInt(practice.cost.replace(/[^\d]/g, '')) /
                          (parseInt(practice.payback.split(' ')[0]) * 12) * 100))}%
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {practice.implemented ? (
                      <Button variant="outline" size="sm">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Monitor Performance
                      </Button>
                    ) : (
                      <Button size="sm">
                        <Target className="h-4 w-4 mr-2" />
                        Plan Implementation
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="shadow-soft border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-lg">{cert.name}</h4>
                      <p className="text-muted-foreground mb-2">Status: {cert.status}</p>
                    </div>
                    <Badge variant={cert.status === "In Progress" ? "secondary" : "default"}>
                      {cert.status}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-medium">{cert.progress}%</span>
                    </div>
                    <Progress value={cert.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Requirements</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {cert.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Benefits</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {cert.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-success" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm">
                      {cert.status === "Eligible" ? "Apply Now" : "View Details"}
                    </Button>
                    <Button variant="outline" size="sm">
                      Download Guidelines
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-6 text-center">
                <Leaf className="h-12 w-12 text-success mx-auto mb-4" />
                <p className="text-3xl font-bold text-success mb-2">{environmentalImpact.treesPlanted}</p>
                <p className="text-muted-foreground">Trees Planted</p>
                <p className="text-xs text-success mt-1">+12 this month</p>
              </CardContent>
            </Card>

            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <Droplets className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-3xl font-bold text-primary mb-2">{(environmentalImpact.waterSaved / 1000).toFixed(0)}K</p>
                <p className="text-muted-foreground">Liters Water Saved</p>
                <p className="text-xs text-primary mt-1">+8% efficiency</p>
              </CardContent>
            </Card>

            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="p-6 text-center">
                <Wind className="h-12 w-12 text-warning-foreground mx-auto mb-4" />
                <p className="text-3xl font-bold text-warning-foreground mb-2">{environmentalImpact.carbonReduced}</p>
                <p className="text-muted-foreground">Tons CO2 Reduced</p>
                <p className="text-xs text-success mt-1">-15% emissions</p>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-6 text-center">
                <Sun className="h-12 w-12 text-accent-foreground mx-auto mb-4" />
                <p className="text-3xl font-bold text-accent-foreground mb-2">{(environmentalImpact.energyGenerated / 1000).toFixed(0)}K</p>
                <p className="text-muted-foreground">kWh Generated</p>
                <p className="text-xs text-success mt-1">+25% renewable</p>
              </CardContent>
            </Card>

            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="p-6 text-center">
                <Recycle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <p className="text-3xl font-bold text-destructive mb-2">{(environmentalImpact.wasteRecycled / 1000).toFixed(1)}K</p>
                <p className="text-muted-foreground">kg Waste Recycled</p>
                <p className="text-xs text-success mt-1">+18% recycling rate</p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/10 border-secondary/20">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-secondary-foreground mx-auto mb-4" />
                <p className="text-3xl font-bold text-secondary-foreground mb-2">₹2.5L</p>
                <p className="text-muted-foreground">Sustainability Savings</p>
                <p className="text-xs text-success mt-1">+22% this year</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Environmental Impact Report</CardTitle>
              <p className="text-sm text-muted-foreground">Your contribution to a sustainable future</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-success/10 rounded-lg">
                  <h4 className="font-medium text-success mb-2">🌱 Carbon Sequestration</h4>
                  <p className="text-sm text-muted-foreground">
                    Your farm has sequestered 2.3 tons of CO2 this month through sustainable practices,
                    equivalent to planting 45 mature trees.
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">💧 Water Conservation</h4>
                  <p className="text-sm text-muted-foreground">
                    Saved 12,500 liters of water through efficient irrigation, enough to meet
                    the daily needs of 50 rural households.
                  </p>
                </div>

                <div className="p-4 bg-warning/10 rounded-lg">
                  <h4 className="font-medium text-warning-foreground mb-2">⚡ Renewable Energy</h4>
                  <p className="text-sm text-muted-foreground">
                    Generated 4,500 kWh from solar panels, offsetting 3.2 tons of CO2 emissions
                    from conventional energy sources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sustainability;
