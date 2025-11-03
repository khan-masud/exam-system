import { Body, Controller, Post } from '@nestjs/common';
import { LicenseService } from './license.service';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Post('activate')
  activate(@Body() body: { purchaseCode: string; domain: string }) {
    return this.licenseService.activate(body.purchaseCode, body.domain);
  }

  @Post('verify')
  verify(@Body('purchaseCode') purchaseCode: string) {
    return this.licenseService.verify(purchaseCode);
  }

  @Post('deactivate')
  deactivate(@Body('purchaseCode') purchaseCode: string) {
    return this.licenseService.deactivate(purchaseCode);
  }
}
