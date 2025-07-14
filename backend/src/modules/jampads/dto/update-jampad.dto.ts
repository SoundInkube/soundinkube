import {
  IsString,
  IsArray,
  IsDecimal,
  IsEnum,
  IsOptional,
  IsInt,
  ValidateNested,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JamPadType } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { CreateJamPadDto } from './create-jampad.dto';

export class UpdateJamPadDto extends PartialType(CreateJamPadDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
