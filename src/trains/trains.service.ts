import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Train } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrainsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.train.findMany();
  }

  async addTrain(train: Train) {
    return await this.prisma.train.create({
      data: { ...train, id: uuidv4() },
    });
  }

  async getAvailableTrains({
    source,
    destination,
    orderBy,
    page = 1,
    pageSize = 10,
  }: {
    source: string;
    destination: string;
    orderBy?: Prisma.TrainOrderByWithRelationInput;
    page?: number;
    pageSize?: number;
  }) {
    const skip = (page - 1) * pageSize;

    const [totalTrains, trains] = await Promise.all([
      this.prisma.train.count({
        where: { source, destination },
      }),
      this.prisma.train.findMany({
        where: { source, destination },
        skip,
        take: pageSize,
        orderBy,
      }),
    ]);

    if (trains.length === 0) {
      throw new NotFoundException('No trains found');
    }

    return {
      trains,
      pagination: {
        totalTrains,
        currentPage: page,
        pageSize,
        totalPages: Math.ceil(totalTrains / pageSize),
      },
    };
  }
}
