import { Module } from '@nestjs/common';
import { CobrosService } from './cobros.service';
import { CobrosController } from './cobros.controller';
import { MercadopagoModule } from 'src/mercadopago/mercadopago.module';

@Module({
    controllers: [CobrosController],
    providers: [CobrosService],
    imports: [MercadopagoModule],
})
export class CobrosModule {}
