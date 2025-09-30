import { Test, TestingModule } from '@nestjs/testing';
import { MercagopagoService } from './mercagopago.service';

describe('MercagopagoService', () => {
  let service: MercagopagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercagopagoService],
    }).compile();

    service = module.get<MercagopagoService>(MercagopagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
