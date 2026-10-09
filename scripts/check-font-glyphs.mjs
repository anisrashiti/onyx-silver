import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";

// Verify actual Unicode-to-glyph mappings, rather than relying on CSS font checks
// that can silently accept a fallback for unsupported characters.
const paths = process.argv.slice(2);
assert.ok(paths.length, "Supply official TTF reference paths to check.");
const characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", ...[0xc7, 0xe7, 0xcb, 0xeb].map((code) => String.fromCodePoint(code))];

function supports(buffer, code) {
  const tableCount = buffer.readUInt16BE(4);
  let cmap;
  for (let i = 0; i < tableCount; i++) {
    const table = 12 + i * 16;
    if (buffer.toString("ascii", table, table + 4) === "cmap") cmap = buffer.readUInt32BE(table + 8);
  }
  assert.ok(cmap, "Missing cmap table.");
  const count = buffer.readUInt16BE(cmap + 2);
  for (let i = 0; i < count; i++) {
    const entry = cmap + 4 + i * 8;
    const platform = buffer.readUInt16BE(entry);
    const encoding = buffer.readUInt16BE(entry + 2);
    if (!(platform === 0 || (platform === 3 && [1, 10].includes(encoding)))) continue;
    const sub = cmap + buffer.readUInt32BE(entry + 4);
    const format = buffer.readUInt16BE(sub);
    if (format === 12) {
      const groups = buffer.readUInt32BE(sub + 12);
      for (let j = 0; j < groups; j++) {
        const group = sub + 16 + j * 12;
        const start = buffer.readUInt32BE(group);
        const end = buffer.readUInt32BE(group + 4);
        if (code >= start && code <= end && buffer.readUInt32BE(group + 8) + code - start !== 0) return true;
      }
    } else if (format === 4) {
      const segments = buffer.readUInt16BE(sub + 6) / 2;
      const ends = sub + 14;
      const starts = ends + segments * 2 + 2;
      const deltas = starts + segments * 2;
      const ranges = deltas + segments * 2;
      for (let j = 0; j < segments; j++) {
        if (code < buffer.readUInt16BE(starts + j * 2) || code > buffer.readUInt16BE(ends + j * 2)) continue;
        const delta = buffer.readInt16BE(deltas + j * 2);
        const range = buffer.readUInt16BE(ranges + j * 2);
        let glyph = range ? buffer.readUInt16BE(ranges + j * 2 + range + (code - buffer.readUInt16BE(starts + j * 2)) * 2) : code;
        if (!range || glyph) glyph = (glyph + delta) & 0xffff;
        if (glyph) return true;
      }
    }
  }
  return false;
}

const results = paths.map((path) => {
  const buffer = readFileSync(path);
  const missing = characters.filter((character) => !supports(buffer, character.codePointAt(0)));
  assert.deepEqual(missing, [], `Missing glyphs in ${path}`);
  return { path, checked: characters.join(""), missing, passed: true };
});
writeFileSync("outputs/font-glyphs.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results));
