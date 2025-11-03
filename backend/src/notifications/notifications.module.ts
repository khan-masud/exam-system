import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Template } from './template.entity';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Template])],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
