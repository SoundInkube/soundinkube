import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  comment: string;

  @IsOptional()
  @IsUUID()
  studioId?: string;

  @IsOptional()
  @IsUUID()
  jamPadId?: string;

  @IsOptional()
  @IsUUID()
  musicSchoolId?: string;

  @IsOptional()
  @IsUUID()
  marketplaceListingId?: string;
}
