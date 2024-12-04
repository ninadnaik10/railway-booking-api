import { Module } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TrainsService, PrismaService],
  controllers: [TrainsController],
  imports: [],
})
export class TrainsModule {}
