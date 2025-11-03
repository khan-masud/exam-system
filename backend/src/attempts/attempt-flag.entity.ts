import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attempt } from './attempt.entity';

@Entity('attempt_flags')
export class AttemptFlag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Attempt, (attempt) => attempt.flags, { onDelete: 'CASCADE' })
  attempt!: Attempt;

  @Column()
  type!: string;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  metadata!: Record<string, unknown>;

  @CreateDateColumn()
  detectedAt!: Date;
}
