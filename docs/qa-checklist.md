# QA Checklist

## Security
- [ ] Verify JWT rotation & refresh revocation store
- [ ] Run OWASP ZAP baseline scan against `/api`
- [ ] Confirm Argon2 hashing cost set to `t=3, m=4096`
- [ ] Ensure CORS limited to configured domains
- [ ] Validate anti-cheat events stored with tamper-evident signatures

## Performance
- [ ] Lighthouse score >= 90 (PWA, Performance, Accessibility)
- [ ] API latency p95 < 300ms under 500 concurrent users
- [ ] Redis TTL for sessions (24h) and leaderboards (rolling windows)
- [ ] Postgres indexes verified (see `database/indexes.sql`)

## Accessibility
- [ ] Keyboard navigation across exam player, dashboard, admin console
- [ ] Screen reader labels for timers, question navigator, analytics charts
- [ ] Dyslexia-friendly font toggle (OpenDyslexic) verified

## Payments
- [ ] Test IPN callbacks for SSLCOMMERZ sandbox
- [ ] Manual payment approval flow triggers invoice generation
- [ ] Multi-currency VAT configuration exports correct PDF invoice

## Proctoring
- [ ] Webcam consent modal, fallback to manual review, GDPR notice
- [ ] Multi-face detection triggers escalation queue
- [ ] Similarity index flagged when correlation > 0.85 across attempts
