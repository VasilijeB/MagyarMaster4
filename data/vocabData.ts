import { DifficultyLevel } from '../types';

interface VocabEntry {
  serbian: string;
  hungarian: string;
  hungarianAlt: string[]; // Synonyms
}

// Helper to create entry
const c = (ser: string, hun: string, alt: string[] = []): VocabEntry => ({ serbian: ser, hungarian: hun, hungarianAlt: alt });

// --- NOUNS ---
export const NOUNS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    // Basic & Household
    c("stvar", "dolog"), c("svet", "világ"), c("ljudi", "emberek"), c("glava", "fej"),
    c("lice", "arc"), c("ruka", "kéz"), c("noga", "láb"), c("prst", "ujj"),
    c("stomak", "has"), c("leđa", "hát"), c("srce", "szív"), c("krv", "vér"),
    c("dan", "nap"), c("noć", "éjszaka"), c("jutro", "reggel"), c("veče", "este"),
    c("podne", "dél"), c("sat", "óra"), c("minut", "perc"), c("sekunda", "másodperc"),
    c("voda", "víz"), c("vatra", "tűz"), c("vazduh", "levegő"), c("zemlja", "föld"),
    c("soba", "szoba"), c("krevet", "ágy"), c("vrata", "ajtó"), c("prozor", "ablak"),
    c("sto", "asztal"), c("stolica", "szék"), c("pod", "padló"), c("zid", "fal"),
    c("krov", "tető"), c("bašta", "kert"), c("ulica", "utca"), c("grad", "város"),
    c("selo", "falu"), c("put", "út"), c("auto", "autó"), c("autobus", "busz"),
    c("bicikl", "bicikli"), c("voz", "vonat"), c("brod", "hajó"), c("avion", "repülő"),
    c("škola", "iskola"), c("posao", "munka"), c("prodavnica", "bolt"), c("pijaca", "piac"),
    c("hleb", "kenyér"), c("mleko", "tej"), c("voda", "víz"), c("kafa", "kávé"),
    c("čaj", "tea"), c("meso", "hús"), c("sir", "sajt"), c("jaje", "tojás"),
    c("jabuka", "alma"), c("kruška", "körte"), c("banána", "banán"), c("pas", "kutya"),
    c("mačka", "macska"), c("ptica", "madár"), c("riba", "hal"), c("konj", "ló"),
    c("otac", "apa"), c("majka", "anya"), c("brat", "fiútestvér"), c("sestra", "lánytestvér"),
    c("sin", "fia valakinek"), c("ćerka", "lánya valakinek"), c("deda", "nagypapa"), c("baka", "nagymama"),
    c("prijatelj", "barát"), c("čovek", "ember"), c("žena", "nő"), c("muškarac", "férfi"),
    c("dete", "gyerek"), c("ime", "név"), c("broj", "szám"), c("boja", "szín")
  ],
  2: [
    // Daily Life & City
    c("stanica", "állomás"), c("aerodrom", "repülőtér"), c("karta", "jegy"), c("prtljag", "csomag"),
    c("pasoš", "útlevél"), c("hotel", "szálloda"), c("soba", "szoba"), c("ključ", "kulcs"),
    c("restoran", "étterem"), c("jelovnik", "étlap"), c("račun", "számla"), c("konobar", "pincér"),
    c("novac", "pénz"), c("banka", "bank"), c("pošta", "posta"), c("marka", "bélyeg"),
    c("pismo", "levél"), c("paket", "csomag"), c("telefon", "telefon"), c("internet", "internet"),
    c("računar", "számítógép"), c("ekran", "képernyő"), c("miš", "egér"), c("tastatura", "billentyűzet"),
    c("lekar", "orvos"), c("bolnica", "kórház"), c("apoteka", "gyógyszertár"), c("lek", "gyógyszer"),
    c("bol", "fájdalom"), c("zdravlje", "egészség"), c("policija", "rendőrség"), c("pomoć", "segítség"),
    c("vatrogasac", "tűzoltó"), c("učitelj", "tanár"), c("učenik", "diák"), c("čas", "óra (tanóra)"),
    c("knjiga", "könyv"), c("sveska", "füzet"), c("olovka", "toll"), c("torba", "táska"),
    c("odeća", "ruha"), c("cipela", "cipő"), c("pantalone", "nadrág"), c("košulja", "ing"),
    c("majica", "póló"), c("jakna", "dzseki"), c("kaput", "kabát"), c("kapa", "sapka"),
    c("šal", "sál"), c("rukavice", "kesztyű"), c("čarapa", "zokni"), c("haljina", "ruha (női)"),
    c("suknja", "szoknya"), c("naočare", "szemüveg"), c("sat", "karóra"), c("nakit", "ékszer"),
    c("vreme", "időjárás"), c("sunce", "nap"), c("kiša", "eső"), c("sneg", "hó"),
    c("vetar", "szél"), c("oblak", "felhő"), c("stepen", "fok"), c("leto", "nyár"),
    c("zima", "tél"), c("proleće", "tavasz"), c("jesen", "ősz"), c("vikend", "hétvége")
  ],
  3: [
    // Specific & Descriptive
    c("kuhinja", "konyha"), c("nappali", "nappali"), c("kupatilo", "fürdőszoba"), c("hodnik", "előszoba"),
    c("frižider", "hűtőszekrény"), c("šporet", "tűzhely"), c("rerna", "sütő"), c("mikrotalasna", "mikrohullámú sütő"),
    c("mašina", "gép"), c("tanjir", "tányér"), c("viljuška", "villa"), c("kašika", "kanál"),
    c("nož", "kés"), c("čaša", "pohár"), c("šolja", "bögre"), c("flaša", "üveg/palack"),
    c("hrana", "étel"), c("piće", "ital"), c("voće", "gyümölcs"), c("povrće", "zöldség"),
    c("krompir", "burgonya"), c("paradajz", "paradicsom"), c("paprika", "paprika"), c("luk", "hagyma"),
    c("beli luk", "fokhagyma"), c("šargarepa", "sárgarépa"), c("kupus", "káposzta"), c("pasulj", "bab"),
    c("grašak", "borsó"), c("pirinač", "rizs"), c("testenina", "tészta"), c("piletina", "csirke"),
    c("svinjetina", "sertés"), c("govedina", "marha"), c("riba", "hal"), c("ulje", "olaj"),
    c("so", "só"), c("biber", "bors"), c("šećer", "cukor"), c("brašno", "liszt"),
    c("puter", "vaj"), c("sladoled", "fagylalt"), c("torta", "torta"), c("kolač", "sütemény"),
    c("čokolada", "csokoládé"), c("sok", "gyümölcslé"), c("pivo", "sör"), c("vino", "bor"),
    c("životinja", "állat"), c("lav", "oroszlán"), c("tigar", "tigris"), c("slon", "elefánt"),
    c("medved", "medve"), c("vuk", "farkas"), c("lisica", "róka"), c("zmija", "kígyó"),
    c("drvo", "fa"), c("cvet", "virág"), c("trava", "fű"), c("reka", "folyó"),
    c("jezero", "tó"), c("more", "tenger"), c("planina", "hegy"), c("šuma", "erdő"),
    c("plaža", "strand"), c("ostrvo", "sziget"), c("most", "híd"), c("zgrada", "épület")
  ],
  4: [
    // Abstract & Society
    c("kultura", "kultúra"), c("umetnost", "művészet"), c("muzika", "zene"), c("film", "film"),
    c("pozorište", "színház"), c("književnost", "irodalom"), c("istorija", "történelem"), c("nauka", "tudomány"),
    c("matematika", "matematika"), c("fizika", "fizika"), c("hemija", "kémia"), c("biologija", "biológia"),
    c("geografija", "földrajz"), c("jezik", "nyelv"), c("gramatika", "nyelvtan"), c("reč", "szó"),
    c("rečenica", "mondat"), c("tekst", "szöveg"), c("pitanje", "kérdés"), c("odgovor", "válasz"),
    c("problem", "probléma"), c("rešenje", "megoldás"), c("ideja", "ötlet"), c("plan", "terv"),
    c("cilj", "cél"), c("uspeh", "siker"), c("neuspeh", "kudarc"), c("sreća", "szerencse/boldogság"),
    c("ljubav", "szerelem/szeretet"), c("mržnja", "gyűlölet"), c("strah", "félelem"), c("nada", "remény"),
    c("mir", "béke"), c("rat", "háború"), c("sloboda", "szabadság"), c("zakon", "törvény"),
    c("pravo", "jog"), c("pravda", "igazság"), c("politika", "politika"), c("vlada", "kormány"),
    c("predsednik", "elnök"), c("stranka", "párt"), c("izbori", "választások"), c("država", "állam/ország"),
    c("granica", "határ"), c("društvo", "társadalom"), c("ekonomija", "gazdaság"), c("industrija", "ipar"),
    c("poljoprivreda", "mezőgazdaság"), c("okolina", "környezet"), c("priroda", "természet"), c("klima", "klíma"),
    c("zagađenje", "szennyezés"), c("zaštita", "védelem"), c("informacija", "információ"), c("vest", "hír"),
    c("mediji", "média"), c("novine", "újság"), c("televizija", "televízió"), c("radio", "rádió")
  ],
  5: [
    // Professional & Complex
    c("situacija", "helyzet"), c("uslov", "feltétel"), c("uzrok", "ok"), c("posledica", "következmény"),
    c("rezultat", "eredmény"), c("razlika", "különbség"), c("sličnost", "hasonlóság"), c("veza", "kapcsolat"),
    c("uticaj", "hatás"), c("promena", "változás"), c("razvoj", "fejlődés"), c("rast", "növekedés"),
    c("pad", "csökkenés"), c("nivo", "szint"), c("kvalitet", "minőség"), c("kvantitet", "mennyiség"),
    c("vrednost", "érték"), c("cena", "ár"), c("trošak", "költség"), c("profit", "nyereség"),
    c("gubitak", "veszteség"), c("ponuda", "kínálat"), c("potražnja", "kereslet"), c("tržište", "piac"),
    c("firma", "cég"), c("preduzeće", "vállalat"), c("ugovor", "szerződés"), c("dogovor", "megállapodás"),
    c("sastanak", "értekezlet/találkozó"), c("projekat", "projekt"), c("zadatak", "feladat"), c("cilj", "célkitűzés"),
    c("strategija", "stratégia"), c("metoda", "módszer"), c("sistem", "rendszer"), c("struktura", "szerkezet"),
    c("proces", "folyamat"), c("analiza", "elemzés"), c("podatak", "adat"), c("činjenica", "tény"),
    c("teorija", "elmélet"), c("praksa", "gyakorlat"), c("iskustvo", "tapasztalat"), c("znanje", "tudás"),
    c("veština", "készség"), c("sposobnost", "képesség"), c("mogućnost", "lehetőség"), c("izazov", "kihívás"),
    c("rizik", "kockázat"), c("sigurnost", "biztonság"), c("odgovornost", "felelősség"), c("obaveza", "kötelezettség"),
    c("pravo", "jogosultság"), c("dozvola", "engedély"), c("zabrana", "tilalom"), c("izuzetak", "kivétel"),
    c("pravilo", "szabály"), c("standard", "szabvány"), c("kvalifikacija", "képesítés"), c("karijera", "karrier")
  ]
};

// --- VERBS (Infinitives) ---
export const VERBS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    // Basic Actions
    c("biti", "lenni"), c("imati", "birtokolni", ["van neki"]), c("raditi", "dolgozni/csinálni"), c("ići", "menni"),
    c("doći", "jönni"), c("videti", "látni"), c("gledati", "nézni"), c("slušati", "hallgatni"),
    c("čuti", "hallani"), c("jesti", "enni"), c("piti", "inni"), c("spavati", "aludni"),
    c("ustati", "felkelni"), c("sedeti", "ülni"), c("stajati", "állni"), c("hodati", "sétálni"),
    c("trčati", "futni"), c("govoriti", "beszélni"), c("reći", "mondani"), c("pitati", "kérdezni"),
    c("odgovoriti", "válaszolni"), c("znati", "tudni"), c("misliti", "gondolni"), c("razumeti", "érteni"),
    c("želeti", "akarni"), c("voleti", "szeretni"), c("čitati", "olvasni"), c("pisati", "írni"),
    c("učiti", "tanulni"), c("igrati", "játszani"), c("dati", "adni"), c("uzeti", "venni/elvenni"),
    c("kupiti", "venni (vásárolni)"), c("prodati", "eladni"), c("platiti", "fizetni"), c("koštati", "kerülni (árba)"),
    c("otvoriti", "kinyitni"), c("zatvoriti", "bezárni"), c("početi", "kezdeni"), c("završiti", "befejezni"),
    c("čekati", "várni"), c("živeti", "élni"), c("umreti", "meghalni"), c("roditi se", "születni")
  ],
  2: [
    // Daily Life
    c("putovati", "utazni"), c("voziti", "vezetni"), c("leteti", "repülni"), c("plivati", "úszni"),
    c("kuvati", "főzni"), c("peći", "sütni"), c("prati", "mosni"), c("čistiti", "takarítani"),
    c("tuširati se", "zuhanyozni"), c("kupati se", "fürdeni"), c("oblačiti se", "öltözni"), c("nositi", "viselni (ruhát)"),
    c("koristiti", "használni"), c("praviti", "készíteni"), c("popraviti", "javítani"), c("pokvariti", "elrontani"),
    c("zvati", "hívni (telefonon)"), c("poslati", "küldeni"), c("dobiti", "kapni"), c("izgubiti", "elveszíteni"),
    c("naći", "találni"), c("tražiti", "keresni"), c("pokazati", "mutatni"), c("objasniti", "magyarázni"),
    c("pomoći", "segíteni"), c("sresti", "találkozni"), c("upoznati", "megismerni"), c("pozvati", "meghívni"),
    c("slaviti", "ünnepelni"), c("smejati se", "nevetni"), c("plakati", "sírni"), c("bojati se", "félni"),
    c("radovati se", "örülni"), c("brinuti", "aggódni"), c("nadati se", "remélni"), c("verovati", "hinni"),
    c("zaboraviti", "elfelejteni"), c("pamtiti", "emlékezni"), c("podsetiti", "emlékeztetni"), c("promeniti", "változtatni"),
    c("ostati", "maradni"), c("ostaviti", "hagyni"), c("doneti", "hozni"), c("odneti", "elvinni")
  ],
  3: [
    // Interactions & Specifics
    c("naručiti", "rendelni"), c("rezervisati", "foglalni"), c("izabrati", "választani"), c("odlučiti", "dönteni"),
    c("planirati", "tervezni"), c("organizovati", "szervezni"), c("spremati", "készülni"), c("pakovati", "csomagolni"),
    c("seliti se", "költözni"), c("iznajmiti", "bérelni"), c("kupovati", "vásárolni"), c("probati", "próbálni"),
    c("menjati", "cserélni"), c("vratiti", "visszaadni/visszatérni"), c("pozajmiti", "kölcsönadni/kérni"), c("krasti", "lopni"),
    c("lagati", "hazudni"), c("varati", "csalni"), c("svađati se", "veszekedni"), c("miriti se", "kibékülni"),
    c("razgovarati", "beszélgetni"), c("diskutovati", "megvitatni"), c("pregovarati", "tárgyalni"), c("dogovoriti se", "megegyezni"),
    c("obećati", "ígérni"), c("preporučiti", "ajánlani"), c("savetovati", "tanácsolni"), c("upozoriti", "figyelmeztetni"),
    c("zabraniti", "megtiltani"), c("dozvoliti", "megengedni"), c("oprostiti", "megbocsátani"), c("izviniti se", "bocsánatot kérni"),
    c("zahvaliti", "megköszönni"), c("čestitati", "gratulálni"), c("pozdraviti", "üdvözölni"), c("poljubiti", "megcsókolni"),
    c("grliti", "ölelni"), c("voleti", "szeretni"), c("mrzeći", "gyűlölni"), c("obožavati", "imádni")
  ],
  4: [
    // Mental & Abstract
    c("razmišljati", "gondolkodni"), c("sanjati", "álmodni"), c("zamišljati", "elképzelni"), c("pretpostavljati", "feltételezni"),
    c("sumnjati", "gyanakodni"), c("verovati", "bízni/hinni"), c("očekivati", "elvárni"), c("zahtevati", "követelni"),
    c("tvrditi", "állítani"), c("poreći", "tagadni"), c("priznati", "beismerni"), c("dokazati", "bizonyítani"),
    c("otkriti", "felfedezni"), c("saznati", "megtudni"), c("primetiti", "észrevenni"), c("shvatiti", "megérteni/felfogni"),
    c("analizirati", "elemezni"), c("uporediti", "összehasonlítani"), c("razlikovati", "megkülönböztetni"), c("povezati", "összekötni"),
    c("odvojiti", "szétválasztani"), c("uključiti", "bekapcsolni/bevonni"), c("isključiti", "kikapcsolni/kizárni"), c("dodati", "hozzáadni"),
    c("oduzeti", "elvenni (matekban is)"), c("množiti", "szorozni"), c("deliti", "osztani/megosztani"), c("meriti", "mérni"),
    c("proceniti", "becsülni"), c("računati", "számolni"), c("rešiti", "megoldani"), c("uspeti", "sikerülni"),
    c("promašiti", "eltéveszteni"), c("pogrešiti", "hibázni"), c("popraviti", "korrigálni"), c("ponoviti", "megismételni"),
    c("vežbati", "gyakorolni"), c("trenirati", "edzeni"), c("pobediti", "győzni"), c("izgubiti", "veszíteni")
  ],
  5: [
    // Professional & Complex Actions
    c("osnovati", "alapítani"), c("upravljati", "irányítani"), c("rukovoditi", "vezetni (céget)"), c("zaposliti", "alkalmazni"),
    c("otpustiti", "elbocsátani"), c("unaprediti", "előléptetni/fejleszteni"), c("proizvoditi", "gyártani"), c("izvoziti", "exportálni"),
    c("uvoziti", "importálni"), c("investirati", "befektetni"), c("štedeti", "spórolni"), c("trošiti", "költeni"),
    c("dugovati", "tartozni"), c("pozajmiti", "kölcsönözni"), c("potpisati", "aláírni"), c("raskinuti", "felbontani (szerződést)"),
    c("prekršiti", "megszegni"), c("poštovati", "tisztelni/betartani"), c("primeniti", "alkalmazni (módszert)"), c("iskoristiti", "kihasználni"),
    c("uticati", "befolyásolni"), c("uzrokovati", "okozni"), c("sprečiti", "megakadályozni"), c("izbeći", "elkerülni"),
    c("podržati", "támogatni"), c("protiviti se", "ellenezni"), c("kritikovati", "kritizálni"), c("pohvaliti", "dicsérni"),
    c("nagraditi", "jutalmazni"), c("kazniti", "büntetni"), c("zaslužiti", "megérdemelni"), c("postici", "elérni (eredményt)"),
    c("napredovati", "haladni/fejlődni"), c("nazadovati", "hanyatlani"), c("stagnirati", "stagnálni"), c("varirati", "ingadozni"),
    c("stabilizovati", "stabilizálni"), c("garantovati", "garantálni"), c("osigurati", "biztosítani"), c("zaštititi", "megvédeni")
  ]
};

// --- ADJECTIVES ---
export const ADJECTIVES: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    // Basic Attributes
    c("dobar", "jó"), c("loš", "rossz"), c("velik", "nagy"), c("mali", "kicsi"),
    c("lep", "szép"), c("ružan", "csúnya"), c("nov", "új"), c("star", "régi/öreg"),
    c("mlad", "fiatal"), c("visok", "magas"), c("nizak", "alacsony"), c("dug", "hosszú"),
    c("kratak", "rövid"), c("širok", "széles"), c("uzak", "keskeny"), c("debeo", "kövér/vastag"),
    c("mršav", "sovány"), c("tanak", "vékony"), c("težak", "nehéz"), c("lak", "könnyű"),
    c("tvrd", "kemény"), c("mek", "puha"), c("topao", "meleg"), c("hladan", "hideg"),
    c("vruć", "forró"), c("hladan", "jéghideg"), c("brz", "gyors"), c("spor", "lassú"),
    c("skup", "drága"), c("jeftin", "olcsó"), c("bogat", "gazdag"), c("siromašan", "szegény"),
    c("pun", "tele"), c("prazan", "üres"), c("čist", "tiszta"), c("prljav", "piszkos"),
    c("beo", "fehér"), c("crn", "fekete"), c("crven", "piros"), c("plav", "kék"),
    c("zelen", "zöld"), c("žut", "sárga"), c("braon", "barna"), c("siv", "szürke")
  ],
  2: [
    // Feelings & States
    c("srećan", "boldog"), c("tužan", "szomorú"), c("gladan", "éhes"), c("žedan", "szomjas"),
    c("umoran", "fáradt"), c("pospan", "álmos"), c("bolestan", "beteg"), c("zdrav", "egészséges"),
    c("jak", "erős"), c("slab", "gyenge"), c("pametan", "okos"), c("glup", "buta"),
    c("ljubazan", "kedves"), c("nepristojan", "udvariatlan"), c("hrabar", "bátor"), c("plašljiv", "félénk"),
    c("zanimljiv", "érdekes"), c("dosadan", "unalmas"), c("važan", "fontos"), c("nevažan", "lényegtelen"),
    c("otvoren", "nyitott"), c("zatvoren", "zárt"), c("slobodan", "szabad"), c("zauzet", "elfoglalt"),
    c("tačan", "pontos"), c("pogrešan", "téves"), c("isti", "ugyanolyan"), c("drugačiji", "más"),
    c("sličan", "hasonló"), c("različit", "különböző"), c("blizu", "közeli"), c("daleko", "távoli"),
    c("desni", "jobb"), c("levi", "bal"), c("gornji", "felső"), c("donji", "alsó")
  ],
  3: [
    // Descriptions & Tastes
    c("ukusan", "finom"), c("bezukusan", "ízetlen"), c("sladak", "édes"), c("slan", "sós"),
    c("kiseo", "savanyú"), c("gorak", "keserű"), c("ljut", "csípős"), c("svež", "friss"),
    c("pokvaren", "romlott"), c("sirov", "nyers"), c("kuvan", "főtt"), c("pečen", "sült"),
    c("pržen", "rántott"), c("hrskav", "ropogós"), c("sočan", "szaftos"), c("suv", "száraz"),
    c("udoban", "kényelmes"), c("neudoban", "kényelmetlen"), c("korisan", "hasznos"), c("beskoristan", "haszontalan"),
    c("poznat", "ismert"), c("nepoznat", "ismeretlen"), c("slavan", "híres"), c("popularan", "népszerű"),
    c("moderan", "modern"), c("staromodan", "régimódi"), c("običan", "átlagos/szokásos"), c("čudan", "furcsa"),
    c("smešan", "vicces"), c("ozbiljan", "komoly"), c("opasan", "veszélyes"), c("siguran", "biztonságos"),
    c("tišina", "csendes"), c("bučan", "zajos"), c("miran", "nyugodt"), c("divlji", "vad"),
    c("prijatan", "kellemes"), c("neprijatan", "kellemetlen"), c("svetao", "világos"), c("taman", "sötét")
  ],
  4: [
    // Personality & Abstract
    c("odgovoran", "felelősségteljes"), c("neodgovoran", "felelőtlen"), c("pouzdan", "megbízható"), c("iskren", "őszinte"),
    c("lažan", "hamis"), c("pošten", "becsületes"), c("nepošten", "tisztességtelen"), c("pravedan", "igazságos"),
    c("strpljiv", "türelmes"), c("nestrpljiv", "türelmetlen"), c("tolerantan", "toleráns"), c("sebičan", "önző"),
    c("velikodušan", "nagylelkű"), c("škrt", "fukar"), c("skroman", "szerény"), c("arogantan", "gőgös"),
    c("ljubomoran", "féltékeny"), c("zavidan", "irigy"), c("ponosan", "büszke"), c("stidljiv", "szégyenlős"),
    c("samouveren", "magabiztos"), c("nesiguran", "bizonytalan"), c("kreativan", "kreatív"), c("talentovan", "tehetséges"),
    c("sposoban", "képes/alkalmas"), c("nesposoban", "alkalmatlan"), c("uspešan", "sikeres"), c("aktivan", "aktív"),
    c("lenj", "lusta"), c("vredan", "szorgalmas"), c("ambiciozan", "ambiciózus"), c("zainteresovan", "érdeklődő"),
    c("ravnodušan", "közömbös"), c("oduševljen", "lelkes"), c("razočaran", "csalódott"), c("zabrinut", "aggódó"),
    c("opušten", "laza"), c("napet", "feszült"), c("nervozan", "ideges"), c("miran", "békés")
  ],
  5: [
    // Complex & Formal
    c("zvaničan", "hivatalos"), c("nezvaničan", "nem hivatalos"), c("javan", "nyilvános"), c("privatan", "magán"),
    c("legalan", "legális"), c("ilegalan", "illegális"), c("dozvoljen", "megengedett"), c("zabranjen", "tilos"),
    c("obavezan", "kötelező"), c("dobrovoljan", "önkéntes"), c("hitno", "sürgős"), c("bitan", "lényeges"),
    c("neophodan", "szükséges/elengedhetetlen"), c("suvišan", "felesleges"), c("dodatan", "további/extra"), c("konačan", "végleges"),
    c("privremen", "átmeneti"), c("stalan", "állandó"), c("stabilan", "stabil"), c("nestabilan", "labilis"),
    c("fleksibilan", "rugalmas"), c("krut", "merev"), c("efikasan", "hatékony"), c("produktivan", "termelékeny"),
    c("ekonomičan", "gazdaságos"), c("profitabilan", "nyereséges"), c("konkurentan", "versenyképes"), c("kvalitetan", "minőségi"),
    c("idealan", "ideális"), c("optimalan", "optimális"), c("potencijalan", "potenciális"), c("realan", "reális"),
    c("apstraktan", "absztrakt"), c("konkretan", "konkrét"), c("teorijski", "elméleti"), c("praktičan", "gyakorlati"),
    c("logičan", "logikus"), c("racionalan", "racionális"), c("emocionalan", "érzelmi"), c("intelektualan", "szellemi"),
    c("fizički", "fizikai"), c("psihički", "lelki/pszichikai"), c("socijalan", "társadalmi"), c("kulturalan", "kulturális"),
    c("tradicionalan", "hagyományos"), c("savremen", "korszerű"), c("globalan", "globális"), c("lokalan", "helyi")
  ]
};