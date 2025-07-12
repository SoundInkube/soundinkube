import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum CollabRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export class UpdateCollabRequestDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsEnum(CollabRequestStatus)
  status?: CollabRequestStatus;
}
