import { useState } from "react";
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart, Filter, Share, Edit, Trash2, Plus, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [selectedReportType, setSelectedReportType] = useState("all");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isCreateScheduleOpen, setIsCreateScheduleOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    frequency: "Weekly",
    recipients: "",
    format: "PDF"
  });

  const reportData = {
    cropPerformance: {
      totalYield: 1250,
      yieldIncrease: 15.2,
      topCrop: "Wheat",
      avgYieldPerAcre: 45.8
    },
    financial: {
      totalRevenue: 87500,
      totalExpenses: 45200,
      netProfit: 42300,
      profitMargin: 48.3
    },
    soilHealth: {
      healthyFields: 3,
      totalFields: 4,
      avgPh: 6.5,
      improvementRate: 12.5
    },
    weather: {
      favorableDays: 28,
      totalDays: 30,
      rainfall: 125,
      temperature: 22.5
    }
  };

  const recentReports = [
    {
      id: 1,
      title: "Monthly Crop Performance Report",
      type: "Crop Analysis",
      date: "2025-01-15",
      status: "Generated",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "Financial Summary Q4 2024",
      type: "Financial",
      date: "2025-01-10",
      status: "Generated",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Soil Health Assessment",
      type: "Soil Analysis",
      date: "2025-01-08",
      status: "Generated",
      size: "3.1 MB"
    },
    {
      id: 4,
      title: "Weather Impact Analysis",
      type: "Weather",
      date: "2025-01-05",
      status: "Generated",
      size: "1.5 MB"
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      title: "Weekly Crop Update",
      frequency: "Weekly",
      nextRun: "2025-01-22",
      recipients: 3
    },
    {
      id: 2,
      title: "Monthly Financial Report",
      frequency: "Monthly",
      nextRun: "2025-02-01",
      recipients: 5
    },
    {
      id: 3,
      title: "Quarterly Soil Analysis",
      frequency: "Quarterly",
      nextRun: "2025-04-01",
      recipients: 2
    }
  ];

  const generateReport = async (type: string) => {
    setIsGeneratingReport(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reportName = `${type.replace(' ', '_')}_Report_${new Date().toISOString().split('T')[0]}`;
      
      // Add to recent reports
      const newReport = {
        id: recentReports.length + 1,
        title: `${type} Report - ${new Date().toLocaleDateString()}`,
        type: type === 'all' ? 'Comprehensive' : type.charAt(0).toUpperCase() + type.slice(1),
        date: new Date().toISOString().split('T')[0],
        status: "Generated",
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`
      };
      
      // In a real app, this would update the state
      toast.success(`${type} report generated successfully!`);
    } catch (error) {
      toast.error("Failed to generate report. Please try again.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const downloadReport = async (reportId: number) => {
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Report downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download report.");
    }
  };

  const shareReport = async (reportId: number) => {
    try {
      // Simulate sharing
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Report shared successfully!");
    } catch (error) {
      toast.error("Failed to share report.");
    }
  };

  const createScheduledReport = () => {
    if (!newSchedule.title || !newSchedule.recipients) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // In a real app, this would save to backend
    toast.success("Scheduled report created successfully!");
    setIsCreateScheduleOpen(false);
    setNewSchedule({
      title: "",
      frequency: "Weekly",
      recipients: "",
      format: "PDF"
    });
  };

  const deleteScheduledReport = (id: number) => {
    // In a real app, this would delete from backend
    toast.success("Scheduled report deleted successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate comprehensive reports and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Dialog open={isCreateScheduleOpen} onOpenChange={setIsCreateScheduleOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Scheduled Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    value={newSchedule.title}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter report title"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={newSchedule.frequency} onValueChange={(value) => setNewSchedule(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="recipients">Recipients (Email)</Label>
                  <Input
                    id="recipients"
                    value={newSchedule.recipients}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, recipients: e.target.value }))}
                    placeholder="Enter email addresses"
                  />
                </div>
                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select value={newSchedule.format} onValueChange={(value) => setNewSchedule(prev => ({ ...prev, format: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Excel">Excel</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateScheduleOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createScheduledReport}>
                    Create Schedule
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={() => generateReport(selectedReportType)} disabled={isGeneratingReport}>
            <FileText className="h-4 w-4 mr-2" />
            {isGeneratingReport ? "Generating..." : "Generate Report"}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{reportData.cropPerformance.yieldIncrease}%</p>
                <p className="text-sm text-muted-foreground">Yield Increase</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">${reportData.financial.netProfit.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Net Profit</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                <PieChart className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-foreground">{reportData.soilHealth.healthyFields}/{reportData.soilHealth.totalFields}</p>
                <p className="text-sm text-muted-foreground">Healthy Fields</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-warning-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning-foreground">{reportData.weather.favorableDays}/{reportData.weather.totalDays}</p>
                <p className="text-sm text-muted-foreground">Favorable Days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <p className="text-sm text-muted-foreground">Create custom reports with specific parameters</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="crop">Crop Performance</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="soil">Soil Health</SelectItem>
                  <SelectItem value="weather">Weather Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last3months">Last 3 Months</SelectItem>
                  <SelectItem value="last6months">Last 6 Months</SelectItem>
                  <SelectItem value="lastyear">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => generateReport(selectedReportType)} disabled={isGeneratingReport} className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                {isGeneratingReport ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Tabs */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <p className="text-sm text-muted-foreground">Your recently generated reports</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{report.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{report.type}</span>
                          <span>{new Date(report.date).toLocaleDateString()}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{report.status}</Badge>
                      <Button variant="outline" size="sm" onClick={() => downloadReport(report.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => shareReport(report.id)}>
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <p className="text-sm text-muted-foreground">Automated report generation</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{report.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{report.frequency}</span>
                          <span>Next: {new Date(report.nextRun).toLocaleDateString()}</span>
                          <span>{report.recipients} recipients</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Pause
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteScheduledReport(report.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Crop Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Crop Performance Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Yield and productivity over time</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Yield</span>
                    <span className="text-2xl font-bold text-success">{reportData.cropPerformance.totalYield} tons</span>
                  </div>
                  <Progress value={85} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Top Crop</p>
                      <p className="font-bold">{reportData.cropPerformance.topCrop}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Yield/Acre</p>
                      <p className="font-bold">{reportData.cropPerformance.avgYieldPerAcre} tons</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <p className="text-sm text-muted-foreground">Revenue, expenses, and profitability</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Revenue</span>
                      <span className="font-bold text-success">${reportData.financial.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Expenses</span>
                      <span className="font-bold text-destructive">${reportData.financial.totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-medium">Net Profit</span>
                      <span className="font-bold text-success">${reportData.financial.netProfit.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profit Margin</span>
                      <span className="font-bold">{reportData.financial.profitMargin}%</span>
                    </div>
                    <Progress value={reportData.financial.profitMargin} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soil Health Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Soil Health Summary</CardTitle>
                <p className="text-sm text-muted-foreground">Field health and improvement metrics</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Healthy Fields</span>
                    <span className="text-2xl font-bold text-success">{reportData.soilHealth.healthyFields}/{reportData.soilHealth.totalFields}</span>
                  </div>
                  <Progress value={(reportData.soilHealth.healthyFields / reportData.soilHealth.totalFields) * 100} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Average pH</p>
                      <p className="font-bold">{reportData.soilHealth.avgPh}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Improvement Rate</p>
                      <p className="font-bold text-success">+{reportData.soilHealth.improvementRate}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Weather Impact Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Weather conditions and farming impact</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Favorable Days</span>
                    <span className="text-2xl font-bold text-success">{reportData.weather.favorableDays}/{reportData.weather.totalDays}</span>
                  </div>
                  <Progress value={(reportData.weather.favorableDays / reportData.weather.totalDays) * 100} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Rainfall</p>
                      <p className="font-bold">{reportData.weather.rainfall} mm</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Temperature</p>
                      <p className="font-bold">{reportData.weather.temperature}°C</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
