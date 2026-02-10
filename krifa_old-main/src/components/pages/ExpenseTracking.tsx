import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, DollarSign, TrendingUp, TrendingDown, Filter, Download, Save, X, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const ExpenseTracking = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2025-01-15",
      category: "Seeds",
      description: "Winter Wheat Seeds - HD-2967",
      amount: 25000,
      crop: "Winter Wheat",
      paymentMethod: "Bank Transfer",
      status: "Paid"
    },
    {
      id: 2,
      date: "2025-01-10",
      category: "Fertilizer",
      description: "NPK Fertilizer - 50kg bags",
      amount: 15000,
      crop: "Tomatoes",
      paymentMethod: "Cash",
      status: "Paid"
    },
    {
      id: 3,
      date: "2025-01-08",
      category: "Pesticides",
      description: "Insecticide spray for pest control",
      amount: 8500,
      crop: "Cotton",
      paymentMethod: "Credit Card",
      status: "Paid"
    },
    {
      id: 4,
      date: "2025-01-05",
      category: "Equipment",
      description: "Tractor maintenance and repair",
      amount: 12000,
      crop: "All Crops",
      paymentMethod: "Bank Transfer",
      status: "Paid"
    },
    {
      id: 5,
      date: "2025-01-03",
      category: "Labor",
      description: "Harvesting labor for onion field",
      amount: 18000,
      crop: "Onions",
      paymentMethod: "Cash",
      status: "Pending"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    category: "",
    description: "",
    amount: "",
    crop: "",
    paymentMethod: "",
    status: "Pending"
  });

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('farmExpenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('farmExpenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (!newExpense.date || !newExpense.category || !newExpense.amount || !newExpense.description) {
      alert("Please fill in all required fields");
      return;
    }

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: "",
      description: "",
      amount: "",
      crop: "",
      paymentMethod: "",
      status: "Pending"
    });
    setIsAddDialogOpen(false);
  };

  const handleEditExpense = (expense: any) => {
    setEditingExpense(expense);
    setNewExpense({
      ...expense,
      amount: expense.amount.toString()
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdateExpense = () => {
    if (!newExpense.date || !newExpense.category || !newExpense.amount || !newExpense.description) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedExpense = {
      ...editingExpense,
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    };

    setExpenses(expenses.map(expense => expense.id === editingExpense.id ? updatedExpense : expense));
    setEditingExpense(null);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: "",
      description: "",
      amount: "",
      crop: "",
      paymentMethod: "",
      status: "Pending"
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteExpense = (expenseId: number) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses(expenses.filter(expense => expense.id !== expenseId));
    }
  };

  const handleCancel = () => {
    setEditingExpense(null);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: "",
      description: "",
      amount: "",
      crop: "",
      paymentMethod: "",
      status: "Pending"
    });
    setIsAddDialogOpen(false);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses.filter(e => e.status === "Pending").reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = expenses.filter(e => e.status === "Paid").reduce((sum, expense) => sum + expense.amount, 0);

  const categoryBreakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expense Tracking</h1>
          <p className="text-muted-foreground">Monitor and manage your farming expenses</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => {
            // Simple filter functionality - could be expanded
            const category = prompt("Filter by category (leave empty for all):");
            if (category) {
              alert(`Filtering by category: ${category}`);
              // In a real app, this would filter the expenses list
            }
          }}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" onClick={() => {
            // Export expenses to CSV
            const csvContent = "data:text/csv;charset=utf-8," +
              "Date,Category,Description,Amount,Crop,Payment Method,Status\n" +
              expenses.map(expense =>
                `${expense.date},"${expense.category}","${expense.description}",${expense.amount},"${expense.crop}","${expense.paymentMethod}","${expense.status}"`
              ).join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `farm-expenses-${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingExpense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Seeds">Seeds</SelectItem>
                        <SelectItem value="Fertilizer">Fertilizer</SelectItem>
                        <SelectItem value="Pesticides">Pesticides</SelectItem>
                        <SelectItem value="Equipment">Equipment</SelectItem>
                        <SelectItem value="Labor">Labor</SelectItem>
                        <SelectItem value="Irrigation">Irrigation</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="Expense description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="crop">Crop</Label>
                    <Select value={newExpense.crop} onValueChange={(value) => setNewExpense({...newExpense, crop: value})}>
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
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select value={newExpense.paymentMethod} onValueChange={(value) => setNewExpense({...newExpense, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newExpense.status} onValueChange={(value) => setNewExpense({...newExpense, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  <Button onClick={editingExpense ? handleUpdateExpense : handleAddExpense}>
                    {editingExpense ? <Save className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                    {editingExpense ? "Update Expense" : "Add Expense"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">₹{totalExpenses.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">₹{paidExpenses.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-warning-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning-foreground">₹{pendingExpenses.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{Object.keys(categoryBreakdown).length}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">{category}</span>
                <span className="font-bold text-destructive">₹{amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{expense.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{expense.description}</TableCell>
                  <TableCell>{expense.crop}</TableCell>
                  <TableCell className="font-bold text-destructive">₹{expense.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={expense.status === "Paid" ? "default" : expense.status === "Pending" ? "secondary" : "destructive"}>
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditExpense(expense)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteExpense(expense.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracking;
