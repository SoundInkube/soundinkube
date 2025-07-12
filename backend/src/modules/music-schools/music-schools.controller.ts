import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseUUIDPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { MusicSchoolsService } from './music-schools.service';
import { CreateMusicSchoolDto } from './dto/create-music-school.dto';
import { UpdateMusicSchoolDto } from './dto/update-music-school.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@prisma/client';

@Controller('music-schools')
export class MusicSchoolsController {
  constructor(private readonly musicSchoolsService: MusicSchoolsService) {}

  // Music School Management
  @Post()
  @UseGuards(JwtAuthGuard)
  createMusicSchool(@Body() createDto: CreateMusicSchoolDto, @Req() req) {
    return this.musicSchoolsService.createMusicSchool(createDto, req.user.id);
  }

  @Get()
  findAllMusicSchools(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query() filters: any,
  ) {
    return this.musicSchoolsService.findAllMusicSchools(skip, take, filters);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findUserMusicSchools(
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.musicSchoolsService.findUserMusicSchools(req.user.id, skip, take);
  }

  @Get(':id')
  findMusicSchoolById(@Param('id', ParseUUIDPipe) id: string) {
    return this.musicSchoolsService.findMusicSchoolById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateMusicSchool(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateMusicSchoolDto,
    @Req() req,
  ) {
    return this.musicSchoolsService.updateMusicSchool(id, updateDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteMusicSchool(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.musicSchoolsService.deleteMusicSchool(id, req.user.id, req.user.role);
  }

  // Course Management
  @Post(':schoolId/courses')
  @UseGuards(JwtAuthGuard)
  createCourse(
    @Param('schoolId', ParseUUIDPipe) schoolId: string,
    @Body() createDto: CreateCourseDto,
    @Req() req,
  ) {
    return this.musicSchoolsService.createCourse(schoolId, createDto, req.user.id);
  }

  @Get('courses')
  findAllCourses(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query() filters: any,
  ) {
    return this.musicSchoolsService.findAllCourses(skip, take, filters);
  }

  @Get('courses/:id')
  findCourseById(@Param('id', ParseUUIDPipe) id: string) {
    return this.musicSchoolsService.findCourseById(id);
  }

  @Get(':schoolId/courses')
  findSchoolCourses(
    @Param('schoolId', ParseUUIDPipe) schoolId: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.musicSchoolsService.findSchoolCourses(schoolId, skip, take);
  }

  @Patch('courses/:id')
  @UseGuards(JwtAuthGuard)
  updateCourse(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCourseDto,
    @Req() req,
  ) {
    return this.musicSchoolsService.updateCourse(id, updateDto, req.user.id, req.user.role);
  }

  @Delete('courses/:id')
  @UseGuards(JwtAuthGuard)
  deleteCourse(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.musicSchoolsService.deleteCourse(id, req.user.id, req.user.role);
  }

  // Enrollment Management
  @Post('enrollments')
  @UseGuards(JwtAuthGuard)
  createEnrollment(@Body() createDto: CreateEnrollmentDto, @Req() req) {
    return this.musicSchoolsService.createEnrollment(createDto, req.user.id);
  }

  @Get('enrollments')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAllEnrollments(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.musicSchoolsService.findAllEnrollments(skip, take);
  }

  @Get('enrollments/user')
  @UseGuards(JwtAuthGuard)
  findUserEnrollments(
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.musicSchoolsService.findUserEnrollments(req.user.id, skip, take);
  }

  @Get('courses/:courseId/enrollments')
  @UseGuards(JwtAuthGuard)
  findCourseEnrollments(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.musicSchoolsService.findCourseEnrollments(
      courseId,
      req.user.id,
      req.user.role,
      skip,
      take,
    );
  }

  @Get(':schoolId/enrollments')
  @UseGuards(JwtAuthGuard)
  findSchoolEnrollments(
    @Param('schoolId', ParseUUIDPipe) schoolId: string,
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.musicSchoolsService.findSchoolEnrollments(
      schoolId,
      req.user.id,
      req.user.role,
      skip,
      take,
    );
  }

  @Patch('enrollments/:id')
  @UseGuards(JwtAuthGuard)
  updateEnrollment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateEnrollmentDto,
    @Req() req,
  ) {
    return this.musicSchoolsService.updateEnrollment(id, updateDto, req.user.id, req.user.role);
  }
}
