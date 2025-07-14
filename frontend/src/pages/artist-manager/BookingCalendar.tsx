import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, MapPin, Clock, DollarSign, Users, Plus, Edit, Trash2 } from 'lucide-react';

interface BookingEvent {
  id: string;
  artistName: string;
  eventTitle: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  duration: number;
  fee: number;
  capacity: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  type: 'concert' | 'festival' | 'private' | 'corporate' | 'recording';
  notes: string;
  contactPerson: string;
  contactEmail: string;
  contractSigned: boolean;
}

const mockBookings: BookingEvent[] = [
  {
    id: '1',
    artistName: 'Maya Chen',
    eventTitle: 'Summer Jazz Festival',
    venue: 'Central Park Amphitheater',
    location: 'New York, NY',
    date: '2024-08-15',
    time: '19:00',
    duration: 90,
    fee: 15000,
    capacity: 2500,
    status: 'confirmed',
    type: 'festival',
    notes: 'Main stage performance, sound check at 5 PM',
    contactPerson: 'Sarah Johnson',
    contactEmail: 'sarah@musicfest.com',
    contractSigned: true
  },
  {
    id: '2',
    artistName: 'DJ Nexus',
    eventTitle: 'Corporate Launch Party',
    venue: 'Tech Hub Downtown',
    location: 'San Francisco, CA',
    date: '2024-08-22',
    time: '20:00',
    duration: 120,
    fee: 8500,
    capacity: 300,
    status: 'pending',
    type: 'corporate',
    notes: 'Product launch event, DJ set with visuals',
    contactPerson: 'Mike Rodriguez',
    contactEmail: 'mike@techub.com',
    contractSigned: false
  },
  {
    id: '3',
    artistName: 'Sarah Williams',
    eventTitle: 'Acoustic Session Recording',
    venue: 'Abbey Road Studios',
    location: 'London, UK',
    date: '2024-09-05',
    time: '14:00',
    duration: 240,
    fee: 5000,
    capacity: 50,
    status: 'confirmed',
    type: 'recording',
    notes: 'Live recording session for upcoming album',
    contactPerson: 'James Mitchell',
    contactEmail: 'james@abbeyroad.co.uk',
    contractSigned: true
  }
];

export default function BookingCalendar() {
  const [bookings, setBookings] = useState<BookingEvent[]>(mockBookings);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingEvent | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-red-600';
      case 'pending': return 'bg-yellow-600';
      case 'cancelled': return 'bg-red-600';
      case 'completed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concert': return '🎤';
      case 'festival': return '🎪';
      case 'private': return '🏠';
      case 'corporate': return '🏢';
      case 'recording': return '🎵';
      default: return '📅';
    }
  };

  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate >= today;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, booking) => sum + booking.fee, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Booking Calendar</h1>
          <p className="text-muted-foreground mt-2">Manage artist bookings and schedule</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              Calendar
            </Button>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Booking</DialogTitle>
                <DialogDescription>
                  Create a new booking event for an artist
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="artist">Artist</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select artist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maya">Maya Chen</SelectItem>
                      <SelectItem value="nexus">DJ Nexus</SelectItem>
                      <SelectItem value="sarah">Sarah Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input id="event-title" placeholder="Enter event name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input id="venue" placeholder="Venue name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State/Country" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" placeholder="90" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee">Performance Fee</Label>
                  <Input id="fee" type="number" placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Venue Capacity</Label>
                  <Input id="capacity" type="number" placeholder="500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concert">Concert</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="private">Private Event</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="recording">Recording Session</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input id="contact-person" placeholder="Event organizer name" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" placeholder="organizer@email.com" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional details, requirements, etc." />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  Create Booking
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Next 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Confirmed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Contracts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(b => !b.contractSigned).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need signatures
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(b => {
                const bookingDate = new Date(b.date);
                const now = new Date();
                return bookingDate.getMonth() === now.getMonth() && 
                       bookingDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Events scheduled
            </p>
          </CardContent>
        </Card>
      </div>

      {viewMode === 'list' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          
          {upcomingBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getTypeIcon(booking.type)}</span>
                      <div>
                        <h3 className="text-xl font-semibold">{booking.eventTitle}</h3>
                        <p className="text-muted-foreground">{booking.artistName}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{booking.venue}</p>
                          <p className="text-sm text-muted-foreground">{booking.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">{booking.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">${booking.fee.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{booking.duration} minutes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{booking.capacity} capacity</p>
                          <p className="text-sm text-muted-foreground">{booking.type}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-1">Contact</p>
                      <p className="text-sm">{booking.contactPerson} - {booking.contactEmail}</p>
                    </div>

                    {booking.notes && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm">{booking.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    
                    {!booking.contractSigned && (
                      <Badge variant="outline" className="border-yellow-500 text-white">
                        Contract Pending
                      </Badge>
                    )}
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {upcomingBookings.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming bookings scheduled</p>
                <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setIsCreateModalOpen(true)}>
                  Schedule First Booking
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {viewMode === 'calendar' && (
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Visual calendar representation of all bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Calendar view coming soon</p>
              <p className="text-sm text-muted-foreground mt-2">
                This will show a visual calendar with all bookings plotted by date
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}