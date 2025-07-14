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
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BookingStatus, UserRole } from '@prisma/client';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    return this.bookingsService.create(createBookingDto, req.user.id);
  }

  @Get()
  findAll(@Query('status') status: BookingStatus, @Req() req) {
    return this.bookingsService.findAll(req.user.id, req.user.role, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.bookingsService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto, @Req() req) {
    return this.bookingsService.update(id, updateBookingDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.bookingsService.remove(id, req.user.id, req.user.role);
  }
}
