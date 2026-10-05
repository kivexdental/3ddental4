import { chromium } from 'playwright';
import { preview } from 'vite';

async function runAudit() {
  console.log('--- STARTING DENTAL READY & WEBSITE TOOLBAR AUDIT ---');

  // Start vite preview server programmatically
  const previewServer = await preview({
    preview: {
      port: 4173,
      strictPort: true
    }
  });
  console.log('Vite preview server running on port 4173');

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e) {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch (e2) {
      console.log('No local chrome/msedge channel found, testing without browser GUI');
    }
  }
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const baseUrl = 'http://localhost:4173';

  console.log('Navigating to', baseUrl);
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  // 1. Audit KIVEX Toolbar branding
  console.log('\n--- 1. AUDITING KIVEX TOOLBAR ---');
  const kivexText = await page.textContent('aside');
  console.log('Toolbar contains KIVEX:', kivexText.includes('KIVEX'));
  console.log('Toolbar contains Technology:', kivexText.includes('Technology'));

  // Ensure NO unwanted target-site actions
  console.log('Does NOT contain "Open targeted site":', !kivexText.includes('Open targeted site') && !kivexText.includes('Open website'));

  // Verify toolbar colors
  const toolbarBg = await page.$eval('aside', el => window.getComputedStyle(el).backgroundColor);
  console.log('Toolbar background color:', toolbarBg);

  // 2. Audit Device View Controls
  console.log('\n--- 2. AUDITING DEVICE CONTROLS ---');
  const pcBtn = await page.$('button[aria-label="Switch to PC preview mode"]');
  const tabletBtn = await page.$('button[aria-label="Switch to Tablet preview mode"]');
  const phoneBtn = await page.$('button[aria-label="Switch to Phone preview mode"]');
  const fullscreenBtn = await page.$('button[aria-label="Switch to Fullscreen preview mode"]');
  console.log('Device buttons present:', !!(pcBtn && tabletBtn && phoneBtn && fullscreenBtn));

  // Test Phone mode
  await phoneBtn.click();
  await page.waitForTimeout(600);
  const phoneFrame = await page.$('iframe[title*="Phone"]');
  console.log('Phone mode activated, iframe found:', !!phoneFrame);

  // Test Tablet mode
  await tabletBtn.click();
  await page.waitForTimeout(600);
  const tabletFrame = await page.$('iframe[title*="Tablet"]');
  console.log('Tablet mode activated, iframe found:', !!tabletFrame);

  // Test PC mode
  await pcBtn.click();
  await page.waitForTimeout(600);
  const pcFrame = await page.$('iframe[title*="PC"]');
  console.log('PC mode activated, iframe found:', !!pcFrame);

  // 3. Audit Toolbar Close (×) and Reopen
  console.log('\n--- 3. AUDITING TOOLBAR CLOSE & REOPEN ---');
  const closeBtn = await page.$('button[aria-label="Hide KIVEX preview toolbar"]');
  console.log('Close button (×) exists:', !!closeBtn);
  await closeBtn.click();
  await page.waitForTimeout(400);

  const toolbarHidden = (await page.$('aside')) === null;
  console.log('Toolbar successfully hidden on × click:', toolbarHidden);

  const reopenBtn = await page.$('button[aria-label="Reopen KIVEX Technology preview toolbar"]');
  console.log('Floating KIVEX reopen button visible:', !!reopenBtn);
  await reopenBtn.click();
  await page.waitForTimeout(400);
  const toolbarRestored = (await page.$('aside')) !== null;
  console.log('Toolbar successfully restored via reopen button:', toolbarRestored);

  // 4. Switch to Fullscreen and audit embedded Dental Website
  const fsBtn = await page.$('button[aria-label="Switch to Fullscreen preview mode"]');
  if (fsBtn) await fsBtn.click();
  await page.waitForTimeout(600);

  console.log('\n--- 4. AUDITING DENTAL WEBSITE INSIDE IFRAME ---');
  const iframeElement = await page.$('iframe');
  const frame = await iframeElement.contentFrame();

  // Audit Header Logo
  const dentalLogo = await frame.$eval('header', el => el.textContent);
  console.log('Dental site header logo present:', dentalLogo.includes('DENTALCARE'));

  // Audit Mobile Menu
  const mobileToggle = await frame.$('button[aria-label="Toggle navigation menu"]');
  console.log('Mobile menu toggle button exists:', !!mobileToggle);

  // Audit Before / After Slider
  const slider = await frame.$('[role="slider"]');
  console.log('Before / After transformation slider exists:', !!slider);

  // Audit FAQ Section
  const faqHeader = await frame.$('#faq-header-0');
  console.log('FAQ section exists:', !!faqHeader);
  if (faqHeader) {
    await faqHeader.click();
    await page.waitForTimeout(300);
    const faqExpanded = await faqHeader.getAttribute('aria-expanded');
    console.log('FAQ accordion toggles smoothly (expanded):', faqExpanded === 'true');
  }

  // Audit Booking Modal
  console.log('\n--- 5. AUDITING BOOKING MODAL (DEMO FLOW) ---');
  const bookBtn = await frame.$('header button[aria-label="Book Appointment"]');
  await bookBtn.click();
  await page.waitForTimeout(500);

  const modalTitle = await frame.$eval('#booking-modal-title', el => el.textContent);
  console.log('Booking modal opened:', modalTitle.includes('Book Your Consultation'));

  const demoNotice = await frame.$eval('div[role="dialog"]', el => el.textContent);
  console.log('Demo Appointment Flow notice present:', demoNotice.includes('Demo Appointment Flow') && demoNotice.includes('does not create a real appointment'));

  // Test form filling
  await frame.fill('input[placeholder="Jane Doe"]', 'John Smith');
  await frame.fill('input[placeholder="(555) 000-0000"]', '(800) 555-0199');
  await frame.fill('input[placeholder="patient@example.com"]', 'john.smith@example.com');
  const confirmBtn = await frame.$('button[type="submit"]');
  await confirmBtn.click();

  // Wait for submission confirmation
  await page.waitForTimeout(1400);
  const confirmationText = await frame.$eval('div[role="dialog"]', el => el.textContent);
  console.log('Booking reservation confirmed:', confirmationText.includes('Appointment Slot Reserved'));
  console.log('Demo Reference Code generated:', confirmationText.includes('DEMO-3D-'));

  // Close modal
  const doneBtn = await frame.$('button:has-text("Done & Return to Site")');
  if (doneBtn) await doneBtn.click();
  await page.waitForTimeout(400);

  // 6. Audit Legal Policies Modal
  console.log('\n--- 6. AUDITING LEGAL / MEDICAL DISCLAIMER MODAL ---');
  const disclaimerBtn = await frame.$('footer button:has-text("Medical Disclaimer")');
  if (disclaimerBtn) {
    await disclaimerBtn.click();
    await page.waitForTimeout(500);
    const legalTitle = await frame.$eval('#legal-modal-title', el => el.textContent);
    console.log('Legal modal opened:', legalTitle.includes('Patient Transparency'));
    const disclaimerContent = await frame.$eval('div[role="dialog"]', el => el.textContent);
    console.log('Medical disclaimer explicitly states no formal medical diagnosis:', disclaimerContent.includes('does not provide formal medical diagnosis'));

    const acknowledgeBtn = await frame.$('button:has-text("Acknowledge & Close")');
    if (acknowledgeBtn) await acknowledgeBtn.click();
  }

  // 7. Test standalone embedded view at multiple real screen sizes
  console.log('\n--- 7. TESTING BREAKPOINTS FOR OVERFLOW (320px, 390px, 768px, 1280px) ---');
  const standalonePage = await context.newPage();
  const testWidths = [320, 390, 768, 1024, 1280, 1440];

  for (const width of testWidths) {
    await standalonePage.setViewportSize({ width, height: 800 });
    await standalonePage.goto(`${baseUrl}/?embedded=1`, { waitUntil: 'networkidle' });
    const hasOverflow = await standalonePage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`Width ${width}px: scrollWidth <= window.innerWidth: ${!hasOverflow}`);
  }

  // Capture production showcase screenshot
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'public/kivex_toolbar_preview.png', fullPage: false });
  console.log('Saved preview screenshot to public/kivex_toolbar_preview.png');

  console.log('\n--- AUDIT COMPLETE ---');
  console.log('Total console errors caught:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  if (browser) await browser.close();
  previewServer.httpServer.close();
  process.exit(0);
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
