import { ConflictException, Injectable } from '@nestjs/common';
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
        throw new Error('Train not found');
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
        return booking;
      }
      throw new ConflictException('No seats available');
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw Error(error);
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
