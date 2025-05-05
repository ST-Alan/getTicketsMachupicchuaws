// backend/src/tickets/infrastructure/bootstrap/App.ts
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import handleRequest from './HandlerCore';
import middy from '@middy/core';
import { Handler } from 'aws-lambda';

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
