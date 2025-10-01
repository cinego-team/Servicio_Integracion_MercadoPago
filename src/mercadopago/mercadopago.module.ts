import { Module } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { MercadopagoController } from './mercadopago.controller';
import { MercadoPagoConfig } from 'mercadopago';

@Module({
    controllers: [MercadopagoController],
    providers: [
        MercadopagoService,
        {
            provide: 'MERCADOPAGO_CLIENT',
            useFactory: () => {
                return new MercadoPagoConfig({
                    accessToken: process.env.MP_ACCESS_TOKEN as string,
                });
            },
        },
    ],
})
export class MercadopagoModule {}
