const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../src/data/lessons/L01.js');
const raw = fs.readFileSync(filePath, 'utf8');
const hasCRLF = raw.includes('\r\n');
const content = raw.replace(/\r\n/g, '\n');
const rwIdx = content.indexOf('\n  reviewWords:');
const exIdx = content.lastIndexOf('\n  exercises: [', rwIdx);
if (exIdx === -1 || rwIdx === -1) { console.error('not found'); process.exit(1); }
const arrOpen = exIdx + '\n  exercises: ['.length - 1;
const closeIdx = content.indexOf('\n  ],', arrOpen);
const exSection = content.slice(arrOpen + 1, closeIdx);
const before = content.slice(0, arrOpen + 1);
const after = content.slice(closeIdx);
const blocks = [];
let depth = 0, start = -1;
for (let i = 0; i < exSection.length; i++) {
  const ch = exSection[i];
  if (ch === '{') { if (!depth) start = i; depth++; }
  else if (ch === '}') { depth--; if (!depth) blocks.push(exSection.slice(start, i + 1)); }
}
console.log('Blocks:', blocks.map(b => b.match(/type:\s*['"](\w+)['"]/)?.[1]).join(', '));
const byType = {};
blocks.forEach(b => { const m = b.match(/type:\s*['"](\w+)['"]/); if (m) byType[m[1]] = b; });
const ORDER = ['minitext','flashcard','match','mcq','fill','wordorder','listen','speaking','writing'];
const allBlocks = [...ORDER.filter(t => byType[t]).map(t => byType[t]), ...blocks.filter(b => { const m = b.match(/type:\s*['"](\w+)['"]/); return m && !ORDER.includes(m[1]); })];
const newContent = before + '\n    ' + allBlocks.join(',\n    ') + '\n' + after;
const final = hasCRLF ? newContent.replace(/\n/g, '\r\n') : newContent;
fs.writeFileSync(filePath, final, 'utf8');
console.log('New order:', allBlocks.map(b => b.match(/type:\s*['"](\w+)['"]/)?.[1]).join(' -> '));
