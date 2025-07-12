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
import { JamPadsService } from './jampads.service';
import { CreateJamPadDto } from './dto/create-jampad.dto';
import { UpdateJamPadDto } from './dto/update-jampad.dto';
import { CreateJamPadBookingDto } from './dto/create-jampad-booking.dto';
import { UpdateJamPadBookingDto } from './dto/update-jampad-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@prisma/client';

@Controller('jampads')
export class JamPadsController {
  constructor(private readonly jamPadsService: JamPadsService) {}

  // Jam Pad Management
  @Post()
  @UseGuards(JwtAuthGuard)
  createJamPad(@Body() createDto: CreateJampadDto, @Req() req) {
    return this.jamPadsService.createJamPad(createDto, req.user.id);
  }

  @Get()
  findAllJamPads(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query() filters: any,
  ) {
    return this.jamPadsService.findAllJamPads(skip, take, filters);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findUserJamPads(
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.jamPadsService.findUserJamPads(req.user.id, skip, take);
  }

  @Get(':id')
  findJamPadById(@Param('id', ParseUUIDPipe) id: string) {
    return this.jamPadsService.findJamPadById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateJamPad(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateJampadDto,
    @Req() req,
  ) {
    return this.jamPadsService.updateJamPad(id, updateDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteJamPad(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.jamPadsService.deleteJamPad(id, req.user.id, req.user.role);
  }

  // Jam Pad Booking Management
  @Post('bookings')
  @UseGuards(JwtAuthGuard)
  createJamPadBooking(@Body() createDto: CreateJampadBookingDto, @Req() req) {
    return this.jamPadsService.createJamPadBooking(createDto, req.user.id);
  }

  @Get('bookings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAllJamPadBookings(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.jamPadsService.findAllJamPadBookings(skip, take);
  }

  @Get('bookings/user')
  @UseGuards(JwtAuthGuard)
  findUserJamPadBookings(
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.jamPadsService.findUserJamPadBookings(req.user.id, skip, take);
  }

  @Get('bookings/owner')
  @UseGuards(JwtAuthGuard)
  findJamPadOwnerBookings(
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.jamPadsService.findJamPadOwnerBookings(req.user.id, skip, take);
  }

  @Get('bookings/:id')
  @UseGuards(JwtAuthGuard)
  findJamPadBookingById(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.jamPadsService.findJamPadBookingById(id, req.user.id, req.user.role);
  }

  @Patch('bookings/:id')
  @UseGuards(JwtAuthGuard)
  updateJamPadBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateJampadBookingDto,
    @Req() req,
  ) {
    return this.jamPadsService.updateJamPadBooking(id, updateDto, req.user.id, req.user.role);
  }
}
