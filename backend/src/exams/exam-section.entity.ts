import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exam } from './exam.entity';
import { FormQuestion } from './form-question.entity';

@Entity('exam_sections')
export class ExamSection {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Exam, (exam) => exam.sections, { onDelete: 'CASCADE' })
  exam!: Exam;

  @Column()
  title!: string;

  @Column({ type: 'int' })
  durationMinutes!: number;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  scoring!: { maxScore: number; negativeMarking?: number };

  @OneToMany(() => FormQuestion, (fq) => fq.section)
  formQuestions!: FormQuestion[];
}
