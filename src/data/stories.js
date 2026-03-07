/**
 * STORIES — Readle-štýl príbehy pre A1 nemčinu
 * Jana Nováková, Bratislava → Viedeň — kontinuita s kurzom
 * word.type: 'noun' | 'verb' | 'preposition' | 'adverb' | 'adjective' | 'other'
 */

export const STORIES = [
    {
        id: 'story_01',
        title: 'Der erste Tag',
        titleSk: 'Prvý deň',
        cefr: 'A1',
        lessonRange: [1, 5],
        description: 'Jana prichádza do Viedne. Prvý deň v novej práci.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        sentences: [
            { de: 'Jana Nováková kommt aus der Slowakei.', sk: 'Jana Nováková pochádza zo Slovenska.' },
            { de: 'Sie ist 28 Jahre alt.', sk: 'Má 28 rokov.' },
            { de: 'Heute ist ihr erster Tag in Wien.', sk: 'Dnes je jej prvý deň vo Viedni.' },
            { de: 'Jana arbeitet in einer Firma.', sk: 'Jana pracuje vo firme.' },
            { de: 'Das Büro ist groß und modern.', sk: 'Kancelária je veľká a moderná.' },
            { de: 'Jana geht zur Rezeption.', sk: 'Jana ide k recepcii.' },
            { de: 'Die Rezeptionistin fragt: „Wie heißen Sie?"', sk: 'Recepčná sa pýta: „Ako sa voláte?"' },
            { de: 'Jana antwortet: „Ich heiße Jana Nováková."', sk: 'Jana odpovedá: „Volám sa Jana Nováková."' },
            { de: 'Die Rezeptionistin lächelt und sagt: „Herzlich willkommen!"', sk: 'Recepčná sa usmeje a hovorí: „Srdečne vítajte!"' },
            { de: 'Janas Kollegin heißt Maria.', sk: 'Janina kolegyňa sa volá Maria.' },
            { de: 'Maria ist sehr nett und hilfsbereit.', sk: 'Maria je veľmi milá a ochotná.' },
            { de: 'Sie zeigt Jana das Büro.', sk: 'Ukáže Jane kanceláriu.' },
            { de: 'Das Büro hat viele Fenster.', sk: 'Kancelária má veľa okien.' },
            { de: 'Jana sagt: „Das Büro ist sehr schön!"', sk: 'Jana hovorí: „Kancelária je veľmi pekná!"' },
            { de: 'Maria sagt: „Wien ist eine tolle Stadt!"', sk: 'Maria hovorí: „Viedeň je skvelé mesto!"' },
            { de: 'Jana ist glücklich. Der erste Tag beginnt gut.', sk: 'Jana je šťastná. Prvý deň začína dobre.' },
        ],
        words: {
            'kommt': {
                type: 'verb', sk: 'prichádza', infinitiv: 'kommen',
                conjugation: { ich: 'komme', du: 'kommst', 'er/sie/es': 'kommt', wir: 'kommen', ihr: 'kommt', sie: 'kommen' },
                example: 'Jana kommt aus der Slowakei.',
                exampleSk: 'Jana pochádza zo Slovenska.',
            },
            'aus': {
                type: 'preposition', sk: 'z / zo',
                governs: ['Dativ'],
                note: 'aus riadi VŽDY Datív — pôvod alebo materiál.',
                examples: [
                    { de: 'Ich komme aus der Slowakei.', sk: 'Pochádzam zo Slovenska.' },
                    { de: 'Das Glas ist aus Glas.', sk: 'Pohár je zo skla.' },
                ],
            },
            'Slowakei': {
                type: 'noun', sk: 'Slovensko', article: 'die', plural: '—',
                cases: { Nominativ: 'die Slowakei', Akkusativ: 'die Slowakei', Dativ: 'der Slowakei', Genitiv: 'der Slowakei' },
                example: 'Jana kommt aus der Slowakei.',
                exampleSk: 'Jana pochádza zo Slovenska.',
            },
            'heißen': {
                type: 'verb', sk: 'volať sa', infinitiv: 'heißen',
                conjugation: { ich: 'heiße', du: 'heißt', 'er/sie/es': 'heißt', wir: 'heißen', ihr: 'heißt', sie: 'heißen' },
                example: 'Wie heißen Sie?',
                exampleSk: 'Ako sa voláte?',
            },
            'heißt': {
                type: 'verb', sk: 'volá sa', infinitiv: 'heißen',
                conjugation: { ich: 'heiße', du: 'heißt', 'er/sie/es': 'heißt', wir: 'heißen', ihr: 'heißt', sie: 'heißen' },
                example: 'Janas Kollegin heißt Maria.',
                exampleSk: 'Janina kolegyňa sa volá Maria.',
            },
            'alt': {
                type: 'adjective', sk: 'starý / stará',
                comparison: { Positiv: 'alt', Komparativ: 'älter', Superlativ: 'am ältesten' },
                example: 'Sie ist 28 Jahre alt.',
                exampleSk: 'Má 28 rokov.',
            },
            'arbeitet': {
                type: 'verb', sk: 'pracuje', infinitiv: 'arbeiten',
                conjugation: { ich: 'arbeite', du: 'arbeitest', 'er/sie/es': 'arbeitet', wir: 'arbeiten', ihr: 'arbeitet', sie: 'arbeiten' },
                example: 'Jana arbeitet in einer Firma.',
                exampleSk: 'Jana pracuje vo firme.',
            },
            'in': {
                type: 'preposition', sk: 'v / vo / do',
                governs: ['Dativ (kde?)', 'Akkusativ (kam?)'],
                note: 'in + Datív = kde? (miesto). in + Akkusatív = kam? (pohyb).',
                examples: [
                    { de: 'Jana arbeitet in Wien. (Dat)', sk: 'Jana pracuje vo Viedni.' },
                    { de: 'Jana fährt in die Stadt. (Akk)', sk: 'Jana ide do mesta.' },
                ],
            },
            'Büro': {
                type: 'noun', sk: 'kancelária', article: 'das', plural: 'die Büros',
                cases: { Nominativ: 'das Büro', Akkusativ: 'das Büro', Dativ: 'dem Büro', Genitiv: 'des Büros' },
                example: 'Das Büro ist groß und modern.',
                exampleSk: 'Kancelária je veľká a moderná.',
            },
            'groß': {
                type: 'adjective', sk: 'veľký / veľká',
                comparison: { Positiv: 'groß', Komparativ: 'größer', Superlativ: 'am größten' },
                example: 'Das Büro ist groß.',
                exampleSk: 'Kancelária je veľká.',
            },
            'Kollegin': {
                type: 'noun', sk: 'kolegyňa', article: 'die', plural: 'die Kolleginnen',
                cases: { Nominativ: 'die Kollegin', Akkusativ: 'die Kollegin', Dativ: 'der Kollegin', Genitiv: 'der Kollegin' },
                example: 'Janas Kollegin heißt Maria.',
                exampleSk: 'Janina kolegyňa sa volá Maria.',
            },
            'nett': {
                type: 'adjective', sk: 'milý / milá',
                comparison: { Positiv: 'nett', Komparativ: 'netter', Superlativ: 'am nettesten' },
                example: 'Maria ist sehr nett.',
                exampleSk: 'Maria je veľmi milá.',
            },
            'sehr': {
                type: 'adverb', sk: 'veľmi',
                comparison: null,
                example: 'Maria ist sehr nett.',
                exampleSk: 'Maria je veľmi milá.',
            },
            'zeigt': {
                type: 'verb', sk: 'ukazuje', infinitiv: 'zeigen',
                conjugation: { ich: 'zeige', du: 'zeigst', 'er/sie/es': 'zeigt', wir: 'zeigen', ihr: 'zeigt', sie: 'zeigen' },
                example: 'Sie zeigt Jana das Büro.',
                exampleSk: 'Ukáže Jane kanceláriu.',
            },
            'glücklich': {
                type: 'adjective', sk: 'šťastný / šťastná',
                comparison: { Positiv: 'glücklich', Komparativ: 'glücklicher', Superlativ: 'am glücklichsten' },
                example: 'Jana ist glücklich.',
                exampleSk: 'Jana je šťastná.',
            },
            'beginnt': {
                type: 'verb', sk: 'začína', infinitiv: 'beginnen',
                conjugation: { ich: 'beginne', du: 'beginnst', 'er/sie/es': 'beginnt', wir: 'beginnen', ihr: 'beginnt', sie: 'beginnen' },
                example: 'Der erste Tag beginnt gut.',
                exampleSk: 'Prvý deň začína dobre.',
            },
        },
        quiz: [
            { question: 'Woher kommt Jana?', options: ['Aus Deutschland', 'Aus Österreich', 'Aus der Slowakei', 'Aus Ungarn'], answer: 2, explanation: '„Jana Nováková kommt aus der Slowakei."' },
            { question: 'Wie alt ist Jana?', options: ['25 Jahre', '28 Jahre', '30 Jahre', '32 Jahre'], answer: 1, explanation: '„Sie ist 28 Jahre alt."' },
            { question: 'Wie heißt Janas Kollegin?', options: ['Anna', 'Petra', 'Maria', 'Lisa'], answer: 2, explanation: '„Janas Kollegin heißt Maria."' },
            { question: 'Was sagt die Rezeptionistin zur Begrüßung?', options: ['„Auf Wiedersehen!"', '„Wie geht es Ihnen?"', '„Herzlich willkommen!"', '„Ich verstehe nicht."'], answer: 2, explanation: '„Die Rezeptionistin sagt: Herzlich willkommen!"' },
            { question: 'Wie findet Jana das Büro?', options: ['Klein und alt', 'Laut und ungemütlich', 'Groß und modern', 'Klein und modern'], answer: 2, explanation: '„Das Büro ist groß und modern."' },
        ],
    },

    {
        id: 'story_02',
        title: 'Die Familie',
        titleSk: 'Rodina',
        cefr: 'A1',
        lessonRange: [6, 10],
        description: 'Jana rozpráva o svojej rodine v Bratislave.',
        image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
        sentences: [
            { de: 'Jana denkt oft an ihre Familie in Bratislava.', sk: 'Jana často myslí na svoju rodinu v Bratislave.' },
            { de: 'Sie hat einen Vater, eine Mutter und einen Bruder.', sk: 'Má otca, matku a jedného brata.' },
            { de: 'Ihr Vater heißt Peter. Er ist 55 Jahre alt.', sk: 'Jej otec sa volá Peter. Má 55 rokov.' },
            { de: 'Er arbeitet als Ingenieur in Bratislava.', sk: 'Pracuje ako inžinier v Bratislave.' },
            { de: 'Ihre Mutter heißt Eva. Sie ist Lehrerin.', sk: 'Jej mama sa volá Eva. Je učiteľka.' },
            { de: 'Eva kocht sehr gut. Jana vermisst ihr Essen.', sk: 'Eva varí veľmi dobre. Jana jej jedlo chýba.' },
            { de: 'Janas Bruder heißt Tomáš. Er ist 24 Jahre alt.', sk: 'Janin brat sa volá Tomáš. Má 24 rokov.' },
            { de: 'Tomáš studiert Informatik an der Universität.', sk: 'Tomáš študuje informatiku na univerzite.' },
            { de: 'Die Familie ist sehr eng zusammen.', sk: 'Rodina je veľmi spätá.' },
            { de: 'Jana telefoniert jeden Abend mit ihrer Mutter.', sk: 'Jana každý večer telefonuje so svojou mamou.' },
            { de: 'Am Wochenende fährt sie manchmal nach Bratislava.', sk: 'Cez víkend niekedy jazdí do Bratislavy.' },
            { de: 'Die Fahrt mit dem Zug dauert zwei Stunden.', sk: 'Cesta vlakom trvá dve hodiny.' },
            { de: 'Jana sagt: „Meine Familie ist das Wichtigste für mich."', sk: 'Jana hovorí: „Moja rodina je pre mňa to najdôležitejšie."' },
            { de: 'Ihre Eltern sind sehr stolz auf Jana.', sk: 'Jej rodičia sú na Janu veľmi hrdí.' },
            { de: 'Sie kommen bald nach Wien zu Besuch.', sk: 'Čoskoro prídu do Viedne na návštevu.' },
        ],
        words: {
            'denkt': {
                type: 'verb', sk: 'myslí', infinitiv: 'denken',
                conjugation: { ich: 'denke', du: 'denkst', 'er/sie/es': 'denkt', wir: 'denken', ihr: 'denkt', sie: 'denken' },
                example: 'Jana denkt oft an ihre Familie.',
                exampleSk: 'Jana často myslí na svoju rodinu.',
            },
            'oft': {
                type: 'adverb', sk: 'často',
                comparison: { Positiv: 'oft', Komparativ: 'öfter', Superlativ: 'am häufigsten' },
                example: 'Jana denkt oft an ihre Familie.',
                exampleSk: 'Jana často myslí na svoju rodinu.',
            },
            'hat': {
                type: 'verb', sk: 'má', infinitiv: 'haben',
                conjugation: { ich: 'habe', du: 'hast', 'er/sie/es': 'hat', wir: 'haben', ihr: 'habt', sie: 'haben' },
                example: 'Jana hat einen Vater und eine Mutter.',
                exampleSk: 'Jana má otca a matku.',
            },
            'Vater': {
                type: 'noun', sk: 'otec', article: 'der', plural: 'die Väter',
                cases: { Nominativ: 'der Vater', Akkusativ: 'den Vater', Dativ: 'dem Vater', Genitiv: 'des Vaters' },
                example: 'Ihr Vater heißt Peter.',
                exampleSk: 'Jej otec sa volá Peter.',
            },
            'Mutter': {
                type: 'noun', sk: 'mama / matka', article: 'die', plural: 'die Mütter',
                cases: { Nominativ: 'die Mutter', Akkusativ: 'die Mutter', Dativ: 'der Mutter', Genitiv: 'der Mutter' },
                example: 'Ihre Mutter heißt Eva.',
                exampleSk: 'Jej mama sa volá Eva.',
            },
            'Bruder': {
                type: 'noun', sk: 'brat', article: 'der', plural: 'die Brüder',
                cases: { Nominativ: 'der Bruder', Akkusativ: 'den Bruder', Dativ: 'dem Bruder', Genitiv: 'des Bruders' },
                example: 'Janas Bruder heißt Tomáš.',
                exampleSk: 'Janin brat sa volá Tomáš.',
            },
            'kocht': {
                type: 'verb', sk: 'varí', infinitiv: 'kochen',
                conjugation: { ich: 'koche', du: 'kochst', 'er/sie/es': 'kocht', wir: 'kochen', ihr: 'kocht', sie: 'kochen' },
                example: 'Eva kocht sehr gut.',
                exampleSk: 'Eva varí veľmi dobre.',
            },
            'studiert': {
                type: 'verb', sk: 'študuje', infinitiv: 'studieren',
                conjugation: { ich: 'studiere', du: 'studierst', 'er/sie/es': 'studiert', wir: 'studieren', ihr: 'studiert', sie: 'studieren' },
                example: 'Tomáš studiert Informatik.',
                exampleSk: 'Tomáš študuje informatiku.',
            },
            'telefoniert': {
                type: 'verb', sk: 'telefonuje', infinitiv: 'telefonieren',
                conjugation: { ich: 'telefoniere', du: 'telefonierst', 'er/sie/es': 'telefoniert', wir: 'telefonieren', ihr: 'telefoniert', sie: 'telefonieren' },
                example: 'Jana telefoniert jeden Abend mit ihrer Mutter.',
                exampleSk: 'Jana každý večer telefonuje so svojou mamou.',
            },
            'manchmal': {
                type: 'adverb', sk: 'niekedy',
                comparison: null,
                example: 'Am Wochenende fährt sie manchmal nach Bratislava.',
                exampleSk: 'Cez víkend niekedy jazdí do Bratislavy.',
            },
            'stolz': {
                type: 'adjective', sk: 'hrdý / hrdá',
                comparison: { Positiv: 'stolz', Komparativ: 'stolzer', Superlativ: 'am stolzesten' },
                example: 'Ihre Eltern sind sehr stolz auf Jana.',
                exampleSk: 'Jej rodičia sú na Janu veľmi hrdí.',
            },
            'Eltern': {
                type: 'noun', sk: 'rodičia (len množné číslo)', article: 'die', plural: 'die Eltern',
                cases: { Nominativ: 'die Eltern', Akkusativ: 'die Eltern', Dativ: 'den Eltern', Genitiv: 'der Eltern' },
                example: 'Ihre Eltern sind sehr stolz auf Jana.',
                exampleSk: 'Jej rodičia sú na Janu veľmi hrdí.',
            },
        },
        quiz: [
            { question: 'Wie heißt Janas Bruder?', options: ['Peter', 'Tomáš', 'Martin', 'Roman'], answer: 1, explanation: '„Janas Bruder heißt Tomáš."' },
            { question: 'Was studiert Tomáš?', options: ['Medizin', 'Jura', 'Informatik', 'Wirtschaft'], answer: 2, explanation: '„Tomáš studiert Informatik an der Universität."' },
            { question: 'Wie oft telefoniert Jana mit ihrer Mutter?', options: ['Jeden Morgen', 'Jede Woche', 'Jeden Abend', 'Jeden Monat'], answer: 2, explanation: '„Jana telefoniert jeden Abend mit ihrer Mutter."' },
            { question: 'Wie lange dauert die Fahrt nach Bratislava?', options: ['Eine Stunde', 'Zwei Stunden', 'Drei Stunden', 'Vier Stunden'], answer: 1, explanation: '„Die Fahrt mit dem Zug dauert zwei Stunden."' },
        ],
    },

    {
        id: 'story_03',
        title: 'Ein Tag in Wien',
        titleSk: 'Deň vo Viedni',
        cefr: 'A1',
        lessonRange: [11, 20],
        description: 'Jana opisuje svoju každodennú rutinu vo Viedni.',
        image: 'https://images.unsplash.com/photo-1516550135131-fe3dcb58b697?w=800&q=80',
        sentences: [
            { de: 'Jana steht jeden Morgen um 7 Uhr auf.', sk: 'Jana každé ráno vstáva o 7 hodín.' },
            { de: 'Zuerst macht sie Kaffee und frühstückt.', sk: 'Najprv si uvarí kávu a raňajkuje.' },
            { de: 'Sie isst ein Brot mit Käse und trinkt Orangensaft.', sk: 'Zje chlieb so syrom a vypije pomarančový džús.' },
            { de: 'Dann zieht sie sich an und geht aus dem Haus.', sk: 'Potom sa oblečie a vyjde z domu.' },
            { de: 'Sie geht zur U-Bahn-Station. Das dauert fünf Minuten.', sk: 'Ide na stanicu metra. To trvá päť minút.' },
            { de: 'Mit der U-Bahn fährt sie ins Zentrum.', sk: 'Metrom ide do centra.' },
            { de: 'Das Büro ist in der Innenstadt, nicht weit vom Ring.', sk: 'Kancelária je v centre, neďaleko od Ringu.' },
            { de: 'Jana arbeitet von 9 bis 17 Uhr.', sk: 'Jana pracuje od 9 do 17 hodín.' },
            { de: 'In der Mittagspause geht sie mit Maria in ein Café.', sk: 'V obedňajšej prestávke ide s Mariou do kaviarne.' },
            { de: 'Sie trinken Kaffee und essen ein Sandwich.', sk: 'Pijú kávu a jedia sendvič.' },
            { de: 'Nach der Arbeit geht Jana einkaufen.', sk: 'Po práci Jana ide nakupovať.' },
            { de: 'Der Supermarkt ist um die Ecke von ihrer Wohnung.', sk: 'Supermarket je za rohom od jej bytu.' },
            { de: 'Sie kauft Gemüse, Brot und manchmal Fleisch.', sk: 'Kúpi zeleninu, chlieb a niekedy mäso.' },
            { de: 'Abends kocht Jana oft selbst.', sk: 'Večer Jana často varí sama.' },
            { de: 'Sie hört dabei Musik oder schaut fern.', sk: 'Pritom počúva hudbu alebo pozerá televíziu.' },
            { de: 'Um 22 Uhr geht Jana schlafen. Der Tag war gut.', sk: 'O 22 hodín Jana ide spať. Deň bol dobrý.' },
        ],
        words: {
            'steht auf': {
                type: 'verb', sk: 'vstáva', infinitiv: 'aufstehen',
                conjugation: { ich: 'stehe auf', du: 'stehst auf', 'er/sie/es': 'steht auf', wir: 'stehen auf', ihr: 'steht auf', sie: 'stehen auf' },
                example: 'Jana steht um 7 Uhr auf.',
                exampleSk: 'Jana vstáva o 7 hodín.',
            },
            'frühstückt': {
                type: 'verb', sk: 'raňajkuje', infinitiv: 'frühstücken',
                conjugation: { ich: 'frühstücke', du: 'frühstückst', 'er/sie/es': 'frühstückt', wir: 'frühstücken', ihr: 'frühstückt', sie: 'frühstücken' },
                example: 'Sie frühstückt jeden Morgen.',
                exampleSk: 'Každé ráno raňajkuje.',
            },
            'trinkt': {
                type: 'verb', sk: 'pije', infinitiv: 'trinken',
                conjugation: { ich: 'trinke', du: 'trinkst', 'er/sie/es': 'trinkt', wir: 'trinken', ihr: 'trinkt', sie: 'trinken' },
                example: 'Sie trinkt Orangensaft.',
                exampleSk: 'Pije pomarančový džús.',
            },
            'U-Bahn': {
                type: 'noun', sk: 'metro', article: 'die', plural: 'die U-Bahnen',
                cases: { Nominativ: 'die U-Bahn', Akkusativ: 'die U-Bahn', Dativ: 'der U-Bahn', Genitiv: 'der U-Bahn' },
                example: 'Mit der U-Bahn fährt sie ins Zentrum.',
                exampleSk: 'Metrom ide do centra.',
            },
            'mit': {
                type: 'preposition', sk: 's / so / pomocou',
                governs: ['Dativ'],
                note: 'mit riadi VŽDY Datív.',
                examples: [
                    { de: 'Ich fahre mit dem Bus.', sk: 'Idem autobusom.' },
                    { de: 'Jana geht mit Maria ins Café.', sk: 'Jana ide s Mariou do kaviarne.' },
                ],
            },
            'fährt': {
                type: 'verb', sk: 'ide (dopravou)', infinitiv: 'fahren',
                conjugation: { ich: 'fahre', du: 'fährst', 'er/sie/es': 'fährt', wir: 'fahren', ihr: 'fahrt', sie: 'fahren' },
                example: 'Sie fährt ins Zentrum.',
                exampleSk: 'Ide do centra.',
            },
            'Mittagspause': {
                type: 'noun', sk: 'obedňajšia prestávka', article: 'die', plural: 'die Mittagspausen',
                cases: { Nominativ: 'die Mittagspause', Akkusativ: 'die Mittagspause', Dativ: 'der Mittagspause', Genitiv: 'der Mittagspause' },
                example: 'In der Mittagspause geht sie ins Café.',
                exampleSk: 'V obedňajšej prestávke ide do kaviarne.',
            },
            'nach': {
                type: 'preposition', sk: 'po / po ňom / do (mesta)',
                governs: ['Dativ'],
                note: 'nach + Datív: po niečom, alebo smer do mesta/krajiny bez člena.',
                examples: [
                    { de: 'Nach der Arbeit geht Jana einkaufen.', sk: 'Po práci Jana ide nakupovať.' },
                    { de: 'Ich fahre nach Wien.', sk: 'Idem do Viedne.' },
                ],
            },
            'kauft': {
                type: 'verb', sk: 'kupuje', infinitiv: 'kaufen',
                conjugation: { ich: 'kaufe', du: 'kaufst', 'er/sie/es': 'kauft', wir: 'kaufen', ihr: 'kauft', sie: 'kaufen' },
                example: 'Sie kauft Gemüse und Brot.',
                exampleSk: 'Kúpi zeleninu a chlieb.',
            },
            'kocht': {
                type: 'verb', sk: 'varí', infinitiv: 'kochen',
                conjugation: { ich: 'koche', du: 'kochst', 'er/sie/es': 'kocht', wir: 'kochen', ihr: 'kocht', sie: 'kochen' },
                example: 'Abends kocht Jana oft selbst.',
                exampleSk: 'Večer Jana často varí sama.',
            },
            'selbst': {
                type: 'adverb', sk: 'sama / sám / samotný',
                comparison: null,
                example: 'Jana kocht abends selbst.',
                exampleSk: 'Jana varí večer sama.',
            },
            'schaut fern': {
                type: 'verb', sk: 'pozerá televíziu', infinitiv: 'fernsehen',
                conjugation: { ich: 'sehe fern', du: 'siehst fern', 'er/sie/es': 'sieht fern', wir: 'sehen fern', ihr: 'seht fern', sie: 'sehen fern' },
                example: 'Sie schaut fern.',
                exampleSk: 'Ona pozerá televíziu.',
            },
        },
        quiz: [
            { question: 'Wann steht Jana auf?', options: ['Um 6 Uhr', 'Um 7 Uhr', 'Um 8 Uhr', 'Um 9 Uhr'], answer: 1, explanation: '„Jana steht jeden Morgen um 7 Uhr auf."' },
            { question: 'Wie fährt Jana ins Büro?', options: ['Mit dem Bus', 'Mit dem Taxi', 'Mit der U-Bahn', 'Mit dem Fahrrad'], answer: 2, explanation: '„Mit der U-Bahn fährt sie ins Zentrum."' },
            { question: 'Mit wem geht Jana in der Mittagspause ins Café?', options: ['Allein', 'Mit Peter', 'Mit Maria', 'Mit Tomáš'], answer: 2, explanation: '„In der Mittagspause geht sie mit Maria in ein Café."' },
            { question: 'Was kauft Jana im Supermarkt?', options: ['Nur Obst', 'Gemüse, Brot und manchmal Fleisch', 'Nur Milch', 'Pizza und Kuchen'], answer: 1, explanation: '„Sie kauft Gemüse, Brot und manchmal Fleisch."' },
            { question: 'Wann geht Jana schlafen?', options: ['Um 20 Uhr', 'Um 21 Uhr', 'Um 22 Uhr', 'Um 23 Uhr'], answer: 2, explanation: '„Um 22 Uhr geht Jana schlafen."' },
        ],
    },

    {
        id: 'story_04',
        title: 'Im Restaurant',
        titleSk: 'V reštaurácii',
        cefr: 'A1',
        lessonRange: [21, 35],
        description: 'Jana a Maria idú na obed do reštaurácie.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        sentences: [
            { de: 'Es ist Freitag. Jana und Maria haben frei.', sk: 'Je piatok. Jana a Maria majú voľno.' },
            { de: 'Sie möchten zusammen essen gehen.', sk: 'Chcú spolu ísť jesť.' },
            { de: 'Maria kennt ein gutes Restaurant in der Nähe.', sk: 'Maria pozná dobrú reštauráciu v blízkosti.' },
            { de: 'Das Restaurant heißt „Zum Goldenen Hirschen".', sk: 'Reštaurácia sa volá „Zum Goldenen Hirschen".' },
            { de: 'Sie gehen zu Fuß. Der Weg dauert zehn Minuten.', sk: 'Idú pešo. Cesta trvá desať minút.' },
            { de: 'Das Restaurant ist voll, aber sie finden einen Tisch.', sk: 'Reštaurácia je plná, ale nájdu stôl.' },
            { de: 'Ein Kellner kommt und bringt die Speisekarte.', sk: 'Príde čašník a prinesie jedálny lístok.' },
            { de: 'Jana liest die Speisekarte. Es gibt viele Gerichte.', sk: 'Jana číta jedálny lístok. Je tam veľa jedál.' },
            { de: 'Maria möchte eine Tomatensuppe und Wiener Schnitzel.', sk: 'Maria si chce dať paradajkovú polievku a viedenský rezeň.' },
            { de: 'Jana möchte einen Salat und Pasta mit Gemüse.', sk: 'Jana si chce dať šalát a cestoviny so zeleninou.' },
            { de: 'Der Kellner fragt: „Was möchten Sie trinken?"', sk: 'Čašník sa pýta: „Čo si prajete piť?"' },
            { de: 'Jana bestellt ein Glas Mineralwasser. Maria nimmt Apfelsaft.', sk: 'Jana si objedná pohár minerálky. Maria si vezme jablkový džús.' },
            { de: 'Das Essen ist sehr lecker. Jana ist begeistert.', sk: 'Jedlo je veľmi chutné. Jana je nadšená.' },
            { de: 'Nach dem Essen möchten sie einen Kaffee.', sk: 'Po jedle si chcú dať kávu.' },
            { de: 'Jana ruft den Kellner: „Die Rechnung, bitte!"', sk: 'Jana zavolá čašníka: „Účet, prosím!"' },
            { de: 'Die Rechnung beträgt 34 Euro. Sie teilen den Betrag.', sk: 'Účet je 34 eur. Rozdelia sumu.' },
            { de: 'Maria sagt: „Wir kommen bald wieder hierher!"', sk: 'Maria hovorí: „Čoskoro sa sem vrátime!"' },
        ],
        words: {
            'möchten': {
                type: 'verb', sk: 'chcú / chceli by', infinitiv: 'mögen (Konjunktiv II)',
                conjugation: { ich: 'möchte', du: 'möchtest', 'er/sie/es': 'möchte', wir: 'möchten', ihr: 'möchtet', sie: 'möchten' },
                example: 'Sie möchten zusammen essen gehen.',
                exampleSk: 'Chcú spolu ísť jesť.',
            },
            'kennt': {
                type: 'verb', sk: 'pozná', infinitiv: 'kennen',
                conjugation: { ich: 'kenne', du: 'kennst', 'er/sie/es': 'kennt', wir: 'kennen', ihr: 'kennt', sie: 'kennen' },
                example: 'Maria kennt ein gutes Restaurant.',
                exampleSk: 'Maria pozná dobrú reštauráciu.',
            },
            'Kellner': {
                type: 'noun', sk: 'čašník', article: 'der', plural: 'die Kellner',
                cases: { Nominativ: 'der Kellner', Akkusativ: 'den Kellner', Dativ: 'dem Kellner', Genitiv: 'des Kellners' },
                example: 'Ein Kellner kommt und bringt die Speisekarte.',
                exampleSk: 'Príde čašník a prinesie jedálny lístok.',
            },
            'Speisekarte': {
                type: 'noun', sk: 'jedálny lístok', article: 'die', plural: 'die Speisekarten',
                cases: { Nominativ: 'die Speisekarte', Akkusativ: 'die Speisekarte', Dativ: 'der Speisekarte', Genitiv: 'der Speisekarte' },
                example: 'Jana liest die Speisekarte.',
                exampleSk: 'Jana číta jedálny lístok.',
            },
            'liest': {
                type: 'verb', sk: 'číta', infinitiv: 'lesen',
                conjugation: { ich: 'lese', du: 'liest', 'er/sie/es': 'liest', wir: 'lesen', ihr: 'lest', sie: 'lesen' },
                example: 'Jana liest die Speisekarte.',
                exampleSk: 'Jana číta jedálny lístok.',
            },
            'bestellt': {
                type: 'verb', sk: 'objednáva', infinitiv: 'bestellen',
                conjugation: { ich: 'bestelle', du: 'bestellst', 'er/sie/es': 'bestellt', wir: 'bestellen', ihr: 'bestellt', sie: 'bestellen' },
                example: 'Jana bestellt ein Glas Mineralwasser.',
                exampleSk: 'Jana si objedná pohár minerálky.',
            },
            'lecker': {
                type: 'adjective', sk: 'chutný / chutná',
                comparison: { Positiv: 'lecker', Komparativ: 'leckerer', Superlativ: 'am leckersten' },
                example: 'Das Essen ist sehr lecker.',
                exampleSk: 'Jedlo je veľmi chutné.',
            },
            'Rechnung': {
                type: 'noun', sk: 'účet', article: 'die', plural: 'die Rechnungen',
                cases: { Nominativ: 'die Rechnung', Akkusativ: 'die Rechnung', Dativ: 'der Rechnung', Genitiv: 'der Rechnung' },
                example: 'Die Rechnung beträgt 34 Euro.',
                exampleSk: 'Účet je 34 eur.',
            },
            'nach': {
                type: 'preposition', sk: 'po (čase / akcii)',
                governs: ['Dativ'],
                note: 'nach riadi vždy Datív. Používa sa na vyjadrenie "po niečom".',
                examples: [
                    { de: 'Nach dem Essen möchten sie Kaffee.', sk: 'Po jedle si chcú dať kávu.' },
                    { de: 'Nach der Arbeit bin ich müde.', sk: 'Po práci som unavený.' },
                ],
            },
            'ruft': {
                type: 'verb', sk: 'volá / zavolá', infinitiv: 'rufen',
                conjugation: { ich: 'rufe', du: 'rufst', 'er/sie/es': 'ruft', wir: 'rufen', ihr: 'ruft', sie: 'rufen' },
                example: 'Jana ruft den Kellner.',
                exampleSk: 'Jana zavolá čašníka.',
            },
        },
        quiz: [
            { question: 'Warum gehen Jana und Maria ins Restaurant?', options: ['Es ist ihr Geburtstag.', 'Sie haben frei.', 'Sie feiern etwas.', 'Der Chef lädt sie ein.'], answer: 1, explanation: '„Es ist Freitag. Jana und Maria haben frei."' },
            { question: 'Was bestellt Maria?', options: ['Salat und Pasta', 'Suppe und Schnitzel', 'Nur Schnitzel', 'Kaffee und Kuchen'], answer: 1, explanation: '„Maria möchte eine Tomatensuppe und Wiener Schnitzel."' },
            { question: 'Was trinkt Jana?', options: ['Wein', 'Apfelsaft', 'Mineralwasser', 'Bier'], answer: 2, explanation: '„Jana bestellt ein Glas Mineralwasser."' },
            { question: 'Wie viel kostet die Rechnung?', options: ['26 Euro', '30 Euro', '34 Euro', '40 Euro'], answer: 2, explanation: '„Die Rechnung beträgt 34 Euro."' },
        ],
    },

    {
        id: 'story_05',
        title: 'Am Bahnhof',
        titleSk: 'Na stanici',
        cefr: 'A1',
        lessonRange: [36, 50],
        description: 'Jana cestuje na víkend do Salzburgu.',
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
        sentences: [
            { de: 'Es ist Samstag. Jana möchte Salzburg besuchen.', sk: 'Je sobota. Jana chce navštíviť Salzburg.' },
            { de: 'Sie packt einen kleinen Rucksack ein.', sk: 'Sbalí si malý ruksak.' },
            { de: 'Sie nimmt ihre Kamera und eine Jacke mit.', sk: 'Vezme si fotoaparát a bundu.' },
            { de: 'Jana geht zum Wiener Hauptbahnhof.', sk: 'Jana ide na Viedenskú hlavnú stanicu.' },
            { de: 'Der Bahnhof ist groß und modern.', sk: 'Stanica je veľká a moderná.' },
            { de: 'Jana sucht die Abfahrtstafel.', sk: 'Jana hľadá tabuľu odchodov.' },
            { de: 'Der nächste Zug nach Salzburg fährt um 10:30 Uhr ab.', sk: 'Najbližší vlak do Salzburgu odchádza o 10:30.' },
            { de: 'Jana geht zum Schalter und kauft ein Ticket.', sk: 'Jana ide k pokladnici a kúpi si lístok.' },
            { de: 'Das Ticket kostet 29 Euro. Sie zahlt mit Kreditkarte.', sk: 'Lístok stojí 29 eur. Platí kreditnou kartou.' },
            { de: 'Der Zug kommt auf Gleis 7 an.', sk: 'Vlak prichádza na koľaj 7.' },
            { de: 'Jana findet einen Fensterplatz. Sie ist aufgeregt.', sk: 'Jana nájde miesto pri okne. Je vzrušená.' },
            { de: 'Die Fahrt dauert zwei Stunden und dreißig Minuten.', sk: 'Cesta trvá dve hodiny a tridsať minút.' },
            { de: 'Jana schaut aus dem Fenster. Die Landschaft ist wunderschön.', sk: 'Jana sa díva z okna. Krajina je nádherná.' },
            { de: 'In Salzburg regnet es leicht, aber das ist kein Problem.', sk: 'V Salzburgu mierne prší, ale to nie je problém.' },
            { de: 'Jana besucht das Mozarthaus und den Dom.', sk: 'Jana navštívi Mozartov dom a katedrálu.' },
            { de: 'Abends fährt sie zurück nach Wien.', sk: 'Večer sa vráti späť do Viedne.' },
            { de: 'Jana sagt: „Salzburg ist wunderschön! Ich komme wieder!"', sk: 'Jana hovorí: „Salzburg je nádherný! Vrátim sa!"' },
        ],
        words: {
            'besuchen': {
                type: 'verb', sk: 'navštíviť', infinitiv: 'besuchen',
                conjugation: { ich: 'besuche', du: 'besuchst', 'er/sie/es': 'besucht', wir: 'besuchen', ihr: 'besucht', sie: 'besuchen' },
                example: 'Jana möchte Salzburg besuchen.',
                exampleSk: 'Jana chce navštíviť Salzburg.',
            },
            'Hauptbahnhof': {
                type: 'noun', sk: 'Hlavná stanica', article: 'der', plural: 'die Hauptbahnhöfe',
                cases: { Nominativ: 'der Hauptbahnhof', Akkusativ: 'den Hauptbahnhof', Dativ: 'dem Hauptbahnhof', Genitiv: 'des Hauptbahnhofs' },
                example: 'Jana geht zum Wiener Hauptbahnhof.',
                exampleSk: 'Jana ide na Viedenskú hlavnú stanicu.',
            },
            'fährt ab': {
                type: 'verb', sk: 'odchádza (vlak/bus)', infinitiv: 'abfahren',
                conjugation: { ich: 'fahre ab', du: 'fährst ab', 'er/sie/es': 'fährt ab', wir: 'fahren ab', ihr: 'fahrt ab', sie: 'fahren ab' },
                example: 'Der Zug fährt um 10:30 Uhr ab.',
                exampleSk: 'Vlak odchádza o 10:30.',
            },
            'Schalter': {
                type: 'noun', sk: 'prepážka / pokladnica', article: 'der', plural: 'die Schalter',
                cases: { Nominativ: 'der Schalter', Akkusativ: 'den Schalter', Dativ: 'dem Schalter', Genitiv: 'des Schalters' },
                example: 'Jana geht zum Schalter.',
                exampleSk: 'Jana ide k pokladnici.',
            },
            'Ticket': {
                type: 'noun', sk: 'lístok', article: 'das', plural: 'die Tickets',
                cases: { Nominativ: 'das Ticket', Akkusativ: 'das Ticket', Dativ: 'dem Ticket', Genitiv: 'des Tickets' },
                example: 'Das Ticket kostet 29 Euro.',
                exampleSk: 'Lístok stojí 29 eur.',
            },
            'Gleis': {
                type: 'noun', sk: 'koľaj / nástupište', article: 'das', plural: 'die Gleise',
                cases: { Nominativ: 'das Gleis', Akkusativ: 'das Gleis', Dativ: 'dem Gleis', Genitiv: 'des Gleises' },
                example: 'Der Zug kommt auf Gleis 7 an.',
                exampleSk: 'Vlak prichádza na koľaj 7.',
            },
            'dauert': {
                type: 'verb', sk: 'trvá', infinitiv: 'dauern',
                conjugation: { ich: 'dauere', du: 'dauerst', 'er/sie/es': 'dauert', wir: 'dauern', ihr: 'dauert', sie: 'dauern' },
                example: 'Die Fahrt dauert zwei Stunden.',
                exampleSk: 'Cesta trvá dve hodiny.',
            },
            'wunderschön': {
                type: 'adjective', sk: 'nádherný / nádherná',
                comparison: { Positiv: 'wunderschön', Komparativ: 'wunderschöner', Superlativ: 'am wunderschönsten' },
                example: 'Die Landschaft ist wunderschön.',
                exampleSk: 'Krajina je nádherná.',
            },
            'nach': {
                type: 'preposition', sk: 'do (mesta) / po / späť do',
                governs: ['Dativ'],
                note: 'nach + mesto = smer (bez člena). nach + Dat = po niečom.',
                examples: [
                    { de: 'Sie fährt zurück nach Wien.', sk: 'Vráti sa späť do Viedne.' },
                    { de: 'Nach der Reise bin ich müde.', sk: 'Po ceste som unavená.' },
                ],
            },
            'zurück': {
                type: 'adverb', sk: 'späť / naspäť',
                comparison: null,
                example: 'Abends fährt sie zurück nach Wien.',
                exampleSk: 'Večer sa vráti späť do Viedne.',
            },
        },
        quiz: [
            { question: 'Wohin fährt Jana?', options: ['Nach Graz', 'Nach Innsbruck', 'Nach Salzburg', 'Nach Linz'], answer: 2, explanation: '„Jana möchte Salzburg besuchen."' },
            { question: 'Um wie viel Uhr fährt der Zug ab?', options: ['Um 9:00 Uhr', 'Um 10:00 Uhr', 'Um 10:30 Uhr', 'Um 11:00 Uhr'], answer: 2, explanation: '„Der nächste Zug nach Salzburg fährt um 10:30 Uhr ab."' },
            { question: 'Wie lang dauert die Fahrt?', options: ['1 Stunde', '2 Stunden', '2,5 Stunden', '3 Stunden'], answer: 2, explanation: '„Die Fahrt dauert zwei Stunden und dreißig Minuten."' },
            { question: 'Was besucht Jana in Salzburg?', options: ['Das Kunstmuseum', 'Das Mozarthaus und den Dom', 'Den Zoo', 'Das Schloss Schönbrunn'], answer: 1, explanation: '„Jana besucht das Mozarthaus und den Dom."' },
            { question: 'Wie ist das Wetter in Salzburg?', options: ['Sonnig', 'Windig', 'Es regnet leicht', 'Es schneit'], answer: 2, explanation: '„In Salzburg regnet es leicht."' },
        ],
    },
    {
        "title": "Der Schatten im Garten",
        "titleSk": "Tieň v záhrade",
        "cefr": "A2",
        "description": "Lukas je sám doma a počuje zvláštny zvuk, ktorý ho zavedie do záhrady, kde objaví prekvapivé tajomstvo.",
        "sentences": [
            {
                "de": "Der Schatten im Garten",
                "sk": "Tieň v záhrade"
            },
            {
                "de": "Es ist Nacht in Berlin.",
                "sk": "Je noc v Berlíne."
            },
            {
                "de": "Lukas ist allein zu Hause.",
                "sk": "Lukas je sám doma."
            },
            {
                "de": "Er sitzt im Wohnzimmer und liest ein Buch.",
                "sk": "Sedí v obývačke a číta knihu."
            },
            {
                "de": "Es ist sehr leise.",
                "sk": "Je veľmi ticho."
            },
            {
                "de": "Plötzlich hört er ein Geräusch: Knack!",
                "sk": "Zrazu počuje zvuk: Knack!"
            },
            {
                "de": "Lukas stoppt.",
                "sk": "Lukas zastaví."
            },
            {
                "de": "„Was ist das?“, fragt er.",
                "sk": "„Čo je to?“, pýta sa."
            },
            {
                "de": "Er geht zum Fenster und sieht in den Garten.",
                "sk": "Ide k oknu a pozerá do záhrady."
            },
            {
                "de": "Der Garten ist dunkel und groß.",
                "sk": "Záhrada je tmavá a veľká."
            },
            {
                "de": "Die Bäume bewegen sich im Wind.",
                "sk": "Stromy sa pohybujú vo vetre."
            },
            {
                "de": "Da sieht er es: Ein Schatten!",
                "sk": "Tam to vidí: Tieň!"
            },
            {
                "de": "Der Schatten ist groß und schwarz.",
                "sk": "Tieň je veľký a čierny."
            },
            {
                "de": "Er geht langsam hinter die Garage.",
                "sk": "Ide pomaly za garáž."
            },
            {
                "de": "Lukas hat ein bisschen Angst, aber er ist auch neugierig.",
                "sk": "Lukas má trochu strach, ale je aj zvedavý."
            },
            {
                "de": "Er nimmt eine Taschenlampe und geht nach draußen.",
                "sk": "Vezme si baterku a ide von."
            },
            {
                "de": "Die Luft ist kalt.",
                "sk": "Vzduch je studený."
            },
            {
                "de": "Lukas macht die Taschenlampe an.",
                "sk": "Lukas zapne baterku."
            },
            {
                "de": "Er geht zur Garage.",
                "sk": "Ide ku garáži."
            },
            {
                "de": "„Hallo? Ist da jemand?“, ruft er.",
                "sk": "„Ahoj? Je tam niekto?“, volá."
            },
            {
                "de": "Keine Antwort.",
                "sk": "Žiadna odpoveď."
            },
            {
                "de": "Plötzlich sieht er zwei Augen.",
                "sk": "Zrazu vidí dve oči."
            },
            {
                "de": "Die Augen leuchten gelb im Licht.",
                "sk": "Oči svietia žlto vo svetle."
            },
            {
                "de": "Der Schatten kommt näher.",
                "sk": "Tieň sa približuje."
            },
            {
                "de": "Lukas atmet schnell.",
                "sk": "Lukas dýcha rýchlo."
            },
            {
                "de": "Ist das ein Monster? Ein Dieb?",
                "sk": "Je to monštrum? Zlodej?"
            },
            {
                "de": "Der Schatten springt aus der Ecke.",
                "sk": "Tieň vyskočí z rohu."
            },
            {
                "de": "„Miau!“",
                "sk": "„Mňau!“"
            },
            {
                "de": "Lukas lacht laut.",
                "sk": "Lukas sa hlasno smeje."
            },
            {
                "de": "Es ist kein Monster.",
                "sk": "Nie je to monštrum."
            },
            {
                "de": "Es ist nur Findus, die Katze von der Nachbarin.",
                "sk": "Je to len Findus, mačka od susedy."
            },
            {
                "de": "Findus hat Hunger.",
                "sk": "Findus má hlad."
            },
            {
                "de": "Lukas geht zurück ins Haus und gibt der Katze etwas Milch.",
                "sk": "Lukas ide späť do domu a dá mačke trochu mlieka."
            },
            {
                "de": "Das Geheimnis ist gelöst.",
                "sk": "Tajomstvo je vyriešené."
            }
        ],
        "quiz": [
            {
                "question": "Wo ist Lukas am Anfang der Geschichte?",
                "options": [
                    "A) Im Garten",
                    "B) Im Wohnzimmer",
                    "C) Im Schlafzimmer",
                    "D) In der Küche"
                ],
                "answer": 1,
                "explanation": "Na začiatku príbehu sedí Lukas v obývačke a číta knihu."
            },
            {
                "question": "Was sieht Lukas zuerst im Garten?",
                "options": [
                    "A) Einen Baum",
                    "B) Eine Taschenlampe",
                    "C) Einen Schatten",
                    "D) Eine Garage"
                ],
                "answer": 2,
                "explanation": "Lukas najprv vidí v záhrade veľký čierny tieň."
            },
            {
                "question": "Wer oder was ist der Schatten am Ende?",
                "options": [
                    "A) Ein Monster",
                    "B) Ein Dieb",
                    "C) Die Katze der Nachbarin",
                    "D) Ein Freund"
                ],
                "answer": 2,
                "explanation": "Nakoniec sa ukáže, že tieň je mačka susedy, Findus."
            }
        ],
        "words": {
            "Nacht": {
                "type": "noun",
                "sk": "noc",
                "article": "die",
                "plural": "Nächte",
                "cases": {
                    "Nominativ": "die Nacht",
                    "Akkusativ": "die Nacht",
                    "Dativ": "der Nacht",
                    "Genitiv": "der Nacht"
                },
                "example": "Die Nacht war dunkel und still.",
                "exampleSk": "Noc bola tmavá a tichá."
            },
            "Wohnzimmer": {
                "type": "noun",
                "sk": "obývačka",
                "article": "das",
                "plural": "Wohnzimmer",
                "cases": {
                    "Nominativ": "das Wohnzimmer",
                    "Akkusativ": "das Wohnzimmer",
                    "Dativ": "dem Wohnzimmer",
                    "Genitiv": "des Wohnzimmers"
                },
                "example": "Wir saßen gemütlich im Wohnzimmer.",
                "exampleSk": "Pohodlne sme sedeli v obývačke."
            },
            "Buch": {
                "type": "noun",
                "sk": "kniha",
                "article": "das",
                "plural": "Bücher",
                "cases": {
                    "Nominativ": "das Buch",
                    "Akkusativ": "das Buch",
                    "Dativ": "dem Buch",
                    "Genitiv": "des Buches"
                },
                "example": "Ich lese ein interessantes Buch.",
                "exampleSk": "Čítam zaujímavú knihu."
            },
            "Geräusch": {
                "type": "noun",
                "sk": "zvuk, hluk",
                "article": "das",
                "plural": "Geräusche",
                "cases": {
                    "Nominativ": "das Geräusch",
                    "Akkusativ": "das Geräusch",
                    "Dativ": "dem Geräusch",
                    "Genitiv": "des Geräusches"
                },
                "example": "Ein seltsames Geräusch kam aus dem Garten.",
                "exampleSk": "Zvláštny zvuk prišiel zo záhrady."
            },
            "Fenster": {
                "type": "noun",
                "sk": "okno",
                "article": "das",
                "plural": "Fenster",
                "cases": {
                    "Nominativ": "das Fenster",
                    "Akkusativ": "das Fenster",
                    "Dativ": "dem Fenster",
                    "Genitiv": "des Fensters"
                },
                "example": "Das Fenster war offen.",
                "exampleSk": "Okno bolo otvorené."
            },
            "Garten": {
                "type": "noun",
                "sk": "záhrada",
                "article": "der",
                "plural": "Gärten",
                "cases": {
                    "Nominativ": "der Garten",
                    "Akkusativ": "den Garten",
                    "Dativ": "dem Garten",
                    "Genitiv": "des Gartens"
                },
                "example": "Im Garten blühen viele Blumen.",
                "exampleSk": "V záhrade kvitne veľa kvetov."
            },
            "Baum": {
                "type": "noun",
                "sk": "strom",
                "article": "der",
                "plural": "Bäume",
                "cases": {
                    "Nominativ": "der Baum",
                    "Akkusativ": "den Baum",
                    "Dativ": "dem Baum",
                    "Genitiv": "des Baumes"
                },
                "example": "Ein alter Baum stand vor dem Haus.",
                "exampleSk": "Pred domom stál starý strom."
            },
            "Wind": {
                "type": "noun",
                "sk": "vietor",
                "article": "der",
                "plural": "Winde",
                "cases": {
                    "Nominativ": "der Wind",
                    "Akkusativ": "den Wind",
                    "Dativ": "dem Wind",
                    "Genitiv": "des Windes"
                },
                "example": "Der Wind wehte stark.",
                "exampleSk": "Vietor silno fúkal."
            },
            "Schatten": {
                "type": "noun",
                "sk": "tieň",
                "article": "der",
                "plural": "Schatten",
                "cases": {
                    "Nominativ": "der Schatten",
                    "Akkusativ": "den Schatten",
                    "Dativ": "dem Schatten",
                    "Genitiv": "des Schattens"
                },
                "example": "Im Schatten war es kühler.",
                "exampleSk": "V tieni bolo chladnejšie."
            },
            "Garage": {
                "type": "noun",
                "sk": "garáž",
                "article": "die",
                "plural": "Garagen",
                "cases": {
                    "Nominativ": "die Garage",
                    "Akkusativ": "die Garage",
                    "Dativ": "der Garage",
                    "Genitiv": "der Garage"
                },
                "example": "Das Auto steht in der Garage.",
                "exampleSk": "Auto stojí v garáži."
            },
            "Angst": {
                "type": "noun",
                "sk": "strach",
                "article": "die",
                "plural": "Ängste",
                "cases": {
                    "Nominativ": "die Angst",
                    "Akkusativ": "die Angst",
                    "Dativ": "der Angst",
                    "Genitiv": "der Angst"
                },
                "example": "Sie hatte große Angst im Dunkeln.",
                "exampleSk": "Mala veľký strach v tme."
            },
            "Taschenlampe": {
                "type": "noun",
                "sk": "baterka",
                "article": "die",
                "plural": "Taschenlampen",
                "cases": {
                    "Nominativ": "die Taschenlampe",
                    "Akkusativ": "die Taschenlampe",
                    "Dativ": "der Taschenlampe",
                    "Genitiv": "der Taschenlampe"
                },
                "example": "Er suchte seine Taschenlampe.",
                "exampleSk": "Hľadal svoju baterku."
            },
            "Luft": {
                "type": "noun",
                "sk": "vzduch",
                "article": "die",
                "plural": "Lüfte",
                "cases": {
                    "Nominativ": "die Luft",
                    "Akkusativ": "die Luft",
                    "Dativ": "der Luft",
                    "Genitiv": "der Luft"
                },
                "example": "Die frische Luft tat gut.",
                "exampleSk": "Čerstvý vzduch dobre padol."
            },
            "Antwort": {
                "type": "noun",
                "sk": "odpoveď",
                "article": "die",
                "plural": "Antworten",
                "cases": {
                    "Nominativ": "die Antwort",
                    "Akkusativ": "die Antwort",
                    "Dativ": "der Antwort",
                    "Genitiv": "der Antwort"
                },
                "example": "Ich warte auf deine Antwort.",
                "exampleSk": "Čakám na tvoju odpoveď."
            },
            "Auge": {
                "type": "noun",
                "sk": "oko",
                "article": "das",
                "plural": "Augen",
                "cases": {
                    "Nominativ": "das Auge",
                    "Akkusativ": "das Auge",
                    "Dativ": "dem Auge",
                    "Genitiv": "des Auges"
                },
                "example": "Sie hatte schöne blaue Augen.",
                "exampleSk": "Mala krásne modré oči."
            },
            "Licht": {
                "type": "noun",
                "sk": "svetlo",
                "article": "das",
                "plural": "Lichter",
                "cases": {
                    "Nominativ": "das Licht",
                    "Akkusativ": "das Licht",
                    "Dativ": "dem Licht",
                    "Genitiv": "des Lichts"
                },
                "example": "Das Licht ist an.",
                "exampleSk": "Svetlo je zapnuté."
            },
            "Monster": {
                "type": "noun",
                "sk": "monštrum",
                "article": "das",
                "plural": "Monster",
                "cases": {
                    "Nominativ": "das Monster",
                    "Akkusativ": "das Monster",
                    "Dativ": "dem Monster",
                    "Genitiv": "des Monsters"
                },
                "example": "Das Monster war sehr groß.",
                "exampleSk": "Monštrum bolo veľmi veľké."
            },
            "Dieb": {
                "type": "noun",
                "sk": "zlodej",
                "article": "der",
                "plural": "Diebe",
                "cases": {
                    "Nominativ": "der Dieb",
                    "Akkusativ": "den Dieb",
                    "Dativ": "dem Dieb",
                    "Genitiv": "des Diebes"
                },
                "example": "Der Dieb wurde gefasst.",
                "exampleSk": "Zlodej bol chytený."
            },
            "Ecke": {
                "type": "noun",
                "sk": "roh, kút",
                "article": "die",
                "plural": "Ecken",
                "cases": {
                    "Nominativ": "die Ecke",
                    "Akkusativ": "die Ecke",
                    "Dativ": "der Ecke",
                    "Genitiv": "der Ecke"
                },
                "example": "Er stand in der Ecke des Zimmers.",
                "exampleSk": "Stál v rohu izby."
            },
            "Katze": {
                "type": "noun",
                "sk": "mačka",
                "article": "die",
                "plural": "Katzen",
                "cases": {
                    "Nominativ": "die Katze",
                    "Akkusativ": "die Katze",
                    "Dativ": "der Katze",
                    "Genitiv": "der Katze"
                },
                "example": "Die Katze schläft auf dem Sofa.",
                "exampleSk": "Mačka spí na pohovke."
            },
            "Nachbarin": {
                "type": "noun",
                "sk": "susedka",
                "article": "die",
                "plural": "Nachbarinnen",
                "cases": {
                    "Nominativ": "die Nachbarin",
                    "Akkusativ": "die Nachbarin",
                    "Dativ": "der Nachbarin",
                    "Genitiv": "der Nachbarin"
                },
                "example": "Meine Nachbarin ist sehr nett.",
                "exampleSk": "Moja susedka je veľmi milá."
            },
            "Hunger": {
                "type": "noun",
                "sk": "hlad",
                "article": "der",
                "plural": "Hunger",
                "cases": {
                    "Nominativ": "der Hunger",
                    "Akkusativ": "den Hunger",
                    "Dativ": "dem Hunger",
                    "Genitiv": "des Hungers"
                },
                "example": "Ich habe großen Hunger.",
                "exampleSk": "Mám veľký hlad."
            },
            "Haus": {
                "type": "noun",
                "sk": "dom",
                "article": "das",
                "plural": "Häuser",
                "cases": {
                    "Nominativ": "das Haus",
                    "Akkusativ": "das Haus",
                    "Dativ": "dem Haus",
                    "Genitiv": "des Hauses"
                },
                "example": "Wir wohnen in einem schönen Haus.",
                "exampleSk": "Bývame v peknom dome."
            },
            "Milch": {
                "type": "noun",
                "sk": "mlieko",
                "article": "die",
                "plural": "Milch",
                "cases": {
                    "Nominativ": "die Milch",
                    "Akkusativ": "die Milch",
                    "Dativ": "der Milch",
                    "Genitiv": "der Milch"
                },
                "example": "Ich trinke gerne Milch.",
                "exampleSk": "Rád pijem mlieko."
            },
            "Geheimnis": {
                "type": "noun",
                "sk": "tajomstvo",
                "article": "das",
                "plural": "Geheimnisse",
                "cases": {
                    "Nominativ": "das Geheimnis",
                    "Akkusativ": "das Geheimnis",
                    "Dativ": "dem Geheimnis",
                    "Genitiv": "des Geheimnisses"
                },
                "example": "Das ist ein großes Geheimnis.",
                "exampleSk": "To je veľké tajomstvo."
            },
            "sitzen": {
                "type": "verb",
                "sk": "sedieť",
                "infinitiv": "sitzen",
                "conjugation": {
                    "ich": "sitze",
                    "du": "sitzt",
                    "er/sie/es": "sitzt",
                    "wir": "sitzen",
                    "ihr": "sitzt",
                    "sie": "sitzen"
                },
                "example": "Ich sitze auf dem Stuhl.",
                "exampleSk": "Sedím na stoličke."
            },
            "hören": {
                "type": "verb",
                "sk": "počúvať",
                "infinitiv": "hören",
                "conjugation": {
                    "ich": "höre",
                    "du": "hörst",
                    "er/sie/es": "hört",
                    "wir": "hören",
                    "ihr": "hört",
                    "sie": "hören"
                },
                "example": "Ich höre Musik.",
                "exampleSk": "Počúvam hudbu."
            },
            "stoppen": {
                "type": "verb",
                "sk": "zastaviť",
                "infinitiv": "stoppen",
                "conjugation": {
                    "ich": "stoppe",
                    "du": "stoppst",
                    "er/sie/es": "stoppt",
                    "wir": "stoppen",
                    "ihr": "stoppt",
                    "sie": "stoppen"
                },
                "example": "Er muss das Auto stoppen.",
                "exampleSk": "Musí zastaviť auto."
            },
            "fragen": {
                "type": "verb",
                "sk": "pýtať sa",
                "infinitiv": "fragen",
                "conjugation": {
                    "ich": "frage",
                    "du": "fragst",
                    "er/sie/es": "fragt",
                    "wir": "fragen",
                    "ihr": "fragt",
                    "sie": "fragen"
                },
                "example": "Ich frage dich etwas.",
                "exampleSk": "Niečo sa ťa pýtam."
            },
            "gehen": {
                "type": "verb",
                "sk": "ísť, chodiť",
                "infinitiv": "gehen",
                "conjugation": {
                    "ich": "gehe",
                    "du": "gehst",
                    "er/sie/es": "geht",
                    "wir": "gehen",
                    "ihr": "geht",
                    "sie": "gehen"
                },
                "example": "Wir gehen nach Hause.",
                "exampleSk": "Ideme domov."
            },
            "sehen": {
                "type": "verb",
                "sk": "vidieť",
                "infinitiv": "sehen",
                "conjugation": {
                    "ich": "sehe",
                    "du": "siehst",
                    "er/sie/es": "sieht",
                    "wir": "sehen",
                    "ihr": "seht",
                    "sie": "sehen"
                },
                "example": "Ich sehe einen Vogel am Himmel.",
                "exampleSk": "Vidím vtáka na oblohe."
            },
            "bewegen": {
                "type": "verb",
                "sk": "hýbať sa, pohybovať",
                "infinitiv": "bewegen",
                "conjugation": {
                    "ich": "bewege",
                    "du": "bewegst",
                    "er/sie/es": "bewegt",
                    "wir": "bewegen",
                    "ihr": "bewegt",
                    "sie": "bewegen"
                },
                "example": "Er kann seinen Arm nicht bewegen.",
                "exampleSk": "Nemôže pohnúť rukou."
            },
            "nehmen": {
                "type": "verb",
                "sk": "vziať, brať",
                "infinitiv": "nehmen",
                "conjugation": {
                    "ich": "nehme",
                    "du": "nimmst",
                    "er/sie/es": "nimmt",
                    "wir": "nehmen",
                    "ihr": "nehmt",
                    "sie": "nehmen"
                },
                "example": "Kannst du mir bitte das Buch nehmen?",
                "exampleSk": "Môžeš mi prosím vziať tú knihu?"
            },
            "machen": {
                "type": "verb",
                "sk": "robiť, urobiť",
                "infinitiv": "machen",
                "conjugation": {
                    "ich": "mache",
                    "du": "machst",
                    "er/sie/es": "macht",
                    "wir": "machen",
                    "ihr": "macht",
                    "sie": "machen"
                },
                "example": "Was machst du heute Abend?",
                "exampleSk": "Čo robíš dnes večer?"
            },
            "leuchten": {
                "type": "verb",
                "sk": "svietiť, žiariť",
                "infinitiv": "leuchten",
                "conjugation": {
                    "ich": "leuchte",
                    "du": "leuchtest",
                    "er/sie/es": "leuchtet",
                    "wir": "leuchten",
                    "ihr": "leuchtet",
                    "sie": "leuchten"
                },
                "example": "Die Sterne leuchten am Nachthimmel.",
                "exampleSk": "Hviezdy svietia na nočnej oblohe."
            },
            "atmen": {
                "type": "verb",
                "sk": "dýchať",
                "infinitiv": "atmen",
                "conjugation": {
                    "ich": "atme",
                    "du": "atmest",
                    "er/sie/es": "atmet",
                    "wir": "atmen",
                    "ihr": "atmet",
                    "sie": "atmen"
                },
                "example": "Tief einatmen und langsam ausatmen.",
                "exampleSk": "Zhlboka sa nadýchnuť a pomaly vydýchnuť."
            },
            "springen": {
                "type": "verb",
                "sk": "skákať",
                "infinitiv": "springen",
                "conjugation": {
                    "ich": "springe",
                    "du": "springst",
                    "er/sie/es": "springt",
                    "wir": "springen",
                    "ihr": "springt",
                    "sie": "springen"
                },
                "example": "Das Kind springt vor Freude.",
                "exampleSk": "Dieťa skáče od radosti."
            },
            "lachen": {
                "type": "verb",
                "sk": "smiať sa",
                "infinitiv": "lachen",
                "conjugation": {
                    "ich": "lache",
                    "du": "lachst",
                    "er/sie/es": "lacht",
                    "wir": "lachen",
                    "ihr": "lacht",
                    "sie": "lachen"
                },
                "example": "Sie lachen über den Witz.",
                "exampleSk": "Smejú sa na vtipe."
            },
            "geben": {
                "type": "verb",
                "sk": "dať, dávať",
                "infinitiv": "geben",
                "conjugation": {
                    "ich": "gebe",
                    "du": "gibst",
                    "er/sie/es": "gibt",
                    "wir": "geben",
                    "ihr": "gebt",
                    "sie": "geben"
                },
                "example": "Kannst du mir bitte das Salz geben?",
                "exampleSk": "Môžeš mi prosím podať soľ?"
            },
            "lösen": {
                "type": "verb",
                "sk": "riešiť, uvoľniť",
                "infinitiv": "lösen",
                "conjugation": {
                    "ich": "löse",
                    "du": "löst",
                    "er/sie/es": "löst",
                    "wir": "lösen",
                    "ihr": "löst",
                    "sie": "lösen"
                },
                "example": "Wir müssen dieses Problem lösen.",
                "exampleSk": "Musíme vyriešiť tento problém."
            },
            "allein": {
                "type": "adverb",
                "sk": "sám, osamote",
                "example": "Er ist gern allein.",
                "exampleSk": "Rád je sám."
            },
            "leise": {
                "type": "adjective",
                "sk": "tichý, potichu",
                "example": "Bitte sprich leise.",
                "exampleSk": "Prosím, hovor potichu."
            },
            "dunkel": {
                "type": "adjective",
                "sk": "tmavý",
                "example": "Es ist schon dunkel draußen.",
                "exampleSk": "Vonku je už tma."
            },
            "schwarz": {
                "type": "adjective",
                "sk": "čierny",
                "example": "Sie trägt ein schwarzes Kleid.",
                "exampleSk": "Má na sebe čierne šaty."
            },
            "langsam": {
                "type": "adjective",
                "sk": "pomalý, pomaly",
                "example": "Er fährt sehr langsam.",
                "exampleSk": "Ide veľmi pomaly."
            },
            "neugierig": {
                "type": "adjective",
                "sk": "zvedavý",
                "example": "Das Kind ist sehr neugierig und stellt viele Fragen.",
                "exampleSk": "Dieťa je veľmi zvedavé a kladie veľa otázok."
            },
            "kalt": {
                "type": "adjective",
                "sk": "studený, chladný",
                "example": "Es ist heute sehr kalt draußen.",
                "exampleSk": "Dnes je vonku veľmi chladno."
            },
            "gelb": {
                "type": "adjective",
                "sk": "žltý",
                "example": "Die Sonne ist gelb.",
                "exampleSk": "Slnko je žlté."
            },
            "schnell": {
                "type": "adjective",
                "sk": "rýchly, rýchlo",
                "example": "Der Sportwagen fährt sehr schnell.",
                "exampleSk": "Športové auto jazdí veľmi rýchlo."
            },
            "laut": {
                "type": "adjective",
                "sk": "hlasný, hlasno",
                "example": "Die Musik ist zu laut.",
                "exampleSk": "Hudba je príliš hlasná."
            }
        },
        "id": "story_06"
    },
    {
        "id": "story_07",
        "title": "Udine Spaziergang",
        "titleSk": "Prechádzka po Udine",
        "cefr": "A1",
        "lessonRange": [1, 5],
        "description": "Prechádzka letným mestom Udine, so psíkom Tacom a posedením v kaviarni.",
        "image": "/images/story_07_udine_spaziergang.png",
        "audioFile": "/audio/stories/story_07_udine_spaziergang.mp3",
        "sentences": [
            { "de": "Am Morgen wachen wir früh auf.", "sk": "Ráno sa budíme zavčasu." },
            { "de": "Der Himmel ist blau.", "sk": "Obloha je modrá." },
            { "de": "Wir verlassen das Haus und nehmen den Bus in die Stadt.", "sk": "Opúšťame dom a ideme autobusom do mesta." },
            { "de": "Neben der Bushaltestelle ist ein großer Marktplatz.", "sk": "Vedľa autobusovej zastávky je veľké námestie (trhovisko)." },
            { "de": "Dort kaufen wir eine Brezel.", "sk": "Tam si kúpime praclík." },
            { "de": "Dann beginnt der Spaziergang.", "sk": "Potom sa začína prechádzka." },
            { "de": "Heute sind wir in der Stadt Udine.", "sk": "Dnes sme v meste Udine." },
            { "de": "Das Wetter ist wunderschön und die Sonne scheint.", "sk": "Počasie je nádherné a svieti slnko." },
            { "de": "Ich bin mit meinem Hund Taco unterwegs.", "sk": "Som na ceste s mojím psom Tacom." },
            { "de": "Wir spazieren durch die historische Innenstadt.", "sk": "Prechádzame sa cez historické centrum." },
            { "de": "Zuerst gehen wir über die Brücke.", "sk": "Najprv ideme cez most." },
            { "de": "Das Wasser unter der Brücke ist sehr klar und blau.", "sk": "Voda pod mostom je veľmi čistá a modrá." },
            { "de": "Es gibt hier viele alte Häuser.", "sk": "Je tu veľa starých domov." },
            { "de": "Nach dem Spaziergang bin ich müde und brauche eine Pause.", "sk": "Po prechádzke som unavená a potrebujem prestávku." },
            { "de": "Wir gehen in den Park.", "sk": "Ideme do parku." },
            { "de": "Ich sitze auf einer Bank.", "sk": "Sedím na lavičke." },
            { "de": "Ich sitze in dem Schatten, denn es ist heute sehr heiß.", "sk": "Sedím v tieni, pretože je dnes veľmi horúco." },
            { "de": "Taco ist auch müde.", "sk": "Taco je tiež unavený." },
            { "de": "Er liegt unter der Bank und schläft neben meinem Rucksack.", "sk": "Leží pod lavičkou a spí vedľa môjho ruksaku." },
            { "de": "Später haben wir Durst.", "sk": "Neskôr sme smädní (máme smäd)." },
            { "de": "Wir suchen und finden einen schönen Platz.", "sk": "Hľadáme a nájdeme pekné miesto." },
            { "de": "Aus dem Brunnen dort kommt frisches Trinkwasser.", "sk": "Z fontány tam tečie (prichádza) čerstvá pitná voda." },
            { "de": "Das ist sehr erfrischend!", "sk": "To je veľmi osviežujúce!" },
            { "de": "Zwischen den Bäumen singen die Vögel.", "sk": "Medzi stromami spievajú vtáky." },
            { "de": "Am Nachmittag wollen wir in ein Restaurant gehen, aber das Restaurant ist leider geschlossen.", "sk": "Poobede chceme ísť do reštaurácie, ale reštaurácia je žiaľ zatvorená." },
            { "de": "Zum Glück ist ein Café daneben geöffnet.", "sk": "Našťastie je vedľa otvorená kaviareň." },
            { "de": "Ich trinke wie immer einen Kaffee mit Milch – einen Latte Macchiato.", "sk": "Pijem ako vždy kávu s mliekom – Latte Macchiato." },
            { "de": "Auf dem Tisch steht eine grüne Pflanze.", "sk": "Na stole stojí zelená rastlina." },
            { "de": "Ich rühre meinen Kaffee mit dem Löffel.", "sk": "Miešam moju kávu s lyžičkou." },
            { "de": "Bevor wir nach Hause gehen, werfen wir unseren Müll in den Mülleimer.", "sk": "Skôr ako ideme domov, zahodíme náš odpad do koša." },
            { "de": "Am Abend fahren wir mit dem Zug zurück.", "sk": "Večer cestujeme naspäť vlakom." },
            { "de": "Taco schläft sofort auf dem Sofa ein.", "sk": "Taco hneď zaspí na gauči." },
            { "de": "Es war ein toller Tag!", "sk": "Bol to skvelý deň!" }
        ],
        "words": {
            "Himmel": { "type": "noun", "sk": "obloha", "article": "der", "plural": "die Himmel", "cases": { "Nominativ": "der Himmel", "Akkusativ": "den Himmel", "Dativ": "dem Himmel", "Genitiv": "des Himmels" }, "example": "Der Himmel ist blau.", "exampleSk": "Obloha je modrá." },
            "blau": { "type": "adjective", "sk": "modrý/modrá", "example": "Der Himmel ist blau.", "exampleSk": "Obloha je modrá." },
            "verlassen": { "type": "verb", "sk": "opustiť", "infinitiv": "verlassen", "conjugation": { "ich": "verlasse", "du": "verlässt", "er/sie/es": "verlässt", "wir": "verlassen", "ihr": "verlasst", "sie": "verlassen" }, "example": "Wir verlassen das Haus.", "exampleSk": "Opúšťame dom." },
            "Stadt": { "type": "noun", "sk": "mesto", "article": "die", "plural": "die Städte", "cases": { "Nominativ": "die Stadt", "Akkusativ": "die Stadt", "Dativ": "der Stadt", "Genitiv": "der Stadt" }, "example": "Wir nehmen den Bus in die Stadt.", "exampleSk": "Ideme autobusom do mesta." },
            "Bushaltestelle": { "type": "noun", "sk": "autobusová zastávka", "article": "die", "plural": "die Bushaltestellen", "cases": { "Nominativ": "die Bushaltestelle", "Akkusativ": "die Bushaltestelle", "Dativ": "der Bushaltestelle", "Genitiv": "der Bushaltestelle" }, "example": "Neben der Bushaltestelle ist ein Marktplatz.", "exampleSk": "Vedľa autobusovej zastávky je trhovisko." },
            "Marktplatz": { "type": "noun", "sk": "trh, námestie", "article": "der", "plural": "die Marktplätze", "cases": { "Nominativ": "der Marktplatz", "Akkusativ": "den Marktplatz", "Dativ": "dem Marktplatz", "Genitiv": "des Marktplatzes" }, "example": "Hier ist ein großer Marktplatz.", "exampleSk": "Tu je veľké trhovisko." },
            "Brezel": { "type": "noun", "sk": "praclík", "article": "die", "plural": "die Brezeln", "cases": { "Nominativ": "die Brezel", "Akkusativ": "die Brezel", "Dativ": "der Brezel", "Genitiv": "der Brezel" }, "example": "Wir kaufen eine Brezel.", "exampleSk": "Kúpime jeden praclík." },
            "Spaziergang": { "type": "noun", "sk": "prechádzka", "article": "der", "plural": "die Spaziergänge", "cases": { "Nominativ": "der Spaziergang", "Akkusativ": "den Spaziergang", "Dativ": "dem Spaziergang", "Genitiv": "des Spaziergangs" }, "example": "Der Spaziergang beginnt.", "exampleSk": "Prechádzka začína." },
            "Hund": { "type": "noun", "sk": "pes", "article": "der", "plural": "die Hunde", "cases": { "Nominativ": "der Hund", "Akkusativ": "den Hund", "Dativ": "dem Hund", "Genitiv": "des Hundes" }, "example": "Ich bin mit meinem Hund Taco unterwegs.", "exampleSk": "Som na ceste s mojím psom Tacom." },
            "Brücke": { "type": "noun", "sk": "most", "article": "die", "plural": "die Brücken", "cases": { "Nominativ": "die Brücke", "Akkusativ": "die Brücke", "Dativ": "der Brücke", "Genitiv": "der Brücke" }, "example": "Wir gehen über die Brücke.", "exampleSk": "Ideme cez most." },
            "Müll": { "type": "noun", "sk": "odpad", "article": "der", "plural": "die Mülle", "cases": { "Nominativ": "der Müll", "Akkusativ": "den Müll", "Dativ": "dem Müll", "Genitiv": "des Mülls" }, "example": "Wir werfen den Müll in den Mülleimer.", "exampleSk": "Cezahadzujeme odpad do koša." },
            "Mülleimer": { "type": "noun", "sk": "odpadkový kôš", "article": "der", "plural": "die Mülleimer", "cases": { "Nominativ": "der Mülleimer", "Akkusativ": "den Mülleimer", "Dativ": "dem Mülleimer", "Genitiv": "des Mülleimers" }, "example": "Wir werfen den Müll in den Mülleimer.", "exampleSk": "Zahadzujeme odpad do koša." },
            "Löffel": { "type": "noun", "sk": "lyžica", "article": "der", "plural": "die Löffel", "cases": { "Nominativ": "der Löffel", "Akkusativ": "den Löffel", "Dativ": "dem Löffel", "Genitiv": "des Löffels" }, "example": "Ich rühre meinen Kaffee mit dem Löffel.", "exampleSk": "Miešam kávu lyžicou." },
            "Tisch": { "type": "noun", "sk": "stôl", "article": "der", "plural": "die Tische", "cases": { "Nominativ": "der Tisch", "Akkusativ": "den Tisch", "Dativ": "dem Tisch", "Genitiv": "des Tisches" }, "example": "Auf dem Tisch steht eine Pflanze.", "exampleSk": "Na stole je rastlina." },
            "Zug": { "type": "noun", "sk": "vlak", "article": "der", "plural": "die Züge", "cases": { "Nominativ": "der Zug", "Akkusativ": "den Zug", "Dativ": "dem Zug", "Genitiv": "des Zuges" }, "example": "Wir fahren mit dem Zug.", "exampleSk": "Cestujeme vlakom." }
        },
        "quiz": [
            { "question": "Wo ist der Marktplatz?", "options": ["Über der Brücke", "Neben der Bushaltestelle", "Im Park", "Im Café"], "answer": 1, "explanation": "„Neben der Bushaltestelle ist ein großer Marktplatz.\"" },
            { "question": "Wo sitzt die Person und warum?", "options": ["In der Sonne, es ist kalt.", "Im Schatten, es ist heiß.", "Auf der Wiese, sie ist müde.", "Im Café, es regnet."], "answer": 1, "explanation": "„Ich sitze in dem Schatten, denn es ist heute sehr heiß.\"" },
            { "question": "Was macht die Person im Café?", "options": ["Sie isst eine Brezel.", "Sie trinkt Wasser.", "Sie trinkt einen Latte Macchiato.", "Sie ruft den Hund."], "answer": 2, "explanation": "„Ich trinke wie immer einen Kaffee mit Milch – einen Latte Macchiato.\"" }
        ]
    },
    {
        "id": "story_08",
        "title": "Bananenbrot backen",
        "titleSk": "Pečenie banánového chleba",
        "cefr": "A1-A2",
        "lessonRange": [2, 6],
        "description": "Príprava zdravého banánového chleba s použitím rúry a základných nástrojov v kuchyni.",
        "image": "/images/story_08_bananenbrot.png",
        "audioFile": "/audio/stories/story_08_bananenbrot.mp3",
        "sentences": [
            { "de": "Ich habe heute Lust auf etwas Süßes.", "sk": "Dnes mám chuť na niečo sladké." },
            { "de": "Ich schaue auf den Tisch.", "sk": "Pozriem sa na stôl." },
            { "de": "In der Obstschale liegen drei braune Bananen.", "sk": "V miske na ovocie ležia tri hnedé banány." },
            { "de": "Sie sind schon sehr reif.", "sk": "Sú už veľmi zrelé." },
            { "de": "Das ist perfekt!", "sk": "To je perfektné!" },
            { "de": "Denn mit reifen Bananen kann man sehr leckeres Bananenbrot backen.", "sk": "Pretože so zrelými banánmi sa dá upiecť veľmi chutný banánový chlieb." },
            { "de": "Ich gehe in die Küche und beginne.", "sk": "Idem do kuchyne a začínam." },
            { "de": "Zuerst schäle ich die Bananen.", "sk": "Najprv ošúpem banány." },
            { "de": "Ich werfe die Bananenschale in den Müll.", "sk": "Banánovú šupku hodím do koša." },
            { "de": "Ich lege die Bananen in eine kleine Schale.", "sk": "Banány položím do malej misky." },
            { "de": "Ich zerdrücke die Bananen mit der Gabel.", "sk": "Zgniavim banány vidličkou." },
            { "de": "Das dauert nur kurz.", "sk": "Trvá to len krátko." },
            { "de": "Jetzt brauche ich eine große Schüssel.", "sk": "Teraz potrebujem veľkú misu." },
            { "de": "Ich wiege den Zucker mit der Waage ab.", "sk": "Cukor odvážim pomocou váhy." },
            { "de": "Das Mehl und etwas Backpulver gebe ich durch ein Sieb in die Schüssel.", "sk": "Múku a trochu prášku do pečiva preosejem cez sitko do misy." },
            { "de": "Dann hole ich zwei Eier und etwas Öl.", "sk": "Potom prinesiem dve vajcia a trochu oleja." },
            { "de": "Ich mische alles zusammen.", "sk": "Všetko zmiešam dokopy." },
            { "de": "Ich verrühre alles gut mit dem Schneebesen.", "sk": "Dobre to vymiešam metličkou." },
            { "de": "Zum Schluss gebe ich noch ein paar Walnüsse in den Teig.", "sk": "Nakoniec pridám do cesta zopár vlašských orechov." },
            { "de": "Ich schneide die Nüsse vorher mit dem Messer in kleine Stücke.", "sk": "Orechy najprv nakrájam nožom na malé kúsky." },
            { "de": "Jetzt ist der Teig fertig.", "sk": "Teraz je cesto hotové." },
            { "de": "Ich nehme eine Kastenform und gieße den Teig hinein.", "sk": "Zoberiem formu na pečenie a vlejem do nej cesto." },
            { "de": "Oh, ich habe vergessen, den Backofen einzuschalten!", "sk": "Och, zabudol som zapnúť rúru!" },
            { "de": "Ich mache das schnell.", "sk": "Rýchlo to urobím." },
            { "de": "Wir stellen den Kuchen in den Backofen.", "sk": "Koláč vložíme do rúry." },
            { "de": "Jetzt muss ich warten.", "sk": "Teraz musím čakať." },
            { "de": "Nach 35 Minuten teste ich mit der Messerspitze, ob der Kuchen fertig ist.", "sk": "Po 35 minútach otestujem špičkou noža, či je koláč hotový." },
            { "de": "Ja, er ist perfekt.", "sk": "Áno, je perfektný." },
            { "de": "Ich lasse ihn abkühlen.", "sk": "Nechám ho vychladnúť." },
            { "de": "Dann schneide ich eine Scheibe ab.", "sk": "Potom odkrojím jeden plátok." },
            { "de": "Es schmeckt fantastisch!", "sk": "Chutí fantasticky!" }
        ],
        "quiz": [
            {
                "question": "Was macht die Person mit den reifen Bananen?",
                "options": [
                    "A) Sie wirft sie in den Müll.",
                    "B) Sie bäckt ein Bananenbrot.",
                    "C) Sie macht einen Obstsalat.",
                    "D) Sie gibt sie dem Hund."
                ],
                "answer": 1,
                "explanation": "Sie bäckt ein Bananenbrot, weil reife Bananen perfekt dafür sind."
            },
            {
                "question": "Welches Werkzeug benutzt die Person, um die Bananen zu zerdrücken?",
                "options": [
                    "A) Das Messer",
                    "B) Die Waage",
                    "C) Den Schneebesen",
                    "D) Die Gabel"
                ],
                "answer": 3,
                "explanation": "Die bananen werden mit der Gabel zerdrückt."
            },
            {
                "question": "Was hat die Person am Ende fast vergessen?",
                "options": [
                    "A) Zucker hinzuzugeben",
                    "B) Den Backofen einzuschalten",
                    "C) Die Form zu fetten",
                    "D) Nüsse zu schneiden"
                ],
                "answer": 1,
                "explanation": "Sie sagte: \"Oh, ich habe vergessen, den Backofen einzuschalten!\""
            }
        ],
        "words": {
            "Bananenbrot": { "type": "noun", "sk": "banánový chlieb", "article": "das", "plural": "die Bananenbrote", "cases": { "Nominativ": "das Bananenbrot", "Akkusativ": "das Bananenbrot", "Dativ": "dem Bananenbrot", "Genitiv": "des Bananenbrotes" }, "example": "Das Bananenbrot schmeckt gut.", "exampleSk": "Banánový chlieb chutí dobre." },
            "Tisch": { "type": "noun", "sk": "stôl", "article": "der", "plural": "die Tische", "cases": { "Nominativ": "der Tisch", "Akkusativ": "den Tisch", "Dativ": "dem Tisch", "Genitiv": "des Tisches" }, "example": "Ich schaue auf den Tisch.", "exampleSk": "Pozriem sa na stôl." },
            "Bananen": { "type": "noun", "sk": "banány", "article": "die", "plural": "die Bananen", "cases": { "Nominativ": "die Bananen", "Akkusativ": "die Bananen", "Dativ": "den Bananen", "Genitiv": "der Bananen" }, "example": "Drei braune Bananen liegen in der Schale.", "exampleSk": "Tri hnedé banány ležia v miske." },
            "Müll": { "type": "noun", "sk": "odpad", "article": "der", "plural": "die Mülle", "cases": { "Nominativ": "der Müll", "Akkusativ": "den Müll", "Dativ": "dem Müll", "Genitiv": "des Mülls" }, "example": "Ich werfe die Schale in den Müll.", "exampleSk": "Hodím šupku do koša." },
            "Gabel": { "type": "noun", "sk": "vidlička", "article": "die", "plural": "die Gabeln", "cases": { "Nominativ": "die Gabel", "Akkusativ": "die Gabel", "Dativ": "der Gabel", "Genitiv": "der Gabel" }, "example": "Ich zerdrücke die Bananen mit der Gabel.", "exampleSk": "Roztláčam banány vidličkou." },
            "Waage": { "type": "noun", "sk": "váha", "article": "die", "plural": "die Waagen", "cases": { "Nominativ": "die Waage", "Akkusativ": "die Waage", "Dativ": "der Waage", "Genitiv": "der Waage" }, "example": "Ich wiege den Zucker mit der Waage ab.", "exampleSk": "Odvážim cukor pomocou váhy." },
            "Schneebesen": { "type": "noun", "sk": "metlička", "article": "der", "plural": "die Schneebesen", "cases": { "Nominativ": "der Schneebesen", "Akkusativ": "den Schneebesen", "Dativ": "dem Schneebesen", "Genitiv": "des Schneebesens" }, "example": "Ich verrühre alles mit dem Schneebesen.", "exampleSk": "Vymiešam všetko metličkou." },
            "Messer": { "type": "noun", "sk": "nôž", "article": "das", "plural": "die Messer", "cases": { "Nominativ": "das Messer", "Akkusativ": "das Messer", "Dativ": "dem Messer", "Genitiv": "des Messers" }, "example": "Ich schneide die Nüsse mit dem Messer.", "exampleSk": "Nakrájam orechy nožom." },
            "Backofen": { "type": "noun", "sk": "rúra", "article": "der", "plural": "die Backöfen", "cases": { "Nominativ": "der Backofen", "Akkusativ": "den Backofen", "Dativ": "dem Backofen", "Genitiv": "des Backofens" }, "example": "Der Kuchen kommt in den Backofen.", "exampleSk": "Koláč ide do rúry." },
            "Schüssel": { "type": "noun", "sk": "miska", "article": "die", "plural": "die Schüsseln", "cases": { "Nominativ": "die Schüssel", "Akkusativ": "die Schüssel", "Dativ": "der Schüssel", "Genitiv": "der Schüssel" }, "example": "Das Mehl gebe ich in die Schüssel.", "exampleSk": "Múku dám do misy." }
        }
    },
    {
        id: 'story_09',
        title: 'Hallo, ich heiße Jonas!',
        titleSk: 'Ahoj, volám sa Jonas!',
        cefr: 'A1',
        description: 'Jonas sa predstavuje a rozpráva o svojom meste a koníčkoch.',
        sentences: [
            { de: "Hallo, ich heiße Jonas!", sk: "Ahoj, volám sa Jonas!" },
            { de: "Ich heiße Jonas und ich bin zehn Jahre alt.", sk: "Volám sa Jonas a mám desať rokov." },
            { de: "Ich komme aus Deutschland und wohne in Dresden.", sk: "Pochádzam z Nemecka a bývam v Drážďanoch." },
            { de: "Dresden ist eine schöne Stadt.", sk: "Drážďany sú pekné mesto." },
            { de: "Ich gehe in die vierte Klasse und ich lerne gern in der Schule.", sk: "Chodím do štvrtej triedy a rád sa učím v škole." },
            { de: "Mein Lieblingsfach ist Mathe.", sk: "Môj obľúbený predmet je matematika." },
            { de: "Ich habe einen kleinen Bruder.", sk: "Mám malého brata." },
            { de: "Er heißt Max und er ist sieben Jahre alt.", sk: "Volá sa Max a má sedem rokov." },
            { de: "Wir wohnen mit unseren Eltern in einem Haus mit Garten.", sk: "Bývame s našimi rodičmi v dome so záhradou." },
            { de: "Ich spiele oft mit meinem Bruder oder mit meinen Freunden.", sk: "Často sa hrám s mojím bratom alebo s mojimi kamarátmi." },
            { de: "Mein Hobby ist Fußball.", sk: "Mojím koníčkom je futbal." },
            { de: "Ich spiele in einer kleinen Mannschaft.", sk: "Hrám v malom mužstve." },
            { de: "Am Wochenende habe ich ein Spiel.", sk: "Cez víkend mám zápas." },
            { de: "Nach der Schule lese ich gern Comics.", sk: "Po škole rád čítam komiksy." },
            { de: "Ich habe viele Hefte über Superhelden.", sk: "Mám veľa zošitov o superhrdinoch." },
            { de: "Ich habe auch ein Haustier: eine schwarze Katze.", sk: "Mám tiež domáce zviera: čiernu mačku." },
            { de: "Sie heißt Mimi und schläft gern auf meinem Bett.", sk: "Volá sa Mimi a rada spí na mojej posteli." },
            { de: "Ich finde mein Leben toll!", sk: "Myslím si, že môj život je skvelý!" }
        ],
        words: {
            "Stadt": { "type": "noun", "sk": "mesto", "article": "die", "plural": "die Städte", "cases": { "Nominativ": "die Stadt", "Akkusativ": "die Stadt", "Dativ": "der Stadt", "Genitiv": "der Stadt" }, "example": "Dresden ist eine schöne Stadt.", "exampleSk": "Drážďany sú pekné mesto." },
            "Klasse": { "type": "noun", "sk": "trieda", "article": "die", "plural": "die Klassen", "cases": { "Nominativ": "die Klasse", "Akkusativ": "die Klasse", "Dativ": "der Klasse", "Genitiv": "der Klasse" }, "example": "Ich gehe in die vierte Klasse.", "exampleSk": "Chodím do štvrtej triedy." },
            "Bruder": { "type": "noun", "sk": "brat", "article": "der", "plural": "die Brüder", "cases": { "Nominativ": "der Bruder", "Akkusativ": "den Bruder", "Dativ": "dem Bruder", "Genitiv": "des Bruders" }, "example": "Ich habe einen kleinen Bruder.", "exampleSk": "Mám malého brata." },
            "Lieblingsfach": { "type": "noun", "sk": "obľúbený predmet", "article": "das", "plural": "die Lieblingsfächer", "cases": { "Nominativ": "das Lieblingsfach", "Akkusativ": "das Lieblingsfach", "Dativ": "dem Lieblingsfach", "Genitiv": "des Lieblingsfachs" }, "example": "Mein Lieblingsfach ist Mathe.", "exampleSk": "Môj obľúbený predmet je matematika." },
            "Haustier": { "type": "noun", "sk": "domáce zviera", "article": "das", "plural": "die Haustiere", "cases": { "Nominativ": "das Haustier", "Akkusativ": "das Haustier", "Dativ": "dem Haustier", "Genitiv": "des Haustiers" }, "example": "Hast du ein Haustier?", "exampleSk": "Máš domáce zviera?" },
            "Garten": { "type": "noun", "sk": "záhrada", "article": "der", "plural": "die Gärten", "cases": { "Nominativ": "der Garten", "Akkusativ": "den Garten", "Dativ": "dem Garten", "Genitiv": "des Gartens" }, "example": "Wir wohnen in einem Haus mit Garten.", "exampleSk": "Bývame v dome so záhradou." },
            "Hobby": { "type": "noun", "sk": "koníček", "article": "das", "plural": "die Hobbys", "cases": { "Nominativ": "das Hobby", "Akkusativ": "das Hobby", "Dativ": "dem Hobby", "Genitiv": "des Hobbys" }, "example": "Mein Hobby ist Fußball.", "exampleSk": "Môj koníček je futbal." },
            "Mannschaft": { "type": "noun", "sk": "mužstvo", "article": "die", "plural": "die Mannschaften", "cases": { "Nominativ": "die Mannschaft", "Akkusativ": "die Mannschaft", "Dativ": "der Mannschaft", "Genitiv": "der Mannschaft" }, "example": "Ich spiele in einer Mannschaft.", "exampleSk": "Hrám v mužstve." },
            "lesen": { "type": "verb", "sk": "čítať", "infinitiv": "lesen", "conjugation": { "ich": "lese", "du": "liest", "er/sie/es": "liest", "wir": "lesen", "ihr": "lest", "sie": "lesen" }, "example": "Ich lese gern Comics.", "exampleSk": "Rád čítam komiksy." },
            "schlafen": { "type": "verb", "sk": "spať", "infinitiv": "schlafen", "conjugation": { "ich": "schlafe", "du": "schläfst", "er/sie/es": "schläft", "wir": "schlafen", "ihr": "schlaft", "sie": "schlafen" }, "example": "Die Katze schläft auf dem Bett.", "exampleSk": "Mačka spí na posteli." },
            "Jahre": { "type": "noun", "sk": "roky", "article": "das", "plural": "die Jahre", "cases": { "Nominativ": "das Jahr", "Akkusativ": "das Jahr", "Dativ": "dem Jahr", "Genitiv": "des Jahres" }, "example": "Ich bin zehn Jahre alt.", "exampleSk": "Mám desať rokov." },
            "Deutschland": { "type": "noun", "sk": "Nemecko", "article": "das", "plural": "-", "cases": { "Nominativ": "Deutschland", "Akkusativ": "Deutschland", "Dativ": "Deutschland", "Genitiv": "Deutschlands" }, "example": "Ich komme aus Deutschland.", "exampleSk": "Pochádzam z Nemecka." },
            "Dresden": { "type": "noun", "sk": "Drážďany", "article": "-", "plural": "-", "cases": { "Nominativ": "Dresden", "Akkusativ": "Dresden", "Dativ": "Dresden", "Genitiv": "Dresdens" }, "example": "Ich wohne in Dresden.", "exampleSk": "Bývam v Drážďanoch." },
            "Schule": { "type": "noun", "sk": "škola", "article": "die", "plural": "die Schulen", "cases": { "Nominativ": "die Schule", "Akkusativ": "die Schule", "Dativ": "der Schule", "Genitiv": "der Schule" }, "example": "Ich lerne gern in der Schule.", "exampleSk": "Rád sa učím v škole." },
            "Mathe": { "type": "noun", "sk": "matematika", "article": "die", "plural": "-", "cases": { "Nominativ": "die Mathe", "Akkusativ": "die Mathe", "Dativ": "der Mathe", "Genitiv": "der Mathe" }, "example": "Mein Lieblingsfach ist Mathe.", "exampleSk": "Môj obľúbený predmet je matematika." },
            "Eltern": { "type": "noun", "sk": "rodičia (pl.)", "article": "die", "plural": "die Eltern", "cases": { "Nominativ": "die Eltern", "Akkusativ": "die Eltern", "Dativ": "den Eltern", "Genitiv": "der Eltern" }, "example": "Wir wohnen mit unseren Eltern.", "exampleSk": "Bývame s našimi rodičmi." },
            "Haus": { "type": "noun", "sk": "dom", "article": "das", "plural": "die Häuser", "cases": { "Nominativ": "das Haus", "Akkusativ": "das Haus", "Dativ": "dem Haus", "Genitiv": "des Hauses" }, "example": "Wir haben ein Haus.", "exampleSk": "Máme dom." },
            "Freunde": { "type": "noun", "sk": "priatelia (pl.)", "article": "die", "plural": "die Freunde", "cases": { "Nominativ": "die Freunde", "Akkusativ": "die Freunde", "Dativ": "den Freunden", "Genitiv": "der Freunde" }, "example": "Ich spiele mit meinen Freunden.", "exampleSk": "Hrám sa so svojimi priateľmi." },
            "Fußball": { "type": "noun", "sk": "futbal", "article": "der", "plural": "-", "cases": { "Nominativ": "der Fußball", "Akkusativ": "den Fußball", "Dativ": "dem Fußball", "Genitiv": "des Fußballs" }, "example": "Ich spiele Fußball.", "exampleSk": "Hrám futbal." },
            "Wochenende": { "type": "noun", "sk": "víkend", "article": "das", "plural": "die Wochenenden", "cases": { "Nominativ": "das Wochenende", "Akkusativ": "das Wochenende", "Dativ": "dem Wochenende", "Genitiv": "des Wochenendes" }, "example": "Am Wochenende habe ich Zeit.", "exampleSk": "Cez víkend mám čas." },
            "Spiel": { "type": "noun", "sk": "zápas/hra", "article": "das", "plural": "die Spiele", "cases": { "Nominativ": "das Spiel", "Akkusativ": "das Spiel", "Dativ": "dem Spiel", "Genitiv": "des Spiels" }, "example": "Wir haben ein Spiel.", "exampleSk": "Máme zápas." },
            "Comics": { "type": "noun", "sk": "komiksy", "article": "der", "plural": "die Comics", "cases": { "Nominativ": "der Comic", "Akkusativ": "den Comic", "Dativ": "dem Comic", "Genitiv": "des Comics" }, "example": "Ich lese Comics.", "exampleSk": "Čítam komiksy." },
            "Hefte": { "type": "noun", "sk": "zošity", "article": "das", "plural": "die Hefte", "cases": { "Nominativ": "das Heft", "Akkusativ": "das Heft", "Dativ": "dem Heft", "Genitiv": "des Heftes" }, "example": "Ich habe viele Hefte.", "exampleSk": "Mám veľa zošitov." },
            "Superhelden": { "type": "noun", "sk": "superhrdinovia", "article": "der", "plural": "die Superhelden", "cases": { "Nominativ": "der Superheld", "Akkusativ": "den Superhelden", "Dativ": "dem Superhelden", "Genitiv": "des Superhelden" }, "example": "Er ist ein Superheld.", "exampleSk": "On je superhrdina." },
            "Katze": { "type": "noun", "sk": "mačka", "article": "die", "plural": "die Katzen", "cases": { "Nominativ": "die Katze", "Akkusativ": "die Katze", "Dativ": "der Katze", "Genitiv": "der Katze" }, "example": "Ich mag Katzen.", "exampleSk": "Mám rád mačky." },
            "Bett": { "type": "noun", "sk": "posteľ", "article": "das", "plural": "die Betten", "cases": { "Nominativ": "das Bett", "Akkusativ": "das Bett", "Dativ": "dem Bett", "Genitiv": "des Bettes" }, "example": "Das Bett ist weich.", "exampleSk": "Posteľ je mäkká." },
            "Leben": { "type": "noun", "sk": "život", "article": "das", "plural": "die Leben", "cases": { "Nominativ": "das Leben", "Akkusativ": "das Leben", "Dativ": "dem Leben", "Genitiv": "des Lebens" }, "example": "Das Leben ist toll.", "exampleSk": "Život je skvelý." }
        },
        quiz: [
            { type: "open", question: "1. Wie alt ist Jonas?", correctAnswer: ["Er ist zehn Jahre alt.", "Zehn.", "10"] },
            { type: "open", question: "2. Wo wohnt Jonas?", correctAnswer: ["Er wohnt in Dresden.", "In Dresden."] },
            { type: "open", question: "3. In welche Klasse geht er?", correctAnswer: ["Er geht in die vierte Klasse.", "In die vierte Klasse.", "vierte Klasse"] },
            { type: "open", question: "4. Wie heißt sein Bruder?", correctAnswer: ["Er heißt Max.", "Sein Bruder heißt Max.", "Max"] },
            { type: "open", question: "5. Was ist sein Hobby?", correctAnswer: ["Sein Hobby ist Fußball.", "Fußball."] },
            { type: "open", question: "6. Was liest Jonas gern?", correctAnswer: ["Er liest gern Comics.", "Comics.", "Jonas liest gern Comics."] },
            { type: "open", question: "7. Hat Jonas ein Haustier?", correctAnswer: ["Ja, eine schwarze Katze.", "Ja, eine Katze.", "Eine schwarze Katze.", "Ja."] },
            { type: "open", question: "Zusatzfrage: Hast du ein Haustier?", correctAnswer: "(Voľná odpoveď: z.B. Ich habe einen Hund / eine Katze / kein Haustier)" },
            { type: "open", question: "Zusatzfrage: Was ist dein Lieblingsfach?", correctAnswer: "(Voľná odpoveď: z.B. Mein Lieblingsfach ist Mathe / Deutsch / Sport)" }
        ]
    },
    {
        id: 'story_10',
        title: 'Ich bin Sofie und ich bin 10 Jahre alt',
        titleSk: 'Som Sofie a mám 10 rokov',
        cefr: 'A1',
        description: 'Sofie sa predstavuje a rozpráva o svojom živote vo Viedni, škole a záľubách.',
        sentences: [
            { de: "Hallo! Ich heiße Sofie und ich bin zehn Jahre alt.", sk: "Ahoj! Volám sa Sofie a mám desať rokov." },
            { de: "Ich komme aus Österreich und wohne in Wien.", sk: "Pochádzam z Rakúska a bývam vo Viedni." },
            { de: "Wien ist eine große und schöne Stadt.", sk: "Viedeň je veľké a pekné mesto." },
            { de: "Ich gehe in die vierte Klasse.", sk: "Chodím do štvrtej triedy." },
            { de: "Meine Schule ist gelb und hat viele Fenster.", sk: "Moja škola je žltá a má veľa okien." },
            { de: "Ich lerne gern Deutsch und Musik.", sk: "Rada sa učím nemčinu a hudbu." },
            { de: "Ich habe eine kleine Schwester.", sk: "Mám malú sestru." },
            { de: "Sie heißt Lena und sie ist sechs Jahre alt.", sk: "Volá sa Lena a má šesť rokov." },
            { de: "Wir spielen oft zusammen in unserem Zimmer.", sk: "Často sa spolu hráme v našej izbe." },
            { de: "Ich spiele auch Klavier.", sk: "Hrám aj na klavíri." },
            { de: "Am Montag und Donnerstag habe ich Klavierunterricht.", sk: "V pondelok a vo štvrtok mám hodinu klavíra." },
            { de: "Ich mag klassische Musik.", sk: "Mám rada klasickú hudbu." },
            { de: "Meine Lieblingsfarbe ist Lila.", sk: "Moja obľúbená farba je fialová." },
            { de: "Ich habe viele Dinge in Lila – mein T-Shirt, mein Rucksack und sogar meine Wasserflasche.", sk: "Mám veľa vecí vo fialovej – moje tričko, ruksak a dokonca aj moju fľašu na vodu." },
            { de: "Nach der Schule male ich gern oder lese ein Buch.", sk: "Po škole si rada maľujem alebo čítam knihu." },
            { de: "Ich finde mein Leben schön!", sk: "Myslím si, že môj život je pekný!" }
        ],
        words: {
            "Österreich": { "type": "noun", "sk": "Rakúsko", "article": "das", "plural": "-", "cases": { "Nominativ": "Österreich", "Akkusativ": "Österreich", "Dativ": "Österreich", "Genitiv": "Österreichs" }, "example": "Ich komme aus Österreich.", "exampleSk": "Pochádzam z Rakúska." },
            "Wien": { "type": "noun", "sk": "Viedeň", "article": "-", "plural": "-", "cases": { "Nominativ": "Wien", "Akkusativ": "Wien", "Dativ": "Wien", "Genitiv": "Wiens" }, "example": "Ich wohne in Wien.", "exampleSk": "Bývam vo Viedni." },
            "Stadt": { "type": "noun", "sk": "mesto", "article": "die", "plural": "die Städte", "cases": { "Nominativ": "die Stadt", "Akkusativ": "die Stadt", "Dativ": "der Stadt", "Genitiv": "der Stadt" }, "example": "Wien ist eine schöne Stadt.", "exampleSk": "Viedeň je pekné mesto." },
            "Klasse": { "type": "noun", "sk": "trieda", "article": "die", "plural": "die Klassen", "cases": { "Nominativ": "die Klasse", "Akkusativ": "die Klasse", "Dativ": "der Klasse", "Genitiv": "der Klasse" }, "example": "Ich gehe in die vierte Klasse.", "exampleSk": "Chodím do štvrtej triedy." },
            "Schule": { "type": "noun", "sk": "škola", "article": "die", "plural": "die Schulen", "cases": { "Nominativ": "die Schule", "Akkusativ": "die Schule", "Dativ": "der Schule", "Genitiv": "der Schule" }, "example": "Meine Schule ist gelb.", "exampleSk": "Moja škola je žltá." },
            "Fenster": { "type": "noun", "sk": "okná", "article": "das", "plural": "die Fenster", "cases": { "Nominativ": "das Fenster", "Akkusativ": "das Fenster", "Dativ": "dem Fenster", "Genitiv": "des Fensters" }, "example": "Die Schule hat viele Fenster.", "exampleSk": "Škola má veľa okien." },
            "Schwester": { "type": "noun", "sk": "sestra", "article": "die", "plural": "die Schwestern", "cases": { "Nominativ": "die Schwester", "Akkusativ": "die Schwester", "Dativ": "der Schwester", "Genitiv": "der Schwester" }, "example": "Ich habe eine kleine Schwester.", "exampleSk": "Mám malú sestru." },
            "Zimmer": { "type": "noun", "sk": "izba", "article": "das", "plural": "die Zimmer", "cases": { "Nominativ": "das Zimmer", "Akkusativ": "das Zimmer", "Dativ": "dem Zimmer", "Genitiv": "des Zimmers" }, "example": "Wir spielen in unserem Zimmer.", "exampleSk": "Hráme sa v našej izbe." },
            "Klavier": { "type": "noun", "sk": "klavír", "article": "das", "plural": "die Klaviere", "cases": { "Nominativ": "das Klavier", "Akkusativ": "das Klavier", "Dativ": "dem Klavier", "Genitiv": "des Klaviers" }, "example": "Ich spiele Klavier.", "exampleSk": "Hrám na klavíri." },
            "Klavierunterricht": { "type": "noun", "sk": "hodina klavíra", "article": "der", "plural": "die Klavierunterrichte", "cases": { "Nominativ": "der Klavierunterricht", "Akkusativ": "den Klavierunterricht", "Dativ": "dem Klavierunterricht", "Genitiv": "des Klavierunterrichts" }, "example": "Ich habe Klavierunterricht.", "exampleSk": "Mám hodinu klavíra." },
            "Musik": { "type": "noun", "sk": "hudba", "article": "die", "plural": "-", "cases": { "Nominativ": "die Musik", "Akkusativ": "die Musik", "Dativ": "der Musik", "Genitiv": "der Musik" }, "example": "Ich mag klassische Musik.", "exampleSk": "Mám rada klasickú hudbu." },
            "Lieblingsfarbe": { "type": "noun", "sk": "obľúbená farba", "article": "die", "plural": "die Lieblingsfarben", "cases": { "Nominativ": "die Lieblingsfarbe", "Akkusativ": "die Lieblingsfarbe", "Dativ": "der Lieblingsfarbe", "Genitiv": "der Lieblingsfarbe" }, "example": "Meine Lieblingsfarbe ist Lila.", "exampleSk": "Moja obľúbená farba je fialová." },
            "Dinge": { "type": "noun", "sk": "veci (pl.)", "article": "das", "plural": "die Dinge", "cases": { "Nominativ": "die Dinge", "Akkusativ": "die Dinge", "Dativ": "den Dingen", "Genitiv": "der Dinge" }, "example": "Ich habe viele Dinge in Lila.", "exampleSk": "Mám veľa vecí vo fialovej farbe." },
            "T-Shirt": { "type": "noun", "sk": "tričko", "article": "das", "plural": "die T-Shirts", "cases": { "Nominativ": "das T-Shirt", "Akkusativ": "das T-Shirt", "Dativ": "dem T-Shirt", "Genitiv": "des T-Shirts" }, "example": "Mein T-Shirt ist lila.", "exampleSk": "Moje tričko je fialové." },
            "Rucksack": { "type": "noun", "sk": "ruksak", "article": "der", "plural": "die Rucksäcke", "cases": { "Nominativ": "der Rucksack", "Akkusativ": "den Rucksack", "Dativ": "dem Rucksack", "Genitiv": "des Rucksackes" }, "example": "Ich habe einen Rucksack.", "exampleSk": "Mám ruksak." },
            "Wasserflasche": { "type": "noun", "sk": "fľaša na vodu", "article": "die", "plural": "die Wasserflaschen", "cases": { "Nominativ": "die Wasserflasche", "Akkusativ": "die Wasserflasche", "Dativ": "der Wasserflasche", "Genitiv": "der Wasserflasche" }, "example": "Das ist meine Wasserflasche.", "exampleSk": "To je moja fľaša na vodu." },
            "Buch": { "type": "noun", "sk": "kniha", "article": "das", "plural": "die Bücher", "cases": { "Nominativ": "das Buch", "Akkusativ": "das Buch", "Dativ": "dem Buch", "Genitiv": "des Buches" }, "example": "Ich lese ein Buch.", "exampleSk": "Čítam knihu." },
            "Leben": { "type": "noun", "sk": "život", "article": "das", "plural": "die Leben", "cases": { "Nominativ": "das Leben", "Akkusativ": "das Leben", "Dativ": "dem Leben", "Genitiv": "des Lebens" }, "example": "Ich finde mein Leben schön.", "exampleSk": "Myslím si, že môj život je pekný." },
            "wohnen": { "type": "verb", "sk": "bývať", "infinitiv": "wohnen", "conjugation": { "ich": "wohne", "du": "wohnst", "er/sie/es": "wohnt", "wir": "wohnen", "ihr": "wohnt", "sie": "wohnen" }, "example": "Ich wohne in Wien.", "exampleSk": "Bývam vo Viedni." },
            "kommen": { "type": "verb", "sk": "pochádzať, prísť", "infinitiv": "kommen", "conjugation": { "ich": "komme", "du": "kommst", "er/sie/es": "kommt", "wir": "kommen", "ihr": "kommt", "sie": "kommen" }, "example": "Ich komme aus Österreich.", "exampleSk": "Pochádzam z Rakúska." },
            "spielen": { "type": "verb", "sk": "hrať", "infinitiv": "spielen", "conjugation": { "ich": "spiele", "du": "spielst", "er/sie/es": "spielt", "wir": "spielen", "ihr": "spielt", "sie": "spielen" }, "example": "Ich spiele Klavier.", "exampleSk": "Hrám na klavíri." },
            "lernen": { "type": "verb", "sk": "učiť sa", "infinitiv": "lernen", "conjugation": { "ich": "lerne", "du": "lernst", "er/sie/es": "lernt", "wir": "lernen", "ihr": "lernt", "sie": "lernen" }, "example": "Ich lerne gern Deutsch.", "exampleSk": "Rada sa učím nemčinu." }
        },
        quiz: [
            { type: "open", question: "1. Wie alt ist Sofie?", correctAnswer: ["Sie ist zehn Jahre alt.", "Zehn.", "10", "Sofie ist zehn Jahre alt.", "zehn", "10 Jahre", "zehn Jahre"] },
            { type: "open", question: "2. Wo wohnt sie?", correctAnswer: ["Sie wohnt in Wien.", "In Wien.", "Wien", "In Österreich in Wien."] },
            { type: "open", question: "3. In welche Klasse geht sie?", correctAnswer: ["Sie geht in die vierte Klasse.", "In die vierte Klasse.", "vierte Klasse", "vierte", "4", "4. Klasse"] },
            { type: "open", question: "4. Wie heißt ihre Schwester?", correctAnswer: ["Ihre Schwester heißt Lena.", "Sie heißt Lena.", "Lena"] },
            { type: "open", question: "5. Was spielt Sofie?", correctAnswer: ["Sie spielt Klavier.", "Klavier.", "Sie spielt auch Klavier."] },
            { type: "open", question: "6. Wann hat sie Klavierunterricht?", correctAnswer: ["Am Montag und Donnerstag.", "Montag und Donnerstag", "Am Montag und am Donnerstag"] },
            { type: "open", question: "7. Was ist ihre Lieblingsfarbe?", correctAnswer: ["Ihre Lieblingsfarbe ist Lila.", "Lila."] },
            { type: "open", question: "Zusatzfrage: Spielst du ein Instrument?", correctAnswer: "(Voľná odpoveď: z.B. Ja, ich spiele Gitarre / Nein, ich spiele kein Instrument / Ich spiele Klavier)" },
            { type: "open", question: "Zusatzfrage: Was ist deine Lieblingsfarbe?", correctAnswer: "(Voľná odpoveď: z.B. Meine Lieblingsfarbe ist Rot / Blau / Grün / Lila)" }
        ]
    },
    {
        id: 'story_11',
        title: 'Mein Name ist Amir',
        titleSk: 'Moje meno je Amir',
        cefr: 'A1',
        description: 'Amir z Iránu sa predstavuje, rozpráva o škole v Berlíne a o svojich snoch.',
        sentences: [
            { de: "Hallo, ich heiße Amir.", sk: "Ahoj, volám sa Amir." },
            { de: "Ich bin fünfzehn Jahre alt.", sk: "Mám pätnásť rokov." },
            { de: "Ich komme aus dem Iran und lebe jetzt in Berlin, in Deutschland.", sk: "Pochádzam z Iránu a žijem teraz v Berlíne, v Nemecku." },
            { de: "Ich wohne mit meinen Eltern und meiner Schwester in einer Wohnung.", sk: "Bývam s mojimi rodičmi a so svojou sestrou v byte." },
            { de: "Meine Schwester heißt Leila und sie ist zwölf Jahre alt.", sk: "Moja sestra sa volá Leila a má dvanásť rokov." },
            { de: "Ich bin Schüler und gehe in die neunte Klasse.", sk: "Som žiak a chodím do deviatej triedy." },
            { de: "Meine Schule ist nicht weit von unserem Haus.", sk: "Moja škola nie je ďaleko od nášho domu." },
            { de: "Ich gehe meistens zu Fuß oder fahre mit dem Bus.", sk: "Chodím väčšinou pešo alebo idem autobusom." },
            { de: "Ich lerne gern Deutsch und Mathe.", sk: "Rád sa učím nemčinu a matematiku." },
            { de: "Ich finde Deutsch ein bisschen schwer, aber interessant.", sk: "Myslím si, že nemčina je trochu ťažká, ale zaujímavá." },
            { de: "Ich spreche Persisch mit meiner Familie und Deutsch in der Schule.", sk: "Hovorím s rodinou po perzsky a v škole po nemecky." },
            { de: "Ich habe viele neue Freunde.", sk: "Mám veľa nových priateľov." },
            { de: "Am Nachmittag mache ich meine Hausaufgaben und spiele am Computer.", sk: "Poobede si robím domáce úlohy a hrám sa na počítači." },
            { de: "Ich mag Computerspiele und Technik.", sk: "Mám rád počítačové hry a techniku." },
            { de: "Ich möchte später Informatiker werden.", sk: "Rozhodol som sa stať neskôr informatikom. / Chcem sa neskôr stať informatikom." },
            { de: "Das ist mein Traum.", sk: "To je môj sen." },
            { de: "Ich besuche auch einen Deutschkurs am Samstag.", sk: "V sobotu navštevujem aj kurz nemčiny." },
            { de: "Ich lerne viel und spreche gern mit anderen.", sk: "Veľa sa učím a rád sa rozprávam s ostatnými." }
        ],
        words: {
            "Iran": { "type": "noun", "sk": "Irán", "article": "der", "plural": "-", "cases": { "Nominativ": "der Iran", "Akkusativ": "den Iran", "Dativ": "dem Iran", "Genitiv": "des Irans" }, "example": "Ich komme aus dem Iran.", "exampleSk": "Pochádzam z Iránu." },
            "Berlin": { "type": "noun", "sk": "Berlín", "article": "das", "plural": "-", "cases": { "Nominativ": "Berlin", "Akkusativ": "Berlin", "Dativ": "Berlin", "Genitiv": "Berlins" }, "example": "Ich lebe in Berlin.", "exampleSk": "Žijem v Berlíne." },
            "Deutschland": { "type": "noun", "sk": "Nemecko", "article": "das", "plural": "-", "cases": { "Nominativ": "Deutschland", "Akkusativ": "Deutschland", "Dativ": "Deutschland", "Genitiv": "Deutschlands" }, "example": "Berlin ist in Deutschland.", "exampleSk": "Berlín je v Nemecku." },
            "Eltern": { "type": "noun", "sk": "rodičia", "article": "die", "plural": "die Eltern", "cases": { "Nominativ": "die Eltern", "Akkusativ": "die Eltern", "Dativ": "den Eltern", "Genitiv": "der Eltern" }, "example": "Ich wohne mit meinen Eltern.", "exampleSk": "Bývam so svojimi rodičmi." },
            "Schwester": { "type": "noun", "sk": "sestra", "article": "die", "plural": "die Schwestern", "cases": { "Nominativ": "die Schwester", "Akkusativ": "die Schwester", "Dativ": "der Schwester", "Genitiv": "der Schwester" }, "example": "Ich habe eine Schwester.", "exampleSk": "Mám jednu sestru." },
            "Wohnung": { "type": "noun", "sk": "byt", "article": "die", "plural": "die Wohnungen", "cases": { "Nominativ": "die Wohnung", "Akkusativ": "die Wohnung", "Dativ": "der Wohnung", "Genitiv": "der Wohnung" }, "example": "Wir wohnen in einer Wohnung.", "exampleSk": "Bývame v byte." },
            "Schüler": { "type": "noun", "sk": "žiak", "article": "der", "plural": "die Schüler", "cases": { "Nominativ": "der Schüler", "Akkusativ": "den Schüler", "Dativ": "dem Schüler", "Genitiv": "des Schülers" }, "example": "Ich bin ein Schüler.", "exampleSk": "Som študent/žiak." },
            "Klasse": { "type": "noun", "sk": "trieda", "article": "die", "plural": "die Klassen", "cases": { "Nominativ": "die Klasse", "Akkusativ": "die Klasse", "Dativ": "der Klasse", "Genitiv": "der Klasse" }, "example": "Ich gehe in die neunte Klasse.", "exampleSk": "Chodím do deviatej triedy." },
            "Schule": { "type": "noun", "sk": "škola", "article": "die", "plural": "die Schulen", "cases": { "Nominativ": "die Schule", "Akkusativ": "die Schule", "Dativ": "der Schule", "Genitiv": "der Schule" }, "example": "Meine Schule ist groß.", "exampleSk": "Moja škola je veľká." },
            "Haus": { "type": "noun", "sk": "dom", "article": "das", "plural": "die Häuser", "cases": { "Nominativ": "das Haus", "Akkusativ": "das Haus", "Dativ": "dem Haus", "Genitiv": "des Hauses" }, "example": "Das Haus ist nicht weit.", "exampleSk": "Dom nie je ďaleko." },
            "Fuß": { "type": "noun", "sk": "noha, pešo (zu Fuß)", "article": "der", "plural": "die Füße", "cases": { "Nominativ": "der Fuß", "Akkusativ": "den Fuß", "Dativ": "dem Fuß", "Genitiv": "des Fußes" }, "example": "Ich gehe zu Fuß.", "exampleSk": "Chodím pešo." },
            "Bus": { "type": "noun", "sk": "autobus", "article": "der", "plural": "die Busse", "cases": { "Nominativ": "der Bus", "Akkusativ": "den Bus", "Dativ": "dem Bus", "Genitiv": "des Busses" }, "example": "Ich fahre mit dem Bus.", "exampleSk": "Celstujem autobusom." },
            "Deutsch": { "type": "noun", "sk": "nemčina", "article": "das", "plural": "-", "cases": { "Nominativ": "Deutsch", "Akkusativ": "Deutsch", "Dativ": "Deutsch", "Genitiv": "Deutschs" }, "example": "Ich lerne gern Deutsch.", "exampleSk": "Rád sa učím nemčinu." },
            "Mathe": { "type": "noun", "sk": "matematika", "article": "die", "plural": "-", "cases": { "Nominativ": "die Mathe", "Akkusativ": "die Mathe", "Dativ": "der Mathe", "Genitiv": "der Mathe" }, "example": "Ich lerne Mathe.", "exampleSk": "Učím sa matematiku." },
            "Persisch": { "type": "noun", "sk": "perzština", "article": "das", "plural": "-", "cases": { "Nominativ": "Persisch", "Akkusativ": "Persisch", "Dativ": "Persisch", "Genitiv": "Persischs" }, "example": "Ich spreche Persisch.", "exampleSk": "Hovorím plynulo perzsky." },
            "Familie": { "type": "noun", "sk": "rodina", "article": "die", "plural": "die Familien", "cases": { "Nominativ": "die Familie", "Akkusativ": "die Familie", "Dativ": "der Familie", "Genitiv": "der Familie" }, "example": "Ich bin bei meiner Familie.", "exampleSk": "Som so svojou rodinou." },
            "Freunde": { "type": "noun", "sk": "priatelia/kamarát", "article": "der", "plural": "die Freunde", "cases": { "Nominativ": "der Freund", "Akkusativ": "den Freund", "Dativ": "dem Freund", "Genitiv": "des Freundes" }, "example": "Ich habe viele Freunde.", "exampleSk": "Mám veľa kamarátov." },
            "Nachmittag": { "type": "noun", "sk": "poobedie", "article": "der", "plural": "die Nachmittage", "cases": { "Nominativ": "der Nachmittag", "Akkusativ": "den Nachmittag", "Dativ": "dem Nachmittag", "Genitiv": "des Nachmittags" }, "example": "Am Nachmittag mache ich Hausaufgaben.", "exampleSk": "Poobede robím domáce úlohy." },
            "Hausaufgaben": { "type": "noun", "sk": "domáce úlohy", "article": "die", "plural": "die Hausaufgaben", "cases": { "Nominativ": "die Hausaufgabe", "Akkusativ": "die Hausaufgabe", "Dativ": "der Hausaufgabe", "Genitiv": "der Hausaufgabe" }, "example": "Ich mache meine Hausaufgaben.", "exampleSk": "Robím si domáce úlohy." },
            "Computer": { "type": "noun", "sk": "počítač", "article": "der", "plural": "die Computer", "cases": { "Nominativ": "der Computer", "Akkusativ": "den Computer", "Dativ": "dem Computer", "Genitiv": "des Computers" }, "example": "Ich spiele am Computer.", "exampleSk": "Hrám sa na počítači." },
            "Computerspiele": { "type": "noun", "sk": "počítačové hry", "article": "das", "plural": "die Computerspiele", "cases": { "Nominativ": "das Computerspiel", "Akkusativ": "das Computerspiel", "Dativ": "dem Computerspiel", "Genitiv": "des Computerspiels" }, "example": "Ich mag Computerspiele.", "exampleSk": "Mám rád počítačové hry." },
            "Technik": { "type": "noun", "sk": "technika", "article": "die", "plural": "die Techniken", "cases": { "Nominativ": "die Technik", "Akkusativ": "die Technik", "Dativ": "der Technik", "Genitiv": "der Technik" }, "example": "Ich mag Technik.", "exampleSk": "Mám rád techniku." },
            "Informatiker": { "type": "noun", "sk": "informatik", "article": "der", "plural": "die Informatiker", "cases": { "Nominativ": "der Informatiker", "Akkusativ": "den Informatiker", "Dativ": "dem Informatiker", "Genitiv": "des Informatikers" }, "example": "Ich möchte Informatiker werden.", "exampleSk": "Chcem sa stať informatikom." },
            "Traum": { "type": "noun", "sk": "sen", "article": "der", "plural": "die Träume", "cases": { "Nominativ": "der Traum", "Akkusativ": "den Traum", "Dativ": "dem Traum", "Genitiv": "des Traums" }, "example": "Das ist mein Traum.", "exampleSk": "To je môj sen." },
            "Deutschkurs": { "type": "noun", "sk": "kurz nemčiny", "article": "der", "plural": "die Deutschkurse", "cases": { "Nominativ": "der Deutschkurs", "Akkusativ": "den Deutschkurs", "Dativ": "dem Deutschkurs", "Genitiv": "des Deutschkurses" }, "example": "Ich besuche einen Deutschkurs.", "exampleSk": "Navštevujem kurz nemčiny." },
            "Samstag": { "type": "noun", "sk": "sobota", "article": "der", "plural": "die Samstage", "cases": { "Nominativ": "der Samstag", "Akkusativ": "den Samstag", "Dativ": "dem Samstag", "Genitiv": "des Samstags" }, "example": "Am Samstag habe ich frei.", "exampleSk": "V sobotu mám voľno." },
            "leben": { "type": "verb", "sk": "žiť", "infinitiv": "leben", "conjugation": { "ich": "lebe", "du": "lebst", "er/sie/es": "lebt", "wir": "leben", "ihr": "lebt", "sie": "leben" }, "example": "Ich lebe in Berlin.", "exampleSk": "Žijem v Berlíne." },
            "gehen": { "type": "verb", "sk": "ísť/kráčať", "infinitiv": "gehen", "conjugation": { "ich": "gehe", "du": "gehst", "er/sie/es": "geht", "wir": "gehen", "ihr": "geht", "sie": "gehen" }, "example": "Ich gehe zu Fuß.", "exampleSk": "Chodím pešo." },
            "fahren": { "type": "verb", "sk": "jazdiť, viesť sa", "infinitiv": "fahren", "conjugation": { "ich": "fahre", "du": "fährst", "er/sie/es": "fährt", "wir": "fahren", "ihr": "fahrt", "sie": "fahren" }, "example": "Ich fahre mit dem Bus.", "exampleSk": "Idem autobusom." },
            "finden": { "type": "verb", "sk": "nájsť, myslieť si", "infinitiv": "finden", "conjugation": { "ich": "finde", "du": "findest", "er/sie/es": "findet", "wir": "finden", "ihr": "findet", "sie": "finden" }, "example": "Ich finde Deutsch schwer.", "exampleSk": "Myslím, že nemčina je ťažká." },
            "machen": { "type": "verb", "sk": "robiť", "infinitiv": "machen", "conjugation": { "ich": "mache", "du": "machst", "er/sie/es": "macht", "wir": "machen", "ihr": "macht", "sie": "machen" }, "example": "Ich mache meine Hausaufgaben.", "exampleSk": "Robím si domáce úlohy." },
            "spielen": { "type": "verb", "sk": "hrať sa", "infinitiv": "spielen", "conjugation": { "ich": "spiele", "du": "spielst", "er/sie/es": "spielt", "wir": "spielen", "ihr": "spielt", "sie": "spielen" }, "example": "Ich spiele am Computer.", "exampleSk": "Hrám sa na počítači." },
            "werden": { "type": "verb", "sk": "stať sa, budem (fut.)", "infinitiv": "werden", "conjugation": { "ich": "werde", "du": "wirst", "er/sie/es": "wird", "wir": "werden", "ihr": "werdet", "sie": "werden" }, "example": "Ich möchte Informatiker werden.", "exampleSk": "Chcem sa stať informatikom." },
            "besuchen": { "type": "verb", "sk": "navštevovať", "infinitiv": "besuchen", "conjugation": { "ich": "besuche", "du": "besuchst", "er/sie/es": "besucht", "wir": "besuchen", "ihr": "besucht", "sie": "besuchen" }, "example": "Ich besuche einen Kurs.", "exampleSk": "Navštevujem kurz." },
            "sprechen": { "type": "verb", "sk": "hovoriť, rozprávať", "infinitiv": "sprechen", "conjugation": { "ich": "spreche", "du": "sprichst", "er/sie/es": "spricht", "wir": "sprechen", "ihr": "sprecht", "sie": "sprechen" }, "example": "Ich spreche Persisch.", "exampleSk": "Hovorím perzsky." },
            "lernen": { "type": "verb", "sk": "učiť sa", "infinitiv": "lernen", "conjugation": { "ich": "lerne", "du": "lernst", "er/sie/es": "lernt", "wir": "lernen", "ihr": "lernt", "sie": "lernen" }, "example": "Ich lerne viel.", "exampleSk": "Veľa sa učím." }
        },
        quiz: [
            { type: "open", question: "1. Wie alt ist Amir?", correctAnswer: ["Er ist fünfzehn Jahre alt.", "fünfzehn", "15", "15 Jahre", "Er ist 15."] },
            { type: "open", question: "2. Wo wohnt Amir?", correctAnswer: ["Er wohnt in Berlin.", "In Berlin.", "Berlin", "In Berlin in Deutschland."] },
            { type: "open", question: "3. Mit wem wohnt er?", correctAnswer: ["Mit seinen Eltern und seiner Schwester.", "Mit den Eltern und der Schwester.", "Eltern und Schwester", "Mit seiner Schwester und seinen Eltern.", "Mit seiner Familie."] },
            { type: "open", question: "4. In welche Klasse geht Amir?", correctAnswer: ["In die neunte Klasse.", "In die 9. Klasse.", "neunte Klasse", "9. Klasse", "neunte", "9"] },
            { type: "open", question: "5. Welche Sprachen spricht Amir?", correctAnswer: ["Persisch und Deutsch.", "Er spricht Persisch und Deutsch.", "Deutsch und Persisch.", "Persisch, Deutsch"] },
            { type: "open", question: "6. Was macht er am Nachmittag?", correctAnswer: ["Er macht Hausaufgaben und spielt am Computer.", "Hausaufgaben machen und Computer spielen.", "Er spielt am Computer und macht Hausaufgaben.", "Hausaufgaben und Computer."] },
            { type: "open", question: "7. Was möchte Amir später werden?", correctAnswer: ["Er möchte Informatiker werden.", "Informatiker werden.", "Informatiker", "Er wird Informatiker."] },
            { type: "open", question: "Zusatzfrage: Was ist dein Traum?", correctAnswer: "(Voľná odpoveď: z.B. Mein Traum ist Arzt zu werden / Ich möchte viel reisen)" },
            { type: "open", question: "Zusatzfrage: Besuchst du einen Kurs oder eine Schule?", correctAnswer: "(Voľná odpoveď: z.B. Ja, ich besuche einen Deutschkurs / Nein, ich arbeite schon)" }
        ]
    },
    {
        id: 'story_12',
        title: 'Ich heiße Lukas',
        titleSk: 'Volám sa Lukas',
        cefr: 'A1',
        description: 'Lukas z Poľska študuje medicínu v Lipsku, pracuje ako čašník a hovorí o svojich snoch plných biológie a zdravia.',
        sentences: [
            { de: "Ich heiße Lukas.", sk: "Volám sa Lukas." },
            { de: "Ich bin 22 Jahre alt und komme aus Polen.", sk: "Mám 22 rokov a pochádzam z Poľska." },
            { de: "Jetzt wohne ich in Leipzig, in Deutschland.", sk: "Teraz bývam v Lipsku, v Nemecku." },
            { de: "Ich bin Student und studiere Medizin an der Universität Leipzig.", sk: "Som študent a študujem medicínu na Lipská univerzite." },
            { de: "Das Studium ist interessant, aber auch schwer.", sk: "Štúdium je zaujímavé, ale aj ťažké." },
            { de: "Ich arbeite als Kellner in einem kleinen Café.", sk: "Pracujem ako čašník v malej kaviarni." },
            { de: "Ich arbeite dort am Wochenende und manchmal am Abend.", sk: "Pracujem tam cez víkend a niekedy večer." },
            { de: "Ich brauche das Geld für mein Studium und meine Wohnung.", sk: "Potrebujem peniaze na moje štúdium a môj byt." },
            { de: "Ich wohne mit einem Freund in einer WG.", sk: "Bývam s kamarátom v zdieľanom byte (WG - Wohngemeinschaft)." },
            { de: "Meine Freundin heißt Anna.", sk: "Moja priateľka sa volá Anna." },
            { de: "Sie studiert auch, aber sie studiert Biologie.", sk: "Ona tiež študuje, ale študuje biológiu." },
            { de: "In meiner Freizeit lese ich gern oder höre Musik.", sk: "Vo svojom voľnom čase si rád čítam alebo počúvam hudbu." },
            { de: "Ich mag auch Spaziergänge im Park.", sk: "Mám rád aj prechádzky v parku." },
            { de: "Mein Traum ist: Ich möchte Arzt werden.", sk: "Môj sen je: Chcem sa stať lekárom." },
            { de: "Ich helfe gern Menschen und interessiere mich für Gesundheit.", sk: "Rád pomáham ľuďom a zaujímam sa o zdravie." },
            { de: "Ich finde mein Leben spannend und gut.", sk: "Myslím si, že môj život je napínavý a dobrý." }
        ],
        words: {
            "Polen": { "type": "noun", "sk": "Poľsko", "article": "das", "plural": "-", "cases": { "Nominativ": "Polen", "Akkusativ": "Polen", "Dativ": "Polen", "Genitiv": "Polens" }, "example": "Ich komme aus Polen.", "exampleSk": "Pochádzam z Poľska." },
            "Leipzig": { "type": "noun", "sk": "Lipsko", "article": "das", "plural": "-", "cases": { "Nominativ": "Leipzig", "Akkusativ": "Leipzig", "Dativ": "Leipzig", "Genitiv": "Leipzigs" }, "example": "Ich wohne in Leipzig.", "exampleSk": "Bývam v Lipsku." },
            "Student": { "type": "noun", "sk": "študent", "article": "der", "plural": "die Studenten", "cases": { "Nominativ": "der Student", "Akkusativ": "den Studenten", "Dativ": "dem Studenten", "Genitiv": "des Studenten" }, "example": "Ich bin Student.", "exampleSk": "Som študent." },
            "Medizin": { "type": "noun", "sk": "medicína", "article": "die", "plural": "-", "cases": { "Nominativ": "die Medizin", "Akkusativ": "die Medizin", "Dativ": "der Medizin", "Genitiv": "der Medizin" }, "example": "Ich studiere Medizin.", "exampleSk": "Študujem medicínu." },
            "Universität": { "type": "noun", "sk": "univerzita", "article": "die", "plural": "die Universitäten", "cases": { "Nominativ": "die Universität", "Akkusativ": "die Universität", "Dativ": "der Universität", "Genitiv": "der Universität" }, "example": "Er lernt an der Universität.", "exampleSk": "Učí sa na univerzite." },
            "Studium": { "type": "noun", "sk": "štúdium", "article": "das", "plural": "die Studien", "cases": { "Nominativ": "das Studium", "Akkusativ": "das Studium", "Dativ": "dem Studium", "Genitiv": "des Studiums" }, "example": "Das Studium ist schwer.", "exampleSk": "Štúdium je ťažké." },
            "Kellner": { "type": "noun", "sk": "čašník", "article": "der", "plural": "die Kellner", "cases": { "Nominativ": "der Kellner", "Akkusativ": "den Kellner", "Dativ": "dem Kellner", "Genitiv": "des Kellners" }, "example": "Ich arbeite als Kellner.", "exampleSk": "Pracujem ako čašník." },
            "Café": { "type": "noun", "sk": "kaviareň", "article": "das", "plural": "die Cafés", "cases": { "Nominativ": "das Café", "Akkusativ": "das Café", "Dativ": "dem Café", "Genitiv": "des Cafés" }, "example": "Ich bin in einem Café.", "exampleSk": "Som v kaviarni." },
            "Wochenende": { "type": "noun", "sk": "víkend", "article": "das", "plural": "die Wochenenden", "cases": { "Nominativ": "das Wochenende", "Akkusativ": "das Wochenende", "Dativ": "dem Wochenende", "Genitiv": "des Wochenendes" }, "example": "Am Wochenende arbeite ich.", "exampleSk": "Cez víkend pracujem." },
            "Abend": { "type": "noun", "sk": "večer", "article": "der", "plural": "die Abende", "cases": { "Nominativ": "der Abend", "Akkusativ": "den Abend", "Dativ": "dem Abend", "Genitiv": "des Abends" }, "example": "Manchmal arbeite ich am Abend.", "exampleSk": "Niekedy pracujem večer." },
            "Geld": { "type": "noun", "sk": "peniaze", "article": "das", "plural": "die Gelder", "cases": { "Nominativ": "das Geld", "Akkusativ": "das Geld", "Dativ": "dem Geld", "Genitiv": "des Geldes" }, "example": "Ich brauche Geld.", "exampleSk": "Potrebujem peniaze." },
            "Freund": { "type": "noun", "sk": "priateľ / kamarát", "article": "der", "plural": "die Freunde", "cases": { "Nominativ": "der Freund", "Akkusativ": "den Freund", "Dativ": "dem Freund", "Genitiv": "des Freundes" }, "example": "Er ist ein guter Freund.", "exampleSk": " ऑन je dobrý priateľ." },
            "WG": { "type": "noun", "sk": "zdieľané bývanie / privát", "article": "die", "plural": "die WGs", "cases": { "Nominativ": "die WG", "Akkusativ": "die WG", "Dativ": "der WG", "Genitiv": "der WG" }, "example": "Ich wohne in einer WG.", "exampleSk": "Bývam v priváte." },
            "Freundin": { "type": "noun", "sk": "priateľka", "article": "die", "plural": "die Freundinnen", "cases": { "Nominativ": "die Freundin", "Akkusativ": "die Freundin", "Dativ": "der Freundin", "Genitiv": "der Freundin" }, "example": "Meine Freundin heißt Anna.", "exampleSk": "Moja priateľka sa volá Anna." },
            "Biologie": { "type": "noun", "sk": "biológia", "article": "die", "plural": "-", "cases": { "Nominativ": "die Biologie", "Akkusativ": "die Biologie", "Dativ": "der Biologie", "Genitiv": "der Biologie" }, "example": "Sie studiert Biologie.", "exampleSk": "Ona študuje biológiu." },
            "Freizeit": { "type": "noun", "sk": "voľný čas", "article": "die", "plural": "die Freizeiten", "cases": { "Nominativ": "die Freizeit", "Akkusativ": "die Freizeit", "Dativ": "der Freizeit", "Genitiv": "der Freizeit" }, "example": "In meiner Freizeit lese ich.", "exampleSk": "Vo svojom voľnom čase čítam." },
            "Spaziergänge": { "type": "noun", "sk": "prechádzky", "article": "der", "plural": "die Spaziergänge", "cases": { "Nominativ": "der Spaziergang", "Akkusativ": "den Spaziergang", "Dativ": "dem Spaziergang", "Genitiv": "des Spazierganges" }, "example": "Ich mag Spaziergänge.", "exampleSk": "Mám rád prechádzky." },
            "Park": { "type": "noun", "sk": "park", "article": "der", "plural": "die Parks", "cases": { "Nominativ": "der Park", "Akkusativ": "den Park", "Dativ": "dem Park", "Genitiv": "des Parks" }, "example": "Ich gehe im Park.", "exampleSk": "Idem do parku." },
            "Arzt": { "type": "noun", "sk": "lekár", "article": "der", "plural": "die Ärzte", "cases": { "Nominativ": "der Arzt", "Akkusativ": "den Arzt", "Dativ": "dem Arzt", "Genitiv": "des Arztes" }, "example": "Ich möchte Arzt werden.", "exampleSk": "Chcem sa stať lekárom." },
            "Menschen": { "type": "noun", "sk": "ľudia", "article": "der", "plural": "die Menschen", "cases": { "Nominativ": "der Mensch", "Akkusativ": "den Menschen", "Dativ": "dem Menschen", "Genitiv": "des Menschen" }, "example": "Ich helfe Menschen.", "exampleSk": "Pomáham ľuďom." },
            "Gesundheit": { "type": "noun", "sk": "zdravie", "article": "die", "plural": "-", "cases": { "Nominativ": "die Gesundheit", "Akkusativ": "die Gesundheit", "Dativ": "der Gesundheit", "Genitiv": "der Gesundheit" }, "example": "Gesundheit ist wichtig.", "exampleSk": "Zdravie je dôležité." },
            "studieren": { "type": "verb", "sk": "študovať", "infinitiv": "studieren", "conjugation": { "ich": "studiere", "du": "studierst", "er/sie/es": "studiert", "wir": "studieren", "ihr": "studiert", "sie": "studieren" }, "example": "Ich studiere Medizin.", "exampleSk": "Študujem medicínu." },
            "arbeiten": { "type": "verb", "sk": "pracovať", "infinitiv": "arbeiten", "conjugation": { "ich": "arbeite", "du": "arbeitest", "er/sie/es": "arbeitet", "wir": "arbeiten", "ihr": "arbeitet", "sie": "arbeiten" }, "example": "Ich arbeite am Abend.", "exampleSk": "Pracujem večer." },
            "brauchen": { "type": "verb", "sk": "potrebovať", "infinitiv": "brauchen", "conjugation": { "ich": "brauche", "du": "brauchst", "er/sie/es": "braucht", "wir": "brauchen", "ihr": "braucht", "sie": "brauchen" }, "example": "Ich brauche das Geld.", "exampleSk": "Potrebujem tie peniaze." },
            "hören": { "type": "verb", "sk": "počuť, počúvať", "infinitiv": "hören", "conjugation": { "ich": "höre", "du": "hörst", "er/sie/es": "hört", "wir": "hören", "ihr": "hört", "sie": "hören" }, "example": "Ich höre Musik.", "exampleSk": "Počúvam hudbu." },
            "helfen": { "type": "verb", "sk": "pomáhať", "infinitiv": "helfen", "conjugation": { "ich": "helfe", "du": "hilfst", "er/sie/es": "hilft", "wir": "helfen", "ihr": "helft", "sie": "helfen" }, "example": "Ich helfe gern.", "exampleSk": "Rád pomáham." },
            "interessieren": { "type": "verb", "sk": "zaujímať sa", "infinitiv": "interessieren", "conjugation": { "ich": "interessiere mich", "du": "interessierst dich", "er/sie/es": "interessiert sich", "wir": "interessieren uns", "ihr": "interessiert euch", "sie": "interessieren sich" }, "example": "Ich interessiere mich für Medizin.", "exampleSk": "Zaujímam sa o medicínu." }
        },
        quiz: [
            { type: "open", question: "1. Wie alt ist Lukas?", correctAnswer: ["Er ist 22 Jahre alt.", "22", "zweiundzwanzig", "zweiundzwanzig Jahre alt", "Er ist 22."] },
            { type: "open", question: "2. Wo wohnt er?", correctAnswer: ["Er wohnt in Leipzig.", "In Leipzig.", "Leipzig", "In Deutschland, in Leipzig."] },
            { type: "open", question: "3. Was studiert Lukas?", correctAnswer: ["Er studiert Medizin.", "Medizin", "Medizin an der Universität Leipzig."] },
            { type: "open", question: "4. Wo arbeitet Lukas?", correctAnswer: ["Er arbeitet in einem kleinen Café.", "In einem Café.", "Als Kellner in einem Café.", "Café", "In einem kleinen Café."] },
            { type: "open", question: "5. Mit wem wohnt Lukas?", correctAnswer: ["Mit einem Freund.", "Mit einem Freund in einer WG.", "Er wohnt mit einem Freund.", "In einer WG mit einem Freund."] },
            { type: "open", question: "6. Was macht Lukas in seiner Freizeit?", correctAnswer: ["Er liest gern oder hört Musik.", "Lesen und Musik hören.", "Er mag Spaziergänge im Park.", "Lesen, Musik hören, Spaziergänge."] },
            { type: "open", question: "7. Was ist sein Traum?", correctAnswer: ["Sein Traum ist Arzt zu werden.", "Er möchte Arzt werden.", "Arzt werden.", "Arzt."] },
            { type: "open", question: "Zusatzfrage: Was studierst du oder was möchtest du später machen?", correctAnswer: "(Voľná odpoveď: z.B. Ich studiere BWL / Ich bin schon fertig / Ich arbeite)" },
            { type: "open", question: "Zusatzfrage: Arbeitest du auch neben der Schule oder dem Studium?", correctAnswer: "(Voľná odpoveď: z.B. Ja, ich arbeite als Verkäufer / Nein, ich habe keine Zeit)" }
        ]
    },
    {
        id: 'story_13',
        title: 'Ich bin Emilia',
        titleSk: 'Ja som Emilia',
        cefr: 'A1',
        description: 'Emilia z Talianska rozpráva o svojom živote v Mníchove, práci v supermarkete a voľnom čase.',
        sentences: [
            { de: "Hallo, ich heiße Emilia.", sk: "Ahoj, volám sa Emilia." },
            { de: "Ich bin 24 Jahre alt und komme aus Italien.", sk: "Mám 24 rokov a pochádzam z Talianska." },
            { de: "Jetzt lebe ich in München.", sk: "Teraz žijem v Mníchove." },
            { de: "Ich wohne dort mit meiner Mitbewohnerin in einer kleinen Wohnung.", sk: "Bývam tam so svojou spolubývajúcou v malom byte." },
            { de: "Ich arbeite im Supermarkt.", sk: "Pracujem v supermarkete." },
            { de: "Ich bin Verkäuferin.", sk: "Som predavačka." },
            { de: "Ich arbeite jeden Tag von 8 bis 16 Uhr.", sk: "Pracujem každý deň od 8 do 16 hodín." },
            { de: "Manchmal ist es stressig, aber ich mag meine Arbeit.", sk: "Niekedy je to stresujúce, ale mám svoju prácu rada." },
            { de: "Ich spreche mit vielen Kunden und helfe gern.", sk: "Rozprávam sa s mnohými zákazníkmi a rada pomáham." },
            { de: "Nach der Arbeit bin ich oft müde.", sk: "Po práci som často unavená." },
            { de: "Aber ich koche gern italienisches Essen.", sk: "Ale rada varím talianske jedlo." },
            { de: "Meine Mitbewohnerin liebt meine Pasta!", sk: "Moja spolubývajúca miluje moje cestoviny (pastu)!" },
            { de: "Wir essen zusammen und sprechen über unseren Tag.", sk: "Jeme spolu a rozprávame sa o našom dni." },
            { de: "Am Abend sehe ich gern Serien.", sk: "Večer rada pozerám seriály." },
            { de: "Meine Lieblingsserie ist eine Komödie.", sk: "Môj obľúbený seriál je komédia." },
            { de: "Am Wochenende gehe ich spazieren oder treffe meine Freunde im Park.", sk: "Cez víkend sa chodím prechádzať alebo sa stretávam s priateľmi v parku." },
            { de: "Ich liebe den Sommer in München!", sk: "Milujem leto v Mníchove!" }
        ],
        words: {
            "Italien": { "type": "noun", "sk": "Taliansko", "article": "das", "plural": "-", "cases": { "Nominativ": "Italien", "Akkusativ": "Italien", "Dativ": "Italien", "Genitiv": "Italiens" }, "example": "Ich komme aus Italien.", "exampleSk": "Pochádzam z Talianska." },
            "München": { "type": "noun", "sk": "Mníchov", "article": "-", "plural": "-", "cases": { "Nominativ": "München", "Akkusativ": "München", "Dativ": "München", "Genitiv": "Münchens" }, "example": "Ich lebe in München.", "exampleSk": "Žijem v Mníchove." },
            "Mitbewohnerin": { "type": "noun", "sk": "spolubývajúca", "article": "die", "plural": "die Mitbewohnerinnen", "cases": { "Nominativ": "die Mitbewohnerin", "Akkusativ": "die Mitbewohnerin", "Dativ": "der Mitbewohnerin", "Genitiv": "der Mitbewohnerin" }, "example": "Ich wohne mit meiner Mitbewohnerin.", "exampleSk": "Bývam s mojou spolubývajúcou." },
            "Supermarkt": { "type": "noun", "sk": "supermarket", "article": "der", "plural": "die Supermärkte", "cases": { "Nominativ": "der Supermarkt", "Akkusativ": "den Supermarkt", "Dativ": "dem Supermarkt", "Genitiv": "des Supermarktes" }, "example": "Ich arbeite im Supermarkt.", "exampleSk": "Pracujem v supermarkete." },
            "Verkäuferin": { "type": "noun", "sk": "predavačka", "article": "die", "plural": "die Verkäuferinnen", "cases": { "Nominativ": "die Verkäuferin", "Akkusativ": "die Verkäuferin", "Dativ": "der Verkäuferin", "Genitiv": "der Verkäuferin" }, "example": "Sie ist Verkäuferin.", "exampleSk": "Ona je predavačka." },
            "Tag": { "type": "noun", "sk": "deň", "article": "der", "plural": "die Tage", "cases": { "Nominativ": "der Tag", "Akkusativ": "den Tag", "Dativ": "dem Tag", "Genitiv": "des Tages" }, "example": "Ich arbeite jeden Tag.", "exampleSk": "Pracujem každý deň." },
            "Arbeit": { "type": "noun", "sk": "práca", "article": "die", "plural": "die Arbeiten", "cases": { "Nominativ": "die Arbeit", "Akkusativ": "die Arbeit", "Dativ": "der Arbeit", "Genitiv": "der Arbeit" }, "example": "Ich mag meine Arbeit.", "exampleSk": "Mám rád svoju prácu." },
            "Kunden": { "type": "noun", "sk": "zákazníci", "article": "der", "plural": "die Kunden", "cases": { "Nominativ": "der Kunde", "Akkusativ": "den Kunden", "Dativ": "dem Kunden", "Genitiv": "des Kunden" }, "example": "Ich spreche mit vielen Kunden.", "exampleSk": "Hovorím s mnohými zákazníkmi." },
            "Essen": { "type": "noun", "sk": "jedlo / jedenie", "article": "das", "plural": "die Essen", "cases": { "Nominativ": "das Essen", "Akkusativ": "das Essen", "Dativ": "dem Essen", "Genitiv": "des Essens" }, "example": "Ich koche gern Essen.", "exampleSk": "Rada varím jedlo." },
            "Pasta": { "type": "noun", "sk": "cestoviny (pasta)", "article": "die", "plural": "-", "cases": { "Nominativ": "die Pasta", "Akkusativ": "die Pasta", "Dativ": "der Pasta", "Genitiv": "der Pasta" }, "example": "Sie liebt meine Pasta.", "exampleSk": "Ona miluje moje cestoviny." },
            "Serie": { "type": "noun", "sk": "seriál", "article": "die", "plural": "die Serien", "cases": { "Nominativ": "die Serie", "Akkusativ": "die Serie", "Dativ": "der Serie", "Genitiv": "der Serie" }, "example": "Ich sehe gern Serien.", "exampleSk": "Rad/a sledujem seriály." },
            "Lieblingsserie": { "type": "noun", "sk": "obľúbený seriál", "article": "die", "plural": "die Lieblingsserien", "cases": { "Nominativ": "die Lieblingsserie", "Akkusativ": "die Lieblingsserie", "Dativ": "der Lieblingsserie", "Genitiv": "der Lieblingsserie" }, "example": "Meine Lieblingsserie ist lustig.", "exampleSk": "Môj obľúbený seriál je vtipný." },
            "Komödie": { "type": "noun", "sk": "komédia", "article": "die", "plural": "die Komödien", "cases": { "Nominativ": "die Komödie", "Akkusativ": "die Komödie", "Dativ": "der Komödie", "Genitiv": "der Komödie" }, "example": "Es ist eine Komödie.", "exampleSk": "Je to komédia." },
            "Sommer": { "type": "noun", "sk": "leto", "article": "der", "plural": "die Sommer", "cases": { "Nominativ": "der Sommer", "Akkusativ": "den Sommer", "Dativ": "dem Sommer", "Genitiv": "des Sommers" }, "example": "Ich liebe den Sommer.", "exampleSk": "Milujem leto." },
            "arbeiten": { "type": "verb", "sk": "pracovať", "infinitiv": "arbeiten", "conjugation": { "ich": "arbeite", "du": "arbeitest", "er/sie/es": "arbeitet", "wir": "arbeiten", "ihr": "arbeitet", "sie": "arbeiten" }, "example": "Ich arbeite im Supermarkt.", "exampleSk": "Pracujem v supermarkete." },
            "kochen": { "type": "verb", "sk": "variť", "infinitiv": "kochen", "conjugation": { "ich": "koche", "du": "kochst", "er/sie/es": "kocht", "wir": "kochen", "ihr": "kocht", "sie": "kochen" }, "example": "Ich koche gern.", "exampleSk": "Rada varím." },
            "lieben": { "type": "verb", "sk": "milovať", "infinitiv": "lieben", "conjugation": { "ich": "liebe", "du": "liebst", "er/sie/es": "liebt", "wir": "lieben", "ihr": "liebt", "sie": "lieben" }, "example": "Ich liebe meine Pasta.", "exampleSk": "Milujem svoje cestoviny." },
            "sehen": { "type": "verb", "sk": "vidieť, pozerať", "infinitiv": "sehen", "conjugation": { "ich": "sehe", "du": "siehst", "er/sie/es": "sieht", "wir": "sehen", "ihr": "seht", "sie": "sehen" }, "example": "Ich sehe am Abend Serien.", "exampleSk": "Večer pozerám seriály." },
            "treffen": { "type": "verb", "sk": "stretnúť (sa)", "infinitiv": "treffen", "conjugation": { "ich": "treffe", "du": "triffst", "er/sie/es": "trifft", "wir": "treffen", "ihr": "trefft", "sie": "treffen" }, "example": "Ich treffe meine Freunde.", "exampleSk": "Stretávam svojich priateľov." },
            "müde": { "type": "adjective", "sk": "unavený", "example": "Ich bin oft müde.", "exampleSk": "Som často l'unavená." }
        },
        quiz: [
            { type: "open", question: "1. Wie alt ist Emilia?", correctAnswer: ["Sie ist 24 Jahre alt.", "24", "vierundzwanzig", "vierundzwanzig Jahre alt", "Sie ist 24."] },
            { type: "open", question: "2. Wo wohnt sie?", correctAnswer: ["Sie wohnt in München.", "In München.", "München", "In einer Wohnung in München."] },
            { type: "open", question: "3. Was ist Emilias Beruf?", correctAnswer: ["Sie ist Verkäuferin.", "Verkäuferin", "Verkäuferin im Supermarkt.", "Sie arbeitet als Verkäuferin im Supermarkt."] },
            { type: "open", question: "4. Wann arbeitet sie?", correctAnswer: ["Jeden Tag von 8 bis 16 Uhr.", "Von 8 bis 16 Uhr.", "Jeden Tag.", "Jeden Tag von acht bis sechzehn Uhr."] },
            { type: "open", question: "5. Was macht sie nach der Arbeit?", correctAnswer: ["Sie kocht gern.", "Sie kocht gern italienisches Essen.", "Kochen", "Essen kochen."] },
            { type: "open", question: "6. Was ist ihre Lieblingsserie?", correctAnswer: ["Eine Komödie.", "Ihre Lieblingsserie ist eine Komödie.", "Komödie"] },
            { type: "open", question: "7. Was macht sie am Wochenende?", correctAnswer: ["Sie geht spazieren oder trifft Freunde im Park.", "Sie trifft ihre Freunde.", "Sie geht spazieren.", "Spazieren gehen und Freunde treffen."] },
            { type: "open", question: "Zusatzfrage: Arbeitest du? Wenn ja – wo?", correctAnswer: "(Voľná odpoveď: z.B. Ja, ich arbeite im Büro / Nein, ich bin Student)" },
            { type: "open", question: "Zusatzfrage: Was machst du nach der Arbeit oder nach der Schule?", correctAnswer: "(Voľná odpoveď: z.B. Ich gehe ins Fitnessstudio / Ich spiele Computerspiele / Ich lese ein Buch)" }
        ]
    },
    {
        id: 'story_14',
        title: 'Mein Name ist Thomas',
        titleSk: 'Volám sa Thomas',
        cefr: 'A1',
        description: 'Thomas je inžinier z Hamburgu, rozpráva o svojej rodine, bicyklovaní do práce a svojom sne cestovať.',
        sentences: [
            { de: "Ich heiße Thomas und ich bin 45 Jahre alt.", sk: "Volám sa Thomas a mám 45 rokov." },
            { de: "Ich komme aus Deutschland und lebe in Hamburg.", sk: "Pochádzam z Nemecka a žijem v Hamburgu." },
            { de: "Ich bin Ingenieur und arbeite in einer großen Firma.", sk: "Som inžinier a pracujem vo veľkej firme." },
            { de: "Ich fahre jeden Tag mit dem Fahrrad zur Arbeit.", sk: "Každý deň jazdím do práce na bicykli." },
            { de: "Das ist gesund und schnell.", sk: "To je zdravé a rýchle." },
            { de: "Ich bin verheiratet und habe zwei Kinder.", sk: "Som ženatý a mám dve deti." },
            { de: "Mein Sohn heißt Paul und ist 14 Jahre alt.", sk: "Môj syn sa volá Paul a má 14 rokov." },
            { de: "Meine Tochter heißt Nina und ist 11.", sk: "Moja dcéra sa volá Nina a má 11." },
            { de: "Wir wohnen in einem Haus mit Garten in einem ruhigen Stadtteil.", sk: "Bývame v dome so záhradou v pokojnej štvrti." },
            { de: "Nach der Arbeit verbringe ich gern Zeit mit meiner Familie.", sk: "Po práci rád trávim čas so svojou rodinou." },
            { de: "Am Abend essen wir zusammen und sprechen über den Tag.", sk: "Večer spolu jeme a rozprávame sa o celom dni." },
            { de: "Am Wochenende machen wir oft Ausflüge.", sk: "Cez víkend robievame často výlety." },
            { de: "Wir gehen in den Park, ins Museum oder fahren ans Meer.", sk: "Chodíme do parku, do múzea alebo ideme k moru." },
            { de: "Ich lese auch gern Bücher über Technik und Reisen.", sk: "Tiež veľmi rád čítam knihy o technike a cestovaní." },
            { de: "Mein Traum ist eine große Reise durch Europa mit dem Fahrrad.", sk: "Môj sen je veľká cesta naprieč Európou na bicykli." }
        ],
        words: {
            "Deutschland": { "type": "noun", "sk": "Nemecko", "article": "das", "plural": "-", "cases": { "Nominativ": "Deutschland", "Akkusativ": "Deutschland", "Dativ": "Deutschland", "Genitiv": "Deutschlands" }, "example": "Ich komme aus Deutschland.", "exampleSk": "Pochádzam z Nemecka." },
            "Hamburg": { "type": "noun", "sk": "Hamburg", "article": "das", "plural": "-", "cases": { "Nominativ": "Hamburg", "Akkusativ": "Hamburg", "Dativ": "Hamburg", "Genitiv": "Hamburgs" }, "example": "Ich lebe in Hamburg.", "exampleSk": "Žijem v Hamburgu." },
            "Ingenieur": { "type": "noun", "sk": "inžinier", "article": "der", "plural": "die Ingenieure", "cases": { "Nominativ": "der Ingenieur", "Akkusativ": "den Ingenieur", "Dativ": "dem Ingenieur", "Genitiv": "des Ingenieurs" }, "example": "Er ist Ingenieur.", "exampleSk": "On je inžinier." },
            "Firma": { "type": "noun", "sk": "firma", "article": "die", "plural": "die Firmen", "cases": { "Nominativ": "die Firma", "Akkusativ": "die Firma", "Dativ": "der Firma", "Genitiv": "der Firma" }, "example": "Ich arbeite in einer Firma.", "exampleSk": "Pracujem vo firme." },
            "Fahrrad": { "type": "noun", "sk": "bicykel", "article": "das", "plural": "die Fahrräder", "cases": { "Nominativ": "das Fahrrad", "Akkusativ": "das Fahrrad", "Dativ": "dem Fahrrad", "Genitiv": "des Fahrrades" }, "example": "Ich fahre mit dem Fahrrad.", "exampleSk": "Jazdím na bicykli." },
            "Arbeit": { "type": "noun", "sk": "práca", "article": "die", "plural": "die Arbeiten", "cases": { "Nominativ": "die Arbeit", "Akkusativ": "die Arbeit", "Dativ": "der Arbeit", "Genitiv": "der Arbeit" }, "example": "Zur Arbeit fahre ich.", "exampleSk": "Jazdím do práce." },
            "Kinder": { "type": "noun", "sk": "deti", "article": "die", "plural": "die Kinder", "cases": { "Nominativ": "die Kinder", "Akkusativ": "die Kinder", "Dativ": "den Kindern", "Genitiv": "der Kinder" }, "example": "Ich habe zwei Kinder.", "exampleSk": "Mám dve deti." },
            "Sohn": { "type": "noun", "sk": "syn", "article": "der", "plural": "die Söhne", "cases": { "Nominativ": "der Sohn", "Akkusativ": "den Sohn", "Dativ": "dem Sohn", "Genitiv": "des Sohns" }, "example": "Mein Sohn heißt Paul.", "exampleSk": "Môj syn sa volá Paul." },
            "Tochter": { "type": "noun", "sk": "dcéra", "article": "die", "plural": "die Töchter", "cases": { "Nominativ": "die Tochter", "Akkusativ": "die Tochter", "Dativ": "der Tochter", "Genitiv": "der Tochter" }, "example": "Meine Tochter ist klein.", "exampleSk": "Moja dcéra je malá." },
            "Haus": { "type": "noun", "sk": "dom", "article": "das", "plural": "die Häuser", "cases": { "Nominativ": "das Haus", "Akkusativ": "das Haus", "Dativ": "dem Haus", "Genitiv": "des Hauses" }, "example": "Wir wohnen in einem Haus.", "exampleSk": "Bývame v dome." },
            "Garten": { "type": "noun", "sk": "záhrada", "article": "der", "plural": "die Gärten", "cases": { "Nominativ": "der Garten", "Akkusativ": "den Garten", "Dativ": "dem Garten", "Genitiv": "des Gartens" }, "example": "Das Haus hat einen Garten.", "exampleSk": "Ten dom má záhradu." },
            "Stadtteil": { "type": "noun", "sk": "štvrť, časť mesta", "article": "der", "plural": "die Stadtteile", "cases": { "Nominativ": "der Stadtteil", "Akkusativ": "den Stadtteil", "Dativ": "dem Stadtteil", "Genitiv": "des Stadtteiles" }, "example": "Es ist ein ruhiger Stadtteil.", "exampleSk": "Máme pokojnú štvrť." },
            "Zeit": { "type": "noun", "sk": "čas", "article": "die", "plural": "die Zeiten", "cases": { "Nominativ": "die Zeit", "Akkusativ": "die Zeit", "Dativ": "der Zeit", "Genitiv": "der Zeit" }, "example": "Ich habe keine Zeit.", "exampleSk": "Nemám čas." },
            "Familie": { "type": "noun", "sk": "rodina", "article": "die", "plural": "die Familien", "cases": { "Nominativ": "die Familie", "Akkusativ": "die Familie", "Dativ": "der Familie", "Genitiv": "der Familie" }, "example": "Meine Familie ist groß.", "exampleSk": "Moja rodina je veľká." },
            "Tag": { "type": "noun", "sk": "deň", "article": "der", "plural": "die Tage", "cases": { "Nominativ": "der Tag", "Akkusativ": "den Tag", "Dativ": "dem Tag", "Genitiv": "des Tages" }, "example": "Wir sprechen über den Tag.", "exampleSk": "Rozprávame sa o (celom) dni." },
            "Wochenende": { "type": "noun", "sk": "víkend", "article": "das", "plural": "die Wochenenden", "cases": { "Nominativ": "das Wochenende", "Akkusativ": "das Wochenende", "Dativ": "dem Wochenende", "Genitiv": "des Wochenendes" }, "example": "Am Wochenende bin ich frei.", "exampleSk": "Cez víkend som voľný." },
            "Ausflüge": { "type": "noun", "sk": "výlety", "article": "der", "plural": "die Ausflüge", "cases": { "Nominativ": "der Ausflug", "Akkusativ": "den Ausflug", "Dativ": "dem Ausflug", "Genitiv": "des Ausfluges" }, "example": "Wir machen Ausflüge.", "exampleSk": "Robievame výlety." },
            "Park": { "type": "noun", "sk": "park", "article": "der", "plural": "die Parks", "cases": { "Nominativ": "der Park", "Akkusativ": "den Park", "Dativ": "dem Park", "Genitiv": "des Parks" }, "example": "Wir gehen in den Park.", "exampleSk": "Ideme do parku." },
            "Museum": { "type": "noun", "sk": "múzeum", "article": "das", "plural": "die Museen", "cases": { "Nominativ": "das Museum", "Akkusativ": "das Museum", "Dativ": "dem Museum", "Genitiv": "des Museums" }, "example": "Ich gehe ins Museum.", "exampleSk": "Idem do múzea." },
            "Meer": { "type": "noun", "sk": "more", "article": "das", "plural": "die Meere", "cases": { "Nominativ": "das Meer", "Akkusativ": "das Meer", "Dativ": "dem Meer", "Genitiv": "des Meeres" }, "example": "Wir fahren ans Meer.", "exampleSk": "Cestujeme k moru." },
            "Bücher": { "type": "noun", "sk": "knihy", "article": "das", "plural": "die Bücher", "cases": { "Nominativ": "das Buch", "Akkusativ": "das Buch", "Dativ": "dem Buch", "Genitiv": "des Buches" }, "example": "Ich lese gern Bücher.", "exampleSk": "Rád čítam knihy." },
            "Technik": { "type": "noun", "sk": "technika", "article": "die", "plural": "die Techniken", "cases": { "Nominativ": "die Technik", "Akkusativ": "die Technik", "Dativ": "der Technik", "Genitiv": "der Technik" }, "example": "Bücher über Technik", "exampleSk": "knihy o technike" },
            "Reisen": { "type": "noun", "sk": "cestovanie / cesty", "article": "die", "plural": "die Reisen", "cases": { "Nominativ": "die Reise", "Akkusativ": "die Reise", "Dativ": "der Reise", "Genitiv": "der Reise" }, "example": "Er liebt Reisen.", "exampleSk": "On miluje cestovanie." },
            "Europa": { "type": "noun", "sk": "Európa", "article": "das", "plural": "-", "cases": { "Nominativ": "Europa", "Akkusativ": "Europa", "Dativ": "Europa", "Genitiv": "Europas" }, "example": "Eine Reise durch Europa.", "exampleSk": "Cesta naprieč Európou." },
            "Traum": { "type": "noun", "sk": "sen", "article": "der", "plural": "die Träume", "cases": { "Nominativ": "der Traum", "Akkusativ": "den Traum", "Dativ": "dem Traum", "Genitiv": "des Traums" }, "example": "Das ist mein Traum.", "exampleSk": "To je môj sen." },
            "leben": { "type": "verb", "sk": "žiť", "infinitiv": "leben", "conjugation": { "ich": "lebe", "du": "lebst", "er/sie/es": "lebt", "wir": "leben", "ihr": "lebt", "sie": "leben" }, "example": "Ich lebe in Hamburg.", "exampleSk": "Žijem v Hamburgu." },
            "arbeiten": { "type": "verb", "sk": "pracovať", "infinitiv": "arbeiten", "conjugation": { "ich": "arbeite", "du": "arbeitest", "er/sie/es": "arbeitet", "wir": "arbeiten", "ihr": "arbeitet", "sie": "arbeiten" }, "example": "Ich arbeite in einer Firma.", "exampleSk": "Pracujem vo firme." },
            "fahren": { "type": "verb", "sk": "jazdiť, viesť sa", "infinitiv": "fahren", "conjugation": { "ich": "fahre", "du": "fährst", "er/sie/es": "fährt", "wir": "fahren", "ihr": "fahrt", "sie": "fahren" }, "example": "Ich fahre mit dem Fahrrad.", "exampleSk": "Jazdím bicyklom." },
            "wohnen": { "type": "verb", "sk": "bývať", "infinitiv": "wohnen", "conjugation": { "ich": "wohne", "du": "wohnst", "er/sie/es": "wohnt", "wir": "wohnen", "ihr": "wohnt", "sie": "wohnen" }, "example": "Ich wohne in einem Haus.", "exampleSk": "Bývam v dome." },
            "verbringen": { "type": "verb", "sk": "tráviť (čas)", "infinitiv": "verbringen", "conjugation": { "ich": "verbringe", "du": "verbringst", "er/sie/es": "verbringt", "wir": "verbringen", "ihr": "verbringt", "sie": "verbringen" }, "example": "Ich verbringe Zeit mit meiner Familie.", "exampleSk": "Trávim čas so svojou rodinou." },
            "essen": { "type": "verb", "sk": "jesť", "infinitiv": "essen", "conjugation": { "ich": "esse", "du": "isst", "er/sie/es": "isst", "wir": "essen", "ihr": "esst", "sie": "essen" }, "example": "Wir essen zusammen.", "exampleSk": "Jeme spolu." },
            "sprechen": { "type": "verb", "sk": "hovoriť, rozprávať", "infinitiv": "sprechen", "conjugation": { "ich": "spreche", "du": "sprichst", "er/sie/es": "spricht", "wir": "sprechen", "ihr": "sprecht", "sie": "sprechen" }, "example": "Wir sprechen über den Tag.", "exampleSk": "Rozprávame sa o celom dni." },
            "machen": { "type": "verb", "sk": "robiť", "infinitiv": "machen", "conjugation": { "ich": "mache", "du": "machst", "er/sie/es": "macht", "wir": "machen", "ihr": "macht", "sie": "machen" }, "example": "Wir machen Ausflüge.", "exampleSk": "Robievame výlety." },
            "gehen": { "type": "verb", "sk": "ísť", "infinitiv": "gehen", "conjugation": { "ich": "gehe", "du": "gehst", "er/sie/es": "geht", "wir": "gehen", "ihr": "geht", "sie": "gehen" }, "example": "Wir gehen in den Park.", "exampleSk": "Ideme do parku." },
            "lesen": { "type": "verb", "sk": "čítať", "infinitiv": "lesen", "conjugation": { "ich": "lese", "du": "liest", "er/sie/es": "liest", "wir": "lesen", "ihr": "lest", "sie": "lesen" }, "example": "Ich lese Bücher.", "exampleSk": "Čítam knihy." },
            "reisen": { "type": "verb", "sk": "cestovať", "infinitiv": "reisen", "conjugation": { "ich": "reise", "du": "reist", "er/sie/es": "reist", "wir": "reisen", "ihr": "reist", "sie": "reisen" }, "example": "Ein Buch über Reisen.", "exampleSk": "Kniha o cestovaní." },
            "gesund": { "type": "adjective", "sk": "zdravý, -o", "example": "Das Fahrrad ist gesund.", "exampleSk": "Bicykel je zdravý." },
            "schnell": { "type": "adjective", "sk": "rýchly, -o", "example": "Fahrrad ist schnell.", "exampleSk": "Bicykel je rýchly." },
            "verheiratet": { "type": "adjective", "sk": "ženatý / vydatá", "example": "Ich bin verheiratet.", "exampleSk": "Som ženatý." },
            "ruhig": { "type": "adjective", "sk": "pokojný", "example": "Ein ruhiger Stadtteil.", "exampleSk": "Pokojná štvrť." }
        },
        quiz: [
            { type: "open", question: "1. Wie alt ist Thomas?", correctAnswer: ["Er ist 45 Jahre alt.", "fünfundvierzig", "45", "45 Jahre"] },
            { type: "open", question: "2. Wo wohnt er?", correctAnswer: ["Er wohnt in Hamburg.", "In Hamburg.", "Hamburg", "Er lebt in Hamburg."] },
            { type: "open", question: "3. Was ist sein Beruf?", correctAnswer: ["Er ist Ingenieur.", "Ingenieur."] },
            { type: "open", question: "4. Wie kommt er zur Arbeit?", correctAnswer: ["Er fährt mit dem Fahrrad zur Arbeit.", "Mit dem Fahrrad.", "Fahrrad", "Jeden Tag mit dem Fahrrad."] },
            { type: "open", question: "5. Hat Thomas Kinder?", correctAnswer: ["Ja, er hat zwei Kinder.", "Ja, zwei Kinder.", "Ja.", "Zwei Kinder.", "Er hat einen Sohn und eine Tochter."] },
            { type: "open", question: "6. Was macht er am Wochenende?", correctAnswer: ["Er macht oft Ausflüge.", "Ausflüge machen.", "Ausflüge mit der Familie.", "Er geht in den Park, ins Museum oder fährt ans Meer.", "Ausflüge"] },
            { type: "open", question: "7. Was ist sein Traum?", correctAnswer: ["Eine große Reise durch Europa mit dem Fahrrad.", "Eine Reise durch Europa.", "Reise durch Europa mit dem Fahrrad.", "Reise durch Europa."] },
            { type: "open", question: "Zusatzfrage: Wie kommst du zur Schule oder zur Arbeit?", correctAnswer: "(Voľná odpoveď: z.B. Ich fahre mit dem Auto / Ich gehe zu Fuß / Mit dem Bus)" },
            { type: "open", question: "Zusatzfrage: Machst du gern Ausflüge mit deiner Familie?", correctAnswer: "(Voľná odpoveď: z.B. Ja, wir machen oft Ausflüge / Nein, ich bleibe lieber zu Hause)" }
        ]
    },
    {
        id: 'story_15',
        title: 'Ich heiße Olga',
        titleSk: 'Volám sa Oľga',
        cefr: 'A1',
        description: 'Oľga pochádza z Ukrajiny a pracuje ako opatrovateľka vo Švajčiarsku.',
        sentences: [
            { de: "Ich heiße Olga.", sk: "Volám sa Oľga." },
            { de: "Ich bin 43 Jahre alt und komme aus der Ukraine.", sk: "Mám 43 rokov a pochádzam z Ukrajiny." },
            { de: "Ich wohne seit 10 Jahren in der Schweiz, in der Stadt Luzern.", sk: "Bývam už 10 rokov vo Švajčiarsku, v meste Luzern." },
            { de: "Ich arbeite als Pflegerin in einem Altersheim.", sk: "Pracujem ako opatrovateľka v domove dôchodcov." },
            { de: "Ich mag meinen Beruf.", sk: "Mám rada svoju prácu (svoje povolanie)." },
            { de: "Ich helfe alten Menschen, spreche mit ihnen und höre zu.", sk: "Pomáham starým ľuďom, rozprávam sa s nimi a počúvam ich." },
            { de: "Ich habe eine Tochter.", sk: "Mám jednu dcéru." },
            { de: "Sie heißt Katja und ist 18 Jahre alt.", sk: "Volá sa Katja a má 18 rokov." },
            { de: "Sie geht noch zur Schule.", sk: "Ešte stále chodí do školy." },
            { de: "Am Nachmittag lernen wir manchmal zusammen Deutsch.", sk: "Popoludní sa niekedy spolu učíme nemčinu." },
            { de: "Ich besuche auch zweimal pro Woche einen Deutschkurs.", sk: "Navštevujem aj dvakrát týždenne kurz nemčiny." },
            { de: "Die Sprache ist schwer, aber ich möchte gut sprechen.", sk: "Tento jazyk je ťažký, ale chcem (ním) dobre hovoriť." },
            { de: "In meiner Freizeit lese ich gern Bücher auf Deutsch oder Russisch.", sk: "Vo svojom voľnom čase rada čítam knihy v nemčine alebo ruštine." },
            { de: "Ich backe auch sehr gern.", sk: "Tiež veľmi rada pečiem." },
            { de: "Mein Spezialbrot ist rund und weich – meine Nachbarn lieben es!", sk: "Môj špeciálny chlieb je guľatý a mäkký – moji susedia ho milujú!" },
            { de: "Am Sonntag backe ich oft Brot oder Kuchen und lade meine Freundin zum Kaffee ein.", sk: "V nedeľu často pečiem chlieb alebo koláč a pozývam svoju priateľku na kávu." },
            { de: "Wir sprechen viel und lachen zusammen.", sk: "Veľa sa rozprávame a spolu sa smejeme." }
        ],
        words: {
            "Ukraine": { "type": "noun", "sk": "Ukrajina", "article": "die", "plural": "-", "cases": { "Nominativ": "die Ukraine", "Akkusativ": "die Ukraine", "Dativ": "der Ukraine", "Genitiv": "der Ukraine" }, "example": "Ich komme aus der Ukraine.", "exampleSk": "Pochádzam z Ukrajiny." },
            "Schweiz": { "type": "noun", "sk": "Švajčiarsko", "article": "die", "plural": "-", "cases": { "Nominativ": "die Schweiz", "Akkusativ": "die Schweiz", "Dativ": "der Schweiz", "Genitiv": "der Schweiz" }, "example": "Ich wohne in der Schweiz.", "exampleSk": "Bývam vo Švajčiarsku." },
            "Pflegerin": { "type": "noun", "sk": "opatrovateľka", "article": "die", "plural": "die Pflegerinnen", "cases": { "Nominativ": "die Pflegerin", "Akkusativ": "die Pflegerin", "Dativ": "der Pflegerin", "Genitiv": "der Pflegerin" }, "example": "Sie ist Pflegerin.", "exampleSk": "Ona je opatrovateľka." },
            "Altersheim": { "type": "noun", "sk": "domov dôchodcov", "article": "das", "plural": "die Altersheime", "cases": { "Nominativ": "das Altersheim", "Akkusativ": "das Altersheim", "Dativ": "dem Altersheim", "Genitiv": "des Altersheimes" }, "example": "Ich arbeite in einem Altersheim.", "exampleSk": "Pracujem v domove dôchodcov." },
            "Beruf": { "type": "noun", "sk": "povolanie (práca)", "article": "der", "plural": "die Berufe", "cases": { "Nominativ": "der Beruf", "Akkusativ": "den Beruf", "Dativ": "dem Beruf", "Genitiv": "des Berufes" }, "example": "Ich mag meinen Beruf.", "exampleSk": "Mám rád svoje povolanie." },
            "Tochter": { "type": "noun", "sk": "dcéra", "article": "die", "plural": "die Töchter", "cases": { "Nominativ": "die Tochter", "Akkusativ": "die Tochter", "Dativ": "der Tochter", "Genitiv": "der Tochter" }, "example": "Ich habe eine Tochter.", "exampleSk": "Mám jednu dcéru." },
            "Schule": { "type": "noun", "sk": "škola", "article": "die", "plural": "die Schulen", "cases": { "Nominativ": "die Schule", "Akkusativ": "die Schule", "Dativ": "der Schule", "Genitiv": "der Schule" }, "example": "Sie geht zur Schule.", "exampleSk": "Ona chodí do školy." },
            "Nachmittag": { "type": "noun", "sk": "popoludnie", "article": "der", "plural": "die Nachmittage", "cases": { "Nominativ": "der Nachmittag", "Akkusativ": "den Nachmittag", "Dativ": "dem Nachmittag", "Genitiv": "des Nachmittages" }, "example": "Am Nachmittag haben wir Zeit.", "exampleSk": "Popoludní máme čas." },
            "Woche": { "type": "noun", "sk": "týždeň", "article": "die", "plural": "die Wochen", "cases": { "Nominativ": "die Woche", "Akkusativ": "die Woche", "Dativ": "der Woche", "Genitiv": "der Woche" }, "example": "Zweimal pro Woche.", "exampleSk": "Dvakrát do týždňa." },
            "Deutschkurs": { "type": "noun", "sk": "kurz nemčiny", "article": "der", "plural": "die Deutschkurse", "cases": { "Nominativ": "der Deutschkurs", "Akkusativ": "den Deutschkurs", "Dativ": "dem Deutschkurs", "Genitiv": "des Deutschkurses" }, "example": "Ich besuche einen Deutschkurs.", "exampleSk": "Navštevujem kurz nemčiny." },
            "Sprache": { "type": "noun", "sk": "jazyk (reč)", "article": "die", "plural": "die Sprachen", "cases": { "Nominativ": "die Sprache", "Akkusativ": "die Sprache", "Dativ": "der Sprache", "Genitiv": "der Sprache" }, "example": "Die Sprache ist schwer.", "exampleSk": "Táto reč je ťažká." },
            "Freizeit": { "type": "noun", "sk": "voľný čas", "article": "die", "plural": "die Freizeiten", "cases": { "Nominativ": "die Freizeit", "Akkusativ": "die Freizeit", "Dativ": "der Freizeit", "Genitiv": "der Freizeit" }, "example": "In meiner Freizeit lese ich.", "exampleSk": "Vo voľnom čase čítam." },
            "Bücher": { "type": "noun", "sk": "knihy", "article": "das", "plural": "die Bücher", "cases": { "Nominativ": "das Buch", "Akkusativ": "das Buch", "Dativ": "dem Buch", "Genitiv": "des Buches" }, "example": "Ich lese Bücher.", "exampleSk": "Čítam knihy." },
            "Brot": { "type": "noun", "sk": "chlieb", "article": "das", "plural": "die Brote", "cases": { "Nominativ": "das Brot", "Akkusativ": "das Brot", "Dativ": "dem Brot", "Genitiv": "des Brotes" }, "example": "Mein Brot ist weich.", "exampleSk": "Môj chlieb je mäkký." },
            "Spezialbrot": { "type": "noun", "sk": "špeciálny chlieb", "article": "das", "plural": "die Spezialbrote", "cases": { "Nominativ": "das Spezialbrot", "Akkusativ": "das Spezialbrot", "Dativ": "dem Spezialbrot", "Genitiv": "des Spezialbrotes" }, "example": "Ich backe mein Spezialbrot.", "exampleSk": "Pečiem si svoj špeciálny chlieb." },
            "Nachbarn": { "type": "noun", "sk": "susedia", "article": "der", "plural": "die Nachbarn", "cases": { "Nominativ": "der Nachbar", "Akkusativ": "den Nachbarn", "Dativ": "dem Nachbarn", "Genitiv": "des Nachbarn" }, "example": "Meine Nachbarn lieben es.", "exampleSk": "Moji susedia to milujú." },
            "Sonntag": { "type": "noun", "sk": "nedeľa", "article": "der", "plural": "die Sonntage", "cases": { "Nominativ": "der Sonntag", "Akkusativ": "den Sonntag", "Dativ": "dem Sonntag", "Genitiv": "des Sonntages" }, "example": "Am Sonntag backe ich.", "exampleSk": "V nedeľu pečiem." },
            "Kuchen": { "type": "noun", "sk": "koláč (torta)", "article": "der", "plural": "die Kuchen", "cases": { "Nominativ": "der Kuchen", "Akkusativ": "den Kuchen", "Dativ": "dem Kuchen", "Genitiv": "des Kuchens" }, "example": "Ich backe einen Kuchen.", "exampleSk": "Pečiem koláč." },
            "Freundin": { "type": "noun", "sk": "priateľka (kamarátka)", "article": "die", "plural": "die Freundinnen", "cases": { "Nominativ": "die Freundin", "Akkusativ": "die Freundin", "Dativ": "der Freundin", "Genitiv": "der Freundin" }, "example": "Ich lade meine Freundin ein.", "exampleSk": "Pozývam svoju kamarátku." },
            "Kaffee": { "type": "noun", "sk": "káva", "article": "der", "plural": "die Kaffees", "cases": { "Nominativ": "der Kaffee", "Akkusativ": "den Kaffee", "Dativ": "dem Kaffee", "Genitiv": "des Kaffees" }, "example": "Wir trinken Kaffee.", "exampleSk": "Pijeme kávu." },
            "arbeiten": { "type": "verb", "sk": "pracovať", "infinitiv": "arbeiten", "conjugation": { "ich": "arbeite", "du": "arbeitest", "er/sie/es": "arbeitet", "wir": "arbeiten", "ihr": "arbeitet", "sie": "arbeiten" }, "example": "Ich arbeite als Pflegerin.", "exampleSk": "Pracujem ako opatrovateľka." },
            "helfen": { "type": "verb", "sk": "pomáhať", "infinitiv": "helfen", "conjugation": { "ich": "helfe", "du": "hilfst", "er/sie/es": "hilft", "wir": "helfen", "ihr": "helft", "sie": "helfen" }, "example": "Ich helfe alten Menschen.", "exampleSk": "Pomáham starým ľuďom." },
            "sprechen": { "type": "verb", "sk": "rozprávať (sa)", "infinitiv": "sprechen", "conjugation": { "ich": "spreche", "du": "sprichst", "er/sie/es": "spricht", "wir": "sprechen", "ihr": "sprecht", "sie": "sprechen" }, "example": "Wir sprechen zusammen.", "exampleSk": "Zoberieme sa." },
            "zuhören": { "type": "verb", "sk": "počúvať", "infinitiv": "zuhören", "conjugation": { "ich": "höre zu", "du": "hörst zu", "er/sie/es": "hört zu", "wir": "hören zu", "ihr": "hört zu", "sie": "hören zu" }, "example": "Ich höre zu.", "exampleSk": "Počúvam." },
            "lernen": { "type": "verb", "sk": "učiť sa", "infinitiv": "lernen", "conjugation": { "ich": "lerne", "du": "lernst", "er/sie/es": "lernt", "wir": "lernen", "ihr": "lernt", "sie": "lernen" }, "example": "Wir lernen Deutsch.", "exampleSk": "Učíme sa nemčinu." },
            "besuchen": { "type": "verb", "sk": "navštíviť", "infinitiv": "besuchen", "conjugation": { "ich": "besuche", "du": "besuchst", "er/sie/es": "besucht", "wir": "besuchen", "ihr": "besucht", "sie": "besuchen" }, "example": "Ich besuche einen Kurs.", "exampleSk": "Navštevujem kurz." },
            "lesen": { "type": "verb", "sk": "čítať", "infinitiv": "lesen", "conjugation": { "ich": "lese", "du": "liest", "er/sie/es": "liest", "wir": "lesen", "ihr": "lest", "sie": "lesen" }, "example": "Ich lese Bücher.", "exampleSk": "Čítam knihy." },
            "backen": { "type": "verb", "sk": "piecť", "infinitiv": "backen", "conjugation": { "ich": "backe", "du": "bäckst", "er/sie/es": "bäckt", "wir": "backen", "ihr": "backt", "sie": "backen" }, "example": "Ich backe Brot.", "exampleSk": "Pečiem chlieb." },
            "lieben": { "type": "verb", "sk": "milovať", "infinitiv": "lieben", "conjugation": { "ich": "liebe", "du": "liebst", "er/sie/es": "liebt", "wir": "lieben", "ihr": "liebt", "sie": "lieben" }, "example": "Meine Nachbarn lieben es.", "exampleSk": "Moja suseda to miluje." },
            "einladen": { "type": "verb", "sk": "pozvať", "infinitiv": "einladen", "conjugation": { "ich": "lade ein", "du": "lädst ein", "er/sie/es": "lädt ein", "wir": "laden ein", "ihr": "ladet ein", "sie": "laden ein" }, "example": "Ich lade meine Freundin ein.", "exampleSk": "Pozývam kamarátku." },
            "lachen": { "type": "verb", "sk": "smiať sa", "infinitiv": "lachen", "conjugation": { "ich": "lache", "du": "lachst", "er/sie/es": "lacht", "wir": "lachen", "ihr": "lacht", "sie": "lachen" }, "example": "Wir lachen zusammen.", "exampleSk": "Spolu sa smejeme." },
            "rund": { "type": "adjective", "sk": "okrúhly", "example": "Das Brot ist rund.", "exampleSk": "Chlieb je okrúhly." },
            "weich": { "type": "adjective", "sk": "mäkký", "example": "Das Brot ist weich.", "exampleSk": "Chlieb je mäkký." }
        },
        quiz: [
            { type: "open", question: "1. Wie alt ist Olga?", correctAnswer: ["Sie ist 43 Jahre alt.", "dreiundvierzig", "43", "43 Jahre"] },
            { type: "open", question: "2. Wo wohnt sie?", correctAnswer: ["Sie wohnt in Luzern.", "In der Schweiz, in Luzern.", "Luzern"] },
            { type: "open", question: "3. Was ist ihr Beruf?", correctAnswer: ["Sie ist Pflegerin.", "Pflegerin.", "Sie arbeitet als Pflegerin."] },
            { type: "open", question: "4. Hat Olga Kinder?", correctAnswer: ["Ja, sie hat eine Tochter.", "Ja, eine Tochter.", "Eine Tochter", "Ja."] },
            { type: "open", question: "5. Was macht sie in ihrer Freizeit?", correctAnswer: ["Sie liest gern Bücher und backt.", "Lesen und backen.", "Bücher auf Deutsch oder Russisch lesen und backen.", "Sie liest gern Bücher auf Deutsch oder Russisch."] },
            { type: "open", question: "6. Was backt sie gern?", correctAnswer: ["Ihr Spezialbrot oder Kuchen.", "Spezialbrot.", "Brot oder Kuchen.", "Brot.", "Brot und Kuchen."] },
            { type: "open", question: "7. Warum lernt Olga Deutsch?", correctAnswer: ["Weil sie in der Schweiz wohnt.", "Sie möchte gut sprechen.", "Um gut zu sprechen."] },
            { type: "open", question: "Zusatzfrage: Backst du auch manchmal zu Hause?", correctAnswer: "(Voľná odpoveď: z.B. Ja, ich backe Kuchen / Nein, ich kaufe Brot im Supermarkt)" },
            { type: "open", question: "Zusatzfrage: Besuchst du einen Kurs oder lernst du allein?", correctAnswer: "(Voľná odpoveď: z.B. Ich besuche einen Online-Kurs / Ich lerne allein mit einer App)" }
        ]
    }
];

export const ALL_STORY_WORDS = STORIES.reduce((acc, story) => ({ ...acc, ...(story.words || {}) }), {});
