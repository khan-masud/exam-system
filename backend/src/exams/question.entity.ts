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
import { QuestionVersion } from './question-version.entity';
import { QuestionTag } from './question-tag.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Subject, (subject) => subject.questions, { nullable: false })
  subject!: Subject;

  @Column()
  reference!: string;

  @Column({ default: 'mcq-single' })
  type!: string;

  @Column({ default: 'medium' })
  difficulty!: string;

  @Column('jsonb', { default: () => "'{}'" })
  metadata!: Record<string, unknown>;

  @Column({ default: false })
  hasNegativeMarking!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => QuestionVersion, (version) => version.question)
  versions!: QuestionVersion[];

  @OneToMany(() => QuestionTag, (tag) => tag.question)
  tags!: QuestionTag[];
}
