import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus, UserRole } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, userId: string) {
    // Check if the studio exists
    const studio = await this.prisma.studio.findUnique({
      where: { id: createBookingDto.studioId },
    });

    if (!studio) {
      throw new NotFoundException(`Studio with ID ${createBookingDto.studioId} not found`);
    }

    // Check if the booking times are valid
    const startTime = new Date(createBookingDto.startTime);
    const endTime = new Date(createBookingDto.endTime);

    if (startTime >= endTime) {
      throw new BadRequestException('End time must be after start time');
    }

    // Check if the time slot is available
    const overlappingBooking = await this.prisma.booking.findFirst({
      where: {
        studioId: createBookingDto.studioId,
        status: {
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        },
        OR: [
          {
            // New booking starts during existing booking
            startTime: { lt: endTime },
            endTime: { gt: startTime },
          },
        ],
      },
    });

    if (overlappingBooking) {
      throw new BadRequestException('The selected time slot is not available');
    }

    // Calculate the duration and verify the total price
    const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const calculatedPrice = durationHours * studio.hourlyRate;

    // Allow small price discrepancies due to rounding
    if (Math.abs(calculatedPrice - createBookingDto.totalPrice) > 1) {
      throw new BadRequestException(
        `The provided total price (${
          createBookingDto.totalPrice
        }) does not match the calculated price (${calculatedPrice.toFixed(2)})`,
      );
    }

    // Create the booking
    return this.prisma.booking.create({
      data: {
        startTime,
        endTime,
        totalPrice: createBookingDto.totalPrice,
        notes: createBookingDto.notes,
        status: BookingStatus.PENDING,
        studio: {
          connect: {
            id: createBookingDto.studioId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        studio: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(userId: string, userRole: UserRole, status?: BookingStatus) {
    const where: any = {};

    // Apply filters based on user role
    switch (userRole) {
      case UserRole.ARTIST:
        // Artists can only see their own bookings
        where.userId = userId;
        break;
      case UserRole.STUDIO_OWNER:
        // Studio owners can see bookings for their studios
        where.studio = {
          ownerId: userId,
        };
        break;
      case UserRole.ADMIN:
        // Admins can see all bookings
        break;
      default:
        throw new ForbiddenException('You are not authorized to view bookings');
    }

    // Apply status filter if provided
    if (status) {
      where.status = status;
    }

    return this.prisma.booking.findMany({
      where,
      include: {
        studio: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string, userRole: UserRole) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        studio: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Check if the user is authorized to view this booking
    if (
      userRole !== UserRole.ADMIN &&
      booking.userId !== userId &&
      booking.studio.ownerId !== userId
    ) {
      throw new ForbiddenException('You are not authorized to view this booking');
    }

    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto, userId: string, userRole: UserRole) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        studio: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Determine who can update the booking and what fields they can update
    const isOwner = booking.userId === userId;
    const isStudioOwner = booking.studio.ownerId === userId;
    const isAdmin = userRole === UserRole.ADMIN;

    if (!isOwner && !isStudioOwner && !isAdmin) {
      throw new ForbiddenException('You are not authorized to update this booking');
    }

    // Different update logic based on who is updating
    const updateData: any = {};

    // Handle booking status updates
    if (updateBookingDto.status) {
      // Only studio owners and admins can change status
      if (!isStudioOwner && !isAdmin) {
        throw new ForbiddenException('Only studio owners and admins can update booking status');
      }

      // Prevent cancellation if the booking is already completed
      if (
        booking.status === BookingStatus.COMPLETED &&
        updateBookingDto.status !== BookingStatus.COMPLETED
      ) {
        throw new BadRequestException('Cannot change status of a completed booking');
      }

      updateData.status = updateBookingDto.status;
    }

    // Handle time and price updates
    if (updateBookingDto.startTime || updateBookingDto.endTime || updateBookingDto.totalPrice) {
      // Only allow time/price changes if booking is pending or if user is admin
      if (booking.status !== BookingStatus.PENDING && !isAdmin) {
        throw new BadRequestException(
          'Cannot update times or price for confirmed or completed bookings',
        );
      }

      // Check for overlapping bookings if changing times
      if (updateBookingDto.startTime || updateBookingDto.endTime) {
        const startTime = new Date(updateBookingDto.startTime || booking.startTime);
        const endTime = new Date(updateBookingDto.endTime || booking.endTime);

        if (startTime >= endTime) {
          throw new BadRequestException('End time must be after start time');
        }

        const overlappingBooking = await this.prisma.booking.findFirst({
          where: {
            id: { not: id },
            studioId: booking.studioId,
            status: {
              in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
            },
            OR: [
              {
                startTime: { lt: endTime },
                endTime: { gt: startTime },
              },
            ],
          },
        });

        if (overlappingBooking) {
          throw new BadRequestException('The selected time slot is not available');
        }

        updateData.startTime = startTime;
        updateData.endTime = endTime;

        // Recalculate price if times are updated
        const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        const calculatedPrice = durationHours * booking.studio.hourlyRate;

        // Update price if it was provided and matches calculation
        if (updateBookingDto.totalPrice) {
          if (Math.abs(calculatedPrice - updateBookingDto.totalPrice) > 1) {
            throw new BadRequestException(
              `The provided total price (${
                updateBookingDto.totalPrice
              }) does not match the calculated price (${calculatedPrice.toFixed(2)})`,
            );
          }
          updateData.totalPrice = updateBookingDto.totalPrice;
        } else {
          // Update with calculated price
          updateData.totalPrice = calculatedPrice;
        }
      } else if (updateBookingDto.totalPrice) {
        // If just updating price without changing times
        updateData.totalPrice = updateBookingDto.totalPrice;
      }
    }

    // Handle notes update
    if (updateBookingDto.notes !== undefined) {
      updateData.notes = updateBookingDto.notes;
    }

    return this.prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        studio: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
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
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        studio: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Check authorization
    const isOwner = booking.userId === userId;
    const isStudioOwner = booking.studio.ownerId === userId;
    const isAdmin = userRole === UserRole.ADMIN;

    if (!isOwner && !isStudioOwner && !isAdmin) {
      throw new ForbiddenException('You are not authorized to delete this booking');
    }

    // Prevent deletion of completed bookings
    if (booking.status === BookingStatus.COMPLETED && !isAdmin) {
      throw new BadRequestException('Cannot delete a completed booking');
    }

    // Delete the booking
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
