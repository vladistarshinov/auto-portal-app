import { Test, TestingModule } from '@nestjs/testing';
import { AutoCharacteristicService } from '../auto-characteristic.service';

describe('AutoCharacteristicsService', () => {
  let service: AutoCharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoCharacteristicService],
    }).compile();

    service = module.get<AutoCharacteristicService>(AutoCharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
