async function test() {
    const htmlRes = await fetch('https://www.youtube.com/watch?v=4-eDoThe6qo');
    const html = await htmlRes.text();
    const match = html.match(/"captionTracks":\s*(\[.*?\])/);
    const tracks = JSON.parse(match[1]);
    const deTrack = tracks.find(t => t.languageCode.startsWith('de')) || tracks[0];
    const xmlUrl = deTrack.baseUrl;
    const xmlRes = await fetch(xmlUrl);
    console.log("Status:", xmlRes.status, xmlRes.statusText);
}
test();
