import { Body, Controller, Post } from '@nestjs/common';
import { CobrosService } from './cobros.service';
import { abrirCobroDto } from 'src/dto/abrir-cobro.dto';

@Controller('cobros')
export class CobrosController {
    constructor(private readonly service: CobrosService) {}
    @Post()
    abrirCobro(@Body() data: abrirCobroDto) {
        return this.service.abrirCobro(data);
    }
}
