/**
 * knowledgeBase.cjs — Unified AI Knowledge Base
 *
 * All AI outputs produced by any function in the app are stored here.
 * Next time the same (or very similar) input arrives, we return the
 * cached result instead of calling the API.
 *
 * Storage: SQLite (primary, queryable) + JSON mirror (portable backup).
 * Both are written atomically on every save.
 *
 * ═══════════════════════════════════════════════════════════════════
 *  FUZZY MATCHING
 *  Set FUZZY_MATCHING_ENABLED = true to enable approximate key lookup.
 *  When off (default), only exact key matches are returned.
 *  When on, a Levenshtein similarity of >= FUZZY_THRESHOLD (0–1) is
 *  required for a cache hit.
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

const path = require('path');
const fs   = require('fs');
const Database = require('better-sqlite3');
const { distance } = require('fastest-levenshtein');

// ── Config ──────────────────────────────────────────────────────────────────
const FUZZY_MATCHING_ENABLED = false;   // ← flip to true when DB is large enough
const FUZZY_THRESHOLD        = 0.88;    // 0–1; higher = stricter similarity required
// Types where fuzzy matching makes sense (text-based keys only)
const FUZZY_ENABLED_TYPES    = new Set(['writing', 'explanation', 'smart_tutor']);

// ── Paths ────────────────────────────────────────────────────────────────────
const ROOT      = path.join(__dirname, '..');
const DB_FILE   = path.join(ROOT, 'ai_knowledge_base.db');
const JSON_FILE = path.join(ROOT, 'ai_knowledge_base.json');

// ── Schema ───────────────────────────────────────────────────────────────────
const SCHEMA = `
CREATE TABLE IF NOT EXISTS knowledge_base (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  type         TEXT    NOT NULL,
  key          TEXT    NOT NULL,
  input_json   TEXT    NOT NULL,
  output_json  TEXT    NOT NULL,
  model        TEXT    NOT NULL DEFAULT '',
  source_app   TEXT    NOT NULL DEFAULT '',
  created_at   TEXT    NOT NULL,
  hit_count    INTEGER NOT NULL DEFAULT 0,
  last_hit_at  TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_kb_type_key ON knowledge_base(type, key);
CREATE INDEX IF NOT EXISTS idx_kb_type ON knowledge_base(type);
`;

// ── Singleton DB connection ───────────────────────────────────────────────────
let _db = null;

function getDb() {
  if (_db) return _db;
  _db = new Database(DB_FILE);
  _db.pragma('journal_mode = WAL');
  _db.pragma('synchronous  = NORMAL');
  _db.exec(SCHEMA);
  return _db;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function now() {
  return new Date().toISOString();
}

/**
 * Compute similarity between two strings (0 = totally different, 1 = identical).
 */
function similarity(a, b) {
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - distance(a, b) / maxLen;
}

/**
 * Serialize any value to a stable JSON string suitable for storage.
 */
function toJson(val) {
  if (typeof val === 'string') return val;
  return JSON.stringify(val);
}

/**
 * Parse stored JSON, returning the raw string if parsing fails.
 */
function fromJson(str) {
  try { return JSON.parse(str); } catch { return str; }
}

// ── JSON mirror ────────────────────────────────────────────────────────────
/**
 * Write the full in-memory JSON mirror to disk (best-effort, never throws).
 */
function flushJsonMirror() {
  try {
    const db   = getDb();
    const rows = db.prepare('SELECT * FROM knowledge_base ORDER BY id').all();
    const mirror = {};
    for (const row of rows) {
      if (!mirror[row.type]) mirror[row.type] = {};
      mirror[row.type][row.key] = {
        id:          row.id,
        input:       fromJson(row.input_json),
        output:      fromJson(row.output_json),
        model:       row.model,
        sourceApp:   row.source_app,
        createdAt:   row.created_at,
        hitCount:    row.hit_count,
        lastHitAt:   row.last_hit_at,
      };
    }
    fs.writeFileSync(JSON_FILE, JSON.stringify(mirror, null, 2), 'utf8');
  } catch (e) {
    console.error('[KB] Failed to flush JSON mirror:', e.message);
  }
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Look up a cached AI output.
 *
 * @param {string} type  - e.g. 'writing', 'explanation', 'grammar_card'
 * @param {string} key   - normalised lookup key
 * @returns {{ output: any, id: number, hitCount: number, fuzzy: boolean } | null}
 */
function lookup(type, key) {
  const db = getDb();

  // 1. Exact match — always tried first
  const exact = db.prepare(
    'SELECT id, output_json, hit_count FROM knowledge_base WHERE type = ? AND key = ?'
  ).get(type, key);

  if (exact) {
    return { output: fromJson(exact.output_json), id: exact.id, hitCount: exact.hit_count, fuzzy: false };
  }

  // 2. Optional fuzzy match — only for text-based types and when enabled
  if (FUZZY_MATCHING_ENABLED && FUZZY_ENABLED_TYPES.has(type)) {
    const candidates = db.prepare(
      'SELECT id, key, output_json, hit_count FROM knowledge_base WHERE type = ?'
    ).all(type);

    let bestScore = 0;
    let bestRow   = null;

    for (const row of candidates) {
      const score = similarity(key, row.key);
      if (score > bestScore) {
        bestScore = score;
        bestRow   = row;
      }
    }

    if (bestRow && bestScore >= FUZZY_THRESHOLD) {
      console.log(`[KB] Fuzzy HIT (${type}, score=${bestScore.toFixed(3)}): "${key.slice(0, 60)}"`);
      return { output: fromJson(bestRow.output_json), id: bestRow.id, hitCount: bestRow.hit_count, fuzzy: true, score: bestScore };
    }
  }

  return null;
}

/**
 * Save an AI output to the knowledge base.
 * If upsert=true (default false), replaces any existing entry with the same (type, key).
 * If upsert=false (default), skips silently if the exact pair already exists (INSERT OR IGNORE).
 *
 * @param {object} opts
 * @param {string}      opts.type       - Entry type (e.g. 'writing', 'grammar_card')
 * @param {string}      opts.key        - Normalised lookup key
 * @param {any}         opts.input      - The full input that was sent to the AI
 * @param {any}         opts.output     - The AI response (object or string)
 * @param {string}      [opts.model]    - Model used (e.g. 'gemini-2.5-pro')
 * @param {string}      [opts.sourceApp] - Feature that triggered this (e.g. 'vocab_trainer')
 * @param {boolean}     [opts.upsert]   - Replace existing entry if true (default: false)
 * @returns {number|null}  The new or existing row id, or null on error
 */
function save({ type, key, input, output, model = '', sourceApp = '', upsert = false }) {
  try {
    const db = getDb();
    const conflict = upsert ? 'OR REPLACE' : 'OR IGNORE';
    const stmt = db.prepare(`
      INSERT ${conflict} INTO knowledge_base
        (type, key, input_json, output_json, model, source_app, created_at, hit_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0)
    `);
    const result = stmt.run(type, key, toJson(input), toJson(output), model, sourceApp, now());

    if (result.changes > 0) {
      const action = upsert ? 'UPSERTED' : 'SAVED';
      console.log(`[KB] ${action} (${sourceApp}) ${type}:: "${key.slice(0, 60)}"`);
      setImmediate(flushJsonMirror);
      return result.lastInsertRowid;
    }
    return null;
  } catch (e) {
    console.error('[KB] Failed to save entry:', e.message);
    return null;
  }
}

/**
 * Increment the hit counter for a cached entry.
 * Call this after every successful cache hit.
 *
 * @param {number} id - Row id returned by lookup()
 */
function incrementHit(id) {
  try {
    const db = getDb();
    db.prepare(
      'UPDATE knowledge_base SET hit_count = hit_count + 1, last_hit_at = ? WHERE id = ?'
    ).run(now(), id);
  } catch (e) {
    console.error('[KB] Failed to increment hit:', e.message);
  }
}

/**
 * Get aggregated statistics for the ApiStats view.
 *
 * @returns {object}
 */
function getStats() {
  try {
    const db = getDb();
    const totalRows  = db.prepare('SELECT COUNT(*) as n FROM knowledge_base').get();
    const totalHits  = db.prepare('SELECT SUM(hit_count) as n FROM knowledge_base').get();
    const byType     = db.prepare(
      'SELECT type, COUNT(*) as entries, SUM(hit_count) as hits FROM knowledge_base GROUP BY type ORDER BY hits DESC'
    ).all();
    const topHits    = db.prepare(
      'SELECT type, key, output_json, model, source_app, hit_count, created_at, last_hit_at FROM knowledge_base ORDER BY hit_count DESC LIMIT 10'
    ).all().map(r => ({
      ...r,
      output: fromJson(r.output_json),
      key: r.key.slice(0, 80),
    }));

    return {
      fuzzyEnabled:  FUZZY_MATCHING_ENABLED,
      fuzzyThreshold: FUZZY_THRESHOLD,
      totalEntries:  totalRows?.n  || 0,
      totalHits:     totalHits?.n  || 0,
      byType,
      topHits,
    };
  } catch (e) {
    console.error('[KB] getStats error:', e.message);
    return { totalEntries: 0, totalHits: 0, byType: [], topHits: [], fuzzyEnabled: false };
  }
}

/**
 * One-time migration from old siloed caches into the unified KB.
 * Uses INSERT OR IGNORE so it is safe to call on every server start.
 */
function migrate() {
  const db = getDb();
  let count = 0;

  // ── 1. Writing correction cache ─────────────────────────────────────────
  const writingFile = path.join(ROOT, 'src', 'data', 'database-writing-exercise.json');
  if (fs.existsSync(writingFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(writingFile, 'utf8'));
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO knowledge_base
          (type, key, input_json, output_json, model, source_app, created_at, hit_count)
        VALUES ('writing', ?, ?, ?, 'gemini-2.5-pro', 'writing_checker (migrated)', ?, 0)
      `);
      const insert = db.transaction((entries) => {
        for (const [key, val] of entries) {
          stmt.run(key, JSON.stringify({ key }), JSON.stringify(val), now());
          count++;
        }
      });
      insert(Object.entries(data));
      console.log(`[KB] Migrated ${Object.keys(data).length} writing entries`);
    } catch (e) { console.error('[KB] Writing migration error:', e.message); }
  }

  // ── 2. Grammar exercises bank ────────────────────────────────────────────
  const grammarFile = path.join(ROOT, 'grammar_exercises.json');
  if (fs.existsSync(grammarFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(grammarFile, 'utf8'));
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO knowledge_base
          (type, key, input_json, output_json, model, source_app, created_at, hit_count)
        VALUES ('grammar_exercises', ?, ?, ?, 'gemini-2.5-pro', 'grammar_guide (migrated)', ?, 0)
      `);
      const insert = db.transaction((entries) => {
        for (const [ruleId, items] of entries) {
          const key = `grammar::${ruleId}`;
          stmt.run(key, JSON.stringify({ ruleId }), JSON.stringify(items), now());
          count++;
        }
      });
      insert(Object.entries(data));
      console.log(`[KB] Migrated ${Object.keys(data).length} grammar exercise entries`);
    } catch (e) { console.error('[KB] Grammar migration error:', e.message); }
  }

  // ── 3. Arena exercises bank ──────────────────────────────────────────────
  const arenaFile = path.join(ROOT, 'ai_exercises.json');
  if (fs.existsSync(arenaFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(arenaFile, 'utf8'));
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO knowledge_base
          (type, key, input_json, output_json, model, source_app, created_at, hit_count)
        VALUES ('arena_exercises', ?, ?, ?, 'gemini-2.5-pro', 'exercise_arena (migrated)', ?, 0)
      `);
      const insert = db.transaction((entries) => {
        for (const [lessonId, items] of entries) {
          const key = `arena::L${lessonId}`;
          stmt.run(key, JSON.stringify({ lessonId }), JSON.stringify(items), now());
          count++;
        }
      });
      insert(Object.entries(data));
      console.log(`[KB] Migrated ${Object.keys(data).length} arena exercise entries`);
    } catch (e) { console.error('[KB] Arena migration error:', e.message); }
  }

  // ── 4. Video exercises ───────────────────────────────────────────────────
  const videoDbDir = path.join(ROOT, 'src', 'data', 'video-database');
  if (fs.existsSync(videoDbDir)) {
    try {
      const files = fs.readdirSync(videoDbDir).filter(f => f.endsWith('-exercises.json'));
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO knowledge_base
          (type, key, input_json, output_json, model, source_app, created_at, hit_count)
        VALUES ('video_exercises', ?, ?, ?, 'gemini-2.5-flash-lite', 'video_coach (migrated)', ?, 0)
      `);
      const insert = db.transaction((entries) => {
        for (const [key, val, videoId] of entries) {
          stmt.run(key, JSON.stringify({ videoId }), JSON.stringify(val), now());
          count++;
        }
      });
      const entries = [];
      for (const file of files) {
        const videoId = file.replace('-exercises.json', '');
        const data    = JSON.parse(fs.readFileSync(path.join(videoDbDir, file), 'utf8'));
        entries.push([`video_exercises::${videoId}`, data, videoId]);
      }
      insert(entries);
      console.log(`[KB] Migrated ${files.length} video exercise entries`);
    } catch (e) { console.error('[KB] Video exercises migration error:', e.message); }
  }

  if (count > 0) {
    console.log(`[KB] Migration complete — ${count} total entries`);
    flushJsonMirror();
  } else {
    console.log('[KB] Migration: nothing new to import');
  }
}

module.exports = { lookup, save, incrementHit, getStats, migrate, flushJsonMirror };
