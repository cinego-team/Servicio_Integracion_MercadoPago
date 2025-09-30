import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CobrosModule } from './cobros/cobros.module';
import { MercagopagoModule } from './mercagopago/mercagopago.module';

@Module({
  imports: [CobrosModule, MercagopagoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
