import { Injectable } from '@nestjs/common';
import { MercadopagoService } from '../mercadopago/mercadopago.service';
import { abrirCobroDto } from 'src/dto/abrir-cobro.dto';

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
                success: `${process.env.URL_FRONTEND_USUARIO}/pantalla-exito`,
                failure: `${process.env.URL_FRONTEND_USUARIO}/pantalla-fracaso`,
                pending: `${process.env.URL_FRONTEND_USUARIO}/pantalla-pendiente`,
            },
            auto_return: 'approved',
            notification_url: `${process.env.URL_MS_MERCADOPAGO}/mercadopago/webhook`,
        };
        try {
            return await this.mercadopagoService.crearPreferencia(preferenceData);
        } catch (error) {
            console.error('ERROR DETALLADO MP:', error.response?.data || error);
            throw error;
        }
    }
}
