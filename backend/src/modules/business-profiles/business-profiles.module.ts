import { Module } from '@nestjs/common';
import { BusinessProfilesService } from './business-profiles.service';
import { BusinessProfilesController } from './business-profiles.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BusinessProfilesController],
  providers: [BusinessProfilesService],
  exports: [BusinessProfilesService],
})
export class BusinessProfilesModule {}