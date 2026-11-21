# FORKS-A (frontend-hexagonal_architecture_base) — state

Last update: 2026-11-20 (three PR branches validated; two ready to open, one queued)
Phase: F1 — Improvements prepared as upstream PRs

## Waiting on Miguel
- Approve opening the PR `fix/integration-e2e-jest-ignores-cypress` to CodelyTV (since 2026-11-20; ref odd/tasks/forks-a.md T7)
- Approve opening the PR `fix/oo-course-title-validation` to CodelyTV (since 2026-11-20; ref odd/tasks/forks-a.md T8)
- Approve the queued PR `test/maps-locations-tests`, to open when one of the two above closes (since 2026-11-20; ref odd/tasks/forks-a.md T9)

## Blocked
none

## Next step
- Miguel reviews docs/prs/ and, if OK, runs the `gh pr create` commands there (two at most at a time)
- After a PR is merged or closed: delete its branch and update "Cambios en este fork"

## Blocks
| Block | Content | Status | Verify |
|---|---|---|---|
| B1 | Sync, diagnosis, 3 PR branches, docs and validation | done | `bash scripts/validate.sh` |
| B2 | Open the PRs to CodelyTV (max 2 at a time) | needs-miguel (approve each PR) | `gh pr list -R CodelyTV/frontend-hexagonal_architecture-course --author Trysac` |
