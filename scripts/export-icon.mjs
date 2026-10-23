// Exporta el icono RIR-HUB a PNG en todos los tamaños útiles.
// Uso: node scripts/export-icon.mjs
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const brand = resolve('brand');
const sizes = [1024, 512, 256, 180, 64, 32];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });

for (const [file, name] of [['icon.svg', 'icon'], ['icon-dark.svg', 'icon-dark'], ['icon-mark.svg', 'icon-mark']]) {
  await page.goto(`file://${brand}/${file}`);
  await page.waitForTimeout(200);
  for (const s of sizes) {
    await page.setViewportSize({ width: s, height: s });
    await page.screenshot({
      path: `${brand}/png/${name}-${s}.png`,
      omitBackground: true,
    });
  }
  console.log(`✓ ${name} (${sizes.join(', ')})`);
}
await browser.close();
