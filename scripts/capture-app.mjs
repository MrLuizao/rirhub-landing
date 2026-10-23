// Captura screenshots de la app del socio (Flutter web, mock mode).
// Flutter web = canvas → se habilita el árbol de semántica (aria) para
// localizar botones por texto en vez de coordenadas a ciegas.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:5050';
const OUT = 'public/shots/app';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
const shot = async (name, wait = 1500) => {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`✓ ${name}`);
};

await page.goto(BASE);
await page.waitForTimeout(12000); // boot canvaskit

// Habilitar semántica → botones accesibles por rol/texto
const sem = page.locator('flt-semantics-placeholder');
if (await sem.count()) {
  await sem.dispatchEvent('click');
  await page.waitForTimeout(1500);
}

await shot('01-onboarding', 0);

// "Saltar" en onboarding
const saltar = page.getByRole('button', { name: /saltar/i });
if (await saltar.count()) await saltar.click();
await page.waitForTimeout(3000);
await shot('01b-login', 0);

// "Continuar sin cuenta (demo)"
const demo = page.getByRole('button', { name: /demo/i });
if (await demo.count()) await demo.click();
await page.waitForTimeout(4000);
await shot('02-home');

// Bottom nav: Inicio · Explorar · Aliados · Descuentos · Perfil
const tabs = ['Explorar', 'Aliados', 'Descuentos', 'Perfil'];
const names = ['03-explorar', '04-aliados', '05-descuentos', '06-perfil'];
for (let i = 0; i < tabs.length; i++) {
  const tab = page.getByRole('button', { name: new RegExp(`^${tabs[i]}$`, 'i') }).last();
  if (await tab.count()) await tab.click();
  await shot(names[i], 2200);
}

// Detalle de sede: volver a Explorar y tocar la primera card (Select)
await page.getByRole('button', { name: /^Explorar$/i }).last().click();
await page.waitForTimeout(2500);
await page.mouse.click(195, 460); // card Select
await shot('07-sede-detalle', 2500);
// CHECK-IN → QR del socio (botón dentro del detalle)
const qr = page.getByRole('button', { name: /check-in/i }).first();
if (await qr.count()) {
  await qr.click();
  await shot('08-qr-checkin', 2500);
} else {
  console.log('no se halló botón check-in');
}

await browser.close();
console.log('Listo');
