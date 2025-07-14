import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJamPadDto } from './dto/create-jampad.dto';
import { UpdateJamPadDto } from './dto/update-jampad.dto';
import { CreateJamPadBookingDto } from './dto/create-jampad-booking.dto';
import { UpdateJamPadBookingDto } from './dto/update-jampad-booking.dto';
import { UserRole, BookingStatus } from '@prisma/client';

@Injectable()
export class JamPadsService {
  constructor(private prisma: PrismaService) {}

  // Jam Pad Management
  async createJamPad(createDto: CreateJamPadDto, userId: string) {
    // Validate the data
    if (createDto.hourlyRate < 0) {
      throw new BadRequestException('Hourly rate must be a positive number');
    }

    return this.prisma.jamPad.create({
      data: {
        name: createDto.name,
        description: createDto.description,
        type: createDto.type,
        address: createDto.address,
        city: createDto.city,
        state: createDto.state,
        postalCode: createDto.postalCode,
        country: createDto.country,
        latitude: createDto.latitude,
        longitude: createDto.longitude,
        capacity: createDto.capacity,
        amenities: createDto.amenities,
        images: createDto.images,
        hourlyRate: createDto.hourlyRate,
        availableTimeSlots: createDto.availableTimeSlots,
        owner: {
          connect: { id: userId },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllJamPads(skip = 0, take = 10, filters?: any) {
    const where = {
      active: true,
      ...filters,
    };

    const jamPads = await this.prisma.jamPad.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
    });

    const total = await this.prisma.jamPad.count({ where });

    return { jamPads, total };
  }

  async findJamPadById(id: string) {
    const jamPad = await this.prisma.jamPad.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
        reviews: {
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
    });

    if (!jamPad || !jamPad.active) {
      throw new NotFoundException(`JamPad with ID ${id} not found or inactive`);
    }

    return jamPad;
  }

  async findUserJamPads(userId: string, skip = 0, take = 10) {
    const jamPads = await this.prisma.jamPad.findMany({
      where: { ownerId: userId },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
    });

    const total = await this.prisma.jamPad.count({ where: { ownerId: userId } });

    return { jamPads, total };
  }

  async updateJamPad(id: string, updateDto: UpdateJampadDto, userId: string, userRole: UserRole) {
    // Check if jam pad exists
    const jamPad = await this.prisma.jamPad.findUnique({
      where: { id },
    });

    if (!jamPad) {
      throw new NotFoundException(`JamPad with ID ${id} not found`);
    }

    // Check if user is owner or admin
    if (jamPad.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only update your own jam pads');
    }

    // Update jam pad
    return this.prisma.jamPad.update({
      where: { id },
      data: updateDto,
      include: {
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteJamPad(id: string, userId: string, userRole: UserRole) {
    // Check if jam pad exists
    const jamPad = await this.prisma.jamPad.findUnique({
      where: { id },
    });

    if (!jamPad) {
      throw new NotFoundException(`JamPad with ID ${id} not found`);
    }

    // Check if user is owner or admin
    if (jamPad.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only delete your own jam pads');
    }

    // Check if there are any active bookings
    const activeBookings = await this.prisma.jamPadBooking.count({
      where: {
        jamPadId: id,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (activeBookings > 0) {
      throw new BadRequestException('Cannot delete jam pad with active bookings');
    }

    // Soft delete - just mark as inactive
    return this.prisma.jamPad.update({
      where: { id },
      data: { active: false },
    });
  }

  // Jam Pad Booking Management
  async createJamPadBooking(createDto: CreateJamPadBookingDto, userId: string) {
    // Check if jam pad exists and is active
    const jamPad = await this.prisma.jamPad.findUnique({
      where: { id: createDto.jamPadId, active: true },
    });

    if (!jamPad) {
      throw new NotFoundException(`JamPad with ID ${createDto.jamPadId} not found or inactive`);
    }

    // Validate booking dates
    if (createDto.startTime >= createDto.endTime) {
      throw new BadRequestException('End time must be after start time');
    }

    const currentDate = new Date();
    if (new Date(createDto.startTime) < currentDate) {
      throw new BadRequestException('Cannot book in the past');
    }

    // Check if the time slot is available
    const overlappingBookings = await this.prisma.jamPadBooking.count({
      where: {
        jamPadId: createDto.jamPadId,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
        OR: [
          {
            // New booking starts during an existing booking
            startTime: { lte: createDto.startTime },
            endTime: { gt: createDto.startTime },
          },
          {
            // New booking ends during an existing booking
            startTime: { lt: createDto.endTime },
            endTime: { gte: createDto.endTime },
          },
          {
            // New booking contains an existing booking
            startTime: { gte: createDto.startTime },
            endTime: { lte: createDto.endTime },
          },
        ],
      },
    });

    if (overlappingBookings > 0) {
      throw new BadRequestException('Time slot is not available');
    }

    // Calculate hours and total price
    const startTime = new Date(createDto.startTime);
    const endTime = new Date(createDto.endTime);
    const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const totalPrice = jamPad.hourlyRate * durationHours;

    // Create booking
    return this.prisma.jamPadBooking.create({
      data: {
        startTime: createDto.startTime,
        endTime: createDto.endTime,
        totalPrice,
        status: JamPadBookingStatus.PENDING,
        jamPad: {
          connect: { id: createDto.jamPadId },
        },
        user: {
          connect: { id: userId },
        },
      },
      include: {
        jamPad: {
          select: {
            id: true,
            name: true,
            hourlyRate: true,
            images: true,
            owner: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllJamPadBookings(skip = 0, take = 10) {
    const bookings = await this.prisma.jamPadBooking.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        jamPad: {
          select: {
            id: true,
            name: true,
            images: true,
          },
        },
        user: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.jamPadBooking.count();

    return { bookings, total };
  }

  async findUserJamPadBookings(userId: string, skip = 0, take = 10) {
    const bookings = await this.prisma.jamPadBooking.findMany({
      where: { userId },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        jamPad: {
          select: {
            id: true,
            name: true,
            images: true,
            owner: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.jamPadBooking.count({ where: { userId } });

    return { bookings, total };
  }

  async findJamPadOwnerBookings(ownerId: string, skip = 0, take = 10) {
    const bookings = await this.prisma.jamPadBooking.findMany({
      where: {
        jamPad: {
          ownerId,
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        jamPad: {
          select: {
            id: true,
            name: true,
            images: true,
          },
        },
        user: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.jamPadBooking.count({
      where: {
        jamPad: {
          ownerId,
        },
      },
    });

    return { bookings, total };
  }

  async findJamPadBookingById(id: string, userId: string, userRole: UserRole) {
    const booking = await this.prisma.jamPadBooking.findUnique({
      where: { id },
      include: {
        jamPad: {
          select: {
            id: true,
            name: true,
            description: true,
            hourlyRate: true,
            images: true,
            address: true,
            city: true,
            state: true,
            postalCode: true,
            country: true,
            ownerId: true,
            owner: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                    avatar: true,
                    phoneNumber: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
                phoneNumber: true,
              },
            },
          },
        },
        payment: {
          select: {
            id: true,
            amount: true,
            status: true,
            method: true,
            createdAt: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException(`JamPad Booking with ID ${id} not found`);
    }

    // Only allow the user who made the booking, the jam pad owner, or an admin to view the booking
    if (
      booking.userId !== userId &&
      booking.jamPad.ownerId !== userId &&
      userRole !== UserRole.ADMIN
    ) {
      throw new ForbiddenException('You do not have permission to view this booking');
    }

    return booking;
  }

  async updateJamPadBooking(
    id: string,
    updateDto: UpdateJampadBookingDto,
    userId: string,
    userRole: UserRole,
  ) {
    // Check if booking exists
    const booking = await this.prisma.jamPadBooking.findUnique({
      where: { id },
      include: {
        jamPad: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`JamPad Booking with ID ${id} not found`);
    }

    // Check permissions
    const isOwner = booking.jamPad.ownerId === userId;
    const isBooker = booking.userId === userId;
    const isAdmin = userRole === UserRole.ADMIN;

    if (!isOwner && !isBooker && !isAdmin) {
      throw new ForbiddenException('You do not have permission to update this booking');
    }

    // Validate status transitions
    if (updateDto.status) {
      // Only owner or admin can confirm or reject
      if (
        (updateDto.status === 'CONFIRMED' || updateDto.status === 'REJECTED') &&
        !isOwner &&
        !isAdmin
      ) {
        throw new ForbiddenException(
          'Only jam pad owners or administrators can confirm or reject bookings',
        );
      }

      // Only user or admin can cancel
      if (updateDto.status === 'CANCELLED' && !isBooker && !isAdmin) {
        throw new ForbiddenException('Only the person who made the booking can cancel it');
      }

      // Only owner or admin can mark as completed
      if (updateDto.status === 'COMPLETED' && !isOwner && !isAdmin) {
        throw new ForbiddenException(
          'Only jam pad owners or administrators can mark bookings as completed',
        );
      }

      // Cannot change status if already cancelled, rejected, or completed
      if (
        ['CANCELLED', 'REJECTED', 'COMPLETED'].includes(booking.status) &&
        booking.status !== updateDto.status
      ) {
        throw new BadRequestException(
          `Cannot change status of a booking that is ${booking.status}`,
        );
      }
    }

    // Update booking
    const updatedBooking = await this.prisma.jamPadBooking.update({
      where: { id },
      data: updateDto,
      include: {
        jamPad: {
          select: {
            id: true,
            name: true,
            hourlyRate: true,
            images: true,
            owner: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return updatedBooking;
  }
}
