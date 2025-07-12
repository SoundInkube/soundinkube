import { Module } from '@nestjs/common';
import { ArtistManagementService } from './artist-management.service';
import { ArtistManagementController } from './artist-management.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistManagementController],
  providers: [ArtistManagementService],
  exports: [ArtistManagementService],
})
export class ArtistManagementModule {}