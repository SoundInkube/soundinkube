import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const marketplaceItems = [
  {
    id: 1,
    title: 'Gibson Les Paul Studio',
    seller: 'John Martinez',
    category: 'Guitar',
    price: '$1,299',
    status: 'Active',
    datePosted: '2024-07-10',
  },
  {
    id: 2,
    title: 'Yamaha P-125 Digital Piano',
    seller: 'Sarah Johnson',
    category: 'Piano',
    price: '$649',
    status: 'Pending',
    datePosted: '2024-07-09',
  },
  {
    id: 3,
    title: 'Shure SM58 Microphone',
    seller: 'Mike Chen',
    category: 'Audio Equipment',
    price: '$99',
    status: 'Active',
    datePosted: '2024-07-08',
  },
];

const professionals = [
  {
    id: 1,
    name: 'John Martinez',
    profession: 'Guitar Instructor',
    rating: 4.9,
    bookings: 45,
    status: 'Active',
    joinDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Emma Wilson',
    profession: 'Vocalist',
    rating: 4.8,
    bookings: 32,
    status: 'Active',
    joinDate: '2024-03-05',
  },
  {
    id: 3,
    name: 'Alex Rodriguez',
    profession: 'Music Producer',
    rating: 4.7,
    bookings: 28,
    status: 'Inactive',
    joinDate: '2024-02-18',
  },
];

const bookings = [
  {
    id: 1,
    client: 'Sarah Johnson',
    professional: 'John Martinez',
    service: 'Guitar Lessons',
    date: '2024-07-15',
    status: 'Confirmed',
    amount: '$120',
  },
  {
    id: 2,
    client: 'Mike Brown',
    professional: 'Emma Wilson',
    service: 'Vocal Coaching',
    date: '2024-07-16',
    status: 'Pending',
    amount: '$80',
  },
  {
    id: 3,
    client: 'Lisa Chen',
    professional: 'Alex Rodriguez',
    service: 'Music Production',
    date: '2024-07-12',
    status: 'Completed',
    amount: '$300',
  },
];

export default function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Confirmed':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Inactive':
        return 'destructive';
      case 'Completed':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">
          Manage marketplace items, professional profiles, and bookings
        </p>
      </div>

      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Marketplace Items</TabsTrigger>
          <TabsTrigger value="professionals">Professionals</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Marketplace Items</CardTitle>
                  <CardDescription>
                    Manage all equipment and items listed on the marketplace
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search items..."
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Posted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketplaceItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.seller}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.datePosted}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="professionals">
          <Card>
            <CardHeader>
              <CardTitle>Music Professionals</CardTitle>
              <CardDescription>
                Manage professional profiles and their service offerings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search professionals..."
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Profession</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {professionals.map((professional) => (
                    <TableRow key={professional.id}>
                      <TableCell className="font-medium">{professional.name}</TableCell>
                      <TableCell>{professional.profession}</TableCell>
                      <TableCell>⭐ {professional.rating}</TableCell>
                      <TableCell>{professional.bookings}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(professional.status)}>
                          {professional.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{professional.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
              <CardDescription>
                Track and manage all platform bookings and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search bookings..."
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Professional</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.client}</TableCell>
                      <TableCell>{booking.professional}</TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
}