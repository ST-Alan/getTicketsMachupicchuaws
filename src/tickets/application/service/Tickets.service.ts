import { Injectable } from '@nestjs/common';
import { TicketsDomainService } from 'src/tickets/domain';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsDomainService: TicketsDomainService) {
    console.log('Constructor TicketsService:', ticketsDomainService);
  }

  public async getAvailableTicketsMP() {
    console.log('TicketsDomainService in TicketsService:', this.ticketsDomainService);

    return await this.ticketsDomainService.getAvailableTicketsMP();
  }

  public async getAvailableCaminoIncaDD() {
    return await this.ticketsDomainService.getAvailableCaminoIncaDD();
  }

  public async getAvailableCaminoIncaCD() {
    return await this.ticketsDomainService.getAvailableCaminoIncaCD();
  }
}
