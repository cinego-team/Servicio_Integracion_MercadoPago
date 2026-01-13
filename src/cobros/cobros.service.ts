import { Injectable } from '@nestjs/common';
import { MercadopagoService } from '../mercadopago/mercadopago.service';
import { abrirCobroDto } from 'src/dto/abrir-cobro.dto';

const NOTIFICATION_URL = 'aca va el endpoint de webhook';
const BACK_URLS = {
    success: 'pantalla de exito',
    failure: 'pantalla de fracaso',
    pending: 'pantalla de pendiente',
};

@Injectable()
export class CobrosService {
    constructor(private readonly mercadopagoService: MercadopagoService) { }

    async abrirCobro(data: abrirCobroDto) {
        const items = {
            title: `Entrada/s - ${data.titulo} (${data.fechaFuncion}, ${data.horaFuncion})`,
            quantity: 1,
            unit_price: data.monto,
            currency_id: 'ARS',
        };
        const payload = {
            items,
            metadata: {
                ventaId: data.ventaId,
                usuarioId: data.usuarioId,
                disponibilidadButacaIds: data.idsDisponibilidad,
                titulo: data.titulo,
                fecha: data.fechaFuncion,
                hora: data.horaFuncion,
            },
            notification_url: NOTIFICATION_URL,
            back_urls: BACK_URLS,
            auto_return: 'approved',
        };
        const response =
            await this.mercadopagoService.crearPreferencia(payload);
        return { init_point: response.init_point, id: response.id };
    }
}
