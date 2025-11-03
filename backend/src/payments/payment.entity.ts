import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  user?: User;

  @Column()
  provider!: string;

  @Column({ default: 'pending' })
  status!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  ipnPayload!: Record<string, unknown>;

  @Column({ nullable: true })
  reference?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
