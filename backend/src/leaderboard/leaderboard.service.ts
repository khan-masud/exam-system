import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { LeaderboardEntry } from './leaderboard-entry.entity';

@Injectable()
export class LeaderboardService {
  constructor(@InjectRepository(LeaderboardEntry) private readonly repo: Repository<LeaderboardEntry>) {}

  list(scope: string, periodStart: string, periodEnd: string, examId?: string) {
    return this.repo.find({
      where: {
        scope,
        periodStart,
        periodEnd,
        ...(examId ? { exam: { id: examId } } : {}),
      },
      relations: ['user'],
      order: { score: 'DESC' },
      take: 100,
    });
  }

  async updateFromAttempt(attempt: { id: string; exam: { id: string }; user: { id: string }; score: number; durationSeconds: number; updatedAt: Date }) {
    const scope = 'alltime';
    const periodStart = '1970-01-01';
    const periodEnd = '9999-12-31';
    let entry = await this.repo.findOne({
      where: { scope, periodStart, periodEnd, user: { id: attempt.user.id }, exam: { id: attempt.exam.id } },
    });
    if (!entry) {
      entry = this.repo.create({
        scope,
        periodStart,
        periodEnd,
        exam: { id: attempt.exam.id } as any,
        user: { id: attempt.user.id } as any,
        score: attempt.score,
        tiebreak: {
          durationSeconds: attempt.durationSeconds,
          accuracy: attempt.score,
          submittedAt: attempt.updatedAt.toISOString(),
        },
      });
    } else {
      if (attempt.score > entry.score) {
        entry.score = attempt.score;
      }
      entry.tiebreak = {
        durationSeconds: attempt.durationSeconds,
        accuracy: attempt.score,
        submittedAt: attempt.updatedAt.toISOString(),
      };
    }
    await this.repo.save(entry);
  }
}
