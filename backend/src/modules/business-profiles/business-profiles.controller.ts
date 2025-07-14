import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { BusinessProfilesService } from './business-profiles.service';
import { CreateBusinessProfileDto, CreateJampadDetailsDto, CreateSchoolDetailsDto } from './dto/create-business-profile.dto';
import { UpdateBusinessProfileDto, UpdateJampadDetailsDto, UpdateSchoolDetailsDto } from './dto/update-business-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('business-profiles')
export class BusinessProfilesController {
  constructor(private readonly businessProfilesService: BusinessProfilesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createBusinessProfileDto: CreateBusinessProfileDto) {
    return this.businessProfilesService.createBusinessProfile(req.user.userId, createBusinessProfileDto);
  }

  @Post(':id/jampad-details')
  @UseGuards(JwtAuthGuard)
  createJampadDetails(@Param('id') id: string, @Body() createJampadDetailsDto: CreateJampadDetailsDto) {
    return this.businessProfilesService.createJampadDetails(id, createJampadDetailsDto);
  }

  @Post(':id/school-details')
  @UseGuards(JwtAuthGuard)
  createSchoolDetails(@Param('id') id: string, @Body() createSchoolDetailsDto: CreateSchoolDetailsDto) {
    return this.businessProfilesService.createSchoolDetails(id, createSchoolDetailsDto);
  }

  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('city') city?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 20;
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    return this.businessProfilesService.findAll(type, city, limitNum, offsetNum);
  }

  @Get('my-profile')
  @UseGuards(JwtAuthGuard)
  findMyProfile(@Request() req) {
    return this.businessProfilesService.findByUserId(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessProfilesService.findOne(id);
  }

  @Get(':id/stats')
  @UseGuards(JwtAuthGuard)
  getBusinessStats(@Param('id') id: string, @Request() req) {
    return this.businessProfilesService.getBusinessStats(id, req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Request() req, @Body() updateBusinessProfileDto: UpdateBusinessProfileDto) {
    return this.businessProfilesService.update(id, req.user.userId, updateBusinessProfileDto);
  }

  @Patch(':id/jampad-details')
  @UseGuards(JwtAuthGuard)
  updateJampadDetails(@Param('id') id: string, @Request() req, @Body() updateJampadDetailsDto: UpdateJampadDetailsDto) {
    return this.businessProfilesService.updateJampadDetails(id, req.user.userId, updateJampadDetailsDto);
  }

  @Patch(':id/school-details')
  @UseGuards(JwtAuthGuard)
  updateSchoolDetails(@Param('id') id: string, @Request() req, @Body() updateSchoolDetailsDto: UpdateSchoolDetailsDto) {
    return this.businessProfilesService.updateSchoolDetails(id, req.user.userId, updateSchoolDetailsDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.businessProfilesService.remove(id, req.user.userId);
  }
}