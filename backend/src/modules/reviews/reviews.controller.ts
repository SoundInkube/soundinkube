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
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReview(@Body() createDto: CreateReviewDto, @Req() req) {
    return this.reviewsService.createReview(createDto, req.user.id);
  }

  @Get()
  findAllReviews(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.reviewsService.findAllReviews(skip, take);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findUserReviews(
    @Req() req,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.reviewsService.findUserReviews(req.user.id, skip, take);
  }

  @Get(':entityType/:entityId')
  findEntityReviews(
    @Param('entityType') entityType: string,
    @Param('entityId', ParseUUIDPipe) entityId: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.reviewsService.findEntityReviews(entityType, entityId, skip, take);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateReviewDto,
    @Req() req,
  ) {
    return this.reviewsService.updateReview(id, updateDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteReview(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.reviewsService.deleteReview(id, req.user.id, req.user.role);
  }
}
