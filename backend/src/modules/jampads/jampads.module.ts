import { Module } from '@nestjs/common';
import { JamPadsService } from './jampads.service';
import { JamPadsController } from './jampads.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JamPadsController],
  providers: [JamPadsService],
  exports: [JamPadsService],
})
export class JamPadsModule {}
