import { Inject, Injectable } from '@nestjs/common';
import { Preference } from 'mercadopago';
import { axiosServicioVentas } from 'src/axios_service/axios.client';
import { config } from 'src/axios_service/env';

@Injectable()
export class MercadopagoService {
    constructor(@Inject('MERCADOPAGO_CLIENT') private readonly mpClient) {}

    async crearPreferencia(payload: any) {
        const preference = new Preference(this.mpClient);
        return await preference.create(payload);
    }

    async cerrarCobro(body: any) {
        const status = body.data.status;
        const ventaId = body.data.metadata?.ventaId;
        const usuarioId = body.data.metadata?.usuarioId;

        await axiosServicioVentas.post(
            config.MSVentasUrls.cerrarCobroById(ventaId),
            { status, ventaId, usuarioId },
        );
    }
}
