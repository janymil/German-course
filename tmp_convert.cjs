const fs = require('fs');

let code = fs.readFileSync('docs/nicos-weg.txt', 'utf8');

// Change export default function App()
code = code.replace(/export default function App\(\) \{/, 'export default function Lesson_4_eDoThe6qo({ isOpen, onClose }) {\n  if (!isOpen) return null;');

// Change main wrapper
const modalWrapper = `
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-gray-900/80 backdrop-blur-sm">
      <button onClick={onClose} className="absolute top-4 right-4 z-[60] p-2 bg-white rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 shadow-xl transition-all">
        <X size={24} />
      </button>
      <div className="bg-slate-100 w-full h-full md:rounded-3xl md:h-[95vh] font-sans flex flex-col md:flex-row overflow-hidden relative shadow-2xl">
`;

code = code.replace(/<div className="min-h-screen bg-slate-100 font-sans flex flex-col md:flex-row">/, modalWrapper);

// Change ending brackets
code = code.replace(/<\/main>\s*<\/div>\s*\);\s*\}/s, '</main>\n      </div>\n    </div>\n  );\n}');

// Change h-screen to h-full to avoid overflow inside a modal
code = code.replace(/h-screen/g, 'h-full');

fs.writeFileSync('src/components/Lesson_4_eDoThe6qo.jsx', code);
console.log('Conversion successful.');
