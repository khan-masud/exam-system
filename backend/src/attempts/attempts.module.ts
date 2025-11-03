import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from './attempt.entity';
import { AttemptAnswer } from './attempt-answer.entity';
import { AttemptFlag } from './attempt-flag.entity';
import { Enrollment } from './enrollment.entity';
import { ExamsModule } from '../exams/exams.module';
import { AttemptsService } from './attempts.service';
import { AttemptsController } from './attempts.controller';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attempt, AttemptAnswer, AttemptFlag, Enrollment]),
    ExamsModule,
    LeaderboardModule,
  ],
  providers: [AttemptsService],
  controllers: [AttemptsController],
  exports: [AttemptsService],
})
export class AttemptsModule {}
