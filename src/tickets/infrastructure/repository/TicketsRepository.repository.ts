// src/tickets/infrastructure/repository/TicketsRepository.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketAvailability, TicketsRepository as TicketsRepositoryInterface } from 'src/tickets/domain/interface'; // Importa la interfaz
import { Repository } from 'typeorm';
import { TicketAvailabilityEntity } from '../entity/TicketsAviability.entity';

@Injectable()
export class TicketsRepository implements TicketsRepositoryInterface { // Implementa la interfaz
  constructor(
    @InjectRepository(TicketAvailabilityEntity)
    private readonly ticketRepo: Repository<TicketAvailabilityEntity>,
  ) {}

  // Renombra este método para que coincida con la interfaz
  async saveTickets(
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