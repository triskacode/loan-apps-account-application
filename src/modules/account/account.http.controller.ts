import {
  Controller,
  Get,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { UserRole } from 'src/domain/user';
import { AccountService } from './account.service';

@Controller()
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class AccountHttpController {
  constructor(private accountService: AccountService) {}

  @Get('get-stats')
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  getStats() {
    return this.accountService.getStats();
  }
}
