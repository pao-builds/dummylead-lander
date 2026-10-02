/**
 * Generate public/og.png, the 1200x630 social preview image used by
 * OpenGraph/Twitter (what Slack, iMessage, LinkedIn, etc. show when a
 * link is shared).
 *
 * Renders an HTML lockup (hat + wordmark + tagline, matching Brand.astro)
 * in headless Chrome so the real Poppins/Inter fonts are used, then
 * screenshots it.
 *
 * Run with: node scripts/gen-og.mjs
 * Re-run whenever the hat, wordmark colors, or tagline change.
 * Set CHROME_PATH if Chrome is not at the default macOS location.
 */
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pub = fileURLToPath(new URL('../public/', import.meta.url));
const hat = await readFile(pub + 'dummylead-hat.svg', 'utf8');
const chrome =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const html = `<!doctype html>
<html><head><meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@500&display=block" rel="stylesheet" />
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background:
      radial-gradient(ellipse 70% 60% at 50% 0%, hsl(198 68% 92%), transparent 70%),
      #ffffff;
    color: hsl(193 100% 14%);
  }
  .lockup { display: grid; grid-template-columns: auto auto; column-gap: 26px; align-items: center; }
  .hat { width: 190px; height: 101px; display: block; }
  .hat svg { width: 100%; height: 100%; }
  .wordmark {
    font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 128px;
    line-height: 1; letter-spacing: -0.04em;
  }
  .wordmark span { color: hsl(198 80% 30%); }
  .by {
    grid-column: 2; margin-top: 10px;
    font-family: 'Inter', sans-serif; font-weight: 500; font-size: 30px;
    color: hsl(210 14% 42%); letter-spacing: .01em;
  }
  .tagline {
    margin-top: 64px; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 36px;
    color: hsl(210 18% 28%);
  }
</style></head>
<body>
  <div class="lockup">
    <div class="hat">${hat}</div>
    <div class="wordmark">Dummy<span>Lead</span></div>
    <div class="by">by Next Call Club</div>
  </div>
  <p class="tagline">A secret shopper for your sales leads</p>
</body></html>`;

const dir = await mkdtemp(join(tmpdir(), 'dl-og-'));
const page = join(dir, 'og.html');
await writeFile(page, html);

execFileSync(chrome, [
  '--headless=new',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  // Give the web fonts time to load before the screenshot is taken.
  '--virtual-time-budget=5000',
  `--screenshot=${pub}og.png`,
  `file://${page}`,
]);
await rm(dir, { recursive: true });

console.log('Wrote public/og.png');
