import { Controller, Get } from '@nestjs/common';
import { TicketsService } from 'src/tickets/application';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}
  @Get('entradas-machu-picchu')
  public async getAvailableTicketsMP() {
    return this.ticketsService.getAvailableTicketsMP();
  }
  @Get('test-sync-mp')
  public async testPluginMP(): Promise<string> {
    try {
      await this.ticketsService.getAvailableTicketsMP();
      return '✅ Sincronización MP ejecutada correctamente';
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.stack);
        return `❌ Error: ${error.message}`;
      } else {
        console.error('Error desconocido:', error);
        return '❌ Error desconocido durante sincronización MP';
      }
    }
  }
}


