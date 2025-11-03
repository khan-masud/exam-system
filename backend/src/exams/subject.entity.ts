import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';
import { Exam } from './exam.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Question, (question) => question.subject)
  questions!: Question[];

  @OneToMany(() => Exam, (exam) => exam.subject)
  exams!: Exam[];
}
