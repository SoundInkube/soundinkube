import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Query,
  ParseUUIDPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@prisma/client';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createPayment(@Body() createDto: CreatePaymentDto, @Req() req) {
    return this.paymentsService.createPayment(createDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAllPayments(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.paymentsService.findAllPayments(skip, take);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findUserPayments(
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.paymentsService.findUserPayments(req.user.id, skip, take);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findPaymentById(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.paymentsService.findPaymentById(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updatePayment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdatePaymentDto,
    @Req() req,
  ) {
    return this.paymentsService.updatePayment(id, updateDto, req.user.id, req.user.role);
  }
}
