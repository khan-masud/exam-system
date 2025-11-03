import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Question } from './question.entity';
import { Tag } from './tag.entity';

@Entity('question_tags')
@Unique(['question', 'tag'])
export class QuestionTag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Question, (question) => question.tags, { onDelete: 'CASCADE' })
  question!: Question;

  @ManyToOne(() => Tag, (tag) => tag.questionTags, { onDelete: 'CASCADE' })
  tag!: Tag;
}
