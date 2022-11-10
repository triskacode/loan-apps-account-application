import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('payment.stripe.key'), {
      apiVersion: '2022-08-01',
    });
  }

  async createCustumer(email: string) {
    return this.stripe.customers.create({ email });
  }

  async deleteCustumer(customerId: string) {
    return this.stripe.customers.del(customerId);
  }
}
