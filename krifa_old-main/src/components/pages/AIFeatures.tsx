import { useState, useRef } from "react";
import { Camera, Upload, Zap, TrendingUp, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const AIFeatures = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [yieldPrediction, setYieldPrediction] = useState<any>(null);
  const [pestAlerts, setPestAlerts] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));

      const mockResult = {
        disease: "Early Blight",
        confidence: 87,
        severity: "Moderate",
        recommendations: [
          "Apply copper-based fungicide immediately",
          "Improve air circulation between plants",
          "Reduce watering frequency",
          "Remove affected leaves"
        ],
        treatment: {
          products: ["Copper Oxychloride", "Mancozeb"],
          schedule: "Every 7-10 days for 3 weeks",
          preventive: "Regular crop rotation and proper spacing"
        }
      };

      setAnalysisResult(mockResult);
      toast.success("Crop analysis completed!");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const predictYield = async () => {
    try {
      // Simulate yield prediction
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockPrediction = {
        crop: "Wheat",
        predictedYield: 4.8,
        confidence: 92,
        factors: {
          weather: "Favorable",
          soilHealth: "Good",
          irrigation: "Optimal",
          pestPressure: "Low"
        },
        recommendations: [
          "Maintain current irrigation schedule",
          "Monitor for aphids in next 2 weeks",
          "Apply nitrogen fertilizer in 10 days"
        ]
      };

      setYieldPrediction(mockPrediction);
      toast.success("Yield prediction generated!");
    } catch (error) {
      toast.error("Prediction failed. Please try again.");
    }
  };

  const generatePestAlerts = () => {
    const mockAlerts = [
      {
        id: 1,
        pest: "Aphids",
        location: "Block A - Wheat Field",
        severity: "High",
        detected: "2 hours ago",
        action: "Immediate treatment required"
      },
      {
        id: 2,
        pest: "Thrips",
        location: "Block B - Tomato Field",
        severity: "Medium",
        detected: "1 day ago",
        action: "Monitor closely"
      },
      {
        id: 3,
        pest: "Whiteflies",
        location: "Block C - Cotton Field",
        severity: "Low",
        detected: "3 days ago",
        action: "Continue monitoring"
      }
    ];

    setPestAlerts(mockAlerts);
    toast.success("Pest monitoring updated!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI-Powered Features</h1>
          <p className="text-muted-foreground">Smart farming with artificial intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={generatePestAlerts}>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Update Pest Monitoring
          </Button>
        </div>
      </div>

      <Tabs defaultValue="disease-detection" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="disease-detection">Disease Detection</TabsTrigger>
          <TabsTrigger value="yield-prediction">Yield Prediction</TabsTrigger>
          <TabsTrigger value="pest-monitoring">Pest Monitoring</TabsTrigger>
          <TabsTrigger value="smart-irrigation">Smart Irrigation</TabsTrigger>
        </TabsList>

        <TabsContent value="disease-detection" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Crop Disease Detection</CardTitle>
                <p className="text-sm text-muted-foreground">Upload a photo of your crop for instant analysis</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img
                        src={selectedImage}
                        alt="Crop"
                        className="max-w-full h-48 object-cover rounded-lg mx-auto"
                      />
                      <div className="flex space-x-2 justify-center">
                        <Button onClick={analyzeCrop} disabled={isAnalyzing}>
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 mr-2" />
                              Analyze Disease
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-foreground">Upload Crop Photo</p>
                        <p className="text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
                      </div>
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <p className="text-sm text-muted-foreground">AI-powered disease detection and recommendations</p>
              </CardHeader>
              <CardContent>
                {analysisResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">{analysisResult.disease}</h3>
                      <Badge variant={analysisResult.severity === 'Moderate' ? 'secondary' : 'destructive'}>
                        {analysisResult.severity}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence</span>
                        <span className="font-medium">{analysisResult.confidence}%</span>
                      </div>
                      <Progress value={analysisResult.confidence} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Recommendations:</h4>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Treatment:</strong> {analysisResult.treatment.schedule}
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Upload a crop photo to see analysis results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="yield-prediction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Yield Prediction</CardTitle>
              <p className="text-sm text-muted-foreground">Predict crop yields based on current conditions</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Button onClick={predictYield} size="lg">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Generate Yield Prediction
                </Button>
              </div>

              {yieldPrediction && (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-success/10 rounded-lg">
                    <h3 className="text-2xl font-bold text-success mb-2">
                      {yieldPrediction.predictedYield} tonnes/ha
                    </h3>
                    <p className="text-muted-foreground">Predicted yield for {yieldPrediction.crop}</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Prediction Confidence</span>
                        <span className="font-medium">{yieldPrediction.confidence}%</span>
                      </div>
                      <Progress value={yieldPrediction.confidence} className="h-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Contributing Factors</h4>
                      <div className="space-y-2">
                        {Object.entries(yieldPrediction.factors).map(([factor, status]) => (
                          <div key={factor} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                            <span className="text-sm capitalize">{factor.replace(/([A-Z])/g, ' $1')}</span>
                            <Badge variant={status === 'Favorable' || status === 'Good' || status === 'Optimal' ? 'default' : 'secondary'}>
                              {String(status)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {yieldPrediction.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pest-monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                  <div>
                    <p className="text-2xl font-bold text-destructive">
                      {pestAlerts.filter(alert => alert.severity === 'High').length}
                    </p>
                    <p className="text-sm text-muted-foreground">High Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-8 w-8 text-warning-foreground" />
                  <div>
                    <p className="text-2xl font-bold text-warning-foreground">
                      {pestAlerts.filter(alert => alert.severity === 'Medium').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Medium Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold text-success">
                      {pestAlerts.filter(alert => alert.severity === 'Low').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Low Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pest Detection Alerts</CardTitle>
              <p className="text-sm text-muted-foreground">Real-time pest monitoring across your fields</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pestAlerts.length > 0 ? (
                  pestAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex items-start space-x-4">
                        <AlertTriangle className={`h-5 w-5 mt-1 ${
                          alert.severity === 'High' ? 'text-destructive' :
                          alert.severity === 'Medium' ? 'text-warning-foreground' : 'text-success'
                        }`} />
                        <div>
                          <h4 className="font-medium text-foreground">{alert.pest} Detected</h4>
                          <p className="text-sm text-muted-foreground">{alert.location}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.detected}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          alert.severity === 'High' ? 'destructive' :
                          alert.severity === 'Medium' ? 'secondary' : 'outline'
                        }>
                          {alert.severity} Risk
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">{alert.action}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No pest alerts at this time</p>
                    <Button onClick={generatePestAlerts} className="mt-4">
                      Check for Pests
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smart-irrigation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Irrigation Schedule</CardTitle>
                <p className="text-sm text-muted-foreground">AI-optimized watering recommendations</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="font-medium">Block A - Wheat</span>
                    <Badge variant="default">Water Today</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                    <span className="font-medium">Block B - Tomatoes</span>
                    <Badge variant="secondary">Optimal Moisture</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                    <span className="font-medium">Block C - Cotton</span>
                    <Badge variant="outline">Water in 2 days</Badge>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Weather Alert:</strong> Light rain expected tomorrow. Irrigation can be reduced by 30%.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Usage Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">Monitor and optimize water consumption</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">2,450 L</p>
                  <p className="text-sm text-muted-foreground">Water used this week</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Efficiency Score</span>
                    <span className="font-medium text-success">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>vs Last Week</span>
                    <span className="font-medium text-success">-12%</span>
                  </div>
                </div>

                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm font-medium text-success">💧 Water saved: 340 liters this week</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIFeatures;
