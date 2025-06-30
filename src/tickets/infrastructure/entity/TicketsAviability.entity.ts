// src/tickets/infrastructure/entity/ticket-availability.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'ticket_availability' })
@Unique(['date', 'service', 'type'])
export class TicketAvailabilityEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'varchar' })
  service!: string;

  @Column({ type: 'int' })
  spaces!: number;

  @Column({ type: 'varchar' })
  type!: string; // 'MP', 'CICD', 'CIDD'
}
