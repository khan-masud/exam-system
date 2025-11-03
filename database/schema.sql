-- Simplified SQL schema snapshot
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  locale TEXT DEFAULT 'en',
  theme_preference TEXT DEFAULT 'light',
  is_profile_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  permissions JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT FALSE,
  UNIQUE (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS exams (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  is_paid BOOLEAN DEFAULT FALSE,
  price NUMERIC(10,2) DEFAULT 0,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'initiated',
  score NUMERIC(10,2) DEFAULT 0,
  duration_seconds INT DEFAULT 0,
  analytics JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leaderboards (
  id UUID PRIMARY KEY,
  scope TEXT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  exam_id UUID REFERENCES exams(id),
  user_id UUID REFERENCES users(id),
  score NUMERIC(10,2) NOT NULL,
  tiebreak JSONB NOT NULL
);
