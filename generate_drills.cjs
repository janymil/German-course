const fs = require('fs');

const data = {
  "das Gespräch": {
    sk: "rozhovor",
    sentences: [
      ["Er sucht das Gespräch mit seinem Chef.", "Vyhľadáva rozhovor so svojím šéfom."],
      ["Während des Gesprächs war sie ruhig.", "Počas rozhovoru bola ticho."],
      ["Ich danke Ihnen für das Gespräch.", "Ďakujem vám za rozhovor."],
      ["Das Telefongespräch dauerte eine Stunde.", "Telefonický rozhovor trval hodinu."],
      ["Sie hat das Gespräch plötzlich beendet.", "Ona zrazu ukončila rozhovor."],
      ["Ein gutes Gespräch kann Probleme lösen.", "Dobrý rozhovor môže vyriešiť problémy."],
      ["Ich habe den Termin für das Vorstellungsgespräch.", "Mám termín na pracovný pohovor."],
      ["Das Gespräch unter vier Augen ist besser.", "Rozhovor medzi štyrmi očami je lepší."],
      ["Wir müssen ein ernstes Gespräch führen.", "Musíme viesť vážny rozhovor."],
      ["Das Gespräch ist für heute geplant.", "Rozhovor je naplánovaný na dnes."]
    ]
  },
  "die bekannte Persönlichkeit": {
    sk: "známa osobnosť",
    sentences: [
      ["Er ist eine bekannte Persönlichkeit.", "On je známa osobnosť."],
      ["Ich habe gestern eine bekannte Persönlichkeit getroffen.", "Včera som stretol známu osobnosť."],
      ["Eine bekannte Persönlichkeit kommt in unsere Stadt.", "Jedna známa osobnosť príde do nášho mesta."],
      ["Das Interview war mit einer bekannten Persönlichkeit.", "Rozhovor bol so známou osobnosťou."],
      ["Viele bekannte Persönlichkeiten leben in Berlin.", "Veľa známych osobností žije v Berlíne."],
      ["Kennst du eine bekannte Persönlichkeit?", "Poznáš nejakú známu osobnosť?"],
      ["Als bekannte Persönlichkeit hat man wenig Privatsphäre.", "Ako známa osobnosť má človek málo súkromia."],
      ["Diese bekannte Persönlichkeit hat ein Buch geschrieben.", "Táto známa osobnosť napísala knihu."],
      ["Er arbeitet als Bodyguard für eine bekannte Persönlichkeit.", "Pracuje ako osobný strážca pre známu osobnosť."],
      ["Ist sie eine wirklich bekannte Persönlichkeit?", "Je ona naozaj známa osobnosť?"],
      ["Das Magazin hat eine Liste bekannter Persönlichkeiten veröffentlicht.", "Magazín zverejnil zoznam známych osobností."],
      ["Er imitiert gerne bekannte Persönlichkeiten.", "Rád napodobňuje známe osobnosti."],
      ["Eine bekannte Persönlichkeit zu sein, ist nicht immer leicht.", "Byť známou osobnosťou nie je vždy ľahké."],
      ["Wen würdest du von den bekannten Persönlichkeiten gerne treffen?", "Koho zo známych osobností by si rád stretol?"],
      ["Diese bekannte Persönlichkeit engagiert sich für Kinder.", "Táto známa osobnosť sa angažuje pre deti."]
    ]
  },
  "werfen": {
    sk: "hodiť / hádzať",
    sentences: [
      ["Kannst du den Ball werfen?", "Môžeš hodiť tú loptu?"],
      ["Bitte werfen Sie das Dokument in den Briefkasten.", "Prosím, hoďte ten dokument do schránky."],
      ["Werft den Müll nicht auf die Straße!", "Nehádžte ten odpad na ulicu!"],
      ["Werfen wir eine Münze!", "Hoďme si mincou!"],
      ["Er hat den Stein ins Wasser geworfen.", "On hodil ten kameň do vody."],
      ["Du darfst das nicht wegwerfen.", "Nesmies to vyhodiť."],
      ["Sie werfen den Schlüssel aus dem Fenster.", "Oni hádžu ten kľúč z okna."],
      ["Wirf das zu mir!", "Hoď to ku mne!"],
      ["Ich werde den Apfel wegwerfen, er ist schlecht.", "Zahodím to jablko, je zlé."],
      ["Warum wirfst du das auf den Boden?", "Prečo to hádžeš na zem?"],
      ["Die Kinder werfen gerne Schneebälle.", "Deti rady hádžu snehové gule."],
      ["Sie hat einen kurzen Blick darauf geworfen.", "Venovala tomu krátky pohľad. (hodila očkom)"],
      ["Ich habe alles in eine Tasche geworfen.", "Všetko som hodil do jednej tašky."],
      ["Beim Spiel muss man den Würfel werfen.", "Pri hre treba hádzať kockou."],
      ["Bitte werfen Sie das Glas in den Container.", "Prosím, hoďte to sklo do kontajnera."]
    ]
  },
  "ankreuzen": {
    sk: "zakrížkovať",
    sentences: [
      ["Du musst die richtige Antwort ankreuzen.", "Musíš zakrížkovať správnu odpoveď."],
      ["Bitte kreuzen Sie hier an.", "Prosím, zakrížkujte tu."],
      ["Ich werde Option A ankreuzen.", "Zakrížkujem možnosť A."],
      ["Hast du alles angekreuzt?", "Zakrížkoval si všetko?"],
      ["Kreuzen Sie 'Ja' oder 'Nein' an.", "Zakrížkujte 'Áno' alebo 'Nie'."],
      ["Kreuz bitte deinen Namen an.", "Zakrížkuj prosím svoje meno."],
      ["Ich weiß nicht, was ich ankreuzen soll.", "Neviem, čo mám zakrížkovať."],
      ["Wir müssen das Formular noch ankreuzen.", "Ešte musíme zakrížkovať ten formulár."],
      ["Sie kreuzt das Kästchen an.", "Ona krížkuje to políčko."],
      ["Hast du die falschen Wörter angekreuzt?", "Zakrížkoval si nesprávne slová?"],
      ["Die Schüler sollen die Bilder ankreuzen.", "Žiaci majú zakrížkovať obrázky."],
      ["Man muss mehrere Optionen ankreuzen.", "Človek musí zakrížkovať viacero možností."],
      ["Haben Sie das richtige Feld angekreuzt?", "Zakrížkovali ste správne pole?"],
      ["Kreuzen Sie nichts an, wenn es unklar ist.", "Nekrížkujte nič, ak je to nejasné."],
      ["Ich liebe es, Listen anzukreuzen.", "Zbožňujem odkrížkavať zoznamy."]
    ]
  },
  "die Stelle": {
    sk: "miesto / pozícia",
    sentences: [
      ["Ich bewerbe mich um diese Stelle.", "Uchádzam sa o túto pozíciu."],
      ["Das ist eine gute Stelle für das Zelt.", "Toto je dobré miesto pre stan."],
      ["Sie hat eine neue Stelle gefunden.", "Našla si nové pracovné miesto."],
      ["Die Stelle ist leider schon besetzt.", "Tá pozícia je už bohužiaľ obsadená."],
      ["An deiner Stelle würde ich das nicht tun.", "Na tvojom mieste by som to nerobil."],
      ["Lies bitte ab dieser Stelle weiter.", "Čítaj prosím od tohto miesta ďalej."],
      ["Ich suche eine Stelle als Lehrer.", "Hľadám si miesto ako učiteľ."],
      ["Wir haben eine offene Stelle im Büro.", "Máme voľnú pozíciu v kancelárii."],
      ["Welche Stelle im Buch meinst du?", "Ktoré miesto v knihe myslíš?"],
      ["Er wurde auf der Stelle entlassen.", "Bol na mieste prepustený."],
      ["Das ist meine schwache Stelle.", "Toto je moje slabé miesto."],
      ["Das ist genau die richtige Stelle.", "Toto je presne to správne miesto."],
      ["Ich trete auf der Stelle.", "Prešľapujem na mieste."],
      ["Sie war zur falschen Zeit an der falschen Stelle.", "Bola v nesprávnom čase na nesprávnom mieste."],
      ["Ich möchte mich für die freie Stelle bewerben.", "Chcem sa uchádzať o voľné miesto."]
    ]
  },
  "schon fertig": {
    sk: "už hotovo",
    sentences: [
      ["Bist du schon fertig?", "Si už hotový?"],
      ["Ich bin schon fertig mit der Arbeit.", "Už som hotový s prácou."],
      ["Das Essen ist schon fertig.", "Jedlo je už hotové."],
      ["Wir sind schon fertig für heute.", "Pre dnešok sme už skončili."],
      ["Seid ihr schon fertig?", "Ste už hotoví?"],
      ["Er war schon fertig, bevor ich ankam.", "On bol už hotový skôr, ako som prišiel."],
      ["Das Protokoll ist schon fertig.", "Zápisnica je už hotová."],
      ["Ich bin noch nicht fertig, aber fast.", "Ešte nie som hotový, ale takmer."],
      ["Das Paket ist schon fertig zum Versand.", "Balík je už pripravený na odoslanie."],
      ["Bist du schon fertig mit dem Lesen?", "Už si dočítal? (Už si hotový s čítaním?)"],
      ["Ich habe gerade angefangen und er ist schon fertig.", "Práve som začal a on je už hotový."],
      ["Das Projekt ist schon fertig.", "Projekt je už hotový."],
      ["Das Haus ist schon fertig gebaut.", "Dom je už dostavaný."],
      ["Schon fertig? Das ging aber schnell!", "Už hotovo? To išlo ale rýchlo!"],
      ["Mein Kleid ist schon fertig.", "Moje šaty sú už hotové."]
    ]
  },
  "das Rätsel": {
    sk: "hádanka",
    sentences: [
      ["Ich kann dieses Rätsel nicht lösen.", "Neviem vyriešiť túto hádanku."],
      ["Das ist ein ungelöstes Rätsel.", "To je nevyriešená hádanka."],
      ["Das Rätsel ist sehr schwer.", "Tá hádanka je veľmi ťažká."],
      ["Löst du gerne Rätsel?", "Riešiš rád hádanky?"],
      ["Das Verbrechen bleibt ein Rätsel.", "Zločin zostáva hádankou."],
      ["Ich liebe Sudoku und andere Rätsel.", "Milujem sudoku a iné hádanky."],
      ["Dein Verhalten ist mir ein Rätsel.", "Tvoje správanie je pre mňa záhadou."],
      ["Er hat die Lösung für das Rätsel gefunden.", "On našiel riešenie tej hádanky."],
      ["Kinder mögen solche Art von Rätseln.", "Deti majú rady takýto druh hádaniek."],
      ["Dieses Rätsel hat nur drei Wörter.", "Táto hádanka má len tri slová."],
      ["Es gibt ein Kreuzworträtsel in der Zeitung.", "V novinách je krížovka."],
      ["Das ist wirklich ein großes Rätsel.", "To je naozaj veľká záhada."],
      ["Ich gebe dir ein Rätsel auf.", "Dám ti jednu hádanku."],
      ["Hast du das Rätsel schon gelöst?", "Vyriešil si už tú hádanku?"],
      ["Ein gutes Rätsel regt zum Denken an.", "Dobrá hádanka podnecuje k mysleniu."]
    ]
  },
  "sammeln": {
    sk: "zbierať",
    sentences: [
      ["Er sammelt alte Münzen.", "Zbiera staré mince."],
      ["Wir sammeln Geld für den guten Zweck.", "Zbierame peniaze na dobrú vec."],
      ["Die Kinder sammeln Muscheln am Strand.", "Deti zbierajú mušle na pláži."],
      ["Sammelst du Briefmarken?", "Zbieraš známky?"],
      ["Im Herbst sammeln wir Pilze.", "Na jeseň zbierame huby."],
      ["Sammle bitte alle Stifte ein.", "Vyzbieraj prosím všetky perá."],
      ["Ich muss meine Gedanken sammeln.", "Musím si utriediť myšlienky."],
      ["Wo können wir die Äpfel sammeln?", "Kde môžeme zbierať tie jablká?"],
      ["Sie sammelt gerne Erfahrungen.", "Ona rada zbiera skúsenosti."],
      ["Das Museum sammelt moderne Kunst.", "Múzeum zbiera moderné umenie."],
      ["Man kann Punkte sammeln.", "Dajú sa zbierať body."],
      ["Ich sammle Unterschriften für die Petition.", "Zbieram podpisy k petícii."],
      ["Die Bienen sammeln Nektar.", "Včely zbierajú nektár."],
      ["Er hat sein ganzes Leben lang Bücher gesammelt.", "Celý život zbieral knihy."],
      ["Wir sammeln altes Papier.", "Zbierame starý papier."]
    ]
  },
  "die Herkunft": {
    sk: "pôvod",
    sentences: [
      ["Was ist deine Herkunft?", "Aký je tvoj pôvod?"],
      ["Das Wort hat eine lateinische Herkunft.", "To slovo má latinský pôvod."],
      ["Die Herkunft des Namens ist unklar.", "Pôvod tohto mena je nejasný."],
      ["Sie ist stolz auf ihre Herkunft.", "Je hrdá na svoj pôvod."],
      ["Auf dem Etikett steht die Herkunft des Weins.", "Na etikete je uvedený pôvod vína."],
      ["Menschen verschiedener Herkunft leben hier.", "Žijú tu ľudia rôzneho pôvodu."],
      ["Wir interessieren uns für die Herkunft der Sterne.", "Zaujímame sa o pôvod hviezd."],
      ["Es ist wichtig, die Herkunft der Ware zu kennen.", "Je dôležité poznať pôvod tovaru."],
      ["Seine Herkunft ist ein Geheimnis.", "Jeho pôvod je tajomstvo."],
      ["Herkunft und Nationalität sind verschiedene Dinge.", "Pôvod a národnosť sú rôzne veci."],
      ["Das Museum erklärt die Herkunft der Menschheit.", "Múzeum vysvetľuje pôvod ľudstva."],
      ["Bei der Bewerbung ist die Herkunft egal.", "Pri žiadosti o prácu nezáleží na pôvode."],
      ["Er vergisst nie seine Herkunft.", "Nikdy nezabúda na svoj pôvod."],
      ["Die Herkunft des Gemüses ist regional.", "Pôvod tejto zeleniny je regionálny."],
      ["Zertifikate bestätigen die Herkunft.", "Certifikáty potvrdzujú pôvod."]
    ]
  },
  "die Speditionsfirma": {
    sk: "špedičná firma",
    sentences: [
      ["Er arbeitet für eine große Speditionsfirma.", "Pracuje pre veľkú špedičnú firmu."],
      ["Die Speditionsfirma liefert die Möbel heute.", "Špedičná firma dnes doručí nábytok."],
      ["Wir haben die Speditionsfirma beauftragt.", "Poverili sme špedičnú firmu."],
      ["Das ist eine internationale Speditionsfirma.", "To je medzinárodná špedičná firma."],
      ["Die Speditionsfirma hat viele Lastwagen.", "Tá špedičná firma má veľa kamiónov."],
      ["Wir suchen eine zuverlässige Speditionsfirma.", "Hľadáme spoľahlivú špedičnú firmu."],
      ["Die Speditionsfirma transportiert auch ins Ausland.", "Špedičná firma prepravuje aj do zahraničia."],
      ["Die Lieferung erfolgt über eine Speditionsfirma.", "Doručenie sa uskutoční cez špedičnú firmu."],
      ["Eine Speditionsfirma organisierte den Umzug.", "Sťahovanie zorganizovala špedičná firma."],
      ["Wie heißt diese Speditionsfirma?", "Ako sa volá táto špedičná firma?"],
      ["Die Speditionsfirma bietet gute Preise.", "Špedičná firma ponúka dobré ceny."],
      ["Arbeitest du noch bei der Speditionsfirma?", "Pracuješ ešte v tej špedičnej firme?"],
      ["Die Speditionsfirma rief mich an.", "Špedičná firma mi zavolala."],
      ["Logistik ist das Kerngeschäft der Speditionsfirma.", "Logistika je hlavnou činnosťou špedičnej firmy."],
      ["Der Chef der Speditionsfirma ist sehr streng.", "Šéf špedičnej firmy je veľmi prísny."]
    ]
  },
  "die Zahl": {
    sk: "číslo",
    sentences: [
      ["Drei ist eine kleine Zahl.", "Tri je malé číslo."],
      ["Sag mir eine Zahl zwischen eins und zehn.", "Povedz mi číslo od jeden do desať."],
      ["Die Zahl der Touristen steigt jedes Jahr.", "Počet turistov stúpa každý rok."],
      ["Ich mag keine geraden Zahlen.", "Nemám rád párne čísla."],
      ["Das ist eine riesige Zahl.", "To je obrovské číslo."],
      ["Diese Zahl bringt Glück.", "Toto číslo prináša šťastie."],
      ["Die genaue Zahl ist nicht bekannt.", "Presné číslo nie je známe."],
      ["Zehn ist meine Lieblingszahl.", "Desať je moje obľúbené číslo."],
      ["Wir haben eine hohe Zahl an Anfragen.", "Máme veľký počet dopytov."],
      ["Die Zahl vier schreibt man mit vier Buchstaben.", "Číslo štyri sa píše štyrmi písmenami."],
      ["Welche Zahl fehlt hier?", "Aké číslo tu chýba?"],
      ["Er kann sich diese Zahl nicht merken.", "Nevie si zapamätať toto číslo."],
      ["Bitte aktualisieren Sie die Zahl im Dokument.", "Prosím aktualizujte to číslo v dokumente."],
      ["Die mathematische Zahl Pi ist unendlich.", "Matematické číslo pí je nekonečné."],
      ["Unterschätze diese Zahl nicht.", "Nepodceňuj toto číslo."]
    ]
  },
  "der Beruf": {
    sk: "povolanie",
    sentences: [
      ["Was ist Ihr Beruf?", "Aké je vaše povolanie?"],
      ["Er übt seinen Beruf mit Leidenschaft aus.", "Vykonáva svoje povolanie s vášňou."],
      ["Lehrer ist ein schwerer Beruf.", "Učiteľ je ťažké povolanie."],
      ["Mein Traumberuf war immer Arzt.", "Mojím vysnívaným povolaním bol vždy lekár."],
      ["Sie hat ihren Beruf gewechselt.", "Zmenila povolanie."],
      ["Gibt es diesen Beruf noch?", "Existuje ešte toto povolanie?"],
      ["Ich lerne einen neuen Beruf.", "Učím sa na nové povolanie."],
      ["Was machen Sie von Beruf?", "Aké je vaše povolanie?"],
      ["Er arbeitet viel in seinem Beruf.", "Vo svojom povolaní veľa pracuje."],
      ["Die Familie ist wichtiger als der Beruf.", "Rodina je dôležitejšia ako povolanie."],
      ["Manche Berufe sind sehr gefährlich.", "Niektoré povolania sú veľmi nebezpečné."],
      ["Programmierer ist ein moderner Beruf.", "Programátor je moderné povolanie."],
      ["Hat dieser Beruf Zukunft?", "Má toto povolanie budúcnosť?"],
      ["Sein Beruf erfordert viel Geduld.", "Jeho povolanie vyžaduje veľa trpezlivosti."],
      ["In welchem Beruf möchten Sie arbeiten?", "V akom povolaní by ste chceli pracovať?"]
    ]
  },
  "das Alter": {
    sk: "vek",
    sentences: [
      ["Welches Alter haben Sie?", "Aký máte vek?"],
      ["Alter spielt keine Rolle.", "Vek nehrá rolu."],
      ["In deinem Alter war ich schon in der Schule.", "V tvojom veku som bol už v škole."],
      ["Das Alter der Bäume ist unbekannt.", "Vek týchto stromov je neznámy."],
      ["Sie hat ein hohes Alter erreicht.", "Dožila sa vysokého veku."],
      ["Aufgrund des Alters ist das Haus renovierungsbedürftig.", "Kvôli veku dom potrebuje rekonštrukciu."],
      ["Er verheimlicht sein wahres Alter.", "Tají svoj skutočný vek."],
      ["Wir haben dasselbe Alter.", "Sme v rovnakom veku (Máme rovnaký vek)."],
      ["Im Alter wird man ruhiger.", "V starobe sa stáva človek pokojnejším."],
      ["Das mittlere Alter liegt bei 40 Jahren.", "Priemerný vek je okolo 40 rokov."],
      ["Das ist nichts für mein Alter.", "Toto nie je nič pre môj vek."],
      ["Das Alter bringt Weisheit.", "Vek prináša múdrosť."],
      ["Tragen Sie bitte Ihr Alter ein.", "Vyplňte, prosím, svoj vek."],
      ["Haben Sie Respekt vor dem Alter?", "Máte rešpekt voči veku/starším?"],
      ["Das zulässige Alter ist 18 Jahre.", "Povolený vek je 18 rokov."]
    ]
  },
  "der Satz": {
    sk: "veta",
    sentences: [
      ["Dieser Satz ist zu lang.", "Táto veta je príliš dlhá."],
      ["Kannst du diesen Satz übersetzen?", "Môžeš preložiť túto vetu?"],
      ["Ich verstehe den letzten Satz nicht.", "Nerozumiem poslednej vete."],
      ["Ein Satz beginnt mit einem Großbuchstaben.", "Veta začína veľkým písmenom."],
      ["Bitte schreiben Sie einen vollständigen Satz.", "Prosím, napíšte celú vetu."],
      ["Dieser Satz klingt auf Deutsch komisch.", "Táto veta znie po nemecky divne."],
      ["Das ist der erste Satz im Buch.", "Toto je prvá veta v knihe."],
      ["Er wiederholte den gleichen Satz.", "Zopakoval tú istú vetu."],
      ["Der Satz endet mit einem Punkt.", "Veta končí bodkou."],
      ["Jeder Satz muss ein Verb haben.", "Každá veta musí mať sloveso."],
      ["Welcher Satz ist richtig?", "Ktorá veta je správna?"],
      ["Der letzte Satz war sehr wichtig.", "Posledná veta bola veľmi dôležitá."],
      ["Ich merke mir diesen Satz.", "Zapamätám si túto vetu."],
      ["Was bedeutet dieser Satz?", "Čo znamená táto veta?"],
      ["Bitte lies den Text Satz für Satz.", "Prosím čítaj ten text vetu po vete."]
    ]
  },
  "erzählen": {
    sk: "rozprávať (príbeh)",
    sentences: [
      ["Erzähl mir eine Geschichte!", "Rozpovedz mi príbeh!"],
      ["Mein Opa kann gut erzählen.", "Môj dedko vie dobre rozprávať."],
      ["Erzählen Sie etwas über sich.", "Povedzte (niečo) o sebe."],
      ["Ich muss dir was Wichtiges erzählen.", "Musím ti niečo dôležité povedať."],
      ["Hör auf, Lügen zu erzählen!", "Prestaň rozprávať klamstvá!"],
      ["Was hat sie dir erzählt?", "Čo ti ona povedala/porozprávala?"],
      ["Wir saßen zusammen und haben erzählt.", "Sedeli sme spolu a rozprávali sa."],
      ["Darf ich dir etwas erzählen?", "Môžem ti niečo porozprávať?"],
      ["Sie erzählt immer die gleichen Witze.", "Stále rozpráva tie isté vtipy."],
      ["Von wem erzählst du?", "O kom to rozprávaš?"],
      ["Erzähl mal, wie war der Urlaub?", "No rozprávaj, aká bola dovolenka?"],
      ["Ich liebe es, wenn du aus deiner Kindheit erzählst.", "Zbožňujem, keď rozprávaš o svojom detstve."],
      ["Niemand wollte erzählen, was passiert ist.", "Nikto nechcel povedať, čo sa stalo."],
      ["Davon darfst du niemandem erzählen.", "O tomto nesmieš nikomu povedať."],
      ["Der Film erzählt eine wahre Begebenheit.", "Ten film rozpráva skutočnú udalosť."]
    ]
  },
  "die Liste": {
    sk: "zoznam",
    sentences: [
      ["Hast du eine Liste gemacht?", "Urobil si zoznam?"],
      ["Die Liste ist sehr lang.", "Ten zoznam je veľmi dlhý."],
      ["Schreib das auf die Liste.", "Napíš to na ten zoznam."],
      ["Wo ist unsere Einkaufsliste?", "Kde je náš nákupný zoznam?"],
      ["Ich habe eine Liste der Teilnehmer.", "Mám zoznam účastníkov."],
      ["Sie steht ganz oben auf der Liste.", "Je úplne hore na zozname."],
      ["Wer ist der Nächste auf der Liste?", "Kto je ďalší na zozname?"],
      ["Die Liste der Aufgaben ist endlos.", "Zoznam úloh je nekonečný."],
      ["Kannst du die Liste aktualisieren?", "Môžeš aktualizovať ten zoznam?"],
      ["Er arbeitet seine Aufgabenliste ab.", "On vybavuje svoj zoznam úloh."],
      ["Diese Liste ist nicht komplett.", "Tento zoznam nie je kompletný."],
      ["Wir müssen eine neue Liste erstellen.", "Musíme vytvoriť nový zoznam."],
      ["Mein Name fehlt auf der Liste.", "Moje meno chýba na zozname."],
      ["Prüfen Sie bitte die Liste.", "Skontrolujte prosím tento zoznam."],
      ["Das steht nicht auf meiner Prioritätenliste.", "To nie je na mojom zozname priorít."]
    ]
  },
  "planen": {
    sk: "plánovať",
    sentences: [
      ["Was planen wir für das Wochenende?", "Čo plánujeme na víkend?"],
      ["Ich plane, nach Wien zu ziehen.", "Plánujem sa presťahovať do Viedne."],
      ["Planen Sie einen langen Urlaub?", "Plánujete dlhú dovolenku?"],
      ["Ein Haus zu bauen, muss man gut planen.", "Stavať dom, to treba dobre naplánovať."],
      ["Wir planen eine große Überraschung.", "Plánujeme veľké prekvapenie."],
      ["Es ist schwer, die Zukunft zu planen.", "Je ťažké plánovať budúcnosť."],
      ["Wer plant die Reiseroute?", "Kto plánuje trasu cesty?"],
      ["Alles ist perfekt geplant.", "Všetko je perfektne naplánované."],
      ["Ich habe nichts Besonderes geplant.", "Nenaplánoval som nič zvláštne."],
      ["Er plant eine große Party.", "On plánuje veľkú párty."],
      ["Lass uns das Projekt gemeinsam planen.", "Poďme spoločne naplánovať ten projekt."],
      ["Planst du oft im Voraus?", "Plánuješ často dopredu?"],
      ["Wir planen die Aufgaben für die nächste Woche.", "Plánujeme úlohy na budúci týždeň."],
      ["Es ist wichtig, seine Zeit gut zu planen.", "Je dôležité si dobre naplánovať čas."],
      ["Die Hochzeit zu planen, war stressig.", "Plánovať svadbu bolo stresujúce."]
    ]
  },
  "das Fest": {
    sk: "oslava / sviatok",
    sentences: [
      ["Das Fest war wunderbar.", "Tá oslava bola úžasná."],
      ["Weihnachten ist ein wichtiges Fest.", "Vianoce sú dôležitý sviatok."],
      ["Wann beginnt das Fest?", "Kedy začína tá oslava?"],
      ["Wir laden dich zu unserem Fest ein.", "Pozývame ťa na našu oslavu."],
      ["Ein großes Fest findet im Dorf statt.", "V dedine sa koná veľká oslava/slávnosť."],
      ["Das ist ein traditionelles Fest.", "To je tradičný sviatok."],
      ["Zum Fest kommen viele Gäste.", "Na oslavu príde veľa hostí."],
      ["Es gibt ein Fest nach der Ernte.", "Po úrode býva slávnosť."],
      ["Wir feierten ein Fest.", "Slávili sme sviatok/oslavu."],
      ["Das Fest der Liebe.", "Sviatok lásky."],
      ["Bist du auf dieses Fest vorbereitet?", "Si pripravený na túto oslavu?"],
      ["Das Fest dauerte bis zum Morgen.", "Oslava trvala až do rána."],
      ["Musik ist ein wichtiger Teil beim Fest.", "Hudba je na oslave dôležitou súčasťou."],
      ["Ich habe noch kein Geschenk für das Fest.", "Ešte nemám darček na tú oslavu."],
      ["Das nächste Fest organisieren wir.", "Nasledujúcu oslavu zorganizujeme my."]
    ]
  },
  "der Steckbrief": {
    sk: "osobný profil / prehľad",
    sentences: [
      ["Bitte füllen Sie diesen Steckbrief aus.", "Prosím vyplňte tento osobný profil."],
      ["Der Steckbrief hängt an der Wand.", "Ten zatykač/profil visí na stene."],
      ["Kennst du seinen Steckbrief?", "Poznáš jeho profil/parametre?"],
      ["Ein Steckbrief enthält die wichtigsten Daten.", "Profil obsahuje najdôležitejšie údaje."],
      ["Hier ist mein kurzer Steckbrief.", "Tu je môj krátky profil."],
      ["Der Steckbrief des Künstlers war sehr interessant.", "Stručný profil toho umelca bol veľmi zaujímavý."],
      ["Schreiben Sie einen Steckbrief über Ihren Partner.", "Napíšte profil o vašom partnerovi."],
      ["Der gesuchte Verbrecher hat einen Steckbrief.", "Hľadaný zločinec má zatykač."],
      ["Was gehört in den Steckbrief?", "Čo patrí do toho profilu?"],
      ["Auf dem Steckbrief steht auch das Alter.", "V tom profile je uvedený aj vek."],
      ["Wir haben gestern unsere Steckbriefe gelesen.", "Včera sme čítali naše profily."],
      ["Ist das dein Familienstand im Steckbrief?", "Toto je tvoj rodinný stav v profile?"],
      ["Für das Magazin brauchen wir deinen Steckbrief.", "Pre náš magazín potrebujeme tvoj profil."],
      ["Ein Steckbrief ist wie eine kurze Biografie.", "Osobný profil je ako krátka biografia."],
      ["Lesen Sie hier den Steckbrief des Spielers.", "Prečítajte si tu profil hráča."]
    ]
  },
  "der Verwandte": {
    sk: "príbuzný",
    sentences: [
      ["Er ist ein Verwandter von mir.", "On je môj príbuzný."],
      ["Hast du viele Verwandte?", "Máš veľa príbuzných?"],
      ["Wir besuchen an Weihnachten alle Verwandten.", "Na Vianoce navštevujeme všetkých príbuzných."],
      ["Meine Verwandten leben in Berlin.", "Moji príbuzní žijú v Berlíne."],
      ["Sie ist eine entfernte Verwandte.", "Ona je vzdialená príbuzná."],
      ["Wir laden nur die engsten Verwandten ein.", "Pozývame len najužších príbuzných."],
      ["Die Verwandten meiner Frau kommen morgen.", "Príbuzní mojej ženy prídu zajtra."],
      ["Kennst du diesen Verwandten?", "Poznáš tohto príbuzného?"],
      ["Er besucht seine kranken Verwandten.", "On navštevuje svojich chorých príbuzných."],
      ["Ich habe keine Verwandten in Österreich.", "Nemám v Rakúsku žiadnych príbuzných."],
      ["Wir helfen unseren Verwandten oft.", "Často pomáhame našim príbuzným."],
      ["Sind das deine Verwandten?", "Sú to tvoji príbuzní?"],
      ["Der älteste Verwandte in unserer Familie ist mein Opa.", "Najstarší príbuzný v našej rodine je môj dedko."],
      ["Zwei Verwandte haben uns ein Geschenk geschickt.", "Dvaja príbuzní nám poslali darček."],
      ["Familienfeste mit vielen Verwandten sind schön.", "Rodinné oslavy s mnohými príbuznými sú pekné."]
    ]
  },
  "das Mitglied": {
    sk: "člen",
    sentences: [
      ["Bist du Mitglied in diesem Club?", "Si členom tohto klubu?"],
      ["Jedes Mitglied muss zahlen.", "Každý člen musí platiť."],
      ["Sie ist ein neues Mitglied.", "Ona je nová členka."],
      ["Er ist ein Mitglied der Band.", "On je členom kapely."],
      ["Der Verein hat zweihundert Mitglieder.", "Spolok má dvesto členov."],
      ["Unsere Familie hat vier Mitglieder.", "Naša rodina má štyroch členov."],
      ["Ist das Mitglied schon registriert?", "Je ten člen už registrovaný?"],
      ["Mitglieder haben freien Eintritt.", "Členovia majú voľný vstup."],
      ["Ich wurde heute offiziell Mitglied.", "Dnes som sa oficiálne stal členom."],
      ["Welches Mitglied hat das gesagt?", "Ktorý člen to povedal?"],
      ["Jedes Mitglied hat eine Karte.", "Každý člen má kartu."],
      ["Wir suchen nach neuen Mitgliedern.", "Hľadáme nových členov."],
      ["Er ist das älteste Mitglied hier.", "On je tu najstarším členom."],
      ["Das Mitglied hat heute Geburtstag.", "Tento člen má dnes narodeniny."],
      ["Die Partei hat ein neues Mitglied.", "Strana má nového člena."]
    ]
  },
  "welche": {
    sk: "ktorá / aká (otázka)",
    sentences: [
      ["Welche Farbe magst du?", "Akú farbu máš rád?"],
      ["Welche Frau kennst du?", "Ktorú ženu poznáš?"],
      ["Welche Tasche gehört dir?", "Ktorá taška patrí tebe?"],
      ["Welche Sprachen sprichst du?", "Aké (Ktoré) jazyky hovoríš?"],
      ["Welche Probleme gibt es hier?", "Aké sú tu problémy?"],
      ["Ich weiß nicht, welche Blume sie mag.", "Neviem, ktorý kvet má rada."],
      ["Welches Auto ist dein Auto?", "Ktoré auto je tvoje auto?"],
      ["Welchen Mann hast du gesehen?", "Ktorého muža si videl?"],
      ["Welcher Tisch ist frei?", "Ktorý stôl je voľný?"],
      ["An welchem Tag kommst du?", "V ktorý deň prídeš?"],
      ["In welcher Stadt wohnen Sie?", "V ktorom meste bývate?"],
      ["Welche Aufgabe müssen wir machen?", "Akú/Ktorú úlohu musíme robiť?"],
      ["Welchen Beruf hat er?", "Aké má on povolanie?"],
      ["Welche Zahl steht hier?", "Aké číslo tu je napísané?"],
      ["Aus welchem Land kommen Sie?", "Z ktorej krajiny pochádzate?"]
    ]
  },
  "wo": {
    sk: "kde",
    sentences: [
      ["Wo bist du?", "Kde si?"],
      ["Wo wohnen Sie?", "Kde bývate?"],
      ["Wo ist die nächste Tankstelle?", "Kde je najbližšia čerpacia stanica?"],
      ["Woher kommst du?", "Odkiaľ pochádzaš?"],
      ["Wo arbeiten Sie?", "Kde pracujete?"],
      ["Wo liegt Berlin?", "Kde leží Berlín?"],
      ["Wo kann ich hier parken?", "Kde tu môžem parkovať?"],
      ["Weißt du, wo mein Handy ist?", "Vieš, kde je môj mobil?"],
      ["Ich habe vergessen, wo wir uns treffen.", "Zabudol som, kde sa stretneme."],
      ["Wo ist das Problem?", "Kde je problém?"],
      ["Können Sie mir sagen, wo der Bahnhof ist?", "Môžete mi povedať, kde je vlaková stanica?"],
      ["Wo hast du Deutsch gelernt?", "Kde si sa učil po nemecky?"],
      ["Wo warst du gestern?", "Kde si bol včera?"],
      ["Wo gibt es hier gutes Bier?", "Kde je tu dobré pivo?"],
      ["Zeigen Sie mir auf der Karte, wo wir sind.", "Ukážte mi na mape, kde sme."]
    ]
  },
  "wer": {
    sk: "kto",
    sentences: [
      ["Wer ist das?", "Kto je to?"],
      ["Wer hat das Fenster geöffnet?", "Kto otvoril okno?"],
      ["Wer kann mir helfen?", "Kto mi môže pomôcť?"],
      ["Ich weiß nicht, wer er ist.", "Neviem, kto to je."],
      ["Wer von euch spricht Spanisch?", "Kto z vás hovorí po španielsky?"],
      ["Wer ruft an?", "Kto volá?"],
      ["Wer hat die Rechnung bezahlt?", "Kto zaplatil účet?"],
      ["Wer nicht fragt, bleibt dumm.", "Kto sa nepýta, zostane hlúpy."],
      ["Wer hat das gemacht?", "Kto to spravil?"],
      ["Wissen Sie, wer der Chef ist?", "Viete, kto je tu šéf?"],
      ["Wer das liest, ist schlau.", "Kto to číta, je šikovný."],
      ["Wer ist an der Reihe?", "Kto je na rade?"],
      ["Wer hat meinen Kaffee getrunken?", "Kto mi vypil kávu?"],
      ["Mit wem bist du hier? (Wer v datíve)", "S kým si tu?"],
      ["Wen hast du gesehen? (Wer v akuzatíve)", "Koho si videl?"]
    ]
  },
  "wie": {
    sk: "ako",
    sentences: [
      ["Wie heißt du?", "Ako sa voláš?"],
      ["Wie geht es dir?", "Ako sa máš?"],
      ["Wie spät ist es?", "Koľko je hodín? (Ako neskoro je?)"],
      ["Wie alt sind Sie?", "Koľko máte rokov? (Ako ste starý?)"],
      ["Wie funktioniert das?", "Ako to funguje?"],
      ["Wie schreibt man das?", "Ako sa to píše?"],
      ["Wie teuer ist das Ticket?", "Ako drahý je lístok?"],
      ["Ich weiß nicht, wie er das gemacht hat.", "Neviem, ako to urobil."],
      ["Wie ist dein Name?", "Aké je tvoje meno?"],
      ["Wie bitte?", "Prosím? (Ako prosím?)"],
      ["Wie war dein Wochenende?", "Aký bol tvoj víkend?"],
      ["Wie oft gehst du ins Kino?", "Ako často chodíš do kina?"],
      ["Kannst du mir zeigen, wie es geht?", "Môžeš mi ukázať, ako sa to robí?"],
      ["Wie lange dauert die Reise?", "Ako dlho trvá táto cesta?"],
      ["Wie groß ist deine Wohnung?", "Ako veľký je tvoj byt?"]
    ]
  },
  "die Bürste": {
    sk: 'kefa',
    sentences: [
      ['Ich habe eine Bürste.', 'Mám kefu.'],
      ['Wo ist die Bürste?', 'Kde je kefa?'],
      ['Ich kaufe eine neue Bürste.', 'Kúpim novú kefu.'],
      ['Hast du meine Bürste?', 'Máš moju kefu?'],
      ['Das ist eine teure Bürste.', 'Toto je drahá kefa.'],
      ['Ich brauche eine Bürste für die Haare.', 'Potrebujem kefu na vlasy.'],
      ['Die Bürste liegt auf dem Tisch.', 'Kefa leží na stole.'],
      ['Gib mir bitte die Bürste.', 'Daj mi prosím tu kefu.'],
      ['Diese Bürste ist weich.', 'Táto kefa je mäkká.'],
      ['Die Bürste ist kaputt.', 'Kefa je pokazená.'],
      ['Wir verkaufen keine Bürsten.', 'Nepredávame kefy.'],
      ['Kann ich deine Bürste benutzen?', 'Môžem použiť tvoju kefu?'],
      ['Die rote Bürste ist meine.', 'Tá červená kefa je moja.'],
      ['Was kostet diese Bürste?', 'Koľko stojí táto kefa?'],
      ['Die Haarbürste ist im Bad.', 'Kefa na vlasy je v kúpeľni.']
    ]
  },
  "Wie schreibt man...": {
    sk: 'Ako sa píše...',
    sentences: [
      ['Wie schreibt man das?', 'Ako sa to píše?'],
      ['Wie schreibt man das Wort?', 'Ako sa píše to slovo?'],
      ['Wie schreibt man diesen Namen?', 'Ako sa píše toto meno?'],
      ['Wie schreibt man Katze?', 'Ako sa píše mačka?'],
      ['Können Sie mir sagen, wie man das schreibt?', 'Môžete mi povedať, ako sa to píše?'],
      ['Wie schreibt man diesen Buchstaben?', 'Ako sa píše toto písmeno?'],
      ['Wie schreibt man Blume?', 'Ako sa píše kvetina?'],
      ['Er fragt, wie man den Brief schreibt.', 'Pýta sa, ako sa píše ten list.'],
      ['Wie schreibt man das richtig?', 'Ako sa to píše správne?'],
      ['Ich weiß, wie man das schreibt.', 'Ja viem, ako sa to píše.'],
      ['Wie schreibt man das hier?', 'Ako sa to píše tu?'],
      ['Sie lernt, wie man ihren Namen schreibt.', 'Učí sa, ako sa píše jej meno.'],
      ['Zeig mir, wie man das schreibt.', 'Ukáž mi, ako sa to píše.'],
      ['Wie schreibt man das Wort auf Deutsch?', 'Ako sa to slovo píše po nemecky?'],
      ['Ich zeige dir, wie man es schreibt.', 'Ukážem ti, ako sa to píše.']
    ]
  },
  "das Holz": {
    sk: 'drevo',
    sentences: [
      ['Das Haus ist aus Holz.', 'Dom je z dreva.'],
      ['Wir brauchen mehr Holz.', 'Potrebujeme viac dreva.'],
      ['Dieses Holz ist hart.', 'Toto drevo je tvrdé.'],
      ['Der Tisch ist aus Holz.', 'Stôl je z dreva.'],
      ['Holz ist natürlich.', 'Drevo je prírodné.'],
      ['Er hackt Holz.', 'On rúbe drevo.'],
      ['Wir malen das Holz an.', 'Maľujeme to drevo.'],
      ['Holz brennt gut.', 'Drevo dobre horí.'],
      ['Das Holz kommt aus dem Wald.', 'Toto drevo pochádza z lesa.'],
      ['Die Möbel sind aus Holz.', 'Nábytok je z dreva.'],
      ['Altes Holz ist schön.', 'Staré drevo je pekné.'],
      ['Wir schneiden das Holz.', 'Režeme to drevo.'],
      ['Holz ist warm.', 'Drevo je teplé.'],
      ['Sie sammelt Holz für das Feuer.', 'Ona zbiera drevo na oheň.'],
      ['Das Boot ist aus Holz.', 'Tá loď je z dreva.']
    ]
  },
  "bestellen": {
    sk: 'objednať',
    sentences: [
      ['Ich bestelle eine Pizza.', 'Objednám si pizzu.'],
      ['Hast du das Essen bestellt?', 'Objednal si to jedlo?'],
      ['Wir bestellen Getränke.', 'Objednáme nápoje.'],
      ['Ich bestelle das Buch.', 'Objednám tú knihu.'],
      ['Er hat einen Computer bestellt.', 'On si objednal počítač.'],
      ['Was darf ich bestellen?', 'Čo môžem objednať?'],
      ['Ich bestelle ein Taxi.', 'Objednám taxík.'],
      ['Hast du Tickets bestellt?', 'Objednal si lístky?'],
      ['Sie bestellt oft Kleidung.', 'Ona si často objednáva oblečenie.'],
      ['Wir haben einen Tisch bestellt.', 'Objednali sme si stôl.'],
      ['Kannst du Kaffee bestellen?', 'Môžeš objednať kávu?'],
      ['Ich bestelle immer das.', 'Zakaždým objednávam toto.'],
      ['Die Tür ist schon bestellt.', 'Dvere sú už objednané.'],
      ['Ich bestelle Wasser.', 'Objednám vodu.'],
      ['Ich bestelle diese Schuhe.', 'Objednám si tieto topánky.']
    ]
  },
  "die Menge": {
    sk: 'množstvo',
    sentences: [
      ['Die Menge der Daten ist groß.', 'To množstvo dát je veľké.'],
      ['Ich kaufe das in großen Mengen.', 'Kupujem to vo veľkých množstvách.'],
      ['Wir haben eine Menge.', 'Máme jedno množstvo.'],
      ['Eine kleine Menge reicht.', 'Malé množstvo stačí.'],
      ['Wir brauchen eine Menge Geld.', 'Potrebujeme množstvo peňazí.'],
      ['Welche Menge brauchen Sie?', 'Aké množstvo potrebujete?'],
      ['Das ist eine riesige Menge.', 'To je obrovské množstvo.'],
      ['Die Menge ist zu gering.', 'Množstvo je príliš nízke.'],
      ['Er hat eine Menge Arbeit.', 'On má množstvo práce.'],
      ['Sie trinken eine Menge Kaffee.', 'Oni pijú množstvo kávy.'],
      ['Diese Menge ist falsch.', 'Toto množstvo je nesprávne.'],
      ['Das ist die richtige Menge.', 'Toto je správne množstvo.'],
      ['In den Mengen ist das schlecht.', 'V týchto množstvách je to zlé.'],
      ['Wir haben noch eine Menge Zeit.', 'Ešte máme množstvo času.'],
      ['Die Menge an Obst ist groß.', 'Množstvo ovocia je veľké.']
    ]
  },
  "der Unterstrich": {
    sk: 'podčiarkovník',
    sentences: [
      ['Sein Name hat einen Unterstrich.', 'Jeho meno má podčiarkovník.'],
      ['Schreibe das mit Unterstrich.', 'Napíš to s podčiarkovníkom.'],
      ['Wo ist der Unterstrich?', 'Kde je podčiarkovník?'],
      ['Ich nutze den Unterstrich oft.', 'Často používam podčiarkovník.'],
      ['Die E-Mail hat einen Unterstrich.', 'Tá e-mailová adresa má podčiarkovník.'],
      ['Lass den Unterstrich weg.', 'Vynechaj ten podčiarkovník.'],
      ['Ein Unterstrich verbindet Bilder.', 'Jeden podčiarkovník spája obrázky.'],
      ['Der Name hat einen Unterstrich.', 'Názov má podčiarkovník.'],
      ['Wie schreibe ich einen Unterstrich?', 'Ako napíšem podčiarkovník?'],
      ['Das ist ein leichter Unterstrich.', 'To je ľahký podčiarkovník.'],
      ['Tippe den Unterstrich hier.', 'Napíš ten podčiarkovník tu.'],
      ['Hier ist ein Unterstrich.', 'Tu je podčiarkovník.'],
      ['Ist das ein Unterstrich?', 'Je toto podčiarkovník?'],
      ['Dieser Unterstrich ist schwarz.', 'Tento podčiarkovník je čierny.'],
      ['Der Unterstrich ist ein Symbol.', 'Podčiarkovník je symbol.']
    ]
  },
  "die Ware": {
    sk: 'tovar',
    sentences: [
      ['Die Ware ist gekommen.', 'Ten tovar prišiel.'],
      ['Wir verkaufen Waren.', 'Predávame tovary.'],
      ['Diese Ware ist sehr teuer.', 'Tento tovar je veľmi drahý.'],
      ['Die Ware ist gut.', 'Tovar je dobrý.'],
      ['Die Ware ist kaputt.', 'Ten tovar je pokazený.'],
      ['Das Auto bringt die Ware.', 'Auto nesie ten tovar.'],
      ['Er testet die Ware.', 'On testuje tovar.'],
      ['Die Ware ist im Lager.', 'Ten tovar je na sklade.'],
      ['Wir haben neue Ware.', 'Máme nový tovar.'],
      ['Das ist eine teure Ware.', 'Toto je drahý tovar.'],
      ['Wir verschicken die Ware.', 'Posielame ten tovar.'],
      ['Sie kauft schlechte Ware.', 'Ona kupuje zlý tovar.'],
      ['Der Kunde gibt die Ware zurück.', 'Zákazník vracia ten tovar.'],
      ['Wann kommt die Ware?', 'Kedy príde ten tovar?'],
      ['Die Ware ist fertig.', 'Tento tovar je hotový.']
    ]
  },
  "nennen": {
    sk: 'menovať / pomenovať',
    sentences: [
      ['Wie nennt man das?', 'Ako sa to volá?'],
      ['Er nennt sich Künstler.', 'On sa nazýva umelcom.'],
      ['Kannst du Beispiele nennen?', 'Môžeš menovať príklady?'],
      ['Sie nannte mich einen Freund.', 'Ona ma nazvala priateľom.'],
      ['Nennen Sie drei Gründe.', 'Vymenujte tri dôvody.'],
      ['Ich nenne meinen Hund Bello.', 'Svojho psa volám Bello.'],
      ['Das nennt man Pech.', 'Toto sa nazýva smola.'],
      ['Sie nennt ihren Namen nicht.', 'Nehovorí (nemenúva) svoje meno.'],
      ['Wir nennen ihn Max.', 'My ho voláme Max.'],
      ['Nenne etwas Rotes.', 'Pomenuj niečo červené.'],
      ['Das Kind nennt alles Hund.', 'To dieťa nazýva všetko psom.'],
      ['Nennen Sie den Preis.', 'Povedzte (menujte) cenu.'],
      ['Man nennt ihn Chef.', 'Volajú ho šéf.'],
      ['Sie weigert sich, das zu nennen.', 'Ona sa zdráha to menovať.'],
      ['Er ist zuerst genannt.', 'On je menovaný ako prvý.']
    ]
  },
  "weiter": {
    sk: 'ďalej',
    sentences: [
      ['Wir arbeiten weiter.', 'Pracujeme ďalej.'],
      ['Gehen Sie bitte weiter.', 'Choďte, prosím, ďalej.'],
      ['Das Leben geht weiter.', 'Život ide ďalej.'],
      ['Lesen wir weiter im Buch.', 'Čítajme ďalej v tej knihe.'],
      ['Ich kann nicht weiter!', 'Nevládzem ďalej!'],
      ['Was passierte weiter?', 'Čo sa stalo ďalej?'],
      ['Sie fuhr weiter.', 'Cestovala ďalej.'],
      ['Schreiben Sie diesen Satz weiter.', 'Dopíšte túto vetu ďalej.'],
      ['Wir reden weiter.', 'Budeme hovoriť ďalej.'],
      ['Das geht nicht weiter so.', 'Toto ďalej takto nepôjde.'],
      ['Bitte mach weiter!', 'Prosím, pokračuj! (rob ďalej)'],
      ['Singen wir weiter.', 'Spievajme ďalej.'],
      ['Erzählen Sie weiter.', 'Rozprávajte ďalej.'],
      ['Das Auto fuhr einfach weiter.', 'To auto šlo jednoducho ďalej.'],
      ['Ohne Wasser kommen wir nicht weiter.', 'Bez vody sa ďalej nedostaneme.']
    ]
  },
  "der Kunststoff": {
    sk: 'plast / umelá hmota',
    sentences: [
      ['Das ist aus Kunststoff.', 'To je z plastu.'],
      ['Kunststoffe schaden der Natur.', 'Plasty škodia prírode.'],
      ['Wir sammeln diesen Kunststoff.', 'Tento plast zbierame.'],
      ['Das Dach ist aus Kunststoff.', 'Strecha je z plastu.'],
      ['Kunststoff ist billig.', 'Plast je lacný.'],
      ['Er arbeitet mit Kunststoff.', 'On pracuje s plastom.'],
      ['Diese Flasche ist aus Kunststoff.', 'Táto fľaša je z plastu.'],
      ['Man sammelt Kunststoff.', 'Plast sa zbiera.'],
      ['Kunststoff ist manchmal gut.', 'Plast je niekedy dobrý.'],
      ['Das Teil ist aus Kunststoff.', 'Ten diel je z plastu.'],
      ['Die Stühle sind aus Kunststoff.', 'Stoličky sú z umelej hmoty.'],
      ['Kunststoff ist praktisch.', 'Plast je praktický.'],
      ['Er nimmt Taschen aus Kunststoff.', 'On berie plastové tašky.'],
      ['Dieser Kunststoff ist alt.', 'Tento plast je starý.'],
      ['Wir kaufen Sachen aus Kunststoff.', 'Kupujeme veci z plastu.']
    ]
  },
  "die Wiederholung": {
    sk: 'opakovanie',
    sentences: [
      ['Die Wiederholung ist wichtig.', 'Opakovanie je dôležité.'],
      ['Wir sehen die Wiederholung an.', 'Pozeráme sa na opakovanie.'],
      ['Ich brauche keine Wiederholung.', 'Ja nepotrebujem opakovanie.'],
      ['Die Wiederholung nervt.', 'To opakovanie lezie na nervy.'],
      ['Zur Wiederholung, bitte lesen.', 'Na zopakovanie, prosím čítajte.'],
      ['Das Programm zeigt eine Wiederholung.', 'Program ukazuje reprízu.'],
      ['Er bat um eine Wiederholung.', 'Požiadal o zopakovanie.'],
      ['Die Lektion ist zur Wiederholung.', 'Táto lekcia slúži na zopakovanie.'],
      ['Ich lerne durch Wiederholung.', 'Učím sa pomocou opakovania.'],
      ['Der Film war eine Wiederholung.', 'Ten film bol opakovaním.'],
      ['Eine Wiederholung ist nicht möglich.', 'Opakovanie nie je možné.'],
      ['Das ist eine Wiederholung vom Spiel.', 'To je opakovanie zo zápasu.'],
      ['Das ist eine bloße Wiederholung.', 'To je obyčajné opakovanie.'],
      ['Die Wörter brauchen Wiederholungen.', 'Tie slová potrebujú opakovania.'],
      ['Diese Szene ist eine Wiederholung.', 'Táto scéna je opakovaním.']
    ]
  },
  "das Streichholz": {
    sk: 'zápalka',
    sentences: [
      ['Gib mir ein Streichholz.', 'Daj mi jednu zápalku.'],
      ['Ich habe ein Streichholz.', 'Mám tú zápalku.'],
      ['Er hat das Streichholz.', 'On má zápalku.'],
      ['Brennt das Streichholz?', 'Horí tá zápalka?'],
      ['Das Streichholz ist kaputt.', 'Zápalka je pokazená.'],
      ['Das Streichholz ist kurz.', 'Zápalka je krátka.'],
      ['Kinder haben keine Streichhölzer.', 'Deti nemajú zápalky.'],
      ['Wir brauchen Streichhölzer.', 'Potrebujeme zápalky.'],
      ['Das ist nur ein Streichholz.', 'To je len jedna zápalka.'],
      ['Papi hat ein Streichholz.', 'Ocko má zápalku.'],
      ['Hast du Streichhölzer?', 'Máš zápalky?'],
      ['Das Streichholz funktioniert nicht.', 'Zápalka nefunguje.'],
      ['Streichhölzer sind aus Holz.', 'Zápalky sú z dreva.'],
      ['Sie nimmt ein Streichholz.', 'Ona berie zápalku.'],
      ['Das Streichholz ist in der Küche.', 'Zápalka je v kuchyni.']
    ]
  },
  "der Föhn": {
    sk: 'fén',
    sentences: [
      ['Ich föhne Haare mit dem Föhn.', 'Fénujem vlasy fénom.'],
      ['Der Föhn ist kaputt.', 'Fén je pokazený.'],
      ['Leihst du mir den Föhn?', 'Požičiaš mi ten fén?'],
      ['Im Bad ist ein Föhn.', 'V kúpeľni je fén.'],
      ['Ein guter Föhn ist teuer.', 'Dobrý fén je drahý.'],
      ['Der Föhn ist heiß.', 'Fén je horúci.'],
      ['Hast du den Föhn?', 'Máš ten fén?'],
      ['Mein Föhn geht nicht.', 'Môj fén nefunguje.'],
      ['Die Frau hat den Föhn.', 'Žena má fén.'],
      ['Dieser Föhn ist laut.', 'Tento fén je hlučný.'],
      ['Mach den Föhn aus.', 'Vypni ten fén.'],
      ['Ich brauche einen neuen Föhn.', 'Potrebujem nový fén.'],
      ['Der Reise-Föhn ist klein.', 'Cestovný fén je malý.'],
      ['Wo ist mein Föhn?', 'Kde je môj fén?'],
      ['Ist der Föhn neu?', 'Je ten fén nový?']
    ]
  },
  "und so weiter": {
    sk: 'a tak ďalej',
    sentences: [
      ['Ich kaufe Brot, Milch und so weiter.', 'Kupujem chlieb, mlieko a tak ďalej.'],
      ['Wir brauchen Tische und so weiter.', 'Potrebujeme stoly a tak ďalej.'],
      ['Ich mag Sport und so weiter.', 'Mám rád šport a tak ďalej.'],
      ['Sie sprach über das Wetter und so weiter.', 'Hovorila o počasí a tak ďalej.'],
      ['Die Liste hat Bücher und so weiter.', 'Zoznam obsahuje knihy a tak ďalej.'],
      ['Zähle von eins bis zehn und so weiter.', 'Počítaj od jeden do desať a tak ďalej.'],
      ['Wir besuchten Rom und so weiter.', 'Navštívili sme Rím a tak ďalej.'],
      ['Fragen nach Namen und so weiter.', 'Pýtajú sa na meno a tak ďalej.'],
      ['Der Garten hat Bäume und so weiter.', 'Záhrada má stromy a tak ďalej.'],
      ['Ich esse Obst und so weiter.', 'Jem ovocie a tak ďalej.'],
      ['Der Chef erklärte alles und so weiter.', 'Šéf vysvetlil všetko a tak ďalej.'],
      ['Wir putzen und so weiter.', 'Upratujeme a tak ďalej.'],
      ['Die Kinder lernen und so weiter.', 'Deti sa učia a tak ďalej.'],
      ['Wir brauchen Zeit und so weiter.', 'Potrebujeme čas a tak ďalej.'],
      ['Er sang und so weiter.', 'Spieval a tak ďalej.']
    ]
  },
  "das Ding": {
    sk: 'vec',
    sentences: [
      ['Was ist das Ding?', 'Čo je tá vec?'],
      ['Dieses Ding funktioniert nicht.', 'Táto vec nefunguje.'],
      ['Wie heißt das Ding?', 'Ako sa volá táto vec?'],
      ['Das Ding fällt ins Wasser.', 'Tá vec padá do vody.'],
      ['Wofür ist dieses Ding?', 'Na čo je táto vec?'],
      ['Nimm das Ding weg!', 'Daj tú vec preč!'],
      ['Es ist ein kleines Ding.', 'Je to malá vec.'],
      ['Welches Ding gehört dir?', 'Ktorá vec patrí tebe?'],
      ['Das Ding dort ist seltsam.', 'Tá vec tam je zvláštna.'],
      ['Ich habe das Ding.', 'Mám tú vec.'],
      ['Das ist mein Ding.', 'To je moja vec.'],
      ['Solche Dinge passieren.', 'Takéto veci sa stávajú.'],
      ['Ich kaufe das Ding.', 'Kúpim tú vec.'],
      ['Das Ding ist sehr wertvoll.', 'Tá vec je veľmi cenná.'],
      ['Das ist ein komisches Ding.', 'Toto je divná vec.']
    ]
  },
  "die Postleitzahl": {
    sk: 'PSČ',
    sentences: [
      ['Was ist Ihre Postleitzahl?', 'Aké je vaše PSČ?'],
      ['Ich habe die Postleitzahl vergessen.', 'Zabudol som PSČ.'],
      ['Die Postleitzahl ist für die Stadt.', 'PSČ je tu pre mesto.'],
      ['Die Postleitzahl ist falsch.', 'To PSČ je nesprávne.'],
      ['Die Postleitzahl hat fünf Ziffern.', 'PSČ má päť číslic.'],
      ['Das System erkennt die Postleitzahl nicht.', 'Systém nepozná toto PSČ.'],
      ['Buchstabieren Sie die Postleitzahl.', 'Vyhláskujte to PSČ.'],
      ['Das ist eine Postleitzahl.', 'Toto je PSČ.'],
      ['Wir haben Briefe nach Postleitzahl.', 'Máme listy podľa PSČ.'],
      ['Ein Paket braucht eine Postleitzahl.', 'Balík potrebuje PSČ.'],
      ['Wo ist die Postleitzahl?', 'Kde je PSČ?'],
      ['Tragen Sie die Postleitzahl ein.', 'Zadajte sem PSČ.'],
      ['Sie hat dieselbe Postleitzahl.', 'Ona má rovnaké PSČ.'],
      ['Diese Postleitzahl kenne ich nicht.', 'Toto PSČ nepoznám.'],
      ['Prüfen Sie die Postleitzahl.', 'Skontrolujte to PSČ.']
    ]
  },
  "die Seife": {
    sk: 'mydlo',
    sentences: [
      ['Ich wasche mich mit Seife.', 'Umývam sa mydlom.'],
      ['Die Seife riecht gut.', 'To mydlo vonia dobre.'],
      ['Ich kaufe Seife.', 'Kupujem mydlo.'],
      ['Die Seife fällt herunter.', 'Mydlo padá dole.'],
      ['Wo ist die Seife?', 'Kde je mydlo?'],
      ['Das ist deine Seife.', 'Toto je tvoje mydlo.'],
      ['Die Seife ist weich.', 'Toto mydlo je mäkké.'],
      ['Er bringt Seife.', 'On priniesol mydlo.'],
      ['Wir haben keine Seife im Bad.', 'Nemáme v kúpeľni mydlo.'],
      ['Ist das Seife?', 'Je toto mydlo?'],
      ['Das Kind spielt mit Seife.', 'To dieťa sa hrá s mydlom.'],
      ['Das Wasser hat viel Seife.', 'Vo vode je veľa mydla.'],
      ['Diese Seife ist handgemacht.', 'Toto mydlo je ručne robené.'],
      ['Die Seife brennt.', 'Mydlo štípe.'],
      ['Möchtest du Seife?', 'Chceš mydlo?']
    ]
  },
  "sich bedanken": {
    sk: 'poďakovať sa',
    sentences: [
      ['Ich bedanke mich.', 'Ďakujem (sa).'],
      ['Er bedankt sich für das Geschenk.', 'On sa poďakoval za darček.'],
      ['Wir bedanken uns.', 'Úprimne ďakujeme.'],
      ['Sie muss sich bedanken.', 'Ona sa musí poďakovať.'],
      ['Du brauchst dich nicht zu bedanken.', 'Nemusíš sa ďakovať.'],
      ['Hast du dich bedankt?', 'Už si sa poďakoval?'],
      ['Ich bedanke mich jetzt.', 'Ďakujem teraz.'],
      ['Er vergaß, sich zu bedanken.', 'Zabudol sa poďakovať.'],
      ['Die Frau bedankt sich.', 'Žena sa poďakovala.'],
      ['Bedank dich beim Vater.', 'Poďakuj sa otcovi.'],
      ['Er wird sich bedanken.', 'On sa poďakuje.'],
      ['Wir bedanken uns bei Gästen.', 'Ďakujeme sa všetkým hosťom.'],
      ['Sie schreibt, um sich zu bedanken.', 'Píše, aby sa poďakovala.'],
      ['Dafür bedanke ich mich.', 'Za to sa ďakujem.'],
      ['Ich bedanke mich für die Zeit.', 'Ďakujem (sa) za váš čas.']
    ]
  },
  "zeichnen": {
    sk: 'kresliť',
    sentences: [
      ['Sie zeichnet gut.', 'Ona dobre kreslí.'],
      ['Er zeichnet ein Haus.', 'Nakreslí dom.'],
      ['Ich zeichne gerne.', 'Rád kreslím.'],
      ['Das Kind zeichnet.', 'To dieťa kreslí.'],
      ['Wir zeichnen in der Schule.', 'V škole kreslíme.'],
      ['Gestern haben wir gezeichnet.', 'Včera sme kreslili.'],
      ['Kannst du einen Hund zeichnen?', 'Môžeš nakresliť psa?'],
      ['Ich zeichne nicht.', 'Nekreslím.'],
      ['Es ist schwer zu zeichnen.', 'Kresliť (človeka) je ťažké.'],
      ['Zeichnen ist ein Hobby.', 'Kreslenie je hobby.'],
      ['Der Mann zeichnet den Plan.', 'Ten muž kreslí plán.'],
      ['Sie zeichnet Comics.', 'Ona kreslí komiksy.'],
      ['Ich lerne zeichnen.', 'Učím sa kresliť.'],
      ['Wir zeichnen schön.', 'My pekne kreslíme.'],
      ['Was zeichnest du?', 'Čo kreslíš?']
    ]
  },
  "auf": {
    sk: 'na',
    sentences: [
      ['Das Buch ist auf dem Tisch.', 'Kniha je na stole.'],
      ['Sie geht auf die Party.', 'Ona ide na párty.'],
      ['Wir sitzen auf der Bank.', 'Sedíme na lavičke.'],
      ['Das Getränk geht auf mich.', 'Nápoj ide na mňa.'],
      ['Wir waren auf dem Berg.', 'Boli sme na hore.'],
      ['Pass auf!', 'Dávaj pozor!'],
      ['Das Bild ist auf dieser Etage.', 'Ten obraz visí na tomto poschodí.'],
      ['Wir spielen auf Deutsch.', 'Hráme sa po nemecky.'],
      ['Er wartet auf mich.', 'On čaká na mňa.'],
      ['Auf welcher Seite sind wir?', 'Na ktorej strane sme?'],
      ['Kinder sind auf dem Spielplatz.', 'Deti sú na ihrisku.'],
      ['Wir sind auf dem Wasser.', 'Sme na vode.'],
      ['Wartest du auf mich?', 'Čakáš na mňa?'],
      ['Ich fahre auf dem Platz.', 'Jazdím na námestí.'],
      ['Der Apfel fällt auf den Boden.', 'Jablko padá na zem.']
    ]
  },
  "die Anrede": {
    sk: 'oslovenie',
    sentences: [
      ['Die Anrede ist sehr wichtig.', 'To oslovenie je veľmi dôležité.'],
      ['Was ist die übliche Anrede?', 'Aké je bežné oslovenie?'],
      ['Das ist eine formelle Anrede.', 'To je formálne oslovenie.'],
      ['Die Anrede ist falsch.', 'To oslovenie bolo nesprávne.'],
      ['Welche Anrede ist gut?', 'Aké oslovenie je dobré?'],
      ['Das ist keine Anrede.', 'To nie je oslovenie.'],
      ['Schreibe eine gute Anrede.', 'Napíš nejaké dobré oslovenie.'],
      ['Die Anrede steht im E-Mail.', 'To oslovenie je v emaile.'],
      ['Gibt es eine neutrale Anrede?', 'Existuje bezpečné (neutrálne) oslovenie?'],
      ['Das ist die richtige Anrede.', 'Toto je správne oslovenie.'],
      ['Ist das die bessere Anrede?', 'Je toto lepším oslovením?'],
      ['Wir achten auf die Anrede.', 'Dávame si pozor na oslovenie.'],
      ['Eine Anrede ist höflich.', 'Oslovenie je slušné.'],
      ['Damen und Herren ist eine Anrede.', 'Dámy a páni je oslovenie.'],
      ['Ich mache bei der Anrede einen Fehler.', 'Robím chybu pri oslovení.']
    ]
  }
};

const ihrShadowingSentences = [
  { de: "Habt ihr Zeit?", sk: "Máte čas?" },
  { de: "Wo seid ihr?", sk: "Kde ste?" },
  { de: "Geht ihr heute Abend ins Kino?", sk: "Idete dnes večer do kina?" },
  { de: "Was macht ihr am Wochenende?", sk: "Čo robíte cez víkend?" },
  { de: "Kommt ihr mit uns?", sk: "Idete s nami?" },
  { de: "Warum lacht ihr?", sk: "Prečo sa smejete?" },
  { de: "Habt ihr die Hausaufgaben gemacht?", sk: "Urobili ste si domáce úlohy?" },
  { de: "Könnt ihr mir bitte helfen?", sk: "Môžete mi prosím pomôcť?" },
  { de: "Wollt ihr noch etwas trinken?", sk: "Chcete ešte niečo piť?" },
  { de: "Wisst ihr, wo der Bahnhof ist?", sk: "Viete, kde je železničná stanica?" },
  { de: "Seht ihr das rote Auto dort?", sk: "Vidíte tam to červené auto?" },
  { de: "Hört ihr die Musik?", sk: "Počujete tú hudbu?" },
  { de: "Sprecht ihr Deutsch?", sk: "Hovoríte po nemecky?" },
  { de: "Versteht ihr den Satz?", sk: "Rozumiete tej vete?" },
  { de: "Lest ihr gerne Bücher?", sk: "Čítate radi knihy?" },
  { de: "Esst ihr gern Pizza?", sk: "Jete radi pizzu?" },
  { de: "Nehmt ihr den Bus oder den Zug?", sk: "Pôjdete (vezmete si) autobusom alebo vlakom?" },
  { de: "Fahrt ihr oft nach Wien?", sk: "Cestujete často do Viedne?" },
  { de: "Schlaft ihr schon?", sk: "Už spíte?" },
  { de: "Arbeitet ihr heute lange?", sk: "Pracujete dnes dlho?" },
  { de: "Findet ihr das interessant?", sk: "Pripadá vám to zaujímavé? (Považujete to za zaujímavé?)" },
  { de: "Gebt ihr mir das Buch, bitte?", sk: "Dáte mi tú knihu, prosím?" },
  { de: "Lauft ihr jeden Tag im Park?", sk: "Beháte každý deň v parku?" },
  { de: "Was lest ihr gerade?", sk: "Čo práve čítate?" },
  { de: "Wie geht es euch?", sk: "Ako sa máte?" },
  { de: "Ich danke euch für die Hilfe.", sk: "Ďakujem vám za pomoc." },
  { de: "Das Geschenk ist für euch.", sk: "Ten darček je pre vás." },
  { de: "Kann ich euch etwas fragen?", sk: "Môžem sa vás niečo opýtať?" },
  { de: "Ich habe euch gestern im Supermarkt gesehen.", sk: "Videl som vás včera v supermarkete." },
  { de: "Euer Hund ist sehr süß.", sk: "Váš pes je veľmi zlatý." },
  { de: "Sind das eure Kinder?", sk: "Sú to vaše deti?" },
  { de: "Wo ist euer Haus?", sk: "Kde je váš dom?" },
  { de: "Habt ihr euren Schlüssel vergessen?", sk: "Zabudli ste si (váš) kľúč?" },
  { de: "Müsst ihr jetzt gehen?", sk: "Musíte už ísť?" },
  { de: "Dürft ihr hier parken?", sk: "Smiete tu parkovať?" },
  { de: "Sollt ihr das so machen?", sk: "Máte to takto urobiť?" },
  { de: "Mögt ihr Schokolade?", sk: "Máte radi čokoládu?" },
  { de: "Seid ihr gestern im Schwimmbad gewesen?", sk: "Boli ste včera na kúpalisku?" },
  { de: "Habt ihr den Film schon gesehen?", sk: "Už ste videli ten film?" },
  { de: "Wann seid ihr angekommen?", sk: "Kedy ste prišli?" },
  { de: "Was habt ihr am Sonntag gegessen?", sk: "Čo ste jedli v nedeľu?" },
  { de: "Zieht euch bitte warm an!", sk: "Oblečte sa prosím teplo!" },
  { de: "Habt ihr euch gut erholt?", sk: "Oddýchli ste si dobre?" },
  { de: "Setzt euch, bitte!", sk: "Sadnite si, prosím!" },
  { de: "Interessiert ihr euch für Kunst?", sk: "Zaujímate sa o umenie?" },
  { de: "Freut ihr euch auf den Urlaub?", sk: "Tešíte sa na dovolenku?" },
  { de: "Trefft ihr euch am Abend?", sk: "Stretnete sa večer?" },
  { de: "Wann steht ihr morgens auf?", sk: "Kedy ráno vstávate?" },
  { de: "Räumt ihr bitte euer Zimmer auf?", sk: "Upracete si, prosím, (vašu) izbu?" },
  { de: "Kommt ihr bitte herein?", sk: "Poďte prosím dnu?" }
];

// 1. Build hardwords.js for VocabTrainer
const vocabChapters = Object.keys(data).map((word, i) => {
  const meta = data[word];
  const items = meta.sentences.map((pair, j) => {
    return {
      de: pair[0],
      sk: pair[1],
      example: word,
      exampleSk: meta.sk
    };
  });
  return {
    id: 'hard_drill_' + i,
    title: '' + word + ' (' + meta.sk + ')',
    vocab: items
  };
});

const vocabOutput = [
  "export const hardwordsDeck = {",
  "  id: 'hardwords',",
  "  title: 'Drill Problémových Slov',",
  "  description: 'Intenzívny tréning problematických slov (15 viet na každé slovo).',",
  "  chapters: " + JSON.stringify(vocabChapters, null, 2),
  "};"
].join('\n');

fs.writeFileSync('src/data/decks/hardwords.js', vocabOutput);
console.log('Created src/data/decks/hardwords.js');

// 2. Build shadowing version
const shadowingItems = Object.keys(data).map((word, i) => {
  const meta = data[word];
  const segments = meta.sentences.map((pair, j) => {
    return {
      id: 'h' + i + 's' + j,
      german: pair[0],
      slovak: pair[1],
      category: 'drill'
    };
  });
  return {
    id: 'hard_shadow_' + i,
    categoryName: 'Problematické Slovíčka',
    title: '' + word + ' (Drill)',
    description: '15 rôznych viet pre upevnenie slova ' + word + '.',
    segments
  };
});

// Add ihr contextual sentences as a shadowing category
shadowingItems.push({
  id: 'hard_shadow_ihr_context',
  categoryName: 'IHR Špeciálny Drill',
  title: 'IHR - Kontextové Vety (Drill)',
  description: '50 viet pre rýchle zautomatizovanie vykania v množnom čísle (ihr / euch / euer).',
  segments: ihrShadowingSentences.map((d, j) => ({
    id: 'ihrc_' + j,
    german: d.de,
    slovak: d.sk,
    category: 'drill'
  }))
});

const shadowOutput = [
  "export const hardwordsShadowing = " + JSON.stringify(shadowingItems, null, 2) + ";"
].join('\n');

fs.writeFileSync('src/data/shadowingHardwords.js', shadowOutput);
console.log('Created src/data/shadowingHardwords.js');
