import 'reflect-metadata';
import * as crypto from 'crypto';
(globalThis as Record<string, unknown>).crypto = crypto;
console.log('>>> CRYPTO ASIGNADO EN ENTRYPOINT');

export * from './App';