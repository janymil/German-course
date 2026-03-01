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
    }
];
