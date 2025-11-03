import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Order } from './order.entity';
import { Invoice } from './invoice.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly paymentsRepo: Repository<Payment>,
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    @InjectRepository(Invoice) private readonly invoicesRepo: Repository<Invoice>,
  ) {}

  async checkout(userId: string, items: Array<{ examId: string; title: string; price: number }>) {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const order = this.ordersRepo.create({
      user: { id: userId } as any,
      items: items.map((item) => ({ ...item, quantity: 1 })),
      total,
      status: 'pending',
    });
    await this.ordersRepo.save(order);
    const payment = this.paymentsRepo.create({ user: { id: userId } as any, provider: 'manual', status: 'pending', amount: total });
    await this.paymentsRepo.save(payment);
    return { order, payment };
  }

  async handleIpn(provider: string, payload: Record<string, unknown>) {
    const payment = await this.paymentsRepo.findOne({ where: { reference: payload['tran_id'] as string } });
    if (!payment) return { status: 'ignored' };
    payment.status = 'completed';
    payment.ipnPayload = payload;
    await this.paymentsRepo.save(payment);
    return payment;
  }

  async generateInvoice(orderId: string) {
    const order = await this.ordersRepo.findOneOrFail({ where: { id: orderId } });
    const invoice = this.invoicesRepo.create({
      order,
      number: `INV-${Date.now()}`,
      billingAddress: { country: 'BD' },
      taxDetails: { vat: 15 },
      amount: order.total,
      isPaid: false,
    });
    await this.invoicesRepo.save(invoice);
    return invoice;
  }
}
