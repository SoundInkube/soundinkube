import { Module } from '@nestjs/common';
import { ArtistManagerController } from './artist-manager.controller';
import { ArtistManagerService } from './artist-manager.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ArtistManagerController],
  providers: [ArtistManagerService, PrismaService],
})
export class ArtistManagerModule {}