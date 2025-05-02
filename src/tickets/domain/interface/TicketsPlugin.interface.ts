export interface TicketAvailability {
  date: string;
  service: string;
  spaces: number;
}

export interface TicketsPlugin {
    fetchTickets(): Promise<TicketAvailability[]>;
  }
  