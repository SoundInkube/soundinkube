import { IsString, IsNumber, IsArray, IsOptional, IsNotEmpty, Min } from 'class-validator';

export class CreateStudioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  hourlyRate: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  equipment?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @IsString()
  @IsOptional()
  rules?: string;
}
