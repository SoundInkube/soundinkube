import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, Edit, Eye, Music, Award, Calendar, DollarSign } from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  genre: string;
  status: 'Active' | 'Inactive' | 'On Tour';
  monthlyRevenue: number;
  contractEnd: string;
  totalShows: number;
  rating: number;
  joinDate: string;
}

export default function ArtistRoster() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock artist data
    const mockArtists: Artist[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        genre: 'Pop/R&B',
        status: 'Active',
        monthlyRevenue: 15200,
        contractEnd: '2025-01-15',
        totalShows: 47,
        rating: 4.9,
        joinDate: '2024-01-15',
      },
      {
        id: '2',
        name: 'Mike Davis',
        genre: 'Jazz/Blues',
        status: 'On Tour',
        monthlyRevenue: 12800,
        contractEnd: '2026-03-01',
        totalShows: 32,
        rating: 4.7,
        joinDate: '2024-03-01',
      },
      {
        id: '3',
        name: 'Emily Chen',
        genre: 'Electronic/EDM',
        status: 'Active',
        monthlyRevenue: 8900,
        contractEnd: '2024-08-10',
        totalShows: 28,
        rating: 4.8,
        joinDate: '2023-08-10',
      },
      {
        id: '4',
        name: 'Alex Rodriguez',
        genre: 'Rock/Alternative',
        status: 'Active',
        monthlyRevenue: 6700,
        contractEnd: '2025-02-20',
        totalShows: 19,
        rating: 4.6,
        joinDate: '2024-02-20',
      },
      {
        id: '5',
        name: 'Maya Patel',
        genre: 'Hip-Hop/Rap',
        status: 'Inactive',
        monthlyRevenue: 0,
        contractEnd: '2024-12-15',
        totalShows: 15,
        rating: 4.5,
        joinDate: '2023-12-15',
      },
      {
        id: '6',
        name: 'David Kim',
        genre: 'Country/Folk',
        status: 'Active',
        monthlyRevenue: 5400,
        contractEnd: '2025-06-30',
        totalShows: 22,
        rating: 4.8,
        joinDate: '2024-06-30',
      },
    ];

    setTimeout(() => {
      setArtists(mockArtists);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="netflix-badge-success">{status}</Badge>;
      case 'On Tour':
        return <Badge className="netflix-badge-warning">{status}</Badge>;
      case 'Inactive':
        return <Badge className="netflix-badge-error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

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
            Artist Roster
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your talented artists and track their performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Artists</CardTitle>
              <Music className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{artists.length}</div>
              <p className="text-xs text-gray-400">
                {artists.filter(a => a.status === 'Active').length} active
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">On Tour</CardTitle>
              <Calendar className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {artists.filter(a => a.status === 'On Tour').length}
              </div>
              <p className="text-xs text-gray-400">
                Currently performing
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${artists.reduce((sum, artist) => sum + artist.monthlyRevenue, 0).toLocaleString()}
              </div>
              <p className="text-xs text-green-400">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="netflix-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Rating</CardTitle>
              <Award className="h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {(artists.reduce((sum, artist) => sum + artist.rating, 0) / artists.length).toFixed(1)}
              </div>
              <p className="text-xs text-gray-400">
                Across all artists
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search artists by name or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 netflix-input"
              />
            </div>
          </div>
          <Button className="netflix-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Artist
          </Button>
        </div>

        {/* Artists Table */}
        <Card className="netflix-card">
          <CardHeader>
            <CardTitle className="text-white">Artist Portfolio</CardTitle>
            <CardDescription className="text-gray-400">
              Complete overview of your managed artists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Artist</TableHead>
                  <TableHead className="text-gray-300">Genre</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Monthly Revenue</TableHead>
                  <TableHead className="text-gray-300">Shows</TableHead>
                  <TableHead className="text-gray-300">Rating</TableHead>
                  <TableHead className="text-gray-300">Contract Ends</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArtists.map((artist) => (
                  <TableRow key={artist.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-netflix-red text-white">
                            {artist.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white font-medium">{artist.name}</div>
                          <div className="text-xs text-gray-400">
                            Joined {new Date(artist.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{artist.genre}</TableCell>
                    <TableCell>{getStatusBadge(artist.status)}</TableCell>
                    <TableCell className="text-green-400 font-medium">
                      ${artist.monthlyRevenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-300">{artist.totalShows}</TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4 text-yellow-400" />
                        <span>{artist.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(artist.contractEnd).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="netflix-button-secondary">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="netflix-button-secondary">
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
      </div>
    </div>
  );
}