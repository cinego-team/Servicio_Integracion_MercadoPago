import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CobrosModule } from './cobros/cobros.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), 
        CobrosModule, 
        MercadopagoModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}