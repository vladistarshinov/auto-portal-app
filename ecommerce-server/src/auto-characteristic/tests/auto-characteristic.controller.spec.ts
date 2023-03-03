import { Test, TestingModule } from '@nestjs/testing';
import { AutoCharacteristicController } from '../auto-characteristic.controller';

describe('AutoCharacteristicsController', () => {
  let controller: AutoCharacteristicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoCharacteristicController],
    }).compile();

    controller = module.get<AutoCharacteristicController>(AutoCharacteristicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
