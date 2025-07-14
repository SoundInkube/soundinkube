import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ListingCategory } from '@prisma/client';

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(ListingCategory)
  @IsNotEmpty()
  category: ListingCategory;

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
