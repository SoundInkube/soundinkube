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
      <div className="text-white flex items-center justify-center min-h-screen">
        <div className="text-white netflix-loading"></div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="text-white max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-white mb-8">
          <h1 className="text-white text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-2">
            Artist Manager Dashboard
          </h1>
          <p className="text-white text-white text-lg">
            Manage your roster, track revenue, and grow your artists' careers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Total Artists</CardTitle>
              <Users className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{stats?.totalArtists}</div>
              <p className="text-white text-xs text-white">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Active Contracts</CardTitle>
              <Award className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{stats?.activeContracts}</div>
              <p className="text-white text-xs text-white">
                3 expiring soon
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Monthly Revenue</CardTitle>
              <DollarSign className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">${stats?.monthlyRevenue?.toLocaleString()}</div>
              <p className="text-white text-xs text-netflix-red">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Upcoming Bookings</CardTitle>
              <Calendar className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{stats?.upcomingBookings}</div>
              <p className="text-white text-xs text-white">
                Next: Aug 15, MSG
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="text-white space-y-6">
          <TabsList className="text-white netflix-tabs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="artists">Artist Roster</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="text-white space-y-6">
            <div className="text-white grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performer */}
              <Card className="text-white netflix-card">
                <CardHeader>
                  <CardTitle className="text-white text-white flex items-center gap-2">
                    <Star className="text-white h-5 w-5 text-netflix-red" />
                    Top Performer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white flex items-center space-x-4">
                    <div className="text-white w-16 h-16 bg-gradient-to-r from-netflix-red to-red-400 rounded-full flex items-center justify-center">
                      <Music className="text-white h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold text-white">{stats?.topPerformer}</h3>
                      <p className="text-white text-white">Generated $45,200 this month</p>
                      <Badge className="text-white netflix-badge-success mt-2">15% Commission</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="text-white netflix-card">
                <CardHeader>
                  <CardTitle className="text-white text-white flex items-center gap-2">
                    <Target className="text-white h-5 w-5 text-netflix-red" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white space-y-3">
                  <Button className="text-white w-full netflix-button-primary">
                    Add New Artist
                  </Button>
                  <Button variant="outline" className="text-white w-full netflix-button-secondary">
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="text-white w-full netflix-button-secondary">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white text-white">
                  Latest updates from your artist roster
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-4">
                  <div className="text-white flex items-center space-x-4">
                    <div className="text-white w-2 h-2 bg-red-600 rounded-full"></div>
                    <div className="text-white flex-1">
                      <p className="text-white text-white">Sarah Johnson confirmed for Madison Square Garden</p>
                      <p className="text-white text-xs text-white">2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-white flex items-center space-x-4">
                    <div className="text-white w-2 h-2 bg-red-600 rounded-full"></div>
                    <div className="text-white flex-1">
                      <p className="text-white text-white">New contract signed with Emily Chen</p>
                      <p className="text-white text-xs text-white">1 day ago</p>
                    </div>
                  </div>
                  <div className="text-white flex items-center space-x-4">
                    <div className="text-white w-2 h-2 bg-netflix-red rounded-full"></div>
                    <div className="text-white flex-1">
                      <p className="text-white text-white">Mike Davis contract renewal due in 30 days</p>
                      <p className="text-white text-xs text-white">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tab contents will be implemented in separate components */}
          <TabsContent value="artists">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Artist Roster Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Artist roster functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Revenue tracking functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Contract Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Contract tracking functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Booking Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Booking coordination functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Promotional Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Campaign management functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}