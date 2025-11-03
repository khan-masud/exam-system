import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AttemptsService } from './attempts.service';
import { Attempt } from './attempt.entity';
import { AttemptAnswer } from './attempt-answer.entity';
import { Enrollment } from './enrollment.entity';
import { ExamsService } from '../exams/exams.service';

const repoMock = () => ({
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('AttemptsService', () => {
  let service: AttemptsService;
  let attemptsRepo: ReturnType<typeof repoMock>;
  let answersRepo: ReturnType<typeof repoMock>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AttemptsService,
        { provide: getRepositoryToken(Attempt), useFactory: repoMock },
        { provide: getRepositoryToken(AttemptAnswer), useFactory: repoMock },
        { provide: getRepositoryToken(Enrollment), useFactory: repoMock },
        {
          provide: ExamsService,
          useValue: {
            getExamManifest: jest.fn().mockResolvedValue({ forms: [{ questions: [] }] }),
          },
        },
      ],
    }).compile();

    service = module.get(AttemptsService);
    attemptsRepo = module.get(getRepositoryToken(Attempt));
    answersRepo = module.get(getRepositoryToken(AttemptAnswer));
  });

  it('saves batch answers', async () => {
    attemptsRepo.findOne.mockResolvedValue({ form: { questions: [] } });
    answersRepo.create.mockImplementation((value) => value);
    await service.saveAnswers('attempt-1', [
      { questionId: 'q1', payload: { selectedOptionIds: ['a'] } },
    ]);
    expect(answersRepo.save).toHaveBeenCalled();
  });
});
