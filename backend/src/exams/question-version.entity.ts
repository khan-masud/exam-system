import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { QuestionAsset } from './question-asset.entity';

@Entity('question_versions')
export class QuestionVersion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Question, (question) => question.versions, { onDelete: 'CASCADE' })
  question!: Question;

  @Column('jsonb')
  content!: {
    stem: string;
    options?: Array<{ id: string; text: string; correct?: boolean; weight?: number }>;
    solution?: string;
  };

  @Column({ default: false })
  isPublished!: boolean;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  localeVariants!: Array<{ locale: string; stem: string }>;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => QuestionAsset, (asset) => asset.version)
  assets!: QuestionAsset[];
}
