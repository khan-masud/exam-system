import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Template } from './template.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { nullable: true })
  user?: User;

  @ManyToOne(() => Template, { nullable: true })
  template?: Template;

  @Column()
  channel!: 'email' | 'sms';

  @Column({ type: 'jsonb' })
  payload!: Record<string, unknown>;

  @Column({ default: 'queued' })
  status!: string;

  @Column({ type: 'int', default: 0 })
  attempts!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
