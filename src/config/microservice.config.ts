import { registerAs } from '@nestjs/config';

export const MicroserviceConfig = registerAs('microservice', () => ({
  auth: {
    host: process.env.AUTH_SERVICE_HOST,
    port: process.env.AUTH_SERVICE_PORT,
  },
  user: {
    host: process.env.USER_SERVICE_HOST,
    port: process.env.USER_SERVICE_PORT,
  },
}));
