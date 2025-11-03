import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attempt } from './attempt.entity';
import { QuestionVersion } from '../exams/question-version.entity';

@Entity('attempt_answers')
export class AttemptAnswer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Attempt, (attempt) => attempt.answers, { onDelete: 'CASCADE' })
  attempt!: Attempt;

  @ManyToOne(() => QuestionVersion, { eager: true })
  questionVersion!: QuestionVersion;

  @Column('jsonb')
  payload!: {
    selectedOptionIds?: string[];
    textAnswer?: string;
    attachments?: string[];
  };

  @Column({ type: 'jsonb', default: () => "'{}'" })
  scoring!: { awarded: number; rubric?: string };

  @Column({ default: false })
  needsReview!: boolean;

  @CreateDateColumn()
  savedAt!: Date;
}
