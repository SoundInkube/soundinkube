import { IsNotEmpty, IsString, IsUUID, IsDateString, IsDecimal } from 'class-validator';

export class CreateJamPadBookingDto {
  @IsNotEmpty()
  @IsUUID()
  jampadId: string;

  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @IsNotEmpty()
  @IsDecimal()
  totalPrice: number;
}
