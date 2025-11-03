import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  checkout(@CurrentUser() user: { id: string }, @Body('items') items: Array<{ examId: string; title: string; price: number }>) {
    return this.paymentsService.checkout(user.id, items);
  }

  @Post('ipn/:provider')
  ipn(@Body() payload: Record<string, unknown>) {
    return this.paymentsService.handleIpn('generic', payload);
  }
}
