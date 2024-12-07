import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TrainsService } from './trains.service';
import { Prisma, Train } from '@prisma/client';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.trainsService.findAll();
  }

  @UseGuards(ApiKeyGuard)
  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  async addTrain(@Body() train: Train) {
    return await this.trainsService.addTrain(train);
  }

  @UseGuards(AuthGuard)
  @Post('/available-trains')
  @HttpCode(HttpStatus.OK)
  async getAvailableTrains(
    @Body()
    {
      source,
      destination,
      orderBy,
      page,
      pageSize,
    }: {
      source: string;
      destination: string;
      orderBy?: Prisma.UserOrderByWithRelationInput;
      page?: number;
      pageSize?: number;
    },
  ) {
    if (!source || !destination) {
      throw new BadRequestException('Source and destination are required');
    }
    try {
      return await this.trainsService.getAvailableTrains({
        source,
        destination,
        orderBy: orderBy || {},
        page: page || 1,
        pageSize: pageSize || 10,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
