import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';
import { ExamSection } from './exam-section.entity';
import { ExamForm } from './exam-form.entity';
import { FormQuestion } from './form-question.entity';
import { Subject } from './subject.entity';
import { Tag } from './tag.entity';
import { Question } from './question.entity';
import { QuestionVersion } from './question-version.entity';
import { QuestionAsset } from './question-asset.entity';
import { QuestionTag } from './question-tag.entity';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Exam,
      ExamSection,
      ExamForm,
      FormQuestion,
      Subject,
      Tag,
      Question,
      QuestionVersion,
      QuestionAsset,
      QuestionTag,
    ]),
  ],
  providers: [ExamsService],
  controllers: [ExamsController],
  exports: [ExamsService],
})
export class ExamsModule {}
