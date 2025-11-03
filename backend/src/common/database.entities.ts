import { User } from '../users/user.entity';
import { Role } from '../users/role.entity';
import { UserRole } from '../users/user-role.entity';
import { UserBlock } from '../users/user-block.entity';
import { Subject } from '../exams/subject.entity';
import { Tag } from '../exams/tag.entity';
import { Question } from '../exams/question.entity';
import { QuestionVersion } from '../exams/question-version.entity';
import { QuestionAsset } from '../exams/question-asset.entity';
import { QuestionTag } from '../exams/question-tag.entity';
import { Exam } from '../exams/exam.entity';
import { ExamSection } from '../exams/exam-section.entity';
import { ExamForm } from '../exams/exam-form.entity';
import { FormQuestion } from '../exams/form-question.entity';
import { Enrollment } from '../attempts/enrollment.entity';
import { Attempt } from '../attempts/attempt.entity';
import { AttemptAnswer } from '../attempts/attempt-answer.entity';
import { AttemptFlag } from '../attempts/attempt-flag.entity';
import { LeaderboardEntry } from '../leaderboard/leaderboard-entry.entity';
import { Payment } from '../payments/payment.entity';
import { Order } from '../payments/order.entity';
import { Invoice } from '../payments/invoice.entity';
import { Notification } from '../notifications/notification.entity';
import { Template } from '../notifications/template.entity';
import { Setting } from '../config/setting.entity';
import { AuditLog } from '../analytics/audit-log.entity';
import { Webhook } from '../analytics/webhook.entity';
import { JobEntity } from '../queues/job.entity';
import { License } from '../license/license.entity';

export const DatabaseEntities = [
  User,
  Role,
  UserRole,
  UserBlock,
  Subject,
  Tag,
  Question,
  QuestionVersion,
  QuestionAsset,
  QuestionTag,
  Exam,
  ExamSection,
  ExamForm,
  FormQuestion,
  Enrollment,
  Attempt,
  AttemptAnswer,
  AttemptFlag,
  LeaderboardEntry,
  Payment,
  Order,
  Invoice,
  Notification,
  Template,
  Setting,
  AuditLog,
  Webhook,
  JobEntity,
  License,
];
