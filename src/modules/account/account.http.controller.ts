import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { User, UserRole } from 'src/domain/user';
import { AccountService } from './account.service';
import { CreatePaymentIntens } from './dto/create-payment-intens.dto';

@Controller()
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class AccountHttpController {
  constructor(private accountService: AccountService) {}

  @Post('create-payment')
  @Roles(UserRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  createPaymentIntens(
    @CurrentUser() user: User,
    @Body() dto: CreatePaymentIntens,
  ) {
    return this.accountService.createPaymentIntens(user.id, dto);
  }

  @Get('get-stats')
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  getStats() {
    return this.accountService.getStats();
  }

  @Get('my-account')
  @Roles(UserRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  myAccount(@CurrentUser() user: User) {
    return this.accountService.findById(user.id);
  }
}
