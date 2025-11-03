import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Payment } from './payment.entity';
import { Enrollment } from '../attempts/enrollment.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column({ type: 'jsonb' })
  items!: Array<{ examId: string; title: string; price: number; quantity: number }>;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total!: number;

  @Column({ default: 'pending' })
  status!: string;

  @OneToMany(() => Payment, () => undefined)
  payments!: Payment[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.exam)
  enrollments!: Enrollment[];

  @CreateDateColumn()
  createdAt!: Date;
}
