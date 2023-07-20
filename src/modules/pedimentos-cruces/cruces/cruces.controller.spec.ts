import { Test, TestingModule } from '@nestjs/testing';
import { CrucesController } from './cruces.controller';

describe('Cruces Controller', () => {
  let controller: CrucesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrucesController],
    }).compile();

    controller = module.get<CrucesController>(CrucesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
