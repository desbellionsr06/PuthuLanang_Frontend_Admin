// One-off helper: remove unused named imports from a single-line import statement.
// usage: node rm-imports.js file line name1,name2,...
const fs = require('fs');
const [file, lineStr, names] = process.argv.slice(2);
const drop = new Set(names.split(','));
const lines = fs.readFileSync(file, 'utf8').split('\n');
const i = Number(lineStr) - 1;
const m = lines[i].match(/^(import\s*\{)([^}]*)(\}\s*from\s*.*)$/);
if (!m) { console.error('NO MATCH', file, lineStr, lines[i]); process.exit(1); }
const kept = m[2].split(',').map(s => s.trim()).filter(Boolean).filter(s => !drop.has(s.split(/\s+as\s+/)[0]));
const removed = m[2].split(',').map(s => s.trim()).filter(s => drop.has(s.split(/\s+as\s+/)[0]));
if (removed.length !== drop.size) { console.error('NOT ALL FOUND', file, [...drop], removed); process.exit(1); }
lines[i] = `${m[1]} ${kept.join(', ')} ${m[3]}`;
fs.writeFileSync(file, lines.join('\n'));
console.log('ok', file, 'removed', removed.join(','));
