import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { Subject } from './subject.entity';
import { ExamForm } from './exam-form.entity';
import { ExamSection } from './exam-section.entity';
import { FormQuestion } from './form-question.entity';
import { QuestionVersion } from './question-version.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam) private readonly examsRepo: Repository<Exam>,
    @InjectRepository(Subject) private readonly subjectsRepo: Repository<Subject>,
    @InjectRepository(ExamForm) private readonly formsRepo: Repository<ExamForm>,
    @InjectRepository(ExamSection) private readonly sectionsRepo: Repository<ExamSection>,
    @InjectRepository(FormQuestion) private readonly formQuestionsRepo: Repository<FormQuestion>,
    @InjectRepository(QuestionVersion) private readonly versionsRepo: Repository<QuestionVersion>,
  ) {}

  listCatalog() {
    return this.examsRepo.find({
      where: { isPublished: true },
      relations: ['subject'],
    });
  }

  listSubjects() {
    return this.subjectsRepo.find({ order: { name: 'ASC' } });
  }

  async getExamManifest(id: string) {
    const exam = await this.examsRepo.findOne({
      where: { id },
      relations: ['sections', 'forms', 'subject'],
    });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    const forms = await this.formsRepo.find({
      where: { exam: { id } },
      relations: ['questions', 'questions.section', 'questions.version'],
      order: { code: 'ASC' },
    });
    return { exam, forms };
  }

  async createSubject(name: string) {
    const subject = this.subjectsRepo.create({ name });
    return this.subjectsRepo.save(subject);
  }

  async buildRandomizedForm(examId: string, policy: { difficulties: Record<string, number> }) {
    const exam = await this.examsRepo.findOne({ where: { id: examId }, relations: ['sections'] });
    if (!exam) throw new NotFoundException('Exam not found');
    const form = this.formsRepo.create({ exam, code: `F-${Date.now()}`, randomizationPolicy: policy });
    await this.formsRepo.save(form);
    // sample selection using difficulty counts
    for (const [difficulty, count] of Object.entries(policy.difficulties)) {
      const versions = await this.versionsRepo.find({
        where: { question: { difficulty } },
        take: count,
      });
      for (const [idx, version] of versions.entries()) {
        const section = exam.sections[idx % exam.sections.length];
        const fq = this.formQuestionsRepo.create({
          form,
          section,
          version,
          order: idx,
          scoring: { maxScore: 1 },
        });
        await this.formQuestionsRepo.save(fq);
      }
    }
    return this.getExamManifest(examId);
  }
}
