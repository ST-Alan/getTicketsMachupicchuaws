// tickets-plugin-mp.ts
import { Logger, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { TicketAvailability, TicketsPlugin } from 'src/tickets/domain/interface';


export class TicketsPluginsCIDD implements TicketsPlugin,OnModuleInit {
  private readonly logger = new Logger(TicketsPluginsCIDD.name);

  constructor(
    private readonly user: string,
    private readonly service: string,
    private readonly format: string,
    private readonly baseUrl = 'https://camino-inca.com/partner/api',
  ) {}

  onModuleInit() {
    if (!this.user || !this.service || !this.format) {
      this.logger.warn(
        '⚠️ CAMINO_INCA_USER, CAMINO_INCA_SERVICE o CAMINO_INCA_FORMAT no están definidas en el entorno. -->backend\\src\\tickets\\infrastructure\\plugins\\TicketsPluginsCIDD.plugins.ts',
      );
    } else {
      this.logger.log('✅ TicketsPluginsMP configurado correctamente.');
    }
  }

  async fetchTickets(): Promise<TicketAvailability[]> {
    const url = `${this.baseUrl}?user=${this.user}&service=${this.service}&format=${this.format}`;
    try {
      const response = await axios.get(url);
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format');
      }
      return response.data.map(ticket => ({
        date: ticket.date,
        service: ticket.service,
        spaces: ticket.spaces,
      })) as TicketAvailability[];
    } catch (error) {
      this.logger.error('❌ Error fetching tickets', error.stack);
      throw new Error('Failed to fetch tickets from Camino Inca Dos Días API');
    }
  }
}
