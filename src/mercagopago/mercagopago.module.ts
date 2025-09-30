import { Module } from '@nestjs/common';
import { MercagopagoService } from './mercagopago.service';
import { MercagopagoController } from './mercagopago.controller';

@Module({
  controllers: [MercagopagoController],
  providers: [MercagopagoService],
})
export class MercagopagoModule {}
