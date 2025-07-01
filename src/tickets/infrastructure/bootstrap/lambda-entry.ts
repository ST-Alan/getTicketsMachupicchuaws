// Polyfill para la Web Crypto API. Es importante que esté al principio.
if (typeof globalThis.crypto === 'undefined') {
  const crypto = require('crypto');
  (globalThis as any).crypto = crypto.webcrypto;
}

import 'reflect-metadata';

// El resto de tus exportaciones.
export * from './App';