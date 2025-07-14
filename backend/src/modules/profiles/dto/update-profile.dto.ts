import { IsString, IsUrl, IsOptional, IsEnum, IsArray } from 'class-validator';
import { MusicGenre } from '@prisma/client';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(MusicGenre, { each: true })
  @IsArray()
  @IsOptional()
  genres?: MusicGenre[];

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  socialLinks?: string[];

  @IsString()
  @IsOptional()
  equipment?: string;

  @IsString()
  @IsOptional()
  services?: string;
}
