/**
 * Generate raster favicon assets from public/favicon.svg.
 *
 * The SVG stays the primary icon. This script produces the
 * fallbacks that browsers and platforms still ask for:
 *   - favicon.ico         (16/32/48, the path browsers auto-request)
 *   - favicon-32x32.png   (generic PNG fallback)
 *   - apple-touch-icon.png(180x180, opaque so iOS does not show it on black)
 *
 * Run with: node scripts/gen-favicons.mjs
 * Re-run whenever favicon.svg changes.
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const pub = fileURLToPath(new URL('../public/', import.meta.url));
const svg = await readFile(pub + 'favicon.svg');

// High render density keeps small sizes crisp (the hat stays sharp at favicon sizes).
const render = (size) =>
  sharp(svg, { density: 512 }).resize(size, size).png().toBuffer();

/** Pack PNG buffers into a single multi-size .ico container. */
function pngsToIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(images.length, 4);

  const entries = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;
  images.forEach((img, i) => {
    const e = entries.subarray(i * 16, i * 16 + 16);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // width (0 => 256)
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // height
    e.writeUInt8(0, 2); // palette count
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(img.buffer.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.buffer.length;
  });

  return Buffer.concat([header, entries, ...images.map((i) => i.buffer)]);
}

// favicon.ico: 16 + 32 + 48
const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({ size, buffer: await render(size) })),
);
await writeFile(pub + 'favicon.ico', pngsToIco(icoImages));

// Generic PNG fallback.
await writeFile(pub + 'favicon-32x32.png', await render(32));

await writeFile(pub + 'favicon-512.png', await render(512));

// apple-touch-icon: hat centered on an opaque white tile with padding.
const hat = await sharp(svg, { density: 512 })
  .resize(150, 150)
  .png()
  .toBuffer();
const appleTouch = await sharp({
  create: { width: 180, height: 180, channels: 4, background: '#ffffff' },
})
  .composite([{ input: hat, gravity: 'center' }])
  .png()
  .toBuffer();
await writeFile(pub + 'apple-touch-icon.png', appleTouch);

console.log('Wrote favicon.ico, favicon-32x32.png, favicon-512.png, apple-touch-icon.png');
