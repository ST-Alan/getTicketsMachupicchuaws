import { Module } from '@nestjs/common';
import { TicketsController } from './Tickets.controller';
import { TicketsService } from 'src/tickets/application';
import { TicketsDomainService } from 'src/tickets/domain';
import { TicketsPluginFactory, TicketsPluginsCICD, TicketsPluginsCIDD, TicketsPluginsMP } from '../plugins';
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
          port: Number(process.env.DB_PORT),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [TicketAvailabilityEntity],
          //synchronize: true, // ⚠️ Solo para desarrollo
        }),
        inject: [ConfigService],
      }),
      TypeOrmModule.forFeature([TicketAvailabilityEntity]),
      TicketsSchedulerService,
    ],
    controllers: [TicketsController],
    providers: [
      TicketsService,
      TicketsDomainService,
      TicketsPluginFactory,
      // Plugin MP
      {
        provide: 'MP_PLUGIN',
        useFactory: () => new TicketsPluginsMP(
          process.env.CAMINO_INCA_USER || '',
          process.env.CAMINO_INCA_SERVICE || '',
          process.env.CAMINO_INCA_FORMAT || '',
        ),
      },
      // Plugin CICD
      {
      provide: 'CICD_PLUGIN',
      useFactory: () => new TicketsPluginsCICD(
        process.env.CICD_USER || '',
        process.env.CAMINO_INCA_SERVICE_CD || '',
        process.env.CICD_FORMAT || '',
      ),
      },
      // Plugin CICD
      {
        provide: 'CIDD_PLUGIN',
        useFactory: () => new TicketsPluginsCIDD(
          process.env.CICD_USER || '',
          process.env.CAMINO_INCA_SERVICE_DD || '',
          process.env.CICD_FORMAT || '',
        ),
      },
      {
        provide: 'TicketsRepository',
        useClass: TicketsRepository
      },
    ],
  })
export class TicketsModule {}
