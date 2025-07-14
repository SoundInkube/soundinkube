import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateManagedArtistDto, ManagementRequestDto } from './dto/create-managed-artist.dto';
import { UpdateManagedArtistDto } from './dto/update-managed-artist.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class ArtistManagementService {
  constructor(private prisma: PrismaService) {}

  async sendManagementRequest(managerId: string, requestDto: ManagementRequestDto) {
    // Verify manager role
    const manager = await this.prisma.user.findUnique({
      where: { id: managerId },
    });

    if (!manager || manager.role !== UserRole.ARTIST_MANAGER) {
      throw new ForbiddenException('Only artist managers can send management requests');
    }

    // Verify artist exists and is a music professional
    const artist = await this.prisma.user.findUnique({
      where: { id: requestDto.artistId },
    });

    if (!artist || artist.role !== UserRole.MUSIC_PROFESSIONAL) {
      throw new NotFoundException('Artist not found or is not a music professional');
    }

    // Check if relationship already exists
    const existingRelationship = await this.prisma.managedArtist.findUnique({
      where: {
        managerId_artistId: {
          managerId,
          artistId: requestDto.artistId,
        },
      },
    });

    if (existingRelationship) {
      throw new BadRequestException('Management relationship already exists');
    }

    // Create a message to the artist with the management request
    const message = await this.prisma.message.create({
      data: {
        senderId: managerId,
        receiverId: requestDto.artistId,
        content: `Management Request: ${requestDto.message}`,
      },
    });

    return {
      message: 'Management request sent successfully',
      messageId: message.id,
    };
  }

  async createManagedArtist(managerId: string, createDto: CreateManagedArtistDto) {
    // Verify manager role
    const manager = await this.prisma.user.findUnique({
      where: { id: managerId },
    });

    if (!manager || manager.role !== UserRole.ARTIST_MANAGER) {
      throw new ForbiddenException('Only artist managers can manage artists');
    }

    // Verify artist exists and is a music professional
    const artist = await this.prisma.user.findUnique({
      where: { id: createDto.artistId },
    });

    if (!artist || artist.role !== UserRole.MUSIC_PROFESSIONAL) {
      throw new NotFoundException('Artist not found or is not a music professional');
    }

    // Check if relationship already exists
    const existingRelationship = await this.prisma.managedArtist.findUnique({
      where: {
        managerId_artistId: {
          managerId,
          artistId: createDto.artistId,
        },
      },
    });

    if (existingRelationship) {
      throw new BadRequestException('Management relationship already exists');
    }

    const managedArtist = await this.prisma.managedArtist.create({
      data: {
        managerId,
        ...createDto,
      },
      include: {
        artist: {
          include: {
            profile: true,
          },
        },
      },
    });

    return managedArtist;
  }

  async findManagedArtists(managerId: string) {
    const manager = await this.prisma.user.findUnique({
      where: { id: managerId },
    });

    if (!manager || manager.role !== UserRole.ARTIST_MANAGER) {
      throw new ForbiddenException('Only artist managers can view managed artists');
    }

    const managedArtists = await this.prisma.managedArtist.findMany({
      where: { managerId },
      include: {
        artist: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return managedArtists;
  }

  async findMyManagers(artistId: string) {
    const artist = await this.prisma.user.findUnique({
      where: { id: artistId },
    });

    if (!artist || artist.role !== UserRole.MUSIC_PROFESSIONAL) {
      throw new ForbiddenException('Only music professionals can view their managers');
    }

    const managers = await this.prisma.managedArtist.findMany({
      where: { artistId },
      include: {
        manager: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return managers;
  }

  async findOne(id: string, userId: string) {
    const managedArtist = await this.prisma.managedArtist.findUnique({
      where: { id },
      include: {
        manager: {
          include: {
            profile: true,
          },
        },
        artist: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!managedArtist) {
      throw new NotFoundException('Management relationship not found');
    }

    // Only allow the manager or the artist to view the relationship details
    if (managedArtist.managerId !== userId && managedArtist.artistId !== userId) {
      throw new ForbiddenException('You can only view your own management relationships');
    }

    return managedArtist;
  }

  async update(id: string, userId: string, updateDto: UpdateManagedArtistDto) {
    const managedArtist = await this.prisma.managedArtist.findUnique({
      where: { id },
    });

    if (!managedArtist) {
      throw new NotFoundException('Management relationship not found');
    }

    // Only allow the manager to update
    if (managedArtist.managerId !== userId) {
      throw new ForbiddenException('Only the manager can update this relationship');
    }

    const updatedManagedArtist = await this.prisma.managedArtist.update({
      where: { id },
      data: updateDto,
      include: {
        artist: {
          include: {
            profile: true,
          },
        },
      },
    });

    return updatedManagedArtist;
  }

  async remove(id: string, userId: string) {
    const managedArtist = await this.prisma.managedArtist.findUnique({
      where: { id },
    });

    if (!managedArtist) {
      throw new NotFoundException('Management relationship not found');
    }

    // Allow both manager and artist to end the relationship
    if (managedArtist.managerId !== userId && managedArtist.artistId !== userId) {
      throw new ForbiddenException('You can only end your own management relationships');
    }

    await this.prisma.managedArtist.delete({
      where: { id },
    });

    return { message: 'Management relationship ended successfully' };
  }

  async getManagementStats(managerId: string) {
    const manager = await this.prisma.user.findUnique({
      where: { id: managerId },
    });

    if (!manager || manager.role !== UserRole.ARTIST_MANAGER) {
      throw new ForbiddenException('Only artist managers can view management stats');
    }

    const totalArtists = await this.prisma.managedArtist.count({
      where: { managerId },
    });

    const activeContracts = await this.prisma.managedArtist.count({
      where: {
        managerId,
        OR: [
          { contractEnd: null },
          { contractEnd: { gte: new Date() } },
        ],
      },
    });

    const artistBookings = await this.prisma.booking.count({
      where: {
        professional: {
          artistManagers: {
            some: {
              managerId,
            },
          },
        },
        status: 'COMPLETED',
      },
    });

    return {
      totalArtists,
      activeContracts,
      artistBookings,
    };
  }
}