import { Module } from '@nestjs/common';

import { TicketsModule } from '../controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TicketsModule
  ],
})
export class AppModule {}
