import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TrainsService } from './trains/trains.service';
import { BookingsService } from './bookings/bookings.service';
import { BookingsModule } from './bookings/bookings.module';
import { TrainsModule } from './trains/trains.module';

@Module({
  imports: [ConfigModule, AuthModule, UsersModule, BookingsModule, TrainsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, TrainsService, BookingsService],
})
export class AppModule {}
