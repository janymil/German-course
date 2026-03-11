// ==========================================================
// lessons.js  — Full A1 Lesson Content
// ==========================================================
const LESSONS = [
  // ─────────────────────────────────────────────────────────
  // LESSON 1 — ARTIKEL
  // ─────────────────────────────────────────────────────────
  {
    id: 'artikel',
    num: 1,
    title: 'Členy — Artikel',
    subtitle: 'Určité a neurčité členy. Prvý krok k rodovému systému nemčiny.',
    icon: 'fa-a',
    color: '#f59e0b',
    colorBg: 'rgba(245,158,11,0.15)',
    estimatedMinutes: 15,
    sections: [
      {
        heading: 'Čo je to člen?',
        blocks: [
          { type: 'theory', html: `
            <p>V nemčine každé podstatné meno patrí k jednému z troch <strong>rodov</strong>: mužskému (Maskulinum), ženskému (Femininum) alebo strednému (Neutrum).</p>
            <p>Člen (Artikel) je malé slovíčko pred podstatným menom, ktoré hovorí o jeho rode. V nemčine existujú <strong>dva typy členov</strong>: určitý (bestimmter Artikel) a neurčitý (unbestimmter Artikel).</p>
            <p>Člen musíš vždy vedieť — bez neho nemôžeš správne tvoriť vety, skloňovať alebo používať súvisiace zámená.</p>
          ` },
          { type: 'rule', title: 'Zlaté pravidlo', body: 'Uč sa každé podstatné meno <strong>spolu s jeho členom</strong> od samého začiatku. Nikdy sa neučíš len „Hund", vždy <strong>der Hund</strong>. Mozog si tak automaticky zapamätá rod.' },
        ]
      },
      {
        heading: 'Určité členy — Bestimmter Artikel',
        blocks: [
          { type: 'theory', html: `<p>Určitý člen zodpovedá slovenskému „ten/tá/to" alebo keď hovoríme o konkrétnej, už známej veci.</p>` },
          { type: 'table', headers: ['Rod', 'Člen', 'Príklad (DE)', 'Príklad (SK)'], rows: [
            ['Mužský rod (Maskulinum)', { text: 'der', cls: 'cell-highlight' }, 'der Mann', 'ten muž'],
            ['Ženský rod (Femininum)',  { text: 'die', cls: 'cell-highlight' }, 'die Frau', 'tá žena'],
            ['Stredný rod (Neutrum)',   { text: 'das', cls: 'cell-highlight' }, 'das Kind', 'to dieťa'],
            ['Množné číslo (Plural)',   { text: 'die', cls: 'cell-highlight' }, 'die Kinder', 'tie deti'],
          ]},
          { type: 'tip', text: 'Množné číslo má vždy člen <strong>die</strong> — bez ohľadu na rod jednotného čísla.' },
        ]
      },
      {
        heading: 'Neurčité členy — Unbestimmter Artikel',
        blocks: [
          { type: 'theory', html: `<p>Neurčitý člen zodpovedá slovenskému „jeden/jedna/jedno" — hovoríme o niečom novom, neznámom alebo nekonkrétnom.</p>` },
          { type: 'table', headers: ['Rod', 'Člen', 'Príklad (DE)', 'Príklad (SK)'], rows: [
            ['Mužský rod', { text: 'ein', cls: 'cell-highlight' }, 'ein Mann', 'jeden muž'],
            ['Ženský rod',  { text: 'eine', cls: 'cell-highlight' }, 'eine Frau', 'jedna žena'],
            ['Stredný rod', { text: 'ein', cls: 'cell-highlight' }, 'ein Kind', 'jedno dieťa'],
            ['Množné číslo', { text: '—', cls: 'cell-same' }, '— Kinder', 'deti (bez člena)'],
          ]},
          { type: 'warn', text: 'Množné číslo <strong>nemá</strong> neurčitý člen. Hovoríš jednoducho len „Kinder" (deti), nie „eine Kinder".' },
        ]
      },
      {
        heading: 'Záporný neurčitý člen — kein/keine',
        blocks: [
          { type: 'theory', html: `<p>Keď chceš povedať, že niečo <strong>nemáš</strong> alebo niečo <strong>nie je</strong> (s neurčitým členom alebo bez člena), použiješ <strong>kein/keine</strong>.</p>` },
          { type: 'table', headers: ['Rod', 'Kladná forma', 'Záporná forma', 'Príklad'], rows: [
            ['Mužský rod', 'ein Mann', { text: 'kein Mann', cls: 'cell-change' }, 'Das ist kein Mann.'],
            ['Ženský rod',  'eine Frau', { text: 'keine Frau', cls: 'cell-change' }, 'Das ist keine Frau.'],
            ['Stredný rod', 'ein Kind', { text: 'kein Kind', cls: 'cell-change' }, 'Das ist kein Kind.'],
            ['Množné číslo', '— Kinder', { text: 'keine Kinder', cls: 'cell-change' }, 'Das sind keine Kinder.'],
          ]},
        ]
      },
      {
        heading: 'Tipy na pamätanie rodu',
        blocks: [
          { type: 'info', text: '<strong>Mužský rod (der)</strong> majú väčšinou: osoby mužského pohlavia (der Mann), dni, mesiace, ročné obdobia (der Montag, der Januar, der Winter), smery svetla, auta a vlaky.' },
          { type: 'info', text: '<strong>Ženský rod (die)</strong> majú väčšinou: osoby ženského pohlavia (die Frau), čísla (die Eins, die Zwei), stromy, kvety, lodě a slovenská analógia — veľa slov zakončených na -ung, -heit, -keit, -tät, -schaft.' },
          { type: 'info', text: '<strong>Stredný rod (das)</strong> majú väčšinou: mláďatá (das Kind, das Baby), zdrobneniny (das Mädchen, das Büchlein), kovy, chemické prvky, infinitívy použité ako podstatné mená.' },
          { type: 'tip', text: 'Keď nevieš rod, tipuj <strong>der</strong> pri mužských osobách, <strong>die</strong> pri ženských a <strong>das</strong> pri neosobných veciach. Je to iba orientačné — rod sa musí naučiť!' },
        ]
      },
      {
        heading: 'Príklady vo vetách',
        blocks: [
          { type: 'examples', items: [
            { de: 'Der Hund ist groß.',          sk: 'Pes je veľký.', note: 'určitý člen, mužský rod' },
            { de: 'Die Katze schläft.',           sk: 'Mačka spí.', note: 'určitý člen, ženský rod' },
            { de: 'Das Buch ist interessant.',    sk: 'Kniha je zaujímavá.', note: 'určitý člen, stredný rod' },
            { de: 'Ich kaufe ein Auto.',          sk: 'Kupujem auto.', note: 'neurčitý člen, stredný rod' },
            { de: 'Hast du eine Schwester?',      sk: 'Máš sestru?', note: 'neurčitý člen, ženský rod' },
            { de: 'Er hat keinen Hunger.',        sk: 'On nemá hlad.', note: 'záporný člen, akuzatív' },
            { de: 'Das ist kein Problem.',        sk: 'To nie je problém.', note: 'záporný člen, neutr.' },
            { de: 'Die Kinder spielen draußen.',  sk: 'Deti sa hrajú vonku.', note: 'množné číslo — die' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 2 — PERSONALPRONOMEN
  // ─────────────────────────────────────────────────────────
  {
    id: 'pronomen',
    num: 2,
    title: 'Osobné zámená — Personalpronomen',
    subtitle: 'Ja, ty, on, ona, my... Základ každej vety.',
    icon: 'fa-user',
    color: '#3b82f6',
    colorBg: 'rgba(59,130,246,0.15)',
    estimatedMinutes: 12,
    sections: [
      {
        heading: 'Prehľad osobných zámen',
        blocks: [
          { type: 'theory', html: `
            <p>Osobné zámená nahrádzajú podstatné mená a hovorím nám o osobe alebo veci, o ktorej hovoríme. V nemčine existuje formálna forma <strong>Sie</strong> (Vy), ktorá sa vždy píše <strong>s veľkým písmenom</strong>.</p>
          `},
          { type: 'table', headers: ['Zámeno (DE)', 'Slovensky', 'Použitie / Poznámka'], rows: [
            [{ text: 'ich', cls: 'cell-de' }, 'ja', '— vždy sa píše s malým písmenom!'],
            [{ text: 'du', cls: 'cell-de' }, 'ty', 'neformálne (priateľ, rodina, dieťa)'],
            [{ text: 'er', cls: 'cell-de' }, 'on', 'mužský rod — osoba alebo mužská vec'],
            [{ text: 'sie', cls: 'cell-de' }, 'ona', 'ženský rod — osoba alebo ženská vec'],
            [{ text: 'es', cls: 'cell-de' }, 'ono / to', 'stredný rod — veci, deti, abstrakcie'],
            [{ text: 'wir', cls: 'cell-de' }, 'my', '—'],
            [{ text: 'ihr', cls: 'cell-de' }, 'vy', 'neformálne množné číslo (skupina ľudí)'],
            [{ text: 'sie', cls: 'cell-de' }, 'oni / ony', 'tretia osoba množného čísla'],
            [{ text: 'Sie', cls: 'cell-highlight' }, 'Vy (formálne)', 'vykanie — vždy veľké S! Ako zdvorilo oslovovanie cudzích ľudí'],
          ]},
          { type: 'warn', text: '<strong>sie vs. Sie:</strong> „sie" (malé s) = ona ALEBO oni. „Sie" (veľké S) = formálne Vy. Rozdiel robí veľkosť písmena a slovesná forma. Napr.: <em>sie geht</em> (ona ide) vs. <em>Sie gehen</em> (Vy idete).' },
        ]
      },
      {
        heading: 'Kedy použiť du, ihr alebo Sie?',
        blocks: [
          { type: 'table', headers: ['Situácia', 'Použiješ', 'Príklad'], rows: [
            ['priateľ, kamarát, spolužiak', { text: 'du', cls: 'cell-highlight' }, 'Du bist super!'],
            ['skupina priateľov', { text: 'ihr', cls: 'cell-highlight' }, 'Seid ihr fertig?'],
            ['cudzí človek, kolega, zákazník', { text: 'Sie', cls: 'cell-highlight' }, 'Haben Sie Zeit?'],
            ['skupina cudzích/formálnych ľudí', { text: 'Sie', cls: 'cell-highlight' }, 'Sprechen Sie Deutsch?'],
          ]},
          { type: 'tip', text: 'Na Slovensku sa tykáme oveľa ľahšie ako v Nemecku. V Nemecku <strong>vždy vykaj</strong> cudzím dospelým ľuďom, kým ti sami neponúknu tykanie — „Wir können uns duzen."' },
        ]
      },
      {
        heading: 'er / sie / es — rod zámena závisí od rodu podstatného mena',
        blocks: [
          { type: 'theory', html: `
            <p>Toto je pre Slovákov záludné! Keď nahradíš podstatné meno zámennom, zámeno musí mať <strong>rovnaký rod</strong> ako podstatné meno, nie biologický pohlavie:</p>
          `},
          { type: 'table', headers: ['Podstatné meno', 'Rod', 'Zámeno', 'Príklad'], rows: [
            ['der Tisch (stôl)', 'mužský', { text: 'er', cls: 'cell-highlight' }, '<em>Er</em> ist groß. (Stôl je veľký.)'],
            ['die Lampe (lampa)', 'ženský', { text: 'sie', cls: 'cell-highlight' }, '<em>Sie</em> ist alt. (Lampa je stará.)'],
            ['das Buch (kniha)', 'stredný', { text: 'es', cls: 'cell-highlight' }, '<em>Es</em> ist interessant. (Kniha je zaujímavá.)'],
            ['das Mädchen (dievča)', 'stredný', { text: 'es', cls: 'cell-highlight' }, '<em>Es</em> heißt Anna. (Dievča sa volá Anna.)'],
          ]},
          { type: 'warn', text: '<strong>das Mädchen</strong> (dievča) je stredného rodu — preto zámeno je <strong>es</strong>, nie sie. To platí pre všetky zdrobneniny na -chen a -lein.' }
        ]
      },
      {
        heading: 'Príklady vo vetách',
        blocks: [
          { type: 'examples', items: [
            { de: 'Ich heiße Anna.',               sk: 'Volám sa Anna.', note: 'ich — 1. os. jedn.' },
            { de: 'Du sprichst sehr gut Deutsch!', sk: 'Hovoríš veľmi dobre po nemecky!', note: 'du — 2. os. jedn.' },
            { de: 'Er kommt aus Wien.',             sk: 'On pochádza z Viedne.', note: 'er — 3. os. jedn., m.' },
            { de: 'Sie ist meine Lehrerin.',        sk: 'Ona je moja učiteľka.', note: 'sie — 3. os. jedn., f.' },
            { de: 'Es regnet heute.',               sk: 'Dnes prší.', note: 'es — neosobné použitie' },
            { de: 'Wir lernen zusammen.',           sk: 'Učíme sa spolu.', note: 'wir — 1. os. množ.' },
            { de: 'Seid ihr morgen zu Hause?',      sk: 'Budete zajtra doma?', note: 'ihr — 2. os. množ.' },
            { de: 'Sie spielen im Garten.',         sk: 'Oni sa hrajú v záhrade.', note: 'sie — 3. os. množ.' },
            { de: 'Haben Sie einen Moment?',        sk: 'Máte chvíľku? (formálne)', note: 'Sie — formálne' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 3 — SEIN
  // ─────────────────────────────────────────────────────────
  {
    id: 'sein',
    num: 3,
    title: 'Sloveso „byť" — sein',
    subtitle: 'Najpoužívanejšie sloveso v nemčine. Úplne nepravidelné — musíš sa ho naučiť.',
    icon: 'fa-star-of-life',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,0.15)',
    estimatedMinutes: 14,
    sections: [
      {
        heading: 'Prečo je sein také dôležité?',
        blocks: [
          { type: 'theory', html: `
            <p>Sloveso <strong>sein</strong> (byť) je absolútne nevyhnutné — bez neho sa nikam nedostaneš. Používa sa:</p>
            <ul style="margin: 10px 0 0 18px; line-height:2;">
              <li>na <strong>opis osôb a vecí</strong>: Ich bin müde.</li>
              <li>na <strong>predstavenie sa</strong>: Ich bin Peter. Ich bin Student.</li>
              <li>na vyjadrenie <strong>pôvodu a miesta</strong>: Ich bin aus der Slowakei. Ich bin in Berlin.</li>
              <li>ako <strong>pomocné sloveso</strong> pri tvorení perfektu niektorých slovies.</li>
            </ul>
          `},
          { type: 'warn', text: 'sein je <strong>úplne nepravidelné</strong>. Nenájdeš v ňom žiadnu logiku z iných slovies. Jedine 100% memorovanie. Opakuj si: <em>ich bin, du bist, er ist…</em>' },
        ]
      },
      {
        heading: 'Časovanie sein — prítomný čas',
        blocks: [
          { type: 'table', headers: ['Zámeno', 'sein', 'Výslovnosť (pribl.)', 'Slovensky', 'Príklad vety'], rows: [
            [{ text: 'ich', cls: 'cell-de' }, { text: 'bin', cls: 'cell-highlight' }, '[bin]', 'ja som', 'Ich bin Student.'],
            [{ text: 'du', cls: 'cell-de' }, { text: 'bist', cls: 'cell-highlight' }, '[bist]', 'ty si', 'Du bist nett.'],
            [{ text: 'er / sie / es', cls: 'cell-de' }, { text: 'ist', cls: 'cell-highlight' }, '[ist]', 'on/ona/ono je', 'Er ist müde.'],
            [{ text: 'wir', cls: 'cell-de' }, { text: 'sind', cls: 'cell-highlight' }, '[zint]', 'my sme', 'Wir sind Freunde.'],
            [{ text: 'ihr', cls: 'cell-de' }, { text: 'seid', cls: 'cell-highlight' }, '[zayt]', 'vy ste', 'Ihr seid super!'],
            [{ text: 'sie / Sie', cls: 'cell-de' }, { text: 'sind', cls: 'cell-highlight' }, '[zint]', 'oni sú / Vy ste', 'Sie sind aus Deutschland.'],
          ]},
          { type: 'tip', text: 'Pamätaj si: <strong>ich bin → du bist → er/sie/es ist</strong>. Toto sú najpoužívanejšie tri formy slovesa sein. Opakuj ich ako mantru.' },
        ]
      },
      {
        heading: 'Použitie sein — kedy ho použiť',
        blocks: [
          { type: 'table', headers: ['Kategória', 'Príklad (DE)', 'Slovensky'], rows: [
            ['Meno / identita', 'Ich bin Anna.', 'Ja som Anna.'],
            ['Povolanie', 'Sie ist Ärztin.', 'Ona je lekárka.'],
            ['Národnosť / pôvod', 'Wir sind Slowaken.', 'Sme Slováci.'],
            ['Vlastnosť / stav', 'Das Wetter ist schön.', 'Počasie je pekné.'],
            ['Miesto', 'Ich bin zu Hause.', 'Som doma.'],
            ['Vek (nie!)', '— (používa sa haben)', '— (Ich bin 25. je hovorové!)'],
          ]},
          { type: 'warn', text: 'Vek sa v štandardnej nemčine vyjadruje slovesom <strong>haben</strong> (mať): <em>Ich bin 25 Jahre alt.</em> — Tu je „sein" akceptovateľné, ale formálnejší je zápis s haben: <em>Ich habe 25 Jahre</em> je zastarané — dnes sa hovorí iba <em>Ich bin 25 (Jahre alt).</em>' },
        ]
      },
      {
        heading: 'Zápor so sein — nicht',
        blocks: [
          { type: 'theory', html: `<p>Zápor tvoríme jednoducho: za sloveso sein pridáš <strong>nicht</strong>.</p>` },
          { type: 'table', headers: ['Kladná veta', 'Záporná veta', 'Slovensky'], rows: [
            ['Ich bin müde.', { text: 'Ich bin nicht müde.', cls: 'cell-change' }, 'Nie som unavený.'],
            ['Er ist zu Hause.', { text: 'Er ist nicht zu Hause.', cls: 'cell-change' }, 'On nie je doma.'],
            ['Wir sind Freunde.', { text: 'Wir sind keine Freunde.', cls: 'cell-change' }, 'My nie sme priatelia.'],
          ]},
        ]
      },
      {
        heading: 'Príklady vo vetách',
        blocks: [
          { type: 'examples', items: [
            { de: 'Ich bin aus der Slowakei.',      sk: 'Pochádzam zo Slovenska.' },
            { de: 'Du bist sehr intelligent.',      sk: 'Si veľmi inteligentný/á.' },
            { de: 'Er ist Arzt von Beruf.',         sk: 'On je lekárom z povolania.' },
            { de: 'Sie ist 28 Jahre alt.',          sk: 'Má 28 rokov.' },
            { de: 'Es ist heute bewölkt.',          sk: 'Dnes je zamračené.' },
            { de: 'Wir sind nicht verheiratet.',    sk: 'Nie sme manželia.' },
            { de: 'Seid ihr bereit?',               sk: 'Ste pripravení?' },
            { de: 'Die Kinder sind im Garten.',     sk: 'Deti sú v záhrade.' },
            { de: 'Sind Sie Frau Müller?',          sk: 'Ste pani Müller? (formálne)' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 4 — HABEN
  // ─────────────────────────────────────────────────────────
  {
    id: 'haben',
    num: 4,
    title: 'Sloveso „mať" — haben',
    subtitle: 'Druhé najdôležitejšie sloveso. Vlastníctvo, pocity, stavba perfekta.',
    icon: 'fa-hand-holding',
    color: '#f97316',
    colorBg: 'rgba(249,115,22,0.15)',
    estimatedMinutes: 13,
    sections: [
      {
        heading: 'haben — časovanie',
        blocks: [
          { type: 'theory', html: `
            <p><strong>haben</strong> (mať) je druhé najpoužívanejšie sloveso v nemčine. Rovnako ako sein je <strong>nepravidelné</strong> a musíš ho zvládnuť spamäti.</p>
            <p>Podobne ako sein, aj haben slúži ako <strong>pomocné sloveso</strong> pri tvorbe minulého času (Perfekt) pre väčšinu slovies.</p>
          `},
          { type: 'table', headers: ['Zámeno', 'haben', 'Výslovnosť', 'Slovensky'], rows: [
            [{ text: 'ich', cls: 'cell-de' }, { text: 'habe', cls: 'cell-highlight' }, '[hábə]', 'ja mám'],
            [{ text: 'du', cls: 'cell-de' }, { text: 'hast', cls: 'cell-highlight' }, '[hast]', 'ty máš'],
            [{ text: 'er / sie / es', cls: 'cell-de' }, { text: 'hat', cls: 'cell-highlight' }, '[hat]', 'on/ona/ono má'],
            [{ text: 'wir', cls: 'cell-de' }, { text: 'haben', cls: 'cell-highlight' }, '[hábən]', 'my máme'],
            [{ text: 'ihr', cls: 'cell-de' }, { text: 'habt', cls: 'cell-highlight' }, '[hapt]', 'vy máte'],
            [{ text: 'sie / Sie', cls: 'cell-de' }, { text: 'haben', cls: 'cell-highlight' }, '[hábən]', 'oni majú / Vy máte'],
          ]},
        ]
      },
      {
        heading: 'haben — vlastníctvo a vzťahy',
        blocks: [
          { type: 'examples', items: [
            { de: 'Ich habe ein Auto.',            sk: 'Mám auto.' },
            { de: 'Hast du einen Bruder?',         sk: 'Máš brata?' },
            { de: 'Er hat drei Kinder.',           sk: 'Má tri deti.' },
            { de: 'Wir haben eine große Wohnung.', sk: 'Máme veľký byt.' },
            { de: 'Habt ihr Zeit heute?',          sk: 'Máte dnes čas?' },
          ]}
        ]
      },
      {
        heading: 'Ustálené výrazy so haben — pocity a stavy',
        blocks: [
          { type: 'theory', html: `<p>Nemčina vyjadruje mnohé pocity SLOVOM <strong>haben</strong> (mať) + podstatné meno, kým slovenčina by použila prídavné meno. Napr. „Som hladný" = doslova „Mám hlad" = <em>Ich habe Hunger</em>.</p>` },
          { type: 'table', headers: ['Nemecky', 'Doslova', 'Slovensky'], rows: [
            ['Ich habe Hunger.', 'Mám hlad.', 'Som hladný/á.'],
            ['Ich habe Durst.', 'Mám smäd.', 'Som smädný/á.'],
            ['Ich habe Angst.', 'Mám strach.', 'Bojím sa.'],
            ['Ich habe Stress.', 'Mám stres.', 'Mám stres.'],
            ['Ich habe Lust.', 'Mám chuť / záujem.', 'Chce sa mi to. / Mám náladu.'],
            ['Ich habe keine Lust.', 'Nemám chuť.', 'Nechce sa mi. / Nemám náladu.'],
            ['Ich habe Kopfschmerzen.', 'Mám bolesti hlavy.', 'Bolí ma hlava.'],
            ['Ich habe Fieber.', 'Mám horúčku.', 'Mám horúčku.'],
            ['Ich habe Recht.', 'Mám pravdu.', 'Mám pravdu.'],
            ['Ich habe Unrecht.', 'Mám nepravdu.', 'Nemám pravdu.'],
            ['Ich habe Glück.', 'Mám šťastie.', 'Mám šťastie.'],
            ['Ich habe keine Zeit.', 'Nemám čas.', 'Nemám čas.'],
          ]},
          { type: 'tip', text: 'Tieto výrazy sú veľmi bežné! Nauč sa ich spolu ako celky — <em>Hunger haben</em>, <em>Durst haben</em>, <em>Angst haben</em>… Fungujem presne ako slovenské chunky.' },
        ]
      },
      {
        heading: 'haben vs. sein — koho/čo vs. aký/kde',
        blocks: [
          { type: 'table', headers: ['haben (mať) — vlastníctvo, pocity', 'sein (byť) — opis, stav, miesto'], rows: [
            ['Ich habe einen Hund.', 'Ich bin zu Hause.'],
            ['Er hat keine Geschwister.', 'Er ist Architekt.'],
            ['Wir haben Hunger.', 'Wir sind müde.'],
            ['Sie haben Angst.', 'Sie sind in Berlin.'],
          ]},
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 5 — PRÄSENS (pravidelné slovesá)
  // ─────────────────────────────────────────────────────────
  {
    id: 'praesens',
    num: 5,
    title: 'Prítomný čas — Präsens',
    subtitle: 'Ako časovať pravidelné slovesá. Základná stavba každej vety.',
    icon: 'fa-bolt',
    color: '#f59e0b',
    colorBg: 'rgba(245,158,11,0.15)',
    estimatedMinutes: 18,
    sections: [
      {
        heading: 'Stavba prítomného času',
        blocks: [
          { type: 'theory', html: `
            <p>Prítomný čas (Präsens) sa tvorí z <strong>kmeňa slovesa</strong> + <strong>osobná koncovka</strong>.</p>
            <p><strong>Kmeň</strong> = infinitív slovesa <strong>mínus -en</strong> (niekedy -n).</p>
            <p>Príklad: <strong>machen</strong> → kmeň = <strong>mach-</strong> → mach<strong>e</strong>, mach<strong>st</strong>, mach<strong>t</strong>…</p>
          `},
          { type: 'rule', title: 'Osobné koncovky — pravidelné slovesá', body: `
            <table class="conj-table" style="width:100%">
              <thead><tr><td>Zámeno</td><td>Koncovka</td><td>machen</td><td>wohnen</td><td>arbeiten</td></tr></thead>
              <tbody>
                <tr><td class="conj-pronoun">ich</td><td class="conj-ending">-e</td><td class="conj-form">mach<span class="conj-ending">e</span></td><td class="conj-form">wohn<span class="conj-ending">e</span></td><td class="conj-form">arbeit<span class="conj-ending">e</span></td></tr>
                <tr><td class="conj-pronoun">du</td><td class="conj-ending">-st</td><td class="conj-form">mach<span class="conj-ending">st</span></td><td class="conj-form">wohn<span class="conj-ending">st</span></td><td class="conj-form">arbeit<span class="conj-ending">est</span></td></tr>
                <tr><td class="conj-pronoun">er/sie/es</td><td class="conj-ending">-t</td><td class="conj-form">mach<span class="conj-ending">t</span></td><td class="conj-form">wohn<span class="conj-ending">t</span></td><td class="conj-form">arbeit<span class="conj-ending">et</span></td></tr>
                <tr><td class="conj-pronoun">wir</td><td class="conj-ending">-en</td><td class="conj-form">mach<span class="conj-ending">en</span></td><td class="conj-form">wohn<span class="conj-ending">en</span></td><td class="conj-form">arbeit<span class="conj-ending">en</span></td></tr>
                <tr><td class="conj-pronoun">ihr</td><td class="conj-ending">-t</td><td class="conj-form">mach<span class="conj-ending">t</span></td><td class="conj-form">wohn<span class="conj-ending">t</span></td><td class="conj-form">arbeit<span class="conj-ending">et</span></td></tr>
                <tr><td class="conj-pronoun">sie/Sie</td><td class="conj-ending">-en</td><td class="conj-form">mach<span class="conj-ending">en</span></td><td class="conj-form">wohn<span class="conj-ending">en</span></td><td class="conj-form">arbeit<span class="conj-ending">en</span></td></tr>
              </tbody>
            </table>
          `},
          { type: 'tip', text: 'Slovesá na <strong>-ten / -den / -cken / -gnen</strong> dostávajú pri <em>du, er, ihr</em> navyše hlásku <strong>-e-</strong> pre ľahšiu výslovnosť: arbeit<strong>e</strong>st, arbeit<strong>e</strong>t.' },
        ]
      },
      {
        heading: 'Nepravidelné slovesá (Vokalwechsel) — zmena samohlásky',
        blocks: [
          { type: 'theory', html: `<p>Niektoré silné slovesá menia <strong>kmeňovú samohlásku</strong> pri <em>du</em> a <em>er/sie/es</em>. Poznáme 3 hlavné typy zmien:</p>` },
          { type: 'table', headers: ['Typ zmeny', 'Sloveso', 'du-forma', 'er/sie/es-forma', 'Slovensky'], rows: [
            ['e → i', 'sprechen', 'sprichst', { text: 'spricht', cls: 'cell-change' }, 'hovoriť'],
            ['e → i', 'essen', 'isst', { text: 'isst', cls: 'cell-change' }, 'jesť'],
            ['e → i', 'nehmen', 'nimmst', { text: 'nimmt', cls: 'cell-change' }, 'brať'],
            ['e → ie', 'lesen', 'liest', { text: 'liest', cls: 'cell-change' }, 'čítať'],
            ['e → ie', 'sehen', 'siehst', { text: 'sieht', cls: 'cell-change' }, 'vidieť'],
            ['a → ä', 'fahren', 'fährst', { text: 'fährt', cls: 'cell-change' }, 'cestovať (vozidlom)'],
            ['a → ä', 'schlafen', 'schläfst', { text: 'schläft', cls: 'cell-change' }, 'spať'],
            ['a → ä', 'laufen', 'läufst', { text: 'läuft', cls: 'cell-change' }, 'bežať'],
          ]},
          { type: 'warn', text: 'Zmena prebieha ONLY pri <strong>du</strong> a <strong>er/sie/es</strong>. Ostatné osoby (ich, wir, ihr, sie/Sie) sú <strong>pravidelné</strong>.' },
        ]
      },
      {
        heading: 'Dôležité A1 slovesá — kompletný zoznam',
        blocks: [
          { type: 'table', headers: ['Infinitív', 'Slovensky', 'er/sie/es', 'Príklad'], rows: [
            ['lernen', 'učiť sa', 'lernt', 'Ich lerne Deutsch.'],
            ['arbeiten', 'pracovať', 'arbeitet', 'Er arbeitet viel.'],
            ['kaufen', 'kupovať', 'kauft', 'Sie kauft Brot.'],
            ['kochen', 'variť', 'kocht', 'Wir kochen zusammen.'],
            ['trinken', 'piť', 'trinkt', 'Du trinkst Kaffee.'],
            ['spielen', 'hrať (sa)', 'spielt', 'Das Kind spielt.'],
            ['gehen', 'ísť (pešo)', 'geht', 'Wohin gehst du?'],
            ['kommen', 'prísť / prichádzať', 'kommt', 'Wann kommst du?'],
            ['wohnen', 'bývať', 'wohnt', 'Wo wohnt er?'],
            ['hören', 'počúvať', 'hört', 'Sie hört Musik.'],
            ['schreiben', 'písať', 'schreibt', 'Ich schreibe einen Brief.'],
            ['lesen', 'čítať (irr.)', 'liest', 'Er liest ein Buch.'],
            ['sprechen', 'hovoriť (irr.)', 'spricht', 'Sie spricht Spanisch.'],
            ['sehen', 'vidieť (irr.)', 'sieht', 'Er sieht gut aus.'],
            ['essen', 'jesť (irr.)', 'isst', 'Was isst du gerne?'],
            ['nehmen', 'brať (irr.)', 'nimmt', 'Ich nehme den Bus.'],
            ['fahren', 'cestovať autom/vlakom (irr.)', 'fährt', 'Sie fährt nach Berlin.'],
            ['schlafen', 'spať (irr.)', 'schläft', 'Er schläft lange.'],
            ['fragen', 'pýtať sa', 'fragt', 'Er fragt den Lehrer.'],
            ['antworten', 'odpovedať', 'antwortet', 'Sie antwortet sofort.'],
            ['suchen', 'hľadať', 'sucht', 'Er sucht seine Schlüssel.'],
            ['brauchen', 'potrebovať', 'braucht', 'Ich brauche Hilfe.'],
            ['kennen', 'poznať (osobu/miesto)', 'kennt', 'Kennst du Wien?'],
            ['wissen', 'vedieť (faktum)', 'weiß', 'Ich weiß es nicht.'],
            ['verstehen', 'rozumieť', 'versteht', 'Ich verstehe das nicht.'],
          ]},
        ]
      },
      {
        heading: 'Príklady vo vetách',
        blocks: [
          { type: 'examples', items: [
            { de: 'Ich lerne jeden Tag Deutsch.', sk: 'Každý deň sa učím nemčinu.' },
            { de: 'Er arbeitet in einem Büro.', sk: 'On pracuje v kancelárii.' },
            { de: 'Was isst du zum Frühstück?', sk: 'Čo ješ na raňajky?' },
            { de: 'Sie fährt jeden Morgen mit dem Zug.', sk: 'Každé ráno cestuje vlakom.' },
            { de: 'Wir spielen am Wochenende Fußball.', sk: 'Cez víkend hráme futbal.' },
            { de: 'Sprichst du auch Spanisch?', sk: 'Hovoríš aj španielsky?' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 6 — MODALVERBEN
  // ─────────────────────────────────────────────────────────
  {
    id: 'modalverben',
    num: 6,
    title: 'Modálne slovesá — Modalverben',
    subtitle: 'können, müssen, wollen, dürfen, sollen, möchten — vyjadrenie možnosti, povinnosti, vôle.',
    icon: 'fa-sliders',
    color: '#8b5cf6',
    colorBg: 'rgba(139,92,246,0.15)',
    estimatedMinutes: 20,
    sections: [
      {
        heading: 'Čo sú modálne slovesá?',
        blocks: [
          { type: 'theory', html: `
            <p>Modálne slovesá vyjadrujú <strong>postoj hovorcu</strong> k deju — či je niečo možné, povinné, zakázané, žiadané. Kombinujú sa vždy s <strong>infinitívom</strong> hlavného slovesa, ktoré ide na <strong>koniec vety</strong>.</p>
          `},
          { type: 'table', headers: ['Modálne sloveso', 'Slovensky', 'Použitie / Nuansa'], rows: [
            [{ text: 'können', cls: 'cell-de' }, 'môcť / vedieť / byť schopný', 'schopnosť alebo objektívna možnosť'],
            [{ text: 'müssen', cls: 'cell-de' }, 'musieť', 'vnútorná alebo vonkajšia nutnosť / povinnosť'],
            [{ text: 'wollen', cls: 'cell-de' }, 'chcieť', 'vlastná vôľa, zámer, plán'],
            [{ text: 'dürfen', cls: 'cell-de' }, 'smieť / mať dovolené', 'povolenie — niekto ti dáva právo'],
            [{ text: 'sollen', cls: 'cell-de' }, 'mať (niečo urobiť)', 'povinnosť od inej osoby, príkaz, žiadosť'],
            [{ text: 'möchten', cls: 'cell-de' }, 'chcel/a by som', 'zdvorilá žiadosť — mäkšia verzia wollen'],
          ]},
        ]
      },
      {
        heading: 'Časovanie modálnych slovies',
        blocks: [
          { type: 'rule', title: 'Dôležitá vlastnosť', body: 'Formy <strong>ich</strong> a <strong>er/sie/es</strong> sú u modálnych slovies <strong>rovnaké</strong> (bez koncovky). To je odlišné od bežných slovies!' },
          { type: 'table', headers: ['', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'möchten'], rows: [
            ['ich',      { text: 'kann', cls: 'cell-highlight' }, { text: 'muss', cls: 'cell-highlight' }, { text: 'will', cls: 'cell-highlight' }, { text: 'darf', cls: 'cell-highlight' }, { text: 'soll', cls: 'cell-highlight' }, { text: 'möchte', cls: 'cell-highlight' }],
            ['du',       'kannst', 'musst', 'willst', 'darfst', 'sollst', 'möchtest'],
            ['er/sie/es', { text: 'kann', cls: 'cell-highlight' }, { text: 'muss', cls: 'cell-highlight' }, { text: 'will', cls: 'cell-highlight' }, { text: 'darf', cls: 'cell-highlight' }, { text: 'soll', cls: 'cell-highlight' }, { text: 'möchte', cls: 'cell-highlight' }],
            ['wir',      'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'möchten'],
            ['ihr',      'könnt', 'müsst', 'wollt', 'dürft', 'sollt', 'möchtet'],
            ['sie/Sie',  'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'möchten'],
          ]},
        ]
      },
      {
        heading: 'Stavba vety s modálnym slovesom',
        blocks: [
          { type: 'rule', title: 'Pravidlo: 2. miesto + infinitív na konci', body: `
            Modálne sloveso = <strong>2. miesto</strong> vo vete (ako každé iné sloveso).<br>
            Infinitív hlavného slovesa = <strong>na úplnom konci vety</strong>.<br><br>
            Vzorec: <em>Podmet — Modálne sloveso — (zvyšok) — <strong>Infinitív</strong></em><br>
            Príklad: <em>Ich <strong>kann</strong> gut Deutsch <strong>sprechen</strong>.</em>
          `},
          { type: 'table', headers: ['Modálna veta (DE)', 'Slovensky', 'Poznámka'], rows: [
            ['Ich kann Klavier spielen.', 'Viem hrať na klavíri.', 'schopnosť'],
            ['Du musst das lernen.', 'Musíš sa to naučiť.', 'nutnosť'],
            ['Er will nach Wien fahren.', 'On chce ísť do Viedne.', 'zámer'],
            ['Darf ich hier sitzen?', 'Smiem tu sedieť?', 'povolenie — otázka'],
            ['Sie soll um 8 kommen.', 'Má prísť o 8.', 'povinnosť od iného'],
            ['Ich möchte einen Kaffee.', 'Chcel/a by som kávu.', 'zdvorilá žiadosť'],
            ['Man darf hier nicht rauchen.', 'Tu sa nesmie fajčiť.', 'zákaz — dürfen + nicht'],
          ]},
          { type: 'warn', text: '<strong>nicht dürfen</strong> = nesmieť (zákaz). <strong>nicht müssen</strong> = nemusieť (nie je nutné). Rozdiel je dôležitý! Napr.: <em>Du musst nicht kommen.</em> (Nemusíš prísť.) vs. <em>Du darfst nicht kommen.</em> (Nesmieš prísť.)' },
        ]
      },
      {
        heading: 'wollen vs. möchten — rozdiel v štýle',
        blocks: [
          { type: 'table', headers: ['wollen — priame, silné', 'möchten — zdvorilé, mäkšie'], rows: [
            ['Ich will ein Bier!', 'Ich möchte ein Bier, bitte.'],
            ['Ich will jetzt schlafen.', 'Ich möchte gerne schlafen.'],
            ['Er will das nicht machen.', 'Er möchte das lieber nicht machen.'],
          ]},
          { type: 'tip', text: 'V obchode, kaviarni alebo pri zdvorilých žiadostiach VŽDY použi <strong>möchten</strong>. „Ich will..." znie veľmi priamo a môže pôsobiť hrubо.' },
        ]
      },
      {
        heading: 'Príklady',
        blocks: [
          { type: 'examples', items: [
            { de: 'Kannst du mir helfen?', sk: 'Môžeš mi pomôcť?' },
            { de: 'Ich muss morgen früh aufstehen.', sk: 'Zajtra musím skoro vstávať.' },
            { de: 'Wir wollen im Sommer nach Deutschland fahren.', sk: 'V lete chceme ísť do Nemecka.' },
            { de: 'Darf ich kurz fragen?', sk: 'Smiem sa krátko opýtať?' },
            { de: 'Ich möchte bitte die Rechnung.', sk: 'Prosím si účet.' },
            { de: 'Du sollst nicht lügen.', sk: 'Nesmieš klamať. (desatoro)' },
            { de: 'Er kann sehr gut kochen.', sk: 'Vie veľmi dobre variť.' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 7 — VERNEINUNG
  // ─────────────────────────────────────────────────────────
  {
    id: 'verneinung',
    num: 7,
    title: 'Zápor — Verneinung',
    subtitle: 'nicht vs. kein — kedy ktoré použiť? Pravidlá polohy záporu.',
    icon: 'fa-ban',
    color: '#ef4444',
    colorBg: 'rgba(239,68,68,0.15)',
    estimatedMinutes: 16,
    sections: [
      {
        heading: 'Dve možnosti záporu',
        blocks: [
          { type: 'rule', title: 'Rýchle pravidlo', body: `
            <strong>kein/keine</strong> = záporný neurčitý člen — nahrádzaš ním <em>ein/eine</em> alebo slová bez člena.<br>
            <strong>nicht</strong> = zápora všetkého ostatného — slovesá, prídavné mená, príslovky, vety so určitým členom.
          `},
          { type: 'table', headers: ['Záporka', 'Používa sa pri', 'Príklad', 'Slovensky'], rows: [
            [{ text: 'kein', cls: 'cell-highlight' }, 'podst. meno s neurčitým členom (ein/eine)', 'Ich habe kein Auto.', 'Nemám auto.'],
            [{ text: 'keine', cls: 'cell-highlight' }, 'ženský rod neurčitý, množné číslo, nepočitateľné', 'Ich habe keine Zeit.', 'Nemám čas.'],
            [{ text: 'nicht', cls: 'cell-highlight' }, 'sloveso, prídavné meno, príslovka', 'Ich arbeite nicht.', 'Nepracujem.'],
            [{ text: 'nicht', cls: 'cell-highlight' }, 'podst. meno s určitým členom (der/die/das)', 'Ich kaufe das Buch nicht.', 'Nekupujem tú knihu.'],
          ]},
        ]
      },
      {
        heading: 'kein — skloňovanie',
        blocks: [
          { type: 'table', headers: ['Rod / Číslo', 'Kladný člen', 'kein (Nom.)', 'Príklad'], rows: [
            ['Mužský rod', 'ein Mann', { text: 'kein Mann', cls: 'cell-change' }, 'Das ist kein Mann.'],
            ['Ženský rod', 'eine Frau', { text: 'keine Frau', cls: 'cell-change' }, 'Das ist keine Frau.'],
            ['Stredný rod', 'ein Kind', { text: 'kein Kind', cls: 'cell-change' }, 'Das ist kein Kind.'],
            ['Množné číslo', '— Kinder', { text: 'keine Kinder', cls: 'cell-change' }, 'Das sind keine Kinder.'],
          ]},
          { type: 'tip', text: 'Kein sa skloňuje presne ako <strong>ein</strong> — len dostane záporku k- na začiatok. Ak vieš ein, vieš aj kein.' },
        ]
      },
      {
        heading: 'Poloha nicht vo vete',
        blocks: [
          { type: 'rule', title: 'Kde stojí nicht?', body: `
            <strong>1. Na konci jednoduchej vety</strong> (popiera celú vetu):<br>
            &nbsp;&nbsp;<em>Ich schlafe <strong>nicht</strong>.</em><br><br>
            <strong>2. Pred prídavným menom / príslovkou</strong> (popiera opis):<br>
            &nbsp;&nbsp;<em>Das ist <strong>nicht</strong> schön.</em><br><br>
            <strong>3. Pred infinitívom / príčastím</strong> (modálne sloveso, perfekt):<br>
            &nbsp;&nbsp;<em>Ich kann <strong>nicht</strong> kommen. / Er hat <strong>nicht</strong> gegessen.</em><br><br>
            <strong>4. Pred predložkovými väzbami</strong>:<br>
            &nbsp;&nbsp;<em>Ich fahre <strong>nicht</strong> mit dem Auto.</em>
          `},
          { type: 'table', headers: ['Veta', 'Poloha nicht', 'Slovensky'], rows: [
            ['Ich verstehe das nicht.', 'na konci', 'Tomu nerozumiem.'],
            ['Er ist nicht müde.', 'pred prídavným menom', 'On nie je unavený.'],
            ['Das Essen schmeckt nicht gut.', 'pred príslovkou', 'Jedlo nechutí dobre.'],
            ['Ich kann heute nicht kommen.', 'pred infinitívom', 'Dnes nemôžem prísť.'],
            ['Wir fahren nicht nach Wien.', 'pred predl. väzbou', 'Nejedeme do Viedne.'],
          ]},
        ]
      },
      {
        heading: 'Porovnanie: kein vs. nicht',
        blocks: [
          { type: 'compare-grid', items: [
            { side: 'good', title: 'KEIN — správne použitie', entries: [
              { icon: 'fa-check', color: '#10b981', text: 'Ich habe <strong>kein</strong> Geld. (neurčitý člen → kein)' },
              { icon: 'fa-check', color: '#10b981', text: 'Sie hat <strong>keine</strong> Geschwister. (ž. rod)' },
              { icon: 'fa-check', color: '#10b981', text: 'Das ist <strong>kein</strong> Problem. (neutr.)' },
            ]},
            { side: 'bad', title: 'NICHT — správne použitie', entries: [
              { icon: 'fa-check', color: '#10b981', text: 'Ich schlafe <strong>nicht</strong>. (sloveso)' },
              { icon: 'fa-check', color: '#10b981', text: 'Er ist <strong>nicht</strong> glücklich. (prídavné meno)' },
              { icon: 'fa-check', color: '#10b981', text: 'Das Buch gefällt mir <strong>nicht</strong>. (ur. člen → nicht)' },
            ]},
          ]},
          { type: 'examples', items: [
            { de: 'Ich habe kein Auto.', sk: 'Nemám auto. (bez auta)' },
            { de: 'Ich habe das Auto nicht.', sk: 'Nemám to auto. (konkrétne auto)' },
            { de: 'Sie hat keine Kinder.', sk: 'Nemá deti.' },
            { de: 'Das Wetter ist nicht schön.', sk: 'Počasie nie je pekné.' },
            { de: 'Ich mag das nicht.', sk: 'Nemám to rád/a.' },
            { de: 'Wir haben keine Zeit.', sk: 'Nemáme čas.' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 8 — FRAGEN
  // ─────────────────────────────────────────────────────────
  {
    id: 'fragen',
    num: 8,
    title: 'Otázky — Fragen',
    subtitle: 'Áno/nie otázky a W-otázky s opytovacím zámenami.',
    icon: 'fa-circle-question',
    color: '#06b6d4',
    colorBg: 'rgba(6,182,212,0.15)',
    estimatedMinutes: 15,
    sections: [
      {
        heading: 'Dva typy otázok',
        blocks: [
          { type: 'rule', title: '1. Áno/Nie otázky (Ja-/Nein-Fragen)', body: 'Sloveso je na <strong>1. mieste</strong>. Veta sa pýta, či je niečo pravdivé alebo nie. Odpoveď: Ja/Nein.' },
          { type: 'rule', title: '2. Doplňovacie otázky (W-Fragen)', body: 'Opytovacie slovo (W-Wort) je na <strong>1. mieste</strong>, sloveso na <strong>2. mieste</strong>, podmet na 3. mieste.' },
          { type: 'table', headers: ['Typ', 'Slovosled', 'Príklad'], rows: [
            ['Áno/Nie', 'Sloveso — Podmet — Zvyšok', 'Hast du einen Bruder?'],
            ['W-otázka', 'W-slovo — Sloveso — Podmet — Zvyšok', 'Wo wohnst du?'],
          ]},
        ]
      },
      {
        heading: 'Opytovacie slová — W-Wörter',
        blocks: [
          { type: 'table', headers: ['W-slovo (DE)', 'Slovensky', 'Príklad', 'Slovensky'], rows: [
            [{ text: 'Wer?', cls: 'cell-highlight' }, 'Kto?', 'Wer ist das?', 'Kto je to?'],
            [{ text: 'Was?', cls: 'cell-highlight' }, 'Čo?', 'Was machst du?', 'Čo robíš?'],
            [{ text: 'Wo?', cls: 'cell-highlight' }, 'Kde?', 'Wo wohnst du?', 'Kde bývaš?'],
            [{ text: 'Wohin?', cls: 'cell-highlight' }, 'Kam?', 'Wohin gehst du?', 'Kam ideš?'],
            [{ text: 'Woher?', cls: 'cell-highlight' }, 'Odkiaľ?', 'Woher kommst du?', 'Odkiaľ pochádzaš?'],
            [{ text: 'Wann?', cls: 'cell-highlight' }, 'Kedy?', 'Wann kommst du?', 'Kedy prídeš?'],
            [{ text: 'Warum?', cls: 'cell-highlight' }, 'Prečo?', 'Warum lernst du Deutsch?', 'Prečo sa učíš nemčinu?'],
            [{ text: 'Wie?', cls: 'cell-highlight' }, 'Ako?', 'Wie heißt du?', 'Ako sa voláš?'],
            [{ text: 'Wie viel?', cls: 'cell-highlight' }, 'Koľko? (nepočitateľné)', 'Wie viel kostet das?', 'Koľko to stojí?'],
            [{ text: 'Wie viele?', cls: 'cell-highlight' }, 'Koľko? (počitateľné)', 'Wie viele Kinder hast du?', 'Koľko máš detí?'],
            [{ text: 'Welche(r/s)?', cls: 'cell-highlight' }, 'Ktorý/á/é?', 'Welches Buch nimmst du?', 'Ktorú knihu bereš?'],
            [{ text: 'Wessen?', cls: 'cell-highlight' }, 'Čí? / Koho? (genitív)', 'Wessen Tasche ist das?', 'Čia je to taška?'],
            [{ text: 'Wie lange?', cls: 'cell-highlight' }, 'Ako dlho?', 'Wie lange dauert das?', 'Ako dlho to trvá?'],
            [{ text: 'Wie oft?', cls: 'cell-highlight' }, 'Ako často?', 'Wie oft lernst du?', 'Ako často sa učíš?'],
          ]},
        ]
      },
      {
        heading: 'Wie + prídavné meno — kombinované W-otázky',
        blocks: [
          { type: 'table', headers: ['Výraz', 'Slovenskú otázku', 'Príklad'], rows: [
            ['Wie alt?', 'Ako starý? / Koľko rokov?', 'Wie alt bist du?'],
            ['Wie groß?', 'Aký vysoký?', 'Wie groß bist du?'],
            ['Wie weit?', 'Ako ďaleko?', 'Wie weit ist Berlin?'],
            ['Wie spät?', 'Koľko je hodín?', 'Wie spät ist es?'],
            ['Wie heißt?', 'Ako sa volá?', 'Wie heißt das auf Deutsch?'],
          ]},
        ]
      },
      {
        heading: 'Príklady',
        blocks: [
          { type: 'examples', items: [
            { de: 'Sprichst du Deutsch?', sk: 'Hovoríš po nemecky?' },
            { de: 'Haben Sie Kinder?', sk: 'Máte deti? (formálne)' },
            { de: 'Wer kommt heute Abend?', sk: 'Kto dnes večer príde?' },
            { de: 'Was isst du zum Mittagessen?', sk: 'Čo ješ na obed?' },
            { de: 'Wie lange lernst du schon Deutsch?', sk: 'Ako dlho sa už učíš nemčinu?' },
            { de: 'Warum bist du so müde?', sk: 'Prečo si taký unavený?' },
            { de: 'Welchen Beruf hast du?', sk: 'Aké povolanie máš?' },
            { de: 'Wohin fährt dieser Zug?', sk: 'Kam ide tento vlak?' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 9 — SATZSTELLUNG
  // ─────────────────────────────────────────────────────────
  {
    id: 'satzstellung',
    num: 9,
    title: 'Slovosled — Satzstellung',
    subtitle: 'Zlaté pravidlo nemčiny: sloveso vždy na 2. mieste. Inverzia a rámec.',
    icon: 'fa-arrow-right-arrow-left',
    color: '#f59e0b',
    colorBg: 'rgba(245,158,11,0.15)',
    estimatedMinutes: 17,
    sections: [
      {
        heading: 'Základné pravidlo — V2 (Verb-Zweit)',
        blocks: [
          { type: 'rule', title: '🥇 Zlaté pravidlo nemčiny', body: 'V nemeckej oznamovacej vete je <strong>určité sloveso VŽDY na 2. mieste</strong>. Toto platí bez výnimky pre jednoduché oznamovacie vety. Toto pravidlo sa nazýva <em>V2-Stellung</em>.' },
          { type: 'breakdown', title: 'Normálny slovosled', parts: [
            { word: 'Ich', label: 'Podmět (1. miesto)', type: '1' },
            { word: 'lerne', label: 'Sloveso (2. miesto)', type: '2' },
            { word: 'jeden Tag', label: 'Kedy', type: '3' },
            { word: 'Deutsch', label: 'Čo', type: 'end' },
          ]},
          { type: 'tip', text: 'Ak si nie si istý/á slovosledom, polož si otázku: <strong>kde je sloveso?</strong> Ak nie je na 2. mieste, veta je nesprávna.' },
        ]
      },
      {
        heading: 'Inverzia — keď začneš vetu inak ako podmetom',
        blocks: [
          { type: 'theory', html: `
            <p>Ak začneš vetu <strong>časovým alebo miestnym výrazom</strong> (alebo čímkoľvek iným ako podmetom), podmět a sloveso sa vymenia — toto sa nazýva <strong>inverzia</strong>. Sloveso zostáva na 2. mieste!</p>
          `},
          { type: 'table', headers: ['1. miesto (téma)', '2. miesto (sloveso)', '3. miesto (podmět)', 'Zvyšok'], rows: [
            [{ text: 'Ich', cls: 'cell-same' }, 'lerne', '—', 'jeden Tag Deutsch.'],
            [{ text: 'Heute', cls: 'cell-highlight' }, 'lerne', 'ich', 'Deutsch.'],
            [{ text: 'Im Sommer', cls: 'cell-highlight' }, 'fahren', 'wir', 'nach Wien.'],
            [{ text: 'Morgen früh', cls: 'cell-highlight' }, 'kommt', 'er', 'an.'],
            [{ text: 'Auf dem Tisch', cls: 'cell-highlight' }, 'liegt', '—', 'das Buch.'],
          ]},
          { type: 'warn', text: 'Keď začneš vetu čímkoľvek iným ako podmetom, podmět <strong>musí ísť hneď za sloveso</strong> (na 3. miesto). Nikdy dva prvky pred sloveso!' },
        ]
      },
      {
        heading: 'Slovosled v rôznych typoch viet',
        blocks: [
          { type: 'table', headers: ['Typ vety', 'Sloveso na', 'Príklad'], rows: [
            ['Oznam, normálny', '2. mieste', 'Ich gehe heute ins Kino.'],
            ['Oznam, s inverziou', '2. mieste (za výrazom)', 'Heute gehe ich ins Kino.'],
            ['Otázka Áno/Nie', '1. mieste', 'Gehst du heute ins Kino?'],
            ['W-otázka', '2. mieste (za W-словom)', 'Wann gehst du ins Kino?'],
            ['Modálna veta', '2. mieste + inf. na konci', 'Ich will heute ins Kino gehen.'],
          ]},
        ]
      },
      {
        heading: 'Doplnky vo vete — poradie (TeKaMoLo)',
        blocks: [
          { type: 'rule', title: 'TeKaMoLo — poradie doplnkov', body: `
            Ak vo vete máš viac doplnkov, poradie je:<br>
            <strong>Te</strong>mporal (kedy?) → <strong>Ka</strong>usal (prečo?) → <strong>Mo</strong>dal (ako?) → <strong>Lo</strong>kal (kde?)<br><br>
            Príklad: Ich fahre <em>morgen</em> (Te) <em>wegen der Arbeit</em> (Ka) <em>mit dem Zug</em> (Mo) <em>nach Berlin</em> (Lo).
          `},
          { type: 'tip', text: 'Netreba teKaMoLo vedieť naspamäť pre A1, ale pomáha ako kontrola. Pre každodenné vety znie väčšinou dobre inštinktívne poradie.' },
        ]
      },
      {
        heading: 'Príklady — inverzia',
        blocks: [
          { type: 'examples', items: [
            { de: 'Ich trinke morgens Kaffee.', sk: 'Ráno pijem kávu.', note: 'normálny slovosled' },
            { de: 'Morgens trinke ich Kaffee.', sk: 'Ráno pijem kávu.', note: 'inverzia — dôraz na ráno' },
            { de: 'Er fährt jeden Tag mit dem Bus.', sk: 'On každý deň jazdí autobusom.' },
            { de: 'Jeden Tag fährt er mit dem Bus.', sk: 'Každý deň jazdí autobusom.', note: 'inverzia' },
            { de: 'In Deutschland spricht man Deutsch.', sk: 'V Nemecku sa hovorí po nemecky.' },
            { de: 'Leider kann ich heute nicht kommen.', sk: 'Žiaľ, dnes nemôžem prísť.', note: 'modálna + inverzia' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 10 — KASUS
  // ─────────────────────────────────────────────────────────
  {
    id: 'kasus',
    num: 10,
    title: 'Pády — Kasus',
    subtitle: 'Nominatív, Akuzatív, Datív — zmeny členov a zámen.',
    icon: 'fa-table-columns',
    color: '#f97316',
    colorBg: 'rgba(249,115,22,0.15)',
    estimatedMinutes: 22,
    sections: [
      {
        heading: 'Čo sú pády?',
        blocks: [
          { type: 'theory', html: `
            <p>Pády (Kasus) určujú <strong>rolu podstatného mena vo vete</strong>. V nemčine máme 4 pády. Pre A1 sú najdôležitejšie <strong>Nominatív</strong> a <strong>Akuzatív</strong>. Datív sa objavuje v základných predložkových väzbách.</p>
          `},
          { type: 'table', headers: ['Pád', 'Otázka', 'Funkcia vo vete', 'Príklad'], rows: [
            [{ text: 'Nominatív', cls: 'cell-highlight' }, 'Kto? / Čo? (konáteľ)', 'Podmět — kto koná', 'Der Mann liest.'],
            [{ text: 'Akuzatív', cls: 'cell-highlight' }, 'Koho? / Čo? (priamy predmet)', 'Priamy predmet', 'Ich sehe den Mann.'],
            [{ text: 'Datív', cls: 'cell-highlight' }, 'Komu? / Čomu?', 'Nepriamy predmet, niekt. predložky', 'Ich gebe dem Mann Geld.'],
            [{ text: 'Genitív', cls: 'cell-same' }, 'Čí? / Koho?', 'Vlastníctvo (A1 — len pasívne)', 'Das Auto des Mannes.'],
          ]},
        ]
      },
      {
        heading: 'Zmeny členov podľa pádu',
        blocks: [
          { type: 'table', headers: ['Rod / Číslo', 'Nominatív', 'Akuzatív', 'Datív'], rows: [
            ['Mužský rod (der)', { text: 'der / ein / kein', cls: 'cell-highlight' }, { text: 'den / einen / keinen ⚠️', cls: 'cell-change' }, { text: 'dem / einem / keinem', cls: 'cell-highlight' }],
            ['Ženský rod (die)', 'die / eine / keine', { text: 'die / eine / keine', cls: 'cell-same' }, { text: 'der / einer / keiner', cls: 'cell-highlight' }],
            ['Stredný rod (das)', 'das / ein / kein', { text: 'das / ein / kein', cls: 'cell-same' }, { text: 'dem / einem / keinem', cls: 'cell-highlight' }],
            ['Množné číslo', 'die', { text: 'die', cls: 'cell-same' }, { text: 'den (+n)', cls: 'cell-highlight' }],
          ]},
          { type: 'warn', text: 'V <strong>akuzatíve</strong> sa mení iba <strong>mužský rod</strong>: der → <strong>den</strong>, ein → <strong>einen</strong>, kein → <strong>keinen</strong>. Ostatné rody zostávajú rovnaké ako v nominatíve.' },
        ]
      },
      {
        heading: 'Osobné zámená v pádoch',
        blocks: [
          { type: 'table', headers: ['Nominatív', 'Akuzatív', 'Datív', 'Slovenský nominatív'], rows: [
            ['ich', { text: 'mich', cls: 'cell-highlight' }, { text: 'mir', cls: 'cell-highlight' }, 'ja'],
            ['du', { text: 'dich', cls: 'cell-highlight' }, { text: 'dir', cls: 'cell-highlight' }, 'ty'],
            ['er', { text: 'ihn', cls: 'cell-highlight' }, { text: 'ihm', cls: 'cell-highlight' }, 'on'],
            ['sie', { text: 'sie', cls: 'cell-same' }, { text: 'ihr', cls: 'cell-highlight' }, 'ona'],
            ['es', { text: 'es', cls: 'cell-same' }, { text: 'ihm', cls: 'cell-highlight' }, 'ono'],
            ['wir', { text: 'uns', cls: 'cell-highlight' }, { text: 'uns', cls: 'cell-highlight' }, 'my'],
            ['ihr', { text: 'euch', cls: 'cell-highlight' }, { text: 'euch', cls: 'cell-highlight' }, 'vy'],
            ['sie/Sie', { text: 'sie/Sie', cls: 'cell-same' }, { text: 'ihnen/Ihnen', cls: 'cell-highlight' }, 'oni/Vy'],
          ]},
        ]
      },
      {
        heading: 'Slovesá, ktoré vyžadujú akuzatív',
        blocks: [
          { type: 'table', headers: ['Sloveso', 'Slovensky', 'Príklad s akuzatívom'], rows: [
            ['haben', 'mať', 'Ich habe einen Bruder.'],
            ['sehen', 'vidieť', 'Ich sehe den Film.'],
            ['kaufen', 'kupovať', 'Sie kauft einen Rock.'],
            ['brauchen', 'potrebovať', 'Er braucht einen Arzt.'],
            ['nehmen', 'brať', 'Ich nehme den Bus.'],
            ['hören', 'počúvať', 'Wir hören eine Musik.'],
            ['kennen', 'poznať', 'Kennst du einen guten Arzt?'],
            ['lieben', 'milovať', 'Er liebt die Natur.'],
          ]},
          { type: 'examples', items: [
            { de: 'Ich sehe den Mann.', sk: 'Vidím toho muža.', note: 'der Mann → den Mann (akuz.)' },
            { de: 'Sie kauft einen Apfel.', sk: 'Kupuje jablko.', note: 'ein Apfel → einen Apfel' },
            { de: 'Er liebt die Musik.', sk: 'On miluje hudbu.', note: 'die Musik → die Musik (ž.r. — bez zmeny)' },
            { de: 'Ich kenne ihn gut.', sk: 'Dobre ho poznám.', note: 'er → ihn (akuzatívne zámeno)' },
            { de: 'Kannst du mir helfen?', sk: 'Môžeš mi pomôcť?', note: 'ich → mir (datívne zámeno)' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 11 — ZAHLEN
  // ─────────────────────────────────────────────────────────
  {
    id: 'zahlen',
    num: 11,
    title: 'Číslovky — Zahlen',
    subtitle: 'Čísla 0–1000, porové číslovky, hodiny, dátumy.',
    icon: 'fa-hashtag',
    color: '#3b82f6',
    colorBg: 'rgba(59,130,246,0.15)',
    estimatedMinutes: 18,
    sections: [
      {
        heading: 'Základné čísla 0–20',
        blocks: [
          { type: 'table', headers: ['Číslo', 'Nemecky', 'Výslovnosť (pribl.)', 'Poznámka'], rows: [
            ['0', { text: 'null', cls: 'cell-de' }, '[nul]', '—'],
            ['1', { text: 'eins', cls: 'cell-de' }, '[ains]', 'Sam = eins, pred podst. menom = ein/eine'],
            ['2', { text: 'zwei', cls: 'cell-de' }, '[cvai]', '—'],
            ['3', { text: 'drei', cls: 'cell-de' }, '[drai]', '—'],
            ['4', { text: 'vier', cls: 'cell-de' }, '[fír]', '—'],
            ['5', { text: 'fünf', cls: 'cell-de' }, '[fünf]', 'ü = zaokrúhlené u, jazyk na i, pery na ü'],
            ['6', { text: 'sechs', cls: 'cell-de' }, '[zechs]', '—'],
            ['7', { text: 'sieben', cls: 'cell-de' }, '[zíbn]', '—'],
            ['8', { text: 'acht', cls: 'cell-de' }, '[acht]', '—'],
            ['9', { text: 'neun', cls: 'cell-de' }, '[nojn]', '—'],
            ['10', { text: 'zehn', cls: 'cell-de' }, '[cén]', '—'],
            ['11', { text: 'elf', cls: 'cell-de' }, '[elf]', '—'],
            ['12', { text: 'zwölf', cls: 'cell-de' }, '[cvölf]', 'ö = zaokrúhlené e'],
            ['13', { text: 'dreizehn', cls: 'cell-de' }, '[draiccén]', '—'],
            ['14', { text: 'vierzehn', cls: 'cell-de' }, '[fírccén]', '—'],
            ['15', { text: 'fünfzehn', cls: 'cell-de' }, '[fünfccén]', '—'],
            ['16', { text: 'sechzehn', cls: 'cell-de' }, '[zechccén]', '—'],
            ['17', { text: 'siebzehn', cls: 'cell-de' }, '[zípccén]', '—'],
            ['18', { text: 'achtzehn', cls: 'cell-de' }, '[achtccén]', '—'],
            ['19', { text: 'neunzehn', cls: 'cell-de' }, '[nojnccén]', '—'],
            ['20', { text: 'zwanzig', cls: 'cell-de' }, '[cvantsich]', '—'],
          ]},
        ]
      },
      {
        heading: 'Čísla 21–100',
        blocks: [
          { type: 'rule', title: 'Stavba čísel 21–99', body: `V nemčine sa čísla od 21 tvoria inak ako v slovenčine: <strong>jednotky + und + desiatky</strong>. Doslova: „jedena dvadsať".<br><br>einundzwanzig = 21 (ein + und + zwanzig)<br>siebenunddreißig = 37 (sieben + und + dreißig)` },
          { type: 'table', headers: ['Číslo', 'Nemecky', 'Stavba'], rows: [
            ['21', 'einundzwanzig', 'ein+und+zwanzig'],
            ['30', 'dreißig', '— (pozor: dreißig, nie dreizig!)'],
            ['35', 'fünfunddreißig', 'fünf+und+dreißig'],
            ['40', 'vierzig', '—'],
            ['50', 'fünfzig', '—'],
            ['60', 'sechzig', '—'],
            ['70', 'siebzig', '— (nie siebenzig!)'],
            ['80', 'achtzig', '—'],
            ['90', 'neunzig', '—'],
            ['100', { text: 'hundert', cls: 'cell-highlight' }, '—'],
          ]},
        ]
      },
      {
        heading: 'Hodiny — Uhrzeit',
        blocks: [
          { type: 'table', headers: ['Čas', 'Formálne (24h)', 'Neformálne'], rows: [
            ['8:00', 'Es ist acht Uhr.', 'Es ist acht.'],
            ['8:15', 'Es ist acht Uhr fünfzehn.', 'Es ist Viertel nach acht.'],
            ['8:30', 'Es ist acht Uhr dreißig.', 'Es ist halb neun. (pol deviatej!)'],
            ['8:45', 'Es ist acht Uhr fünfundvierzig.', 'Es ist Viertel vor neun.'],
            ['12:00', 'Es ist zwölf Uhr.', 'Es ist Mittag / Mitternacht.'],
            ['20:30', 'Es ist zwanzig Uhr dreißig.', 'Es ist halb neun (abends).'],
          ]},
          { type: 'warn', text: '<strong>„halb neun"</strong> v nemčine = <strong>pol deviatej</strong> (8:30), NIE pol ôsmej! „Halb" sa vždy vzťahuje na nasledujúcu hodinu.' },
        ]
      },
      {
        heading: 'Radové číslovky — Ordinalzahlen',
        blocks: [
          { type: 'table', headers: ['Číslo', 'Radová číslovka', 'Slovensky'], rows: [
            ['1.', { text: 'erst-', cls: 'cell-highlight' }, 'prvý/á/é (nepravidelné!)'],
            ['2.', { text: 'zweit-', cls: 'cell-highlight' }, 'druhý'],
            ['3.', { text: 'dritt-', cls: 'cell-highlight' }, 'tretí (nepravidelné!)'],
            ['4.', 'viert-', 'štvrtý'],
            ['5.–19.', '-t-', 'Základné číslo + -t- + koncovka: fünft-'],
            ['20.+', '-st-', 'Základné číslo + -st-: zwanzigst-'],
          ]},
          { type: 'tip', text: 'Dátum: <em>Heute ist der <strong>erste März.</strong></em> — Člen sa vždy používa. Pri písaní: <em>1. März</em> = 1. marca.' },
          { type: 'examples', items: [
            { de: 'Ich bin dreiundzwanzig Jahre alt.', sk: 'Mám dvadsaťtri rokov.' },
            { de: 'Das kostet neunzehn Euro neunzig.', sk: 'To stojí devätnásť eur deväťdesiat.' },
            { de: 'Wie spät ist es? — Es ist Viertel nach drei.', sk: 'Koľko je hodín? — Je štvrť hodiny po tretej.' },
            { de: 'Mein Geburtstag ist am fünften Juli.', sk: 'Mám narodeniny piateho júla.' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 12 — ADJEKTIVE
  // ─────────────────────────────────────────────────────────
  {
    id: 'adjektive',
    num: 12,
    title: 'Prídavné mená — Adjektive',
    subtitle: 'Základné vlastnosti, farby, porovnávanie. Prídavné meno za sein.',
    icon: 'fa-palette',
    color: '#ec4899',
    colorBg: 'rgba(236,72,153,0.15)',
    estimatedMinutes: 16,
    sections: [
      {
        heading: 'Dve polohy prídavného mena',
        blocks: [
          { type: 'rule', title: 'Prediktívna poloha (za sein) — bez koncovky', body: 'Ak je prídavné meno ZA slovom sein/werden, <strong>nemení sa</strong> — žiadna koncovka.<br>Príklady: Das Buch ist <strong>interessant</strong>. Der Mann ist <strong>groß</strong>.' },
          { type: 'rule', title: 'Atributívna poloha (pred podst. menom) — s koncovkou', body: 'Ak je prídavné meno PRED podstatným menom, dostáva <strong>koncovku</strong> podľa rodu, pádu a člena. Pre A1 stačí poznať základné vzory.<br>Príklady: ein <strong>interessantes</strong> Buch, ein <strong>großer</strong> Mann.' },
          { type: 'tip', text: 'Pre A1 sa sústreď hlavne na <strong>predikatívne použitie</strong> (za sein). Atributívne skloňovanie je témou A2.' },
        ]
      },
      {
        heading: 'Základné prídavné mená — protiklady',
        blocks: [
          { type: 'table', headers: ['Nemecky', 'Slovensky', 'Opak (DE)', 'Opak (SK)'], rows: [
            [{ text: 'groß', cls: 'cell-de' }, 'veľký / vysoký', 'klein', 'malý / nízky'],
            [{ text: 'alt', cls: 'cell-de' }, 'starý', 'jung / neu', 'mladý / nový'],
            [{ text: 'gut', cls: 'cell-de' }, 'dobrý', 'schlecht', 'zlý'],
            [{ text: 'schön', cls: 'cell-de' }, 'pekný / krásny', 'hässlich', 'škaredý'],
            [{ text: 'schnell', cls: 'cell-de' }, 'rýchly', 'langsam', 'pomalý'],
            [{ text: 'teuer', cls: 'cell-de' }, 'drahý', 'billig / günstig', 'lacný / výhodný'],
            [{ text: 'leicht', cls: 'cell-de' }, 'ľahký (hmotnosť / obtiažnosť)', 'schwer', 'ťažký'],
            [{ text: 'warm', cls: 'cell-de' }, 'teplý', 'kalt', 'studený / chladný'],
            [{ text: 'laut', cls: 'cell-de' }, 'hlasný', 'leise', 'tichý'],
            [{ text: 'richtig', cls: 'cell-de' }, 'správny', 'falsch', 'nesprávny / krivý'],
            [{ text: 'einfach', cls: 'cell-de' }, 'jednoduchý', 'schwierig / kompliziert', 'ťažký / zložitý'],
            [{ text: 'interessant', cls: 'cell-de' }, 'zaujímavý', 'langweilig', 'nudný'],
            [{ text: 'müde', cls: 'cell-de' }, 'unavený', 'ausgeruht', 'oddýchnutý'],
            [{ text: 'krank', cls: 'cell-de' }, 'chorý', 'gesund', 'zdravý'],
            [{ text: 'sauber', cls: 'cell-de' }, 'čistý', 'schmutzig', 'špinavý'],
            [{ text: 'glücklich', cls: 'cell-de' }, 'šťastný', 'traurig / unglücklich', 'smutný / nešťastný'],
            [{ text: 'stark', cls: 'cell-de' }, 'silný', 'schwach', 'slabý'],
            [{ text: 'modern', cls: 'cell-de' }, 'moderný', 'altmodisch', 'staromódny'],
          ]},
        ]
      },
      {
        heading: 'Farby — Farben',
        blocks: [
          { type: 'table', headers: ['Nemecky', 'Slovensky', 'Príklad'], rows: [
            ['rot', 'červená', 'Das Auto ist rot.'],
            ['blau', 'modrá', 'Der Himmel ist blau.'],
            ['grün', 'zelená', 'Das Gras ist grün.'],
            ['gelb', 'žltá', 'Die Sonne ist gelb.'],
            ['orange', 'oranžová', 'Die Orange ist orange.'],
            ['schwarz', 'čierna', 'Die Nacht ist schwarz.'],
            ['weiß', 'biela', 'Der Schnee ist weiß.'],
            ['grau', 'sivá', 'Der Himmel ist grau.'],
            ['braun', 'hnedá', 'Der Kaffee ist braun.'],
            ['rosa / pink', 'ružová', 'Das Kleid ist rosa.'],
            ['lila / violett', 'fialová', 'Die Blume ist lila.'],
          ]},
        ]
      },
      {
        heading: 'Porovnávanie prídavných mien',
        blocks: [
          { type: 'table', headers: ['Stupeň', 'Tvorba', 'gut (dobrý)', 'groß (veľký)'], rows: [
            ['Základný (Positiv)', 'základ', 'gut', 'groß'],
            ['Porovnávací (Komparativ)', 'základ + -er', { text: 'besser (nepravid.)', cls: 'cell-change' }, 'größer (+ prehláska)'],
            ['Naverhovací (Superlativ)', 'am + základ + -sten', { text: 'am besten (nepravid.)', cls: 'cell-change' }, 'am größten'],
          ]},
          { type: 'table', headers: ['Adj.', 'Komparativ', 'Superlativ'], rows: [
            ['gut', { text: 'besser', cls: 'cell-change' }, 'am besten'],
            ['viel', { text: 'mehr', cls: 'cell-change' }, 'am meisten'],
            ['gern', { text: 'lieber', cls: 'cell-change' }, 'am liebsten'],
            ['schnell', 'schneller', 'am schnellsten'],
            ['groß', 'größer', 'am größten'],
            ['alt', 'älter', 'am ältesten'],
          ]},
          { type: 'examples', items: [
            { de: 'Das Auto ist schneller als der Bus.', sk: 'Auto je rýchlejšie ako autobus.' },
            { de: 'Er ist größer als ich.', sk: 'On je vyšší ako ja.' },
            { de: 'Das ist das beste Restaurant hier.', sk: 'To je tu najlepšia reštaurácia.' },
            { de: 'Ich mag Kaffee lieber als Tee.', sk: 'Mám radšej kávu ako čaj.' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 13 — PRAEPOSITIONEN
  // ─────────────────────────────────────────────────────────
  {
    id: 'praepositionen',
    num: 13,
    title: 'Predložky — Präpositionen',
    subtitle: 'Predložky s akuzatívom, datívom a dvojité predložky.',
    icon: 'fa-arrows-to-dot',
    color: '#06b6d4',
    colorBg: 'rgba(6,182,212,0.15)',
    estimatedMinutes: 20,
    sections: [
      {
        heading: 'Predložky s akuzatívom',
        blocks: [
          { type: 'rule', title: 'Pamätaj sa: durch, für, gegen, ohne, um, bis, entlang', body: 'Tieto predložky <strong>vždy</strong> vyžadujú akuzatív. Skratka: <strong>DFGOUEB</strong> (durch, für, gegen, ohne, um, entlang, bis)' },
          { type: 'table', headers: ['Predložka', 'Slovensky', 'Príklad (DE)', 'Slovensky'], rows: [
            [{ text: 'durch', cls: 'cell-highlight' }, 'cez, skrz', 'Wir gehen durch den Park.', 'Ideme cez park.'],
            [{ text: 'für', cls: 'cell-highlight' }, 'pre, za', 'Das ist für dich.', 'To je pre teba.'],
            [{ text: 'gegen', cls: 'cell-highlight' }, 'proti, okolo (čas)', 'Gegen 10 Uhr.', 'Okolo 10 hodín.'],
            [{ text: 'ohne', cls: 'cell-highlight' }, 'bez', 'Ohne Zucker, bitte.', 'Bez cukru, prosím.'],
            [{ text: 'um', cls: 'cell-highlight' }, 'okolo (miesto), o (čas)', 'Um 8 Uhr. / Um den Tisch.', 'O 8 hodín. / Okolo stola.'],
            [{ text: 'bis', cls: 'cell-highlight' }, 'do (termín)', 'Bis nächste Woche.', 'Do budúceho týždňa.'],
          ]},
        ]
      },
      {
        heading: 'Predložky s datívom',
        blocks: [
          { type: 'rule', title: 'Pamätaj sa: aus, bei, mit, nach, seit, von, zu, gegenüber', body: 'Skratka: <strong>ABMMSNVZG</strong> — aus, bei, mit, nach, seit, von, zu, gegenüber' },
          { type: 'table', headers: ['Predložka', 'Slovensky', 'Príklad (DE)', 'Slovensky'], rows: [
            [{ text: 'aus', cls: 'cell-highlight' }, 'z (pôvod, materiál)', 'Ich komme aus der Slowakei.', 'Pochádzam zo Slovenska.'],
            [{ text: 'bei', cls: 'cell-highlight' }, 'pri, u, v (miesto)', 'Ich bin bei meiner Freundin.', 'Som u svojej priateľky.'],
            [{ text: 'mit', cls: 'cell-highlight' }, 's (kým/čím)', 'Ich fahre mit dem Zug.', 'Cestujem vlakom.'],
            [{ text: 'nach', cls: 'cell-highlight' }, 'do (mesto/krajina bez člena), po', 'Ich fahre nach Wien.', 'Cestujem do Viedne.'],
            [{ text: 'seit', cls: 'cell-highlight' }, 'od (trvanie do teraz)', 'Seit einem Jahr lerne ich Deutsch.', 'Učím sa nemčinu rok.'],
            [{ text: 'von', cls: 'cell-highlight' }, 'od, o', 'Ein Buch von Goethe.', 'Goethova kniha.'],
            [{ text: 'zu', cls: 'cell-highlight' }, 'k, do (osoby/miesta)', 'Ich gehe zum Arzt.', 'Idem k lekárovi.'],
            [{ text: 'gegenüber', cls: 'cell-highlight' }, 'naproti', 'Das Café liegt dem Bahnhof gegenüber.', 'Kaviareň leží naproti stanici.'],
          ]},
        ]
      },
      {
        heading: 'Skrátené tvary predložiek',
        blocks: [
          { type: 'table', headers: ['Dlhý tvar', 'Skrátený tvar', 'Príklad'], rows: [
            ['zu dem', { text: 'zum', cls: 'cell-highlight' }, 'Ich gehe zum Supermarkt.'],
            ['zu der', { text: 'zur', cls: 'cell-highlight' }, 'Ich gehe zur Schule.'],
            ['bei dem', { text: 'beim', cls: 'cell-highlight' }, 'Ich bin beim Arzt.'],
            ['von dem', { text: 'vom', cls: 'cell-highlight' }, 'Er kommt vom Markt.'],
            ['in dem', { text: 'im', cls: 'cell-highlight' }, 'Ich bin im Büro.'],
            ['in das', { text: 'ins', cls: 'cell-highlight' }, 'Ich gehe ins Kino.'],
            ['an dem', { text: 'am', cls: 'cell-highlight' }, 'Ich bin am Bahnhof.'],
            ['an das', { text: 'ans', cls: 'cell-highlight' }, 'Ans Meer fahren.'],
          ]},
          { type: 'tip', text:'Skrátené tvary sú veľmi bežné v hovorovej nemčine a musíš ich ovládať — nikto nehovorí „zu dem Bahnhof", vždy „zum Bahnhof".' },
        ]
      },
      {
        heading: 'Dvojité predložky — miesto a pohyb',
        blocks: [
          { type: 'theory', html: `<p>Predložky <strong>in, an, auf, unter, über, neben, vor, hinter, zwischen</strong> sa viažu s <strong>datívom</strong> (kde? — poloha) ALEBO s <strong>akuzatívom</strong> (kam? — pohyb/smer).</p>` },
          { type: 'table', headers: ['Otázka', 'Pád', 'Predložka', 'Príklad'], rows: [
            ['Wo? (kde?)', 'Datív', 'Das Buch liegt auf dem Tisch.', 'Kniha leží na stole.'],
            ['Wohin? (kam?)', 'Akuzatív', 'Ich lege das Buch auf den Tisch.', 'Kladiem knihu na stôl.'],
            ['Wo?', 'Datív', 'Er ist in der Schule.', 'Je v škole.'],
            ['Wohin?', 'Akuzatív', 'Er geht in die Schule.', 'Ide do školy.'],
          ]},
          { type: 'examples', items: [
            { de: 'Ich fahre mit dem Zug nach Wien.', sk: 'Cestujem vlakom do Viedne.' },
            { de: 'Das Geschenk ist für meinen Vater.', sk: 'Darček je pre môjho otca.' },
            { de: 'Ich wohne seit drei Jahren in Deutschland.', sk: 'Bývam v Nemecku tri roky.' },
            { de: 'Gehen wir zum Bahnhof!', sk: 'Poďme na stanicu!' },
            { de: 'Das Café ist dem Hotel gegenüber.', sk: 'Kaviareň je naproti hotelu.' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 14 — PERFEKT
  // ─────────────────────────────────────────────────────────
  {
    id: 'perfekt',
    num: 14,
    title: 'Minulý čas — Perfekt',
    subtitle: 'Hovorový minulý čas. haben/sein + Partizip II.',
    icon: 'fa-clock-rotate-left',
    color: '#8b5cf6',
    colorBg: 'rgba(139,92,246,0.15)',
    estimatedMinutes: 22,
    sections: [
      {
        heading: 'Čo je Perfekt?',
        blocks: [
          { type: 'theory', html: `
            <p>Perfekt je <strong>hovorový minulý čas</strong> — používa sa v každodennej reči, rozhovoroch, e-mailoch. Zodpovedá nášmu „urobil som", „jedol som", „išiel som".</p>
            <p>Stavba: <strong>Pomocné sloveso (haben alebo sein)</strong> na 2. mieste + <strong>Partizip II</strong> na konci vety.</p>
          `},
          { type: 'breakdown', title: 'Stavba Perfektu', parts: [
            { word: 'Ich', label: 'Podmět', type: '1' },
            { word: 'habe', label: 'haben / sein (2. miesto)', type: '2' },
            { word: 'gestern Abend', label: 'kedy', type: '3' },
            { word: 'gegessen.', label: 'Partizip II (koniec)', type: 'end' },
          ]},
        ]
      },
      {
        heading: 'Partizip II — tvorenie',
        blocks: [
          { type: 'rule', title: 'Pravidelné slovesá: ge- + kmeň + -t', body: `
            machen → ge<strong>mach</strong>t<br>
            lernen → ge<strong>lern</strong>t<br>
            kaufen → ge<strong>kauf</strong>t<br>
            spielen → ge<strong>spiel</strong>t<br>
            arbeiten → ge<strong>arbeit</strong>et (kmeň na -t: vkladá sa -e-)
          `},
          { type: 'rule', title: 'Nepravidelné slovesá: ge- + zmenený kmeň + -en', body: `
            schreiben → ge<strong>schrieb</strong>en<br>
            sprechen → ge<strong>sproch</strong>en<br>
            essen → ge<strong>gess</strong>en<br>
            fahren → ge<strong>fahr</strong>en<br>
            kommen → ge<strong>komm</strong>en<br>
            sehen → ge<strong>seh</strong>en
          `},
          { type: 'warn', text: 'Slovesá na <strong>-ieren</strong> (telefonieren, studieren) <strong>nemajú ge-</strong>: telefoniert, studiert. Rovnako predponové slovesá (besuchen → besucht, verstehen → verstanden).' },
        ]
      },
      {
        heading: 'haben alebo sein — ktoré pomocné sloveso?',
        blocks: [
          { type: 'rule', title: 'sein sa používa pri:', body: `
            <strong>1. Pohybových slovesách</strong> (pohyb z A do B): gehen, fahren, fliegen, kommen, laufen…<br>
            <strong>2. Slovesách zmeny stavu</strong>: aufwachen (zobudiť sa), einschlafen (zaspať), sterben (zomrieť), werden (stať sa)…<br>
            <strong>3. Špeciálne: sein, bleiben, passieren</strong>
          `},
          { type: 'rule', title: 'haben sa používa pri:', body: 'Všetkých ostatných slovesách — najmä prechodných (majú predmet): kaufen, essen, trinken, machen, sehen, hören, lernen…' },
          { type: 'table', headers: ['Sloveso', 'Pomocné', 'Partizip II', 'Príklad'], rows: [
            ['machen', { text: 'haben', cls: 'cell-highlight' }, 'gemacht', 'Ich habe das gemacht.'],
            ['kaufen', { text: 'haben', cls: 'cell-highlight' }, 'gekauft', 'Wir haben Brot gekauft.'],
            ['essen', { text: 'haben', cls: 'cell-highlight' }, 'gegessen', 'Er hat Pizza gegessen.'],
            ['gehen', { text: 'sein', cls: 'cell-change' }, 'gegangen', 'Ich bin spazieren gegangen.'],
            ['fahren', { text: 'sein', cls: 'cell-change' }, 'gefahren', 'Sie ist nach Berlin gefahren.'],
            ['kommen', { text: 'sein', cls: 'cell-change' }, 'gekommen', 'Er ist spät gekommen.'],
            ['bleiben', { text: 'sein', cls: 'cell-change' }, 'geblieben', 'Wir sind zu Hause geblieben.'],
          ]},
        ]
      },
      {
        heading: 'Najdôležitejšie Partizip II — nepravidelné slovesá',
        blocks: [
          { type: 'table', headers: ['Infinitív', 'Partizip II', 'Aux.', 'Príklad'], rows: [
            ['sein (byť)', { text: 'gewesen', cls: 'cell-change' }, 'sein', 'Ich bin in Wien gewesen.'],
            ['haben (mať)', { text: 'gehabt', cls: 'cell-highlight' }, 'haben', 'Ich habe Zeit gehabt.'],
            ['kommen', { text: 'gekommen', cls: 'cell-change' }, 'sein', 'Er ist nicht gekommen.'],
            ['gehen', { text: 'gegangen', cls: 'cell-change' }, 'sein', 'Ich bin heim gegangen.'],
            ['fahren', { text: 'gefahren', cls: 'cell-change' }, 'sein', 'Wir sind gefahren.'],
            ['essen', { text: 'gegessen', cls: 'cell-change' }, 'haben', 'Was hast du gegessen?'],
            ['trinken', { text: 'getrunken', cls: 'cell-change' }, 'haben', 'Ich habe Wasser getrunken.'],
            ['schlafen', { text: 'geschlafen', cls: 'cell-change' }, 'haben', 'Er hat gut geschlafen.'],
            ['sehen', { text: 'gesehen', cls: 'cell-change' }, 'haben', 'Hast du den Film gesehen?'],
            ['sprechen', { text: 'gesprochen', cls: 'cell-change' }, 'haben', 'Wir haben gesprochen.'],
            ['schreiben', { text: 'geschrieben', cls: 'cell-change' }, 'haben', 'Ich habe einen Brief geschrieben.'],
            ['finden', { text: 'gefunden', cls: 'cell-change' }, 'haben', 'Ich habe es gefunden.'],
            ['lesen', { text: 'gelesen', cls: 'cell-change' }, 'haben', 'Er hat das Buch gelesen.'],
          ]},
          { type: 'examples', items: [
            { de: 'Ich habe heute viel gelernt.', sk: 'Dnes som sa veľa naučil/a.' },
            { de: 'Wir sind gestern ins Kino gegangen.', sk: 'Včera sme šli do kina.' },
            { de: 'Hast du das schon gemacht?', sk: 'Už si to urobil/a?' },
            { de: 'Sie ist nach Wien gefahren.', sk: 'Odišla do Viedne.' },
            { de: 'Was habt ihr am Wochenende gemacht?', sk: 'Čo ste robili cez víkend?' },
            { de: 'Er hat mir nicht geantwortet.', sk: 'On mi neodpovedal.' },
          ]}
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // LESSON 15 — NOMINATIV DEKLINATION
  // ─────────────────────────────────────────────────────────
  {
    id: 'nominativ_deklination',
    num: 15,
    title: 'Adjektíva — Skloňovanie v nominatíve',
    subtitle: 'Koncovky prídavných mien, ak stoja priamo pred podstatným menom v prvom páde.',
    icon: 'fa-tags',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,0.15)',
    estimatedMinutes: 25,
    exercisesId: 'nominativ_deklination',
    sections: [
      {
        heading: 'Kedy sa prídavné meno skloňuje?',
        blocks: [
          { type: 'theory', html: `
            <p>Ak prídavné meno (Adjektiv) stojí sami za slovesom <em>sein</em> (byť), <strong>nedostáva žiadnu koncovku</strong>. Zostáva v základnom tvare.<br>
            Napr.: Der Hund ist <strong>klein</strong>. Die Katze ist <strong>klein</strong>.</p>
            <p>Akonáhle však prídavné meno stojí <strong>priamo pred podstatným menom</strong> (v úlohe prívlastku), <strong>musí dostať koncovku</strong> podľa rodu a použitého člena.</p>
          `},
          { type: 'examples', items: [
            { de: 'Der Mann ist alt.', sk: 'Muž je starý. (bez koncovky)' },
            { de: 'Der alte Mann schläft.', sk: 'Ten starý muž spí. (skloňované -e)' },
          ]}
        ]
      },
      {
        heading: '1. Po určitom člene (der, die, das, die)',
        blocks: [
          { type: 'theory', html: `
            <p>Určitý člen už obsahuje jasný signál o rode (r, e, s). Preto prídavné mená po <strong>der, die, das</strong> v jednotnom čísle dostávajú iba neutrálnu koncovku <strong>-e</strong>. Vo všetkých padoch množného čísla vždy <strong>-en</strong>.</p>
          `},
          { type: 'table', headers: ['Rod', 'Určitý člen', 'Príd. meno', 'Podst. meno', 'Príklad'], rows: [
            ['Mužský (M)', 'der', { text: '-e', cls: 'cell-highlight' }, 'Hund', 'der gut<strong>e</strong> Hund'],
            ['Ženský (F)', 'die', { text: '-e', cls: 'cell-highlight' }, 'Frau', 'die schön<strong>e</strong> Frau'],
            ['Stredný (N)', 'das', { text: '-e', cls: 'cell-highlight' }, 'Kind', 'das klein<strong>e</strong> Kind'],
            ['Množný (Pl)', 'die', { text: '-en', cls: 'cell-change' }, 'Leute', 'die nett<strong>en</strong> Leute'],
          ]}
        ]
      },
      {
        heading: '2. Po neurčitom člene (ein) a privlastňovacích (mein, kein)',
        blocks: [
          { type: 'theory', html: `
            <p>Neurčité členy <em>ein, ein</em> neukazujú rod. Aby bolo jasné, že ide o maskulinum alebo neutrum, musí túto prácu urobiť prídavné meno. Prevezme koncovku podobnú určitému členu (der -> er, das -> es). V ženskom a množnom čísle ide podľa starých pravidiel.</p>
          `},
          { type: 'table', headers: ['Rod', 'Neurčitý člen', 'Príd. meno', 'Podst. meno', 'Príklad'], rows: [
            ['Mužský (M)', 'ein / kein', { text: '-er', cls: 'cell-highlight' }, 'Hund', 'ein gut<strong>er</strong> Hund'],
            ['Ženský (F)', 'eine / keine', { text: '-e', cls: 'cell-highlight' }, 'Frau', 'eine schön<strong>e</strong> Frau'],
            ['Stredný (N)', 'ein / kein', { text: '-es', cls: 'cell-highlight' }, 'Kind', 'ein klein<strong>es</strong> Kind'],
            ['Množný (Pl) *', '— (žiadny)', { text: '-e', cls: 'cell-change' }, 'Leute', 'nett<strong>e</strong> Leute'],
          ]},
          { type: 'warn', text: '<strong>* Pozor na množné číslo:</strong> Neurčitý člen "ein" v množnom čísle <strong>neexistuje</strong>, preto podstatné meno stojí bez člena a prídavné meno má v nominatíve koncovku <strong>-e</strong> (nette Leute). <br><br>Ak však použijeme <strong>keine</strong> (žiadne) alebo privlastňovacie zámená (meine, deine...), prídavné meno v množnom čísle dostane koncovku <strong>-en</strong> (keine nett<strong>en</strong> Leute, meine nett<strong>en</strong> Leute).' }
        ]
      },
      {
        heading: '3. Bez člena (Nullartikel)',
        blocks: [
          { type: 'theory', html: `
            <p>Ak pred podstatným menom nie je žiadny člen (napr. pri nepočitateľných látkach alebo v množnom čísle), prídavné meno na seba berie plnú zodpovednosť ukázať rod. Dostane presne takú istú koncovku, ako by mal určitý člen (der -> -er, die -> -e, das -> -es).</p>
          `},
          { type: 'table', headers: ['Rod', 'Člen (ukazovateľ)', 'Koncovka', 'Príklad', 'Znamená'], rows: [
            ['Mužský (M)', '(d)er', { text: '-er', cls: 'cell-highlight' }, 'kalt<strong>er</strong> Kaffee', 'studená káva'],
            ['Ženský (F)', '(di)e', { text: '-e', cls: 'cell-highlight' }, 'frisch<strong>e</strong> Milch', 'čerstvé mlieko'],
            ['Stredný (N)', '(da)s', { text: '-es', cls: 'cell-highlight' }, 'warm<strong>es</strong> Wasser', 'teplá voda'],
            ['Množný (Pl)', '(di)e', { text: '-e', cls: 'cell-highlight' }, 'neu<strong>e</strong> Schuhe', 'nové topánky'],
          ]}
        ]
      },
      {
        heading: 'Zhrnutie a príklady na porovnanie',
        blocks: [
          { type: 'compare-grid', items: [
            { side: 'good', title: 'Mužský rod (Tisch)', entries: [
              { icon: 'fa-check', color: '#10b981', text: '<strong>der</strong> rund<strong>e</strong> Tisch' },
              { icon: 'fa-check', color: '#10b981', text: '<strong>ein</strong> rund<strong>er</strong> Tisch' },
              { icon: 'fa-check', color: '#10b981', text: 'rund<strong>er</strong> Tisch' },
            ]},
            { side: 'good', title: 'Stredný rod (Bett)', entries: [
              { icon: 'fa-check', color: '#10b981', text: '<strong>das</strong> alt<strong>e</strong> Bett' },
              { icon: 'fa-check', color: '#10b981', text: '<strong>ein</strong> alt<strong>es</strong> Bett' },
              { icon: 'fa-check', color: '#10b981', text: 'alt<strong>es</strong> Bett' },
            ]},
          ]}
        ]
      }
    ]
  }
];
