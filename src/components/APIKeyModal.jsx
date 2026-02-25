import React, { useState } from 'react';
import { X, Key, Eye, EyeOff, ExternalLink, CheckCircle } from 'lucide-react';

export default function APIKeyModal({ onClose }) {
  const [key, setKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    localStorage.setItem('openai_api_key', key.trim());
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 900);
  }

  function handleClear() {
    localStorage.removeItem('openai_api_key');
    setKey('');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center">
              <Key size={16} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm">OpenAI API kľúč</h2>
              <p className="text-gray-500 text-xs">Potrebný pre AI funkcie kurzu</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-400 p-1 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="bg-indigo-950/30 border border-indigo-800/30 rounded-2xl p-4 text-xs text-indigo-300 leading-relaxed space-y-1">
            <p className="font-semibold text-indigo-200">Čo AI robí v kurze:</p>
            <p>✍️ <span className="text-gray-300">Opravuje tvoje nemecké vety</span> — vysvetlenia po slovensky</p>
            <p>💬 <span className="text-gray-300">Konverzačný partner</span> — cvičenie s postavami z Janinho príbehu</p>
          </div>

          <div>
            <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-2">
              API kľúč (sk-...)
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full bg-gray-800/60 border border-gray-700/60 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-600 transition-colors font-mono"
                onKeyDown={e => e.key === 'Enter' && key && handleSave()}
              />
              <button
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 p-1"
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <p className="text-[11px] text-gray-600 mt-1.5">
              Kľúč je uložený iba lokálne v tvojom prehliadači. Nikam sa neposiela.
            </p>
          </div>

          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-indigo-400 transition-colors"
          >
            <ExternalLink size={11} />
            Ako získam API kľúč? (platform.openai.com)
          </a>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-2">
          {key && (
            <button
              onClick={handleClear}
              className="px-4 py-2.5 rounded-xl border border-gray-700/60 text-gray-500 text-xs font-semibold hover:text-white hover:border-gray-600 transition-all"
            >
              Odstrániť
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!key.trim()}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              saved
                ? 'bg-emerald-700 text-white'
                : key.trim()
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {saved ? <><CheckCircle size={15} /> Uložené!</> : 'Uložiť kľúč'}
          </button>
        </div>
      </div>
    </div>
  );
}
