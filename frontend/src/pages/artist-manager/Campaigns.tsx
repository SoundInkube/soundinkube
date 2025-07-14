import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, TrendingUp, Eye, Share2, DollarSign, Target, BarChart3 } from 'lucide-react';

interface Campaign {
  id: string;
  artistName: string;
  campaignName: string;
  platform: string;
  budget: number;
  spent: number;
  reach: number;
  engagement: number;
  status: 'Active' | 'Completed' | 'Paused' | 'Draft';
  startDate: string;
  endDate: string;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock campaign data
    const mockCampaigns: Campaign[] = [
      {
        id: 'campaign-1',
        artistName: 'Sarah Johnson',
        campaignName: 'Summer Tour 2024',
        platform: 'Instagram, TikTok',
        budget: 5000,
        spent: 3200,
        reach: 125000,
        engagement: 8.5,
        status: 'Active',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
      },
      {
        id: 'campaign-2',
        artistName: 'Mike Davis',
        campaignName: 'New Album Launch',
        platform: 'Spotify, YouTube',
        budget: 8000,
        spent: 8000,
        reach: 89000,
        engagement: 12.3,
        status: 'Completed',
        startDate: '2024-03-15',
        endDate: '2024-05-15',
      },
      {
        id: 'campaign-3',
        artistName: 'Emily Chen',
        campaignName: 'Festival Promotion',
        platform: 'Facebook, Twitter',
        budget: 3500,
        spent: 1800,
        reach: 67000,
        engagement: 6.7,
        status: 'Active',
        startDate: '2024-07-01',
        endDate: '2024-09-15',
      },
      {
        id: 'campaign-4',
        artistName: 'Alex Rodriguez',
        campaignName: 'Single Release Buzz',
        platform: 'TikTok, Instagram',
        budget: 2500,
        spent: 0,
        reach: 0,
        engagement: 0,
        status: 'Draft',
        startDate: '2024-08-01',
        endDate: '2024-09-01',
      },
      {
        id: 'campaign-5',
        artistName: 'David Kim',
        campaignName: 'Country Music Spotlight',
        platform: 'YouTube, Facebook',
        budget: 4200,
        spent: 2100,
        reach: 43000,
        engagement: 9.2,
        status: 'Paused',
        startDate: '2024-05-20',
        endDate: '2024-08-20',
      },
    ];

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="netflix-badge-success">{status}</Badge>;
      case 'Completed':
        return <Badge className="bg-red-600 text-white">{status}</Badge>;
      case 'Paused':
        return <Badge className="netflix-badge-warning">{status}</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-600 text-white">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = 
      campaign.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.platform.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
      campaign.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getCampaignStats = () => {
    return {
      total: campaigns.length,
      active: campaigns.filter(c => c.status === 'Active').length,
      totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
      totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
      totalReach: campaigns.reduce((sum, c) => sum + c.reach, 0),
      avgEngagement: campaigns.reduce((sum, c) => sum + c.engagement, 0) / campaigns.length,
    };
  };

  const stats = getCampaignStats();

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
            Promotional Campaigns
          </h1>
          <p className="text-gray-400 text-lg">
            Manage marketing campaigns, track performance, and grow your artists' reach
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Campaigns</CardTitle>
              <Target className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.active}</div>
              <p className="text-xs text-gray-400">
                Out of {stats.total} total
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Reach</CardTitle>
              <Eye className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalReach.toLocaleString()}</div>
              <p className="text-xs text-green-400">
                Across all platforms
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Budget Utilization</CardTitle>
              <DollarSign className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {((stats.totalSpent / stats.totalBudget) * 100).toFixed(0)}%
              </div>
              <p className="text-xs text-gray-400">
                ${stats.totalSpent.toLocaleString()} / ${stats.totalBudget.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.avgEngagement.toFixed(1)}%</div>
              <p className="text-xs text-gray-400">
                Engagement rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search campaigns by artist, name, or platform..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 netflix-input"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 netflix-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button className="netflix-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Campaigns Grid */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList className="netflix-tabs">
            <TabsTrigger value="grid">Campaign Grid</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="netflix-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{campaign.campaignName}</CardTitle>
                      {getStatusBadge(campaign.status)}
                    </div>
                    <CardDescription className="text-gray-400">
                      {campaign.artistName} • {campaign.platform}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Budget Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Budget Used</span>
                        <span className="text-white">
                          ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-white">{campaign.reach.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Reach</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-white">{campaign.engagement}%</div>
                        <div className="text-xs text-gray-400">Engagement</div>
                      </div>
                    </div>

                    {/* Date Range */}
                    <div className="text-sm text-gray-400">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 netflix-button-secondary">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 netflix-button-secondary">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Campaign Analytics</CardTitle>
                <CardDescription className="text-gray-400">
                  Detailed performance metrics and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Advanced analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Performance tracking tools coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Campaign Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Campaign scheduling calendar coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}