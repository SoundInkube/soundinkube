import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Star, 
  Eye, 
  MessageCircle, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  ArrowUp,
  ArrowDown,
  Download,
  Filter
} from "lucide-react";

export default function Analytics() {
  const monthlyEarnings = [
    { month: 'Jan', amount: 3200 },
    { month: 'Feb', amount: 4100 },
    { month: 'Mar', amount: 3800 },
    { month: 'Apr', amount: 4500 },
    { month: 'May', amount: 5200 },
    { month: 'Jun', amount: 4800 }
  ];

  const projectStats = [
    { type: 'Music Production', count: 45, percentage: 30 },
    { type: 'Mixing & Mastering', count: 35, percentage: 23 },
    { type: 'Beat Making', count: 28, percentage: 19 },
    { type: 'Songwriting', count: 25, percentage: 17 },
    { type: 'Sound Design', count: 17, percentage: 11 }
  ];

  const recentProjects = [
    { name: 'Summer Vibes EP', client: 'Maya Johnson', status: 'Completed', earnings: 850, rating: 5.0 },
    { name: 'Hip-Hop Album Mix', client: 'Street Records', status: 'In Progress', earnings: 1200, rating: null },
    { name: 'Pop Single Production', client: 'Sarah Lee', status: 'Completed', earnings: 600, rating: 4.8 },
    { name: 'R&B Collaboration', client: 'Divine Sounds', status: 'Completed', earnings: 900, rating: 4.9 }
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Track your performance, earnings, and client engagement</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold text-white">$24,600</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUp className="h-3 w-3 text-green-400" />
                    <span className="text-green-400 text-xs">+18% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-green-600/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Projects</p>
                  <p className="text-2xl font-bold text-white">8</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUp className="h-3 w-3 text-blue-400" />
                    <span className="text-blue-400 text-xs">3 new this week</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Profile Views</p>
                  <p className="text-2xl font-bold text-white">2,847</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUp className="h-3 w-3 text-purple-400" />
                    <span className="text-purple-400 text-xs">+12% this week</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Rating</p>
                  <p className="text-2xl font-bold text-white">4.9</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-xs">89 reviews</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-600/20 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Chart */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-netflix-red" />
                  <span>Monthly Earnings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-white">$4,800</p>
                      <p className="text-gray-400 text-sm">June 2024</p>
                    </div>
                    <Badge className="bg-green-600/20 text-green-400">+8.5%</Badge>
                  </div>
                  
                  {/* Simple Bar Chart */}
                  <div className="space-y-3">
                    {monthlyEarnings.map((data, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 text-gray-400 text-sm">{data.month}</div>
                        <div className="flex-1 bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-netflix-red h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(data.amount / 5200) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-16 text-white text-sm font-medium">${data.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-netflix-red" />
                  <span>Recent Projects</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{project.name}</h4>
                        <p className="text-gray-400 text-sm">Client: {project.client}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={project.status === 'Completed' ? 'default' : 'secondary'}
                          className={project.status === 'Completed' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'}
                        >
                          {project.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-white font-medium">${project.earnings}</p>
                          {project.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-yellow-400 text-sm">{project.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Communication Metrics */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-netflix-red" />
                  <span>Communication Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">2.3h</div>
                    <div className="text-gray-400 text-sm">Avg Response Time</div>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <ArrowDown className="h-3 w-3 text-green-400" />
                      <span className="text-green-400 text-xs">15% faster</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">98%</div>
                    <div className="text-gray-400 text-sm">Response Rate</div>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <ArrowUp className="h-3 w-3 text-green-400" />
                      <span className="text-green-400 text-xs">Excellent</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">234</div>
                    <div className="text-gray-400 text-sm">Messages Sent</div>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <MessageCircle className="h-3 w-3 text-blue-400" />
                      <span className="text-blue-400 text-xs">This month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Project Types Distribution */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-netflix-red" />
                  <span>Project Types</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">{stat.type}</span>
                        <span className="text-white font-medium">{stat.count}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-netflix-red h-2 rounded-full transition-all duration-500"
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Clients */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Users className="h-5 w-5 text-netflix-red" />
                  <span>Top Clients</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Street Records', projects: 12, earnings: 4800 },
                    { name: 'Maya Johnson', projects: 8, earnings: 3200 },
                    { name: 'Divine Sounds', projects: 6, earnings: 2400 },
                    { name: 'Sarah Lee', projects: 5, earnings: 1800 }
                  ].map((client, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{client.name}</p>
                        <p className="text-gray-400 text-sm">{client.projects} projects</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-medium">${client.earnings}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Growth Metrics */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-netflix-red" />
                  <span>Growth Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">New Clients</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-white font-medium">24</span>
                      <ArrowUp className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Repeat Clients</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-white font-medium">18</span>
                      <ArrowUp className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Project Completion</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-white font-medium">96%</span>
                      <ArrowUp className="h-3 w-3 text-green-400" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Revenue Growth</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-white font-medium">+23%</span>
                      <ArrowUp className="h-3 w-3 text-green-400" />
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