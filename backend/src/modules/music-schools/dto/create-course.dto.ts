import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  IsDecimal,
  IsArray,
  IsDate,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  ALL_LEVELS = 'ALL_LEVELS',
}

export enum CourseFormat {
  IN_PERSON = 'IN_PERSON',
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID',
}

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsNotEmpty()
  @IsEnum(CourseFormat)
  format: CourseFormat;

  @IsNotEmpty()
  @IsUUID()
  musicSchoolId: string;

  @IsOptional()
  @IsString()
  instructor?: string;

  @IsNotEmpty()
  @IsInt()
  durationWeeks: number;

  @IsNotEmpty()
  @IsInt()
  lessonsPerWeek: number;

  @IsNotEmpty()
  @IsInt()
  lessonDurationMinutes: number;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsOptional()
  @IsDecimal()
  discountedPrice?: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  syllabus: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  prerequisites?: string[];

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @IsOptional()
  @IsInt()
  maxStudents?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  schedule?: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
