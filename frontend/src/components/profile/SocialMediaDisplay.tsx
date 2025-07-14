import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Youtube, Music2, Cloud, Facebook, ExternalLink } from 'lucide-react';

interface SocialMediaData {
  spotifyUrl?: string;
  youtubeUrl?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  facebookUrl?: string;
}

interface SocialMediaDisplayProps {
  data: SocialMediaData;
  showTitle?: boolean;
  compact?: boolean;
}

const platformConfig = {
  spotify: {
    name: 'Spotify',
    icon: Music,
    color: 'bg-red-600 hover:bg-red-600',
    textColor: 'text-red-600'
  },
  youtube: {
    name: 'YouTube',
    icon: Youtube,
    color: 'bg-red-500 hover:bg-red-600',
    textColor: 'text-red-600'
  },
  appleMusic: {
    name: 'Apple Music',
    icon: Music2,
    color: 'bg-netflix-dark hover:bg-netflix-dark',
    textColor: 'text-white'
  },
  soundcloud: {
    name: 'SoundCloud',
    icon: Cloud,
    color: 'bg-orange-500 hover:bg-orange-600',
    textColor: 'text-orange-600'
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-red-600 hover:bg-netflix-red',
    textColor: 'text-red-600'
  }
};

export const SocialMediaDisplay: React.FC<SocialMediaDisplayProps> = ({
  data,
  showTitle = true,
  compact = false
}) => {
  const socialLinks = Object.entries(platformConfig).filter(([key]) => {
    const url = data[`${key}Url` as keyof SocialMediaData];
    return url && url.trim();
  });

  if (socialLinks.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="text-white flex flex-wrap gap-2">
        {socialLinks.map(([key, config]) => {
          const Icon = config.icon;
          const url = data[`${key}Url` as keyof SocialMediaData]!;
          
          return (
            <Button
              key={key}
              variant="outline"
              size="sm"
              asChild
              className="text-white h-8"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white flex items-center gap-1"
              >
                <div className={`p-1 rounded ${config.color} text-white`}>
                  <Icon className="text-white h-3 w-3" />
                </div>
                <span className="text-white hidden sm:inline">{config.name}</span>
                <ExternalLink className="text-white h-3 w-3" />
              </a>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <Card>
      {showTitle && (
        <CardHeader className="text-white pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Music className="text-white h-5 w-5" />
            Music Profiles
            <Badge variant="secondary">{socialLinks.length}</Badge>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={showTitle ? '' : 'pt-6'}>
        <div className="text-white grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map(([key, config]) => {
            const Icon = config.icon;
            const url = data[`${key}Url` as keyof SocialMediaData]!;
            
            return (
              <Button
                key={key}
                variant="outline"
                size="lg"
                asChild
                className="text-white h-12 justify-start"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex items-center gap-3 w-full"
                >
                  <div className={`p-2 rounded ${config.color} text-white transition-colors`}>
                    <Icon className="text-white h-4 w-4" />
                  </div>
                  <div className="text-white flex-1 text-left">
                    <div className="text-white font-medium">{config.name}</div>
                    <div className="text-white text-sm text-muted-foreground truncate">
                      {url.replace(/^https?:\/\//, '')}
                    </div>
                  </div>
                  <ExternalLink className="text-white h-4 w-4 text-muted-foreground" />
                </a>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};