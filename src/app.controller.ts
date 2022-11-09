import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

@Controller()
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class AppController {
  @Get('health-check')
  healthCheck() {
    return 'OK';
  }
}
