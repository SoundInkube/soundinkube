import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBusinessProfileDto, CreateJampadDetailsDto, CreateSchoolDetailsDto } from './dto/create-business-profile.dto';
import { UpdateBusinessProfileDto, UpdateJampadDetailsDto, UpdateSchoolDetailsDto } from './dto/update-business-profile.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class BusinessProfilesService {
  constructor(private prisma: PrismaService) {}

  async createBusinessProfile(userId: string, createDto: CreateBusinessProfileDto) {
    // Verify user has appropriate role
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (![UserRole.BUSINESS_JAMPAD, UserRole.BUSINESS_MUSIC_SCHOOL].includes(user.role)) {
      throw new ForbiddenException('User must be a business account to create business profile');
    }

    // Check if business profile already exists
    const existingProfile = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw new BadRequestException('Business profile already exists for this user');
    }

    const businessProfile = await this.prisma.businessProfile.create({
      data: {
        ...createDto,
        userId,
      },
      include: {
        jampadDetails: true,
        schoolDetails: true,
      },
    });

    return businessProfile;
  }

  async createJampadDetails(businessProfileId: string, createDto: CreateJampadDetailsDto) {
    const businessProfile = await this.prisma.businessProfile.findUnique({
      where: { id: businessProfileId },
      include: { user: true },
    });

    if (!businessProfile) {
      throw new NotFoundException('Business profile not found');
    }

    if (businessProfile.user.role !== UserRole.BUSINESS_JAMPAD) {
      throw new ForbiddenException('Only jampad businesses can create jampad details');
    }

    const jampadDetails = await this.prisma.jampadBusinessDetails.create({
      data: {
        ...createDto,
        businessProfileId,
      },
    });

    return jampadDetails;
  }

  async createSchoolDetails(businessProfileId: string, createDto: CreateSchoolDetailsDto) {
    const businessProfile = await this.prisma.businessProfile.findUnique({
      where: { id: businessProfileId },
      include: { user: true },
    });

    if (!businessProfile) {
      throw new NotFoundException('Business profile not found');
    }

    if (businessProfile.user.role !== UserRole.BUSINESS_MUSIC_SCHOOL) {
      throw new ForbiddenException('Only music school businesses can create school details');
    }

    const schoolDetails = await this.prisma.schoolBusinessDetails.create({
      data: {
        ...createDto,
        businessProfileId,
      },
    });

    return schoolDetails;
  }

  async findAll(type?: string, city?: string, limit = 20, offset = 0) {
    const where: any = {
      status: 'ACTIVE',
    };

    if (type) {
      where.businessType = type;
    }

    if (city) {
      where.city = {
        contains: city,
        mode: 'insensitive',
      };
    }

    const businessProfiles = await this.prisma.businessProfile.findMany({
      where,
      include: {
        user: {
          select: { id: true, email: true, role: true },
        },
        jampadDetails: true,
        schoolDetails: {
          include: {
            courses: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        averageRating: 'desc',
      },
    });

    return businessProfiles;
  }

  async findOne(id: string) {
    const businessProfile = await this.prisma.businessProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, role: true },
        },
        jampadDetails: {
          include: {
            availableSlots: {
              where: {
                isBooked: false,
                date: {
                  gte: new Date(),
                },
              },
              orderBy: {
                date: 'asc',
              },
            },
            bookings: {
              include: {
                booker: {
                  include: {
                    profile: true,
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
        schoolDetails: {
          include: {
            courses: true,
            applications: {
              include: {
                applicant: {
                  include: {
                    profile: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!businessProfile) {
      throw new NotFoundException('Business profile not found');
    }

    return businessProfile;
  }

  async findByUserId(userId: string) {
    const businessProfile = await this.prisma.businessProfile.findUnique({
      where: { userId },
      include: {
        jampadDetails: {
          include: {
            availableSlots: {
              orderBy: {
                date: 'asc',
              },
            },
            bookings: {
              include: {
                booker: {
                  include: {
                    profile: true,
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
        schoolDetails: {
          include: {
            courses: true,
            applications: {
              include: {
                applicant: {
                  include: {
                    profile: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return businessProfile;
  }

  async update(id: string, userId: string, updateDto: UpdateBusinessProfileDto) {
    const businessProfile = await this.prisma.businessProfile.findUnique({
      where: { id },
    });

    if (!businessProfile) {
      throw new NotFoundException('Business profile not found');
    }

    if (businessProfile.userId !== userId) {
      throw new ForbiddenException('You can only update your own business profile');
    }

    const updatedProfile = await this.prisma.businessProfile.update({
      where: { id },
      data: updateDto,
      include: {
        jampadDetails: true,
        schoolDetails: true,
      },
    });

    return updatedProfile;
  }

  async updateJampadDetails(businessProfileId: string, userId: string, updateDto: UpdateJampadDetailsDto) {
    const businessProfile = await this.prisma.businessProfile.findUnique({
      where: { id: businessProfileId },
      include: { jampadDetails: true },
    });

    if (!businessProfile) {
      throw new NotFoundException('Business profile not found');
    }

    if (businessProfile.userId !== userId) {
      throw new ForbiddenException('You can only update your own business details');
    }

    if (!businessProfile.jampadDetails) {
      throw new NotFoundException('Jampad details not found');
    }

    const updatedDetails = await this.prisma.jampadBusinessDetails.update({
      where: { id: businessProfile.jampadDetails.id },
      data: updateDto,
    });

    return updatedDetails;
  }

  async updateSchoolDetails(businessProfileId: string, userId: string, updateDto: UpdateSchoolDetailsDto) {
    const businessProfile = await this.prisma.businessProfile.findUnique({
      where: { id: businessProfileId },
      include: { schoolDetails: true },
    });

    if (!businessProfile) {
      throw new NotFoundException('Business profile not found');
    }

    if (businessProfile.userId !== userId) {
      throw new ForbiddenException('You can only update your own business details');
    }

    if (!businessProfile.schoolDetails) {
      throw new NotFoundException('School details not found');
    }

    const updatedDetails = await this.prisma.schoolBusinessDetails.update({
      where: { id: businessProfile.schoolDetails.id },
      data: updateDto,
    });

    return updatedDetails;
  }

  async remove(id: string, userId: string) {
    const businessProfile = await this.prisma.businessProfile.findUnique({
      where: { id },
    });

    if (!businessProfile) {
      throw new NotFoundException('Business profile not found');
    }

    if (businessProfile.userId !== userId) {
      throw new ForbiddenException('You can only delete your own business profile');
    }

    await this.prisma.businessProfile.delete({
      where: { id },
    });

    return { message: 'Business profile deleted successfully' };
  }

  async getBusinessStats(businessProfileId: string, userId: string) {
    const businessProfile = await this.prisma.businessProfile.findUnique({
      where: { id: businessProfileId },
    });

    if (!businessProfile) {
      throw new NotFoundException('Business profile not found');
    }

    if (businessProfile.userId !== userId) {
      throw new ForbiddenException('You can only view your own business stats');
    }

    const stats: any = {
      totalReviews: businessProfile.totalReviews,
      averageRating: businessProfile.averageRating,
    };

    if (businessProfile.businessType === 'jampad') {
      const jampadStats = await this.prisma.jamPadBooking.aggregate({
        where: {
          jampadDetails: {
            businessProfileId,
          },
        },
        _count: {
          id: true,
        },
        _sum: {
          totalPrice: true,
        },
      });

      stats.totalBookings = jampadStats._count.id || 0;
      stats.totalRevenue = jampadStats._sum.totalPrice || 0;
    } else if (businessProfile.businessType === 'music_school') {
      const schoolStats = await this.prisma.schoolApplication.aggregate({
        where: {
          schoolDetails: {
            businessProfileId,
          },
        },
        _count: {
          id: true,
        },
      });

      stats.totalApplications = schoolStats._count.id || 0;

      const enrolledCount = await this.prisma.schoolApplication.count({
        where: {
          schoolDetails: {
            businessProfileId,
          },
          status: 'ENROLLED',
        },
      });

      stats.enrolledStudents = enrolledCount;
    }

    return stats;
  }
}