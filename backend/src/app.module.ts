import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { JampadsModule } from './modules/jampads/jampads.module';
import { ArtistManagementModule } from './modules/artist-management/artist-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    AdminModule,
    BookingsModule,
    MarketplaceModule,
    JampadsModule,
    ArtistManagementModule,
  ],
})
export class AppModule {}