## Qué cambia

En `07-next-steps/1-more-examples/maps` se quitan los tests de `CreateCourseForm` y el `CourseMother`, y se añaden tests unitarios del módulo `locations`:

- `calculateCenterLocation`: una sola ubicación, la media de varias y el error con la lista vacía.
- `getAllLocations`: devuelve lo que entrega el repositorio.
- `JSONLocationRepository`: convierte cada elemento del JSON en un `Location` del dominio (se compara el resultado exacto, así que detectaría latitud y longitud cruzadas).

## Por qué

Los tests de este ejemplo se habían copiado del ejemplo de cursos y apuntaban a módulos que aquí no existen (`sections/locations/CoursesContext`, `CreateCourseForm`…). Por eso `npm test` no podía ejecutar ninguna suite y `npm run lint` daba 6 errores.

## Cómo se ha probado

- Antes: `npx jest --ci` → 1 suite que no se puede ejecutar; `npm run lint` con 6 errores.
- Después: 3 suites y 5 tests en verde; `npm run lint` sin errores; `npx tsc --noEmit` sin errores.
