import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { UserBlock } from './user-block.entity';
import { Enrollment } from '../attempts/enrollment.entity';
import { Attempt } from '../attempts/attempt.entity';
import { LeaderboardEntry } from '../leaderboard/leaderboard-entry.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ select: false })
  passwordHash!: string;

  @Column({ default: false })
  isTwoFactorEnabled!: boolean;

  @Column({ nullable: true, select: false })
  twoFactorSecret?: string;

  @Column({ default: false })
  passwordlessEnabled!: boolean;

  @Column({ default: 'en' })
  locale!: string;

  @Column({ default: 'light' })
  themePreference!: string;

  @Column({ default: false })
  isProfilePublic!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserRole, (role) => role.user)
  roles!: UserRole[];

  @OneToMany(() => UserBlock, (block) => block.user)
  blocks!: UserBlock[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments!: Enrollment[];

  @OneToMany(() => Attempt, (attempt) => attempt.user)
  attempts!: Attempt[];

  @OneToMany(() => LeaderboardEntry, (entry) => entry.user)
  leaderboardEntries!: LeaderboardEntry[];
}
