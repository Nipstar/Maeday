// Builds src/app/icon.svg, apple-icon.png (180) and favicon.ico (16/32/48, PNG-encoded) from reference/logo.
// The favicon uses the thicker-stroke mark (brand board: thicker stroke below 32px). Run: npm run icons
import sharp from 'sharp';
import { readFile, writeFile, copyFile } from 'node:fs/promises';

await copyFile('reference/logo/mark.svg', 'src/app/icon.svg');

const mark = await readFile('reference/logo/mark.svg');
// Apple touch icon: iOS masks corners itself, so render the mark on a full Midnight square.
const square = Buffer.from(mark.toString().replace('rx="26"', 'rx="0"'));
await sharp(square, { density: 512 }).resize(180, 180).png().toFile('src/app/apple-icon.png');

const small = await readFile('reference/logo/mark-small.svg');
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(small, { density: 512 }).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
const dir = Buffer.alloc(16 * sizes.length);
let offset = 6 + dir.length;
pngs.forEach((png, i) => {
  const o = i * 16;
  dir.writeUInt8(sizes[i] % 256, o);
  dir.writeUInt8(sizes[i] % 256, o + 1);
  dir.writeUInt16LE(1, o + 4);
  dir.writeUInt16LE(32, o + 6);
  dir.writeUInt32LE(png.length, o + 8);
  dir.writeUInt32LE(offset, o + 12);
  offset += png.length;
});
await writeFile('src/app/favicon.ico', Buffer.concat([header, dir, ...pngs]));
console.log('icons written: src/app/icon.svg, apple-icon.png, favicon.ico');
