import { IsOptional, IsEnum, IsString } from 'class-validator';
import { PaymentStatus } from './create-payment.dto';

export class UpdatePaymentDto {
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
