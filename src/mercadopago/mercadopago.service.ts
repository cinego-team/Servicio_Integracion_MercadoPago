import { Inject, Injectable } from '@nestjs/common';
import { Preference } from 'mercadopago';
import { axiosServicioVentas } from 'src/axios_service/axios.client';
import { config } from 'src/axios_service/env';
import axios from 'axios';

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
        try {
            const { action, data, type } = body;
            if (type !== 'payment') {
                console.log('Tipo de evento no manejado:', type);
                return;
            } else {
                const paymentId = data.id;
                const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
                });
                const paymentData = response.data;
                console.log('response', paymentData);
                const status = paymentData.status;

                const ventaId = paymentData.metadata.venta_id;
                const usuarioId = paymentData.metadata.usuario_id;
                const disponibilidadButacaIds =
                    paymentData.metadata.disponibilidad_butaca_ids;

                console.log(`Pago ${paymentId}Estado: ${status} para Venta: ${ventaId}`);
                console.log(`Estado: ${status}`);
                console.log(`Venta: ${ventaId}`);
                console.log(`Usuario: ${usuarioId}`);
                console.log(`Disponibilidad Butacas: ${disponibilidadButacaIds}`);
                await axiosServicioVentas.post(
                    config.MSVentasUrls.cerrarCobroById(ventaId),
                    { status, ventaId, usuarioId, disponibilidadButacaIds },
                );
            }
        } catch (error) {
            console.log("Error al procesar webhook:", error.response?.data || error);
        }
    }
}