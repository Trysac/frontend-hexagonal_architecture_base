## Qué cambia

En `06-different-approaches/2-object-oriented`:

- `CourseTitle.isValid` devuelve `true` cuando el título tiene **como mucho** 40 caracteres (`<=`), en lugar de cuando tiene **más** de 40 (`>`).
- Los tests importan `CoursesContextProvider` desde `src/sections/courses/CoursesContext`, que es donde está.
- Se añade `tests/modules/courses/domain/CourseTitle.spec.ts` con los dos casos del límite.

## Por qué

Con la condición invertida, cualquier título válido lanzaba el error "is too long" al crear el `Course`, y el formulario marcaba como erróneos los títulos cortos. Además, los dos tests del ejemplo no llegaban a ejecutarse por el import roto, así que nadie lo veía.

## Cómo se ha probado

- Antes: `npx jest --ci` → 2 suites que no se pueden ejecutar (`Cannot find module '../../../src/CoursesContext'`) y 2 errores de `import/no-unresolved` en `npm run lint`.
- Después: 3 suites y 4 tests en verde; `npm run lint` sin errores.
- Comprobación inversa: con la condición original, los 2 tests nuevos de `CourseTitle` fallan.
