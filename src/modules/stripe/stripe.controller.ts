import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  createCustomer(@Body('email') email: string) {
    return this.stripeService.createCustumer(email);
  }
}
