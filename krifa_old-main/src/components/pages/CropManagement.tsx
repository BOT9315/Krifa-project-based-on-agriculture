import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Calendar, Droplets, TrendingUp, AlertTriangle, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CropManagement = () => {
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Winter Wheat",
      variety: "HD-2967",
      area: "5.2 acres",
      plantedDate: "2024-12-15",
      expectedHarvest: "2025-04-20",
      currentStage: "Tillering",
      healthScore: 92,
      yieldPrediction: "4.2 tonnes",
      issues: [],
      status: "healthy"
    },
    {
      id: 2,
      name: "Tomatoes",
      variety: "Roma VF",
      area: "2.8 acres",
      plantedDate: "2024-11-01",
      expectedHarvest: "2025-02-15",
      currentStage: "Fruiting",
      healthScore: 78,
      yieldPrediction: "12.5 tonnes",
      issues: ["Early blight detected"],
      status: "warning"
    },
    {
      id: 3,
      name: "Cotton",
      variety: "Bt Cotton",
      area: "7.5 acres",
      plantedDate: "2024-06-15",
      expectedHarvest: "2024-12-30",
      currentStage: "Harvesting",
      healthScore: 85,
      yieldPrediction: "15.8 quintals",
      issues: [],
      status: "harvest"
    },
    {
      id: 4,
      name: "Onions",
      variety: "Nashik Red",
      area: "1.5 acres",
      plantedDate: "2024-10-20",
      expectedHarvest: "2025-03-10",
      currentStage: "Bulb Formation",
      healthScore: 65,
      yieldPrediction: "8.2 tonnes",
      issues: ["Thrips infestation", "Irregular watering"],
      status: "critical"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<any>(null);
  const [newCrop, setNewCrop] = useState({
    name: "",
    variety: "",
    area: "",
    plantedDate: "",
    expectedHarvest: "",
    currentStage: "Seedling",
    healthScore: 100,
    yieldPrediction: "",
    issues: "",
    status: "healthy"
  });

  // Load crops from localStorage on component mount
  useEffect(() => {
    const savedCrops = localStorage.getItem('farmCrops');
    if (savedCrops) {
      setCrops(JSON.parse(savedCrops));
    }
  }, []);

  // Save crops to localStorage whenever crops change
  useEffect(() => {
    localStorage.setItem('farmCrops', JSON.stringify(crops));
  }, [crops]);

  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.variety || !newCrop.area) {
      alert("Please fill in all required fields");
      return;
    }

    const crop = {
      id: Date.now(),
      ...newCrop,
      issues: newCrop.issues ? newCrop.issues.split(',').map(issue => issue.trim()) : []
    };

    setCrops([...crops, crop]);
    setNewCrop({
      name: "",
      variety: "",
      area: "",
      plantedDate: "",
      expectedHarvest: "",
      currentStage: "Seedling",
      healthScore: 100,
      yieldPrediction: "",
      issues: "",
      status: "healthy"
    });
    setIsAddDialogOpen(false);
  };

  const handleEditCrop = (crop: any) => {
    setEditingCrop(crop);
    setNewCrop({
      ...crop,
      issues: crop.issues.join(', ')
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdateCrop = () => {
    if (!newCrop.name || !newCrop.variety || !newCrop.area) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedCrop = {
      ...editingCrop,
      ...newCrop,
      issues: newCrop.issues ? newCrop.issues.split(',').map(issue => issue.trim()) : []
    };

    setCrops(crops.map(crop => crop.id === editingCrop.id ? updatedCrop : crop));
    setEditingCrop(null);
    setNewCrop({
      name: "",
      variety: "",
      area: "",
      plantedDate: "",
      expectedHarvest: "",
      currentStage: "Seedling",
      healthScore: 100,
      yieldPrediction: "",
      issues: "",
      status: "healthy"
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteCrop = (cropId: number) => {
    if (window.confirm("Are you sure you want to delete this crop?")) {
      setCrops(crops.filter(crop => crop.id !== cropId));
    }
  };

  const handleCancel = () => {
    setEditingCrop(null);
    setNewCrop({
      name: "",
      variety: "",
      area: "",
      plantedDate: "",
      expectedHarvest: "",
      currentStage: "Seedling",
      healthScore: 100,
      yieldPrediction: "",
      issues: "",
      status: "healthy"
    });
    setIsAddDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "default";
      case "warning": return "secondary";
      case "critical": return "destructive";
      case "harvest": return "outline";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <TrendingUp className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      case "harvest": return <Calendar className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Crop Management</h1>
          <p className="text-muted-foreground">Monitor and manage your crops throughout their lifecycle</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Crop</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCrop ? "Edit Crop" : "Add New Crop"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cropName">Crop Name</Label>
                  <Input
                    id="cropName"
                    value={newCrop.name}
                    onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                    placeholder="e.g., Wheat, Tomato"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variety">Variety</Label>
                  <Input
                    id="variety"
                    value={newCrop.variety}
                    onChange={(e) => setNewCrop({...newCrop, variety: e.target.value})}
                    placeholder="e.g., HD-2967"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Area (acres)</Label>
                  <Input
                    id="area"
                    value={newCrop.area}
                    onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                    placeholder="e.g., 5.2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Current Stage</Label>
                  <Select value={newCrop.currentStage} onValueChange={(value) => setNewCrop({...newCrop, currentStage: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Seedling">Seedling</SelectItem>
                      <SelectItem value="Vegetative">Vegetative</SelectItem>
                      <SelectItem value="Flowering">Flowering</SelectItem>
                      <SelectItem value="Fruiting">Fruiting</SelectItem>
                      <SelectItem value="Harvesting">Harvesting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plantedDate">Planted Date</Label>
                  <Input
                    id="plantedDate"
                    type="date"
                    value={newCrop.plantedDate}
                    onChange={(e) => setNewCrop({...newCrop, plantedDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedHarvest">Expected Harvest</Label>
                  <Input
                    id="expectedHarvest"
                    type="date"
                    value={newCrop.expectedHarvest}
                    onChange={(e) => setNewCrop({...newCrop, expectedHarvest: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yieldPrediction">Expected Yield</Label>
                  <Input
                    id="yieldPrediction"
                    value={newCrop.yieldPrediction}
                    onChange={(e) => setNewCrop({...newCrop, yieldPrediction: e.target.value})}
                    placeholder="e.g., 4.2 tonnes"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthScore">Health Score (%)</Label>
                  <Input
                    id="healthScore"
                    type="number"
                    min="0"
                    max="100"
                    value={newCrop.healthScore}
                    onChange={(e) => setNewCrop({...newCrop, healthScore: parseInt(e.target.value) || 100})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="issues">Current Issues (comma separated)</Label>
                <Textarea
                  id="issues"
                  value={newCrop.issues}
                  onChange={(e) => setNewCrop({...newCrop, issues: e.target.value})}
                  placeholder="e.g., Pest infestation, Water stress"
                  rows={2}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={editingCrop ? handleUpdateCrop : handleAddCrop}>
                  {editingCrop ? <Save className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  {editingCrop ? "Update Crop" : "Add Crop"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                {crops.reduce((total, crop) => {
                  const area = parseFloat(crop.area.replace(' acres', ''));
                  return total + (isNaN(area) ? 0 : area);
                }, 0).toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">Total Acres</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{crops.length}</p>
              <p className="text-sm text-muted-foreground">Active Crops</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-foreground">
                {crops.length > 0 ? Math.round(crops.reduce((sum, crop) => sum + crop.healthScore, 0) / crops.length) : 0}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Health</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">
                {crops.reduce((total, crop) => total + crop.issues.length, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Issues</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crop Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {crops.map((crop) => (
          <Card key={crop.id} className="shadow-soft border-border hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">{crop.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{crop.variety} • {crop.area}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(crop.status)} className="flex items-center space-x-1">
                    {getStatusIcon(crop.status)}
                    <span className="capitalize">{crop.status}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress and Health */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Health Score</span>
                    <span className="font-medium text-foreground">{crop.healthScore}%</span>
                  </div>
                  <Progress 
                    value={crop.healthScore} 
                    className="h-2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current Stage</p>
                    <p className="font-medium text-foreground">{crop.currentStage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Predicted Yield</p>
                    <p className="font-medium text-foreground">{crop.yieldPrediction}</p>
                  </div>
                </div>
              </div>

              {/* Issues */}
              {crop.issues.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Current Issues:</p>
                  {crop.issues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-destructive/10 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-destructive">{issue}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Timeline */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground">Planted</p>
                  <p className="font-medium text-foreground">{crop.plantedDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expected Harvest</p>
                  <p className="font-medium text-foreground">{crop.expectedHarvest}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditCrop(crop)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Droplets className="h-4 w-4 mr-2" />
                  Water Log
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteCrop(crop.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-earth border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => {
              // Navigate to Task Scheduler
              const event = new CustomEvent('navigate', { detail: 'scheduler' });
              window.dispatchEvent(event);
            }}>
              <Calendar className="h-6 w-6" />
              <span>Schedule Activity</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => {
              // Log irrigation activity
              alert("Irrigation logged for all crops");
            }}>
              <Droplets className="h-6 w-6" />
              <span>Log Irrigation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => {
              // Navigate to Expenses
              const event = new CustomEvent('navigate', { detail: 'expenses' });
              window.dispatchEvent(event);
            }}>
              <Plus className="h-6 w-6" />
              <span>Add Expense</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropManagement;