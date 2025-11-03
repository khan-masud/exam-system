import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { ExamSection } from './exam-section.entity';
import { ExamForm } from './exam-form.entity';
import { Enrollment } from '../attempts/enrollment.entity';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ default: false })
  isPublished!: boolean;

  @Column({ default: false })
  isPaid!: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  price!: number;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  settings!: Record<string, unknown>;

  @ManyToOne(() => Subject, (subject) => subject.exams)
  subject!: Subject;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => ExamSection, (section) => section.exam)
  sections!: ExamSection[];

  @OneToMany(() => ExamForm, (form) => form.exam)
  forms!: ExamForm[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.exam)
  enrollments!: Enrollment[];
}
