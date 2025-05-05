import { Inject, Injectable } from '@nestjs/common';
import { TicketsPluginFactoryInterface, TicketsRepository } from '../interface';

@Injectable()
export class TicketsDomainService {
  constructor(
    @Inject('TicketsPluginFactory')
    private readonly pluginFactory: TicketsPluginFactoryInterface,
    @Inject('TicketsRepository')
    private readonly ticketsRepository: TicketsRepository,
  ) {}

  public async getAvailableTicketsMP() {
    const plugin = this.pluginFactory.getPlugin('MP');
    const tickets = await plugin.fetchTickets();
    await this.ticketsRepository.saveTickets(tickets, 'MP');
  }

  public async getAvailableCaminoIncaDD() {
    const plugin = this.pluginFactory.getPlugin('CIDD');
    const tickets = await plugin.fetchTickets();
    await this.ticketsRepository.saveTickets(tickets, 'CIDD');
  }

  public async getAvailableCaminoIncaCD() {
    const plugin = this.pluginFactory.getPlugin('CICD');
    const tickets = await plugin.fetchTickets();
    await this.ticketsRepository.saveTickets(tickets, 'CICD');
  }
}
