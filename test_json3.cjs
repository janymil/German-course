const youtubedl = require('youtube-dl-exec')

async function test() {
    const output = await youtubedl('https://www.youtube.com/watch?v=4-eDoThe6qo', {
        dumpJson: true, noCheckCertificate: true, preferFreeFormats: true, youtubeSkipDashManifest: true
    });
    const subs = output.subtitles || {};
    let track = subs['de-DE'];
    let json3Format = track.find(t => t.ext === 'json3');
    const res = await fetch(json3Format.url);
    const data = await res.json();
    const missing = data.events.filter(e => e.segs && !e.dDurationMs);
    console.log(`Total events: ${data.events.length}, Missing duration: ${missing.length}`);
}
test();
