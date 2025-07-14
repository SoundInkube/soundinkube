import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArtistManagerService {
  constructor(private prisma: PrismaService) {}

  async getManagedArtists(managerId: string) {
    return await this.prisma.managedArtist.findMany({
      where: { managerId },
      include: {
        artist: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async getRevenueSummary(managerId: string) {
    // Mock revenue data for demonstration
    return {
      totalRevenue: 125500,
      monthlyRevenue: 12800,
      commissionRate: 15,
      topEarningArtist: 'Sarah Johnson',
      revenueByArtist: [
        { artistName: 'Sarah Johnson', revenue: 45200, commission: 6780 },
        { artistName: 'Mike Davis', revenue: 38900, commission: 5835 },
        { artistName: 'Emily Chen', revenue: 24100, commission: 3615 },
        { artistName: 'Alex Rodriguez', revenue: 17300, commission: 2595 },
      ],
      monthlyTrends: [
        { month: 'Jan', revenue: 8500 },
        { month: 'Feb', revenue: 9200 },
        { month: 'Mar', revenue: 11800 },
        { month: 'Apr', revenue: 13400 },
        { month: 'May', revenue: 15600 },
        { month: 'Jun', revenue: 12800 },
      ],
    };
  }

  async getContracts(managerId: string) {
    // Mock contract data
    return [
      {
        id: 'contract-1',
        artistName: 'Sarah Johnson',
        startDate: '2024-01-15',
        endDate: '2025-01-15',
        commissionRate: 15,
        status: 'Active',
        renewalDate: '2024-11-15',
        contractType: 'Management Agreement',
      },
      {
        id: 'contract-2',
        artistName: 'Mike Davis',
        startDate: '2024-03-01',
        endDate: '2026-03-01',
        commissionRate: 18,
        status: 'Active',
        renewalDate: '2025-12-01',
        contractType: 'Exclusive Management',
      },
      {
        id: 'contract-3',
        artistName: 'Emily Chen',
        startDate: '2023-08-10',
        endDate: '2024-08-10',
        commissionRate: 12,
        status: 'Expiring Soon',
        renewalDate: '2024-06-10',
        contractType: 'Booking Agreement',
      },
      {
        id: 'contract-4',
        artistName: 'Alex Rodriguez',
        startDate: '2024-02-20',
        endDate: '2025-02-20',
        commissionRate: 20,
        status: 'Active',
        renewalDate: '2024-12-20',
        contractType: 'Full Service Management',
      },
    ];
  }

  async getBookings(managerId: string) {
    // Mock booking data
    return [
      {
        id: 'booking-1',
        artistName: 'Sarah Johnson',
        venue: 'Madison Square Garden',
        date: '2024-08-15',
        time: '20:00',
        fee: 15000,
        status: 'Confirmed',
        type: 'Concert',
      },
      {
        id: 'booking-2',
        artistName: 'Mike Davis',
        venue: 'Blue Note Jazz Club',
        date: '2024-07-28',
        time: '21:30',
        fee: 3500,
        status: 'Confirmed',
        type: 'Live Performance',
      },
      {
        id: 'booking-3',
        artistName: 'Emily Chen',
        venue: 'Coachella Music Festival',
        date: '2024-09-12',
        time: '16:00',
        fee: 25000,
        status: 'Pending',
        type: 'Festival',
      },
      {
        id: 'booking-4',
        artistName: 'Alex Rodriguez',
        venue: 'The Apollo Theater',
        date: '2024-08-03',
        time: '19:00',
        fee: 8500,
        status: 'Confirmed',
        type: 'Solo Concert',
      },
      {
        id: 'booking-5',
        artistName: 'Sarah Johnson',
        venue: 'Red Rocks Amphitheatre',
        date: '2024-09-25',
        time: '18:30',
        fee: 22000,
        status: 'Negotiating',
        type: 'Outdoor Concert',
      },
    ];
  }

  async getCampaigns(managerId: string) {
    // Mock campaign data
    return [
      {
        id: 'campaign-1',
        artistName: 'Sarah Johnson',
        campaignName: 'Summer Tour 2024',
        platform: 'Instagram, TikTok',
        budget: 5000,
        spent: 3200,
        reach: 125000,
        engagement: 8.5,
        status: 'Active',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
      },
      {
        id: 'campaign-2',
        artistName: 'Mike Davis',
        campaignName: 'New Album Launch',
        platform: 'Spotify, YouTube',
        budget: 8000,
        spent: 8000,
        reach: 89000,
        engagement: 12.3,
        status: 'Completed',
        startDate: '2024-03-15',
        endDate: '2024-05-15',
      },
      {
        id: 'campaign-3',
        artistName: 'Emily Chen',
        campaignName: 'Festival Promotion',
        platform: 'Facebook, Twitter',
        budget: 3500,
        spent: 1800,
        reach: 67000,
        engagement: 6.7,
        status: 'Active',
        startDate: '2024-07-01',
        endDate: '2024-09-15',
      },
    ];
  }

  async getDashboardStats(managerId: string) {
    return {
      totalArtists: 12,
      activeContracts: 9,
      upcomingBookings: 7,
      activeCampaigns: 4,
      monthlyRevenue: 12800,
      totalRevenue: 125500,
      averageCommission: 16.2,
      topPerformer: 'Sarah Johnson',
    };
  }
}