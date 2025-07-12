import { Module } from '@nestjs/common';
import { MusicSchoolsService } from './music-schools.service';
import { MusicSchoolsController } from './music-schools.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MusicSchoolsController],
  providers: [MusicSchoolsService],
  exports: [MusicSchoolsService],
})
export class MusicSchoolsModule {}
