// Graba un video demo (~90s) recorriendo la consola B2B.
// Playwright produce .webm; ffmpeg lo convierte a .mp4 al final.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

const BASE = 'http://localhost:3000';
mkdirSync('deck/video', { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: 'deck/video', size: { width: 1440, height: 900 } },
});
const page = await ctx.newPage();

const dwell = (ms) => page.waitForTimeout(ms);
const smoothScroll = async (y) => {
  await page.evaluate(v => window.scrollTo({ top: v, behavior: 'smooth' }), y);
};

// Login (rápido — el video empieza ya dentro)
await page.goto(`${BASE}/login`);
await page.waitForTimeout(1000);
await page.fill('#email', 'admin@rirhub.mx');
await page.fill('#password', 'demo1234');
await page.click('button[type="submit"]');
await page.waitForFunction(() => location.pathname === '/', { timeout: 20000 });

// === Dashboard (10s): KPIs + aforo + curva ===
await dwell(5000);
await smoothScroll(300); await dwell(2500);
await smoothScroll(0); await dwell(2000);

// === Recepción (12s): modos de acceso + registro ===
await page.click('text=Recepción');
await dwell(5000);
await page.click('text=WELLHUB'); await dwell(1800);
await page.click('text=TOTALPASS'); await dwell(1800);
await page.click('text=SOCIO CAPITAL'); await dwell(2000);

// === Socios (14s): tabla + detalle ===
await page.click('text=Socios');
await dwell(4500);
await smoothScroll(350); await dwell(2000);
const row = page.locator('tbody tr, [class*="cursor-pointer"]').first();
if (await row.count()) { await row.click().catch(() => {}); await dwell(4000); }
await page.goBack(); await dwell(2500);

// === Soporte (10s) ===
await page.click('text=Soporte');
await dwell(5000);
const convo = page.locator('button, [class*="cursor-pointer"]').filter({ hasText: /Luis|socio|Hola/i }).first();
if (await convo.count()) { await convo.click().catch(() => {}); await dwell(3500); }

// === Clases (8s) ===
await page.click('text=Clases');
await dwell(4500);

// === Membresías (8s) ===
await page.click('text=Membresías');
await dwell(4500);

// === Publicidad (10s): métricas de sponsors ===
await page.click('text=Publicidad');
await dwell(4500);
await smoothScroll(300); await dwell(2000);

// === CMS & Push (10s) ===
await page.click('text=CMS');
await dwell(4500);

// === Reportes (8s) ===
await page.click('text=Reportes');
await dwell(4500);

// === Cierre: vuelta al dashboard ===
await page.click('text=Dashboard');
await dwell(3500);

await ctx.close(); // flush del video
await browser.close();

// webm → mp4 con el ffmpeg de Playwright
const ffmpeg = `${process.env.HOME}/Library/Caches/ms-playwright/ffmpeg-*/ffmpeg-mac-arm64`;
try {
  const src = execSync('ls -t deck/video/*.webm | head -1').toString().trim();
  const ff = execSync(`ls ${ffmpeg} 2>/dev/null | head -1`).toString().trim();
  if (ff) {
    execSync(`"${ff}" -y -i "${src}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart deck/video/demo-b2b.mp4`);
    console.log('✓ deck/video/demo-b2b.mp4');
  } else {
    console.log('✓ webm en', src, '(sin ffmpeg — convertir manual)');
  }
} catch (e) {
  console.log('video listo, conversión falló:', e.message);
}
