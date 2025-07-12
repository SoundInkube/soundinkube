import { IsNotEmpty, IsString, IsEnum, IsUUID, IsNumber, IsOptional } from 'class-validator';

export enum PaymentType {
  STUDIO_BOOKING = 'STUDIO_BOOKING',
  JAMPAD_BOOKING = 'JAMPAD_BOOKING',
  COURSE_ENROLLMENT = 'COURSE_ENROLLMENT',
  MARKETPLACE_PURCHASE = 'MARKETPLACE_PURCHASE',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
  WALLET = 'WALLET',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsEnum(PaymentType)
  type: PaymentType;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsUUID()
  studioBookingId?: string;

  @IsOptional()
  @IsUUID()
  jamPadBookingId?: string;

  @IsOptional()
  @IsUUID()
  enrollmentId?: string;

  @IsOptional()
  @IsUUID()
  marketplaceOrderId?: string;

  @IsOptional()
  @IsString()
  stripeToken?: string;

  @IsOptional()
  @IsString()
  paypalPaymentId?: string;
}
