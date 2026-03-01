const youtubedl = require('youtube-dl-exec')

async function test() {
    const output = await youtubedl('https://www.youtube.com/watch?v=4-eDoThe6qo', {
        dumpJson: true, noCheckCertificate: true, preferFreeFormats: true, youtubeSkipDashManifest: true
    });
    const subs = output.subtitles || {};
    const autoSubs = output.automatic_captions || {};
    let track = subs['de'] || subs['de-DE'] || autoSubs['de'] || autoSubs['de-DE'];

    if (!track) return console.log('not found');

    // Try to find json3
    let json3Format = track.find(t => t.ext === 'json3');
    if (json3Format) {
        const res = await fetch(json3Format.url);
        const data = await res.json();
        let transcript = [];
        if (data.events) {
            data.events.forEach(ev => {
                if (!ev.segs) return;
                let text = ev.segs.map(s => s.utf8).join('').trim();
                if (!text || text === '\n') return;
                transcript.push({
                    offset: ev.tStartMs || 0,
                    duration: ev.dDurationMs || 0,
                    text: text
                });
            });
        }
        console.log(transcript.slice(0, 3));
    } else {
        console.log('No json3 format');
    }
}
test();
