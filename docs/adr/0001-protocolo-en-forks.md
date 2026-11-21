# ADR 0001 · Cómo se aplica el protocolo de arranque a un fork (FORKS-A)

- **Estado:** aceptada · `revisable-por-miguel`
- **Fecha:** 2026-11-20
- **Ámbito:** `Trysac/frontend-hexagonal_architecture_base` y `Trysac/frontend-hexagonal_architecture-example`

## Contexto

El protocolo común (`00a/02-prompts/arranque-2026-11/00-protocolo-comun.md`) está pensado para repos propios: fusión directa a `main`, sin ramas restantes, `make ci`, etiqueta `v1.0.0`, demo desplegada. La parte A de `forks-mejoras-y-plantillas.md` pide lo contrario en varios puntos: una rama y un PR por mejora hacia el repo de CodelyTV, cambios pequeños y fáciles de aceptar, y nada de reescrituras. Además, Miguel aprueba cada PR antes de abrirlo.

## Opciones

1. Aplicar el protocolo al pie de la letra (fusionar las mejoras a `main` del fork y borrar las ramas). Rompe los PR: necesitan su rama viva.
2. No dejar ninguna huella en el fork salvo las ramas. Sin devlog ni evidencias, contra el §4 del protocolo.
3. **Separar:** las ramas de mejora salen de `upstream/main` y solo contienen el cambio que se propone; el `main` del fork lleva además la documentación del trabajo (devlog, evidencias, ADR, textos de los PR y la sección "Cambios en este fork" del README).

## Decisión

Opción 3, con estas adaptaciones:

| Protocolo | En este fork |
|---|---|
| Fusionar a `main` y borrar ramas (§2.1, §9.6) | Las ramas de mejora se conservan (local y remota) hasta que Codely acepte o cierre el PR. `main` del fork **no** incluye el código de las mejoras: así cada PR queda limpio respecto al original. |
| `make ci` y hook `pre-push` (§3.4) | `bash scripts/validate.sh` (no hay `make` en esta laptop): worktree limpio por rama, `npm ci`, `npm run lint`, `jest --ci --maxWorkers=2` y `gitleaks` sobre el diff de cada rama. Escribe en `devlog/ci.jsonl` y en `evidence/`. Sin hook: el repo original no lo tiene y añadirlo cambiaría el proyecto. |
| GitHub Actions prohibido (§3.4) | No se activa ninguna ejecución en el fork. El único workflow nuevo está en una rama de PR (repo de ejemplos), con disparo `push` solo a `main` y `pull_request`, y se ejecutaría en CodelyTV, no en Trysac. |
| Plantilla de `00-portfolio-platform`, `portfolio.yaml`, `mirador.yaml` | No aplica: es código de terceros y el nivel de seguimiento de los forks es `none` (seguimiento-v2 §6). Se dejan `STATE.md` y `odd/tasks/forks-a.md` para que el revisor vea el estado. |
| Licencia | No hay licencia en la raíz (GitHub muestra "sin licencia"), pero **cada subproyecto trae un `LICENSE` AGPL-3.0**. Las contribuciones por PR quedan bajo esa licencia. No se añade ninguna y no se copia su código a repos propios (AGPL es copyleft): las plantillas de la parte B se escriben desde cero. La planificación (`forks-mejoras-y-plantillas.md`) dice "no declaran licencia"; se corrige aquí. |
| *Website*, despliegue, demo | No aplica (ejemplos de un curso). |
| Etiqueta `v1.0.0` + `CHANGELOG.md` | Se usa la etiqueta `forks-a-v1` sobre el `main` del fork para no confundirla con versiones del proyecto original; `CHANGELOG.md` describe solo los cambios del fork. |
| Pruebas e2e | Las specs de Cypress no se ejecutan (sin navegador ni binario de Cypress en modo sin Docker y con la PC cargada). Se registran como pendiente en `odd/tasks/forks-a.md`. |
| Límite de PR | Máximo 2 PR abiertos a la vez por repo. Las mejoras extra quedan preparadas en su rama y se abren cuando se cierre alguno. |
| Ramas obsoletas | Antes de abrir un PR: `git fetch upstream && git rebase upstream/main <rama>` y `bash scripts/validate.sh`. Si `upstream/main` no cambió (repos inactivos desde 2023), no hace falta. |
| No insistir | Si un PR no recibe respuesta en 60 días, se deja como está, sin recordatorios ni menciones, y la fila pasa a `dropped (sin respuesta)`. |
| Temas (8–12) | 8 temas: los 5 de la parte A más `portfolio`, `frontend` y `jest`. Es el mínimo del §9.2. |
| Autoría | Commits con la identidad de Miguel, sin `Co-Authored-By` (`.claude/settings.json` con `includeCoAuthoredBy: false`). |

## Consecuencias

- `main` del fork diverge de `upstream/main` solo en archivos de documentación; `gh repo sync` ya no será *fast-forward*. Para volver a sincronizar: `git fetch upstream && git merge upstream/main` en `main`.
- Cada rama de mejora se puede rebasar sobre `upstream/main` sin conflictos con la documentación.
- Cuando Codely acepte o cierre un PR, se borra su rama y se actualiza la sección "Cambios en este fork".
