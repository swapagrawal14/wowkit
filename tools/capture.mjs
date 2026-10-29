import { mkdir } from 'node:fs/promises';
let chromium;
try { ({chromium} = await import('playwright')); } catch { console.error('Optional tool: install playwright first. See tools/VERIFY.md.'); process.exit(1); }
const url = process.argv[2] || 'http://localhost:3000';
await mkdir('screenshots', {recursive:true});
const browser = await chromium.launch();
try { for (const width of [375,768,1440]) { const page = await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1}); await page.goto(url); await page.evaluate(() => document.querySelectorAll('.wow-pending').forEach(e => e.classList.remove('wow-pending'))); await page.screenshot({path:`screenshots/${width}.png`,fullPage:true}); await page.close(); } } finally { await browser.close(); }
