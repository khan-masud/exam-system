import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Exam } from '../exams/exam.entity';
import { ExamForm } from '../exams/exam-form.entity';
import { AttemptAnswer } from './attempt-answer.entity';
import { AttemptFlag } from './attempt-flag.entity';

@Entity('attempts')
export class Attempt {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.attempts, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Exam, (exam) => exam.enrollments, { onDelete: 'CASCADE' })
  exam!: Exam;

  @ManyToOne(() => ExamForm, { eager: true })
  form!: ExamForm;

  @Column({ default: 'initiated' })
  status!: string;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  antiCheat!: {
    deviceFingerprint?: string;
    ipAddress?: string;
    proctoringEvents?: Array<Record<string, unknown>>;
  };

  @Column({ type: 'int', default: 0 })
  durationSeconds!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  score!: number;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  analytics!: Record<string, unknown>;

  @CreateDateColumn()
  startedAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => AttemptAnswer, (answer) => answer.attempt)
  answers!: AttemptAnswer[];

  @OneToMany(() => AttemptFlag, (flag) => flag.attempt)
  flags!: AttemptFlag[];
}
