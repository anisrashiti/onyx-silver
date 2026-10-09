import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const target = fileURLToPath(new URL("../public/fonts/Satoshi-Variable.woff2", import.meta.url));
if (!existsSync(target)) {
  // FFL permits self-hosting, but not redistributing font binaries in repositories.
  // Obtain an unchanged official copy for this checkout; never use a mirror.
  const response = await fetch("https://api.fontshare.com/v2/fonts/download/satoshi", { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Official Satoshi download failed: ${response.status}. Run npm run fonts again when Fontshare is reachable.`);
  const zip = Buffer.from(await response.arrayBuffer());
  if (zip.length < 22 || zip.length > 10_000_000) throw new Error("Unexpected Fontshare archive size.");
  let end = zip.length - 22;
  const minimum = Math.max(0, zip.length - 65557);
  while (end >= minimum && zip.readUInt32LE(end) !== 0x06054b50) end--;
  if (end < minimum) throw new Error("Fontshare did not return a ZIP archive.");
  const count = zip.readUInt16LE(end + 10);
  let offset = zip.readUInt32LE(end + 16);
  let font;
  for (let i = 0; i < count; i++) {
    if (zip.readUInt32LE(offset) !== 0x02014b50) throw new Error("Invalid font archive directory.");
    const compression = zip.readUInt16LE(offset + 10);
    const compressedLength = zip.readUInt32LE(offset + 20);
    const nameLength = zip.readUInt16LE(offset + 28);
    const extraLength = zip.readUInt16LE(offset + 30);
    const commentLength = zip.readUInt16LE(offset + 32);
    const localOffset = zip.readUInt32LE(offset + 42);
    const name = zip.toString("utf8", offset + 46, offset + 46 + nameLength);
    if (name.endsWith("/Fonts/WEB/fonts/Satoshi-Variable.woff2")) {
      const start = localOffset + 30 + zip.readUInt16LE(localOffset + 26) + zip.readUInt16LE(localOffset + 28);
      const bytes = zip.subarray(start, start + compressedLength);
      font = compression === 0 ? bytes : compression === 8 ? inflateRawSync(bytes) : undefined;
      break;
    }
    offset += 46 + nameLength + extraLength + commentLength;
  }
  if (!font || font.toString("ascii", 0, 4) !== "wOF2") throw new Error("The official Satoshi WOFF2 was not found.");
  mkdirSync(fileURLToPath(new URL("../public/fonts/", import.meta.url)), { recursive: true });
  writeFileSync(target, font);
  console.log("Downloaded the unchanged official Satoshi variable WOFF2 for local self-hosting.");
} else {
  console.log("Official Satoshi font is ready.");
}
