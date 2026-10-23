// Exporta el deck HTML a PDF (1280x720 por slide) con Chromium headless.
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const file = resolve('deck/index.html');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto(`file://${file}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500); // fuentes + imágenes
await page.pdf({
  path: 'deck/rir-hub-presentacion.pdf',
  preferCSSPageSize: true,
  printBackground: true,
});
await browser.close();
console.log('✓ deck/rir-hub-presentacion.pdf');
