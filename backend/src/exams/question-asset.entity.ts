import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionVersion } from './question-version.entity';

@Entity('question_assets')
export class QuestionAsset {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => QuestionVersion, (version) => version.assets, { onDelete: 'CASCADE' })
  version!: QuestionVersion;

  @Column()
  type!: string;

  @Column()
  uri!: string;

  @Column({ nullable: true })
  description?: string;
}
