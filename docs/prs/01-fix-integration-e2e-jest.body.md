## Qué cambia

En `03-testing/3-integration-e2e`:

- `jest.config.js` ignora `tests/e2e-integration/` en lugar de `tests/e2e/`.
- `.eslintrc.js` usa `extends: ["react-app/jest"]` en el override de los tests (antes estaba en `plugins`) e ignora la carpeta `/api/` (la API de apoyo), que tiene su propia configuración de ESLint.

## Por qué

- Los tests de Cypress de este ejemplo están en `tests/e2e-integration/` (así lo dice `cypress.config.ts`), pero Jest seguía ignorando `tests/e2e/`, que no existe. Por eso `npm test` también ejecutaba las specs de Cypress y fallaba con `cy is not defined` y `fetch is not defined` (5 tests en rojo).
- `react-app/jest` es una configuración compartida, no un plugin, así que `npm run lint` se paraba con `ESLint couldn't find the plugin "eslint-plugin-react-app/jest"` sin revisar nada. Al arreglarlo aparecía un segundo error si se habían instalado las dependencias de `api/`: el plugin `simple-import-sort` cargado dos veces.

## Cómo se ha probado

- Antes: `npx jest --ci` → 5 tests fallidos de 10; `npm run lint` termina con error de configuración.
- Después: `npx jest --ci` → 5 de 5 en verde (las specs de Cypress se siguen ejecutando con `npm run cy:run`); `npm run lint` sin errores (4 avisos ya existentes), con y sin `api/node_modules` instalado.
