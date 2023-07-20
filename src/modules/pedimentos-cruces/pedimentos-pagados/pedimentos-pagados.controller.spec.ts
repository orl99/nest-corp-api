import { Test, TestingModule } from '@nestjs/testing';
import { PedimentosPagadosController } from './pedimentos-pagados.controller';

describe('PedimentosPagados Controller', () => {
  let controller: PedimentosPagadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedimentosPagadosController],
    }).compile();

    controller = module.get<PedimentosPagadosController>(PedimentosPagadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
