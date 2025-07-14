import { IsString, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ListingCategory } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { CreateListingDto } from './create-listing.dto';

export class UpdateListingDto extends PartialType(CreateListingDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsEnum(ListingCategory)
  @IsOptional()
  category?: ListingCategory;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsOptional()
  audioSample?: string;
}
