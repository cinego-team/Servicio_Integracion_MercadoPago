import { Body, Controller, Post } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadopagoController {
    constructor(private readonly mercadopagoService: MercadopagoService) { }
    @Post('webhook')
    recibirWebhook(@Body() body) {
        console.log('Webhook recibido:', body);
        this.mercadopagoService.cerrarCobro(body);
    }
}
