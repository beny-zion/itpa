/**
 * Extract the Ready Systems logo from the supplied credit HTML and save it as a PNG.
 *
 * Usage:
 *   1. Save the attached credit file to the project root as: ready-systems-credit.html
 *   2. Run: node scripts/extract-rs-logo.mjs
 *
 * It finds the data:image/png;base64,... of the .rs-credit__logo <img> and decodes it
 * to public/ready-systems-logo.png — no manual copying of the base64 required.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const htmlPath = join(root, "ready-systems-credit.html");
const outPath = join(root, "public", "ready-systems-logo.png");

if (!existsSync(htmlPath)) {
  console.error(
    "✗ לא נמצא ready-systems-credit.html בשורש הפרויקט.\n" +
      "  שמרי את הקובץ שצירפת שם בשם הזה והריצי שוב."
  );
  process.exit(1);
}

const html = readFileSync(htmlPath, "utf8");
const match = html.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);

if (!match) {
  console.error("✗ לא נמצאה תמונת base64 בקובץ ה-HTML.");
  process.exit(1);
}

const buf = Buffer.from(match[1], "base64");
writeFileSync(outPath, buf);
console.log(`✓ נשמר הלוגו: public/ready-systems-logo.png (${buf.length} bytes)`);
