import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { SocialMediaEditor } from '@/components/profile/SocialMediaEditor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  phone?: string;
  website?: string;
  specialties?: string[];
  yearsExperience?: number;
  hourlyRate?: number;
  spotifyUrl?: string;
  youtubeUrl?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  facebookUrl?: string;
}

export default function ProfileEdit() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/users/profile', {
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

  const handleSaveProfile = async (profileData: Record<string, string>) => {
    setSaving(true);
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocialMedia = async (socialMediaData: Record<string, string>) => {
    const response = await fetch('/api/users/profile/social-media', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(socialMediaData),
    });

    if (!response.ok) {
      throw new Error('Failed to update social media profiles');
    }

    // Update the profile data with new social media links
    setProfile(prev => prev ? { ...prev, ...socialMediaData } : null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
        </div>

        {/* Basic Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Update your basic profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const profileData = {
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                displayName: formData.get('displayName') as string,
                bio: formData.get('bio') as string,
                phone: formData.get('phone') as string,
                website: formData.get('website') as string,
              };
              handleSaveProfile(profileData);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    defaultValue={profile?.firstName || ''}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    defaultValue={profile?.lastName || ''}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  defaultValue={profile?.displayName || ''}
                  placeholder="How you want to be known publicly"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  defaultValue={profile?.bio || ''}
                  placeholder="Tell us about yourself and your music..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={profile?.phone || ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    defaultValue={profile?.website || ''}
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Basic Info'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Social Media Profiles Editor - Show for music professionals */}
        {user?.role === 'MUSIC_PROFESSIONAL' && (
          <SocialMediaEditor
            initialData={{
              spotifyUrl: profile?.spotifyUrl,
              youtubeUrl: profile?.youtubeUrl,
              appleMusicUrl: profile?.appleMusicUrl,
              soundcloudUrl: profile?.soundcloudUrl,
              facebookUrl: profile?.facebookUrl,
            }}
            onSave={handleSaveSocialMedia}
            isLoading={saving}
          />
        )}
      </div>
    </div>
  );
}