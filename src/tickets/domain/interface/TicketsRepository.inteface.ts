// backend/src/tickets/domain/repository/TicketsRepository.interface.ts
import { TicketAvailability } from '../interface/TicketsPlugin.interface';

export interface TicketsRepository {
  saveTickets(tickets: TicketAvailability[], type: string): Promise<void>;
}
