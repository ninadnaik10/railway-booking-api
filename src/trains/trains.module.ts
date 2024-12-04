import { Module } from '@nestjs/common';
import { TrainsService } from './trains.service';

@Module({
  providers: [TrainsService],
})
export class TrainsModule {}
