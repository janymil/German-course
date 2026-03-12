/**
 * Deutsch Übungsbuch Grammatik A1/A2
 * Book structure matching the Obsah (Table of Contents)
 * Chapters are added one by one as screenshots are provided.
 */

export const UBUNGSBUCH_SECTIONS = [
  {
    id: 'verb-formen',
    title: 'VERB: Formen',
    color: '#0e7490',
    chapters: [
      { id: 1, num: 1, title: 'Verb: sein/haben', subtitle: 'Ich bin Maryam. Hast du Zeit?', pages: '8–10', status: 'available' },
      { id: 2, num: 2, title: 'Zeit: Präsens', subtitle: 'Sie spielt Gitarre.', pages: '11–15', status: 'coming-soon' },
      { id: 3, num: 3, title: 'Zeit: Perfekt', subtitle: 'Sie hat Gitarre gespielt.', pages: '16–23', status: 'coming-soon' },
      { id: 4, num: 4, title: 'Zeit: Präteritum', subtitle: 'Sie spielte Gitarre.', pages: '24–26', status: 'coming-soon' },
      { id: 5, num: 5, title: 'Modalverb', subtitle: 'Ich will es essen.', pages: '27–33', status: 'coming-soon' },
      { id: 6, num: 6, title: 'Verb: trennbar/untrennbar', subtitle: 'Der Zug kommt um 3 Uhr an.', pages: '34–37', status: 'coming-soon' },
      { id: 7, num: 7, title: 'Imperativ', subtitle: 'Fahr nicht so schnell!!', pages: '38–41', status: 'coming-soon' },
      { id: 8, num: 8, title: 'Konjunktiv II', subtitle: 'Ich würde gern ins Kino gehen.', pages: '42–44', status: 'coming-soon' },
      { id: 9, num: 9, title: 'Passiv Präsens', subtitle: 'Hier wird ein Haus gebaut.', pages: '45–47', status: 'coming-soon' },
    ],
  },
  {
    id: 'verb-partner',
    title: 'VERB + Partner',
    color: '#0e7490',
    chapters: [
      { id: 10, num: 10, title: 'Verb + Kasus', subtitle: 'Ich gebe Tom meine Adresse.', pages: '48–53', status: 'coming-soon' },
      { id: 11, num: 11, title: 'Verb + Präposition', subtitle: 'Er denkt nur ans Essen.', pages: '54–58', status: 'coming-soon' },
      { id: 12, num: 12, title: 'Verb + Reflexivpronomen', subtitle: 'Wo treffen wir uns heute?', pages: '59–62', status: 'coming-soon' },
      { id: 13, num: 13, title: 'Verb + Infinitiv', subtitle: 'Ich lasse das Rad reparieren.', pages: '63–66', status: 'coming-soon' },
    ],
  },
  {
    id: 'nomen',
    title: 'NOMEN',
    color: '#7c3aed',
    chapters: [
      { id: 14, num: 14, title: 'Nomen: Genus', subtitle: 'Der Mann und die Frau wohnen hier.', pages: '67–71', status: 'coming-soon' },
      { id: 15, num: 15, title: 'Nomen: Plural', subtitle: 'Ich mag Äpfel, Birnen und Kiwis.', pages: '72–74', status: 'coming-soon' },
      { id: 16, num: 16, title: 'Artikel', subtitle: 'Kim hat eine Katze. Die Katze heißt Merlin.', pages: '75–78', status: 'coming-soon' },
      { id: 17, num: 17, title: 'Possessivartikel', subtitle: 'Mein Name ist Müller.', pages: '79–83', status: 'coming-soon' },
    ],
  },
  {
    id: 'pronomen',
    title: 'PRONOMEN',
    color: '#b45309',
    chapters: [
      { id: 18, num: 18, title: 'Personalpronomen', subtitle: 'Anna ist nett, ich mag sie.', pages: '84–89', status: 'coming-soon' },
      { id: 19, num: 19, title: 'Weitere Pronomen', subtitle: 'Gehört dieses Buch dir? – Ja, das ist meins.', pages: '90–93', status: 'coming-soon' },
      { id: 20, num: 20, title: 'Fragepronomen', subtitle: 'Welche Wörter kennst du schon?', pages: '94–96', status: 'coming-soon' },
    ],
  },
  {
    id: 'adjektiv-adverb',
    title: 'ADJEKTIV + ADVERB',
    color: '#15803d',
    chapters: [
      { id: 21, num: 21, title: 'Adjektiv: Stellung', subtitle: 'Heute ist das Wetter schlecht.', pages: '97–100', status: 'coming-soon' },
      { id: 22, num: 22, title: 'Komparation', subtitle: 'Das Hemd ist billiger als die Hose.', pages: '101–104', status: 'coming-soon' },
      { id: 23, num: 23, title: 'Adjektiv: Endung', subtitle: 'Ich habe ein rotes Auto.', pages: '105–110', status: 'coming-soon' },
      { id: 24, num: 24, title: 'Adverb', subtitle: 'Morgens trinke ich gern Tee.', pages: '111–114', status: 'coming-soon' },
    ],
  },
  {
    id: 'praposition',
    title: 'PRÄPOSITION',
    color: '#b45309',
    chapters: [
      { id: 25, num: 25, title: 'Präposition: temporal', subtitle: 'Im Winter ist es schon um 18 Uhr dunkel.', pages: '115–120', status: 'coming-soon' },
      { id: 26, num: 26, title: 'Präposition: lokal', subtitle: 'Geh sie zur Post?', pages: '121–127', status: 'coming-soon' },
      { id: 27, num: 27, title: 'Wechselpräposition', subtitle: 'Ich liege am Strand.', pages: '128–133', status: 'coming-soon' },
      { id: 28, num: 28, title: 'Präposition mit Dativ/Akkusativ', subtitle: 'Kommst du mit ihm oder ohne ihn?', pages: '134–140', status: 'coming-soon' },
    ],
  },
  {
    id: 'satz',
    title: 'SATZ',
    color: '#be123c',
    chapters: [
      { id: 29, num: 29, title: 'Satzstellung: Hauptsatz', subtitle: 'Heute bleibe ich zu Hause.', pages: '141–143', status: 'coming-soon' },
      { id: 30, num: 30, title: 'Fragesatz', subtitle: 'Wann kommst du nach Hause?', pages: '144–148', status: 'coming-soon' },
      { id: 31, num: 31, title: 'Satzverbindung', subtitle: 'Er ist krank, deshalb kommt er nicht.', pages: '149–153', status: 'coming-soon' },
      { id: 32, num: 32, title: 'Nebensatz mit dass', subtitle: 'Ich denke, dass es bald regnet.', pages: '154–157', status: 'coming-soon' },
      { id: 33, num: 33, title: 'Nebensatz mit weil', subtitle: 'Wir bleiben noch, weil es regnet.', pages: '158–161', status: 'coming-soon' },
      { id: 34, num: 34, title: 'Nebensatz mit wenn', subtitle: 'Wenn es kalt wird, bleiben wir im Haus.', pages: '162–165', status: 'coming-soon' },
      { id: 35, num: 35, title: 'Relativsatz', subtitle: 'Ich suche Schokolade, die gut schmeckt.', pages: '166–168', status: 'coming-soon' },
      { id: 36, num: 36, title: 'Negation', subtitle: 'Er hat keine Zeit und kann nicht kommen.', pages: '169–173', status: 'coming-soon' },
    ],
  },
];

export const ALL_CHAPTERS = UBUNGSBUCH_SECTIONS.flatMap(s => s.chapters);
