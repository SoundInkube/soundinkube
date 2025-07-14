import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Calendar,
  Users,
  Music,
  Target,
  ArrowUp,
  ArrowDown,
  Activity,
  Zap
} from "lucide-react";
import { useState } from "react";

export default function RevenueAnalytics() {
  const [timeframe, setTimeframe] = useState("6months");

  const revenueData = {
    totalRevenue: 1247500,
    monthlyRevenue: 156200,
    growthRate: 18.5,
    projectedRevenue: 1850000,
    averagePerArtist: 138611
  };

  const monthlyData = [
    { month: 'Jan', revenue: 98000, streams: 2400000, artists: 8 },
    { month: 'Feb', revenue: 112000, streams: 2850000, artists: 8 },
    { month: 'Mar', revenue: 127000, streams: 3200000, artists: 9 },
    { month: 'Apr', revenue: 134000, streams: 3400000, artists: 9 },
    { month: 'May', revenue: 145000, streams: 3650000, artists: 9 },
    { month: 'Jun', revenue: 156200, streams: 3900000, artists: 9 }
  ];

  const artistRevenue = [
    { name: "Luna", stageName: "Luna Rodriguez", revenue: 187000, percentage: 15.0, growth: 32.1, streams: 890000 },
    { name: "Maya J", stageName: "Maya Johnson", revenue: 156000, percentage: 12.5, growth: 18.5, streams: 450000 },
    { name: "J.Blake", stageName: "Jordan Blake", revenue: 124000, percentage: 9.9, growth: 22.4, streams: 567000 },
    { name: "M-Tech", stageName: "Marcus Thompson", revenue: 98000, percentage: 7.9, growth: 25.8, streams: 680000 },
    { name: "Sophie W", stageName: "Sophie Williams", revenue: 45000, percentage: 3.6, growth: -8.5, streams: 123000 },
    { name: "A.C.", stageName: "Alex Chen", revenue: 34000, percentage: 2.7, growth: 45.2, streams: 245000 }
  ];

  const revenueStreams = [
    { source: "Streaming Royalties", amount: 487500, percentage: 39.1, growth: 15.2 },
    { source: "Digital Sales", amount: 298700, percentage: 23.9, growth: 8.7 },
    { source: "Sync Licensing", amount: 186200, percentage: 14.9, growth: 34.5 },
    { source: "Live Performances", amount: 149800, percentage: 12.0, growth: -5.2 },
    { source: "Merchandise", amount: 87600, percentage: 7.0, growth: 12.8 },
    { source: "Publishing", amount: 37700, percentage: 3.0, growth: 22.1 }
  ];

  const quarterlyTargets = [
    { quarter: "Q1 2024", target: 300000, actual: 337000, percentage: 112.3 },
    { quarter: "Q2 2024", target: 350000, actual: 435200, percentage: 124.3 },
    { quarter: "Q3 2024", target: 400000, actual: 0, percentage: 0 },
    { quarter: "Q4 2024", target: 450000, actual: 0, percentage: 0 }
  ];

  const topGenres = [
    { genre: "Pop", revenue: 312000, percentage: 25.0, artists: 3 },
    { genre: "Hip-Hop", revenue: 286500, percentage: 23.0, artists: 2 },
    { genre: "R&B/Soul", revenue: 249000, percentage: 20.0, artists: 2 },
    { genre: "Alternative Rock", revenue: 187000, percentage: 15.0, artists: 1 },
    { genre: "Electronic", revenue: 124000, percentage: 9.9, artists: 1 },
    { genre: "Indie Folk", revenue: 89000, percentage: 7.1, artists: 1 }
  ];

  const kpis = [
    { metric: "Revenue per Stream", value: "$0.0034", change: 12.5, trend: "up" },
    { metric: "Cost per Acquisition", value: "$48.50", change: -8.2, trend: "down" },
    { metric: "Artist Retention Rate", value: "94.4%", change: 2.1, trend: "up" },
    { metric: "Profit Margin", value: "28.7%", change: 4.3, trend: "up" }
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Revenue Analytics</h1>
            <p className="text-gray-400">Comprehensive financial performance and insights</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
              <option value="2years">Last 2 Years</option>
            </select>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid lg:grid-cols-5 gap-4 mb-8">
          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">${(revenueData.totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">${(revenueData.monthlyRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-netflix-red/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white font-semibold">{revenueData.growthRate}%</p>
                  <p className="text-gray-400 text-sm">Growth Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Target className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">${(revenueData.projectedRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-gray-400 text-sm">Projected 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <Users className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">${(revenueData.averagePerArtist / 1000).toFixed(0)}K</p>
                  <p className="text-gray-400 text-sm">Avg per Artist</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Monthly Revenue Chart */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-netflix-red" />
                  <span>Monthly Revenue Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-white">${(revenueData.monthlyRevenue / 1000).toFixed(0)}K</p>
                      <p className="text-gray-400 text-sm">June 2024</p>
                    </div>
                    <Badge className="bg-red-600/20 text-green-400">+{revenueData.growthRate}%</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 text-gray-400 text-sm">{data.month}</div>
                        <div className="flex-1 bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-netflix-red h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(data.revenue / 160000) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-16 text-white text-sm font-medium">${(data.revenue / 1000).toFixed(0)}K</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Artist Revenue Performance */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Users className="h-5 w-5 text-netflix-red" />
                  <span>Artist Revenue Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {artistRevenue.map((artist, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{artist.name}</h4>
                          <p className="text-gray-400 text-sm">{artist.stageName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${(artist.revenue / 1000).toFixed(0)}K</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">{artist.percentage}%</span>
                          <div className="flex items-center space-x-1">
                            {artist.growth > 0 ? (
                              <ArrowUp className="h-3 w-3 text-green-400" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-red-400" />
                            )}
                            <span className={`text-xs ${artist.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {Math.abs(artist.growth)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Streams */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-netflix-red" />
                  <span>Revenue Streams</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueStreams.map((stream, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">{stream.source}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">${(stream.amount / 1000).toFixed(0)}K</span>
                          <div className="flex items-center space-x-1">
                            {stream.growth > 0 ? (
                              <ArrowUp className="h-3 w-3 text-green-400" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-red-400" />
                            )}
                            <span className={`text-xs ${stream.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {Math.abs(stream.growth)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-netflix-red h-2 rounded-full transition-all duration-500"
                          style={{ width: `${stream.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{stream.percentage}% of total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* KPI Metrics */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-netflix-red" />
                  <span>Key Performance Indicators</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {kpis.map((kpi, index) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{kpi.metric}</h4>
                        <div className="flex items-center space-x-1">
                          {kpi.trend === "up" ? (
                            <ArrowUp className="h-3 w-3 text-green-400" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-red-400" />
                          )}
                          <span className={`text-xs ${kpi.trend === "up" ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.abs(kpi.change)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-white">{kpi.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quarterly Targets */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Target className="h-5 w-5 text-netflix-red" />
                  <span>Quarterly Targets</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quarterlyTargets.map((quarter, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{quarter.quarter}</span>
                        {quarter.actual > 0 && (
                          <Badge className={quarter.percentage >= 100 ? "bg-red-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"}>
                            {quarter.percentage.toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Target:</span>
                          <span className="text-white">${(quarter.target / 1000).toFixed(0)}K</span>
                        </div>
                        {quarter.actual > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Actual:</span>
                            <span className="text-green-400">${(quarter.actual / 1000).toFixed(0)}K</span>
                          </div>
                        )}
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${quarter.actual > 0 ? (quarter.percentage >= 100 ? 'bg-red-600' : 'bg-yellow-600') : 'bg-gray-700'}`}
                          style={{ width: `${Math.min(quarter.percentage || 0, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Genres */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Music className="h-5 w-5 text-netflix-red" />
                  <span>Revenue by Genre</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topGenres.map((genre, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-netflix-red rounded-full"></div>
                        <div>
                          <p className="text-white font-medium">{genre.genre}</p>
                          <p className="text-gray-400 text-xs">{genre.artists} artists</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">${(genre.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-gray-400 text-xs">{genre.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <BarChart3 className="h-3 w-3 mr-2" />
                  Monthly P&L Report
                </Button>
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <Users className="h-3 w-3 mr-2" />
                  Artist Performance
                </Button>
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <Target className="h-3 w-3 mr-2" />
                  Budget vs Actual
                </Button>
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <Download className="h-3 w-3 mr-2" />
                  Export All Data
                </Button>
              </CardContent>
            </Card>

            {/* Revenue Forecast */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Revenue Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">${(revenueData.projectedRevenue / 1000).toFixed(0)}K</p>
                    <p className="text-gray-400 text-sm">Projected 2024 Revenue</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Run Rate:</span>
                      <span className="text-white">${(revenueData.monthlyRevenue * 12 / 1000).toFixed(0)}K/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Growth Factor:</span>
                      <span className="text-green-400">+{revenueData.growthRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Confidence:</span>
                      <span className="text-yellow-400">87%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}