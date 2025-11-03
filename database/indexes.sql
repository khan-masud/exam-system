CREATE INDEX IF NOT EXISTS idx_attempts_user_exam ON attempts(user_id, exam_id);
CREATE INDEX IF NOT EXISTS idx_attempts_status ON attempts(status);
CREATE INDEX IF NOT EXISTS idx_leaderboards_scope ON leaderboards(scope, period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_payments_provider_status ON payments(provider, status);
