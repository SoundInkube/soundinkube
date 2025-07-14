import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Users, PlayCircle, DollarSign, Calendar, Target, Star } from 'lucide-react';

interface ArtistPerformance {
  id: string;
  name: string;
  totalStreams: number;
  monthlyGrowth: number;
  revenue: number;
  engagement: number;
  upcomingEvents: number;
  socialFollowers: number;
  topTrack: string;
  recentCampaigns: number;
}

const mockArtistData: ArtistPerformance[] = [
  {
    id: '1',
    name: 'Maya Chen',
    totalStreams: 2450000,
    monthlyGrowth: 15.2,
    revenue: 18500,
    engagement: 8.7,
    upcomingEvents: 3,
    socialFollowers: 125000,
    topTrack: 'Midnight Dreams',
    recentCampaigns: 2
  },
  {
    id: '2',
    name: 'DJ Nexus',
    totalStreams: 1890000,
    monthlyGrowth: -2.3,
    revenue: 22100,
    engagement: 6.4,
    upcomingEvents: 5,
    socialFollowers: 89000,
    topTrack: 'Electric Nights',
    recentCampaigns: 1
  },
  {
    id: '3',
    name: 'Sarah Williams',
    totalStreams: 3200000,
    monthlyGrowth: 28.7,
    revenue: 31200,
    engagement: 12.3,
    upcomingEvents: 2,
    socialFollowers: 187000,
    topTrack: 'Broken Strings',
    recentCampaigns: 4
  }
];

export default function AnalyticsDashboard() {
  const [selectedArtist, setSelectedArtist] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30d');

  const totalRevenue = mockArtistData.reduce((sum, artist) => sum + artist.revenue, 0);
  const totalStreams = mockArtistData.reduce((sum, artist) => sum + artist.totalStreams, 0);
  const avgGrowth = mockArtistData.reduce((sum, artist) => sum + artist.monthlyGrowth, 0) / mockArtistData.length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-2">Comprehensive performance insights for your artists</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Streams</CardTitle>
            <PlayCircle className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{(totalStreams / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-blue-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{avgGrowth.toFixed(1)}% average growth
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Artists</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockArtistData.length}</div>
            <p className="text-xs text-purple-400">
              All performing well
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {mockArtistData.reduce((sum, artist) => sum + artist.upcomingEvents, 0)}
            </div>
            <p className="text-xs text-orange-400">
              Next 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Artist Performance Table */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Artist Performance Overview</CardTitle>
          <CardDescription className="text-gray-400">
            Detailed performance metrics for each artist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedArtist} onValueChange={setSelectedArtist}>
            <TabsList className="bg-gray-800 border-gray-600">
              <TabsTrigger value="all" className="text-white">All Artists</TabsTrigger>
              {mockArtistData.map((artist) => (
                <TabsTrigger key={artist.id} value={artist.id} className="text-white">
                  {artist.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {mockArtistData.map((artist) => (
                  <div key={artist.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{artist.name}</h3>
                        <p className="text-gray-400">Top Track: {artist.topTrack}</p>
                      </div>
                      <Badge 
                        variant={artist.monthlyGrowth > 0 ? "default" : "destructive"}
                        className={artist.monthlyGrowth > 0 ? "bg-green-600" : "bg-red-600"}
                      >
                        {artist.monthlyGrowth > 0 ? '+' : ''}{artist.monthlyGrowth}%
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Monthly Streams</p>
                        <p className="text-white font-semibold">{(artist.totalStreams / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Revenue</p>
                        <p className="text-white font-semibold">${artist.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Engagement Rate</p>
                        <p className="text-white font-semibold">{artist.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Social Followers</p>
                        <p className="text-white font-semibold">{(artist.socialFollowers / 1000).toFixed(0)}K</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Performance Score</span>
                        <span className="text-white text-sm">{artist.engagement * 10}/100</span>
                      </div>
                      <Progress value={artist.engagement * 10} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {artist.upcomingEvents} upcoming events
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {artist.recentCampaigns} active campaigns
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {mockArtistData.map((artist) => (
              <TabsContent key={artist.id} value={artist.id} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Streaming Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Streams</span>
                          <span className="text-white font-semibold">{artist.totalStreams.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Monthly Growth</span>
                          <span className={`font-semibold ${artist.monthlyGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {artist.monthlyGrowth > 0 ? '+' : ''}{artist.monthlyGrowth}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Top Track</span>
                          <span className="text-white font-semibold">{artist.topTrack}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Engagement Rate</span>
                          <span className="text-white font-semibold">{artist.engagement}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Revenue & Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Monthly Revenue</span>
                          <span className="text-white font-semibold">${artist.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Upcoming Events</span>
                          <span className="text-white font-semibold">{artist.upcomingEvents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Active Campaigns</span>
                          <span className="text-white font-semibold">{artist.recentCampaigns}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Social Followers</span>
                          <span className="text-white font-semibold">{artist.socialFollowers.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}