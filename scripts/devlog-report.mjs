// Builds docs/development-report.md (and an SVG chart) from devlog/*.jsonl. No dependencies.
// Usage: node scripts/devlog-report.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";

const read = (f) =>
	existsSync(f)
		? readFileSync(f, "utf8").split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l))
		: [];
const sessions = read("devlog/sessions.jsonl");
const errors = read("devlog/errors.jsonl");
const ci = read("devlog/ci.jsonl");
const phases = read("devlog/phases.jsonl");

const sum = (xs, f) => xs.reduce((a, x) => a + (Number(f(x)) || 0), 0);
const by = (xs, k) => xs.reduce((m, x) => ((m[x[k]] = (m[x[k]] || 0) + 1), m), {});
const minutes = sum(sessions, (s) => s.minutes);
const tok = (k) => sum(sessions, (s) => s.tokens?.[k]);
const cost = sum(sessions, (s) => s.cost_usd);
const errCat = by(errors, "category");
const errDet = by(errors, "detected_by");
const mttr = errors.length ? (sum(errors, (e) => e.minutes_to_fix) / errors.length).toFixed(1) : "0";
const recur = errors.filter((e) => e.recurrence_of).length;
const ciOk = ci.filter((c) => c.conclusion === "success").length;
const firstGreen = ci.length ? (ci[0].conclusion === "success" ? "sí" : "no") : "n/a";
const lastCi = ci[ci.length - 1];

// SVG: errors by category
mkdirSync("docs/img", { recursive: true });
const cats = Object.entries(errCat);
const w = 520, bh = 26, h = 30 + cats.length * bh;
const max = Math.max(1, ...cats.map(([, n]) => n));
const bars = cats
	.map(([c, n], i) => {
		const y = 20 + i * bh, bw = Math.round((n / max) * 300);
		return `<text x="110" y="${y + 15}" text-anchor="end" font-size="13" fill="#444">${c}</text><rect x="120" y="${y}" width="${bw}" height="18" fill="#4f7cac"/><text x="${125 + bw}" y="${y + 14}" font-size="12" fill="#222">${n}</text>`;
	})
	.join("");
writeFileSync(
	"docs/img/errors-by-category.svg",
	`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" font-family="sans-serif"><rect width="100%" height="100%" fill="#fff"/>${bars}</svg>\n`
);

const tokenLine = sessions.every((s) => s.token_source === "unavailable")
	? "no medidos (`token_source: unavailable`)"
	: `entrada ${tok("input")}, salida ${tok("output")}, caché creación ${tok("cache_creation")}, caché lectura ${tok("cache_read")}`;

const md = `# Informe de desarrollo (generado)

> Generado por \`node scripts/devlog-report.mjs\` a partir de \`devlog/\`. No editar a mano.

## Totales

| Métrica | Valor |
|---|---|
| Sesiones | ${sessions.length} |
| Tiempo | ${(minutes / 60).toFixed(1)} h (${minutes} min) |
| Tokens | ${tokenLine} |
| Costo equivalente API | ${cost ? "US$ " + cost.toFixed(2) : "n/a"} |
| Errores y retrabajos | ${errors.length} (tiempo medio de corrección ${mttr} min, reincidencias ${recur}) |
| Validaciones locales | ${ci.length} (${ciOk} en verde; la primera en verde: ${firstGreen}) |
| Última validación | ${lastCi ? `${lastCi.conclusion}, ${lastCi.tests_total} tests, ${lastCi.minutes} min` : "n/a"} |
| Fases cerradas | ${phases.length} |

## Errores por categoría

![Errores por categoría](img/errors-by-category.svg)

| Categoría | Errores |
|---|---|
${cats.map(([c, n]) => `| ${c} | ${n} |`).join("\n")}

## Errores por quién los detectó

| Detectado por | Errores |
|---|---|
${Object.entries(errDet).map(([c, n]) => `| ${c} | ${n} |`).join("\n")}

## Detalle de errores

| ID | Categoría | Síntoma | Causa | Arreglo | Min |
|---|---|---|---|---|---|
${errors.map((e) => `| ${e.id} | ${e.category} | ${e.symptom} | ${e.root_cause} | ${e.fix} | ${e.minutes_to_fix} |`).join("\n")}

## Validaciones locales

| Fecha | Rama | Resultado | Tests | Min | Paso fallido |
|---|---|---|---|---|---|
${ci.map((c) => `| ${c.at} | ${c.branch} | ${c.conclusion} | ${c.tests_total} | ${c.minutes} | ${c.failed_step ?? ""} |`).join("\n")}

## Qué funcionó y qué mejoraríamos en el proceso

${existsSync("devlog/lessons.md") ? readFileSync("devlog/lessons.md", "utf8") : "_Sin notas._"}
`;
writeFileSync("docs/development-report.md", md);
console.log(`docs/development-report.md: ${sessions.length} sesiones, ${errors.length} errores, ${ci.length} validaciones`);
