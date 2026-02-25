/**
 * CURRICULUM INDEX
 * Imports all 80 lesson files and assembles the full LESSONS array.
 * 16 weeks × 5 lessons/week = 80 lessons ≈ 77 hours of A1 content.
 * Jana Nováková narrative: Bratislava → Vienna (Goethe A1 aligned).
 */

// Unit 1: First Contact (L01–L10) — Weeks 1–2
import { lesson01 } from './lessons/L01.js';
import { lesson02 } from './lessons/L02.js';
import { lesson03 } from './lessons/L03.js';
import { lesson04 } from './lessons/L04.js';
import { lesson05 } from './lessons/L05.js';
import { lesson06 } from './lessons/L06.js';
import { lesson07 } from './lessons/L07.js';
import { lesson08 } from './lessons/L08.js';
import { lesson09 } from './lessons/L09.js';
import { lesson10 } from './lessons/L10.js';

// Unit 2: Vienna Arrival (L11–L20) — Weeks 3–4
import { lesson11 } from './lessons/L11.js';
import { lesson12 } from './lessons/L12.js';
import { lesson13 } from './lessons/L13.js';
import { lesson14 } from './lessons/L14.js';
import { lesson15 } from './lessons/L15.js';
import { lesson16 } from './lessons/L16.js';
import { lesson17 } from './lessons/L17.js';
import { lesson18 } from './lessons/L18.js';
import { lesson19 } from './lessons/L19.js';
import { lesson20 } from './lessons/L20.js';

// Unit 3: Daily Routine (L21–L30) — Weeks 5–6
import { lesson21 } from './lessons/L21.js';
import { lesson22 } from './lessons/L22.js';
import { lesson23 } from './lessons/L23.js';
import { lesson24 } from './lessons/L24.js';
import { lesson25 } from './lessons/L25.js';
import { lesson26 } from './lessons/L26.js';
import { lesson27 } from './lessons/L27.js';
import { lesson28 } from './lessons/L28.js';
import { lesson29 } from './lessons/L29.js';
import { lesson30 } from './lessons/L30.js';

// Unit 4: Shopping, Eating & Travelling (L31–L40) — Weeks 7–8
import { lesson31 } from './lessons/L31.js';
import { lesson32 } from './lessons/L32.js';
import { lesson33 } from './lessons/L33.js';
import { lesson34 } from './lessons/L34.js';
import { lesson35 } from './lessons/L35.js';
import { lesson36 } from './lessons/L36.js';
import { lesson37 } from './lessons/L37.js';
import { lesson38 } from './lessons/L38.js';
import { lesson39 } from './lessons/L39.js';
import { lesson40 } from './lessons/L40.js';

// Unit 5: Health & Social Life (L41–L50) — Weeks 9–10
import { lesson41 } from './lessons/L41.js';
import { lesson42 } from './lessons/L42.js';
import { lesson43 } from './lessons/L43.js';
import { lesson44 } from './lessons/L44.js';
import { lesson45 } from './lessons/L45.js';
import { lesson46 } from './lessons/L46.js';
import { lesson47 } from './lessons/L47.js';
import { lesson48 } from './lessons/L48.js';
import { lesson49 } from './lessons/L49.js';
import { lesson50 } from './lessons/L50.js';

// Unit 6: Writing & Communication (L51–L60) — Weeks 11–12
import { lesson51 } from './lessons/L51.js';
import { lesson52 } from './lessons/L52.js';
import { lesson53 } from './lessons/L53.js';
import { lesson54 } from './lessons/L54.js';
import { lesson55 } from './lessons/L55.js';
import { lesson56 } from './lessons/L56.js';
import { lesson57 } from './lessons/L57.js';
import { lesson58 } from './lessons/L58.js';
import { lesson59 } from './lessons/L59.js';
import { lesson60 } from './lessons/L60.js';

// Unit 7: Grammar Consolidation & Advanced A1 (L61–L70) — Weeks 13–14
import { lesson61 } from './lessons/L61.js';
import { lesson62 } from './lessons/L62.js';
import { lesson63 } from './lessons/L63.js';
import { lesson64 } from './lessons/L64.js';
import { lesson65 } from './lessons/L65.js';
import { lesson66 } from './lessons/L66.js';
import { lesson67 } from './lessons/L67.js';
import { lesson68 } from './lessons/L68.js';
import { lesson69 } from './lessons/L69.js';
import { lesson70 } from './lessons/L70.js';

// Unit 8: Exam Prep & Final Proficiency (L71–L80) — Weeks 15–16
import { lesson71 } from './lessons/L71.js';
import { lesson72 } from './lessons/L72.js';
import { lesson73 } from './lessons/L73.js';
import { lesson74 } from './lessons/L74.js';
import { lesson75 } from './lessons/L75.js';
import { lesson76 } from './lessons/L76.js';
import { lesson77 } from './lessons/L77.js';
import { lesson78 } from './lessons/L78.js';
import { lesson79 } from './lessons/L79.js';
import { lesson80 } from './lessons/L80.js';

export const LESSONS = [
  lesson01, lesson02, lesson03, lesson04, lesson05,
  lesson06, lesson07, lesson08, lesson09, lesson10,
  lesson11, lesson12, lesson13, lesson14, lesson15,
  lesson16, lesson17, lesson18, lesson19, lesson20,
  lesson21, lesson22, lesson23, lesson24, lesson25,
  lesson26, lesson27, lesson28, lesson29, lesson30,
  lesson31, lesson32, lesson33, lesson34, lesson35,
  lesson36, lesson37, lesson38, lesson39, lesson40,
  lesson41, lesson42, lesson43, lesson44, lesson45,
  lesson46, lesson47, lesson48, lesson49, lesson50,
  lesson51, lesson52, lesson53, lesson54, lesson55,
  lesson56, lesson57, lesson58, lesson59, lesson60,
  lesson61, lesson62, lesson63, lesson64, lesson65,
  lesson66, lesson67, lesson68, lesson69, lesson70,
  lesson71, lesson72, lesson73, lesson74, lesson75,
  lesson76, lesson77, lesson78, lesson79, lesson80,
];

// --- Weekly Plan (16 weeks × 5 lessons) ---
export const WEEKLY_PLAN = [
  {
    week: 1,
    title: "Prvý kontakt",
    theme: "Abeceda, pozdravy, sein, W-otázky, čísla",
    lessons: [1, 2, 3, 4, 5],
    restDays: [6, 7],
    tips: "Prvý týždeň – len pasívne opakuj. Neprestávaj kvôli gramatike. Počúvaj každú lekciu 3×."
  },
  {
    week: 2,
    title: "Základná gramatika",
    theme: "Členy, akuzatív, slovesá, prídavné mená",
    lessons: [6, 7, 8, 9, 10],
    restDays: [6, 7],
    tips: "Členy (der/die/das) sa musia naučiť spamäti. Každé nové slovo ukladaj AJ s členom."
  },
  {
    week: 3,
    title: "Príchod do Viedne",
    theme: "kein/keine, es gibt, privlastňovacie zámená, modálne",
    lessons: [11, 12, 13, 14, 15],
    restDays: [6, 7],
    tips: "Zopakuj lekcie 1–10 v rýchlom prehľade (flashcard mód) pred každou novou lekciou."
  },
  {
    week: 4,
    title: "Reštaurácia a čas",
    theme: "Reštaurácia, müssen/dürfen, čas, odlučiteľné slovesá",
    lessons: [16, 17, 18, 19, 20],
    restDays: [6, 7],
    tips: "Skús objednať jedlo po nemecky – hoci len v hlave alebo v cvičnom dialógu."
  },
  {
    week: 5,
    title: "Každodenná rutina",
    theme: "Dni týždňa, imperatív, smer, transport",
    lessons: [21, 22, 23, 24, 25],
    restDays: [6, 7],
    tips: "Popíš svoj ranný rituál po nemecky. 'Ich stehe um 7 Uhr auf. Ich frühstücke...'"
  },
  {
    week: 6,
    title: "Rodina a nakupovanie",
    theme: "Datív, rodina, nakupovanie, weil-vety, počasie",
    lessons: [26, 27, 28, 29, 30],
    restDays: [6, 7],
    tips: "Popíš svoju rodinu po nemecky. Kto je kto? Koľko má rokov? Čo robí?"
  },
  {
    week: 7,
    title: "Oblečenie a varenie",
    theme: "Oblečenie, varenie, kaviarňa, čísla 100–1000",
    lessons: [31, 32, 33, 34, 35],
    restDays: [6, 7],
    tips: "Choď nakupovať (alebo si to predstav) a pomenuj všetko po nemecky."
  },
  {
    week: 8,
    title: "Práca a záľuby",
    theme: "Povolania, kancelária, telefón, záľuby, reflexívne slovesá",
    lessons: [36, 37, 38, 39, 40],
    restDays: [6, 7],
    tips: "Popíš seba v 5 vetách po nemecky. Meno, odkiaľ si, čo robíš, záľuby, rodina."
  },
  {
    week: 9,
    title: "Zdravie a šport",
    theme: "Telo, lekár, emócie, šport, komparatív",
    lessons: [41, 42, 43, 44, 45],
    restDays: [6, 7],
    tips: "Opíš, ako sa dnes cítiš. Čo ťa bolí? Aký šport robíš? Použi komparatív."
  },
  {
    week: 10,
    title: "Sviatky a cestovanie",
    theme: "Mesiace, narodeniny, pozvánky, cestovanie, Perfekt",
    lessons: [46, 47, 48, 49, 50],
    restDays: [6, 7],
    tips: "Porozprávaj o minulom víkende v Perfekte. 'Ich habe... / Ich bin...'"
  },
  {
    week: 11,
    title: "Komunikácia a písanie",
    theme: "Perfekt sein, minulosť, formuláre, e-maily, supermarket",
    lessons: [51, 52, 53, 54, 55],
    restDays: [6, 7],
    tips: "Napíš krátky e-mail alebo správu po nemecky. Formálny aj neformálny register."
  },
  {
    week: 12,
    title: "Bývanie a mesto",
    theme: "Byt, MHD, opravy, kaderník, čítanie",
    lessons: [56, 57, 58, 59, 60],
    restDays: [6, 7],
    tips: "Opíš svoju trasu do práce/školy pomocou MHD po nemecky."
  },
  {
    week: 13,
    title: "Pokročilá gramatika A1",
    theme: "Superlatív, adjektíva, datív celkovo, genitív, vedľajšie vety",
    lessons: [61, 62, 63, 64, 65],
    restDays: [6, 7],
    tips: "Precvičuj vedľajšie vety: 'Ich lerne Deutsch, weil... / Ich weiß, dass...'"
  },
  {
    week: 14,
    title: "Budúcnosť a syntax",
    theme: "Werden, neurčité zámená, imperatív, vzťažné vety, veľký review",
    lessons: [66, 67, 68, 69, 70],
    restDays: [6, 7],
    tips: "Napíš 5 plánov na budúci rok pomocou werden. Toto je A1 míľnik!"
  },
  {
    week: 15,
    title: "Príprava na Goethe A1",
    theme: "Hören, Lesen, Schreiben, Sprechen – formát skúšky",
    lessons: [71, 72, 73, 74, 75],
    restDays: [6, 7],
    tips: "Stiahni si vzorové testy Goethe A1 z goethe.de. Precvičuj reálny formát."
  },
  {
    week: 16,
    title: "Záverečný sprint a A1 Abschluss",
    theme: "Počasie, čísla, zdravie, mock skúška, záver",
    lessons: [76, 77, 78, 79, 80],
    restDays: [6, 7],
    tips: "Gratulujeme! Ak zvládneš L80 na 80%+, si pripravený/á na Goethe A1. Viel Erfolg!"
  },
];

// --- A2 Preview ---
export const A2_PREVIEW = [
  "Préteritum (Imperfekt) – písomný minulý čas: war, hatte, machte...",
  "Konjunktív II – priania a zdvorilosť: würde + infinitív, wäre, hätte",
  "Plná adjektívna deklinácia – všetky pády a rody",
  "Dvojsmerné predložky v hĺbke – in/an/auf/über + Akk vs Dativ",
  "Rozšírené vzťažné vety – datívne vzťažné zámená",
  "Pasívum (uvedenie) – es wird gemacht",
  "Nepriama reč – er sagt, dass...",
  "Wortschatz A2 – 1500+ slov, register a idiomy",
];
