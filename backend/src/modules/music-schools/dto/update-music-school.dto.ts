import { IsOptional, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicSchoolDto } from './create-music-school.dto';

export class UpdateMusicSchoolDto extends PartialType(CreateMusicSchoolDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
