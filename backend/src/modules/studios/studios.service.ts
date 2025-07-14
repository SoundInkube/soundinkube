import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class StudiosService {
  constructor(private prisma: PrismaService) {}

  async create(createStudioDto: CreateStudioDto, userId: string) {
    // Check if the user exists and is a studio owner or admin
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.role !== UserRole.STUDIO_OWNER && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only studio owners can create studios');
    }

    // Create the studio
    return this.prisma.studio.create({
      data: {
        name: createStudioDto.name,
        description: createStudioDto.description,
        location: createStudioDto.location,
        hourlyRate: createStudioDto.hourlyRate,
        imageUrls: createStudioDto.imageUrls || [],
        equipment: createStudioDto.equipment || [],
        amenities: createStudioDto.amenities || [],
        rules: createStudioDto.rules || '',
        owner: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(filters?: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    equipment?: string[];
  }) {
    // Build filter conditions based on the provided filters
    const where: any = {};

    if (filters) {
      if (filters.location) {
        where.location = {
          contains: filters.location,
          mode: 'insensitive',
        };
      }

      if (filters.minPrice !== undefined) {
        where.hourlyRate = {
          ...where.hourlyRate,
          gte: filters.minPrice,
        };
      }

      if (filters.maxPrice !== undefined) {
        where.hourlyRate = {
          ...where.hourlyRate,
          lte: filters.maxPrice,
        };
      }

      if (filters.amenities && filters.amenities.length > 0) {
        where.amenities = {
          hasSome: filters.amenities,
        };
      }

      if (filters.equipment && filters.equipment.length > 0) {
        where.equipment = {
          hasSome: filters.equipment,
        };
      }
    }

    return this.prisma.studio.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        bookings: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            status: true,
          },
          where: {
            status: {
              in: ['PENDING', 'CONFIRMED'],
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const studio = await this.prisma.studio.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: true,
          },
        },
        bookings: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            status: true,
          },
          where: {
            status: {
              in: ['PENDING', 'CONFIRMED'],
            },
          },
        },
      },
    });

    if (!studio) {
      throw new NotFoundException(`Studio with ID ${id} not found`);
    }

    return studio;
  }

  async findByOwner(ownerId: string) {
    return this.prisma.studio.findMany({
      where: { ownerId },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        bookings: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            status: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, updateStudioDto: UpdateStudioDto, userId: string, userRole: UserRole) {
    const studio = await this.prisma.studio.findUnique({
      where: { id },
    });

    if (!studio) {
      throw new NotFoundException(`Studio with ID ${id} not found`);
    }

    // Only the owner or an admin can update the studio
    if (studio.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not authorized to update this studio');
    }

    return this.prisma.studio.update({
      where: { id },
      data: updateStudioDto,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string, userRole: UserRole) {
    const studio = await this.prisma.studio.findUnique({
      where: { id },
    });

    if (!studio) {
      throw new NotFoundException(`Studio with ID ${id} not found`);
    }

    // Only the owner or an admin can delete the studio
    if (studio.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not authorized to delete this studio');
    }

    // Check if there are any active bookings
    const activeBookings = await this.prisma.booking.count({
      where: {
        studioId: id,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (activeBookings > 0) {
      throw new ForbiddenException(
        'Cannot delete studio with active bookings. Cancel all bookings first.',
      );
    }

    return this.prisma.studio.delete({
      where: { id },
    });
  }
}
