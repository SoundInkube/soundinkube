import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDecimal,
  IsEnum,
  IsOptional,
  IsInt,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JamPadType } from '@prisma/client';

class AvailabilityDto {
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

export class CreateJamPadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(JamPadType)
  type: JamPadType;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsDecimal()
  hourlyRate: number;

  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsInt()
  capacity: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => AvailabilityDto)
  availability: AvailabilityDto;
}
