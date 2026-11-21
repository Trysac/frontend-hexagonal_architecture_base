# Revisión de arquitectura y cumplimiento de spec · FORKS-A (2026-11-20)

Revisor: subagente independiente (solo lectura), contra la parte A de `forks-mejoras-y-plantillas.md`, el §9 del protocolo y el ADR 0001.

| ID | Área | Sev. | Hallazgo | Resolución |
|---|---|---|---|---|
| R1 | Arquitectura | info | Tests de casos de uso en la capa de aplicación, con el puerto falseado y sin React ni infraestructura; test del adaptador real en maps. | — |
| R2 | Arquitectura | info | `CourseTitle.spec.ts` prueba el value object en dominio. | — |
| R3 | ADR / licencia | media | El ADR (y la planificación) decían "sin licencia", pero cada subproyecto tiene `LICENSE` AGPL-3.0. | **Resuelto**: fila "Licencia" del ADR corregida en los dos forks; se avisa a la planificación en el informe final. |
| R4 | ADR / §9 | media | Faltaban `STATE.md`, `odd/tasks`, `CHANGELOG.md`, etiqueta, sesiones, informe y `docs/reviews/`. | **Resuelto** en el commit de documentación del `main` del fork (estaban en curso durante la revisión). |
| R5 | Entrega | media | Documentación sin commitear: la sección del README no se veía en GitHub. | **Resuelto**: commit y push de `main`. |
| R6 | PR de CI | media | La matriz con `object-oriented` llegaría en rojo. | **Resuelto** (`999ea05`), igual que H1 de la revisión de código. |
| R7 | Estilo PR | baja | Los PR aceptados antes son de una línea y en inglés; los borradores, en español y más largos (como pide la spec). | Aceptado: se sigue la spec (español, qué/por qué/cómo se probó) con títulos convencionales en inglés como los aceptados. |
| R8 | Metadatos | baja | La descripción decía "proposed upstream" con los PR sin abrir. | **Resuelto**: "prepared for upstream". |
| R9 | Diagnóstico | info | Los hallazgos coinciden con el código. | — |
| R10 | Mejora no vista | baja | Falta el motivo de no testear `object-oriented` en el repo de ejemplos; H6 del curso podría ir en cola. | **Resuelto**: motivo añadido al diagnóstico; H6 anotada como candidata a cuarta rama. |
| R11 | Reglas | info | Autoría de Miguel, sin coautoría, ramas desde `upstream/main`, validación en verde. | — |

Huecos del ADR señalados y cubiertos: qué hacer con ramas obsoletas frente a `upstream`, criterio de "no insistir" (60 días) y aviso de que 8 temas es el mínimo del §9.2.
