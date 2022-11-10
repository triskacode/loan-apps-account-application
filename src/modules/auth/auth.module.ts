import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_APPLICATION',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('microservice.auth.host'),
            port: configService.get('microservice.auth.port'),
          },
        }),
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
