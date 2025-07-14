import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCollabPostDto } from './dto/create-collab-post.dto';
import { UpdateCollabPostDto } from './dto/update-collab-post.dto';
import { CreateCollabRequestDto } from './dto/create-collab-request.dto';
import { UpdateCollabRequestDto, CollabRequestStatus } from './dto/update-collab-request.dto';

@Injectable()
export class CollabsService {
  constructor(private prisma: PrismaService) {}

  // Collaboration Posts
  async createPost(createCollabPostDto: CreateCollabPostDto, userId: string) {
    return this.prisma.collaborationPost.create({
      data: {
        ...createCollabPostDto,
        author: {
          connect: { id: userId },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllPosts(
    skip = 0,
    take = 10,
    searchTerm?: string,
    collabType?: string,
    onlyActive = true,
  ) {
    const where = {
      ...(searchTerm && {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
        ],
      }),
      ...(collabType && { collabType }),
      ...(onlyActive && { isActive: true }),
    };

    const posts = await this.prisma.collaborationPost.findMany({
      where,
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
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            requests: true,
          },
        },
      },
    });

    const total = await this.prisma.collaborationPost.count({ where });

    return { posts, total };
  }

  async findPostById(id: string) {
    const post = await this.prisma.collaborationPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true,
                avatar: true,
                bio: true,
              },
            },
          },
        },
        requests: {
          include: {
            requester: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Collaboration post with ID ${id} not found`);
    }

    return post;
  }

  async findUserPosts(userId: string, skip = 0, take = 10, onlyActive = false) {
    const where = {
      authorId: userId,
      ...(onlyActive && { isActive: true }),
    };

    const posts = await this.prisma.collaborationPost.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            requests: true,
          },
        },
      },
    });

    const total = await this.prisma.collaborationPost.count({ where });

    return { posts, total };
  }

  async updatePost(id: string, updateCollabPostDto: UpdateCollabPostDto, userId: string) {
    // Check if post exists and user is the author
    const post = await this.prisma.collaborationPost.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) {
      throw new NotFoundException(`Collaboration post with ID ${id} not found`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    return this.prisma.collaborationPost.update({
      where: { id },
      data: updateCollabPostDto,
    });
  }

  async deletePost(id: string, userId: string, isAdmin: boolean) {
    // Check if post exists
    const post = await this.prisma.collaborationPost.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) {
      throw new NotFoundException(`Collaboration post with ID ${id} not found`);
    }

    // Check if user is authorized to delete
    if (post.authorId !== userId && !isAdmin) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    // Delete post
    await this.prisma.collaborationRequest.deleteMany({
      where: { postId: id },
    });

    return this.prisma.collaborationPost.delete({
      where: { id },
    });
  }

  // Collaboration Requests
  async createRequest(createCollabRequestDto: CreateCollabRequestDto, userId: string) {
    // Check if post exists
    const post = await this.prisma.collaborationPost.findUnique({
      where: { id: createCollabRequestDto.postId },
      select: { id: true, authorId: true, isActive: true },
    });

    if (!post) {
      throw new NotFoundException(
        `Collaboration post with ID ${createCollabRequestDto.postId} not found`,
      );
    }

    if (!post.isActive) {
      throw new ConflictException('This collaboration post is no longer active');
    }

    // Check if user is not the author
    if (post.authorId === userId) {
      throw new ForbiddenException('You cannot send a collaboration request to your own post');
    }

    // Check if user already sent a request
    const existingRequest = await this.prisma.collaborationRequest.findFirst({
      where: {
        postId: createCollabRequestDto.postId,
        requesterId: userId,
      },
    });

    if (existingRequest) {
      throw new ConflictException('You have already sent a request for this collaboration');
    }

    return this.prisma.collaborationRequest.create({
      data: {
        ...createCollabRequestDto,
        requester: {
          connect: { id: userId },
        },
        post: {
          connect: { id: createCollabRequestDto.postId },
        },
      },
      include: {
        requester: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        post: {
          select: {
            title: true,
            authorId: true,
          },
        },
      },
    });
  }

  async findUserRequests(userId: string, status?: string) {
    return this.prisma.collaborationRequest.findMany({
      where: {
        requesterId: userId,
        ...(status && { status }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        post: {
          include: {
            author: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findPostRequests(postId: string, userId: string) {
    // Check if post exists and user is the author
    const post = await this.prisma.collaborationPost.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      throw new NotFoundException(`Collaboration post with ID ${postId} not found`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only view requests for your own posts');
    }

    return this.prisma.collaborationRequest.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        requester: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async updateRequest(
    id: string,
    updateDto: UpdateCollabRequestDto,
    userId: string,
    isPostAuthor: boolean,
  ) {
    // Check if request exists
    const request = await this.prisma.collaborationRequest.findUnique({
      where: { id },
      include: {
        post: {
          select: {
            authorId: true,
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundException(`Collaboration request with ID ${id} not found`);
    }

    // Check permissions based on update scenario
    if (
      (isPostAuthor && request.post.authorId !== userId) ||
      (!isPostAuthor && request.requesterId !== userId)
    ) {
      throw new ForbiddenException('You are not authorized to update this request');
    }

    // Post author can update status, requester can update message
    const updateData = isPostAuthor ? { status: updateDto.status } : { message: updateDto.message };

    return this.prisma.collaborationRequest.update({
      where: { id },
      data: updateData,
      include: {
        post: {
          select: {
            title: true,
          },
        },
        requester: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteRequest(id: string, userId: string) {
    // Check if request exists
    const request = await this.prisma.collaborationRequest.findUnique({
      where: { id },
      include: {
        post: {
          select: {
            authorId: true,
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundException(`Collaboration request with ID ${id} not found`);
    }

    // Only requester or post author can delete
    if (request.requesterId !== userId && request.post.authorId !== userId) {
      throw new ForbiddenException('You are not authorized to delete this request');
    }

    return this.prisma.collaborationRequest.delete({
      where: { id },
    });
  }
}
