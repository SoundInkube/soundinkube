import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/charts/Overview';
import { RecentActivity } from '@/components/recent-activity';
import { Users, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: "Total Users",
    value: "2,451",
    change: "+20.1% from last month",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+15.5% from last month",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "Marketplace Items",
    value: "1,234",
    change: "+12.3% from last month",
    icon: ShoppingBag,
    color: "text-purple-600"
  },
  {
    title: "Active Bookings",
    value: "573",
    change: "+8.2% from last month",
    icon: TrendingUp,
    color: "text-orange-600"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your SoundInkube admin dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Platform usage and revenue trends
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest platform activities and user actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}