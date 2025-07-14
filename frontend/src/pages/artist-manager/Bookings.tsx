import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Calendar, MapPin, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Booking {
  id: string;
  artistName: string;
  venue: string;
  date: string;
  time: string;
  fee: number;
  status: 'Confirmed' | 'Pending' | 'Negotiating' | 'Cancelled';
  type: string;
  location?: string;
  capacity?: number;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock booking data
    const mockBookings: Booking[] = [
      {
        id: 'booking-1',
        artistName: 'Sarah Johnson',
        venue: 'Madison Square Garden',
        date: '2024-08-15',
        time: '20:00',
        fee: 15000,
        status: 'Confirmed',
        type: 'Concert',
        location: 'New York, NY',
        capacity: 20000,
      },
      {
        id: 'booking-2',
        artistName: 'Mike Davis',
        venue: 'Blue Note Jazz Club',
        date: '2024-07-28',
        time: '21:30',
        fee: 3500,
        status: 'Confirmed',
        type: 'Live Performance',
        location: 'New York, NY',
        capacity: 300,
      },
      {
        id: 'booking-3',
        artistName: 'Emily Chen',
        venue: 'Coachella Music Festival',
        date: '2024-09-12',
        time: '16:00',
        fee: 25000,
        status: 'Pending',
        type: 'Festival',
        location: 'Indio, CA',
        capacity: 75000,
      },
      {
        id: 'booking-4',
        artistName: 'Alex Rodriguez',
        venue: 'The Apollo Theater',
        date: '2024-08-03',
        time: '19:00',
        fee: 8500,
        status: 'Confirmed',
        type: 'Solo Concert',
        location: 'New York, NY',
        capacity: 1500,
      },
      {
        id: 'booking-5',
        artistName: 'Sarah Johnson',
        venue: 'Red Rocks Amphitheatre',
        date: '2024-09-25',
        time: '18:30',
        fee: 22000,
        status: 'Negotiating',
        type: 'Outdoor Concert',
        location: 'Morrison, CO',
        capacity: 9500,
      },
      {
        id: 'booking-6',
        artistName: 'David Kim',
        venue: 'The Troubadour',
        date: '2024-07-20',
        time: '20:00',
        fee: 4200,
        status: 'Cancelled',
        type: 'Acoustic Show',
        location: 'Los Angeles, CA',
        capacity: 500,
      },
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <Badge className="netflix-badge-success flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {status}
        </Badge>;
      case 'Pending':
        return <Badge className="netflix-badge-warning flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {status}
        </Badge>;
      case 'Negotiating':
        return <Badge className="bg-blue-600 text-white flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {status}
        </Badge>;
      case 'Cancelled':
        return <Badge className="netflix-badge-error flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {status}
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
      booking.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getBookingStats = () => {
    return {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'Confirmed').length,
      pending: bookings.filter(b => b.status === 'Pending').length,
      totalRevenue: bookings
        .filter(b => b.status === 'Confirmed')
        .reduce((sum, b) => sum + b.fee, 0),
    };
  };

  const stats = getBookingStats();

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
            Booking Management
          </h1>
          <p className="text-gray-400 text-lg">
            Coordinate shows, manage venues, and track performance fees
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400">
                This quarter
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Confirmed Shows</CardTitle>
              <CheckCircle className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.confirmed}</div>
              <p className="text-xs text-green-400">
                Ready to perform
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pending}</div>
              <p className="text-xs text-yellow-400">
                Awaiting confirmation
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Confirmed Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-400">
                From confirmed shows
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
                placeholder="Search bookings by artist, venue, or type..."
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="negotiating">Negotiating</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button className="netflix-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Bookings Table */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="netflix-tabs">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Booking Schedule</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete overview of all artist bookings and performances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Artist</TableHead>
                      <TableHead className="text-gray-300">Venue</TableHead>
                      <TableHead className="text-gray-300">Date & Time</TableHead>
                      <TableHead className="text-gray-300">Type</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Fee</TableHead>
                      <TableHead className="text-gray-300">Location</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="border-gray-700 hover:bg-gray-800/50">
                        <TableCell className="font-medium text-white">
                          {booking.artistName}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div>
                            <div className="font-medium">{booking.venue}</div>
                            {booking.capacity && (
                              <div className="text-xs text-gray-400">
                                Capacity: {booking.capacity.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div>
                            <div>{new Date(booking.date).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-400">{booking.time}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {booking.type}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(booking.status)}
                        </TableCell>
                        <TableCell className="text-green-400 font-medium">
                          ${booking.fee.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {booking.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="netflix-button-secondary">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Shows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings
                    .filter(b => new Date(b.date) > new Date() && b.status === 'Confirmed')
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((booking) => (
                    <div key={booking.id} className="p-4 rounded-lg border border-green-500/30 bg-green-500/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{booking.artistName}</h3>
                          <p className="text-gray-400">{booking.venue} - {booking.type}</p>
                          <p className="text-sm text-gray-500">{booking.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                          <p className="text-green-400 font-bold">${booking.fee.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Calendar View</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Calendar integration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="venues">
            <Card className="netflix-card">
              <CardHeader>
                <CardTitle className="text-white">Venue Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Venue database and management tools coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}