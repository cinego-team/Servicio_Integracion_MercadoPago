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
                const token = process.env.MP_ACCESS_TOKEN?.trim(); // .trim() quita espacios accidentales
                
                if (!token) {
                    console.error('CRÍTICO: No se encontró el Access Token en el .env');
                }

                return new MercadoPagoConfig({
                    accessToken: token || '', 
                });
            },
        },
    ],
    exports: [MercadopagoService],
})
export class MercadopagoModule {}
