# Hexagonal Architecture in Frontend course

Code examples for [Hexagonal Architecture in Frontend course (in Spanish)](https://pro.codely.com/library/arquitectura-hexagonal-en-frontend-197663/483637/about/).

## Cambios en este fork

Fork de [CodelyTV/frontend-hexagonal_architecture-course](https://github.com/CodelyTV/frontend-hexagonal_architecture-course) mantenido por Miguel. Las mejoras se preparan en ramas que salen del `main` original para proponerlas por PR; la rama `main` de este fork solo añade esta sección y la documentación del trabajo ([`docs/`](docs), [`devlog/`](devlog)).

| Mejora | Rama | PR al original |
|---|---|---|
| `03-testing/3-integration-e2e`: `npm test` deja de ejecutar las specs de Cypress (5 tests en rojo → 0) y `npm run lint` vuelve a funcionar | [`fix/integration-e2e-jest-ignores-cypress`](https://github.com/Trysac/frontend-hexagonal_architecture_base/compare/main...fix/integration-e2e-jest-ignores-cypress) | Preparado ([texto](docs/prs/01-fix-integration-e2e-jest.body.md)), pendiente de abrir |
| `06-…/2-object-oriented`: `CourseTitle` acepta títulos de hasta 40 caracteres y los tests vuelven a ejecutarse | [`fix/oo-course-title-validation`](https://github.com/Trysac/frontend-hexagonal_architecture_base/compare/main...fix/oo-course-title-validation) | Preparado ([texto](docs/prs/02-fix-oo-course-title.body.md)), pendiente de abrir |
| `07-…/maps`: tests del módulo `locations` en lugar de los de cursos copiados | [`test/maps-locations-tests`](https://github.com/Trysac/frontend-hexagonal_architecture_base/compare/main...test/maps-locations-tests) | En cola ([texto](docs/prs/03-test-maps-locations.body.md)) |

Diagnóstico completo: [`docs/diagnostico.md`](docs/diagnostico.md). Validación local: `bash scripts/validate.sh`.
