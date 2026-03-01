import React from 'react';
import { X, Loader2, BookmarkPlus, BookmarkCheck } from 'lucide-react';

function typeLabel(type) {
  return { noun: 'podst. meno', verb: 'sloveso', preposition: 'predložka', adverb: 'príslovka', adjective: 'prídavné meno', other: 'iné' }[type] || type;
}

export default function GrammarCard({ word, data, onSave, saved, onClose, loading, className = '' }) {
  if (!word) return null;
  return (
    <div className={`bg-gray-900 border border-indigo-800/60 rounded-2xl overflow-hidden flex flex-col ${className}`}>
      <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl font-black text-white">{word}</span>
            {data && data.type && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                {typeLabel(data.type)}
              </span>
            )}
          </div>
          {data && <p className="text-indigo-300 font-semibold text-sm mt-0.5">{data.sk}</p>}
        </div>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition-colors ml-2 flex-shrink-0">
          <X size={16} />
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-indigo-400">
          <Loader2 size={32} className="animate-spin mb-3" />
          <p className="text-sm text-center">AI generuje gramatickú kartu...</p>
          <p className="text-[10px] text-gray-500 mt-2 text-center">Slovo sa ukladá do databázy.</p>
        </div>
      ) : data ? (
        <div className="px-4 py-3 space-y-3 overflow-y-auto flex-1 text-sm">
          {/* NOUN */}
          {data.type === 'noun' && (
            <>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-800/60 rounded-lg p-2.5">
                  <p className="text-gray-500 text-[10px] mb-0.5 uppercase tracking-wide">Článok</p>
                  <p className="text-white font-bold">{data.article || '—'}</p>
                </div>
                <div className="flex-1 bg-gray-800/60 rounded-lg p-2.5">
                  <p className="text-gray-500 text-[10px] mb-0.5 uppercase tracking-wide">Množné č.</p>
                  <p className="text-white font-bold text-xs leading-tight">{data.plural || '—'}</p>
                </div>
              </div>
              {data.cases && Object.keys(data.cases).length > 0 && (
                <table className="w-full text-xs rounded-lg overflow-hidden">
                  <thead><tr className="bg-gray-800/70">
                    <th className="text-left text-gray-500 font-semibold px-3 py-1.5">Pád</th>
                    <th className="text-left text-gray-500 font-semibold px-3 py-1.5">Tvar</th>
                  </tr></thead>
                  <tbody>{Object.entries(data.cases).map(([cas, form]) => (
                    <tr key={cas} className="border-t border-gray-800">
                      <td className="text-gray-400 px-3 py-1.5">{cas}</td>
                      <td className="text-white font-medium px-3 py-1.5">{form}</td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </>
          )}
          {/* VERB */}
          {data.type === 'verb' && (
            <>
              <div className="bg-gray-800/60 rounded-lg px-3 py-2 text-xs">
                <span className="text-gray-500">Infinitív: </span>
                <span className="text-white font-bold">{data.infinitiv}</span>
              </div>
              {data.conjugation && Object.keys(data.conjugation).length > 0 && (
                <table className="w-full text-xs rounded-lg overflow-hidden">
                  <thead><tr className="bg-gray-800/70">
                    <th className="text-left text-gray-500 font-semibold px-3 py-1.5">Osoba</th>
                    <th className="text-left text-gray-500 font-semibold px-3 py-1.5">Tvar</th>
                  </tr></thead>
                  <tbody>{Object.entries(data.conjugation).map(([person, form]) => (
                    <tr key={person} className="border-t border-gray-800">
                      <td className="text-gray-400 px-3 py-1.5">{person}</td>
                      <td className="text-white font-medium px-3 py-1.5">{form}</td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </>
          )}
          {/* PREPOSITION */}
          {data.type === 'preposition' && (
            <>
              <div className="bg-amber-950/40 border border-amber-800/50 rounded-lg p-3">
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wide mb-1">Riadi pád</p>
                <p className="text-amber-200 font-bold text-sm">{Array.isArray(data.governs) ? data.governs.join(' · ') : (data.governs || 'Neuvedené')}</p>
                {data.note && <p className="text-amber-300/60 text-[11px] mt-1.5 leading-snug">{data.note}</p>}
              </div>
              {data.examples && data.examples.map((ex, i) => (
                <div key={i} className="bg-gray-800/40 rounded-lg px-3 py-2 mt-2">
                  <p className="text-white text-xs font-medium">{ex.de}</p>
                  <p className="text-gray-500 text-[11px] mt-0.5">{ex.sk}</p>
                </div>
              ))}
            </>
          )}
          {/* ADVERB / ADJECTIVE */}
          {(data.type === 'adverb' || data.type === 'adjective') && data.comparison && Object.keys(data.comparison).length > 0 && (
            <table className="w-full text-xs rounded-lg overflow-hidden">
              <thead><tr className="bg-gray-800/70">
                <th className="text-left text-gray-500 font-semibold px-3 py-1.5">Stupeň</th>
                <th className="text-left text-gray-500 font-semibold px-3 py-1.5">Tvar</th>
              </tr></thead>
              <tbody>{Object.entries(data.comparison).map(([deg, form]) => (
                <tr key={deg} className="border-t border-gray-800">
                  <td className="text-gray-400 px-3 py-1.5">{deg}</td>
                  <td className="text-white font-medium px-3 py-1.5">{form}</td>
                </tr>
              ))}</tbody>
            </table>
          )}
          {(data.type === 'adverb' || data.type === 'adjective') && (!data.comparison || Object.keys(data.comparison).length === 0) && (
            <p className="text-gray-600 text-xs text-center py-2">Príslovka/adjektívum sa nestupňuje.</p>
          )}
          {/* Example */}
          {data.example && (
            <div className="bg-indigo-950/30 border border-indigo-800/30 rounded-lg px-3 py-2.5 mt-2">
              <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wide">Príklad</p>
              <p className="text-white text-xs font-medium italic">{data.example}</p>
              {data.exampleSk && <p className="text-gray-400 text-[11px] mt-1">{data.exampleSk}</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="px-4 py-3 text-gray-600 text-sm">Pre toto slovo neexistuje gramatická karta.</div>
      )}

      <div className="px-4 pb-4 pt-2 border-t border-gray-800">
        <button
          onClick={() => onSave(word, data)}
          disabled={saved || !data || loading}
          className={`w-full py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-xs transition-all ${saved
            ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/60 cursor-default'
            : !data || loading
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
              : 'bg-indigo-700 hover:bg-indigo-600 text-white'
          }`}
        >
          {saved
            ? <><BookmarkCheck size={13} /> Uložené v tréneri slovíčok</>
            : <><BookmarkPlus size={13} /> Uložiť do môjho slovníka</>}
        </button>
      </div>
    </div>
  );
}
