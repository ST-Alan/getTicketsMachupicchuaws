// tickets-plugin-mp.ts
import { Logger, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import {
  TicketAvailability,
  TicketsPlugin,
} from 'src/tickets/domain/interface';

export class TicketsPluginsMP implements TicketsPlugin, OnModuleInit {
  private readonly logger = new Logger(TicketsPluginsMP.name);

  constructor(
    private readonly user: string,
    private readonly service: string,
    private readonly format: string,
    private readonly baseUrl = 'https://camino-inca.com/partner/api',
  ) {}

  onModuleInit() {
    if (!this.user || !this.service || !this.format) {
      this.logger.warn(
        '⚠️ CAMINO_INCA_USER, CAMINO_INCA_SERVICE o CAMINO_INCA_FORMAT no están definidas en el entorno. --> backend\\src\\tickets\\infrastructure\\plugins\\TicketsPluginsMP.plugins.ts',
      );
    } else {
      this.logger.log('✅ TicketsPluginsMP configurado correctamente.');
    }
  }

  async fetchTickets(): Promise<TicketAvailability[]> {
    this.logger.log('Iniciando petición a Camino Inca MP...');
    const url = `${this.baseUrl}?user=${this.user}&service=${this.service}&format=${this.format}`;
    this.logger.log(`URL solicitada: ${url}`);
    try {
      const response = await axios.get(url);
      this.logger.log('Respuesta recibida de Camino Inca MP');
      this.logger.log(`Respuesta completa: ${JSON.stringify(response.data)}`);
      if (!Array.isArray(response.data)) {
        this.logger.error('Formato de respuesta inválido');
        throw new Error('Invalid response format');
      }
      this.logger.log(`Tickets MP obtenidos: ${response.data.length}`);
      return response.data as TicketAvailability[];
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('❌ Error fetching tickets', error.stack);
      } else {
        this.logger.error('❌ Error fetching tickets', String(error));
      }
      throw new Error('Failed to fetch tickets from Camino Inca Dos Días API');
    }
  }
}
