// Bakes the hero's blurred photo twin and the page glow into small JPEGs, so the page never runs a
// live CSS blur on those large layers (that re-ran on every composited frame and held phones to
// ~15-19fps). Rerun after replacing src/assets/hero/mountain.jpg:  npm run hero-blur
import sharp from "sharp";

const source = "src/assets/hero/mountain.jpg";
const outputs = [
  // CSS blur(40px) saturate(1.45) brightness(1.05) across a ~1440px layer, baked at 240px wide.
  { file: "src/assets/hero/mountain-blur-twin.jpg", width: 240, sigma: 7, saturation: 1.45, brightness: 1.05 },
  // Phones: the blurred layer shows below the photo, behind the glass card. Bake it from the hills and
  // trees beside the face (left 28% of the photo, 40-75% down), so the face is not seen twice.
  { file: "src/assets/hero/mountain-blur-landscape.jpg", width: 120, sigma: 5, saturation: 1.45, brightness: 1.05, crop: { left: 0, top: 0.4, width: 0.28, height: 0.35 } },
  // CSS blur(75px) saturate(1.4) across the page glow, baked at 160px wide.
  { file: "src/assets/hero/mountain-blur-ambient.jpg", width: 160, sigma: 8, saturation: 1.4, brightness: 1 },
];

for (const o of outputs) {
  const meta = await sharp(source).metadata();
  const base = o.crop
    ? sharp(source).extract({
        left: Math.round(meta.width * o.crop.left),
        top: Math.round(meta.height * o.crop.top),
        width: Math.round(meta.width * o.crop.width),
        height: Math.round(meta.height * o.crop.height),
      })
    : sharp(source);
  await base
    .resize({ width: o.width })
    .modulate({ saturation: o.saturation, brightness: o.brightness })
    .blur(o.sigma)
    .jpeg({ quality: 70 })
    .toFile(o.file);
  console.log(o.file);
}
