import { Test, TestingModule } from '@nestjs/testing';
import { CrucesServicesService } from './cruces-services.service';

describe('CrucesServicesService', () => {
  let service: CrucesServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrucesServicesService],
    }).compile();

    service = module.get<CrucesServicesService>(CrucesServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
