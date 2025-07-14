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
      <div className="text-white container mx-auto px-4 py-8">
        <div className="text-white max-w-4xl mx-auto">
          <div className="text-white animate-pulse space-y-6">
            <div className="text-white h-8 bg-netflix-dark rounded w-1/3"></div>
            <div className="text-white h-48 bg-netflix-dark rounded"></div>
            <div className="text-white h-32 bg-netflix-dark rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-white container mx-auto px-4 py-8">
        <div className="text-white max-w-4xl mx-auto text-center">
          <h1 className="text-white text-2xl font-bold text-white">Profile not found</h1>
          <p className="text-white text-white mt-2">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const displayName = profile.displayName || `${profile.firstName} ${profile.lastName}`.trim() || 'Anonymous User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="text-white container mx-auto px-4 py-8">
      <div className="text-white max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="text-white pt-6">
            <div className="text-white flex flex-col sm:flex-row gap-6">
              <Avatar className="text-white h-24 w-24 mx-auto sm:mx-0">
                <AvatarImage src={profile.avatar} alt={displayName} />
                <AvatarFallback className="text-white text-lg">{initials}</AvatarFallback>
              </Avatar>

              <div className="text-white flex-1 text-center sm:text-left">
                <div className="text-white flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-white text-3xl font-bold text-white">{displayName}</h1>
                    {profile.user?.role === 'MUSIC_PROFESSIONAL' && (
                      <Badge variant="secondary" className="text-white mt-1">
                        Music Professional
                      </Badge>
                    )}
                  </div>

                  <div className="text-white flex gap-2 justify-center sm:justify-start">
                    {isOwnProfile ? (
                      <Button onClick={() => navigate('/profile/edit')}>
                        <Edit className="text-white h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <Button variant="outline">
                        <MessageCircle className="text-white h-4 w-4 mr-2" />
                        Message
                      </Button>
                    )}
                  </div>
                </div>

                {profile.bio && (
                  <p className="text-white text-white mb-4">{profile.bio}</p>
                )}

                <div className="text-white flex flex-wrap gap-4 text-sm text-white">
                  {profile.city && profile.state && (
                    <div className="text-white flex items-center gap-1">
                      <MapPin className="text-white h-4 w-4" />
                      {profile.city}, {profile.state}
                    </div>
                  )}

                  {profile.website && (
                    <div className="text-white flex items-center gap-1">
                      <Globe className="text-white h-4 w-4" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-red-600 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}

                  {profile.phone && isOwnProfile && (
                    <div className="text-white flex items-center gap-1">
                      <Phone className="text-white h-4 w-4" />
                      {profile.phone}
                    </div>
                  )}

                  {profile.user?.createdAt && (
                    <div className="text-white flex items-center gap-1">
                      <Calendar className="text-white h-4 w-4" />
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
          <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Specialties & Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                {profile.specialties && profile.specialties.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Specialties</h4>
                    <div className="text-white flex flex-wrap gap-2">
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
                    <h4 className="text-white font-medium mb-1">Experience</h4>
                    <p className="text-white text-white">{profile.yearsExperience} years</p>
                  </div>
                )}

                {profile.hourlyRate && (
                  <div>
                    <h4 className="text-white font-medium mb-1">Hourly Rate</h4>
                    <p className="text-white text-white">${profile.hourlyRate}/hour</p>
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
                <div className="text-white flex items-center gap-4">
                  <div className="text-white flex items-center gap-1">
                    <Star className="text-white h-5 w-5 fill-yellow-400 text-netflix-red" />
                    <span className="text-white text-xl font-bold">
                      {profile.averageRating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <div className="text-white text-white">
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