import { HealthController } from './../../../01-presentation/monitoring/health.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [],
})
export default class HealthModule {}
