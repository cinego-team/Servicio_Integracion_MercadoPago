import { Injectable } from '@nestjs/common';
import { MercadopagoService } from '../mercadopago/mercadopago.service';
import { abrirCobroDto } from 'src/dto/abrir-cobro.dto';

//const NOTIFICATION_URL = 'aca va el endpoint de webhook';
//const BACK_URLS = {
  //  success: 'http://localhost:4200/success', // Pon la URL real de tu frontend
    //failure: 'http://localhost:4200/failure',
   // pending: 'http://localhost:4200/pending',
//};

@Injectable()
export class CobrosService {
    constructor(private readonly mercadopagoService: MercadopagoService) { }

   async abrirCobro(data: abrirCobroDto) {
    const preferenceData = {
        body: {
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
                success: 'https://www.google.com',
                failure: 'https://www.google.com',
                pending: 'https://www.google.com',
            },
            auto_return: 'approved',
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
