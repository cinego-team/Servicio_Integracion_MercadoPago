import { Test, TestingModule } from '@nestjs/testing';
import { MercagopagoController } from './mercagopago.controller';
import { MercagopagoService } from './mercagopago.service';

describe('MercagopagoController', () => {
  let controller: MercagopagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercagopagoController],
      providers: [MercagopagoService],
    }).compile();

    controller = module.get<MercagopagoController>(MercagopagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
