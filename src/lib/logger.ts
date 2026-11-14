import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ['authorization', 'cookie', 'password', 'token'],
    censor: '[REDACTED]',
  },
});

