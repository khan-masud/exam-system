import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Exam } from '../exams/exam.entity';

@Entity('enrollments')
@Unique(['user', 'exam'])
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.enrollments, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Exam, (exam) => exam.enrollments, { onDelete: 'CASCADE' })
  exam!: Exam;

  @Column({ default: 'active' })
  status!: string;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  metadata!: Record<string, unknown>;

  @CreateDateColumn()
  enrolledAt!: Date;
}
