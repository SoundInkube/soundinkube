import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseUUIDPipe,
  ParseBoolPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CollabsService } from './collabs.service';
import { CreateCollabPostDto } from './dto/create-collab-post.dto';
import { UpdateCollabPostDto } from './dto/update-collab-post.dto';
import { CreateCollabRequestDto } from './dto/create-collab-request.dto';
import { UpdateCollabRequestDto } from './dto/update-collab-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';

@Controller('collabs')
@UseGuards(JwtAuthGuard)
export class CollabsController {
  constructor(private readonly collabsService: CollabsService) {}

  // Collaboration Posts
  @Post('posts')
  createPost(@Body() createCollabPostDto: CreateCollabPostDto, @Req() req) {
    return this.collabsService.createPost(createCollabPostDto, req.user.id);
  }

  @Get('posts')
  findAllPosts(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('searchTerm') searchTerm?: string,
    @Query('collabType') collabType?: string,
    @Query('onlyActive', new DefaultValuePipe(true), ParseBoolPipe) onlyActive?: boolean,
  ) {
    return this.collabsService.findAllPosts(skip, take, searchTerm, collabType, onlyActive);
  }

  @Get('posts/:id')
  findPostById(@Param('id', ParseUUIDPipe) id: string) {
    return this.collabsService.findPostById(id);
  }

  @Get('user/posts')
  findUserPosts(
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('onlyActive', new DefaultValuePipe(false), ParseBoolPipe) onlyActive?: boolean,
  ) {
    return this.collabsService.findUserPosts(req.user.id, skip, take, onlyActive);
  }

  @Patch('posts/:id')
  updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCollabPostDto: UpdateCollabPostDto,
    @Req() req,
  ) {
    return this.collabsService.updatePost(id, updateCollabPostDto, req.user.id);
  }

  @Delete('posts/:id')
  deletePost(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const isAdmin = req.user.role === UserRole.ADMIN;
    return this.collabsService.deletePost(id, req.user.id, isAdmin);
  }

  // Collaboration Requests
  @Post('requests')
  createRequest(@Body() createCollabRequestDto: CreateCollabRequestDto, @Req() req) {
    return this.collabsService.createRequest(createCollabRequestDto, req.user.id);
  }

  @Get('requests/user')
  findUserRequests(@Req() req, @Query('status') status?: string) {
    return this.collabsService.findUserRequests(req.user.id, status);
  }

  @Get('posts/:postId/requests')
  findPostRequests(@Param('postId', ParseUUIDPipe) postId: string, @Req() req) {
    return this.collabsService.findPostRequests(postId, req.user.id);
  }

  @Patch('requests/:id/author')
  updateRequestAsAuthor(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCollabRequestDto,
    @Req() req,
  ) {
    return this.collabsService.updateRequest(id, updateDto, req.user.id, true);
  }

  @Patch('requests/:id/requester')
  updateRequestAsRequester(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCollabRequestDto,
    @Req() req,
  ) {
    return this.collabsService.updateRequest(id, updateDto, req.user.id, false);
  }

  @Delete('requests/:id')
  deleteRequest(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.collabsService.deleteRequest(id, req.user.id);
  }
}
