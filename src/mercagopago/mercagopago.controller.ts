import { Controller } from '@nestjs/common';
import { MercagopagoService } from './mercagopago.service';

@Controller('mercagopago')
export class MercagopagoController {
  constructor(private readonly mercagopagoService: MercagopagoService) {}
}
