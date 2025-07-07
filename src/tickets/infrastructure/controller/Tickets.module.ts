import { Module } from '@nestjs/common';
import { TicketsController } from './Tickets.controller';
import { TicketsService } from 'src/tickets/application';
import { TicketsDomainService } from 'src/tickets/domain';
import {
  TicketsPluginFactory,
  TicketsPluginsCICD,
  TicketsPluginsCIDD,
  TicketsPluginsMP,
} from '../plugins';
import { TicketsRepository } from '../repository/TicketsRepository.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketAvailabilityEntity } from '../entity/TicketsAviability.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TicketsSchedulerService } from 'src/tickets/application/service/TicketsScheduler.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [TicketAvailabilityEntity],
        //synchronize: true, // ⚠️ Solo para desarrollo
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([TicketAvailabilityEntity]),
    
  ],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    TicketsDomainService,
    TicketsPluginFactory,
    TicketsSchedulerService,
    // Plugin MP
    {
      provide: 'MP_PLUGIN',
      useFactory: (configService: ConfigService) =>
        new TicketsPluginsMP(
          configService.get<string>('CAMINO_INCA_USER') ?? '',
          configService.get<string>('CAMINO_INCA_SERVICE') ?? '',
          configService.get<string>('CAMINO_INCA_FORMAT') ?? '',
        ),
      inject: [ConfigService],
    },
    // Plugin CICD
    {
      provide: 'CICD_PLUGIN',
      useFactory: (configService: ConfigService) =>
        new TicketsPluginsCICD(
          configService.get<string>('CICD_USER') ?? '',
          configService.get<string>('CAMINO_INCA_SERVICE_CD') ?? '',
          configService.get<string>('CICD_FORMAT') ?? '',
        ),
      inject: [ConfigService],
    },
    // Plugin CICD
    {
      provide: 'CIDD_PLUGIN',
      useFactory: (configService: ConfigService) =>
        new TicketsPluginsCIDD(
          configService.get<string>('CICD_USER') ?? '',
          configService.get<string>('CAMINO_INCA_SERVICE_CD') ?? '',
          configService.get<string>('CICD_FORMAT') ?? '',
        ),
      inject: [ConfigService],
    },
    {
      provide: 'TicketsRepository',
      useClass: TicketsRepository,
    },
  ],
})
export class TicketsModule {}
