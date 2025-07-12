import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseUUIDPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Req() req) {
    return this.messagesService.create(createMessageDto, req.user.id);
  }

  @Get('conversations')
  findAllConversations(@Req() req) {
    return this.messagesService.findAllConversations(req.user.id);
  }

  @Get('conversation/:userId')
  findConversation(@Param('userId', ParseUUIDPipe) userId: string, @Req() req) {
    return this.messagesService.findConversation(req.user.id, userId);
  }

  @Post('mark-as-read')
  markAsRead(
    @Body('messageIds', new ParseArrayPipe({ items: String })) messageIds: string[],
    @Req() req,
  ) {
    return this.messagesService.markAsRead(messageIds, req.user.id);
  }

  @Post('mark-conversation-read/:userId')
  markConversationAsRead(@Param('userId', ParseUUIDPipe) userId: string, @Req() req) {
    return this.messagesService.markConversationAsRead(userId, req.user.id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.messagesService.delete(id, req.user.id, req.user.role);
  }
}
