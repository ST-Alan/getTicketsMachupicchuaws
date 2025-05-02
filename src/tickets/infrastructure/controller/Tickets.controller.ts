import { Controller, Get} from '@nestjs/common';
import { TicketsService } from 'src/tickets/application';

@Controller('tickets')
export class TicketsController {

    constructor(private readonly ticketsService: TicketsService) {}
    @Get('entradas-machu-picchu')
    public async getAvailableTicketsMP() {
        return this.ticketsService.getAvailableTicketsMP();
    }

    @Get('camino-inca-dos-dias')
    public async getAvailableTicketsCIDD() {
        return { };
    }
    @Get('camino-inca-cuatro-dias')
    public async getAvailableTicketsCICD() {
        return { };
    }
}
