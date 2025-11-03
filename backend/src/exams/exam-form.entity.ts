import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exam } from './exam.entity';
import { FormQuestion } from './form-question.entity';

@Entity('exam_forms')
export class ExamForm {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Exam, (exam) => exam.forms, { onDelete: 'CASCADE' })
  exam!: Exam;

  @Column({ default: 'A' })
  code!: string;

  @Column({ default: false })
  isAdaptive!: boolean;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  randomizationPolicy!: Record<string, unknown>;

  @OneToMany(() => FormQuestion, (fq) => fq.form)
  questions!: FormQuestion[];
}
