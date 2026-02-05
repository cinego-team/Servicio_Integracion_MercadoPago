import { Injectable } from '@nestjs/common';
import { MercadopagoService } from '../mercadopago/mercadopago.service';
import { abrirCobroDto } from 'src/dto/abrir-cobro.dto';

const NOTIFICATION_URL = 'https://servicio-integracion-mercado-pago.vercel.app/mercadopago/webhook';

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
                success: 'https://fronted-usuario.vercel.app/pantalla-exito',
                failure: 'https://fronted-usuario.vercel.app/pantalla-fracaso',
                pending: 'https://fronted-usuario.vercel.app/pantalla-pendiente',
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
