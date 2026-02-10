import { useState, useEffect } from "react";
import { Calendar, Plus, Edit, Trash2, Clock, CheckCircle, AlertCircle, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const TaskScheduler = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Apply Fertilizer to Wheat Field",
      description: "NPK fertilizer application for Block A wheat crop",
      date: "2025-01-20",
      time: "08:00",
      priority: "High",
      status: "Pending",
      crop: "Winter Wheat",
      category: "Fertilization",
      assignedTo: "Farm Worker 1"
    },
    {
      id: 2,
      title: "Pest Control - Tomato Field",
      description: "Apply organic pesticide for early blight prevention",
      date: "2025-01-18",
      time: "10:00",
      priority: "Medium",
      status: "In Progress",
      crop: "Tomatoes",
      category: "Pest Control",
      assignedTo: "Farm Worker 2"
    },
    {
      id: 3,
      title: "Irrigation Check",
      description: "Check and maintain irrigation system for all fields",
      date: "2025-01-17",
      time: "06:00",
      priority: "High",
      status: "Completed",
      crop: "All Crops",
      category: "Irrigation",
      assignedTo: "Farm Manager"
    },
    {
      id: 4,
      title: "Soil Testing",
      description: "Collect soil samples for pH and nutrient analysis",
      date: "2025-01-22",
      time: "09:00",
      priority: "Medium",
      status: "Pending",
      crop: "Cotton",
      category: "Soil Management",
      assignedTo: "Lab Technician"
    },
    {
      id: 5,
      title: "Harvest Preparation",
      description: "Prepare equipment and labor for onion harvest",
      date: "2025-01-25",
      time: "07:00",
      priority: "High",
      status: "Pending",
      crop: "Onions",
      category: "Harvesting",
      assignedTo: "Harvest Team"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("2025-01-20");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    time: "09:00",
    priority: "Medium",
    crop: "",
    category: "",
    assignedTo: ""
  });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('farmTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('farmTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.date || !newTask.crop || !newTask.category) {
      alert("Please fill in all required fields");
      return;
    }

    const task = {
      id: Date.now(),
      ...newTask,
      status: "Pending"
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      priority: "Medium",
      crop: "",
      category: "",
      assignedTo: ""
    });
    setIsAddDialogOpen(false);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setNewTask(task);
    setIsAddDialogOpen(true);
  };

  const handleUpdateTask = () => {
    if (!newTask.title || !newTask.date || !newTask.crop || !newTask.category) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedTask = {
      ...editingTask,
      ...newTask
    };

    setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task));
    setEditingTask(null);
    setNewTask({
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      priority: "Medium",
      crop: "",
      category: "",
      assignedTo: ""
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleCancel = () => {
    setEditingTask(null);
    setNewTask({
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      priority: "Medium",
      crop: "",
      category: "",
      assignedTo: ""
    });
    setIsAddDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "In Progress": return "secondary";
      case "Pending": return "outline";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4" />;
      case "In Progress": return <Clock className="h-4 w-4" />;
      case "Pending": return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const todaysTasks = tasks.filter(task => task.date === selectedDate);
  const upcomingTasks = tasks.filter(task => new Date(task.date) > new Date(selectedDate)).slice(0, 5);
  const overdueTasks = tasks.filter(task => new Date(task.date) < new Date() && task.status !== "Completed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Scheduler</h1>
          <p className="text-muted-foreground">Plan and manage your farming activities</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Task description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop">Crop</Label>
                  <Select value={newTask.crop} onValueChange={(value) => setNewTask({...newTask, crop: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Winter Wheat">Winter Wheat</SelectItem>
                      <SelectItem value="Tomatoes">Tomatoes</SelectItem>
                      <SelectItem value="Cotton">Cotton</SelectItem>
                      <SelectItem value="Onions">Onions</SelectItem>
                      <SelectItem value="All Crops">All Crops</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newTask.category} onValueChange={(value) => setNewTask({...newTask, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fertilization">Fertilization</SelectItem>
                      <SelectItem value="Pest Control">Pest Control</SelectItem>
                      <SelectItem value="Irrigation">Irrigation</SelectItem>
                      <SelectItem value="Soil Management">Soil Management</SelectItem>
                      <SelectItem value="Harvesting">Harvesting</SelectItem>
                      <SelectItem value="Planting">Planting</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                    placeholder="Assign to person"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={editingTask ? handleUpdateTask : handleAddTask}>
                  {editingTask ? <Save className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  {editingTask ? "Update Task" : "Add Task"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{tasks.length}</p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{tasks.filter(t => t.status === "Completed").length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning-foreground">{tasks.filter(t => t.status === "In Progress").length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{overdueTasks.length}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar/Date Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full"
              />
              <div className="space-y-2">
                <h4 className="font-medium">Quick Dates</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      setSelectedDate(tomorrow.toISOString().split('T')[0]);
                    }}
                  >
                    Tomorrow
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks for {new Date(selectedDate).toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysTasks.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No tasks scheduled for this date</p>
              ) : (
                todaysTasks.map((task) => (
                  <div key={task.id} className="p-3 border border-border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-foreground">{task.title}</h4>
                      <Badge variant={getStatusColor(task.status)} className="flex items-center space-x-1">
                        {getStatusIcon(task.status)}
                        <span>{task.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>{task.time}</span>
                      <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{task.crop}</span>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEditTask(task)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        {task.status !== "Completed" && (
                          <Button variant="ghost" size="sm" onClick={() => handleStatusChange(task.id, "Completed")}>
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(task.date).toLocaleDateString()}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{task.crop}</span>
                    <span>{task.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Tasks Alert */}
      {overdueTasks.length > 0 && (
        <Card className="bg-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Overdue Tasks ({overdueTasks.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overdueTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 bg-destructive/10 rounded">
                  <span className="font-medium">{task.title}</span>
                  <span className="text-sm text-muted-foreground">{new Date(task.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskScheduler;
