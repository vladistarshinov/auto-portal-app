import { Test, TestingModule } from '@nestjs/testing';
import { AutoController } from '../auto.controller';

describe('AutoController', () => {
  let controller: AutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoController],
    }).compile();

    controller = module.get<AutoController>(AutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
