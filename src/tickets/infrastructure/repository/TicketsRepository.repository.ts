// src/tickets/infrastructure/repository/tickets.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketAvailability } from 'src/tickets/domain/interface';
import { Repository } from 'typeorm';
import { TicketAvailabilityEntity } from '../entity/TicketsAviability.entity';

@Injectable()
export class TicketsRepository {
  constructor(
    @InjectRepository(TicketAvailabilityEntity)
    private readonly ticketRepo: Repository<TicketAvailabilityEntity>,
  ) {}

  async saveOrUpdateTickets(
    tickets: TicketAvailability[],
    type: string,
  ): Promise<void> {
    for (const ticket of tickets) {
      await this.ticketRepo.upsert(
        {
          date: ticket.date,
          service: ticket.service,
          spaces: ticket.spaces,
          type,
        },
        ['date', 'service', 'type'], // Clave única compuesta
      );
    }
  }
}
