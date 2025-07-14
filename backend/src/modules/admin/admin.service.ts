import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // User Management
  async getAllUsers(page = 1, limit = 50, role?: UserRole) {
    const skip = (page - 1) * limit;
    const where = role ? { role } : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          profile: true,
          _count: {
            select: {
              bookingsAsClient: true,
              bookingsAsProfessional: true,
              marketListings: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getUserStats() {
    const [totalUsers, clients, professionals, businesses] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: UserRole.CLIENT } }),
      this.prisma.user.count({ where: { role: UserRole.MUSIC_PROFESSIONAL } }),
      this.prisma.user.count({ where: { role: UserRole.BUSINESS } }),
    ]);

    return {
      totalUsers,
      clients,
      professionals,
      businesses,
    };
  }

  // Content Management
  async getMarketplaceItems(page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.marketplaceListing.findMany({
        skip,
        take: limit,
        include: {
          owner: {
            select: {
              id: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.marketplaceListing.count(),
    ]);

    return {
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getBookings(page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        skip,
        take: limit,
        include: {
          client: {
            select: {
              id: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          professional: {
            select: {
              id: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count(),
    ]);

    return {
      bookings,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  // Analytics
  async getDashboardStats() {
    const [
      totalUsers,
      totalBookings,
      totalProducts,
      totalRevenue,
      activeUsers,
      recentUsers,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.booking.count(),
      this.prisma.marketplaceListing.count(),
      this.prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: { status: 'CONFIRMED' },
      }),
      this.prisma.user.count({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      }),
      this.prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      }),
    ]);

    return {
      totalUsers,
      totalBookings,
      totalProducts,
      totalRevenue: Number(totalRevenue._sum.totalPrice) || 0,
      activeUsers,
      recentUsers,
    };
  }

  async getUserGrowthData() {
    // Return mock data for now - can be enhanced with actual SQL later
    return [
      { month: 'Jan', total: 400, clients: 280, professionals: 120, businesses: 0 },
      { month: 'Feb', total: 600, clients: 420, professionals: 180, businesses: 0 },
      { month: 'Mar', total: 800, clients: 560, professionals: 240, businesses: 0 },
      { month: 'Apr', total: 1100, clients: 770, professionals: 330, businesses: 0 },
      { month: 'May', total: 1400, clients: 980, professionals: 420, businesses: 0 },
      { month: 'Jun', total: 1800, clients: 1260, professionals: 540, businesses: 0 },
      { month: 'Jul', total: 2100, clients: 1470, professionals: 630, businesses: 0 },
    ];
  }

  async getRevenueData() {
    // Return mock data for now - can be enhanced with actual SQL later
    return [
      { month: 'Jan', revenue: 12000, bookings: 80 },
      { month: 'Feb', revenue: 18000, bookings: 120 },
      { month: 'Mar', revenue: 25000, bookings: 160 },
      { month: 'Apr', revenue: 32000, bookings: 200 },
      { month: 'May', revenue: 41000, bookings: 260 },
      { month: 'Jun', revenue: 48000, bookings: 300 },
      { month: 'Jul', revenue: 55000, bookings: 350 },
    ];
  }

  async getRecentActivity() {
    const [recentUsers, recentBookings, recentProducts] = await Promise.all([
      this.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      this.prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          client: {
            select: { 
              profile: { select: { firstName: true, lastName: true } }
            },
          },
          professional: {
            select: { 
              profile: { select: { firstName: true, lastName: true } }
            },
          },
        },
      }),
      this.prisma.marketplaceListing.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          owner: {
            select: { 
              profile: { select: { firstName: true, lastName: true } }
            },
          },
        },
      }),
    ]);

    const activities = [
      ...recentUsers.map(user => ({
        id: `user-${user.id}`,
        type: 'user_registration',
        user: {
          name: user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : 'Unknown User',
          email: user.email,
        },
        action: `Registered as ${user.role.toLowerCase().replace('_', ' ')}`,
        time: user.createdAt,
      })),
      ...recentBookings.map(booking => ({
        id: `booking-${booking.id}`,
        type: 'booking',
        user: {
          name: booking.client.profile ? `${booking.client.profile.firstName} ${booking.client.profile.lastName}` : 'Unknown Client',
          email: '',
        },
        action: `Booked ${booking.professional.profile ? `${booking.professional.profile.firstName} ${booking.professional.profile.lastName}` : 'Unknown Professional'}`,
        time: booking.createdAt,
      })),
      ...recentProducts.map(product => ({
        id: `product-${product.id}`,
        type: 'marketplace',
        user: {
          name: product.owner.profile ? `${product.owner.profile.firstName} ${product.owner.profile.lastName}` : 'Unknown Seller',
          email: '',
        },
        action: `Listed "${product.title}" for sale`,
        time: product.createdAt,
      })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

    return activities;
  }

  // Category Management
  async getProfessionalCategories() {
    const categories = await this.prisma.profile.groupBy({
      by: ['specialties'],
      where: {
        user: {
          role: UserRole.MUSIC_PROFESSIONAL,
        },
        specialties: {
          not: {
            isEmpty: true,
          },
        },
      },
      _count: {
        specialties: true,
      },
    });

    return categories.map(cat => ({
      name: cat.specialties.join(', '),
      count: cat._count.specialties,
      status: 'Active',
      description: `Professionals specializing in ${cat.specialties.join(', ')}`,
    }));
  }

  async getEquipmentCategories() {
    const categories = await this.prisma.marketplaceListing.groupBy({
      by: ['listingType'],
      _count: {
        listingType: true,
      },
    });

    return categories.map(cat => ({
      name: cat.listingType,
      count: cat._count.listingType,
      status: 'Active',
      description: `Equipment and instruments in ${cat.listingType} category`,
    }));
  }
}