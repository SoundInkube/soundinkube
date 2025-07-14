import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  Star, 
  Users, 
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface BusinessProfile {
  id: string;
  businessName: string;
  businessType: string;
  description: string;
  phone?: string;
  email?: string;
  website?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zipCode: string;
  amenities: string[];
  averageRating: number;
  totalReviews: number;
  status: string;
  jampadDetails?: any;
  schoolDetails?: any;
}

interface BusinessStats {
  totalReviews: number;
  averageRating: number;
  totalBookings?: number;
  totalRevenue?: number;
  totalApplications?: number;
  enrolledStudents?: number;
}

export default function BusinessDashboard() {
  const { user } = useAuth();
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [businessStats, setBusinessStats] = useState<BusinessStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBusinessProfile();
  }, []);

  const fetchBusinessProfile = async () => {
    try {
      const response = await fetch('/api/business-profiles/my-profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const profile = await response.json();
        setBusinessProfile(profile);
        
        if (profile) {
          fetchBusinessStats(profile.id);
        }
      } else if (response.status === 404) {
        // No business profile found
        setBusinessProfile(null);
      }
    } catch (error) {
      toast.error('Failed to fetch business profile');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBusinessStats = async (profileId: string) => {
    try {
      const response = await fetch(`/api/business-profiles/${profileId}/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const stats = await response.json();
        setBusinessStats(stats);
      }
    } catch (error) {
      console.error('Failed to fetch business stats:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!businessProfile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>No Business Profile Found</CardTitle>
            <CardDescription>
              You haven't set up your business profile yet. Create one to start managing your business on SoundInkube.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/business/setup'}>
              Create Business Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">{businessProfile.averageRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-blue-400" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold">{businessProfile.totalReviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {businessProfile.businessType === 'jampad' && businessStats && (
          <>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-green-400" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold">{businessStats.totalBookings || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-purple-400" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">${businessStats.totalRevenue || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {businessProfile.businessType === 'music_school' && businessStats && (
          <>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-green-400" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-muted-foreground">Applications</p>
                    <p className="text-2xl font-bold">{businessStats.totalApplications || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-muted-foreground">Enrolled Students</p>
                    <p className="text-2xl font-bold">{businessStats.enrolledStudents || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Business Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {businessProfile.businessName}
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="mt-1">
                  {businessProfile.businessType === 'jampad' ? 'Jam Pad' : 'Music School'}
                </Badge>
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">{businessProfile.description}</p>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{businessProfile.address}, {businessProfile.city}, {businessProfile.state} {businessProfile.zipCode}</span>
                </div>
                
                {businessProfile.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{businessProfile.phone}</span>
                  </div>
                )}
                
                {businessProfile.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{businessProfile.email}</span>
                  </div>
                )}
                
                {businessProfile.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={businessProfile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {businessProfile.website}
                    </a>
                  </div>
                )}
              </div>
              
              {businessProfile.amenities.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-1">
                    {businessProfile.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Manage your upcoming and recent bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No bookings found</p>
            <p className="text-sm">Bookings will appear here once customers start booking your services</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Business Analytics
          </CardTitle>
          <CardDescription>Track your business performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Analytics Coming Soon</p>
            <p className="text-sm">Detailed analytics and insights will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Business Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your business profile, bookings, and track performance
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">
            {businessProfile.businessType === 'jampad' ? 'Bookings' : 'Applications'}
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="bookings">
          {renderBookings()}
        </TabsContent>

        <TabsContent value="analytics">
          {renderAnalytics()}
        </TabsContent>
      </Tabs>
    </div>
  );
}