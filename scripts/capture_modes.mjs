import { chromium } from 'playwright';
import { preview } from 'vite';

async function captureModes() {
  const previewServer = await preview({
    preview: { port: 4174, strictPort: true }
  });

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto('http://localhost:4174', { waitUntil: 'networkidle' });

  // 1. Phone mode screenshot
  const phoneBtn = await page.$('button[aria-label="Switch to Phone preview mode"]');
  if (phoneBtn) {
    await phoneBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'public/kivex_phone_preview.png' });
    console.log('Saved phone preview to public/kivex_phone_preview.png');
  }

  // 2. Tablet mode screenshot
  const tabletBtn = await page.$('button[aria-label="Switch to Tablet preview mode"]');
  if (tabletBtn) {
    await tabletBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'public/kivex_tablet_preview.png' });
    console.log('Saved tablet preview to public/kivex_tablet_preview.png');
  }

  await browser.close();
  previewServer.httpServer.close();
}

captureModes().catch(console.error);
