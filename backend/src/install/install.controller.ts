import { Body, Controller, Get, Post } from '@nestjs/common';
import { InstallService } from './install.service';

@Controller('install')
export class InstallController {
  constructor(private readonly installService: InstallService) {}

  @Get('checks')
  checks() {
    return this.installService.runChecks();
  }

  @Post('env')
  writeEnv(@Body() config: Record<string, string>) {
    return this.installService.writeEnv(config);
  }
}
