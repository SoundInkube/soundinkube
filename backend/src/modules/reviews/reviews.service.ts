import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(createDto: CreateReviewDto, userId: string) {
    // Validate that only one entity type is provided
    const entityCount = [
      createDto.studioId,
      createDto.jamPadId,
      createDto.musicSchoolId,
      createDto.marketplaceListingId,
    ].filter(Boolean).length;

    if (entityCount !== 1) {
      throw new BadRequestException('Review must be associated with exactly one entity');
    }

    // Check that the user has interacted with the entity
    await this.validateUserInteraction(createDto, userId);

    // Check that the user has not already reviewed this entity
    await this.validateNoExistingReview(createDto, userId);

    // Create review
    const review = await this.prisma.review.create({
      data: {
        rating: createDto.rating,
        comment: createDto.comment,
        author: {
          connect: { id: userId },
        },
        ...(createDto.studioId && {
          studio: {
            connect: { id: createDto.studioId },
          },
        }),
        ...(createDto.jamPadId && {
          jamPad: {
            connect: { id: createDto.jamPadId },
          },
        }),
        ...(createDto.musicSchoolId && {
          musicSchool: {
            connect: { id: createDto.musicSchoolId },
          },
        }),
        ...(createDto.marketplaceListingId && {
          marketplaceListing: {
            connect: { id: createDto.marketplaceListingId },
          },
        }),
      },
      include: this.getReviewInclude(),
    });

    // Update the average rating for the entity
    await this.updateEntityAverageRating(review);

    return review;
  }

  private async validateUserInteraction(createDto: CreateReviewDto, userId: string) {
    // Check that the user has interacted with the entity (e.g., booked a studio, enrolled in a course)
    if (createDto.studioId) {
      const bookings = await this.prisma.studioBooking.count({
        where: {
          userId,
          studioId: createDto.studioId,
          status: 'COMPLETED',
        },
      });
      if (bookings === 0) {
        throw new ForbiddenException('You can only review studios after completing a booking');
      }
    }

    if (createDto.jamPadId) {
      const bookings = await this.prisma.jamPadBooking.count({
        where: {
          userId,
          jamPadId: createDto.jamPadId,
          status: 'COMPLETED',
        },
      });
      if (bookings === 0) {
        throw new ForbiddenException('You can only review jam pads after completing a booking');
      }
    }

    if (createDto.musicSchoolId) {
      const enrollments = await this.prisma.enrollment.count({
        where: {
          userId,
          course: {
            musicSchoolId: createDto.musicSchoolId,
          },
          status: 'COMPLETED',
        },
      });
      if (enrollments === 0) {
        throw new ForbiddenException('You can only review music schools after completing a course');
      }
    }

    if (createDto.marketplaceListingId) {
      const orders = await this.prisma.marketplaceOrder.count({
        where: {
          buyerId: userId,
          listingId: createDto.marketplaceListingId,
          status: 'COMPLETED',
        },
      });
      if (orders === 0) {
        throw new ForbiddenException('You can only review listings after completing a purchase');
      }
    }
  }

  private async validateNoExistingReview(createDto: CreateReviewDto, userId: string) {
    // Check that the user has not already reviewed this entity
    const whereClause = {
      authorId: userId,
      ...(createDto.studioId && { studioId: createDto.studioId }),
      ...(createDto.jamPadId && { jamPadId: createDto.jamPadId }),
      ...(createDto.musicSchoolId && { musicSchoolId: createDto.musicSchoolId }),
      ...(createDto.marketplaceListingId && {
        marketplaceListingId: createDto.marketplaceListingId,
      }),
    };

    const existingReview = await this.prisma.review.findFirst({
      where: whereClause,
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this entity');
    }
  }

  private async updateEntityAverageRating(review) {
    // Calculate new average rating and update the entity
    if (review.studioId) {
      await this.updateStudioRating(review.studioId);
    } else if (review.jamPadId) {
      await this.updateJamPadRating(review.jamPadId);
    } else if (review.musicSchoolId) {
      await this.updateMusicSchoolRating(review.musicSchoolId);
    } else if (review.marketplaceListingId) {
      await this.updateListingRating(review.marketplaceListingId);
    }
  }

  private async updateStudioRating(studioId: string) {
    const result = await this.prisma.review.aggregate({
      where: { studioId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await this.prisma.studio.update({
      where: { id: studioId },
      data: {
        averageRating: result._avg.rating || 0,
        totalReviews: result._count.rating,
      },
    });
  }

  private async updateJamPadRating(jamPadId: string) {
    const result = await this.prisma.review.aggregate({
      where: { jamPadId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await this.prisma.jamPad.update({
      where: { id: jamPadId },
      data: {
        averageRating: result._avg.rating || 0,
        totalReviews: result._count.rating,
      },
    });
  }

  private async updateMusicSchoolRating(musicSchoolId: string) {
    const result = await this.prisma.review.aggregate({
      where: { musicSchoolId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await this.prisma.musicSchool.update({
      where: { id: musicSchoolId },
      data: {
        averageRating: result._avg.rating || 0,
        totalReviews: result._count.rating,
      },
    });
  }

  private async updateListingRating(listingId: string) {
    const result = await this.prisma.review.aggregate({
      where: { marketplaceListingId: listingId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await this.prisma.marketplaceListing.update({
      where: { id: listingId },
      data: {
        averageRating: result._avg.rating || 0,
        totalReviews: result._count.rating,
      },
    });
  }

  async findAllReviews(skip = 0, take = 10) {
    const reviews = await this.prisma.review.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: this.getReviewInclude(),
    });

    const total = await this.prisma.review.count();

    return { reviews, total };
  }

  async findUserReviews(userId: string, skip = 0, take = 10) {
    const reviews = await this.prisma.review.findMany({
      where: { authorId: userId },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: this.getReviewInclude(),
    });

    const total = await this.prisma.review.count({ where: { authorId: userId } });

    return { reviews, total };
  }

  async findEntityReviews(entityType: string, entityId: string, skip = 0, take = 10) {
    // Validate entity type
    if (!['studio', 'jamPad', 'musicSchool', 'marketplaceListing'].includes(entityType)) {
      throw new BadRequestException('Invalid entity type');
    }

    // Build where clause based on entity type
    const whereClause = {
      ...(entityType === 'studio' && { studioId: entityId }),
      ...(entityType === 'jamPad' && { jamPadId: entityId }),
      ...(entityType === 'musicSchool' && { musicSchoolId: entityId }),
      ...(entityType === 'marketplaceListing' && { marketplaceListingId: entityId }),
    };

    const reviews = await this.prisma.review.findMany({
      where: whereClause,
      skip,
      take,
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
    });

    const total = await this.prisma.review.count({ where: whereClause });

    return { reviews, total };
  }

  async updateReview(id: string, updateDto: UpdateReviewDto, userId: string, userRole: UserRole) {
    // Check if review exists
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    // Only the author or admin can update
    if (review.authorId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    // Update review
    const updatedReview = await this.prisma.review.update({
      where: { id },
      data: updateDto,
      include: this.getReviewInclude(),
    });

    // Update entity average rating if the rating changed
    if (updateDto.rating && updateDto.rating !== review.rating) {
      await this.updateEntityAverageRating(updatedReview);
    }

    return updatedReview;
  }

  async deleteReview(id: string, userId: string, userRole: UserRole) {
    // Check if review exists
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    // Only the author or admin can delete
    if (review.authorId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    // Delete review
    const deletedReview = await this.prisma.review.delete({
      where: { id },
    });

    // Update entity average rating
    await this.updateEntityAverageRating(deletedReview);

    return deletedReview;
  }

  private getReviewInclude() {
    return {
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
      studio: {
        select: {
          id: true,
          name: true,
          images: true,
        },
      },
      jamPad: {
        select: {
          id: true,
          name: true,
          images: true,
        },
      },
      musicSchool: {
        select: {
          id: true,
          name: true,
          images: true,
        },
      },
      marketplaceListing: {
        select: {
          id: true,
          title: true,
          images: true,
        },
      },
    };
  }
}
