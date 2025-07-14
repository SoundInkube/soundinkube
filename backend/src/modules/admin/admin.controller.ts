import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Dashboard Stats
  @Get('dashboard/stats')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('dashboard/user-growth')
  async getUserGrowthData() {
    return this.adminService.getUserGrowthData();
  }

  @Get('dashboard/revenue')
  async getRevenueData() {
    return this.adminService.getRevenueData();
  }

  @Get('dashboard/activity')
  async getRecentActivity() {
    return this.adminService.getRecentActivity();
  }

  // User Management
  @Get('users')
  async getAllUsers(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 50,
    @Query('role') role?: UserRole,
  ) {
    return this.adminService.getAllUsers(page, limit, role);
  }

  @Get('users/stats')
  async getUserStats() {
    return this.adminService.getUserStats();
  }

  // Content Management
  @Get('marketplace')
  async getMarketplaceItems(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 50,
  ) {
    return this.adminService.getMarketplaceItems(page, limit);
  }

  @Get('bookings')
  async getBookings(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 50,
  ) {
    return this.adminService.getBookings(page, limit);
  }

  // Categories
  @Get('categories/professionals')
  async getProfessionalCategories() {
    return this.adminService.getProfessionalCategories();
  }

  @Get('categories/equipment')
  async getEquipmentCategories() {
    return this.adminService.getEquipmentCategories();
  }
}