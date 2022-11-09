import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  httpPort: process.env.HTTP_PORT || 4002,
  microservicePort: process.env.MICROSERVICE_PORT || 10002,
  cors: {
    origin: true,
    credentials: true,
  },
}));
