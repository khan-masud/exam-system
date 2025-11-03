import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller()
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Post('attempts')
  start(@CurrentUser() user: { id: string }, @Body('examId') examId: string) {
    return this.attemptsService.startAttempt(user.id, examId);
  }

  @Post('attempts/:id/answers/batch')
  save(@Param('id') attemptId: string, @Body('answers') answers: Array<{ questionId: string; payload: any }>) {
    return this.attemptsService.saveAnswers(attemptId, answers);
  }

  @Post('attempts/:id/submit')
  submit(@Param('id') attemptId: string) {
    return this.attemptsService.submitAttempt(attemptId);
  }
}
