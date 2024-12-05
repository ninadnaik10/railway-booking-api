import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { BookingData } from './types';
import { Mutex } from 'async-mutex';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  private trainMutexes = new Map<string, Mutex>();

  private getTrainMutex(trainId: string): Mutex {
    if (!this.trainMutexes.has(trainId)) {
      this.trainMutexes.set(trainId, new Mutex());
    }
    return this.trainMutexes.get(trainId)!;
  }

  async addBooking(booking: BookingData, user: User) {
    const mutex = this.getTrainMutex(booking.trainId);
    const release = await mutex.acquire();

    try {
      const train = await this.prisma.train.findUnique({
        where: { id: booking.trainId },
      });
      if (!train) {
        throw new NotFoundException('Train not found');
      }
      if (train.availableSeats > 0) {
        const booking = await this.prisma.booking.create({
          data: {
            id: uuidv4(),
            user: { connect: { id: user.id } },
            train: { connect: { id: train.id } },
            status: BookingStatus.CONFIRMED,
          },
          include: {
            user: true,
            train: true,
          },
        });

        await this.prisma.train.update({
          where: { id: booking.trainId },
          data: { availableSeats: { decrement: 1 } },
        });
        return {
          id: booking.id,
          trainId: booking.trainId,
          userId: booking.userId,
          status: booking.status,
        };
      }
      throw new ConflictException('No seats available');
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw error;
      }
    } finally {
      release();
    }
  }

  async getBooking(id: string, user: User) {
    return await this.prisma.booking.findUnique({
      where: { id, userId: user.id },
    });
  }
}
