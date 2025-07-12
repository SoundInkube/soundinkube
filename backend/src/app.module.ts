import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { StudiosModule } from './modules/studios/studios.module';
import { MessagesModule } from './modules/messages/messages.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { CollabsModule } from './modules/collabs/collabs.module';
import { JamPadsModule } from './modules/jampads/jampads.module';
import { MusicSchoolsModule } from './modules/music-schools/music-schools.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { BusinessProfilesModule } from './modules/business-profiles/business-profiles.module';
import { ArtistManagementModule } from './modules/artist-management/artist-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    BookingsModule,
    StudiosModule,
    MessagesModule,
    MarketplaceModule,
    CollabsModule,
    JamPadsModule,
    MusicSchoolsModule,
    PaymentsModule,
    ReviewsModule,
    BusinessProfilesModule,
    ArtistManagementModule,
  ],
})
export class AppModule {}
