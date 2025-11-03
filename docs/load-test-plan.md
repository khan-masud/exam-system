# Load Test Plan

## Objectives
- Validate exam attempt flow for 5,000 concurrent candidates
- Ensure leaderboard recalculations remain within 1s latency
- Confirm payment webhooks queue under burst (200/min)

## Tooling
- k6 for HTTP scenarios (`scripts/k6/attempt-flow.js`)
- Locust for websocket proctor events (future scope)
- PostgreSQL pgbench for transactional throughput

## Scenarios
1. **Enrollment & Attempt Start**
   - 5k virtual users ramped over 2 minutes
   - Sequence: login → GET `/exams/:id/manifest` → POST `/attempts`
   - SLA: <2% error rate, p95 < 400ms
2. **Answer Autosave**
   - Constant 2k vus posting `/attempts/:id/answers/batch` every 30s
   - Validate Redis cache hit > 90%
3. **Submission & Leaderboard**
   - 1k vus submitting concurrently
   - Ensure BullMQ worker drains queue < 30s
4. **Payment IPN Storm**
   - Replay 200/min IPN payloads to `/ipn/sslcommerz`
   - Check idempotency + invoice generation

## Metrics
- Prometheus dashboards (CPU, memory, Postgres connections)
- Grafana panels for queue depth, anti-cheat events/min
- SLO alerts in Alertmanager (p95 > 500ms, error rate > 5%)

## Acceptance Criteria
- No data loss; attempts saved + scored correctly
- Leaderboard consistency verified against Postgres snapshot
- System auto-scales to 3 replicas without downtime
