import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  order!: Order;

  @Column({ unique: true })
  number!: string;

  @Column({ type: 'jsonb' })
  billingAddress!: Record<string, unknown>;

  @Column({ type: 'jsonb' })
  taxDetails!: Record<string, unknown>;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount!: number;

  @Column({ default: false })
  isPaid!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
