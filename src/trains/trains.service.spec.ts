import { Test, TestingModule } from '@nestjs/testing';
import { TrainsService } from './trains.service';

describe('TrainsService', () => {
  let service: TrainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainsService],
    }).compile();

    service = module.get<TrainsService>(TrainsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
