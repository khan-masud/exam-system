import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly service: LeaderboardService) {}

  @Get()
  list(
    @Query('scope') scope = 'alltime',
    @Query('periodStart') periodStart = '1970-01-01',
    @Query('periodEnd') periodEnd = '9999-12-31',
    @Query('examId') examId?: string,
  ) {
    return this.service.list(scope, periodStart, periodEnd, examId);
  }
}
