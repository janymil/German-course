import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI();
const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
const text = `Kapitel 1: Eine komische Halskette

Leise öffnet Emma die Tür zum Spielzimmer. Noch ist Mittagsruhe. Ein paar Kinder schlafen, die anderen sehen Bilderbücher an oder spielen mit Teddys in der Kissenecke. Die Kindergärtnerin auf ihrem Stuhl hat ein Buch auf den Knien. Ihre Augen sind geschlossen. Emma lächelt. Hier gibt es wirklich eine ruhige Mittagszeit.

Aber da sieht ein kleiner Junge von seinem Bilderbuch auf.
Omi, Omi! Er läuft in Emmas Arme und die Ruhe ist vorbei.

Die Kindergärtnerin hat auch geschlafen. Jetzt sieht sie auf.
Oh, Frau Wagner, Sie sind schon da.
Entschuldigen Sie bitte, aber ich möchte meinen Enkelsohn heute ein bisschen früher abholen.
Kein Problem, Frau Wagner, ich muss die Kleinen sowieso jetzt wecken.

Simon flüstert seiner Oma ins Ohr. Das stimmt nicht, Omi.
Sie weckt uns nie. Sie schläft immer ganz lange.

Emma muss lachen und nimmt Simon an der Hand.
Komm, wir holen deine Jacke, dann gehen wir nach Hause.

Emma hilft ihrem Enkelsohn in die Schuhe. So lange hat sie gewartet. Nun hat sie endlich mehr Zeit für Simon. Fehlt ihr die Arbeit als Kriminalkommissarin? Im Moment sicher nicht. Jetzt ist sie seit einer Woche in Rente und freut sich. Sie ist einfach nur Oma.

Bis zum Wochenende wohnt Simon sogar bei ihr. Seine Eltern sind für ein paar Tage auf Reisen. Sie haben einen Geschäftstermin in Wien und wollen dann noch die Stadt ansehen. Endlich kann Emma ihrer Tochter helfen und manchmal etwas mit Simon machen. In den letzten Jahren war das fast nie möglich.

Hand in Hand gehen die beiden in der warmen Nachmittagssonne die Plinganserstraße hinunter, Richtung Harras.

Emma fragt gerade. Na, Simon? Sollen wir uns ein Eis kaufen? Da bleibt er plötzlich stehen.
Oh nein, Omi, jetzt hab ich Felix vergessen. Seine Kette!
Was hast du vergessen? Und was für eine Kette?

Simon sucht in seiner Hosentasche. Nach einem alten Taschentuch, einem Radiergummi, einem kleinen Porsche und einem alten Kaugummi hat er eine Halskette in der Hand und gibt sie Emma.

Schau mal, die war im Kindergarten im Bad auf dem Boden. Das ist Felix Glücksbringer. Sein Papa hat ihm die Kette geschenkt. Er trägt sie immer um den Hals.

Emma nimmt die Kette und sieht den Anhänger an. Ein rundes Stück Metall, wie ein 20-Cent-Stück, ein paar Zahlen darauf, ein paar Buchstaben...
Ich kenne so etwas. Denkt Emma. Wo habe ich das schon einmal gesehen?
Wann hast du sie denn gefunden, Simon? Und warum hast du Felix die Kette nicht zurückgegeben? Fragt sie laut.
Das war so. Nach dem Mittagsschlaf muss ich immer Pipi. Dann steh ich auf und geh ins Bad. Da hab ich die Kette auf dem Boden gefunden und mitgenommen. Und dann hab ich Felix gesucht, aber nicht gesehen. Dann hab ich das Bilderbuch angesehen und dann bist du gekommen.
Gut, Simon. Wir gehen erst einmal Eis essen und bringen deine Tasche nach Hause. Später machen wir einen Spaziergang zu Felix und du gibst ihm die Kette zurück.

Schokolade und Erdbeere, Emmas Lieblingseis. Es ist lecker wie immer, aber Emma muss an die Kette denken. Sieht sie nicht aus wie eine Plombe? Macht man nicht die Koffer von Geldtransporten mit diesen Plomben zu? Doch warum hat ein Junge in Felix Alter so ein Stück Metall um den Hals? Und warum schenkt ein Vater seinem Sohn so eine Kette?

Aber da fällt Simon eine Eiskugel auf den Boden. Er weint, Omi tröstet, und die Kette ist erst einmal vergessen.`;

    const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [
            {
                role: "system",
                content: "You are a highly advanced AI that specializes in translating German correctly into Slovak. Give me array of objects with fields de, sk, format, endParagraph. Keep formats like dialogue exactly. Group paragraphs using endParagraph: true on the last sentences."
            },
            {
                role: "user",
                content: text
            }
        ],
        response_format: { type: "json_object" }
    });

    try {
        let result = response.choices[0].message.content;
        result = result.replace(/```json\n|\n```/g, "");
        fs.writeFileSync("output_sentences.json", result);
        console.log("SUCCESS");
    } catch(e) {
        console.error(e);
    }
}
run();
