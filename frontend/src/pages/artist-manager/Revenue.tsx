import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, TrendingDown, Download, Calendar, PieChart } from 'lucide-react';

interface RevenueData {
  totalRevenue: number;
  monthlyRevenue: number;
  commissionRate: number;
  topEarningArtist: string;
  revenueByArtist: Array<{
    artistName: string;
    revenue: number;
    commission: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    revenue: number;
  }>;
}

export default function Revenue() {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock revenue data
    const mockData: RevenueData = {
      totalRevenue: 125500,
      monthlyRevenue: 12800,
      commissionRate: 15,
      topEarningArtist: 'Sarah Johnson',
      revenueByArtist: [
        { artistName: 'Sarah Johnson', revenue: 45200, commission: 6780 },
        { artistName: 'Mike Davis', revenue: 38900, commission: 5835 },
        { artistName: 'Emily Chen', revenue: 24100, commission: 3615 },
        { artistName: 'Alex Rodriguez', revenue: 17300, commission: 2595 },
        { artistName: 'Maya Patel', revenue: 0, commission: 0 },
        { artistName: 'David Kim', revenue: 14500, commission: 2175 },
      ],
      monthlyTrends: [
        { month: 'Jan', revenue: 8500 },
        { month: 'Feb', revenue: 9200 },
        { month: 'Mar', revenue: 11800 },
        { month: 'Apr', revenue: 13400 },
        { month: 'May', revenue: 15600 },
        { month: 'Jun', revenue: 12800 },
      ],
    };

    setTimeout(() => {
      setRevenueData(mockData);
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

  const calculateGrowth = () => {
    if (!revenueData?.monthlyTrends || revenueData.monthlyTrends.length < 2) return 0;
    const current = revenueData.monthlyTrends[revenueData.monthlyTrends.length - 1].revenue;
    const previous = revenueData.monthlyTrends[revenueData.monthlyTrends.length - 2].revenue;
    return ((current - previous) / previous * 100);
  };

  const growth = calculateGrowth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-2">
              Revenue Analytics
            </h1>
            <p className="text-gray-400 text-lg">
              Track earnings, commissions, and financial performance
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40 netflix-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="netflix-button-primary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Revenue Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${revenueData?.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-400">
                All-time earnings
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
              <Calendar className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${revenueData?.monthlyRevenue.toLocaleString()}
              </div>
              <p className={`text-xs flex items-center ${growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {growth >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(growth).toFixed(1)}% vs last month
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Commission Rate</CardTitle>
              <PieChart className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {revenueData?.commissionRate}%
              </div>
              <p className="text-xs text-gray-400">
                Average across artists
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Top Performer</CardTitle>
              <TrendingUp className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white">
                {revenueData?.topEarningArtist}
              </div>
              <p className="text-xs text-gray-400">
                Highest earner this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="netflix-tabs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="artists">By Artist</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends Chart */}
              <Card className="netflix-card">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Trends</CardTitle>
                  <CardDescription className="text-gray-400">
                    Monthly revenue over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData?.monthlyTrends.map((month, index) => (
                      <div key={month.month} className="flex items-center space-x-4">
                        <div className="w-12 text-sm text-gray-400">{month.month}</div>
                        <div className="flex-1">
                          <Progress 
                            value={(month.revenue / 20000) * 100} 
                            className="h-2"
                          />
                        </div>
                        <div className="w-20 text-sm text-white text-right">
                          ${month.revenue.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Artists Performance */}
              <Card className="netflix-card">
                <CardHeader>
                  <CardTitle className="text-white">Top Performers</CardTitle>
                  <CardDescription className="text-gray-400">
                    Artists generating the most revenue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData?.revenueByArtist
                      .filter(artist => artist.revenue > 0)
                      .sort((a, b) => b.revenue - a.revenue)
                      .slice(0, 5)
                      .map((artist, index) => (
                      <div key={artist.artistName} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0 ? 'bg-yellow-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-orange-500 text-white' :
                            'bg-gray-600 text-white'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-white font-medium">{artist.artistName}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            ${artist.revenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            ${artist.commission.toLocaleString()} commission
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="artists">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Revenue by Artist</CardTitle>
                <CardDescription className="text-gray-400">
                  Detailed breakdown of earnings per artist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData?.revenueByArtist.map((artist) => (
                    <div key={artist.artistName} className="flex items-center justify-between p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-netflix-red to-red-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {artist.artistName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{artist.artistName}</h3>
                          <p className="text-gray-400 text-sm">
                            {artist.revenue > 0 ? 'Active performer' : 'Inactive'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">
                          ${artist.revenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">
                          Commission: ${artist.commission.toLocaleString()}
                        </div>
                        <Badge className={artist.revenue > 0 ? 'netflix-badge-success' : 'netflix-badge-error'}>
                          {artist.revenue > 0 ? 'Earning' : 'No Revenue'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Revenue Trends Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Advanced trend analysis coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commissions">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Commission Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Commission tracking tools coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}