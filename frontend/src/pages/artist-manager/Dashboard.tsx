import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, DollarSign, Users, TrendingUp, Music, Star, Award, Target } from 'lucide-react';

interface DashboardStats {
  totalArtists: number;
  activeContracts: number;
  upcomingBookings: number;
  activeCampaigns: number;
  monthlyRevenue: number;
  totalRevenue: number;
  averageCommission: number;
  topPerformer: string;
}

export default function ArtistManagerDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for development
    const mockStats: DashboardStats = {
      totalArtists: 12,
      activeContracts: 9,
      upcomingBookings: 7,
      activeCampaigns: 4,
      monthlyRevenue: 12800,
      totalRevenue: 125500,
      averageCommission: 16.2,
      topPerformer: 'Sarah Johnson',
    };

    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="netflix-loading"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-2">
            Artist Manager Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your roster, track revenue, and grow your artists' careers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Artists</CardTitle>
              <Users className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.totalArtists}</div>
              <p className="text-xs text-gray-400">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Contracts</CardTitle>
              <Award className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.activeContracts}</div>
              <p className="text-xs text-gray-400">
                3 expiring soon
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats?.monthlyRevenue?.toLocaleString()}</div>
              <p className="text-xs text-green-400">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Upcoming Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.upcomingBookings}</div>
              <p className="text-xs text-gray-400">
                Next: Aug 15, MSG
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="netflix-tabs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="artists">Artist Roster</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performer */}
              <Card className="netflix-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="h-5 w-5 text-netflix-red" />
                    Top Performer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-netflix-red to-red-400 rounded-full flex items-center justify-center">
                      <Music className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{stats?.topPerformer}</h3>
                      <p className="text-gray-400">Generated $45,200 this month</p>
                      <Badge className="netflix-badge-success mt-2">15% Commission</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="netflix-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-netflix-red" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full netflix-button-primary">
                    Add New Artist
                  </Button>
                  <Button variant="outline" className="w-full netflix-button-secondary">
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="w-full netflix-button-secondary">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">
                  Latest updates from your artist roster
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white">Sarah Johnson confirmed for Madison Square Garden</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white">New contract signed with Emily Chen</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white">Mike Davis contract renewal due in 30 days</p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tab contents will be implemented in separate components */}
          <TabsContent value="artists">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Artist Roster Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Artist roster functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Revenue tracking functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Contract Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Contract tracking functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Booking Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Booking coordination functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Promotional Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Campaign management functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}