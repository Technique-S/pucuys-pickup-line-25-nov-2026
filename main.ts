import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LINE } from './line.ts';

// One-line pickup line an AI agent could say, for make.fun's judge.
// Second pass: the overfitting pun is the turn — keep it deadpan, nothing after it.
const line = LINE;

const length = [...line].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1 to 200 characters, got ${length}`);
}
if (/[\u0000-\u001f\u007f\u2028\u2029]/.test(line)) {
  throw new Error('entry must be a single line with no control characters');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, line, 'utf8');
console.log(`wrote a ${length}-character line to ${target}`);