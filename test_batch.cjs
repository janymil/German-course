async function testMultiQ() {
    const lines = [
        "Hallo, wie geht es dir?",
        "Mir geht es gut, danke.",
        "Und dir?",
        "Ich bin heute sehr müde."
    ];

    // multiple q approach
    const qString = lines.map(l => `q=${encodeURIComponent(l)}`).join('&');

    const tlUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=sk&dt=t&${qString}`;
    const res = await fetch(tlUrl);
    const data = await res.json();

    console.log(data);
}
testMultiQ();
