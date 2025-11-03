import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  actorId!: string;

  @Column()
  action!: string;

  @Column({ type: 'jsonb' })
  context!: Record<string, unknown>;

  @Column({ type: 'varchar', length: 64 })
  signature!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
