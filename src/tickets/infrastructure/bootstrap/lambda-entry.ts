// src/tickets/infrastructure/bootstrap/lambda-entry.ts
import 'reflect-metadata';
import * as dotenv from 'dotenv';

// Solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}


export * from './App';
