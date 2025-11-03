# ProctorX Online Exam Suite

Production-grade, Envato-ready online examination platform with full-stack TypeScript (Next.js 15 + NestJS) and a hardened anti-cheat engine tailored for South Asian payment rails.

## Highlights
- Device fingerprinting, fullscreen lock, multi-session guard, AI-assisted proctoring hooks
- JWT access/refresh rotation, OTP, 2FA, RBAC roles (Super Admin, Exam Manager, Question Setter, Support Agent)
- Bangladesh-ready payments (SSLCOMMERZ, bKash, Nagad, Rocket) with IPN handlers & manual override
- Multi-format question bank (CSV, QTI 2.2) with random paper generation and per-form scoring rules
- Analytics for candidates (heatmaps, accuracy vs. speed) and admins (revenue, cohort, psychometrics)
- Installer wizard, license verification handshake, modular addon marketplace
- Docker Compose + K8s manifests + CI pipeline (lint, test, build, release tagging)

## Repository Structure
```
backend/      NestJS API, BullMQ workers, Prisma/TypeORM entities, tests
frontend/     Next.js App Router PWA, Tailwind, shadcn/ui powered dashboards
database/     Prisma schema, SQL migrations, seed data (sample exams & users)
docs/         ERD, architecture + sequence diagrams, help center assets
license/      Distribution license
assets/       Marketing screenshots (PNG/WebP)
docker/       Docker Compose + Kubernetes manifests + Nginx config
.github/      GitHub Actions workflows (lint/test/build/release)
```

## Quick Start (Dev)
1. `docker compose up -d` (spawns Postgres, Redis, MinIO, Mailhog)
2. `cd backend && npm install && npm run start:dev`
3. `cd frontend && npm install && npm run dev`
4. Access API docs at `http://localhost:4000/api/docs`, frontend at `http://localhost:3000`

### Installer Flow
- Navigate to `/install` to launch the wizard.
- The wizard validates PHP/Node/DB requirements, writes `.env`, runs migrations, seeds admin account, configures cron queues.

### License Verification
- POST `/license/activate` with purchase code & domain
- Background job re-validates hourly (offline grace period respected)
- Webhook `/license/callback` handles remote revocation & instance transfer

## Testing & QA
- Backend: `npm run test:cov` (Nest + Jest, >95% coverage target)
- Frontend: `npm run lint && npm run test` (Playwright + Vitest stubs)
- QA checklist in `docs/qa-checklist.md`
- Load test blueprint in `docs/load-test-plan.md`

## Packaging for Envato
Run `./scripts/package.sh` to produce `proctorx-suite-v1.0.0.zip` containing:
- `/frontend`, `/backend`, `/docs`, `/database`, `/docker`, `/license`
- `/changelog.md`, `/readme.md`, `/envato-help-file.html`
- `.env.example`, lockfiles, SQL schema + seeds, screenshots

## Demo Credentials
- Admin: `admin@demo.exam` / `Admin@1234`
- Candidate: `candidate@demo.exam` / `Candidate@1234`
- OTP sandbox: `000000`

## Support & Maintenance
- Semantic versioning (v1.0.0)
- Security patches within 48 hours of disclosure
- Changelog maintained per release in `CHANGELOG.md`
