import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const solution = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const starter = existsSync(resolve(solution, "../starter"))
  ? resolve(solution, "../starter")
  : resolve(solution, "../../starter");
const source = readFileSync(resolve(starter, "components/ui/blackhole-hero-section.tsx"), "utf8");
const candidate = readFileSync(resolve(solution, "src/components/ui/blackhole-hero-section.tsx"), "utf8");

for (const name of ["VERT", "SCENE_FRAG", "BLEND_FRAG", "BRIGHT_FRAG", "BLUR_FRAG", "COMPOSITE_FRAG"]) {
  const extract = (text) => text.split(`const ${name} = \``)[1].split("`;")[0].replaceAll("\r\n", "\n");
  const expected = extract(source);
  const actual = extract(candidate);
  assert.equal(actual, expected, `${name} must retain the supplied shader`);
  console.log(`${name}: unchanged; SHA-256 ${createHash("sha256").update(actual).digest("hex")}`);
}
assert.deepEqual(readFileSync(resolve(solution, "src/demo.tsx")), readFileSync(resolve(starter, "demo.tsx")));
console.log("Demo: byte-identical to starter/demo.tsx");
const api = (text) => text.slice(text.indexOf("export interface"), text.indexOf("/*  Shaders" )).replaceAll("\r\n", "\n");
assert.equal(api(candidate), api(source), "Public API must retain the supplied props");
console.log("Public props: unchanged");
const defaults = (text) => text.split("export function BlackHoleHeroSection({")[1].split("}: BlackHoleHeroSectionProps)")[0].replaceAll("\r\n", "\n");
assert.equal(defaults(candidate), defaults(source), "Default props must remain unchanged");
console.log("Default props: unchanged");
