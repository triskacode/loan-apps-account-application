import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { MicroserviceConfig } from './config/microservice.config';
import { PaymentConfig } from './config/payment.config';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { StripeModule } from './modules/stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, PaymentConfig, MicroserviceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.get('database.name'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'advanced-console',
      }),
    }),
    AccountModule,
    StripeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
