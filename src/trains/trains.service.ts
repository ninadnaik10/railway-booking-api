import { Injectable, NotFoundException } from '@nestjs/common';
import { Train } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TrainsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.train.findMany();
  }

  async addTrain(train: Train) {
    try {
      return await this.prisma.train.create({
        data: { ...train, id: uuidv4() },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAvailableTrains({
    source,
    destination,
  }: {
    source: string;
    destination: string;
  }) {
    try {
      const trains = await this.prisma.train.findMany({
        where: { source, destination },
      });
      if (trains.length === 0) {
        throw new NotFoundException('No trains found');
      }
      return trains;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
