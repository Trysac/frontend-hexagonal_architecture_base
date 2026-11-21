# Diario · FORKS-A

## 2026-11-20

- **Qué se hizo:** sincronización de los dos forks con CodelyTV (ya estaban al día), diagnóstico de 3 + 14 proyectos con Node 22, 5 ramas de mejora (2 en ejemplos, 3 en el curso), textos de PR en español, script de validación por worktree limpio, revisión independiente de código, seguridad y arquitectura, y arreglos de sus hallazgos. Ningún PR abierto: quedan como `needs-miguel`.
- **Qué falló:** CRLF en Windows (E001), solape con el PR #1 de upstream (E003), el script de validación al principio (E005–E007), un fallo de ESLint que el diagnóstico no vio (E008, E009), un test con inestabilidad muy baja (E010), un PR de CI que llegaría en rojo (E011), la licencia mal descrita (E012), un archivo vacío perdido en un stash (E013) y un README colado en un PR (E014).
- **Qué se aprendió:** ver `lessons.md`.
- **Decisiones:** [ADR 0001](../docs/adr/0001-protocolo-en-forks.md) (ramas vivas para los PR, documentación solo en `main`, `validate.sh` en lugar de `make ci`, etiqueta `forks-a-v1`).

## 2026-11-21 (PRs)

- Miguel approved opening the PRs (2 at most per repo, Outlook identity). Upstream unchanged since 2023, so no sync was needed; no CONTRIBUTING; titles follow the conventional-commit style of the merged PRs. Opened with the prepared Spanish bodies.
