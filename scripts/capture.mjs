/// Captura screenshots del B2B para el deck de venta.
/// Requiere `npm run dev` corriendo en :3000 (rirhub-b2b).
/// Uso: node scripts/capture.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3000';
const OUT = new URL('../public/shots/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const SHOTS = [
  ['/', 'dashboard'],
  ['/recepcion', 'recepcion'],
  ['/socios', 'socios'],
  ['/soporte', 'soporte'],
  ['/clases', 'clases'],
  ['/membresias', 'membresias'],
  ['/publicidad', 'publicidad'],
  ['/cms', 'cms'],
  ['/reportes', 'reportes'],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

// Login como admin
await page.goto(`${BASE}/login`);
await page.waitForTimeout(1200); // hidratación Vue
await page.fill('#email', 'admin@rirhub.mx');
await page.fill('#password', 'demo1234');
await page.click('button[type="submit"]');
// navigateTo es SPA — no dispara evento de navegación; esperar a que
// la URL cambie y Firebase resuelva la sesión.
await page.waitForFunction(() => location.pathname === '/', { timeout: 60000 });
await page.waitForTimeout(3000); // listeners + datos

for (const [path, name] of SHOTS) {
  await page.goto(`${BASE}${path}`);
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}${name}.png` });
  console.log(`✓ ${name}`);
}

// Detalle de un socio — captura la ficha completa
await page.goto(`${BASE}/socios`);
await page.waitForTimeout(1500);
const firstMember = page.locator('table tbody tr a, a[href^="/socios/"]').first();
if (await firstMember.count()) {
  await firstMember.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}socio-detalle.png` });
  console.log('✓ socio-detalle');
}

await browser.close();
console.log('Listo — shots en public/shots/');
