import { useState, useRef } from "react";
import { Upload, Camera, Leaf, AlertTriangle, CheckCircle, X, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CropAdvisory = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    // For now, we'll simulate taking a photo
    setUploadedImage(null);
    setAnalysis(null);

    // Simulate camera delay
    setTimeout(() => {
      // Use a placeholder image for demonstration
      setUploadedImage("https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop");
      simulateAnalysis();
    }, 1000);
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalysis({
        cropType: "Wheat",
        healthScore: Math.floor(Math.random() * 40) + 60, // 60-100
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100
        issues: [
          { type: "warning", message: "Early signs of rust disease detected", severity: "medium" },
          { type: "success", message: "Good soil moisture levels", severity: "low" },
          { type: "info", message: "Consider nitrogen fertilizer in 2 weeks", severity: "low" }
        ],
        recommendations: [
          "Apply fungicide spray within 3 days",
          "Increase irrigation frequency to every 3 days",
          "Monitor for pest activity in lower leaves",
          "Schedule soil testing for nutrient analysis"
        ],
        detectedPests: ["Aphids", "Rust Fungus"],
        nutrientDeficiencies: ["Nitrogen"],
        weatherImpact: "Current weather conditions are favorable"
      });
      setIsAnalyzing(false);
      setAnalysisProgress(100);
    }, 3000);
  };

  const clearAnalysis = () => {
    setUploadedImage(null);
    setAnalysis(null);
    setAnalysisProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "default";
    }
  };

  return (
    <Card className="shadow-soft border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Leaf className="h-5 w-5 text-success" />
          <span>AI Crop Advisory</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Upload or capture crop images for instant analysis</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedImage ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
            <div className="flex justify-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-foreground font-medium">Upload Crop/Soil Image</p>
              <p className="text-sm text-muted-foreground">Get AI-powered analysis and recommendations</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="image-upload">
                <Button variant="default" className="cursor-pointer" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </span>
                </Button>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">Supports JPG, PNG up to 10MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded crop"
                className="w-full h-48 object-cover rounded-lg"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p className="text-sm">Analyzing image...</p>
                  </div>
                </div>
              )}
            </div>

            {analysis && !isAnalyzing && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">Detected: {analysis.cropType}</p>
                    <p className="text-sm text-muted-foreground">Health Score: {analysis.healthScore}%</p>
                  </div>
                  <Badge variant={analysis.healthScore > 80 ? "default" : "destructive"}>
                    {analysis.healthScore > 80 ? "Healthy" : "Needs Attention"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-foreground">Key Findings:</p>
                  {analysis.issues.map((issue: any, index: number) => (
                    <div key={index} className="flex items-start space-x-2 p-2 rounded-lg bg-muted/50">
                      {issue.type === "warning" && <AlertTriangle className="h-4 w-4 text-accent mt-0.5" />}
                      {issue.type === "success" && <CheckCircle className="h-4 w-4 text-success mt-0.5" />}
                      {issue.type === "info" && <Leaf className="h-4 w-4 text-primary mt-0.5" />}
                      <p className="text-sm text-foreground">{issue.message}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-foreground">Recommendations:</p>
                  <ul className="space-y-1">
                    {analysis.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setUploadedImage(null);
                    setAnalysis(null);
                  }}
                >
                  Analyze Another Image
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CropAdvisory;