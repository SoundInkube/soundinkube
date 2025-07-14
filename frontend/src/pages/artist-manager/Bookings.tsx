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
        return <Badge className="text-white netflix-badge-success flex items-center gap-1">
          <CheckCircle className="text-white h-3 w-3" />
          {status}
        </Badge>;
      case 'Pending':
        return <Badge className="text-white netflix-badge-warning flex items-center gap-1">
          <Clock className="text-white h-3 w-3" />
          {status}
        </Badge>;
      case 'Negotiating':
        return <Badge className="text-white bg-red-600 text-white flex items-center gap-1">
          <AlertCircle className="text-white h-3 w-3" />
          {status}
        </Badge>;
      case 'Cancelled':
        return <Badge className="text-white netflix-badge-error flex items-center gap-1">
          <AlertCircle className="text-white h-3 w-3" />
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
            Booking Management
          </h1>
          <p className="text-white text-white text-lg">
            Coordinate shows, manage venues, and track performance fees
          </p>
        </div>

        {/* Stats Cards */}
        <div className="text-white grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Total Bookings</CardTitle>
              <Calendar className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-white text-xs text-white">
                This quarter
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Confirmed Shows</CardTitle>
              <CheckCircle className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{stats.confirmed}</div>
              <p className="text-white text-xs text-netflix-red">
                Ready to perform
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Pending Approval</CardTitle>
              <Clock className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{stats.pending}</div>
              <p className="text-white text-xs text-netflix-red">
                Awaiting confirmation
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Confirmed Revenue</CardTitle>
              <DollarSign className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-white text-xs text-white">
                From confirmed shows
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="text-white flex flex-col sm:flex-row gap-4 mb-6">
          <div className="text-white flex-1">
            <div className="text-white relative">
              <Search className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              <Input
                placeholder="Search bookings by artist, venue, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-white pl-10 netflix-input"
              />
            </div>
          </div>
          <div className="text-white flex gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="text-white w-40 netflix-input">
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
            <Button className="text-white netflix-button-primary">
              <Plus className="text-white h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Bookings Table */}
        <Tabs defaultValue="all" className="text-white space-y-6">
          <TabsList className="text-white netflix-tabs">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Booking Schedule</CardTitle>
                <CardDescription className="text-white text-white">
                  Complete overview of all artist bookings and performances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="text-white border-gray-700">
                      <TableHead className="text-white text-white">Artist</TableHead>
                      <TableHead className="text-white text-white">Venue</TableHead>
                      <TableHead className="text-white text-white">Date & Time</TableHead>
                      <TableHead className="text-white text-white">Type</TableHead>
                      <TableHead className="text-white text-white">Status</TableHead>
                      <TableHead className="text-white text-white">Fee</TableHead>
                      <TableHead className="text-white text-white">Location</TableHead>
                      <TableHead className="text-white text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="text-white border-gray-700 hover:bg-netflix-dark/50">
                        <TableCell className="text-white font-medium text-white">
                          {booking.artistName}
                        </TableCell>
                        <TableCell className="text-white text-white">
                          <div>
                            <div className="text-white font-medium">{booking.venue}</div>
                            {booking.capacity && (
                              <div className="text-white text-xs text-white">
                                Capacity: {booking.capacity.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-white text-white">
                          <div>
                            <div>{new Date(booking.date).toLocaleDateString()}</div>
                            <div className="text-white text-xs text-white">{booking.time}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-white text-white">
                          {booking.type}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(booking.status)}
                        </TableCell>
                        <TableCell className="text-white text-netflix-red font-medium">
                          ${booking.fee.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-white text-white">
                          <div className="text-white flex items-center gap-1">
                            <MapPin className="text-white h-3 w-3" />
                            {booking.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-white flex space-x-2">
                            <Button size="sm" variant="outline" className="text-white netflix-button-secondary">
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
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Upcoming Shows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-4">
                  {bookings
                    .filter(b => new Date(b.date) > new Date() && b.status === 'Confirmed')
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((booking) => (
                    <div key={booking.id} className="text-white p-4 rounded-lg border border-red-600/30 bg-red-600/5">
                      <div className="text-white flex items-center justify-between">
                        <div>
                          <h3 className="text-white text-white font-medium">{booking.artistName}</h3>
                          <p className="text-white text-white">{booking.venue} - {booking.type}</p>
                          <p className="text-white text-sm text-white">{booking.location}</p>
                        </div>
                        <div className="text-white text-right">
                          <p className="text-white text-white font-medium">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                          <p className="text-white text-netflix-red font-bold">${booking.fee.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Calendar View</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Calendar integration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="venues">
            <Card className="text-white netflix-card">
              <CardHeader>
                <CardTitle className="text-white text-white">Venue Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-white">Venue database and management tools coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}