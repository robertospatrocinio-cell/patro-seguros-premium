import sharp from 'sharp';
const src = 'public/images/hero-home.webp';
const b = await sharp(src).toBuffer();
const meta = await sharp(b).metadata();
console.log('src', meta.width, 'x', meta.height);
for (const w of [480, 960, 1280]) {
  for (const fmt of ['avif', 'webp']) {
    const out = `public/images/hero-home-${w}.${fmt}`;
    const opts = fmt === 'avif' ? { quality: 45, effort: 4 } : { quality: 72, effort: 4 };
    await sharp(b).resize({ width: w }).toFormat(fmt, opts).toFile(out);
  }
}
console.log('done');
