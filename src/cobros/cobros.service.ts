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
                success: `https://supervisor-major-activities-additional.trycloudflare.com/pantalla-exito`, //link solo valido para pc rama
                failure: `https://supervisor-major-activities-additional.trycloudflare.com/pantalla-fracaso`,
                pending: `https://supervisor-major-activities-additional.trycloudflare.com/pantalla-pendiente`,
            },
            auto_return: 'approved',
            notification_url: `https://susanne-tressured-fidel.ngrok-free.dev/mercadopago/webhook`, //link solo valido para pc rama
            metadata: {
                ventaId: data.ventaId,
                usuarioId: data.usuarioId,
                disponibilidadButacaIds: data.idsDisponibilidad,
            }
        };
        try {
            return await this.mercadopagoService.crearPreferencia(preferenceData);
        } catch (error) {
            console.error('ERROR DETALLADO MP:', error.response?.data || error);
            throw error;
        }
    }
}
