import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, Users, DollarSign, ShoppingBag, Calendar } from 'lucide-react';

const userGrowthData = [
  { month: 'Jan', users: 400, professionals: 120, clients: 280 },
  { month: 'Feb', users: 600, professionals: 180, clients: 420 },
  { month: 'Mar', users: 800, professionals: 240, clients: 560 },
  { month: 'Apr', users: 1100, professionals: 330, clients: 770 },
  { month: 'May', users: 1400, professionals: 420, clients: 980 },
  { month: 'Jun', users: 1800, professionals: 540, clients: 1260 },
  { month: 'Jul', users: 2100, professionals: 630, clients: 1470 },
];

const revenueData = [
  { month: 'Jan', revenue: 12000, bookings: 8000, marketplace: 4000 },
  { month: 'Feb', revenue: 18000, bookings: 12000, marketplace: 6000 },
  { month: 'Mar', revenue: 25000, bookings: 16000, marketplace: 9000 },
  { month: 'Apr', revenue: 32000, bookings: 20000, marketplace: 12000 },
  { month: 'May', revenue: 41000, bookings: 26000, marketplace: 15000 },
  { month: 'Jun', revenue: 48000, bookings: 30000, marketplace: 18000 },
  { month: 'Jul', revenue: 55000, bookings: 35000, marketplace: 20000 },
];

const categoryData = [
  { name: 'Guitar', value: 35, color: '#0088FE' },
  { name: 'Piano', value: 25, color: '#00C49F' },
  { name: 'Vocals', value: 20, color: '#FFBB28' },
  { name: 'Drums', value: 12, color: '#FF8042' },
  { name: 'Other', value: 8, color: '#8884D8' },
];

const bookingTrendsData = [
  { day: 'Mon', bookings: 45 },
  { day: 'Tue', bookings: 52 },
  { day: 'Wed', bookings: 38 },
  { day: 'Thu', bookings: 61 },
  { day: 'Fri', bookings: 73 },
  { day: 'Sat', bookings: 89 },
  { day: 'Sun', bookings: 56 },
];

const metrics = [
  {
    title: 'Total Revenue',
    value: '$55,231',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-green-600',
  },
  {
    title: 'Active Users',
    value: '2,451',
    change: '+8.2%',
    icon: Users,
    color: 'text-blue-600',
  },
  {
    title: 'Total Bookings',
    value: '1,234',
    change: '+15.3%',
    icon: Calendar,
    color: 'text-purple-600',
  },
  {
    title: 'Marketplace Items',
    value: '856',
    change: '+23.1%',
    icon: ShoppingBag,
    color: 'text-orange-600',
  },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track platform performance and user engagement metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                Monthly user registration trends across different user types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="professionals"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="clients"
                    stackId="3"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Monthly revenue breakdown by source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#8884d8" />
                  <Bar dataKey="marketplace" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Professional Categories</CardTitle>
              <CardDescription>
                Distribution of music professionals by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
              <CardDescription>
                Daily booking patterns throughout the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={bookingTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}