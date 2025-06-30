// src/tickets/infrastructure/entity/ticket-availability.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'ticket_availability' })
@Unique(['date', 'service', 'type'])
export class TicketAvailabilityEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column()
  service!: string;

  @Column()
  spaces!: number;

  @Column()
  type!: string; // 'MP', 'CICD', 'CIDD'
}
