import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProfileDto: CreateProfileDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if profile already exists
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      // Update existing profile instead of creating a new one
      return this.update(userId, createProfileDto);
    }

    return this.prisma.profile.create({
      data: {
        ...createProfileDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.profile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findOne(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException(`Profile for user ${userId} not found`);
    }

    return profile;
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    // Check if profile exists
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      throw new NotFoundException(`Profile for user ${userId} not found`);
    }

    return this.prisma.profile.update({
      where: { userId },
      data: updateProfileDto,
    });
  }

  async remove(userId: string) {
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      throw new NotFoundException(`Profile for user ${userId} not found`);
    }

    return this.prisma.profile.delete({
      where: { userId },
    });
  }
}
