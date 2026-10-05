import { chromium } from 'playwright';

async function testMobile() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true
  });

  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Capture mobile hero
  await page.screenshot({ path: 'captured_mobile_hero.png' });
  console.log('Mobile hero captured');

  await browser.close();
}

testMobile().catch(console.error);
