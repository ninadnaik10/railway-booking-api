import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TrainsService } from './trains.service';
import { Train } from '@prisma/client';

@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.trainsService.findAll();
  }

  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  async addTrain(@Body() train: Train) {
    return await this.trainsService.addTrain(train);
  }
  @Post('/available-trains')
  @HttpCode(HttpStatus.OK)
  async getAvailableTrains(
    @Body() { source, destination }: { source: string; destination: string },
  ) {
    if (!source || !destination) {
      throw new BadRequestException('Source and destination are required');
    }
    try {
      return await this.trainsService.getAvailableTrains({
        source,
        destination,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
