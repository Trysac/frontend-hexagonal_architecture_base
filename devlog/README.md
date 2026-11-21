# devlog

Bitácora de cómo se trabajó en este fork, con el esquema `devlog.v1` del protocolo común (§4). Una línea JSON por evento, fechas ISO 8601 con zona `-05:00`. Cifras medidas; lo estimado lleva `"estimated": true` y el método.

| Archivo | Contenido |
|---|---|
| `sessions.jsonl` | Una línea por sesión de trabajo (tokens y costo con `npx ccusage@latest session --json`) |
| `errors.jsonl` | Cada error, fallo o retrabajo que costó tiempo |
| `phases.jsonl` | Cierre de cada fase |
| `ci.jsonl` | Una línea por ejecución de `bash scripts/validate.sh` (la escribe el propio script) |
| `journal.md` | Diario breve por día |
| `lessons.md` | Qué funcionó y qué mejoraríamos (entra en el informe) |

Regenerar el informe: `node scripts/devlog-report.mjs` → `docs/development-report.md` y `docs/img/errors-by-category.svg`.

FORKS-A se hizo en una sola sesión para los dos forks (`frontend-hexagonal_architecture_base` y `frontend-hexagonal_architecture-example`). La línea de sesión es la misma en los dos repos; los errores y las validaciones están en el repo donde ocurrieron.
