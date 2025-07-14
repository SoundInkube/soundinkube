import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, FileText, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

const reports = [
  {
    id: 1,
    name: 'Monthly User Report',
    description: 'Comprehensive user activity and registration statistics',
    type: 'User Analytics',
    lastGenerated: '2024-07-11',
    size: '2.4 MB',
    status: 'Ready',
  },
  {
    id: 2,
    name: 'Revenue Analysis',
    description: 'Financial performance and transaction analysis',
    type: 'Financial',
    lastGenerated: '2024-07-10',
    size: '1.8 MB',
    status: 'Ready',
  },
  {
    id: 3,
    name: 'Marketplace Activity',
    description: 'Equipment listings and sales performance',
    type: 'Marketplace',
    lastGenerated: '2024-07-09',
    size: '3.2 MB',
    status: 'Ready',
  },
  {
    id: 4,
    name: 'Professional Bookings',
    description: 'Booking trends and professional performance metrics',
    type: 'Bookings',
    lastGenerated: '2024-07-08',
    size: '1.5 MB',
    status: 'Generating',
  },
  {
    id: 5,
    name: 'Platform Health Report',
    description: 'Overall platform performance and system metrics',
    type: 'System',
    lastGenerated: '2024-07-07',
    size: '4.1 MB',
    status: 'Ready',
  },
];

const quickStats = [
  {
    title: 'Reports Generated This Month',
    value: '24',
    icon: FileText,
    color: 'text-blue-600',
  },
  {
    title: 'Data Exported (GB)',
    value: '45.2',
    icon: Download,
    color: 'text-green-600',
  },
  {
    title: 'Scheduled Reports',
    value: '8',
    icon: Calendar,
    color: 'text-purple-600',
  },
];

export default function Reports() {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'default';
      case 'Generating':
        return 'secondary';
      case 'Failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'User Analytics':
        return 'default';
      case 'Financial':
        return 'secondary';
      case 'Marketplace':
        return 'outline';
      case 'Bookings':
        return 'secondary';
      case 'System':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Insights</h1>
          <p className="text-muted-foreground">
            Generate and download platform performance reports
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Updated daily
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Download and manage your platform reports and analytics data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">{report.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(report.type)}>
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.lastGenerated}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      disabled={report.status !== 'Ready'}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>
              Automatically generated reports based on your schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly User Summary</div>
                  <div className="text-sm text-muted-foreground">Every Monday at 9:00 AM</div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Monthly Revenue Report</div>
                  <div className="text-sm text-muted-foreground">1st of every month</div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Quarterly Analytics</div>
                  <div className="text-sm text-muted-foreground">Every 3 months</div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>
              Choose your preferred format for data export
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Export as Excel
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Export as CSV
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Custom Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}