const https = require('https');

https.get('https://www.youtube.com/watch?v=4-eDoThe6qo', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const match = data.match(/"captionTracks":\s*(\[.*?\])/);
        if (match) {
            const tracks = JSON.parse(match[1]);
            console.log('Available languages:', tracks.map(t => ({ lang: t.languageCode, hasA: t.vssId.includes('a.') })));
        } else {
            console.log('No captionTracks found.');
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
