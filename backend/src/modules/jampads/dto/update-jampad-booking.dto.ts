import { IsEnum, IsOptional } from 'class-validator';

export enum JamPadBookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export class UpdateJamPadBookingDto {
  @IsOptional()
  @IsEnum(JamPadBookingStatus)
  status?: JamPadBookingStatus;
}
