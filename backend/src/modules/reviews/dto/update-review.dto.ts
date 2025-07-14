import { IsOptional, IsNumber, IsString, Min, Max, MinLength, MaxLength } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  comment?: string;
}
