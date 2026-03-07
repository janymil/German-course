const fs = require('fs');
const path = require('path');

const STATS_FILE = path.join(process.cwd(), 'api_stats.json');
const HISTORY_FILE = path.join(process.cwd(), 'api_history.json');

// Gemini Free Tier Limits
const LIMITS = {
    'gemini-2.5-pro': { rpm: 15, tpm: 1000000, rpd: 1500 },
    'gemini-2.5-flash': { rpm: 15, tpm: 1000000, rpd: 1500 },
    'gemini-2.5-flash-lite': { rpm: 15, tpm: 1000000, rpd: 1500 }
};

async function checkAndBlockRateLimit(model, estimatedTokens = 40000) {
    if (!LIMITS[model]) return; // No limits defined for this model

    let history = [];
    if (fs.existsSync(HISTORY_FILE)) {
        try { history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')); } catch (e) { history = []; }
    }

    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    // Clean up old history (older than 1 day)
    history = history.filter(entry => entry.time > oneDayAgo);

    const modelHistory = history.filter(e => e.model === model);
    const minuteHistory = modelHistory.filter(e => e.time > oneMinuteAgo);

    const callsInMinute = minuteHistory.length;
    const tokensInMinute = minuteHistory.reduce((sum, e) => sum + e.tokens, 0);
    const callsInDay = modelHistory.length;

    const limit = LIMITS[model];
    let waitTime = 0;

    if (callsInDay >= limit.rpd) {
        console.error(`\n[API LIMITER] Daily limit reached for ${model} (${limit.rpd} calls). The Free Tier is exhausted for today!`);
        throw new Error(`Daily API limit exceeded for ${model} (Free Tier Exhausted).`);
    }

    if (callsInMinute >= limit.rpm) {
        const oldestEntryInMinute = minuteHistory[0];
        const timeToWait = (oldestEntryInMinute.time + 60000) - now;
        console.log(`\n[API LIMITER] Reached ${limit.rpm} requests/min limit for ${model}. Pausing for ${Math.ceil(timeToWait / 1000)}s to stay free...`);
        waitTime = Math.max(waitTime, timeToWait);
    }

    if (tokensInMinute + estimatedTokens > limit.tpm) {
        const oldestEntryInMinute = minuteHistory[0];
        const timeToWait = (oldestEntryInMinute.time + 60000) - now;
        console.log(`\n[API LIMITER] Approaching ${limit.tpm} tokens/min limit for ${model} (Used: ${tokensInMinute}, Est. new: ${estimatedTokens}). Pausing for ${Math.ceil(timeToWait / 1000)}s...`);
        waitTime = Math.max(waitTime, timeToWait);
    }

    if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime + 1000));
        // Recurse to ensure limits are clear after waiting
        return checkAndBlockRateLimit(model, estimatedTokens);
    }
}

function recordApiCall(model, tokens) {
    let history = [];
    if (fs.existsSync(HISTORY_FILE)) {
        try { history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')); } catch (e) { history = []; }
    }
    history.push({ time: Date.now(), model, tokens });

    // Clean up older than 1 day immediately
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    history = history.filter(entry => entry.time > oneDayAgo);

    try { fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8'); } catch (e) { }
}

// Helper to track any API usage globally
function trackApiUsage(model, type, amount) {
    let stats = {};
    if (fs.existsSync(STATS_FILE)) {
        try {
            stats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
        } catch (e) {
            stats = {};
        }
    }

    if (!stats[model]) {
        stats[model] = {};
    }

    stats[model][type] = (stats[model][type] || 0) + amount;

    try {
        fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), 'utf8');
    } catch (e) {
        console.error('Failed to write api_stats.json:', e);
    }
}

module.exports = { trackApiUsage, checkAndBlockRateLimit, recordApiCall };
