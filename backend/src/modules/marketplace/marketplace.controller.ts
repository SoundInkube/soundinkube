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
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ListingCategory } from '@prisma/client';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createListingDto: CreateListingDto, @Req() req) {
    return this.marketplaceService.create(createListingDto, req.user.id);
  }

  @Get()
  findAll(@Query('category') category?: ListingCategory) {
    return this.marketplaceService.findAll(category);
  }

  @Get('search')
  search(@Query('query') query: string, @Query('category') category?: ListingCategory) {
    return this.marketplaceService.search(query, category);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.marketplaceService.findByUser(userId);
  }

  @Get('my-listings')
  @UseGuards(JwtAuthGuard)
  findMyListings(@Req() req) {
    return this.marketplaceService.findByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.marketplaceService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateListingDto: UpdateListingDto,
    @Req() req,
  ) {
    return this.marketplaceService.update(id, updateListingDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.marketplaceService.remove(id, req.user.id, req.user.role);
  }
}
