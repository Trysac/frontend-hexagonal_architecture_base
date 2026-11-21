# Informe de desarrollo (generado)

> Generado por `node scripts/devlog-report.mjs` a partir de `devlog/`. No editar a mano.

## Totales

| Métrica | Valor |
|---|---|
| Sesiones | 1 |
| Tiempo | 1.5 h (90 min) |
| Tokens | entrada 254, salida 114611, caché creación 497725, caché lectura 19683909 |
| Costo equivalente API | US$ 9.37 |
| Errores y retrabajos | 4 (tiempo medio de corrección 5.0 min, reincidencias 0) |
| Validaciones locales | 3 (2 en verde; la primera en verde: no) |
| Última validación | success, 14 tests, 5 min |
| Fases cerradas | 1 |

## Errores por categoría

![Errores por categoría](img/errors-by-category.svg)

| Categoría | Errores |
|---|---|
| design | 1 |
| env | 2 |
| spec | 1 |

## Errores por quién los detectó

| Detectado por | Errores |
|---|---|
| ci | 1 |
| linter | 1 |
| review | 1 |
| manual-run | 1 |

## Detalle de errores

| ID | Categoría | Síntoma | Causa | Arreglo | Min |
|---|---|---|---|---|---|
| E008 | design | validate.sh failed lint for 03-testing/3-integration-e2e although the diagnosis said its lint was ok | the diagnosis only grepped 'problems|error ' and missed ESLint's config crash ('Oops! Something went wrong'); exit codes were not checked | checked eslint exit codes in all 15 projects, corrected docs/diagnostico.md and fixed the config in the same PR branch (extends react-app/jest, ignore api/) | 12 |
| E009 | env | after fixing react-app/jest, ESLint failed with 'couldn't determine the plugin simple-import-sort uniquely' | the app lint descends into api/, which has its own node_modules and ESLint config | ignorePatterns: ['api/'] in the app .eslintrc.js | 3 |
| E012 | spec | ADR said the originals have no license; every subproject ships an AGPL-3.0 LICENSE | trusted the planning document and GitHub's root-level license detection | ADR license row corrected in both forks; flagged to planning in the final report | 3 |
| E013 | env | writing odd/tasks/forks-a.md failed: directory missing | git stash -u / pop to switch branches does not keep empty directories | recreated the folder and the file | 2 |

## Validaciones locales

| Fecha | Rama | Resultado | Tests | Min | Paso fallido |
|---|---|---|---|---|---|
| 2026-11-20T22:54:47-05:00 | main | failure | 14 | 4.5 | fix/integration-e2e-jest-ignores-cypress:03-testing/3-integration-e2e |
| 2026-11-20T23:05:02-05:00 | main | success | 14 | 4.3 |  |
| 2026-11-20T23:26:15-05:00 | main | success | 14 | 5 |  |

## Qué funcionó y qué mejoraríamos en el proceso

- **Leer los PR abiertos del original antes de elegir mejoras.** En el repo de ejemplos, el arreglo más obvio ya estaba propuesto por otra persona; detectarlo pronto evitó un PR duplicado (E003).
- **Diagnosticar con códigos de salida, no con `grep` de la salida.** Un fallo de configuración de ESLint pasó como "ok" en el primer diagnóstico (E008).
- **Validar cada rama en un worktree limpio** (`npm ci` desde el lockfile) reprodujo lo que vería la CI de Codely y sacó a la luz dos problemas que el clon de trabajo ocultaba (E008, E009).
- **Las revisiones independientes valieron la pena:** encontraron un test inestable 1 de cada ~4.650 veces que 5 repeticiones no podían ver (E010), un PR que llegaría en rojo (E011) y una afirmación falsa sobre la licencia (E012).
- **Windows:** fijar `core.autocrlf=false` y `core.longpaths=true` en cuanto se clona un proyecto con Prettier y `node_modules` grandes (E001, E007).
- **Mejoraríamos:** probar el script de validación con un solo objetivo antes de lanzarlo entero (E005, E006).
- **Ramas de PR solo con `git add <rutas>`:** un `commit -a` arrastró al PR de CI un cambio del README del `main` del fork (E014). Lo arreglamos con un commit nuevo, porque no se permite force-push. La próxima vez: un worktree por rama.

