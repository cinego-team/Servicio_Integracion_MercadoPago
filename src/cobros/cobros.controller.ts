import { Controller } from '@nestjs/common';
import { CobrosService } from './cobros.service';

@Controller('cobros')
export class CobrosController {
  constructor(private readonly cobrosService: CobrosService) {}
}
