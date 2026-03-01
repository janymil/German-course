import { Innertube, UniversalCache } from 'youtubei.js';

async function run() {
    try {
        const yt = await Innertube.create({
            generate_session_locally: true,
            cache: new UniversalCache(false)
        });
        const info = await yt.getInfo('4-eDoThe6qo');
        const tracks = info.captions?.caption_tracks;
        if (!tracks) return console.log("No caption tracks!");

        console.log("Found tracks:", tracks.length);
        const deTrack = tracks.find(t => t.language_code === 'de' || t.language_code.startsWith('de')) || tracks[0];

        // get transcript text
        const transcriptData = await info.getTranscript(deTrack.language_code);
        console.log("Transcript segment count:", transcriptData?.transcript?.content?.body?.initial_segments?.length);
        console.log(transcriptData?.transcript?.content?.body?.initial_segments?.map(s => s.snippet?.text).join(' ').substring(0, 500));
    } catch (e) { console.error('Error:', e); }
}
run();
