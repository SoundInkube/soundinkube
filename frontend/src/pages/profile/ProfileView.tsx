import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SocialMediaDisplay } from '@/components/profile/SocialMediaDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Globe, 
  Phone, 
  Star, 
  Calendar,
  Edit,
  MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  phone?: string;
  website?: string;
  city?: string;
  state?: string;
  specialties?: string[];
  yearsExperience?: number;
  hourlyRate?: number;
  averageRating?: number;
  totalReviews?: number;
  spotifyUrl?: string;
  youtubeUrl?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  facebookUrl?: string;
  user?: {
    email: string;
    role: string;
    createdAt: string;
  };
}

export default function ProfileView() {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !userId || userId === user?.id;

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const endpoint = isOwnProfile 
        ? '/api/users/profile' 
        : `/api/users/profile/${userId}`;
        
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">Profile not found</h1>
          <p className="text-gray-600 mt-2">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const displayName = profile.displayName || `${profile.firstName} ${profile.lastName}`.trim() || 'Anonymous User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="h-24 w-24 mx-auto sm:mx-0">
                <AvatarImage src={profile.avatar} alt={displayName} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{displayName}</h1>
                    {profile.user?.role === 'MUSIC_PROFESSIONAL' && (
                      <Badge variant="secondary" className="mt-1">
                        Music Professional
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 justify-center sm:justify-start">
                    {isOwnProfile ? (
                      <Button onClick={() => navigate('/profile/edit')}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <Button variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    )}
                  </div>
                </div>

                {profile.bio && (
                  <p className="text-gray-700 mb-4">{profile.bio}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {profile.city && profile.state && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.city}, {profile.state}
                    </div>
                  )}

                  {profile.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}

                  {profile.phone && isOwnProfile && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {profile.phone}
                    </div>
                  )}

                  {profile.user?.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {new Date(profile.user.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Details */}
        {profile.user?.role === 'MUSIC_PROFESSIONAL' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Specialties & Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specialties && profile.specialties.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {profile.yearsExperience && (
                  <div>
                    <h4 className="font-medium mb-1">Experience</h4>
                    <p className="text-gray-600">{profile.yearsExperience} years</p>
                  </div>
                )}

                {profile.hourlyRate && (
                  <div>
                    <h4 className="font-medium mb-1">Hourly Rate</h4>
                    <p className="text-gray-600">${profile.hourlyRate}/hour</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews & Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">
                      {profile.averageRating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    {profile.totalReviews || 0} review{profile.totalReviews !== 1 ? 's' : ''}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Social Media Profiles */}
        {profile.user?.role === 'MUSIC_PROFESSIONAL' && (
          <SocialMediaDisplay
            data={{
              spotifyUrl: profile.spotifyUrl,
              youtubeUrl: profile.youtubeUrl,
              appleMusicUrl: profile.appleMusicUrl,
              soundcloudUrl: profile.soundcloudUrl,
              facebookUrl: profile.facebookUrl,
            }}
          />
        )}
      </div>
    </div>
  );
}