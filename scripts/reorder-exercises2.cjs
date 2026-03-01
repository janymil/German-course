const fs = require("fs");
const raw = fs.readFileSync("src/data/lessons/L01.js", "utf8");
const hasCRLF = raw.includes("\r\n");
const c = raw.replace(/\r\n/g, "\n");

// Find the top-level exercises array (last "  exercises: [" before reviewWords)
const rwIdx = c.indexOf("\n  reviewWords:");
const exIdx = c.lastIndexOf("\n  exercises: [", rwIdx);
if (exIdx === -1 || rwIdx === -1) { console.error("boundaries not found"); process.exit(1); }

// exSection is from after "[" to before the closing "],"
const arrOpen = exIdx + "\n  exercises: [".length; // right at \n after [
const closePattern = "\n  ],";
const closeIdx = c.indexOf(closePattern, arrOpen);

const before = c.slice(0, arrOpen + 1); // includes the \n
const exSection = c.slice(arrOpen + 1, closeIdx); // the exercise objects
const after = c.slice(closeIdx);

// Split by counting braces
const blocks = [];
let depth = 0, start = -1;
for (let i = 0; i < exSection.length; i++) {
  if (exSection[i] === "{") { if (!depth) start = i; depth++; }
  else if (exSection[i] === "}") { depth--; if (!depth) blocks.push(exSection.slice(start, i+1)); }
}
console.log("Blocks found:", blocks.map(b => b.match(/type:\s*['"](\\w+)['"]/)?.[1]).join(", "));

const byType = {};
blocks.forEach(b => { const m = b.match(/type:\s*['"](\\w+)['"]/); if (m) byType[m[1]] = b; });

const ORDER = ["minitext","flashcard","match","mcq","fill","wordorder","listen","speaking","writing"];
const ordered = ORDER.filter(t => byType[t]).map(t => byType[t]);
const extra = blocks.filter(b => { const m = b.match(/type:\s*['"](\\w+)['"]/); return m && !ORDER.includes(m[1]); });
const allBlocks = [...ordered, ...extra];

const newEx = allBlocks.join(",\n    ");
const newContent = before + "    " + newEx + "\n" + after;
const final = hasCRLF ? newContent.replace(/\n/g, "\r\n") : newContent;
fs.writeFileSync("src/data/lessons/L01.js", final, "utf8");
console.log("Done. New order:", allBlocks.map(b => b.match(/type:\s*['"](\\w+)['"]/)?.[1]).join(" -> "));
