import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  Users, 
  UserPlus, 
  Send, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Music,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

interface ManagedArtist {
  id: string;
  artistId: string;
  contractStart?: string;
  contractEnd?: string;
  commissionRate?: number;
  createdAt: string;
  artist: {
    id: string;
    email: string;
    profile: {
      firstName: string;
      lastName: string;
      bio?: string;
      avatar?: string;
      location?: string;
      specialties?: string[];
    };
  };
}

interface ManagementStats {
  totalArtists: number;
  activeContracts: number;
  artistBookings: number;
}

export default function ArtistManager() {
  const { user } = useAuth();
  const [managedArtists, setManagedArtists] = useState<ManagedArtist[]>([]);
  const [managementStats, setManagementStats] = useState<ManagementStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    artistId: '',
    message: '',
    proposedCommissionRate: 15,
  });

  useEffect(() => {
    if (user?.role === 'ARTIST_MANAGER') {
      fetchManagedArtists();
      fetchManagementStats();
    }
  }, [user]);

  const fetchManagedArtists = async () => {
    try {
      const response = await fetch('/api/artist-management/my-artists', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const artists = await response.json();
        setManagedArtists(artists);
      }
    } catch (error) {
      toast.error('Failed to fetch managed artists');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchManagementStats = async () => {
    try {
      const response = await fetch('/api/artist-management/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const stats = await response.json();
        setManagementStats(stats);
      }
    } catch (error) {
      console.error('Failed to fetch management stats:', error);
    }
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/artist-management/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestForm),
      });

      if (response.ok) {
        toast.success('Management request sent successfully');
        setIsRequestDialogOpen(false);
        setRequestForm({ artistId: '', message: '', proposedCommissionRate: 15 });
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to send request');
      }
    } catch (error) {
      toast.error('Network error occurred');
    }
  };

  if (user?.role !== 'ARTIST_MANAGER') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              This page is only accessible to Artist Managers.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      {managementStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-400" />
                <div className="ml-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Artists</p>
                  <p className="text-2xl font-bold">{managementStats.totalArtists}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-green-400" />
                <div className="ml-2">
                  <p className="text-sm font-medium text-muted-foreground">Active Contracts</p>
                  <p className="text-2xl font-bold">{managementStats.activeContracts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <div className="ml-2">
                  <p className="text-sm font-medium text-muted-foreground">Artist Bookings</p>
                  <p className="text-2xl font-bold">{managementStats.artistBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your artist roster and grow your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Send Management Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Management Request</DialogTitle>
                  <DialogDescription>
                    Send a management request to an artist you'd like to work with
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSendRequest} className="space-y-4">
                  <div>
                    <Label htmlFor="artistId">Artist ID or Email</Label>
                    <Input
                      id="artistId"
                      value={requestForm.artistId}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, artistId: e.target.value }))}
                      placeholder="Enter artist ID or email"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={requestForm.message}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Introduce yourself and explain why you'd like to manage this artist..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="commission">Proposed Commission Rate (%)</Label>
                    <Input
                      id="commission"
                      type="number"
                      min="0"
                      max="100"
                      value={requestForm.proposedCommissionRate}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, proposedCommissionRate: parseInt(e.target.value) }))}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Send Request
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMyArtists = () => (
    <div className="space-y-6">
      {managedArtists.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Artists Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start building your artist roster by sending management requests
            </p>
            <Button onClick={() => setIsRequestDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Find Artists
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {managedArtists.map((managedArtist) => (
            <Card key={managedArtist.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={managedArtist.artist.profile.avatar} />
                    <AvatarFallback>
                      {managedArtist.artist.profile.firstName[0]}
                      {managedArtist.artist.profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {managedArtist.artist.profile.firstName} {managedArtist.artist.profile.lastName}
                    </h3>
                    
                    {managedArtist.artist.profile.specialties && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {managedArtist.artist.profile.specialties.slice(0, 3).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                      {managedArtist.artist.profile.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{managedArtist.artist.profile.location}</span>
                        </div>
                      )}
                      
                      {managedArtist.commissionRate && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>{managedArtist.commissionRate}% commission</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Since {new Date(managedArtist.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        Manage Contract
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Artist Management</h1>
        <p className="text-muted-foreground">
          Manage your artist roster and grow your talent management business
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="artists">My Artists ({managedArtists.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="artists">
          {renderMyArtists()}
        </TabsContent>
      </Tabs>
    </div>
  );
}