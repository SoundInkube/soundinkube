import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { BookingStatus } from '@prisma/client';

export class UpdateBookingDto {
  @IsDateString()
  @IsOptional()
  startTime?: string;

  @IsDateString()
  @IsOptional()
  endTime?: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;

  @IsNumber()
  @IsOptional()
  totalPrice?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
