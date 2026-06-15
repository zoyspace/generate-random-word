#!/usr/bin/env node

import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const args = new Map();

for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const input = args.get("--input");
const output = args.get("--output");
const framesDir = args.get("--frames-dir");
const columns = Number(args.get("--columns") ?? 4);
const rows = Number(args.get("--rows") ?? 2);
const names = (args.get("--names") ?? "")
  .split(",")
  .map((name) => name.trim())
  .filter(Boolean);

if (!input || !output || !framesDir) {
  throw new Error("--input, --output, and --frames-dir are required.");
}

if (!Number.isInteger(columns) || !Number.isInteger(rows) || columns < 1 || rows < 1) {
  throw new Error("--columns and --rows must be positive integers.");
}

if (names.length !== columns * rows) {
  throw new Error("--names must contain exactly columns * rows entries.");
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let index = 0; index < data.length; index += 4) {
  const red = data[index];
  const green = data[index + 1];
  const blue = data[index + 2];

  if (green > red * 1.35 && green > blue * 1.35 && green > 100) {
    const edgeColor = Math.max(red, blue);
    data[index + 1] = Math.min(green, edgeColor);
    data[index + 3] = Math.max(0, Math.min(255, Math.round((edgeColor - 8) * 4)));
  }
}

await mkdir(dirname(output), { recursive: true });
await mkdir(framesDir, { recursive: true });
await sharp(data, { raw: info }).png().toFile(output);

const metadata = await sharp(output).metadata();

if (!metadata.width || !metadata.height) {
  throw new Error("Unable to read processed image dimensions.");
}

if (metadata.width % columns !== 0 || metadata.height % rows !== 0) {
  throw new Error("Sprite sheet dimensions must divide evenly by the grid.");
}

const frameWidth = metadata.width / columns;
const frameHeight = metadata.height / rows;

for (let index = 0; index < names.length; index += 1) {
  await sharp(output)
    .extract({
      left: (index % columns) * frameWidth,
      top: Math.floor(index / columns) * frameHeight,
      width: frameWidth,
      height: frameHeight,
    })
    .png()
    .toFile(join(framesDir, `${names[index]}.png`));
}

console.log(
  `Prepared ${output} and ${names.length} frames (${frameWidth}x${frameHeight}).`,
);
