import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('health')
@ApiTags('monitoring')
export class HealthController {
  @ApiOperation({ description: 'Check health of api' })
  @ApiResponse({ status: 200, description: 'Connect Device' })
  @Get('/check')
  async check(): Promise<object> {
    return { status: `Working in ${new Date()}` };
  }
}
