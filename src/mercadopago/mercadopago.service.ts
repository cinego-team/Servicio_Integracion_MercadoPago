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
    constructor(@Inject('MERCADOPAGO_CLIENT') private readonly mpClient) {}
    /**
     * Crea una preferencia de pago en Mercado Pago.
     *
     * Recibe un payload con los datos de la compra (items, metadata, URLs de retorno, etc.)
     * y genera una preferencia que luego será utilizada para iniciar el proceso de pago.
     *
     * @param payload Objeto con la información necesaria para crear la preferencia.
     * @returns Respuesta de Mercado Pago con los datos de la preferencia creada.
     */

    async crearPreferencia(payload: any) {
        const preference = new Preference(this.mpClient);
        return await preference.create({ body: payload });
    }
    /**
     * Procesa la notificación (webhook) enviada por Mercado Pago.
     *
     * - Verifica que el tipo de notificación sea de tipo "payment".
     * - Consulta el detalle del pago utilizando el paymentId.
     * - Obtiene el estado del pago y los datos almacenados en metadata.
     * - Llama al microservicio de ventas para cerrar la venta con el estado correspondiente.
     *
     * @param body Cuerpo recibido desde el webhook de Mercado Pago.
     * @returns Promise<void>
     */
    async cerrarCobro(body: any) {
        try {
            const { action, data, type } = body;
            if (type !== 'payment') {
                return;
            } else {
                const paymentId = data.id;
                const response = await axios.get(
                    `https://api.mercadopago.com/v1/payments/${paymentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                        },
                    },
                );
                const paymentData = response.data;

                const status = paymentData.status;

                const ventaId = paymentData.metadata.venta_id;
                const usuarioId = paymentData.metadata.usuario_id;
                const disponibilidadButacaIds =
                    paymentData.metadata.disponibilidad_butaca_ids;
                const titulo = paymentData.metadata.titulo;
                const fechaFuncion = paymentData.metadata.fecha_funcion;
                const horaFuncion = paymentData.metadata.hora_funcion;

                await axiosServicioVentas.post(
                    config.MSVentasUrls.cerrarCobroById(ventaId),
                    {
                        status,
                        ventaId,
                        usuarioId,
                        disponibilidadButacaIds,
                        titulo,
                        fechaFuncion,
                        horaFuncion,
                    },
                );
            }
        } catch (error) {}
    }
}
