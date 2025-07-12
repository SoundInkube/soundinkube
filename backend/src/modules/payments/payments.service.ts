import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto, PaymentStatus, PaymentType } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(createDto: CreatePaymentDto, userId: string) {
    // Check that the user has access to create this payment
    await this.validatePaymentAccess(createDto, userId);

    // Create payment record
    const payment = await this.prisma.payment.create({
      data: {
        type: createDto.type,
        method: createDto.method,
        amount: createDto.amount,
        status: PaymentStatus.PENDING,
        user: {
          connect: { id: userId },
        },
        ...(createDto.studioBookingId && {
          studioBooking: {
            connect: { id: createDto.studioBookingId },
          },
        }),
        ...(createDto.jamPadBookingId && {
          jamPadBooking: {
            connect: { id: createDto.jamPadBookingId },
          },
        }),
        ...(createDto.enrollmentId && {
          enrollment: {
            connect: { id: createDto.enrollmentId },
          },
        }),
        ...(createDto.marketplaceOrderId && {
          marketplaceOrder: {
            connect: { id: createDto.marketplaceOrderId },
          },
        }),
        ...(createDto.stripeToken && { stripeToken: createDto.stripeToken }),
        ...(createDto.paypalPaymentId && { paypalPaymentId: createDto.paypalPaymentId }),
      },
      include: this.getPaymentInclude(),
    });

    // In a real application, we would process the payment with Stripe, PayPal, etc. here
    // For now, we'll just simulate a successful payment
    const processedPayment = await this.processPayment(payment);

    // Update related records based on payment status
    await this.updateRelatedRecordsForPayment(processedPayment);

    return processedPayment;
  }

  private async validatePaymentAccess(createDto: CreatePaymentDto, userId: string) {
    switch (createDto.type) {
      case PaymentType.STUDIO_BOOKING:
        if (!createDto.studioBookingId) {
          throw new BadRequestException(
            'Studio booking ID is required for studio booking payments',
          );
        }
        const studioBooking = await this.prisma.studioBooking.findUnique({
          where: { id: createDto.studioBookingId },
          include: { studio: true },
        });
        if (!studioBooking) {
          throw new NotFoundException(
            `Studio booking with ID ${createDto.studioBookingId} not found`,
          );
        }
        if (studioBooking.userId !== userId) {
          throw new ForbiddenException('You can only make payments for your own bookings');
        }
        if (studioBooking.status !== 'PENDING') {
          throw new BadRequestException('Payment can only be made for pending bookings');
        }
        break;

      case PaymentType.JAMPAD_BOOKING:
        if (!createDto.jamPadBookingId) {
          throw new BadRequestException(
            'JamPad booking ID is required for jam pad booking payments',
          );
        }
        const jamPadBooking = await this.prisma.jamPadBooking.findUnique({
          where: { id: createDto.jamPadBookingId },
          include: { jamPad: true },
        });
        if (!jamPadBooking) {
          throw new NotFoundException(
            `JamPad booking with ID ${createDto.jamPadBookingId} not found`,
          );
        }
        if (jamPadBooking.userId !== userId) {
          throw new ForbiddenException('You can only make payments for your own bookings');
        }
        if (jamPadBooking.status !== 'PENDING') {
          throw new BadRequestException('Payment can only be made for pending bookings');
        }
        break;

      case PaymentType.COURSE_ENROLLMENT:
        if (!createDto.enrollmentId) {
          throw new BadRequestException('Enrollment ID is required for course enrollment payments');
        }
        const enrollment = await this.prisma.enrollment.findUnique({
          where: { id: createDto.enrollmentId },
          include: { course: true },
        });
        if (!enrollment) {
          throw new NotFoundException(`Enrollment with ID ${createDto.enrollmentId} not found`);
        }
        if (enrollment.userId !== userId) {
          throw new ForbiddenException('You can only make payments for your own enrollments');
        }
        if (enrollment.status !== 'PENDING') {
          throw new BadRequestException('Payment can only be made for pending enrollments');
        }
        break;

      case PaymentType.MARKETPLACE_PURCHASE:
        if (!createDto.marketplaceOrderId) {
          throw new BadRequestException('Order ID is required for marketplace purchase payments');
        }
        const order = await this.prisma.marketplaceOrder.findUnique({
          where: { id: createDto.marketplaceOrderId },
        });
        if (!order) {
          throw new NotFoundException(`Order with ID ${createDto.marketplaceOrderId} not found`);
        }
        if (order.buyerId !== userId) {
          throw new ForbiddenException('You can only make payments for your own orders');
        }
        if (order.status !== 'PENDING') {
          throw new BadRequestException('Payment can only be made for pending orders');
        }
        break;

      default:
        throw new BadRequestException('Invalid payment type');
    }
  }

  private async processPayment(payment) {
    // In a real application, this would integrate with payment gateways
    // For demo purposes, we'll simulate a successful payment
    return this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.COMPLETED,
        transactionId: `tr_${Date.now()}`, // Simulate a transaction ID
        processedAt: new Date(),
      },
      include: this.getPaymentInclude(),
    });
  }

  private async updateRelatedRecordsForPayment(payment) {
    // Update the status of the related record based on payment status
    if (payment.status === PaymentStatus.COMPLETED) {
      if (payment.studioBookingId) {
        await this.prisma.studioBooking.update({
          where: { id: payment.studioBookingId },
          data: { status: 'CONFIRMED' },
        });
      }

      if (payment.jamPadBookingId) {
        await this.prisma.jamPadBooking.update({
          where: { id: payment.jamPadBookingId },
          data: { status: 'CONFIRMED' },
        });
      }

      if (payment.enrollmentId) {
        await this.prisma.enrollment.update({
          where: { id: payment.enrollmentId },
          data: { status: 'CONFIRMED' },
        });
      }

      if (payment.marketplaceOrderId) {
        await this.prisma.marketplaceOrder.update({
          where: { id: payment.marketplaceOrderId },
          data: { status: 'PAID' },
        });
      }
    }
  }

  async findAllPayments(skip = 0, take = 10) {
    const payments = await this.prisma.payment.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: this.getPaymentInclude(),
    });

    const total = await this.prisma.payment.count();

    return { payments, total };
  }

  async findUserPayments(userId: string, skip = 0, take = 10) {
    const payments = await this.prisma.payment.findMany({
      where: { userId },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: this.getPaymentInclude(),
    });

    const total = await this.prisma.payment.count({ where: { userId } });

    return { payments, total };
  }

  async findPaymentById(id: string, userId: string, userRole: UserRole) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: this.getPaymentInclude(),
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    // Only the user who made the payment, the admin, or the recipient can view it
    const canAccess = this.canUserAccessPayment(payment, userId, userRole);

    if (!canAccess) {
      throw new ForbiddenException('You do not have permission to view this payment');
    }

    return payment;
  }

  async updatePayment(id: string, updateDto: UpdatePaymentDto, userId: string, userRole: UserRole) {
    // Check if payment exists
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: this.getPaymentInclude(),
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    // Only admin can update payments
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can update payment records');
    }

    // Update payment
    const updatedPayment = await this.prisma.payment.update({
      where: { id },
      data: updateDto,
      include: this.getPaymentInclude(),
    });

    // Update related records if status changed
    if (updateDto.status && updateDto.status !== payment.status) {
      await this.updateRelatedRecordsForPayment(updatedPayment);
    }

    return updatedPayment;
  }

  private canUserAccessPayment(payment, userId: string, userRole: UserRole) {
    if (userRole === UserRole.ADMIN) return true;
    if (payment.userId === userId) return true;

    // Check if user is the recipient of the payment
    if (payment.studioBooking && payment.studioBooking.studio.ownerId === userId) return true;
    if (payment.jamPadBooking && payment.jamPadBooking.jamPad.ownerId === userId) return true;
    if (payment.enrollment && payment.enrollment.course.musicSchool.ownerId === userId) return true;
    if (payment.marketplaceOrder && payment.marketplaceOrder.sellerId === userId) return true;

    return false;
  }

  private getPaymentInclude() {
    return {
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
      studioBooking: {
        include: {
          studio: {
            select: {
              id: true,
              name: true,
              ownerId: true,
            },
          },
        },
      },
      jamPadBooking: {
        include: {
          jamPad: {
            select: {
              id: true,
              name: true,
              ownerId: true,
            },
          },
        },
      },
      enrollment: {
        include: {
          course: {
            select: {
              id: true,
              title: true,
              musicSchool: {
                select: {
                  id: true,
                  name: true,
                  ownerId: true,
                },
              },
            },
          },
        },
      },
      marketplaceOrder: {
        include: {
          listing: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    };
  }
}
