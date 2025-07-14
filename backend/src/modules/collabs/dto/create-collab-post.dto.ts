import { IsNotEmpty, IsString, IsEnum, IsArray, IsOptional, IsDateString } from 'class-validator';
import { CollabType } from '@prisma/client';

export class CreateCollabPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(CollabType)
  collabType: CollabType;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsOptional()
  @IsString()
  location?: string;
}
