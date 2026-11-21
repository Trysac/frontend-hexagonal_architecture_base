# Diagnóstico del repo del curso (2026-11-20)

Hecho sobre `upstream/main` = `4f969f7` (último cambio en CodelyTV: oct-2023), Windows 11, Node 22.14, npm 10.9, `npm ci` limpio y `CYPRESS_INSTALL_BINARY=0`. Hay 14 proyectos con `package.json`; los 14 instalan sin errores.

| Proyecto | Jest | Lint | Nota |
|---|---|---|---|
| `02-first_use_case/1-create_course` | sin tests | 1 error (`no-empty-function`) | Parece el punto de partida del ejercicio (función vacía a propósito) |
| `02-first_use_case/2-repository_pattern`, `3-validations` | sin tests | ok | |
| `03-testing/2-unit-testing` | 5/5 | ok | |
| `03-testing/3-integration-e2e` | **5 fallos** | **no arranca** (`react-app/jest` en `plugins`) | Jest ejecuta las specs de Cypress |
| `03-testing/3-integration-e2e/api` | sin tests | no ejecutable | API de apoyo del ejemplo |
| `04-…/1-refactor-from-legacy` | sin Jest | ok | Solo Cypress |
| `04-…/2-you-might-not-need-hexagonal-architecture` | ok | 6 errores de tipos `any` en tests | |
| `05-one-more-step/1-promises`, `2-object-mothers` | 5/5 y 4/4 | ok | |
| `06-…/1-functional`, `3-value-objects/functional` | 4/4 y 4/4 | ok | |
| `06-…/2-object-oriented` | **no arranca** | 2 errores | Imports rotos y `CourseTitle.isValid` invertido |
| `07-next-steps/1-more-examples/maps` | **no arranca** | 6 errores | Tests copiados del ejemplo de cursos |

## Hallazgos y decisión

| # | Hallazgo | Decisión |
|---|---|---|
| H1 | `03-testing/3-integration-e2e`: `testPathIgnorePatterns` apunta a `tests/e2e/` pero Cypress vive en `tests/e2e-integration/`; además `npm run lint` no arranca (`react-app/jest` declarado como plugin y conflicto con `api/`). | **PR** `fix/integration-e2e-jest-ignores-cypress` |
| H2 | `06-…/2-object-oriented`: `CourseTitle.isValid` usa `>` en vez de `<=` (desde `735343b`) y los tests importan `src/CoursesContext`, que no existe. | **PR** `fix/oo-course-title-validation` |
| H3 | `07-…/maps`: los tests son de cursos y apuntan a módulos inexistentes. | **Rama preparada** `test/maps-locations-tests`; PR en cola por el límite de 2 abiertos |
| H4 | Los workflows están dentro de cada proyecto y nunca se ejecutaron. | **No se propone:** con 14 proyectos y varios en rojo, una CI en la raíz saldría roja hasta arreglar todo. Se propone en el repo de ejemplos, que tiene 3 proyectos. |
| H5 | `tsc --noEmit` incluye las specs de Cypress (errores de tipos de `cy`) en `03-testing/3-integration-e2e` y `06-…/2-object-oriented`. | Solo en el fork, como idea: excluir `tests/e2e*` del `tsconfig.json` raíz. Bajo valor para el curso. |
| H6 | `04-…/2-you-might-not-need…`: lint con 6 errores `no-unsafe-*` en tests. | Candidata a cuarta rama si se acepta alguno de los PR anteriores; no se prepara ahora para no acumular PR sin respuesta. |
| H7 | Vulnerabilidades de `react-scripts` 5 en todos los proyectos. | No se propone (migrar de herramienta cambia el enfoque del curso). |
| H8 | `03-testing/3-integration-e2e/api`: `npm run lint` también falla. | Solo anotado: es la API de apoyo del ejemplo. |
