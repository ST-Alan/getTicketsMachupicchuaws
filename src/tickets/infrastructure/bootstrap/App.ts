// backend/src/tickets/infrastructure/bootstrap/App.ts
import 'reflect-metadata';

import { INestApplicationContext, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import handleRequest from './HandlerCore';
import middy from '@middy/core';
import { Handler } from 'aws-lambda';
import * as crypto from 'crypto';
(globalThis as Record<string, unknown>).crypto = crypto;

const logger = new Logger('LambdaBootstrap');

// 1. Tipo completo para el evento Lambda
interface LambdaEvent {
  action: string;
  body?: unknown;
  headers?: Record<string, string>;
  queryStringParameters?: Record<string, string>;
  pathParameters?: Record<string, string>;
}

let appContext: INestApplicationContext;

// 2. Handler con tipado estricto
const bootstrap: Handler<LambdaEvent> = async (event: LambdaEvent) => {
  // Log de inicio con fecha y hora en formato dd/mm/aa HH:MM:SS
  const now = new Date();
  const fecha = now.toLocaleDateString('es-ES');
  const hora = now.toLocaleTimeString('es-ES', { hour12: false });
  logger.log(`Iniciamos en ${fecha} ${hora}`);

  if (!appContext) {
    appContext = await NestFactory.createApplicationContext(AppModule);
  }

  // 3. Destructuración con tipo seguro
  const { action } = event;
  console.log('Event action:', action);

  // 4. Ejecución con tipos validados
  return handleRequest(appContext, action);
};

export const handler = middy(bootstrap);
