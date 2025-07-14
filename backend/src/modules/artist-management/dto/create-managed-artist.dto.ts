import { IsString, IsOptional, IsNumber, IsDateString, Min, Max } from 'class-validator';

export class CreateManagedArtistDto {
  @IsString()
  artistId: string;

  @IsOptional()
  @IsDateString()
  contractStart?: string;

  @IsOptional()
  @IsDateString()
  contractEnd?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  commissionRate?: number;

  @IsOptional()
  permissions?: any; // What the manager can do on behalf of the artist
}

export class ManagementRequestDto {
  @IsString()
  artistId: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  proposedCommissionRate?: number;

  @IsOptional()
  proposedPermissions?: any;
}