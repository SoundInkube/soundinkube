import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessProfileDto, CreateJampadDetailsDto, CreateSchoolDetailsDto } from './create-business-profile.dto';

export class UpdateBusinessProfileDto extends PartialType(CreateBusinessProfileDto) {}

export class UpdateJampadDetailsDto extends PartialType(CreateJampadDetailsDto) {}

export class UpdateSchoolDetailsDto extends PartialType(CreateSchoolDetailsDto) {}