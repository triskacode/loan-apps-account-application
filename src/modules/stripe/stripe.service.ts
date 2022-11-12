import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    if (!configService.get('payment.stripe.apiSecretKey')) {
      throw new Error('Missing env var STRIPE_API_SECRET_KEY');
    }

    if (!configService.get('payment.stripe.endpointSecretKey')) {
      throw new Error('Missing env var STRIPE_ENDPOINT_SECRET');
    }

    this.stripe = new Stripe(configService.get('payment.stripe.apiSecretKey'), {
      apiVersion: '2022-08-01',
    });
  }

  async constructWebhookEvent(dto: string | Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(
      dto,
      signature,
      this.configService.get('payment.stripe.endpointSecretKey'),
    );
  }

  async createCustumer(email: string) {
    return this.stripe.customers.create({ email });
  }

  async deleteCustumer(id: string) {
    return this.stripe.customers.del(id);
  }

  async createPaymentIntens(customerId: string, amount: number) {
    const result = await this.stripe.paymentIntents.create({
      customer: customerId,
      amount: amount,
      currency: this.configService.get('payment.currency'),
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return result;
  }
}
