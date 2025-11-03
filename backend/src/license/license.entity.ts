import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('licenses')
export class License {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  purchaseCode!: string;

  @Column({ nullable: true })
  domain?: string;

  @Column({ default: 'active' })
  status!: string;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  meta!: Record<string, unknown>;

  @Column({ type: 'inet', nullable: true })
  boundIp?: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastCheckAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
