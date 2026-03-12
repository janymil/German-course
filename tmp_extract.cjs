const fs = require('fs');
const txt = fs.readFileSync('generate_drills.cjs', 'utf-8');
const lines = txt.split('\n');
const keys = [];
lines.forEach(l => {
  if (l.match(/^  "(.+)": \{/)) {
    keys.push(l.match(/^  "(.+)": \{/)[1]);
  }
});
console.log(keys);
