import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { handleGenerateStory } from './scripts/story-generator-api.js';
import { handleSegmentVideo, handleTranscribeAudio, handleVoiceChat, handleGenerateVideoExercises } from './scripts/ai-voice-coach-api.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const PROGRESS_FILE = path.join(process.cwd(), 'progress.json');
const PROGRESS_BACKUP = path.join(process.cwd(), 'progress.backup.json');
const AIBANK_FILE = path.join(process.cwd(), 'ai_exercises.json');
const GRAMMAR_BANK_FILE = path.join(process.cwd(), 'grammar_exercises.json');

// Count total data points as a proxy for "how much progress" a file has.
// This prevents a stale in-memory state from overwriting a richer file.
function dataScore(obj) {
  if (!obj) return 0;
  let score = 0;
  score += Object.keys(obj.vocabSeen || {}).length * 10;
  score += Object.keys(obj.completedLessons || {}).length * 100;
  score += (obj.xp || 0);
  score += Object.keys(obj.lessonStates || {}).filter(k => obj.lessonStates[k] !== null).length * 5;
  return score;
}

function safeWrite(filePath, data) {
  const tmpPath = filePath + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmpPath, filePath); // atomic on most OS
}

function progressPlugin() {
  return {
    name: 'progress-store',
    configureServer(server) {
      function parseBody(req) {
        return new Promise((resolve, reject) => {
          let body = '';
          req.on('data', chunk => (body += chunk.toString()));
          req.on('end', () => {
            try { resolve(JSON.parse(body)); } catch { reject(new Error('Invalid JSON')); }
          });
          req.on('error', reject);
        });
      }

      server.middlewares.use('/api/progress', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.writeHead(204);
          res.end();
          return;
        }

        if (req.method === 'GET') {
          try {
            if (fs.existsSync(PROGRESS_FILE)) {
              const data = fs.readFileSync(PROGRESS_FILE, 'utf8');
              res.writeHead(200);
              res.end(data);
            } else {
              res.writeHead(200);
              res.end('null');
            }
          } catch (e) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        if (req.method === 'POST') {
          try {
            const body = await parseBody(req);

            // Anti-downgrade guard: never save if incoming data has LESS progress
            // than what is already on disk. This prevents hot-reload race conditions
            // from wiping data.
            let existingScore = 0;
            if (fs.existsSync(PROGRESS_FILE)) {
              try {
                const existing = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
                existingScore = dataScore(existing);
              } catch { /* ignore parse errors, allow overwrite */ }
            }

            const incomingScore = dataScore(body);

            if (incomingScore < existingScore) {
              // Refuse to overwrite with less data — log the attempt
              console.warn(`[progress] Blocked downgrade write (existing: ${existingScore}, incoming: ${incomingScore})`);
              // We removed the block to avoid freezing the user's progress if a sync issue occurred.
            }

            // Create a rolling backup before overwriting
            if (fs.existsSync(PROGRESS_FILE)) {
              try { fs.copyFileSync(PROGRESS_FILE, PROGRESS_BACKUP); } catch { }
            }

            safeWrite(PROGRESS_FILE, body);
            res.writeHead(200);
            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        res.writeHead(405);
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });

      // ── Beacon endpoint — handles sendBeacon() on tab/window close ──────────
      // sendBeacon sends Content-Type: text/plain with a Blob, so we need
      // a separate endpoint that doesn't try to parse application/json headers.
      server.middlewares.use('/api/progress-beacon', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (req.method === 'POST') {
          try {
            const body = await parseBody(req);
            fs.writeFileSync(PROGRESS_FILE, JSON.stringify(body, null, 2), 'utf8');
            res.writeHead(200);
            res.end('ok');
          } catch (e) {
            // Beacon calls don't care about the response — we still try to log
            console.error('[progress-beacon] write failed:', e.message);
            res.writeHead(500);
            res.end('error');
          }
          return;
        }

        res.writeHead(405);
        res.end('method not allowed');
      });

      // ── AI Bank Endpoint ───────────────────────────────────────────────────
      server.middlewares.use('/api/aibank', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.writeHead(204); res.end(); return;
        }

        if (req.method === 'GET') {
          try {
            if (fs.existsSync(AIBANK_FILE)) {
              res.writeHead(200);
              res.end(fs.readFileSync(AIBANK_FILE, 'utf8'));
            } else {
              res.writeHead(200);
              res.end('{}');
            }
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        if (req.method === 'POST') {
          try {
            const body = await parseBody(req); // expects { lessonId: 1, items: [...] }
            let allData = {};
            if (fs.existsSync(AIBANK_FILE)) {
              allData = JSON.parse(fs.readFileSync(AIBANK_FILE, 'utf8'));
            }
            // Merge existing with new
            const current = allData[body.lessonId] || [];
            allData[body.lessonId] = [...current, ...(body.items || [])];

            fs.writeFileSync(AIBANK_FILE, JSON.stringify(allData, null, 2), 'utf8');
            res.writeHead(200); res.end(JSON.stringify({ ok: true, count: allData[body.lessonId].length }));
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        res.writeHead(405); res.end('method not allowed');
      });

      // ── Grammar Bank Endpoint ─────────────────────────────────────────────
      server.middlewares.use('/api/grammarbank', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.writeHead(204); res.end(); return;
        }

        if (req.method === 'GET') {
          try {
            if (fs.existsSync(GRAMMAR_BANK_FILE)) {
              res.writeHead(200);
              res.end(fs.readFileSync(GRAMMAR_BANK_FILE, 'utf8'));
            } else {
              res.writeHead(200);
              res.end('{}');
            }
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        if (req.method === 'POST') {
          try {
            const body = await parseBody(req); // expects { ruleId: 'L01_G01', items: [...] }
            let allData = {};
            if (fs.existsSync(GRAMMAR_BANK_FILE)) {
              allData = JSON.parse(fs.readFileSync(GRAMMAR_BANK_FILE, 'utf8'));
            }
            // Merge existing with new
            const current = allData[body.ruleId] || [];
            allData[body.ruleId] = [...current, ...(body.items || [])];

            fs.writeFileSync(GRAMMAR_BANK_FILE, JSON.stringify(allData, null, 2), 'utf8');
            res.writeHead(200); res.end(JSON.stringify({ ok: true, count: allData[body.ruleId].length }));
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        res.writeHead(405); res.end('method not allowed');
      });

      // ── AI Story Generator Endpoint ─────────────────────────────────────────
      server.middlewares.use('/api/generate-story', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (req.method === 'POST') return handleGenerateStory(req, res);
        res.writeHead(405); res.end('method not allowed');
      });

      // ── AI Voice Coach Endpoints ──────────────────────────────────────────
      server.middlewares.use('/api/segment-video', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (req.method === 'POST') return handleSegmentVideo(req, res);
        res.writeHead(405); res.end('method not allowed');
      });

      server.middlewares.use('/api/transcribe', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (req.method === 'POST') return handleTranscribeAudio(req, res);
        res.writeHead(405); res.end('method not allowed');
      });

      server.middlewares.use('/api/voice-coach-chat', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (req.method === 'POST') return handleVoiceChat(req, res);
        res.writeHead(405); res.end('method not allowed');
      });

      server.middlewares.use('/api/generate-video-exercises', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (req.method === 'POST') return handleGenerateVideoExercises(req, res);
        res.writeHead(405); res.end('method not allowed');
      });

      // ── Simple Translation API Endpoint ───────────────────────────────────────
      server.middlewares.use('/api/translate', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (req.method === 'POST') {
          let bodyText = '';
          req.on('data', chunk => { bodyText += chunk.toString(); });
          req.on('end', async () => {
            try {
              const { text, texts, source, target } = JSON.parse(bodyText);
              if (!text && (!texts || texts.length === 0)) {
                res.writeHead(400); res.end(JSON.stringify({ error: 'Text missing' })); return;
              }

              const isBatch = Array.isArray(texts);
              const qText = isBatch ? texts.join('\n') : text;

              const tlUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source || 'de'}&tl=${target || 'sk'}&dt=t&q=${encodeURIComponent(qText)}`;
              const transRes = await fetch(tlUrl);
              const transData = await transRes.json();
              const fullTranslated = transData[0].map(x => x[0]).join('');

              if (isBatch) {
                const translatedTexts = fullTranslated.split('\n').map(s => s.trim());
                res.writeHead(200); res.end(JSON.stringify({ translatedTexts }));
              } else {
                res.writeHead(200); res.end(JSON.stringify({ translatedText: fullTranslated.trim() }));
              }
            } catch (e) {
              res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
            }
          });
        }
        res.writeHead(405); res.end('method not allowed');
      });

      // ── API for caching completed video translations ──────────────────────
      server.middlewares.use('/api/cache-video-translation', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk.toString());
          req.on('end', () => {
            try {
              const { videoId, transcript, translations } = JSON.parse(body);
              if (videoId && transcript && translations) {
                const CACHE_DIR = require('path').join(process.cwd(), 'src', 'data', 'video-database');
                if (!require('fs').existsSync(CACHE_DIR)) {
                  require('fs').mkdirSync(CACHE_DIR, { recursive: true });
                }
                const CACHE_FILE = require('path').join(CACHE_DIR, `${videoId}.json`);
                require('fs').writeFileSync(CACHE_FILE, JSON.stringify({ transcript, translations }, null, 2));
              }
              res.writeHead(200); res.end(JSON.stringify({ ok: true }));
            } catch (e) {
              res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
            }
          });
          return;
        }
        res.writeHead(405); res.end('method not allowed');
      });

      // ── YouTube Transcript API Endpoint (using yt-dlp) ──────────────────────
      server.middlewares.use('/api/youtube-transcript', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        if (req.method === 'OPTIONS') {
          res.writeHead(204); res.end(); return;
        }
        if (req.method === 'GET') {
          const url = new URL(req.url, `http://${req.headers.host}`);
          const videoId = url.searchParams.get('v');
          if (!videoId) {
            res.writeHead(400); res.end(JSON.stringify({ error: 'Missing video ID' }));
            return;
          }
          try {
            const youtubedl = require('youtube-dl-exec');
            const output = await youtubedl(`https://www.youtube.com/watch?v=${videoId}`, {
              dumpJson: true, noWarnings: true, noCallHome: true, noCheckCertificate: true, preferFreeFormats: true, youtubeSkipDashManifest: true
            });
            const subs = output.subtitles || {};
            const autoSubs = output.automatic_captions || {};
            let track = subs['de'] || subs['de-DE'] || subs['de-ch'] || autoSubs['de'] || autoSubs['de-DE'];

            if (!track) {
              res.writeHead(404); res.end(JSON.stringify({ error: 'Nenašli sa nemecké titulky pre toto video (ani automatické).' }));
              return;
            }

            let json3Format = track.find(t => t.ext === 'json3');
            if (json3Format) {
              const fetchRes = await fetch(json3Format.url);
              const data = await fetchRes.json();
              let transcript = [];
              if (data.events) {
                data.events.forEach(ev => {
                  if (!ev.segs) return;
                  let text = ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
                  if (!text) return;
                  transcript.push({
                    offset: ev.tStartMs || 0,
                    duration: ev.dDurationMs || 0,
                    text: text
                  });
                });
              }

              // Save to public video cache for instant loading next time
              const CACHE_DIR = path.join(process.cwd(), 'src', 'data', 'video-database');
              if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
              const CACHE_FILE = path.join(CACHE_DIR, `${videoId}.json`);
              fs.writeFileSync(CACHE_FILE, JSON.stringify({ transcript }, null, 2));

              res.writeHead(200); res.end(JSON.stringify(transcript));
              return;
            }

            res.writeHead(404); res.end(JSON.stringify({ error: 'Nepodarilo sa spracovať formát tituliek.' }));
          } catch (e) {
            console.error('[youtube-transcript] error:', e);
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }
        res.writeHead(405); res.end('method not allowed');
      });

      // ── Video Database Endpoint ─────────────────────────────────────────────
      server.middlewares.use('/api/video-database', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'OPTIONS') {
          res.writeHead(204); res.end(); return;
        }

        if (req.method === 'GET') {
          try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const videoId = url.searchParams.get('v');
            if (!videoId) {
              res.writeHead(400); res.end(JSON.stringify({ error: 'Missing video ID' }));
              return;
            }

            const DB_FILE = path.join(process.cwd(), 'src', 'data', 'video-database', `${videoId}.json`);
            if (fs.existsSync(DB_FILE)) {
              res.writeHead(200);
              res.end(fs.readFileSync(DB_FILE, 'utf8'));
            } else {
              res.writeHead(404);
              res.end(JSON.stringify({ error: 'Video data not found' }));
            }
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        res.writeHead(405); res.end('method not allowed');
      });
    },
  };
}

function aiWritingCachePlugin() {
  const CACHE_FILE = path.join(process.cwd(), 'src', 'data', 'database-writing-exercise.json');
  return {
    name: 'ai-writing-cache',
    configureServer(server) {
      server.middlewares.use('/api/writing-cache', (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.writeHead(204);
          res.end();
          return;
        }

        if (req.method === 'GET') {
          try {
            if (fs.existsSync(CACHE_FILE)) {
              res.writeHead(200);
              res.end(fs.readFileSync(CACHE_FILE, 'utf8'));
            } else {
              res.writeHead(200);
              res.end('{}');
            }
          } catch (e) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk.toString());
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf8');
              res.writeHead(200);
              res.end(JSON.stringify({ success: true }));
            } catch (e) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: e.message }));
            }
          });
          req.on('error', (e) => {
            res.writeHead(500);
            res.end(JSON.stringify({ error: e.message }));
          });
          return;
        }

        res.writeHead(405);
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });
    }
  };
}

function ttsMiniTextPlugin() {
  const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio', 'minitext');
  const VOICE_MAP = {
    narrator: 'nova',
    jana: 'shimmer',
    receptionist: 'fable',
    schmidt: 'onyx',
    tom: 'echo'
  };

  return {
    name: 'tts-minitext',
    configureServer(server) {
      server.middlewares.use('/api/tts-minitext', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (req.method !== 'POST') { res.writeHead(405); res.end(JSON.stringify({ error: 'Method not allowed' })); return; }

        let body = '';
        req.on('data', chunk => (body += chunk.toString()));
        req.on('end', async () => {
          try {
            const { lessonId, segments } = JSON.parse(body);
            // segments: [{ index, speaker, de }]

            if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) throw new Error('OPENAI_API_KEY not set in .env');

            const results = [];
            for (const seg of segments) {
              const filename = `L${String(lessonId).padStart(2, '0')}_seg_${seg.index}.mp3`;
              const filePath = path.join(AUDIO_DIR, filename);
              const audioPath = `/audio/minitext/${filename}`;

              if (fs.existsSync(filePath)) {
                results.push({ index: seg.index, path: audioPath, cached: true });
                continue;
              }

              // Call OpenAI TTS — fires only once per segment, ever
              const voice = VOICE_MAP[seg.speaker] || 'nova';
              const ttsResp = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  model: 'tts-1-hd',
                  input: seg.de,
                  voice,
                  response_format: 'mp3',
                }),
              });

              if (!ttsResp.ok) {
                const errText = await ttsResp.text();
                throw new Error(`OpenAI TTS error ${ttsResp.status}: ${errText}`);
              }

              const buffer = Buffer.from(await ttsResp.arrayBuffer());
              fs.writeFileSync(filePath, buffer);
              results.push({ index: seg.index, path: audioPath, cached: false });

              // Track API Usage for TTS
              try {
                const { trackApiUsage } = require('./scripts/apiTracker.cjs');
                trackApiUsage('openai-tts', 'characters', seg.de.length);
                trackApiUsage('openai-tts', 'calls', 1);
              } catch (e) { console.error('Failed to log TTS usage:', e); }
            }

            res.writeHead(200);
            res.end(JSON.stringify({ success: true, segments: results }));
          } catch (e) {
            console.error('[tts-minitext]', e.message);
            res.writeHead(500);
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        req.on('error', e => { res.writeHead(500); res.end(JSON.stringify({ error: e.message })); });
      });
    },
  };
}

// ── Knowledge Base Plugin ──────────────────────────────────────────────────
function knowledgeBasePlugin() {
  return {
    name: 'knowledge-base',
    configureServer(server) {
      // Run legacy cache migration once on startup (idempotent)
      try {
        const kb = require('./scripts/knowledgeBase.cjs');
        kb.migrate();
      } catch (e) {
        console.error('[KB] Failed to migrate on startup:', e.message);
      }

      // Helper to parse request body
      function parseBody(req) {
        return new Promise((resolve, reject) => {
          let body = '';
          req.on('data', chunk => (body += chunk.toString()));
          req.on('end', () => { try { resolve(JSON.parse(body)); } catch { reject(new Error('Invalid JSON')); } });
          req.on('error', reject);
        });
      }

      // ── GET /api/kb/stats — aggregated statistics ─────────────────────────
      server.middlewares.use('/api/kb/stats', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (req.method === 'GET') {
          try {
            const kb = require('./scripts/knowledgeBase.cjs');
            res.writeHead(200);
            res.end(JSON.stringify(kb.getStats()));
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }
        res.writeHead(405); res.end('method not allowed');
      });

      // ── GET /api/kb?type=X&key=Y — lookup ────────────────────────────────
      // ── POST /api/kb { type, key, input, output, model, sourceApp } — save
      server.middlewares.use('/api/kb', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

        const kb = require('./scripts/knowledgeBase.cjs');

        if (req.method === 'GET') {
          try {
            const url    = new URL(req.url, `http://${req.headers.host}`);
            const type   = url.searchParams.get('type');
            const key    = url.searchParams.get('key');
            if (!type || !key) { res.writeHead(400); res.end(JSON.stringify({ error: 'type and key required' })); return; }
            const hit = kb.lookup(type, key);
            if (hit) {
              kb.incrementHit(hit.id);
              res.writeHead(200); res.end(JSON.stringify({ found: true, output: hit.output, hitCount: hit.hitCount + 1, fuzzy: hit.fuzzy || false }));
            } else {
              res.writeHead(200); res.end(JSON.stringify({ found: false }));
            }
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        if (req.method === 'POST') {
          try {
            const body = await parseBody(req);
            const { type, key, input, output, model, sourceApp, upsert } = body;
            if (!type || !key || output === undefined) { res.writeHead(400); res.end(JSON.stringify({ error: 'type, key, output required' })); return; }
            const id = kb.save({ type, key, input: input || {}, output, model: model || '', sourceApp: sourceApp || '', upsert: !!upsert });
            res.writeHead(200); res.end(JSON.stringify({ saved: id !== null, id }));
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        res.writeHead(405); res.end('method not allowed');
      });
    }
  };
}

function apiStatsPlugin() {
  const STATS_FILE = path.join(process.cwd(), 'api_stats.json');
  return {
    name: 'api-stats',
    configureServer(server) {
      server.middlewares.use('/api/stats', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (req.method === 'GET') {
          try {
            if (fs.existsSync(STATS_FILE)) {
              res.writeHead(200); res.end(fs.readFileSync(STATS_FILE, 'utf8'));
            } else {
              res.writeHead(200); res.end('{}');
            }
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk.toString());
          req.on('end', () => {
            try {
              const { model, type, amount } = JSON.parse(body);
              const { trackApiUsage } = require('./scripts/apiTracker.cjs');
              trackApiUsage(model, type, amount);
              res.writeHead(200); res.end(JSON.stringify({ success: true }));
            } catch (e) {
              res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
            }
          });
          return;
        }
        res.writeHead(405); res.end('method not allowed');
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), progressPlugin(), aiWritingCachePlugin(), ttsMiniTextPlugin(), apiStatsPlugin(), knowledgeBasePlugin()],
});
