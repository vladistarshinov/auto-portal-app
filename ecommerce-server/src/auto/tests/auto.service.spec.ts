import { Test, TestingModule } from '@nestjs/testing';
import { AutoService } from '../auto.service';

describe('AutoService', () => {
  let service: AutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoService],
    }).compile();

    service = module.get<AutoService>(AutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
