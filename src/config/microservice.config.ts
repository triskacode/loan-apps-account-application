import { registerAs } from '@nestjs/config';

export const MicroserviceConfig = registerAs('microservice', () => ({
  auth: {
    host: process.env.AUTH_SERVICE_HOST,
    port: process.env.AUTH_SERVICE_PORT,
  },
}));
