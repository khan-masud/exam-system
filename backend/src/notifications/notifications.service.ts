import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { Template } from './template.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private readonly notificationsRepo: Repository<Notification>,
    @InjectRepository(Template) private readonly templatesRepo: Repository<Template>,
  ) {}

  async enqueue(channel: 'email' | 'sms', templateKey: string, payload: Record<string, unknown>) {
    const template = await this.templatesRepo.findOne({ where: { key: templateKey, channel } });
    const notification = this.notificationsRepo.create({ channel, template, payload, status: 'queued', attempts: 0 });
    await this.notificationsRepo.save(notification);
    return notification;
  }
}
