import { Injectable } from '@nestjs/common';
import { MercadopagoService } from '../mercadopago/mercadopago.service';
import { abrirCobroDto } from 'src/dto/abrir-cobro.dto';

const NOTIFICATION_URL = 'https://nice-papayas-ring.loca.lt/mercadopago/webhook';

@Injectable()
export class CobrosService {
    constructor(private readonly mercadopagoService: MercadopagoService) { }

    async abrirCobro(data: abrirCobroDto) {
        console.log('Datos para abrir cobro:', data);
        const preferenceData = {
            items: [
                {
                    id: '1',
                    title: String(data.titulo),
                    quantity: 1,
                    unit_price: Number(data.monto),
                    currency_id: 'ARS',
                },
            ],
            back_urls: {
                success: 'https://localhost:4200/pantalla-exito',
                failure: 'http://localhost:4200/pantalla-fracaso',
                pending: 'http://localhost:4200/pantalla-pendiente',
            },
            auto_return: 'approved',
            notification_url: NOTIFICATION_URL,
        };
        try {
            return await this.mercadopagoService.crearPreferencia(preferenceData);
        } catch (error) {
            console.error('ERROR DETALLADO MP:', error.response?.data || error);
            throw error;
        }
    }
}
