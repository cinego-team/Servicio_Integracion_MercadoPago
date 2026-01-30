import { Inject, Injectable } from '@nestjs/common';
import { Preference } from 'mercadopago';
import { axiosServicioVentas } from 'src/axios_service/axios.client';
import { config } from 'src/axios_service/env';

type MercadoPagoStatus =
    | 'approved'
    | 'pending'
    | 'rejected'
    | 'in_process'
    | 'cancelled';

@Injectable()
export class MercadopagoService {
    constructor(@Inject('MERCADOPAGO_CLIENT') private readonly mpClient) { }

    async crearPreferencia(payload: any) {
        const preference = new Preference(this.mpClient);
        return await preference.create({ body: payload });
    }

    async cerrarCobro(body: any) {
        const status: MercadoPagoStatus = body.data.status;
        const ventaId = body.data.metadata?.ventaId;
        const usuarioId = body.data.metadata?.usuarioId;
        const disponibilidadButacaIds =
            body.data.metadata?.disponibilidadButacaIds;

        await axiosServicioVentas.post(
            config.MSVentasUrls.cerrarCobroById(ventaId),
            { status, ventaId, usuarioId, disponibilidadButacaIds },
        );
    }
}
