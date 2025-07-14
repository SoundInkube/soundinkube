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
        return <Badge className="text-white netflix-badge-success">{status}</Badge>;
      case 'On Tour':
        return <Badge className="text-white netflix-badge-warning">{status}</Badge>;
      case 'Inactive':
        return <Badge className="text-white netflix-badge-error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

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
            Artist Roster
          </h1>
          <p className="text-white text-white text-lg">
            Manage your talented artists and track their performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="text-white grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Total Artists</CardTitle>
              <Music className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">{artists.length}</div>
              <p className="text-white text-xs text-white">
                {artists.filter(a => a.status === 'Active').length} active
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">On Tour</CardTitle>
              <Calendar className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">
                {artists.filter(a => a.status === 'On Tour').length}
              </div>
              <p className="text-white text-xs text-white">
                Currently performing
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Monthly Revenue</CardTitle>
              <DollarSign className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">
                ${artists.reduce((sum, artist) => sum + artist.monthlyRevenue, 0).toLocaleString()}
              </div>
              <p className="text-white text-xs text-netflix-red">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card">
            <CardHeader className="text-white flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium text-white">Avg Rating</CardTitle>
              <Award className="text-white h-4 w-4 text-netflix-red" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold text-white">
                {(artists.reduce((sum, artist) => sum + artist.rating, 0) / artists.length).toFixed(1)}
              </div>
              <p className="text-white text-xs text-white">
                Across all artists
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="text-white flex flex-col sm:flex-row gap-4 mb-6">
          <div className="text-white flex-1">
            <div className="text-white relative">
              <Search className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              <Input
                placeholder="Search artists by name or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-white pl-10 netflix-input"
              />
            </div>
          </div>
          <Button className="text-white netflix-button-primary">
            <Plus className="text-white h-4 w-4 mr-2" />
            Add Artist
          </Button>
        </div>

        {/* Artists Table */}
        <Card className="text-white netflix-card">
          <CardHeader>
            <CardTitle className="text-white text-white">Artist Portfolio</CardTitle>
            <CardDescription className="text-white text-white">
              Complete overview of your managed artists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-white border-gray-700">
                  <TableHead className="text-white text-white">Artist</TableHead>
                  <TableHead className="text-white text-white">Genre</TableHead>
                  <TableHead className="text-white text-white">Status</TableHead>
                  <TableHead className="text-white text-white">Monthly Revenue</TableHead>
                  <TableHead className="text-white text-white">Shows</TableHead>
                  <TableHead className="text-white text-white">Rating</TableHead>
                  <TableHead className="text-white text-white">Contract Ends</TableHead>
                  <TableHead className="text-white text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArtists.map((artist) => (
                  <TableRow key={artist.id} className="text-white border-gray-700 hover:bg-netflix-dark/50">
                    <TableCell className="text-white font-medium">
                      <div className="text-white flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="text-white bg-netflix-red text-white">
                            {artist.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white text-white font-medium">{artist.name}</div>
                          <div className="text-white text-xs text-white">
                            Joined {new Date(artist.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white text-white">{artist.genre}</TableCell>
                    <TableCell>{getStatusBadge(artist.status)}</TableCell>
                    <TableCell className="text-white text-netflix-red font-medium">
                      ${artist.monthlyRevenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-white text-white">{artist.totalShows}</TableCell>
                    <TableCell className="text-white text-white">
                      <div className="text-white flex items-center space-x-1">
                        <Award className="text-white h-4 w-4 text-netflix-red" />
                        <span>{artist.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white text-white">
                      {new Date(artist.contractEnd).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="text-white flex space-x-2">
                        <Button size="sm" variant="outline" className="text-white netflix-button-secondary">
                          <Eye className="text-white h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-white netflix-button-secondary">
                          <Edit className="text-white h-4 w-4" />
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