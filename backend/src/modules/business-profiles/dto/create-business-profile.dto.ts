import { IsString, IsOptional, IsArray, IsEnum, IsEmail, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessStatus } from '@prisma/client';

export class CreateBusinessProfileDto {
  @IsString()
  businessName: string;

  @IsString()
  businessType: string; // 'jampad' or 'music_school'

  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @IsUrl()
  coverImage?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  socialLinks?: any;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsString()
  country: string;

  @IsString()
  zipCode: string;

  @IsOptional()
  businessHours?: any;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsEnum(BusinessStatus)
  status?: BusinessStatus;
}

export class CreateJampadDetailsDto {
  @IsString()
  capacity: number;

  @IsString()
  hourlyRate: number;

  @IsOptional()
  equipmentList?: any;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roomTypes?: string[];

  @IsOptional()
  bookingRules?: any;

  @IsOptional()
  @IsString()
  cancellationPolicy?: string;
}

export class CreateSchoolDetailsDto {
  @IsString()
  schoolType: string;

  @IsOptional()
  faculty?: any;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  facilities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  accreditations?: string[];

  @IsOptional()
  admissionRequirements?: any;

  @IsOptional()
  applicationDeadlines?: any;
}