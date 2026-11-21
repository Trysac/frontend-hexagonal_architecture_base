# Revisión de seguridad · FORKS-A (2026-11-20)

Revisor: subagente independiente (solo lectura), sobre las 5 ramas, el workflow y la documentación del `main` de los dos forks (repos **públicos**).

| ID | Ubicación | Sev. | Hallazgo | Resolución |
|---|---|---|---|---|
| S1 | `ci.yml` | media | Sin bloque `permissions`: el `GITHUB_TOKEN` hereda el permiso por defecto. Disparadores `push: main` y `pull_request` (no `pull_request_target`). | **Resuelto** (`e7d61ce`): `permissions: contents: read`. |
| S2 | `ci.yml` | baja | Actions de GitHub fijadas por tag mayor, no por SHA. | Aceptado: son actions oficiales y el repo es didáctico. |
| S3 | `ci.yml` | info | Sin `secrets.*` ni interpolación de `github.event.*` en `run:`. | — |
| P1 | `evidence/*/validate-*.log` | baja | Los logs muestran la ruta local `C:\Users\<usuario>\...`. | **Resuelto**: las rutas se normalizan a `~` antes de commitear (`validate.sh`). |
| P2 | Autor de los commits | baja | El correo personal del autor quedará público en los PR y, si se aceptan, en el historial de CodelyTV. | **needs-miguel**: decidir antes de abrir los PR si se reescribe el autor con el correo `noreply` de GitHub (ver `docs/handoff/miguel-checklist.md`). |
| P3 | `gitleaks` | info | Sin fugas en las 5 ramas; la documentación sin commitear no estaba cubierta. | **Resuelto**: `gitleaks dir` sobre la documentación antes de commitear, y `--no-color`. |
| C1 | `validate.sh` | baja | Si `git rev-parse` fallaba, `ROOT` quedaba vacío y el `rm -rf` apuntaba a `/validate-wt`. | **Resuelto**: aborta si `ROOT` está vacío o no es el checkout principal. |
| C2 | `validate.sh` | media | Si `$dir` existía sin ser worktree, `git -C "$dir" checkout` actuaba sobre el repo principal. | **Resuelto**: aborta si `$dir/.git` no es el archivo de un worktree, y ya no silencia `worktree add`. |
| C3 | `validate.sh` | info | Borrado acotado a `validate-wt/`; nombres de rama sin barras. | **Resuelto**: además, `git check-ref-format` de cada rama. |
| C4 | `validate.sh` | info | Detalles menores (`.git/info/exclude`, JSON con `echo`). | Aceptado. |
| D1 | Diffs | info | Sin cambios en `package.json` ni lockfiles. | — |
| D2 | `.claude/settings.json` | info | Solo `includeCoAuthoredBy: false`. | — |

**Veredicto:** apto para publicar. Sin secretos, tokens ni cambios de dependencias.
