import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TrainsModule } from './trains/trains.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UsersModule,
    TrainsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
