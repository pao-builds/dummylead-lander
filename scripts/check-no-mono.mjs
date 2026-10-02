#!/usr/bin/env node
// Monospace fonts are banned in this repo. Fails (exit 1) if any source file,
// or the built CSS/HTML when called with `dist`, references a monospace face.
// The same BANNED list backs the Claude Code PreToolUse hook (hook-no-mono.mjs).
//
//   node scripts/check-no-mono.mjs          # scan src/, public/, astro.config.mjs
//   node scripts/check-no-mono.mjs dist     # scan the build output
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const BANNED = [
  /\bmonospace\b/i, // generic family, also catches ui-monospace
  /var\(\s*--font-(mono|code)\b/, // the old mono tokens
  /(?<!-)\bfont-mono\b/, // Tailwind utility class
  /--font-(mono|code)\s*:(?!\s*initial\s*;)/, // redefining a mono token
  /\bSF ?Mono\b|\bSFMono\b|\bMenlo\b|\bMonaco\b|\bConsolas\b|\bCourier\b/i,
  /\b(JetBrains|Roboto|Space|IBM Plex|DM|Ubuntu|Noto Sans|Geist|Red Hat|Azeret|Martian|Liberation) Mono\b/i,
  /\bFira Code\b|\bSource Code Pro\b|\bCascadia\b|\bInconsolata\b/i,
];

/** Returns the offending lines of `text`, or [] when it is mono-free. */
export const findMono = (text) => text.split('\n').filter((line) => BANNED.some((re) => re.test(line)));

const TEXT_EXT = new Set(['.astro', '.css', '.scss', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.md', '.mdx', '.html', '.svg', '.txt', '.json']);
const SKIP_DIRS = new Set(['node_modules', '.git', '.astro']);

// Tailwind preflight always emits `var(--default-mono-font-family, ui-monospace, ...)`
// for code/kbd/samp/pre. global.css defines that variable as the body font, so
// the fallback list is unreachable; strip it, but only while the override exists.
const PREFLIGHT_FALLBACK = /var\(--default-mono-font-family,[^)]*\)/g;
const PREFLIGHT_OVERRIDE = '--default-mono-font-family:var(--font-body)';

function* walk(path) {
  if (!existsSync(path)) return;
  if (statSync(path).isFile()) return yield path;
  for (const name of readdirSync(path)) {
    if (!SKIP_DIRS.has(name)) yield* walk(join(path, name));
  }
}

function main() {
  const targets = process.argv[2] === 'dist' ? ['dist'] : ['src', 'public', 'astro.config.mjs'];
  const hits = [];
  for (const target of targets) {
    for (const file of walk(target)) {
      if (!TEXT_EXT.has(extname(file))) continue;
      let text = readFileSync(file, 'utf8');
      if (target === 'dist' && text.replace(/\s/g, '').includes(PREFLIGHT_OVERRIDE)) {
        text = text.replace(PREFLIGHT_FALLBACK, 'var(--default-mono-font-family)');
      }
      text.split('\n').forEach((line, i) => {
        if (BANNED.some((re) => re.test(line))) hits.push(`${file}:${i + 1}: ${line.trim().slice(0, 160)}`);
      });
    }
  }

  if (hits.length) {
    console.error(`Monospace fonts are banned in this repo. Use var(--font-body) or var(--font-display).\n`);
    console.error(hits.join('\n'));
    process.exit(1);
  }
  console.log(`check-no-mono: clean (${targets.join(', ')})`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
