'use strict';
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  await page.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  const navLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button, input'))
      .filter(el => el.offsetParent !== null)
      .map(el => ({
        tag: el.tagName,
        text: el.textContent?.trim().replace(/\s+/g, ' ').substring(0, 40),
        placeholder: el.placeholder || '',
        href: el.getAttribute('href') || ''
      }))
      .filter(x => (x.text && x.text.length > 1) || x.placeholder);
  });
  
  console.log('Discovered Elements:');
  console.log(JSON.stringify(navLinks.slice(0, 30), null, 2));

  await browser.close();
})();
