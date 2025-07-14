import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Music,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Target,
  Briefcase,
  MessageCircle,
  FileText,
  Settings,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Plus
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Mock dashboard data
  const dashboardData = {
    overview: {
      totalRevenue: 145200,
      monthlyRevenue: 24800,
      revenueGrowth: 12.5,
      totalArtists: 8,
      activeArtists: 6,
      totalStreams: 4200000,
      streamsGrowth: 18.7,
      averageEngagement: 15.3
    },
    
    recentActivity: [
      { type: "contract", description: "Luna M contract renewed for 2 years", date: "2 hours ago", status: "completed" },
      { type: "milestone", description: "MC Dynamic reached 1M total streams", date: "5 hours ago", status: "achieved" },
      { type: "payment", description: "Quarterly royalty payment processed", date: "1 day ago", status: "completed" },
      { type: "meeting", description: "A&R meeting with Echo scheduled", date: "2 days ago", status: "scheduled" },
      { type: "release", description: "Luna M new single released", date: "3 days ago", status: "completed" }
    ],
    
    topPerformers: [
      { 
        name: "Luna M", 
        revenue: 45600, 
        streams: 1200000, 
        growth: 25.3, 
        status: "rising",
        avatar: "LM"
      },
      { 
        name: "MC Dynamic", 
        revenue: 32400, 
        streams: 980000, 
        growth: 18.7, 
        status: "stable",
        avatar: "MD"
      },
      { 
        name: "Electric Maya", 
        revenue: 28900, 
        streams: 850000, 
        growth: 15.2, 
        status: "rising",
        avatar: "EM"
      }
    ],
    
    upcomingEvents: [
      { event: "Luna M Album Release", date: "March 15, 2024", type: "release", priority: "high" },
      { event: "Quarterly Business Review", date: "March 20, 2024", type: "meeting", priority: "medium" },
      { event: "MC Dynamic Tour Kickoff", date: "March 25, 2024", type: "tour", priority: "high" },
      { event: "Contract Renewals Due", date: "March 30, 2024", type: "business", priority: "high" },
      { event: "A&R Scouting Event", date: "April 5, 2024", type: "scouting", priority: "medium" }
    ],
    
    financialBreakdown: [
      { category: "Streaming Revenue", amount: 58600, percentage: 40.4 },
      { category: "Live Performances", amount: 43950, percentage: 30.3 },
      { category: "Merchandise", amount: 23280, percentage: 16.0 },
      { category: "Licensing & Sync", amount: 13170, percentage: 9.1 },
      { category: "Other", amount: 6200, percentage: 4.2 }
    ],
    
    contractsStatus: [
      { status: "Active", count: 6, color: "text-netflix-red bg-netflix-red/10" },
      { status: "Expiring Soon", count: 2, color: "text-netflix-red bg-netflix-red/10" },
      { status: "Under Negotiation", count: 1, color: "text-netflix-red bg-netflix-red/10" },
      { status: "Expired", count: 1, color: "text-red-400 bg-red-400/10" }
    ],
    
    marketingCampaigns: [
      { campaign: "Luna M - Spring Album Push", status: "Active", budget: 15000, spent: 8500, performance: "Above Target" },
      { campaign: "MC Dynamic - Tour Promotion", status: "Planning", budget: 12000, spent: 0, performance: "Pending" },
      { campaign: "Echo - Development Campaign", status: "Active", budget: 8000, spent: 3200, performance: "On Track" }
    ]
  };

  const periodOptions = [
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
    { id: "quarter", name: "This Quarter" },
    { id: "year", name: "This Year" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "contract": return <FileText className="text-white h-4 w-4 text-netflix-red" />;
      case "milestone": return <Award className="text-white h-4 w-4 text-netflix-red" />;
      case "payment": return <DollarSign className="text-white h-4 w-4 text-netflix-red" />;
      case "meeting": return <Calendar className="text-white h-4 w-4 text-purple-400" />;
      case "release": return <Music className="text-white h-4 w-4 text-netflix-red" />;
      default: return <Activity className="text-white h-4 w-4 text-white" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "achieved":
        return <CheckCircle className="text-white h-4 w-4 text-netflix-red" />;
      case "scheduled":
        return <Clock className="text-white h-4 w-4 text-netflix-red" />;
      default:
        return <AlertCircle className="text-white h-4 w-4 text-white" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-netflix-red bg-netflix-red/10';
      case 'low': return 'text-netflix-red bg-netflix-red/10';
      default: return 'text-white bg-netflix-dark/10';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="text-white min-h-screen bg-netflix-black pt-8">
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-white flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-4xl font-bold text-white mb-2">
              Business
              <span className="text-white bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent ml-3">
                Dashboard
              </span>
            </h1>
            <p className="text-white text-white">
              Overview of your music business operations and performance metrics
            </p>
          </div>
          <div className="text-white flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-white px-3 py-2 bg-netflix-dark border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
            >
              {periodOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <Button variant="outline" className="text-white border-gray-700 text-white hover:bg-netflix-dark">
              <Download className="text-white h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="text-white grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-6">
              <div className="text-white flex items-center justify-between">
                <div>
                  <p className="text-white text-white text-sm">Total Revenue</p>
                  <p className="text-white text-2xl font-bold text-white">{formatCurrency(dashboardData.overview.totalRevenue)}</p>
                  <div className="text-white flex items-center space-x-1 text-sm">
                    <TrendingUp className="text-white h-4 w-4 text-netflix-red" />
                    <span className="text-white text-netflix-red">+{dashboardData.overview.revenueGrowth}%</span>
                  </div>
                </div>
                <div className="text-white p-3 bg-red-600/20 rounded-lg">
                  <DollarSign className="text-white h-6 w-6 text-netflix-red" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-6">
              <div className="text-white flex items-center justify-between">
                <div>
                  <p className="text-white text-white text-sm">Active Artists</p>
                  <p className="text-white text-2xl font-bold text-white">{dashboardData.overview.activeArtists}</p>
                  <p className="text-white text-white text-sm">of {dashboardData.overview.totalArtists} total</p>
                </div>
                <div className="text-white p-3 bg-red-600/20 rounded-lg">
                  <Users className="text-white h-6 w-6 text-netflix-red" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-6">
              <div className="text-white flex items-center justify-between">
                <div>
                  <p className="text-white text-white text-sm">Total Streams</p>
                  <p className="text-white text-2xl font-bold text-white">{formatNumber(dashboardData.overview.totalStreams)}</p>
                  <div className="text-white flex items-center space-x-1 text-sm">
                    <TrendingUp className="text-white h-4 w-4 text-netflix-red" />
                    <span className="text-white text-netflix-red">+{dashboardData.overview.streamsGrowth}%</span>
                  </div>
                </div>
                <div className="text-white p-3 bg-netflix-red/20 rounded-lg">
                  <Activity className="text-white h-6 w-6 text-netflix-red" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-6">
              <div className="text-white flex items-center justify-between">
                <div>
                  <p className="text-white text-white text-sm">Avg. Engagement</p>
                  <p className="text-white text-2xl font-bold text-white">{dashboardData.overview.averageEngagement}%</p>
                  <p className="text-white text-white text-sm">Across all artists</p>
                </div>
                <div className="text-white p-3 bg-netflix-red/20 rounded-lg">
                  <Target className="text-white h-6 w-6 text-netflix-red" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-white grid lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="text-white lg:col-span-1">
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white flex items-center justify-between">
                  Recent Activity
                  <RefreshCw className="text-white h-4 w-4 text-white" />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                {dashboardData.recentActivity.map((activity, index) => (
                  <div key={index} className="text-white flex items-start space-x-3">
                    <div className="text-white mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="text-white flex-1">
                      <p className="text-white text-white text-sm">{activity.description}</p>
                      <div className="text-white flex items-center space-x-2 mt-1">
                        <span className="text-white text-white text-xs">{activity.date}</span>
                        {getStatusIcon(activity.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <div className="text-white lg:col-span-1">
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white">Top Performers</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                {dashboardData.topPerformers.map((artist, index) => (
                  <div key={index} className="text-white flex items-center justify-between">
                    <div className="text-white flex items-center space-x-3">
                      <div className="text-white w-10 h-10 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {artist.avatar}
                      </div>
                      <div>
                        <p className="text-white text-white font-medium">{artist.name}</p>
                        <p className="text-white text-white text-sm">{formatNumber(artist.streams)} streams</p>
                      </div>
                    </div>
                    <div className="text-white text-right">
                      <p className="text-white text-netflix-red font-medium">{formatCurrency(artist.revenue)}</p>
                      <div className="text-white flex items-center space-x-1 text-xs">
                        <TrendingUp className="text-white h-3 w-3 text-netflix-red" />
                        <span className="text-white text-netflix-red">+{artist.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="text-white lg:col-span-1">
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                {dashboardData.upcomingEvents.slice(0, 5).map((event, index) => (
                  <div key={index} className="text-white flex items-start justify-between">
                    <div className="text-white flex-1">
                      <p className="text-white text-white font-medium text-sm">{event.event}</p>
                      <p className="text-white text-white text-xs">{event.date}</p>
                    </div>
                    <Badge className={`text-xs ${getPriorityColor(event.priority)}`}>
                      {event.priority.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-white grid lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Breakdown */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-white">Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              {dashboardData.financialBreakdown.map((item, index) => (
                <div key={index} className="text-white space-y-2">
                  <div className="text-white flex justify-between">
                    <span className="text-white text-white">{item.category}</span>
                    <span className="text-white text-white font-medium">{formatCurrency(item.amount)}</span>
                  </div>
                  <div className="text-white w-full bg-netflix-dark rounded-full h-2">
                    <div 
                      className="text-white bg-netflix-red h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-white text-right">
                    <span className="text-white text-white text-sm">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contracts Status */}
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-white">Contract Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              {dashboardData.contractsStatus.map((contract, index) => (
                <div key={index} className="text-white flex items-center justify-between">
                  <span className="text-white text-white">{contract.status}</span>
                  <div className="text-white flex items-center space-x-2">
                    <span className="text-white text-white font-medium">{contract.count}</span>
                    <Badge className={`text-xs ${contract.color}`}>
                      {contract.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="text-white pt-4 border-t border-gray-700">
                <Button variant="outline" className="text-white w-full border-gray-700 text-white hover:bg-netflix-dark">
                  <FileText className="text-white h-4 w-4 mr-2" />
                  Manage All Contracts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marketing Campaigns */}
        <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-white">Active Marketing Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white overflow-x-auto">
              <table className="text-white w-full">
                <thead>
                  <tr className="text-white border-b border-gray-700">
                    <th className="text-white text-left text-white text-sm py-3">Campaign</th>
                    <th className="text-white text-left text-white text-sm py-3">Status</th>
                    <th className="text-white text-left text-white text-sm py-3">Budget</th>
                    <th className="text-white text-left text-white text-sm py-3">Spent</th>
                    <th className="text-white text-left text-white text-sm py-3">Performance</th>
                    <th className="text-white text-left text-white text-sm py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.marketingCampaigns.map((campaign, index) => (
                    <tr key={index} className="text-white border-b border-gray-800">
                      <td className="text-white text-white py-4">{campaign.campaign}</td>
                      <td className="text-white py-4">
                        <Badge className={
                          campaign.status === 'Active' 
                            ? 'text-netflix-red bg-netflix-red/10' 
                            : 'text-netflix-red bg-netflix-red/10'
                        }>
                          {campaign.status}
                        </Badge>
                      </td>
                      <td className="text-white text-white py-4">{formatCurrency(campaign.budget)}</td>
                      <td className="text-white text-white py-4">{formatCurrency(campaign.spent)}</td>
                      <td className="text-white py-4">
                        <Badge className={
                          campaign.performance === 'Above Target' 
                            ? 'text-netflix-red bg-netflix-red/10' 
                            : campaign.performance === 'On Track'
                            ? 'text-netflix-red bg-netflix-red/10'
                            : 'text-white bg-netflix-dark/10'
                        }>
                          {campaign.performance}
                        </Badge>
                      </td>
                      <td className="text-white py-4">
                        <Button variant="outline" size="sm" className="text-white border-gray-700 text-white hover:bg-netflix-dark">
                          <Eye className="text-white h-3 w-3 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="text-white bg-gradient-to-r from-netflix-red/10 via-gray-900/50 to-netflix-red/10 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-white text-2xl font-bold text-white mb-4">
            Quick Business Actions
          </h3>
          <p className="text-white text-white mb-6 max-w-2xl mx-auto">
            Streamline your music business operations with quick access to essential tools and reports.
          </p>
          <div className="text-white flex justify-center space-x-4">
            <Button className="text-white netflix-button-primary">
              <Plus className="text-white h-4 w-4 mr-2" />
              Add New Artist
            </Button>
            <Button variant="outline" className="text-white border-gray-700 text-white hover:bg-netflix-dark">
              <BarChart3 className="text-white h-4 w-4 mr-2" />
              Detailed Analytics
            </Button>
            <Button variant="outline" className="text-white border-gray-700 text-white hover:bg-netflix-dark">
              <FileText className="text-white h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}