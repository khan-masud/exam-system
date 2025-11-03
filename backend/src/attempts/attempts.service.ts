import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attempt } from './attempt.entity';
import { AttemptAnswer } from './attempt-answer.entity';
import { Enrollment } from './enrollment.entity';
import { ExamsService } from '../exams/exams.service';
import { FormQuestion } from '../exams/form-question.entity';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(Attempt) private readonly attemptsRepo: Repository<Attempt>,
    @InjectRepository(AttemptAnswer) private readonly answersRepo: Repository<AttemptAnswer>,
    @InjectRepository(Enrollment) private readonly enrollmentsRepo: Repository<Enrollment>,
    private readonly examsService: ExamsService,
    private readonly leaderboardService: LeaderboardService,
  ) {}

  async enroll(userId: string, examId: string) {
    const existing = await this.enrollmentsRepo.findOne({ where: { user: { id: userId }, exam: { id: examId } } });
    if (existing) return existing;
    const enrollment = this.enrollmentsRepo.create({ user: { id: userId } as any, exam: { id: examId } as any });
    return this.enrollmentsRepo.save(enrollment);
  }

  async startAttempt(userId: string, examId: string) {
    await this.enroll(userId, examId);
    const manifest = await this.examsService.getExamManifest(examId);
    const form = manifest.forms[0];
    const attempt = this.attemptsRepo.create({
      user: { id: userId } as any,
      exam: { id: examId } as any,
      form,
      status: 'in-progress',
    });
    await this.attemptsRepo.save(attempt);
    return { attempt, manifest };
  }

  async saveAnswers(attemptId: string, answers: Array<{ questionId: string; payload: any }>) {
    const attempt = await this.attemptsRepo.findOne({ where: { id: attemptId }, relations: ['form', 'form.questions'] });
    if (!attempt) throw new NotFoundException('Attempt not found');
    const indexByQuestion = new Map<string, FormQuestion>();
    attempt.form.questions.forEach((fq) => indexByQuestion.set(fq.version.id, fq));
    for (const answer of answers) {
      const question = indexByQuestion.get(answer.questionId);
      if (!question) continue;
      const entity = this.answersRepo.create({
        attempt: { id: attemptId } as any,
        questionVersion: { id: answer.questionId } as any,
        payload: answer.payload,
        scoring: { awarded: 0 },
      });
      await this.answersRepo.save(entity);
    }
    return { saved: answers.length };
  }

  async submitAttempt(attemptId: string) {
    const attempt = await this.attemptsRepo.findOne({ where: { id: attemptId }, relations: ['answers', 'form', 'form.questions'] });
    if (!attempt) throw new NotFoundException('Attempt not found');
    // naive scoring demonstration
    let score = 0;
    attempt.answers.forEach((answer) => {
      const question = attempt.form.questions.find((fq) => fq.version.id === answer.questionVersion.id);
      if (!question) return;
      if (answer.payload.selectedOptionIds) {
        const correctOptions = (question.version.content.options || []).filter((opt) => opt.correct).map((opt) => opt.id).sort();
        const given = [...(answer.payload.selectedOptionIds || [])].sort();
        if (JSON.stringify(correctOptions) === JSON.stringify(given)) {
          answer.scoring.awarded = question.scoring.maxScore;
          score += question.scoring.maxScore;
        }
      }
    });
    attempt.score = score;
    attempt.status = 'submitted';
    attempt.durationSeconds = 1200;
    attempt.analytics = { accuracy: score / attempt.form.questions.length };
    await this.attemptsRepo.save(attempt);
    const hydrated = await this.attemptsRepo.findOneOrFail({
      where: { id: attempt.id },
      relations: ['exam', 'user'],
    });
    await this.leaderboardService.updateFromAttempt({
      id: hydrated.id,
      exam: { id: hydrated.exam.id },
      user: { id: hydrated.user.id },
      score: hydrated.score,
      durationSeconds: hydrated.durationSeconds,
      updatedAt: hydrated.updatedAt,
    });
    return hydrated;
  }
}
