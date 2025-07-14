import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDecimal,
  IsOptional,
  IsObject,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum MusicSchoolType {
  PHYSICAL = 'PHYSICAL',
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID',
}

class BusinessHoursDto {
  @IsOptional()
  @IsArray()
  mondayHours?: string[];

  @IsOptional()
  @IsArray()
  tuesdayHours?: string[];

  @IsOptional()
  @IsArray()
  wednesdayHours?: string[];

  @IsOptional()
  @IsArray()
  thursdayHours?: string[];

  @IsOptional()
  @IsArray()
  fridayHours?: string[];

  @IsOptional()
  @IsArray()
  saturdayHours?: string[];

  @IsOptional()
  @IsArray()
  sundayHours?: string[];
}

export class CreateMusicSchoolDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(MusicSchoolType)
  type: MusicSchoolType;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  instruments: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  businessHours: BusinessHoursDto;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
