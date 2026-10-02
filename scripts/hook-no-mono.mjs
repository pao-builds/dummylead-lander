#!/usr/bin/env node
// Claude Code PreToolUse hook (Write|Edit|MultiEdit): denies an edit whose new
// content introduces a monospace font. Patterns live in check-no-mono.mjs.
import { readFileSync } from 'node:fs';
import { findMono } from './check-no-mono.mjs';

// Files that must name the banned patterns in order to enforce them.
const EXEMPT = /(scripts\/(check|hook)-no-mono\.mjs|\.claude\/settings(\.local)?\.json)$/;

const input = JSON.parse(readFileSync(0, 'utf8') || '{}');
const t = input.tool_input ?? {};
if (EXEMPT.test(t.file_path ?? '')) process.exit(0);

const text = [t.content, t.new_string, ...(t.edits ?? []).map((e) => e.new_string)]
  .filter((s) => typeof s === 'string')
  .join('\n');
const hits = findMono(text);
if (!hits.length) process.exit(0);

console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'deny',
    permissionDecisionReason:
      'This project bans monospace fonts. Use var(--font-body) or var(--font-display) instead. Offending: ' +
      hits.map((l) => l.trim().slice(0, 120)).join(' | '),
  },
}));
