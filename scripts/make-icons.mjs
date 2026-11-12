// Builds the favicon and app icons in public/ from the summit mark: a cream mountain peak with the
// gold summit flag from the 02 elevation chart, on the night colour. Run: npm run icons
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const NIGHT = "#0b1318";
const CREAM = "#f3ead8";
const GOLD = "#e2b66a";

/**
 * The mark on a 32-unit square. `pad` shrinks the drawing toward the centre (app icons get more
 * room around it); `stroke` is the peak's line width in those units.
 */
function svg({ pad = 0, stroke = 2.6 } = {}) {
  const s = 1 - 2 * pad;
  const t = (x) => +(16 + (x - 16) * s).toFixed(3); // scale about the centre
  const peak = `M${t(3.5)} ${t(26.5)} L${t(13)} ${t(12)} L${t(17)} ${t(18)} L${t(20.5)} ${t(13.5)} L${t(28.5)} ${t(26.5)}`;
  const pole = `M${t(13)} ${t(12)} L${t(13)} ${t(4)}`;
  const flag = `M${t(13)} ${t(4)} L${t(20)} ${t(6.5)} L${t(13)} ${t(9)} Z`;
  const w = +(stroke * s).toFixed(3);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">` +
    `<rect width="32" height="32" fill="${NIGHT}"/>` +
    `<path d="${peak}" fill="none" stroke="${CREAM}" stroke-width="${w}" stroke-linejoin="miter" stroke-linecap="square"/>` +
    `<path d="${pole}" fill="none" stroke="${GOLD}" stroke-width="${+(w * 0.7).toFixed(3)}" stroke-linecap="square"/>` +
    `<path d="${flag}" fill="${GOLD}"/>` +
    `</svg>`
  );
}

// Tab icon (scales cleanly; the night square keeps it legible on light and dark tab bars).
await writeFile("public/icon.svg", svg());

// PNG sizes. App icons (apple, 192, 512) get padding so platform masks don't clip the flag.
const png = (size, pad, stroke) =>
  sharp(Buffer.from(svg({ pad, stroke })), { density: 72 * Math.max(1, 512 / 32) })
    .resize(size, size)
    .png()
    .toBuffer();

const out = {
  "favicon-16x16.png": [16, 0, 3],
  "icon.png": [32, 0, 2.6],
  "apple-icon.png": [180, 0.16, 2.2],
  "icon-192.png": [192, 0.18, 2.2],
  "icon-512.png": [512, 0.18, 2],
};
const bufs = {};
for (const [name, [size, pad, stroke]] of Object.entries(out)) {
  bufs[name] = await png(size, pad, stroke);
  await writeFile(`public/${name}`, bufs[name]);
}

// favicon.ico with the 16 and 32 PNGs embedded.
const imgs = [
  [16, bufs["favicon-16x16.png"]],
  [32, bufs["icon.png"]],
];
const head = Buffer.alloc(6 + 16 * imgs.length);
head.writeUInt16LE(0, 0);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(imgs.length, 4);
let offset = head.length;
imgs.forEach(([s, b], i) => {
  const o = 6 + i * 16;
  head.writeUInt8(s, o);
  head.writeUInt8(s, o + 1);
  head.writeUInt16LE(1, o + 4);
  head.writeUInt16LE(32, o + 6);
  head.writeUInt32LE(b.length, o + 8);
  head.writeUInt32LE(offset, o + 12);
  offset += b.length;
});
await writeFile("public/favicon.ico", Buffer.concat([head, ...imgs.map(([, b]) => b)]));
console.log("icons written");
