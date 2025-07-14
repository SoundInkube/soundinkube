import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ArtistManagerService } from './artist-manager.service';

@Controller('artist-manager')
@UseGuards(JwtAuthGuard)
export class ArtistManagerController {
  constructor(private readonly artistManagerService: ArtistManagerService) {}

  @Get('dashboard')
  async getDashboard(@Request() req) {
    const managerId = req.user.id;
    return await this.artistManagerService.getDashboardStats(managerId);
  }

  @Get('artists')
  async getManagedArtists(@Request() req) {
    const managerId = req.user.id;
    return await this.artistManagerService.getManagedArtists(managerId);
  }

  @Get('revenue')
  async getRevenue(@Request() req) {
    const managerId = req.user.id;
    return await this.artistManagerService.getRevenueSummary(managerId);
  }

  @Get('contracts')
  async getContracts(@Request() req) {
    const managerId = req.user.id;
    return await this.artistManagerService.getContracts(managerId);
  }

  @Get('bookings')
  async getBookings(@Request() req) {
    const managerId = req.user.id;
    return await this.artistManagerService.getBookings(managerId);
  }

  @Get('campaigns')
  async getCampaigns(@Request() req) {
    const managerId = req.user.id;
    return await this.artistManagerService.getCampaigns(managerId);
  }
}