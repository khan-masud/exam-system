import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamSection } from './exam-section.entity';
import { ExamForm } from './exam-form.entity';
import { QuestionVersion } from './question-version.entity';

@Entity('form_questions')
export class FormQuestion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => ExamSection, (section) => section.formQuestions, { onDelete: 'CASCADE' })
  section!: ExamSection;

  @ManyToOne(() => ExamForm, (form) => form.questions, { onDelete: 'CASCADE' })
  form!: ExamForm;

  @ManyToOne(() => QuestionVersion, { eager: true, nullable: false })
  version!: QuestionVersion;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  scoring!: { maxScore: number; partial?: boolean };
}
