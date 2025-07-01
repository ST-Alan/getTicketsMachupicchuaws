// src/tickets/infrastructure/bootstrap/lambda-entry.ts

// Polyfill para la Web Crypto API. Es importante que esté al principio.
if (typeof globalThis.crypto === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
  const crypto = require('crypto');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  (globalThis as any).crypto = crypto.webcrypto;
}

import 'reflect-metadata';

export * from './App';