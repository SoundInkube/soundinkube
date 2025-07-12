import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto, senderId: string) {
    // Check if recipient exists
    const recipient = await this.prisma.user.findUnique({
      where: { id: createMessageDto.recipientId },
    });

    if (!recipient) {
      throw new NotFoundException(`User with ID ${createMessageDto.recipientId} not found`);
    }

    // Create the message
    return this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        sender: {
          connect: {
            id: senderId,
          },
        },
        recipient: {
          connect: {
            id: createMessageDto.recipientId,
          },
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findConversation(userId: string, otherUserId: string) {
    // Check if the other user exists
    const otherUser = await this.prisma.user.findUnique({
      where: { id: otherUserId },
    });

    if (!otherUser) {
      throw new NotFoundException(`User with ID ${otherUserId} not found`);
    }

    // Get messages between the two users
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId: otherUserId,
          },
          {
            senderId: otherUserId,
            recipientId: userId,
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
        recipient: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAllConversations(userId: string) {
    // Get a list of all users the current user has exchanged messages with
    const conversations = await this.prisma.$queryRaw`
      SELECT DISTINCT
        CASE 
          WHEN m."senderId" = ${userId} THEN m."recipientId"
          ELSE m."senderId"
        END AS "otherUserId",
        u.name as "otherUserName",
        (
          SELECT m2.content
          FROM "Message" m2
          WHERE 
            (m2."senderId" = ${userId} AND m2."recipientId" = CASE WHEN m."senderId" = ${userId} THEN m."recipientId" ELSE m."senderId" END)
            OR
            (m2."recipientId" = ${userId} AND m2."senderId" = CASE WHEN m."senderId" = ${userId} THEN m."recipientId" ELSE m."senderId" END)
          ORDER BY m2."createdAt" DESC
          LIMIT 1
        ) as "lastMessage",
        (
          SELECT m2."createdAt"
          FROM "Message" m2
          WHERE 
            (m2."senderId" = ${userId} AND m2."recipientId" = CASE WHEN m."senderId" = ${userId} THEN m."recipientId" ELSE m."senderId" END)
            OR
            (m2."recipientId" = ${userId} AND m2."senderId" = CASE WHEN m."senderId" = ${userId} THEN m."recipientId" ELSE m."senderId" END)
          ORDER BY m2."createdAt" DESC
          LIMIT 1
        ) as "lastMessageTime",
        (
          SELECT COUNT(*)
          FROM "Message" m3
          WHERE 
            m3."recipientId" = ${userId} 
            AND m3."senderId" = CASE WHEN m."senderId" = ${userId} THEN m."recipientId" ELSE m."senderId" END
            AND m3."isRead" = false
        ) as "unreadCount"
      FROM "Message" m
      JOIN "User" u ON 
        u.id = CASE 
          WHEN m."senderId" = ${userId} THEN m."recipientId"
          ELSE m."senderId"
        END
      WHERE m."senderId" = ${userId} OR m."recipientId" = ${userId}
      ORDER BY "lastMessageTime" DESC
    `;

    return conversations;
  }

  async markAsRead(messageIds: string[], userId: string) {
    // Get the messages and ensure they belong to the user
    const messages = await this.prisma.message.findMany({
      where: {
        id: { in: messageIds },
        recipientId: userId,
      },
    });

    if (messages.length === 0) {
      throw new NotFoundException('No valid messages found to mark as read');
    }

    // Mark messages as read
    return this.prisma.message.updateMany({
      where: {
        id: { in: messageIds },
        recipientId: userId,
      },
      data: {
        isRead: true,
      },
    });
  }

  async markConversationAsRead(otherUserId: string, userId: string) {
    return this.prisma.message.updateMany({
      where: {
        senderId: otherUserId,
        recipientId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }

  async delete(id: string, userId: string, userRole: UserRole) {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    // Check if the user is authorized to delete the message
    if (message.senderId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not authorized to delete this message');
    }

    return this.prisma.message.delete({
      where: { id },
    });
  }
}
