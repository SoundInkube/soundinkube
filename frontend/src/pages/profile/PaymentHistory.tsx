import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  Receipt,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

export default function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const transactions = [
    {
      id: "TXN-2024-001",
      type: "Payment",
      description: "Hip-Hop Album Production",
      professional: {
        name: "Alex Rivera",
        avatar: "AR",
        specialty: "Music Producer"
      },
      amount: 2400,
      status: "Completed",
      date: "2024-06-15T14:30:00",
      paymentMethod: "Credit Card ****1234",
      projectId: "PRJ-001",
      invoiceNumber: "INV-2024-0156",
      category: "Production Services",
      currency: "USD",
      fees: {
        platformFee: 120,
        processingFee: 48,
        total: 168
      },
      refundable: true,
      milestonePayment: true,
      milestone: "50% Project Completion"
    },
    {
      id: "TXN-2024-002",
      type: "Payment",
      description: "EP Mixing & Mastering",
      professional: {
        name: "Sarah Chen",
        avatar: "SC",
        specialty: "Mixing Engineer"
      },
      amount: 1200,
      status: "Completed",
      date: "2024-06-01T10:15:00",
      paymentMethod: "PayPal",
      projectId: "PRJ-002",
      invoiceNumber: "INV-2024-0145",
      category: "Mixing Services",
      currency: "USD",
      fees: {
        platformFee: 60,
        processingFee: 24,
        total: 84
      },
      refundable: false,
      milestonePayment: false,
      rating: 5.0
    },
    {
      id: "TXN-2024-003",
      type: "Payment",
      description: "Guitar Recording Sessions - Deposit",
      professional: {
        name: "Marcus Johnson",
        avatar: "MJ",
        specialty: "Session Guitarist"
      },
      amount: 800,
      status: "Completed",
      date: "2024-06-20T16:45:00",
      paymentMethod: "Credit Card ****5678",
      projectId: "PRJ-003",
      invoiceNumber: "INV-2024-0167",
      category: "Session Recording",
      currency: "USD",
      fees: {
        platformFee: 40,
        processingFee: 16,
        total: 56
      },
      refundable: true,
      milestonePayment: true,
      milestone: "50% Deposit"
    },
    {
      id: "TXN-2024-004",
      type: "Payment",
      description: "Vocal Recording & Songwriting",
      professional: {
        name: "Luna Martinez",
        avatar: "LM",
        specialty: "Vocalist & Songwriter"
      },
      amount: 2200,
      status: "Completed",
      date: "2024-05-10T12:20:00",
      paymentMethod: "Bank Transfer",
      projectId: "PRJ-004",
      invoiceNumber: "INV-2024-0134",
      category: "Vocal Services",
      currency: "USD",
      fees: {
        platformFee: 110,
        processingFee: 22,
        total: 132
      },
      refundable: false,
      milestonePayment: false,
      rating: 5.0
    },
    {
      id: "TXN-2024-005",
      type: "Refund",
      description: "Electronic Dance Track Production - Cancelled",
      professional: {
        name: "DJ Voltage",
        avatar: "DV",
        specialty: "Electronic Music Producer"
      },
      amount: -450,
      status: "Completed",
      date: "2024-05-28T09:30:00",
      paymentMethod: "Credit Card ****1234",
      projectId: "PRJ-005",
      invoiceNumber: "REF-2024-0012",
      category: "Electronic Production",
      currency: "USD",
      fees: {
        platformFee: -22.5,
        processingFee: -9,
        total: -31.5
      },
      refundable: false,
      milestonePayment: false,
      refundReason: "Project cancelled by mutual agreement"
    },
    {
      id: "TXN-2024-006",
      type: "Payment",
      description: "Piano Lessons - Monthly Subscription",
      professional: {
        name: "Emma Rodriguez",
        avatar: "ER",
        specialty: "Piano Instructor"
      },
      amount: 320,
      status: "Completed",
      date: "2024-06-01T00:00:00",
      paymentMethod: "Auto-pay Credit Card ****1234",
      projectId: "SUB-001",
      invoiceNumber: "INV-2024-0142",
      category: "Music Lessons",
      currency: "USD",
      fees: {
        platformFee: 16,
        processingFee: 6.4,
        total: 22.4
      },
      refundable: true,
      milestonePayment: false,
      isRecurring: true,
      nextPayment: "2024-07-01T00:00:00"
    },
    {
      id: "TXN-2024-007",
      type: "Payment",
      description: "Beat Production Package",
      professional: {
        name: "Alex Rivera",
        avatar: "AR",
        specialty: "Music Producer"
      },
      amount: 650,
      status: "Processing",
      date: "2024-06-22T18:15:00",
      paymentMethod: "Credit Card ****1234",
      projectId: "PRJ-006",
      invoiceNumber: "INV-2024-0178",
      category: "Beat Production",
      currency: "USD",
      fees: {
        platformFee: 32.5,
        processingFee: 13,
        total: 45.5
      },
      refundable: true,
      milestonePayment: false
    },
    {
      id: "TXN-2024-008",
      type: "Payment",
      description: "Mastering Services",
      professional: {
        name: "James Wilson",
        avatar: "JW",
        specialty: "Mastering Engineer"
      },
      amount: 450,
      status: "Failed",
      date: "2024-06-21T11:00:00",
      paymentMethod: "Credit Card ****9876",
      projectId: "PRJ-007",
      invoiceNumber: "INV-2024-0175",
      category: "Mastering Services",
      currency: "USD",
      fees: {
        platformFee: 22.5,
        processingFee: 9,
        total: 31.5
      },
      refundable: false,
      milestonePayment: false,
      failureReason: "Insufficient funds"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-600/20 text-green-400';
      case 'Processing': return 'bg-yellow-600/20 text-yellow-400';
      case 'Failed': return 'bg-red-600/20 text-red-400';
      case 'Pending': return 'bg-blue-600/20 text-blue-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'Processing': return Clock;
      case 'Failed': return XCircle;
      case 'Pending': return AlertCircle;
      default: return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Payment': return ArrowUpRight;
      case 'Refund': return ArrowDownLeft;
      case 'Subscription': return RefreshCw;
      default: return ArrowUpRight;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || transaction.status.toLowerCase() === filterStatus;
    const matchesType = filterType === "all" || transaction.type.toLowerCase() === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    totalSpent: transactions.filter(t => t.type === "Payment" && t.status === "Completed").reduce((sum, t) => sum + t.amount, 0),
    totalTransactions: transactions.length,
    completedPayments: transactions.filter(t => t.type === "Payment" && t.status === "Completed").length,
    refunds: transactions.filter(t => t.type === "Refund").length,
    pendingAmount: transactions.filter(t => t.status === "Processing").reduce((sum, t) => sum + t.amount, 0)
  };

  const monthlySpending = [
    { month: 'Jan', amount: 1800 },
    { month: 'Feb', amount: 2400 },
    { month: 'Mar', amount: 1950 },
    { month: 'Apr', amount: 3200 },
    { month: 'May', amount: 2200 },
    { month: 'Jun', amount: 3850 }
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment History</h1>
            <p className="text-gray-400">Track your spending and manage payment methods</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="netflix-button-primary">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats & Chart */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Overview */}
            <div className="grid lg:grid-cols-5 gap-4">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-600/20 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">${stats.totalSpent}</p>
                      <p className="text-gray-400 text-sm">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <Receipt className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{stats.totalTransactions}</p>
                      <p className="text-gray-400 text-sm">Transactions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-netflix-red/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-netflix-red" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{stats.completedPayments}</p>
                      <p className="text-gray-400 text-sm">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-600/20 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">${stats.pendingAmount}</p>
                      <p className="text-gray-400 text-sm">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <ArrowDownLeft className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{stats.refunds}</p>
                      <p className="text-gray-400 text-sm">Refunds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Spending Chart */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-netflix-red" />
                  <span>Monthly Spending</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-white">$3,850</p>
                      <p className="text-gray-400 text-sm">June 2024</p>
                    </div>
                    <Badge className="bg-green-600/20 text-green-400">+20.5%</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {monthlySpending.map((data, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 text-gray-400 text-sm">{data.month}</div>
                        <div className="flex-1 bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-netflix-red h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(data.amount / 4000) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-16 text-white text-sm font-medium">${data.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="payment">Payments</option>
                  <option value="refund">Refunds</option>
                </select>
              </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => {
                const StatusIcon = getStatusIcon(transaction.status);
                const TypeIcon = getTypeIcon(transaction.type);
                
                return (
                  <Card key={transaction.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <TypeIcon className={`h-5 w-5 ${transaction.type === 'Refund' ? 'text-purple-400' : 'text-green-400'}`} />
                            <StatusIcon className={`h-4 w-4 ${transaction.status === 'Completed' ? 'text-green-400' : transaction.status === 'Processing' ? 'text-yellow-400' : 'text-red-400'}`} />
                          </div>
                          
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-netflix-red text-white">
                              {transaction.professional.avatar}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="text-white font-semibold">{transaction.description}</h3>
                            <p className="text-gray-400 text-sm">{transaction.professional.name} • {transaction.professional.specialty}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                              <span>{transaction.id}</span>
                              <span>•</span>
                              <span>{new Date(transaction.date).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{transaction.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-3">
                            <div>
                              <p className={`text-lg font-bold ${transaction.amount < 0 ? 'text-purple-400' : 'text-white'}`}>
                                {transaction.amount < 0 ? '' : '+'}${Math.abs(transaction.amount)}
                              </p>
                              <p className="text-gray-400 text-sm">{transaction.category}</p>
                            </div>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional Details */}
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            {transaction.milestonePayment && (
                              <p className="text-gray-400">
                                <span className="text-blue-400">Milestone:</span> {transaction.milestone}
                              </p>
                            )}
                            {transaction.isRecurring && (
                              <p className="text-gray-400">
                                <span className="text-green-400">Next Payment:</span> {new Date(transaction.nextPayment!).toLocaleDateString()}
                              </p>
                            )}
                            {transaction.refundReason && (
                              <p className="text-gray-400">
                                <span className="text-purple-400">Refund Reason:</span> {transaction.refundReason}
                              </p>
                            )}
                            {transaction.failureReason && (
                              <p className="text-gray-400">
                                <span className="text-red-400">Failure Reason:</span> {transaction.failureReason}
                              </p>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <div className="space-y-1 text-gray-400">
                              <p>Platform Fee: ${transaction.fees.platformFee}</p>
                              <p>Processing Fee: ${transaction.fees.processingFee}</p>
                              <p className="font-medium">Total Fees: ${transaction.fees.total}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                              <Receipt className="h-3 w-3 mr-2" />
                              Invoice
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                              <Eye className="h-3 w-3 mr-2" />
                              Details
                            </Button>
                            {transaction.refundable && transaction.status === "Completed" && (
                              <Button size="sm" variant="outline" className="border-yellow-700 text-yellow-400">
                                <ArrowDownLeft className="h-3 w-3 mr-2" />
                                Request Refund
                              </Button>
                            )}
                          </div>
                          
                          {transaction.rating && (
                            <div className="flex items-center space-x-1">
                              <span className="text-gray-400 text-sm">Rated:</span>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`w-3 h-3 rounded-full ${i < transaction.rating! ? 'bg-yellow-400' : 'bg-gray-600'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white text-sm font-medium">•••• 1234</p>
                      <p className="text-gray-400 text-xs">Expires 12/26</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600/20 text-green-400">Primary</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Wallet className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-white text-sm font-medium">PayPal</p>
                      <p className="text-gray-400 text-xs">user@email.com</p>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <CreditCard className="h-3 w-3 mr-2" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <Download className="h-3 w-3 mr-2" />
                  Export All Transactions
                </Button>
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <Receipt className="h-3 w-3 mr-2" />
                  Tax Summary
                </Button>
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <BarChart3 className="h-3 w-3 mr-2" />
                  Spending Report
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${transaction.status === 'Completed' ? 'bg-green-400' : transaction.status === 'Processing' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">${Math.abs(transaction.amount)}</p>
                        <p className="text-gray-400 text-xs">{transaction.professional.name}</p>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No transactions found</h3>
            <p className="text-gray-400 mb-6">Your payment history will appear here</p>
            <Button className="netflix-button-primary">
              <CreditCard className="h-4 w-4 mr-2" />
              Make Your First Payment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}