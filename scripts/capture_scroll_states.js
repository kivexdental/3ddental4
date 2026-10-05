import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Frame 0: Hero
  await page.screenshot({ path: 'captured_hero.png' });
  console.log('Hero captured');

  // Find the total scroll height and pinned distance
  const scrollInfo = await page.evaluate(() => {
    return {
      scrollHeight: document.documentElement.scrollHeight,
      innerHeight: window.innerHeight
    };
  });
  console.log('Scroll info:', scrollInfo);

  // 2. Click section indicator 02 (About) or scroll
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button[title*="Section 02"]');
    if (buttons.length > 0) buttons[0].click();
    else window.scrollTo(0, window.innerHeight * 1.5);
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'captured_about.png' });
  console.log('About captured');

  // 3. Click section indicator 03 (Services)
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button[title*="Section 03"]');
    if (buttons.length > 0) buttons[0].click();
    else window.scrollTo(0, window.innerHeight * 3.8);
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'captured_services.png' });
  console.log('Services captured');

  // 4. Click section indicator 04 (Reviews)
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button[title*="Section 04"]');
    if (buttons.length > 0) buttons[0].click();
    else window.scrollTo(0, window.innerHeight * 5.2);
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'captured_reviews.png' });
  console.log('Reviews captured');

  await browser.close();
}

capture().catch(console.error);
