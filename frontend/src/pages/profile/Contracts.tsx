import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  FileText, 
  Search, 
  Plus, 
  Download, 
  Eye,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  Share2,
  Filter,
  Users,
  Briefcase,
  Shield,
  TrendingUp,
  XCircle,
  RefreshCw,
  Mail,
  Phone
} from "lucide-react";
import { useState } from "react";

export default function Contracts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const contracts = [
    {
      id: "CNT-2024-001",
      title: "Recording Contract - Maya Johnson",
      artist: {
        name: "Maya Johnson",
        stageName: "Maya J",
        avatar: "MJ"
      },
      type: "Recording Contract",
      status: "Active",
      signedDate: "2023-08-15",
      expiryDate: "2026-08-15",
      value: 250000,
      terms: {
        duration: "3 years",
        albumCommitment: 2,
        royaltyRate: 15,
        advanceAmount: 50000,
        recoupmentStatus: "Partially Recouped"
      },
      milestones: [
        { name: "Contract Signing", status: "Completed", date: "2023-08-15", amount: 25000 },
        { name: "First Album Delivery", status: "Completed", date: "2024-03-20", amount: 15000 },
        { name: "Album Release", status: "In Progress", date: "2024-09-15", amount: 10000 },
        { name: "Second Album Option", status: "Pending", date: "2025-08-15", amount: 0 }
      ],
      performance: {
        albumsDelivered: 1,
        totalEarnings: 156000,
        recoupedAmount: 28000,
        outstandingAdvance: 22000
      },
      renewalOption: true,
      nextReview: "2025-08-15",
      documents: [
        { name: "Master Recording Agreement", type: "PDF", size: "2.4 MB", lastModified: "2023-08-15" },
        { name: "Amendment #1", type: "PDF", size: "856 KB", lastModified: "2024-01-10" },
        { name: "Royalty Statement Q1 2024", type: "PDF", size: "1.2 MB", lastModified: "2024-04-15" }
      ]
    },
    {
      id: "CNT-2024-002",
      title: "360 Deal - Marcus Thompson",
      artist: {
        name: "Marcus Thompson",
        stageName: "M-Tech",
        avatar: "MT"
      },
      type: "360 Deal",
      status: "Active",
      signedDate: "2024-01-10",
      expiryDate: "2029-01-10",
      value: 450000,
      terms: {
        duration: "5 years",
        albumCommitment: 3,
        royaltyRate: 20,
        advanceAmount: 75000,
        recoupmentStatus: "Unrecouped"
      },
      milestones: [
        { name: "Contract Signing", status: "Completed", date: "2024-01-10", amount: 37500 },
        { name: "First Mixtape Delivery", status: "In Progress", date: "2024-08-30", amount: 20000 },
        { name: "Album #1 Delivery", status: "Pending", date: "2025-01-15", amount: 17500 },
        { name: "Tour Support", status: "Pending", date: "2024-12-01", amount: 25000 }
      ],
      performance: {
        albumsDelivered: 0,
        totalEarnings: 98000,
        recoupedAmount: 0,
        outstandingAdvance: 75000
      },
      renewalOption: true,
      nextReview: "2026-01-10",
      documents: [
        { name: "360 Recording Agreement", type: "PDF", size: "3.1 MB", lastModified: "2024-01-10" },
        { name: "Touring Agreement", type: "PDF", size: "1.8 MB", lastModified: "2024-01-10" },
        { name: "Merchandise Agreement", type: "PDF", size: "1.4 MB", lastModified: "2024-01-10" }
      ]
    },
    {
      id: "CNT-2024-003",
      title: "Distribution Deal - Luna Rodriguez",
      artist: {
        name: "Luna Rodriguez",
        stageName: "Luna",
        avatar: "LR"
      },
      type: "Distribution Deal",
      status: "Active",
      signedDate: "2023-12-05",
      expiryDate: "2025-12-05",
      value: 150000,
      terms: {
        duration: "2 years",
        albumCommitment: 1,
        royaltyRate: 12,
        advanceAmount: 30000,
        recoupmentStatus: "Fully Recouped"
      },
      milestones: [
        { name: "Contract Signing", status: "Completed", date: "2023-12-05", amount: 15000 },
        { name: "Album Delivery", status: "Completed", date: "2024-05-20", amount: 10000 },
        { name: "Release Milestone", status: "Completed", date: "2024-06-15", amount: 5000 },
        { name: "Performance Bonus", status: "Completed", date: "2024-06-30", amount: 8000 }
      ],
      performance: {
        albumsDelivered: 1,
        totalEarnings: 187000,
        recoupedAmount: 30000,
        outstandingAdvance: 0
      },
      renewalOption: true,
      nextReview: "2025-10-05",
      documents: [
        { name: "Distribution Agreement", type: "PDF", size: "2.2 MB", lastModified: "2023-12-05" },
        { name: "Marketing Addendum", type: "PDF", size: "967 KB", lastModified: "2024-02-14" },
        { name: "Performance Report", type: "PDF", size: "1.5 MB", lastModified: "2024-06-30" }
      ]
    },
    {
      id: "CNT-2024-004",
      title: "Development Deal - Alex Chen",
      artist: {
        name: "Alex Chen",
        stageName: "A.C.",
        avatar: "AC"
      },
      type: "Development Deal",
      status: "Active",
      signedDate: "2024-03-20",
      expiryDate: "2025-03-20",
      value: 75000,
      terms: {
        duration: "1 year",
        albumCommitment: 1,
        royaltyRate: 18,
        advanceAmount: 25000,
        recoupmentStatus: "Unrecouped"
      },
      milestones: [
        { name: "Contract Signing", status: "Completed", date: "2024-03-20", amount: 12500 },
        { name: "Demo Delivery", status: "Completed", date: "2024-05-15", amount: 5000 },
        { name: "EP Production", status: "In Progress", date: "2024-11-01", amount: 7500 },
        { name: "Option Exercise", status: "Pending", date: "2025-02-20", amount: 0 }
      ],
      performance: {
        albumsDelivered: 0,
        totalEarnings: 34000,
        recoupedAmount: 0,
        outstandingAdvance: 25000
      },
      renewalOption: true,
      nextReview: "2025-02-20",
      documents: [
        { name: "Development Agreement", type: "PDF", size: "1.9 MB", lastModified: "2024-03-20" },
        { name: "Creative Brief", type: "PDF", size: "743 KB", lastModified: "2024-03-25" },
        { name: "Production Schedule", type: "PDF", size: "654 KB", lastModified: "2024-05-15" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-600/20 text-green-400';
      case 'Pending': return 'bg-yellow-600/20 text-yellow-400';
      case 'On Hold': return 'bg-orange-600/20 text-orange-400';
      case 'Expired': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400';
      case 'In Progress': return 'text-blue-400';
      case 'Pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.artist.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || contract.status.toLowerCase() === filterStatus;
    const matchesType = filterType === "all" || contract.type.toLowerCase().includes(filterType.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    totalContracts: contracts.length,
    activeContracts: contracts.filter(c => c.status === "Active").length,
    totalValue: contracts.reduce((sum, c) => sum + c.value, 0),
    totalAdvances: contracts.reduce((sum, c) => sum + c.terms.advanceAmount, 0)
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Contracts</h1>
            <p className="text-gray-400">Manage artist contracts and legal agreements</p>
          </div>
          <Button className="netflix-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.totalContracts}</p>
                  <p className="text-gray-400 text-sm">Total Contracts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.activeContracts}</p>
                  <p className="text-gray-400 text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-netflix-red/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white font-semibold">${(stats.totalValue / 1000).toFixed(0)}K</p>
                  <p className="text-gray-400 text-sm">Total Value</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <Briefcase className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">${(stats.totalAdvances / 1000).toFixed(0)}K</p>
                  <p className="text-gray-400 text-sm">Total Advances</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search contracts..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Contracts List */}
        <div className="space-y-6">
          {filteredContracts.map((contract) => (
            <Card key={contract.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-netflix-red text-white text-lg">
                            {contract.artist.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold text-white">{contract.title}</h3>
                          <p className="text-gray-400">{contract.artist.stageName} ({contract.artist.name})</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                              {contract.type}
                            </Badge>
                            <Badge className={getStatusColor(contract.status)}>
                              {contract.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">${(contract.value / 1000).toFixed(0)}K</p>
                        <p className="text-gray-400 text-sm">Contract Value</p>
                      </div>
                    </div>

                    {/* Contract Terms */}
                    <div className="mb-6">
                      <h4 className="text-white font-medium mb-3">Contract Terms</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span className="text-white">{contract.terms.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Album Commitment:</span>
                            <span className="text-white">{contract.terms.albumCommitment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Royalty Rate:</span>
                            <span className="text-white">{contract.terms.royaltyRate}%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Advance Amount:</span>
                            <span className="text-white">${contract.terms.advanceAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Recoupment:</span>
                            <span className={`${contract.terms.recoupmentStatus === 'Fully Recouped' ? 'text-green-400' : contract.terms.recoupmentStatus === 'Partially Recouped' ? 'text-yellow-400' : 'text-red-400'}`}>
                              {contract.terms.recoupmentStatus}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Outstanding:</span>
                            <span className="text-white">${contract.performance.outstandingAdvance.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-3">Contract Documents</h4>
                      <div className="space-y-2">
                        {contract.documents.slice(0, 2).map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-white text-sm font-medium">{doc.name}</p>
                                <p className="text-gray-400 text-xs">{doc.size}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-4">
                    {/* Contract Details */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Contract Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Signed:</span>
                          <span className="text-white">{new Date(contract.signedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Expires:</span>
                          <span className="text-white">{new Date(contract.expiryDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Next Review:</span>
                          <span className="text-white">{new Date(contract.nextReview).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Performance</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Albums Delivered:</span>
                          <span className="text-white">{contract.performance.albumsDelivered}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Earnings:</span>
                          <span className="text-green-400">${contract.performance.totalEarnings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Recouped:</span>
                          <span className="text-white">${contract.performance.recoupedAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button size="sm" className="w-full netflix-button-primary">
                        <Eye className="h-3 w-3 mr-2" />
                        View Details
                      </Button>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}