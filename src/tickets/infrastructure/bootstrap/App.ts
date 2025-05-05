// backend/src/tickets/infrastructure/bootstrap/App.ts
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import handleRequest from './HandlerCore';  // Importamos el manejador de solicitudes
import middy from '@middy/core';  // Usamos middy para manejar la función

let appContext: INestApplicationContext;

const bootstrap = async (event) => {
  if (!appContext) {
    // Creamos el contexto de NestJS solo una vez
    appContext = await NestFactory.createApplicationContext(AppModule);
  }

  const { action } = event;  // Extraemos la acción del evento
  console.log('event', event);

  // Llamamos al manejador con el contexto y la acción
  return handleRequest(appContext, action);
};

// Exportamos el handler con middy, sin middlewares innecesarios
export const handler = middy(bootstrap);
