import sharp from 'sharp';
import { resolve } from 'path';
import { mkdirSync, existsSync } from 'fs';

const sizes = [192, 512];
const source = resolve(process.cwd(), 'src/assets/logo.png');
const outputDir = resolve(process.cwd(), 'public/icons');

async function generateIcons() {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  for (const size of sizes) {
    await sharp(source)
      .resize(size, size)
      .toFile(resolve(outputDir, `icon-${size}x${size}.png`));
  }

  console.log('✅ PWA icons generated successfully');
}

generateIcons(); 