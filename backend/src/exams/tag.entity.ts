import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionTag } from './question-tag.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  label!: string;

  @OneToMany(() => QuestionTag, (questionTag) => questionTag.tag)
  questionTags!: QuestionTag[];
}
