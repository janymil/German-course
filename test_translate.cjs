const https = require('https');

async function translate(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=sk&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
}

async function test() {
    const sk = await translate("Hallo Herr Müller! Wie geht es Ihnen heute?");
    console.log('Sk:', sk);
}
test();
