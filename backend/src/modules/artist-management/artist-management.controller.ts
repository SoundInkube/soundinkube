import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArtistManagementService } from './artist-management.service';
import { CreateManagedArtistDto, ManagementRequestDto } from './dto/create-managed-artist.dto';
import { UpdateManagedArtistDto } from './dto/update-managed-artist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('artist-management')
export class ArtistManagementController {
  constructor(private readonly artistManagementService: ArtistManagementService) {}

  @Post('request')
  @UseGuards(JwtAuthGuard)
  sendManagementRequest(@Request() req, @Body() managementRequestDto: ManagementRequestDto) {
    return this.artistManagementService.sendManagementRequest(req.user.userId, managementRequestDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createManagedArtistDto: CreateManagedArtistDto) {
    return this.artistManagementService.createManagedArtist(req.user.userId, createManagedArtistDto);
  }

  @Get('my-artists')
  @UseGuards(JwtAuthGuard)
  findManagedArtists(@Request() req) {
    return this.artistManagementService.findManagedArtists(req.user.userId);
  }

  @Get('my-managers')
  @UseGuards(JwtAuthGuard)
  findMyManagers(@Request() req) {
    return this.artistManagementService.findMyManagers(req.user.userId);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  getManagementStats(@Request() req) {
    return this.artistManagementService.getManagementStats(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.artistManagementService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Request() req, @Body() updateManagedArtistDto: UpdateManagedArtistDto) {
    return this.artistManagementService.update(id, req.user.userId, updateManagedArtistDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.artistManagementService.remove(id, req.user.userId);
  }
}