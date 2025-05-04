import { Injectable } from '@nestjs/common';
import { TicketsDomainService } from 'src/tickets/domain';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsDomainService: TicketsDomainService) {}

  public async getAvailableTicketsMP() {
    return await this.ticketsDomainService.getAvailableTicketsMP();
  }

  public async getAvailableCaminoIncaDD() {
    return await this.ticketsDomainService.getAvailableCaminoIncaDD();
  }

  public async getAvailableCaminoIncaCD() {
    return await this.ticketsDomainService.getAvailableCaminoIncaCD();
  }
}
