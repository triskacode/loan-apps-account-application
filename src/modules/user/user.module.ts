import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_APPLICATION',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('microservice.user.host'),
            port: configService.get('microservice.user.port'),
          },
        }),
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
