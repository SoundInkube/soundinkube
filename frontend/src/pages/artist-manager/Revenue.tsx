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
      <div className="text-white flex items-center justify-center min-h-screen">
        <div className="text-white netflix-loading"></div>
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
    <div className="text-white min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="text-white max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-white mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-white text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-2">
              Revenue Analytics
            </h1>
            <p className="text-white text-white text-lg">
              Track earnings, commissions, and financial performance
            </p>
          </div>
          <div className="text-white flex gap-3 mt-4 sm:mt-0">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="text-white w-40 netflix-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="text-white netflix-button-primary">
              <Download className="text-white h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Revenue Overview Cards */}
        <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Total Revenue</CardTitle>
              <DollarSign className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">
                ${revenueData?.totalRevenue.toLocaleString()}
              </div>
              <p className="text-white text-xs text-white">
                All-time earnings
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Monthly Revenue</CardTitle>
              <Calendar className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">
                ${revenueData?.monthlyRevenue.toLocaleString()}
              </div>
              <p className={`text-xs flex items-center ${growth >= 0 ? 'text-netflix-red' : 'text-red-400'}`}>
                {growth >= 0 ? <TrendingUp className="text-white h-3 w-3 mr-1" /> : <TrendingDown className="text-white h-3 w-3 mr-1" />}
                {Math.abs(growth).toFixed(1)}% vs last month
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Commission Rate</CardTitle>
              <PieChart className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">
                {revenueData?.commissionRate}%
              </div>
              <p className="text-white text-xs text-white">
                Average across artists
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Top Performer</CardTitle>
              <TrendingUp className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-lg font-bold text-white">
                {revenueData?.topEarningArtist}
              </div>
              <p className="text-white text-xs text-white">
                Highest earner this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analytics Tabs */}
        <Tabs defaultValue="overview" className="text-white space-y-6">
          <TabsList className="text-white netflix-tabs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="artists">By Artist</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="text-white space-y-6">
            <div className="text-white grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends Chart */}
              <Card className="text-white netflix-card">
                <CardHeader>
                  <CardTitle className="text-white text-white">Revenue Trends</CardTitle>
                  <CardDescription className="text-white text-white">
                    Monthly revenue over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-white space-y-4">
                    {revenueData?.monthlyTrends.map((month, index) => (
                      <div key={month.month} className="text-white flex items-center space-x-4">
                        <div className="text-white w-12 text-sm text-white">{month.month}</div>
                        <div className="text-white flex-1">
                          <Progress 
                            value={(month.revenue / 20000) * 100} 
                            className="text-white h-2"
                          />
                        </div>
                        <div className="text-white w-20 text-sm text-white text-right">
                          ${month.revenue.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Artists Performance */}
              <Card className="text-white netflix-card">
                <CardHeader>
                  <CardTitle className="text-white text-white">Top Performers</CardTitle>
                  <CardDescription className="text-white text-white">
                    Artists generating the most revenue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-white space-y-4">
                    {revenueData?.revenueByArtist
                      .filter(artist => artist.revenue > 0)
                      .sort((a, b) => b.revenue - a.revenue)
                      .slice(0, 5)
                      .map((artist, index) => (
                      <div key={artist.artistName} className="text-white flex items-center justify-between">
                        <div className="text-white flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0 ? 'bg-netflix-red text-white' :
                            index === 1 ? 'bg-netflix-dark text-white' :
                            index === 2 ? 'bg-orange-500 text-white' :
                            'bg-netflix-dark text-white'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-white text-white font-medium">{artist.artistName}</span>
                        </div>
                        <div className="text-white text-right">
                          <div className="text-white text-white font-medium">
                            ${artist.revenue.toLocaleString()}
                          </div>
                          <div className="text-white text-xs text-white">
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
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Revenue by Artist</CardTitle>
                <CardDescription className="text-white text-white">
                  Detailed breakdown of earnings per artist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-4">
                  {revenueData?.revenueByArtist.map((artist) => (
                    <div key={artist.artistName} className="text-white flex items-center justify-between p-4 rounded-lg border border-gray-700">
                      <div className="text-white flex items-center space-x-4">
                        <div className="text-white w-12 h-12 bg-gradient-to-r from-netflix-red to-red-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-white font-bold">
                            {artist.artistName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white text-white font-medium">{artist.artistName}</h3>
                          <p className="text-white text-white text-sm">
                            {artist.revenue > 0 ? 'Active performer' : 'Inactive'}
                          </p>
                        </div>
                      </div>
                      <div className="text-white text-right">
                        <div className="text-white text-xl font-bold text-white">
                          ${artist.revenue.toLocaleString()}
                        </div>
                        <div className="text-white text-sm text-white">
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
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Revenue Trends Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Advanced trend analysis coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commissions">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Commission Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Commission tracking tools coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}