import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get('subjects')
  listSubjects() {
    return this.examsService.listSubjects();
  }

  @Get('exams')
  listCatalog() {
    return this.examsService.listCatalog();
  }

  @Get('exams/:id')
  getExam(@Param('id') id: string) {
    return this.examsService.getExamManifest(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/exams/:id/forms/randomize')
  randomize(@Param('id') id: string, @Body('policy') policy: { difficulties: Record<string, number> }) {
    return this.examsService.buildRandomizedForm(id, policy);
  }
}
