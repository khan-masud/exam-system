import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Exam } from '../exams/exam.entity';

@Entity('leaderboards')
@Unique(['scope', 'periodStart', 'periodEnd', 'exam', 'user'])
export class LeaderboardEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  scope!: string;

  @Column({ type: 'date' })
  periodStart!: string;

  @Column({ type: 'date' })
  periodEnd!: string;

  @ManyToOne(() => Exam, { nullable: true })
  exam?: Exam;

  @ManyToOne(() => User, (user) => user.leaderboardEntries)
  user!: User;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  score!: number;

  @Column({ type: 'jsonb' })
  tiebreak!: {
    durationSeconds: number;
    accuracy: number;
    submittedAt: string;
  };
}
