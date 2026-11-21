# FORKS-A · Improve the course fork and prepare upstream PRs

Objective: small, easy-to-accept improvements to CodelyTV/frontend-hexagonal_architecture-course, ready as PRs from this fork.
Branch: `main` (docs) · `fix/integration-e2e-jest-ignores-cypress`, `fix/oo-course-title-validation`, `test/maps-locations-tests` (PR branches)
Delivery: PR branches pushed to Trysac; PRs to CodelyTV opened only with Miguel's OK, max 2 open at a time
Runner: `bash scripts/validate.sh`

## Specs
- S1 Sync the fork with the original before changing anything
- S2 Diagnose and choose 2–4 improvements the maintainer would accept
- S3 One branch and one PR per improvement, Spanish PR text, max 2 open PRs per repo
- S4 README section "Cambios en este fork", repo description and topics
- S5 Local validation with evidence and devlog (protocol §3–§4, ADR 0001)

## Tasks
| ID | Task | Specs | Route | Status | Commit |
|---|---|---|---|---|---|
| T1 | Sync fork main with upstream main (4f969f7) | S1 | inline | done (already in sync) | 4f969f7 |
| T2 | Diagnosis of the 14 projects: install, lint, tests, tsc | S2 | inline | done (docs/diagnostico.md) | |
| T3 | 03-testing/3-integration-e2e: Jest ignores Cypress specs, lint config fixed | S2, S3 | inline | done (5/5 tests, lint 0 errors) | 8f8e868, f2ab914, 55cea01 |
| T4 | 06-object-oriented: CourseTitle accepts up to 40 chars, test imports fixed | S2, S3 | inline | done (4 tests) | 90486d6 |
| T5 | 07-maps: location tests instead of leftover course tests | S2, S3 | inline | done (5 tests) | 677e985, 5ca86f4 |
| T6 | Local validation script and evidence | S5 | inline | done (14 tests) | |
| T7 | Open PR fix/integration-e2e-jest-ignores-cypress to CodelyTV | S3 | user | needs-miguel (approve; command in docs/prs/01-fix-integration-e2e-jest.md) | 55cea01 |
| T8 | Open PR fix/oo-course-title-validation to CodelyTV | S3 | user | needs-miguel (approve; command in docs/prs/02-fix-oo-course-title.md) | 90486d6 |
| T9 | Open PR test/maps-locations-tests once T7 or T8 is closed | S3 | user | needs-miguel (approve; open only when fewer than 2 PRs are open) | 5ca86f4 |
| T10 | README section, description and 8 topics | S4 | inline | done | |
| T11 | Independent reviews (code, security, architecture+spec) | S5 | delegated | done (docs/reviews/) | |
