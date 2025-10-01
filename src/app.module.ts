import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CobrosModule } from './cobros/cobros.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';

@Module({
    imports: [CobrosModule, MercadopagoModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
