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
  ParseArrayPipe,
  ParseFloatPipe,
  Optional,
} from '@nestjs/common';
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDIO_OWNER, UserRole.ADMIN)
  create(@Body() createStudioDto: CreateStudioDto, @Req() req) {
    return this.studiosService.create(createStudioDto, req.user.id);
  }

  @Get()
  findAll(
    @Query('location') location?: string,
    @Query('minPrice', new Optional(), ParseFloatPipe) minPrice?: number,
    @Query('maxPrice', new Optional(), ParseFloatPipe) maxPrice?: number,
    @Query(
      'amenities',
      new Optional(),
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    amenities?: string[],
    @Query(
      'equipment',
      new Optional(),
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    equipment?: string[],
  ) {
    return this.studiosService.findAll({
      location,
      minPrice,
      maxPrice,
      amenities,
      equipment,
    });
  }

  @Get('my-studios')
  @UseGuards(JwtAuthGuard)
  findMyStudios(@Req() req) {
    return this.studiosService.findByOwner(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studiosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateStudioDto: UpdateStudioDto, @Req() req) {
    return this.studiosService.update(id, updateStudioDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.studiosService.remove(id, req.user.id, req.user.role);
  }
}
