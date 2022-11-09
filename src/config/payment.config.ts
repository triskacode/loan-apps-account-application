import { registerAs } from '@nestjs/config';

export const PaymentConfig = registerAs('payment', () => ({
  stripe: {
    key: process.env.STRIPE_SECRET_KEY,
  },
}));
