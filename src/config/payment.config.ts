import { registerAs } from '@nestjs/config';

export const PaymentConfig = registerAs('payment', () => ({
  currency: 'usd',
  stripe: {
    apiSecretKey: process.env.STRIPE_API_SECRET_KEY,
    endpointSecretKey: process.env.STRIPE_ENDPOINT_SECRET,
  },
}));
