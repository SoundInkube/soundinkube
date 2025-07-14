import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateSocialMediaDto {
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Please enter a valid Spotify URL' })
  spotifyUrl?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Please enter a valid YouTube URL' })
  youtubeUrl?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Please enter a valid Apple Music URL' })
  appleMusicUrl?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Please enter a valid SoundCloud URL' })
  soundcloudUrl?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Please enter a valid Facebook URL' })
  facebookUrl?: string;
}