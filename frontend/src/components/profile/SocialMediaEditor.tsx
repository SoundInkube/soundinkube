import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Music, Youtube, Music2, Cloud, Facebook } from 'lucide-react';

interface SocialMediaData {
  spotifyUrl?: string;
  youtubeUrl?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  facebookUrl?: string;
}

interface SocialMediaEditorProps {
  initialData?: SocialMediaData;
  onSave: (data: SocialMediaData) => Promise<void>;
  isLoading?: boolean;
}

const platformConfig = {
  spotify: {
    name: 'Spotify',
    icon: Music,
    color: 'bg-green-500',
    placeholder: 'https://open.spotify.com/artist/your-artist-id',
    example: 'https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb',
    description: 'Your Spotify artist or user profile'
  },
  youtube: {
    name: 'YouTube',
    icon: Youtube,
    color: 'bg-red-500',
    placeholder: 'https://youtube.com/@yourchannel or https://youtube.com/c/yourchannel',
    example: 'https://youtube.com/@johnsmith',
    description: 'Your YouTube channel'
  },
  appleMusic: {
    name: 'Apple Music',
    icon: Music2,
    color: 'bg-gray-800',
    placeholder: 'https://music.apple.com/artist/your-name/id',
    example: 'https://music.apple.com/us/artist/john-smith/123456789',
    description: 'Your Apple Music artist profile'
  },
  soundcloud: {
    name: 'SoundCloud',
    icon: Cloud,
    color: 'bg-orange-500',
    placeholder: 'https://soundcloud.com/your-username',
    example: 'https://soundcloud.com/john-smith-music',
    description: 'Your SoundCloud profile'
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    placeholder: 'https://facebook.com/your-page-or-profile',
    example: 'https://facebook.com/johnsmithmusic',
    description: 'Your Facebook page or profile'
  }
};

export const SocialMediaEditor: React.FC<SocialMediaEditorProps> = ({
  initialData = {},
  onSave,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<SocialMediaData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showHelp, setShowHelp] = useState<Record<string, boolean>>({});

  const validateUrl = (platform: string, url: string): string | null => {
    if (!url.trim()) return null;

    const config = platformConfig[platform as keyof typeof platformConfig];
    if (!config) return null;

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return 'Please enter a valid URL';
    }

    // Platform-specific validation
    switch (platform) {
      case 'spotify':
        if (!url.includes('open.spotify.com')) {
          return 'Please enter a valid Spotify URL (open.spotify.com)';
        }
        break;
      case 'youtube':
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
          return 'Please enter a valid YouTube URL';
        }
        break;
      case 'appleMusic':
        if (!url.includes('music.apple.com')) {
          return 'Please enter a valid Apple Music URL';
        }
        break;
      case 'soundcloud':
        if (!url.includes('soundcloud.com')) {
          return 'Please enter a valid SoundCloud URL';
        }
        break;
      case 'facebook':
        if (!url.includes('facebook.com')) {
          return 'Please enter a valid Facebook URL';
        }
        break;
    }

    return null;
  };

  const handleInputChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${platform}Url`]: value
    }));

    // Clear error when user starts typing
    if (errors[platform]) {
      setErrors(prev => ({
        ...prev,
        [platform]: ''
      }));
    }
  };

  const handleBlur = (platform: string, value: string) => {
    const error = validateUrl(platform, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [platform]: error
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all URLs
    const newErrors: Record<string, string> = {};
    Object.keys(platformConfig).forEach(platform => {
      const url = formData[`${platform}Url` as keyof SocialMediaData];
      if (url) {
        const error = validateUrl(platform, url);
        if (error) {
          newErrors[platform] = error;
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the validation errors before saving');
      return;
    }

    try {
      await onSave(formData);
      toast.success('Social media profiles updated successfully!');
    } catch (error) {
      toast.error('Failed to update social media profiles');
    }
  };

  const toggleHelp = (platform: string) => {
    setShowHelp(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Social Media Profiles
        </CardTitle>
        <CardDescription>
          Add links to your music profiles to showcase your work and connect with fans
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(platformConfig).map(([key, config]) => {
            const Icon = config.icon;
            const fieldKey = `${key}Url` as keyof SocialMediaData;
            const value = formData[fieldKey] || '';
            const error = errors[key];
            const helpVisible = showHelp[key];

            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={key} className="flex items-center gap-2">
                    <div className={`p-1 rounded ${config.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {config.name}
                    {value && (
                      <Badge variant="secondary" className="ml-2">
                        Connected
                      </Badge>
                    )}
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleHelp(key)}
                  >
                    {helpVisible ? 'Hide Help' : 'Need Help?'}
                  </Button>
                </div>
                
                {helpVisible && (
                  <div className="bg-muted p-3 rounded-md text-sm space-y-2">
                    <p>{config.description}</p>
                    <p><strong>Example:</strong> {config.example}</p>
                    <p><strong>How to find your URL:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      {key === 'spotify' && (
                        <>
                          <li>Go to your Spotify artist profile</li>
                          <li>Click the "..." menu and select "Share" → "Copy link to artist"</li>
                        </>
                      )}
                      {key === 'youtube' && (
                        <>
                          <li>Go to your YouTube channel</li>
                          <li>Copy the URL from your browser's address bar</li>
                        </>
                      )}
                      {key === 'appleMusic' && (
                        <>
                          <li>Search for your artist profile on music.apple.com</li>
                          <li>Copy the URL from your browser's address bar</li>
                        </>
                      )}
                      {key === 'soundcloud' && (
                        <>
                          <li>Go to your SoundCloud profile</li>
                          <li>Copy the URL from your browser's address bar</li>
                        </>
                      )}
                      {key === 'facebook' && (
                        <>
                          <li>Go to your Facebook page or profile</li>
                          <li>Copy the URL from your browser's address bar</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}

                <Input
                  id={key}
                  type="url"
                  placeholder={config.placeholder}
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  onBlur={(e) => handleBlur(key, e.target.value)}
                  className={error ? 'border-red-500' : ''}
                />
                
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>
            );
          })}

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Social Media Profiles'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};