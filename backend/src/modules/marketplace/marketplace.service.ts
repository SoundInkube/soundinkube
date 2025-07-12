import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ListingCategory, UserRole } from '@prisma/client';

@Injectable()
export class MarketplaceService {
  constructor(private prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto, userId: string) {
    return this.prisma.marketplaceListing.create({
      data: {
        ...createListingDto,
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
            profile: true,
          },
        },
      },
    });
  }

  async findAll(category?: ListingCategory) {
    const where = category ? { category } : {};

    return this.prisma.marketplaceListing.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                avatar: true,
                bio: true,
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

  async findOne(id: string) {
    const listing = await this.prisma.marketplaceListing.findUnique({
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
      },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return listing;
  }

  async findByUser(userId: string) {
    return this.prisma.marketplaceListing.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                avatar: true,
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

  async update(id: string, updateListingDto: UpdateListingDto, userId: string, userRole: UserRole) {
    const listing = await this.prisma.marketplaceListing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    // Check if the user is authorized to update the listing
    if (listing.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not authorized to update this listing');
    }

    return this.prisma.marketplaceListing.update({
      where: { id },
      data: updateListingDto,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string, userRole: UserRole) {
    const listing = await this.prisma.marketplaceListing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    // Check if the user is authorized to delete the listing
    if (listing.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not authorized to delete this listing');
    }

    return this.prisma.marketplaceListing.delete({
      where: { id },
    });
  }

  async search(query: string, category?: ListingCategory) {
    const whereClause: any = {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };

    if (category) {
      whereClause.category = category;
    }

    return this.prisma.marketplaceListing.findMany({
      where: whereClause,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                avatar: true,
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
}
