INSERT INTO roles (id, name, permissions) VALUES
  ('00000000-0000-0000-0000-000000000001', 'super-admin', '{"admin":true}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, email, password_hash, is_profile_public)
VALUES ('00000000-0000-0000-0000-000000000010', 'admin@demo.exam', '$argon2id$v=19$m=4096,t=3,p=1$demo$hash', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (id, user_id, role_id, is_primary)
VALUES ('00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO exams (id, slug, title, description, is_published)
VALUES ('00000000-0000-0000-0000-000000001000', 'general-aptitude', 'General Aptitude Mock', '50 question adaptive exam', TRUE)
ON CONFLICT (id) DO NOTHING;
