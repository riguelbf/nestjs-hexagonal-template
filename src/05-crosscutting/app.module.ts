import { RequestLoggerMiddleware } from './middlewares/logging/RequestLogger.middleware';
import HealthModule from './modules/monitoring/health.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';

@Module({
  imports: [HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
