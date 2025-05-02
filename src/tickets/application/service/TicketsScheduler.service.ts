import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { TicketsService } from "./Tickets.service";

@Injectable()
export class TicketsSchedulerService {
  private readonly logger = new Logger(TicketsSchedulerService.name);

  constructor(
    private readonly ticketsService: TicketsService,
  ) {}

  @Cron('*/15 * * * *')
  async handleCron(): Promise<void> {
    this.logger.log('🕒 Iniciando tarea programada para sincronizar disponibilidad');

    try {
      await this.ticketsService.getAvailableTicketsMP();
      await this.ticketsService.getAvailableCaminoIncaCD();
      await this.ticketsService.getAvailableCaminoIncaDD();
      this.logger.log('✅ Sincronización de tickets completada correctamente');
    } catch (err) {
      this.logger.error('❌ Error en sincronización automática', err.stack);
    }
  }
}
