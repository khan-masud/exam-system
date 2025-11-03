import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';
import { Webhook } from './webhook.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AuditLog) private readonly logsRepo: Repository<AuditLog>,
    @InjectRepository(Webhook) private readonly webhooksRepo: Repository<Webhook>,
  ) {}

  async record(action: string, actorId: string, context: Record<string, unknown>) {
    const log = this.logsRepo.create({
      action,
      actorId,
      context,
      signature: this.createSignature(action, actorId, context),
    });
    await this.logsRepo.save(log);
    return log;
  }

  async dispatchWebhook(event: string, payload: Record<string, unknown>) {
    const hooks = await this.webhooksRepo.find({ where: { isActive: true } });
    return hooks.map((hook) => ({ url: hook.url, event, payload }));
  }

  private createSignature(action: string, actorId: string, context: Record<string, unknown>) {
    return Buffer.from(`${action}:${actorId}:${JSON.stringify(context)}`).toString('base64url');
  }
}
