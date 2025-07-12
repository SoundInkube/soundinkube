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
  ForbiddenException,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Req() req, @Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(req.user.id, createProfileDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.profilesService.findAll();
  }

  @Get('me')
  getMyProfile(@Req() req) {
    return this.profilesService.findOne(req.user.id);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string, @Req() req) {
    // Allow users to view their own profile or admins to view any profile
    if (req.user.id !== userId && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only view your own profile');
    }
    return this.profilesService.findOne(userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto, @Req() req) {
    // Allow users to update their own profile or admins to update any profile
    if (req.user.id !== userId && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.profilesService.update(userId, updateProfileDto);
  }

  @Delete(':userId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('userId') userId: string) {
    return this.profilesService.remove(userId);
  }
}
