# Lo que queda para Miguel · FORKS-A

Lista única para los dos forks, en orden. Nada de esto bloquea el resto del trabajo.

## Revisiones (antes de abrir los PR)

1. **Decidir el correo de autor de los commits de las ramas de PR.** Ahora es tu correo personal y quedará público en los PR (y en el historial de CodelyTV si los aceptan). Si prefieres el `noreply` de GitHub, se reescriben las ramas antes de abrir: `git rebase upstream/main --exec 'git commit --amend --no-edit --reset-author'` en cada rama, con `user.email` ya cambiado en el repo, y `git push --force-with-lease`.
   Verificar: `git log upstream/main..origin/<rama> --format='%an <%ae>'`.
2. **Leer los textos de los PR** en `docs/prs/*.body.md` de cada fork.

## Publicación (cada PR necesita tu OK)

Máximo 2 PR abiertos a la vez por repo. Comando exacto en cada `docs/prs/NN-*.md`:

| Orden | Repo original | Rama | Archivo |
|---|---|---|---|
| 1 | `CodelyTV/frontend-hexagonal_architecture-course` | `fix/integration-e2e-jest-ignores-cypress` | `frontend-hexagonal_architecture_base/docs/prs/01-fix-integration-e2e-jest.md` |
| 2 | `CodelyTV/frontend-hexagonal_architecture-course` | `fix/oo-course-title-validation` | `frontend-hexagonal_architecture_base/docs/prs/02-fix-oo-course-title.md` |
| 3 | `CodelyTV/frontend-hexagonal_architecture-example` | `test/use-cases-unit-tests` | `frontend-hexagonal_architecture-example/docs/prs/01-test-use-cases-unit-tests.md` |
| 4 | `CodelyTV/frontend-hexagonal_architecture-example` | `ci/root-workflow` | `frontend-hexagonal_architecture-example/docs/prs/02-ci-root-workflow.md` |
| 5 (en cola) | `CodelyTV/frontend-hexagonal_architecture-course` | `test/maps-locations-tests` | `frontend-hexagonal_architecture_base/docs/prs/03-test-maps-locations.md`: solo cuando se cierre el 1 o el 2 |

Ejecutar desde la carpeta del fork (el `--body-file` es relativo a ella). Verificar: `gh pr list -R <repo original> --author Trysac`.

Después de abrir cada PR: cambiar en el README del fork "pendiente de abrir" por el enlace al PR.

## Opcional

- Permitir ejecutar las pruebas e2e de Cypress en local (descarga el binario y abre un navegador, ~1,5 GB de RAM). Ninguno de los PR las necesita.

## Para la planificación (00a)

- `02-prompts/forks-mejoras-y-plantillas.md` dice que los originales "no declaran licencia". Cada subproyecto de los dos repos de Codely trae un `LICENSE` **AGPL-3.0**. La regla de no copiar su código a las plantillas de la parte B sigue valiendo, ahora con más motivo.
