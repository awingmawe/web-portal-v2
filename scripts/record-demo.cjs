'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3005';
const RECORDINGS_DIR = path.join(__dirname, '..', 'recordings');
const ROOT_RECORDINGS_DIR = path.join(__dirname, '..', '..', 'recordings');
const OUTPUT_FILENAME = 'demo-web-portal-v2.webm';

async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-cursor')) return;
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#10B981" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>
    </svg>`;
    cursor.style.cssText = `
      position: fixed; z-index: 9999999; pointer-events: none;
      width: 28px; height: 28px;
      transition: left 0.12s ease-out, top 0.12s ease-out;
      filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4));
    `;
    cursor.style.left = '100px';
    cursor.style.top = '100px';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  });
}

async function injectSubtitleBar(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-subtitle')) return;
    const bar = document.createElement('div');
    bar.id = 'demo-subtitle';
    bar.style.cssText = `
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      z-index: 9999998;
      text-align: center; padding: 10px 24px;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(8px);
      color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 15px; font-weight: 600; border-radius: 9999px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
      opacity: 0;
    `;
    bar.textContent = '';
    document.body.appendChild(bar);
  });
}

async function showSubtitle(page, text) {
  await page.evaluate((t) => {
    const bar = document.getElementById('demo-subtitle');
    if (!bar) return;
    if (t) {
      bar.textContent = t;
      bar.style.opacity = '1';
    } else {
      bar.style.opacity = '0';
    }
  }, text);
  if (text) await page.waitForTimeout(600);
}

async function moveAndClick(page, locator, label, opts = {}) {
  const { postClickDelay = 1000, ...clickOpts } = opts;
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.warn(`[WARN] Element not visible for click: "${label}"`);
    return false;
  }
  try {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const box = await el.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
      await page.waitForTimeout(300);
    }
    await el.click(clickOpts);
  } catch (e) {
    console.warn(`[WARN] Failed clicking "${label}": ${e.message}`);
    return false;
  }
  await page.waitForTimeout(postClickDelay);
  return true;
}

async function smoothScroll(page, targetY, durationSteps = 10) {
  await page.evaluate(async ({ targetY, durationSteps }) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    for (let i = 1; i <= durationSteps; i++) {
      window.scrollTo(0, startY + (diff * (i / durationSteps)));
      await new Promise(r => setTimeout(r, 60));
    }
  }, { targetY, durationSteps });
  await page.waitForTimeout(500);
}

(async () => {
  fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
  fs.mkdirSync(ROOT_RECORDINGS_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=medium']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: RECORDINGS_DIR,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  try {
    console.log('--- STARTING DEMO RECORDING ---');

    // 1. Scene: Home Page
    console.log('Scene 1: Beranda Web Portal v2');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await injectCursor(page);
    await injectSubtitleBar(page);

    await showSubtitle(page, 'Muslim101 Portal v2 - Halaman Beranda');
    await page.waitForTimeout(1500);

    // Click tabs (Haji, Muslim Trip, Umrah)
    await showSubtitle(page, 'Kategori Layanan: Umrah, Haji & Muslim Trip');
    await moveAndClick(page, 'button:has-text("Haji")', 'Tab Haji');
    await page.waitForTimeout(1200);
    await moveAndClick(page, 'button:has-text("Muslim Trip")', 'Tab Muslim Trip');
    await page.waitForTimeout(1200);
    await moveAndClick(page, 'button:has-text("Umrah")', 'Tab Umrah');
    await page.waitForTimeout(1000);

    // 2. Scene: Scroll & Explore Promo Packages
    console.log('Scene 2: Eksplorasi Paket');
    await showSubtitle(page, 'Jelajahi Paket Promo & Mitra Travel Terpercaya');
    await smoothScroll(page, 450, 15);
    await page.waitForTimeout(1000);
    await smoothScroll(page, 900, 15);
    await page.waitForTimeout(1200);

    // Pan across a package card
    const firstCard = page.locator('a[href*="/umrah/"]').first();
    if (await firstCard.isVisible().catch(() => false)) {
      const box = await firstCard.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 15 });
        await page.waitForTimeout(1500);
      }
    }

    // 3. Scene: Articles
    console.log('Scene 3: Halaman Artikel');
    await showSubtitle(page, 'Navigasi ke Portal Artikel & Edukasi Muslim');
    await page.goto(`${BASE_URL}/article`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200);
    await injectCursor(page);
    await injectSubtitleBar(page);
    await showSubtitle(page, 'Kumpulan Artikel, Wawasan, & Tips Ibadah');
    await smoothScroll(page, 400, 12);
    await page.waitForTimeout(1500);
    await smoothScroll(page, 800, 12);
    await page.waitForTimeout(1500);

    // 4. Scene: FAQ
    console.log('Scene 4: FAQ');
    await showSubtitle(page, 'Pusat Bantuan & FAQ Interaktif');
    await page.goto(`${BASE_URL}/faq`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200);
    await injectCursor(page);
    await injectSubtitleBar(page);
    await showSubtitle(page, 'Informasi Lengkap Pemesanan & Pembayaran');
    await smoothScroll(page, 300, 10);
    await page.waitForTimeout(1000);

    // Expand FAQ accordion item if present
    const faqItem = page.locator('[data-state="closed"], button:has-text("?"), button[aria-expanded="false"]').first();
    if (await faqItem.isVisible().catch(() => false)) {
      await moveAndClick(page, faqItem, 'Buka FAQ Item', { postClickDelay: 1500 });
    }
    await page.waitForTimeout(1500);

    // 5. Scene: Umrah Personal Feature
    console.log('Scene 5: Umrah Personal Landing');
    await showSubtitle(page, 'Fitur Unggulan: Kustomisasi Paket Umrah Personal');
    await page.goto(`${BASE_URL}/umrah-personal/landing`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await injectCursor(page);
    await injectSubtitleBar(page);
    await showSubtitle(page, 'Rencanakan Umrah Sesuai Kebutuhan & Jadwal Pribadi');
    await smoothScroll(page, 400, 12);
    await page.waitForTimeout(2000);

    // 6. Final Scene: Conclusion
    console.log('Scene 6: Selesai');
    await showSubtitle(page, 'Demo Selesai - Web Portal v2 Berhasil Dijalankan!');
    await page.waitForTimeout(3000);
    await showSubtitle(page, '');

    console.log('--- DEMO RECORDING COMPLETED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Error during demo recording:', err);
  } finally {
    await context.close();
    const video = page.video();
    if (video) {
      const tempPath = await video.path();
      const targetPath = path.join(RECORDINGS_DIR, OUTPUT_FILENAME);
      const rootTargetPath = path.join(ROOT_RECORDINGS_DIR, OUTPUT_FILENAME);

      try {
        fs.copyFileSync(tempPath, targetPath);
        fs.copyFileSync(tempPath, rootTargetPath);
        console.log(`[SUCCESS] Demo video saved to:`);
        console.log(`  1. ${targetPath}`);
        console.log(`  2. ${rootTargetPath}`);
      } catch (copyErr) {
        console.error('Failed copying recorded video:', copyErr);
      }
    }
    await browser.close();
  }
})();
