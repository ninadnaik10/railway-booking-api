import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService],
  imports: [],
})
export class BookingsModule {}
