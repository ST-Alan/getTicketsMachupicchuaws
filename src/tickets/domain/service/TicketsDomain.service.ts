import { Inject, Injectable, Logger } from '@nestjs/common';
import { TicketsPluginFactoryInterface, TicketsRepository } from '../interface';
import { TicketsPluginFactory } from 'src/tickets/infrastructure/plugins';

@Injectable()
export class TicketsDomainService {
  private readonly logger = new Logger(TicketsDomainService.name);
  constructor(
    @Inject(TicketsPluginFactory)
    private readonly pluginFactory: TicketsPluginFactoryInterface,
    @Inject('TicketsRepository')
    private readonly ticketsRepository: TicketsRepository,
  ) {}

  public async getAvailableTicketsMP() {
    this.logger.log('Consultando tickets MP...');
    console.log('Factory in Domain:', this.pluginFactory);
    const plugin = this.pluginFactory.getPlugin('MP');
    this.logger.log('Plugin MP obtenido:', plugin);
    
    // 💡 Validación de existencia del plugin
    console.log('Plugin MP desde Factory:', plugin);
    if (!plugin) throw new Error('Plugin MP no definido desde la fábrica');
    
    const tickets = await plugin.fetchTickets();
    this.logger.log(`Tickets MP obtenidos: ${tickets.length}`);
    await this.ticketsRepository.saveTickets(tickets, 'MP');
    this.logger.log('Tickets MP guardados en la base de datos.');
  }

  public async getAvailableCaminoIncaDD() {
    this.logger.log('Consultando tickets CIDD...');
    const plugin = this.pluginFactory.getPlugin('CIDD');
    const tickets = await plugin.fetchTickets();
    this.logger.log(`Tickets CIDD obtenidos: ${tickets.length}`);
    await this.ticketsRepository.saveTickets(tickets, 'CIDD');
    this.logger.log('Tickets CIDD guardados en la base de datos.');
  }

  public async getAvailableCaminoIncaCD() {
    this.logger.log('Consultando tickets CICD...');
    const plugin = this.pluginFactory.getPlugin('CICD');
    const tickets = await plugin.fetchTickets();
    this.logger.log(`Tickets CICD obtenidos: ${tickets.length}`);
    await this.ticketsRepository.saveTickets(tickets, 'CICD');
    this.logger.log('Tickets CICD guardados en la base de datos.');
  }
}
