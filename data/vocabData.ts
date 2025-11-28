

import { DifficultyLevel } from '../types';

interface VocabEntry {
  serbian: string;
  hungarian: string;
  hungarianAlt: string[]; // Synonyms
}

// Helper to create entry
const c = (ser: string, hun: string, alt: string[] = []): VocabEntry => ({ serbian: ser, hungarian: hun, hungarianAlt: alt });

// --- NUMBER GENERATORS ---

const sUnits = ["", "jedan", "dva", "tri", "četiri", "pet", "šest", "sedam", "osam", "devet"];
const sTeens = ["deset", "jedanaest", "dvanaest", "trinaest", "četrnaest", "petnaest", "šesnaest", "sedamnaest", "osamnaest", "devetnaest"];
const sTens = ["", "deset", "dvadeset", "trideset", "četrdeset", "pedeset", "šezdeset", "sedamdeset", "osamdeset", "devedeset"];
const sHundreds = ["", "sto", "dvesta", "trista", "četiristo", "petsto", "šesto", "sedamsto", "osamsto", "devetsto"];

const genSer = (n: number): string => {
  if (n === 0) return "nula";
  if (n >= 1000) {
    const th = Math.floor(n / 1000);
    const rem = n % 1000;
    let thStr = "";
    if (th === 1) thStr = "hiljada";
    else if (th === 2) thStr = "dve hiljade";
    else if (th >= 3 && th <= 4) thStr = sUnits[th] + " hiljade";
    else thStr = genSer(th) + " hiljada";
    
    if (rem === 0) return thStr;
    return thStr + " " + genSer(rem);
  }
  if (n >= 100) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    let hStr = sHundreds[h];
    if (rem === 0) return hStr;
    return hStr + " " + genSer(rem);
  }
  if (n >= 20) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    let tStr = sTens[t];
    if (u === 0) return tStr;
    return tStr + " " + sUnits[u];
  }
  if (n >= 10) {
    return sTeens[n - 10];
  }
  return sUnits[n];
};

const hUnits = ["", "egy", "kettő", "három", "négy", "öt", "hat", "hét", "nyolc", "kilenc"];
const hTens = ["", "tíz", "húsz", "harminc", "negyven", "ötven", "hatvan", "hetven", "nyolcvan", "kilencven"];

const genHun = (n: number): string => {
  if (n === 0) return "nulla";
  if (n >= 1000) {
    const th = Math.floor(n / 1000);
    const rem = n % 1000;
    let thStr = "";
    if (th === 1) thStr = "ezer";
    else {
      let prefix = genHun(th);
      if (th === 2) prefix = "két";
      // Handle "kettő" at the end of a prefix used as a multiplier (e.g. 22000 -> huszonkét ezer)
      if (prefix.endsWith("kettő")) prefix = prefix.substring(0, prefix.length - 5) + "két";
      thStr = prefix + "ezer";
    }
    if (rem === 0) return thStr;
    return thStr + genHun(rem);
  }
  if (n >= 100) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    let hStr = "";
    if (h === 1) hStr = "száz";
    else if (h === 2) hStr = "kétszáz";
    else hStr = genHun(h) + "száz";
    
    if (rem === 0) return hStr;
    return hStr + genHun(rem);
  }
  if (n >= 10) {
    if (n < 20) {
       if (n === 10) return "tíz";
       return "tizen" + hUnits[n-10];
    }
    if (n < 30) {
       if (n === 20) return "húsz";
       return "huszon" + hUnits[n-20];
    }
    const t = Math.floor(n/10);
    const u = n%10;
    return hTens[t] + hUnits[u];
  }
  return hUnits[n];
};

const genRange = (start: number, end: number) => {
  const arr = [];
  for (let i = start; i <= end; i++) arr.push(c(genSer(i), genHun(i)));
  return arr;
};

const genRandom = (count: number, min: number, max: number) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    arr.push(c(genSer(n), genHun(n)));
  }
  return arr;
};

const genEvenThousands = (max: number) => {
  const arr = [];
  for (let i = 2000; i <= max; i += 2000) {
    arr.push(c(genSer(i), genHun(i)));
  }
  return arr;
};

// --- ADVERBS & CONJUNCTIONS (NEW) ---
export const ADVERBS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("i", "és"), c("ili", "vagy"), c("ali", "de"), c("da (veznik)", "hogy"),
    c("ovde", "itt"), c("tamo", "ott"), c("gde", "hol"), c("kada", "mikor"),
    c("kako", "hogy"), c("zašto", "miért"), c("ko", "ki"), c("šta", "mi"),
    c("mnogo", "sok"), c("malo", "kevés"), c("jako", "nagyon"),
    c("sada", "most"), c("kasnije", "később"), c("danas", "ma"), c("juče", "tegnap"), c("sutra", "holnap"),
    c("uvek", "mindig"), c("nikad", "soha"), c("brzo", "gyorsan"), c("sporo", "lassan")
  ],
  2: [
    c("blizu", "közel"), c("daleko", "távol", ["messze"]), c("gore", "fent"), c("dole", "lent"),
    c("unutra", "bent"), c("napolju", "kint"), c("levo", "balra"), c("desno", "jobbra"),
    c("rano", "korán"), c("kasno", "későn"), c("često", "gyakran"), c("retko", "ritkán"),
    c("obično", "általában"), c("ponekad", "néha"), c("odmah", "azonnal"), c("uskoro", "nemsokára"),
    c("možda", "talán"), c("sigurno", "biztosan"), c("stvarno", "tényleg"), c("već", "már"),
    c("još", "még"), c("samo", "csak"), c("takođe", "szintén", ["is"])
  ],
  3: [
    c("zato", "ezért"), c("jer", "mert"), c("ako", "ha"), c("iako", "bár"),
    c("dok", "miközben", ["amíg"]), c("pre nego što", "mielőtt"), c("nakon što", "miután"),
    c("tako", "így"), c("poput", "mint"), c("bez", "nélkül"), c("sa", "val/vel"),
    c("između", "között"), c("protiv", "ellen"), c("prema", "felé"), c("oko", "körül"),
    c("konačno", "végre"), c("verovatno", "valószínűleg"), c("nažalost", "sajnos"), c("srećom", "szerencsére"),
    c("uglavnom", "főleg"), c("posebno", "különösen"), c("barem", "legalább")
  ],
  4: [
    c("međutim", "azonban"), c("ipak", "mégis"), c("dakle", "tehát"), c("inače", "egyébként"),
    c("odnosno", "illetve"), c("uopšte", "egyáltalán"), c("navodno", "állítólag"),
    c("zapravo", "tulajdonképpen"), c("otprilike", "körülbelül"), c("u potpunosti", "teljesen"),
    c("jedva", "alig"), c("slučajno", "véletlenül"), c("namerno", "szándékosan"),
    c("iznenada", "hirtelen"), c("postepeno", "fokozatosan"), c("privremeno", "átmenetileg"),
    c("stalno", "állandóan"), c("redovno", "rendszeresen"), c("uzalud", "hiába")
  ],
  5: [
    c("posledično", "következésképpen"), c("stoga", "ennélfogva"), c("kako bi", "azért, hogy"),
    c("uprkos", "annak ellenére"), c("s obzirom na", "tekintettel"), c("u slučaju da", "abban az esetben"),
    c("pod uslovom", "feltéve"), c("osim toga", "ráadásul"), c("taviše", "sőt"),
    c("u međuvremenu", "időközben"), c("istovremeno", "egyidejűleg"),
    c("svakako", "mindenképpen"), c("nikako", "semmiképpen"),
    c("relativno", "viszonylag"), c("apsolutno", "abszolút"),
    c("nesumnjivo", "kétségkívül"), c("očigledno", "nyilvánvalóan"), c("navodno", "úgynevezett")
  ]
};

// --- NUMBERS (Cardinals & Ordinals) ---
export const NUMBERS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("nula", "nulla"), c("jedan", "egy"), c("dva", "kettő", ["két"]), c("tri", "három"),
    c("četiri", "négy"), c("pet", "öt"), c("šest", "hat"), c("sedam", "hét"),
    c("osam", "nyolc"), c("devet", "kilenc"), c("deset", "tíz"),
    c("prvi", "első"), c("drugi", "második"), c("treći", "harmadik"),
    c("četvrti", "negyedik"), c("peti", "ötödik")
  ],
  2: [
    c("jedanaest", "tizenegy"), c("dvanaest", "tizenkettő"), c("trinaest", "tizenhárom"),
    c("četrnaest", "tizennégy"), c("petnaest", "tizenöt"), c("šesnaest", "tizenhat"),
    c("sedamnaest", "tizenhét"), c("osamnaest", "tizennyolc"), c("devetnaest", "tizenkilenc"),
    c("dvadeset", "húsz"),
    c("šesti", "hatodik"), c("sedmi", "hetedik"), c("osmi", "nyolcadik"),
    c("deveti", "kilencedik"), c("deseti", "tizedik")
  ],
  3: [
    ...genRange(21, 100),
    c("jedanaesti", "tizenegyedik"), c("dvanaesti", "tizenkettedik"),
    c("dvadeseti", "huszadik")
  ],
  4: [
    ...genRandom(300, 101, 1000),
    c("trideseti", "harmincadik"), c("četrdeseti", "negyvenedik"),
    c("pedeseti", "ötvenedik")
  ],
  5: [
    ...genEvenThousands(20000),
    c("šezdeseti", "hatvanadik"), c("sedamdeseti", "hetvenedik"),
    c("osamdeseti", "nyolcvanadik"), c("devedeseti", "kilencvenedik"),
    c("stoti", "századik"),
    c("dvadeset prvi", "huszonegyedik"), c("trideset drugi", "harminckettedik"),
    c("pedeset treći", "ötvenharmadik"), c("sedamdeset četvrti", "hetvennegyedik"),
    c("devedeset deveti", "kilencvenkilencedik")
  ]
};

// --- NOUNS ---
export const NOUNS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
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
    c("bicikl", "bicikli", ["kerékpár"]), c("voz", "vonat"), c("brod", "hajó"), c("avion", "repülő"),
    c("škola", "iskola"), c("posao", "munka"), c("prodavnica", "bolt"), c("pijaca", "piac"),
    c("hleb", "kenyér"), c("mleko", "tej"), c("kafa", "kávé"),
    c("čaj", "tea"), c("meso", "hús"), c("sir", "sajt"), c("jaje", "tojás"),
    c("jabuka", "alma"), c("kruška", "körte"), c("banána", "banán"), c("pas", "kutya"),
    c("mačka", "macska"), c("ptica", "madár"), c("riba", "hal"), c("konj", "ló"),
    c("otac", "apa", ["édesapa"]), c("majka", "anya", ["édesanya"]), c("brat", "fiútestvér"), c("sestra", "lánytestvér"),
    c("sin", "fia"), c("ćerka", "lánya"), c("deda", "nagypapa"), c("baka", "nagymama"),
    c("prijatelj", "barát"), c("čovek", "ember"), c("žena", "nő"), c("muškarac", "férfi"),
    c("dete", "gyerek"), c("ime", "név"), c("broj", "szám"), c("boja", "szín"),
    c("olovka", "ceruza"), c("papir", "papír"), c("torba", "táska"), c("klupa", "pad"),
    c("tabla", "tábla"), c("uho", "fül"), c("oko", "szem"), c("nos", "orr"),
    c("usta", "száj"), c("zub", "fog"), c("jezik", "nyelv"), c("vrat", "nyak"),
    c("rame", "váll"), c("koleno", "térd"), c("mesec", "hold"), c("zvezda", "csillag"),
    c("nebo", "ég"), c("oblak", "felhő"), c("more", "tenger"), c("reka", "folyó"),
    c("jezero", "tó"), c("planina", "hegy"), c("šuma", "erdő"), c("most", "híd"),
    c("park", "park"), c("trg", "tér"), c("crkva", "templom"), c("kuća", "ház"),
    c("stan", "lakás"), c("balkon", "erkély"), c("lift", "lift"), c("stepenice", "lépcső"),
    c("ključ", "kulcs"), c("telefon", "telefon"), c("radio", "rádió"), c("televizor", "tévé"),
    c("slika", "kép"), c("lampa", "lámpa"), c("ogledalo", "tükör"), c("ormar", "szekrény"),
    c("tepih", "szőnyeg"), c("jastuk", "párna"), c("ćebe", "takaró"), c("sapun", "szappan"),
    c("peškir", "törölköző"), c("četkica", "fogkefe"), c("tanjir", "tányér"), c("viljuška", "villa"),
    c("kašika", "kanál"), c("nož", "kés"), c("čaša", "pohár"), c("šolja", "bögre"),
    c("flaša", "üveg", ["palack"]), c("doručak", "reggeli"), c("ručak", "ebéd"), c("večera", "vacsora"),
    c("restoran", "étterem"), c("kafić", "kávézó"), c("hotel", "szálloda"), c("muzej", "múzeum"),
    c("bioskop", "mozi"), c("pozorište", "színház"), c("banka", "bank"), c("pošta", "posta"),
    c("lekar", "orvos"), c("bolnica", "kórház"), c("lek", "gyógyszer"), c("policija", "rendőrség")
  ],
  2: [
    c("stanica", "állomás"), c("aerodrom", "repülőtér"), c("karta", "jegy"), c("prtljag", "csomag"),
    c("pasoš", "útlevél"), c("račun", "számla"), c("konobar", "pincér"),
    c("novac", "pénz"), c("marka", "bélyeg"),
    c("pismo", "levél"), c("paket", "csomag"), c("internet", "internet"),
    c("računar", "számítógép"), c("ekran", "képernyő"), c("miš", "egér"), c("tastatura", "billentyűzet"),
    c("apoteka", "gyógyszertár"),
    c("bol", "fájdalom"), c("zdravlje", "egészség"), c("pomoć", "segítség"),
    c("vatrogasac", "tűzoltó"), c("učitelj", "tanár"), c("učenik", "diák"), c("čas", "óra", ["tanóra"]),
    c("knjiga", "könyv"), c("sveska", "füzet"), c("odeća", "ruha"), c("cipela", "cipő"), c("pantalone", "nadrág"), c("košulja", "ing"),
    c("majica", "póló"), c("jakna", "dzseki"), c("kaput", "kabát"), c("kapa", "sapka"),
    c("šal", "sál"), c("rukavice", "kesztyű"), c("čarapa", "zokni"), c("haljina", "ruha", ["női ruha"]),
    c("suknja", "szoknya"), c("naočare", "szemüveg"), c("sat", "karóra"), c("nakit", "ékszer"),
    c("vreme", "időjárás"), c("sunce", "nap"), c("kiša", "eső"), c("sneg", "hó"),
    c("vetar", "szél"), c("stepen", "fok"), c("leto", "nyár"),
    c("zima", "tél"), c("proleće", "tavasz"), c("jesen", "ősz"), c("vikend", "hétvége"),
    c("ponedeljak", "hétfő"), c("utorak", "kedd"), c("sreda", "szerda"), c("četvrtak", "csütörtök"),
    c("petak", "péntek"), c("subota", "szombat"), c("nedelja", "vasárnap"), c("januar", "január"),
    c("februar", "február"), c("mart", "március"), c("april", "április"), c("maj", "május"),
    c("jun", "június"), c("jul", "július"), c("avgust", "augusztus"), c("septembar", "szeptember"),
    c("oktobar", "október"), c("novembar", "november"), c("decembar", "december"), c("praznik", "ünnep"),
    c("rođendan", "születésnap"), c("imendan", "névnap"), c("poklon", "ajándék"), c("tortu", "torta"),
    c("sveća", "gyertya"), c("gost", "vendég"), c("zabava", "buli"), c("muzika", "zene"),
    c("ples", "tánc"), c("pesma", "dal"), c("pevač", "énekes"), c("glumac", "színész"),
    c("film", "film"), c("ulaznica", "belépőjegy"), c("sedište", "ülés"), c("red", "sor"),
    c("početak", "kezdet"), c("kraj", "vég"), c("pauza", "szünet"), c("vesti", "hírek"),
    c("novine", "újság"), c("časopis", "folyóirat"), c("članak", "cikk"), c("naslov", "cím"),
    c("strana", "oldal"), c("slika", "kép"), c("fotografija", "fénykép"), c("kamera", "kamera"),
    c("baterija", "elem"), c("punjač", "töltő"), c("kabl", "kábel"), c("signal", "jel"),
    c("poruka", "üzenet"), c("poziv", "hívás"), c("broj", "szám"), c("imenik", "telefonkönyv"),
    c("adresa", "cím"), c("ulaz", "bejárat"), c("izlaz", "kijárat"), c("prizemlje", "földszint"),
    c("sprat", "emelet"), c("komšija", "szomszéd"), c("prijateljica", "barátnő"), c("kolega", "kolléga"),
    c("šef", "főnök"), c("direktor", "igazgató"), c("sekretarica", "titkárnő"), c("kancelarija", "iroda")
  ],
  3: [
    c("kuhinja", "konyha"), c("nappali", "nappali"), c("kupatilo", "fürdőszoba"), c("hodnik", "előszoba"),
    c("frižider", "hűtőszekrény"), c("šporet", "tűzhely"), c("rerna", "sütő"), c("mikrotalasna", "mikrohullámú sütő"),
    c("mašina", "gép"), c("tanjir", "tányér"), c("viljuška", "villa"), c("kašika", "kanál"),
    c("nož", "kés"), c("čaša", "pohár"), c("šolja", "bögre"), c("flaša", "üveg", ["palack"]),
    c("hrana", "étel"), c("piće", "ital"), c("voće", "gyümölcs"), c("povrće", "zöldség"),
    c("krompir", "burgonya", ["krumpli"]), c("paradajz", "paradicsom"), c("paprika", "paprika"), c("luk", "hagyma"),
    c("beli luk", "fokhagyma"), c("šargarepa", "sárgarépa"), c("kupus", "káposzta"), c("pasulj", "bab"),
    c("grašak", "borsó"), c("pirinač", "rizs"), c("testenina", "tészta"), c("piletina", "csirke"),
    c("svinjetina", "sertés"), c("govedina", "marha"), c("ulje", "olaj"),
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
    // Abstract & Society (Expanded)
    c("kultura", "kultúra"), c("umetnost", "művészet"), c("muzika", "zene"), c("film", "film"),
    c("pozorište", "színház"), c("književnost", "irodalom"), c("istorija", "történelem"), c("nauka", "tudomány"),
    c("matematika", "matematika"), c("fizika", "fizika"), c("hemija", "kémia"), c("biologija", "biológia"),
    c("geografija", "földrajz"), c("jezik", "nyelv"), c("gramatika", "nyelvtan"), c("reč", "szó"),
    c("rečenica", "mondat"), c("tekst", "szöveg"), c("pitanje", "kérdés"), c("odgovor", "válasz"),
    c("problem", "probléma"), c("rešenje", "megoldás"), c("ideja", "ötlet"), c("plan", "terv"),
    c("cilj", "cél"), c("uspeh", "siker"), c("neuspeh", "kudarc"), c("sreća", "szerencse", ["boldogság"]),
    c("ljubav", "szerelem", ["szeretet"]), c("mržnja", "gyűlölet"), c("strah", "félelem"), c("nada", "remény"),
    c("mir", "béke"), c("rat", "háború"), c("sloboda", "szabadság"), c("zakon", "törvény"),
    c("pravo", "jog"), c("pravda", "igazság"), c("politika", "politika"), c("vlada", "kormány"),
    c("predsednik", "elnök"), c("stranka", "párt"), c("izbori", "választások"), c("država", "állam", ["ország"]),
    c("granica", "határ"), c("društvo", "társadalom"), c("ekonomija", "gazdaság"), c("industrija", "ipar"),
    c("poljoprivreda", "mezőgazdaság"), c("okolina", "környezet"), c("priroda", "természet"), c("klima", "klíma"),
    c("zagađenje", "szennyezés"), c("zaštita", "védelem"), c("informacija", "információ"), c("vest", "hír"),
    c("mediji", "média"), c("novine", "újság"), c("televizija", "televízió"), c("radio", "rádió"),
    // New B2 Nouns
    c("obrazovanje", "oktatás"), c("znanje", "tudás"), c("univerzitet", "egyetem"), c("diploma", "diploma"),
    c("ispit", "vizsga"), c("stipendija", "ösztöndíj"), c("karijera", "karrier"), c("iskustvo", "tapasztalat"),
    c("nezaposlenost", "munkanélküliség"), c("plata", "fizetés"), c("porez", "adó"), c("budžet", "költségvetés"),
    c("valuta", "valuta"), c("dug", "adósság"), c("kredit", "hitel"), c("inflacija", "infláció"),
    c("religija", "vallás"), c("vera", "hit"), c("tradicija", "hagyomány"), c("običaj", "szokás"),
    c("arhitektura", "építészet"), c("skulptura", "szobor"), c("slikarstvo", "festészet"), c("izložba", "kiállítás"),
    c("publika", "közönség"), c("kritika", "kritika"), c("tema", "téma"), c("sadržaj", "tartalom")
  ],
  5: [
    // Professional & Complex (Expanded)
    c("situacija", "helyzet"), c("uslov", "feltétel"), c("uzrok", "ok"), c("posledica", "következmény"),
    c("rezultat", "eredmény"), c("razlika", "különbség"), c("sličnost", "hasonlóság"), c("veza", "kapcsolat"),
    c("uticaj", "hatás"), c("promena", "változás"), c("razvoj", "fejlődés"), c("rast", "növekedés"),
    c("pad", "csökkenés"), c("nivo", "szint"), c("kvalitet", "minőség"), c("kvantitet", "mennyiség"),
    c("vrednost", "érték"), c("cena", "ár"), c("trošak", "költség"), c("profit", "nyereség"),
    c("gubitak", "veszteség"), c("ponuda", "kínálat"), c("potražnja", "kereslet"), c("tržište", "piac"),
    c("firma", "cég"), c("preduzeće", "vállalat"), c("ugovor", "szerződés"), c("dogovor", "megállapodás"),
    c("sastanak", "értekezlet", ["találkozó"]), c("projekat", "projekt"), c("zadatak", "feladat"), c("cilj", "célkitűzés"),
    c("strategija", "stratégia"), c("metoda", "módszer"), c("sistem", "rendszer"), c("struktura", "szerkezet"),
    c("proces", "folyamat"), c("analiza", "elemzés"), c("podatak", "adat"), c("činjenica", "tény"),
    c("teorija", "elmélet"), c("praksa", "gyakorlat"), c("iskustvo", "tapasztalat"), c("znanje", "tudás"),
    c("veština", "készség"), c("sposobnost", "képesség"), c("mogućnost", "lehetőség"), c("izazov", "kihívás"),
    c("rizik", "kockázat"), c("sigurnost", "biztonság"), c("odgovornost", "felelősség"), c("obaveza", "kötelezettség"),
    c("pravo", "jogosultság"), c("dozvola", "engedély"), c("zabrana", "tilalom"), c("izuzetak", "kivétel"),
    c("pravilo", "szabály"), c("standard", "szabvány"), c("kvalifikacija", "képesítés"), c("karijera", "karrier"),
    // New C1 Nouns
    c("hipoteza", "hipotézis"), c("kriterijum", "kritérium"), c("koncept", "koncepció"), c("kontekst", "kontextus"),
    c("perspektiva", "perspektíva"), c("aspekt", "szempont"), c("faktora", "tényező"), c("komponenta", "összetevő"),
    c("varijabla", "változó"), c("tendencija", "tendencia"), c("fenomen", "jelenség"), c("paradoks", "paradoxon"),
    c("dilema", "dilemma"), c("konflikt", "konfliktus"), c("kompromis", "kompromisszum"), c("konsenzus", "konszenzus"),
    c("inovacija", "innováció"), c("tehnologija", "technológia"), c("infrastruktura", "infrastruktúra"), c("logistika", "logisztika"),
    c("statistika", "statisztika"), c("procenat", "százalék"), c("kapacitet", "kapacitás"), c("efikasnost", "hatékonyság"),
    c("globalizacija", "globalizáció"), c("integracija", "integráció"), c("migracija", "migráció"), c("populacija", "népesség")
  ]
};

// --- VERBS (Infinitives) ---
export const VERBS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("biti", "lenni"), c("imati", "birtokolni", ["van neki"]), c("raditi", "dolgozni"), c("ići", "menni"),
    c("doći", "jönni"), c("videti", "látni"), c("gledati", "nézni"), c("slušati", "hallgatni"),
    c("čuti", "hallani"), c("jesti", "enni"), c("piti", "inni"), c("spavati", "aludni"),
    c("ustati", "felkelni"), c("sedeti", "ülni"), c("stajati", "állni"), c("hodati", "sétálni"),
    c("trčati", "futni"), c("govoriti", "beszélni"), c("reći", "mondani"), c("pitati", "kérdezni"),
    c("odgovoriti", "válaszolni"), c("znati", "tudni"), c("misliti", "gondolni"), c("razumeti", "érteni"),
    c("želeti", "akarni"), c("voleti", "szeretni"), c("čitati", "olvasni"), c("pisati", "írni"),
    c("učiti", "tanulni"), c("igrati", "játszani"), c("dati", "adni"), c("uzeti", "venni", ["elvenni"]),
    c("kupiti", "venni", ["vásárolni"]), c("prodati", "eladni"), c("platiti", "fizetni"), c("koštati", "kerülni", ["árba"]),
    c("otvoriti", "kinyitni"), c("zatvoriti", "bezárni"), c("početi", "kezdeni"), c("završiti", "befejezni"),
    c("čekati", "várni"), c("živeti", "élni"), c("umreti", "meghalni"), c("roditi se", "születni"),
    c("pevati", "énekelni"), c("tancovati", "táncolni"), c("kuvati", "főzni"), c("peći", "sütni"),
    c("voziti", "vezetni"), c("leteti", "repülni"), c("plivati", "úszni"), c("prati", "mosni"),
    c("čistiti", "takarítani"), c("nositi", "viselni"), c("koristiti", "használni"), c("zvati", "hívni"),
    c("poslati", "küldeni"), c("dobiti", "kapni"), c("izgubiti", "elveszíteni"), c("naći", "találni"),
    c("tražiti", "keresni"), c("pokazati", "mutatni"), c("pomoći", "segíteni"), c("sresti", "találkozni"),
    c("upoznati", "megismerni"), c("pozvati", "meghívni"), c("smejati se", "nevetni"), c("plakati", "sírni"),
    c("bojati se", "félni"), c("radovati se", "örülni"), c("verovati", "hinni"), c("zaboraviti", "elfelejteni"),
    c("pamtiti", "emlékezni"), c("doneti", "hozni"), c("odneti", "elvinni"), c("staviti", "tenni"),
    c("ostati", "maradni"), c("ostaviti", "hagyni"), c("brinuti", "aggódni"), c("nadati se", "remélni"),
    c("vikati", "kiabálni"), c("šaputati", "suttogni"), c("lagati", "hazudni"), c("krasti", "lopni")
  ],
  2: [
    c("putovati", "utazni"), c("voziti", "vezetni"), c("leteti", "repülni"), c("plivati", "úszni"),
    c("kuvati", "főzni"), c("peći", "sütni"), c("prati", "mosni"), c("čistiti", "takarítani"),
    c("tuširati se", "zuhanyozni"), c("kupati se", "fürdeni"), c("oblačiti se", "öltözni"), c("nositi", "viselni", ["ruhát"]),
    c("koristiti", "használni"), c("praviti", "készíteni"), c("popraviti", "javítani"), c("pokvariti", "elrontani"),
    c("zvati", "hívni", ["telefonon"]), c("poslati", "küldeni"), c("dobiti", "kapni"), c("izgubiti", "elveszíteni"),
    c("naći", "találni"), c("tražiti", "keresni"), c("pokazati", "mutatni"), c("objasniti", "magyarázni"),
    c("pomoći", "segíteni"), c("sresti", "találkozni"), c("upoznati", "megismerni"), c("pozvati", "meghívni"),
    c("slaviti", "ünnepelni"), c("smejati se", "nevetni"), c("plakati", "sírni"), c("bojati se", "félni"),
    c("radovati se", "örülni"), c("brinuti", "aggódni"), c("nadati se", "remélni"), c("verovati", "hinni"),
    c("zaboraviti", "elfelejteni"), c("pamtiti", "emlékezni"), c("podsetiti", "emlékeztetni"), c("promeniti", "változtatni"),
    c("ostati", "maradni"), c("ostaviti", "hagyni"), c("doneti", "hozni"), c("odneti", "elvinni"),
    c("krenuti", "indulni"), c("stići", "érkezni"), c("kasniti", "késni"), c("žuriti", "sietni"),
    c("skrenuti", "fordulni"), c("parkirati", "parkolni"), c("tankovati", "tankolni"), c("kočiti", "fékezni"),
    c("šetati", "sétálni"), c("trčati", "futni"), c("skočiti", "ugrani"), c("pasti", "esni"),
    c("udariti", "ütni"), c("gurati", "tolni"), c("vući", "húzni"), c("baciti", "dobni"),
    c("hvatati", "elkapni"), c("držati", "tartani"), c("pustiti", "engedni"), c("dizati", "emelni"),
    c("spustiti", "letenni"), c("otvoriti", "kinyitni"), c("zatvoriti", "bezárni"), c("zaključati", "bezárni", ["kulccsal"]),
    c("otključati", "kinyitni", ["kulccsal"]), c("upaliti", "felkapcsolni"), c("ugasiti", "lekapcsolni"), c("pokrenuti", "elindítani"),
    c("zaustaviti", "megállítani"), c("proveriti", "ellenőrizni"), c("meriti", "mérni"), c("seći", "vágni"),
    c("lepiti", "ragasztani"), c("crtati", "rajzolni"), c("bojiti", "színezni"), c("slikati", "festeni", ["fényképezni"]),
    c("fotografisati", "fényképezni"), c("snimati", "felvenni", ["videót"]), c("štampati", "nyomtatni"), c("kopirati", "másolni")
  ],
  3: [
    c("naručiti", "rendelni"), c("rezervisati", "foglalni"), c("izabrati", "választani"), c("odlučiti", "dönteni"),
    c("planirati", "tervezni"), c("organizovati", "szervezni"), c("spremati", "készülni"), c("pakovati", "csomagolni"),
    c("seliti se", "költözni"), c("iznajmiti", "bérelni"), c("kupovati", "vásárolni"), c("probati", "próbálni"),
    c("menjati", "cserélni"), c("vratiti", "visszaadni", ["visszatérni"]), c("pozajmiti", "kölcsönadni", ["kérni"]), c("krasti", "lopni"),
    c("lagati", "hazudni"), c("varati", "csalni"), c("svađati se", "veszekedni"), c("miriti se", "kibékülni"),
    c("razgovarati", "beszélgetni"), c("diskutovati", "megvitatni"), c("pregovarati", "tárgyalni"), c("dogovoriti se", "megegyezni"),
    c("obećati", "ígérni"), c("preporučiti", "ajánlani"), c("savetovati", "tanácsolni"), c("upozoriti", "figyelmeztetni"),
    c("zabraniti", "megtiltani"), c("dozvoliti", "megengedni"), c("oprostiti", "megbocsátani"), c("izviniti se", "bocsánatot kérni"),
    c("zahvaliti", "megköszönni"), c("čestitati", "gratulálni"), c("pozdraviti", "üdvözölni"), c("poljubiti", "megcsókolni"),
    c("grliti", "ölelni"), c("voleti", "szeretni"), c("mrzeći", "gyűlölni"), c("obožavati", "imádni")
  ],
  4: [
    c("razmišljati", "gondolkodni"), c("sanjati", "álmodni"), c("zamišljati", "elképzelni"), c("pretpostavljati", "feltételezni"),
    c("sumnjati", "gyanakodni"), c("verovati", "bízni", ["hinni"]), c("očekivati", "elvárni"), c("zahtevati", "követelni"),
    c("tvrditi", "állítani"), c("poreći", "tagadni"), c("priznati", "beismerni"), c("dokazati", "bizonyítani"),
    c("otkriti", "felfedezni"), c("saznati", "megtudni"), c("primetiti", "észrevenni"), c("shvatiti", "megérteni", ["felfogni"]),
    c("analizirati", "elemezni"), c("uporediti", "összehasonlítani"), c("razlikovati", "megkülönböztetni"), c("povezati", "összekötni"),
    c("odvojiti", "szétválasztani"), c("uključiti", "bekapcsolni", ["bevonni"]), c("isključiti", "kikapcsolni", ["kizárni"]), c("dodati", "hozzáadni"),
    c("oduzeti", "elvenni"), c("množiti", "szorozni"), c("deliti", "osztani", ["megosztani"]), c("meriti", "mérni"),
    c("proceniti", "becsülni"), c("računati", "számolni"), c("rešiti", "megoldani"), c("uspeti", "sikerülni"),
    c("promašiti", "eltéveszteni"), c("pogrešiti", "hibázni"), c("popraviti", "korrigálni"), c("ponoviti", "megismételni"),
    c("vežbati", "gyakorolni"), c("trenirati", "edzeni"), c("pobediti", "győzni"), c("izgubiti", "veszíteni"),
    // New B2 Verbs
    c("postojati", "létezni"), c("nedostajati", "hiányozni"), c("činiti se", "tűnni"), c("zavisiti", "függeni"),
    c("uticati", "hatni"), c("prouzrokovati", "okozni"), c("rezultirati", "eredményezni"), c("omogućiti", "lehetővé tenni"),
    c("sprečiti", "megakadályozni"), c("izbegavati", "elkerülni"), c("ignorisati", "figyelmen kívül hagyni"), c("podržavati", "támogatni"),
    c("odbaciti", "elutasítani"), c("prihvatiti", "elfogadni"), c("ceniti", "értékelni"), c("kritikovati", "kritizálni"),
    c("sumnjati", "kételkedni"), c("verovati", "megbízni"), c("inspiresati", "inspirálni"), c("motivirati", "motiválni"),
    c("frustrirati", "frusztrálni"), c("impresionirati", "lenyűgözni"), c("šokirati", "sokkolni"), c("iznenaditi", "meglepni")
  ],
  5: [
    c("osnovati", "alapítani"), c("upravljati", "irányítani"), c("rukovoditi", "vezetni", ["céget"]), c("zaposliti", "alkalmazni"),
    c("otpustiti", "elbocsátani"), c("unaprediti", "előléptetni", ["fejleszteni"]), c("proizvoditi", "gyártani"), c("izvoziti", "exportálni"),
    c("uvoziti", "importálni"), c("investirati", "befektetni"), c("štedeti", "spórolni"), c("trošiti", "költeni"),
    c("dugovati", "tartozni"), c("pozajmiti", "kölcsönözni"), c("potpisati", "aláírni"), c("raskinuti", "felbontani", ["szerződést"]),
    c("prekršiti", "megszegni"), c("poštovati", "tisztelni", ["betartani"]), c("primeniti", "alkalmazni", ["módszert"]), c("iskoristiti", "kihasználni"),
    c("uticati", "befolyásolni"), c("uzrokovati", "okozni"), c("sprečiti", "megakadályozni"), c("izbeći", "elkerülni"),
    c("podržati", "támogatni"), c("protiviti se", "ellenezni"), c("kritikovati", "kritizálni"), c("pohvaliti", "dicsérni"),
    c("nagraditi", "jutalmazni"), c("kazniti", "büntetni"), c("zaslužiti", "megérdemelni"), c("postici", "elérni", ["eredményt"]),
    c("napredovati", "haladni", ["fejlődni"]), c("nazadovati", "hanyatlani"), c("stagnirati", "stagnálni"), c("varirati", "ingadozni"),
    c("stabilizovati", "stabilizálni"), c("garantovati", "garantálni"), c("osigurati", "biztosítani"), c("zaštititi", "megvédeni"),
    // New C1 Verbs
    c("analizirati", "kielemezni"), c("sintetizovati", "szintetizálni"), c("interpretirati", "értelmezni"), c("klasifikovati", "osztályozni"),
    c("definisati", "definiálni"), c("formulisati", "megfogalmazni"), c("demonstrirati", "szemléltetni"), c("ilustrovati", "ábrázolni"),
    c("simulirati", "szimulálni"), c("modifikovati", "módosítani"), c("adaptirati", "adaptálni"), c("implementirati", "bevezetni"),
    c("koordinirati", "koordinálni"), c("regulisati", "szabályozni"), c("nadgledati", "felügyelni"), c("evaluirati", "kiértékelni"),
    c("validirati", "érvényesíteni"), c("verifikovati", "igazolni"), c("optimizovati", "optimalizálni"), c("maksimizirati", "maximalizálni"),
    c("minimizirati", "minimalizálni"), c("kompenzirati", "kompenzálni"), c("finansirati", "finanszírozni"), c("subvencionisati", "támogatni")
  ]
};

// --- ADJECTIVES ---
export const ADJECTIVES: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("dobar", "jó"), c("loš", "rossz"), c("velik", "nagy"), c("mali", "kicsi"),
    c("lep", "szép"), c("ružan", "csúnya"), c("nov", "új"), c("star", "régi", ["öreg"]),
    c("mlad", "fiatal"), c("visok", "magas"), c("nizak", "alacsony"), c("dug", "hosszú"),
    c("kratak", "rövid"), c("širok", "széles"), c("uzak", "keskeny"), c("debeo", "kövér", ["vastag"]),
    c("mršav", "sovány"), c("tanak", "vékony"), c("težak", "nehéz"), c("lak", "könnyű"),
    c("tvrd", "kemény"), c("mek", "puha"), c("topao", "meleg"), c("hladan", "hideg"),
    c("vruć", "forró"), c("brz", "gyors"), c("spor", "lassú"),
    c("skup", "drága"), c("jeftin", "olcsó"), c("bogat", "gazdag"), c("siromašan", "szegény"),
    c("pun", "tele"), c("prazan", "üres"), c("čist", "tiszta"), c("prljav", "piszkos"),
    c("beo", "fehér"), c("crn", "fekete"), c("crven", "piros"), c("plav", "kék"),
    c("zelen", "zöld"), c("žut", "sárga"), c("braon", "barna"), c("siv", "szürke"),
    c("narandžast", "narancssárga"), c("ljubičast", "lila"), c("roze", "rózsaszín"), c("zlatni", "arany"),
    c("srebrni", "ezüst"), c("bež", "bézs"), c("šaren", "színes"), c("okrugao", "kerek"),
    c("kockast", "kockás"), c("ravan", "egyenes"), c("kriv", "görbe"), c("oštar", "éles"),
    c("tup", "tompa"), c("mokar", "vizes"), c("suv", "száraz"), c("otvoren", "nyitott"),
    c("zatvoren", "zárt"), c("pravi", "igazi"), c("lažni", "hamis"), c("živ", "élő"),
    c("mrtav", "halott"), c("glasan", "hangos"), c("tih", "halk"), c("jak", "erős"),
    c("slab", "gyenge"), c("zdrav", "egészséges"), c("bolestan", "beteg"), c("gladan", "éhes"),
    c("sit", "jóllakott"), c("žedan", "szomjas"), c("umoran", "fáradt"), c("odmoran", "kipihent"),
    c("srećan", "boldog"), c("tužan", "szomorú"), c("besan", "mérges"), c("ljubazan", "kedves"),
    c("pametan", "okos"), c("glup", "buta"), c("lep", "szép"), c("ružan", "csúnya")
  ],
  2: [
    c("srećan", "boldog"), c("tužan", "szomorú"), c("gladan", "éhes"), c("žedan", "szomjas"),
    c("umoran", "fáradt"), c("pospan", "álmos"), c("bolestan", "beteg"), c("zdrav", "egészséges"),
    c("jak", "erős"), c("slab", "gyenge"), c("pametan", "okos"), c("glup", "buta"),
    c("ljubazan", "kedves"), c("nepristojan", "udvariatlan"), c("hrabar", "bátor"), c("plašljiv", "félénk"),
    c("zanimljiv", "érdekes"), c("dosadan", "unalmas"), c("važan", "fontos"), c("nevažan", "lényegtelen"),
    c("otvoren", "nyitott"), c("zatvoren", "zárt"), c("slobodan", "szabad"), c("zauzet", "elfoglalt"),
    c("tačan", "pontos"), c("pogrešan", "téves"), c("isti", "ugyanolyan"), c("drugačiji", "más"),
    c("sličan", "hasonló"), c("različit", "különböző"), c("blizu", "közeli"), c("daleko", "távoli"),
    c("desni", "jobb"), c("levi", "bal"), c("gornji", "felső"), c("donji", "alsó"),
    c("prvi", "első"), c("poslednji", "utolsó"), c("sledeći", "következő"), c("prethodni", "előző"),
    c("jedini", "egyetlen"), c("glavni", "fő"), c("sporedni", "mellék"), c("poseban", "különleges"),
    c("jednostavan", "egyszerű"), c("komplikovan", "bonyolult"), c("težak", "nehéz", ["feladat"]), c("lak", "könnyű", ["feladat"]),
    c("koristan", "hasznos"), c("štetan", "káros"), c("opasan", "veszélyes"), c("bezbedan", "biztonságos"),
    c("čist", "tiszta"), c("prljav", "koszos"), c("uredan", "rendes"), c("neuredan", "rendetlen"),
    c("prazan", "üres"), c("pun", "tele"), c("celo", "egész"), c("pola", "fél"),
    c("privatan", "magán"), c("javan", "nyilvános"), c("domaći", "hazai"), c("strani", "külföldi"),
    c("lokalan", "helyi"), c("međunarodni", "nemzetközi"), c("gradski", "városi"), c("seoski", "falusi"),
    c("jutarnji", "reggeli"), c("večernji", "esti"), c("dnevni", "napi"), c("noćni", "éjszakai"),
    c("nedeljni", "heti"), c("mesečni", "havi"), c("godišnji", "éves"), c("letnji", "nyári"),
    c("zimski", "téli"), c("prolećni", "tavaszi"), c("jesenji", "őszi")
  ],
  3: [
    c("ukusan", "finom"), c("bezukusan", "ízetlen"), c("sladak", "édes"), c("slan", "sós"),
    c("kiseo", "savanyú"), c("gorak", "keserű"), c("ljut", "csípős"), c("svež", "friss"),
    c("pokvaren", "romlott"), c("sirov", "nyers"), c("kuvan", "főtt"), c("pečen", "sült"),
    c("pržen", "rántott"), c("hrskav", "ropogós"), c("sočan", "szaftos"), c("suv", "száraz"),
    c("udoban", "kényelmes"), c("neudoban", "kényelmetlen"), c("korisan", "hasznos"), c("beskoristan", "haszontalan"),
    c("poznat", "ismert"), c("nepoznat", "ismeretlen"), c("slavan", "híres"), c("popularan", "népszerű"),
    c("moderan", "modern"), c("staromodan", "régimódi"), c("običan", "átlagos", ["szokásos"]), c("čudan", "furcsa"),
    c("smešan", "vicces"), c("ozbiljan", "komoly"), c("opasan", "veszélyes"), c("siguran", "biztonságos"),
    c("tišina", "csendes"), c("bučan", "zajos"), c("miran", "nyugodt"), c("divlji", "vad"),
    c("prijatan", "kellemes"), c("neprijatan", "kellemetlen"), c("svetao", "világos"), c("taman", "sötét")
  ],
  4: [
    c("odgovoran", "felelősségteljes"), c("neodgovoran", "felelőtlen"), c("pouzdan", "megbízható"), c("iskren", "őszinte"),
    c("lažan", "hamis"), c("pošten", "becsületes"), c("nepošten", "tisztességtelen"), c("pravedan", "igazságos"),
    c("strpljiv", "türelmes"), c("nestrpljiv", "türelmetlen"), c("tolerantan", "toleráns"), c("sebičan", "önző"),
    c("velikodušan", "nagylelkű"), c("škrt", "fukar"), c("skroman", "szerény"), c("arogantan", "gőgös"),
    c("ljubomoran", "féltékeny"), c("zavidan", "irigy"), c("ponosan", "büszke"), c("stidljiv", "szégyenlős"),
    c("samouveren", "magabiztos"), c("nesiguran", "bizonytalan"), c("kreativan", "kreatív"), c("talentovan", "tehetséges"),
    c("sposoban", "képes", ["alkalmas"]), c("nesposoban", "alkalmatlan"), c("uspešan", "sikeres"), c("aktivan", "aktív"),
    c("lenj", "lusta"), c("vredan", "szorgalmas"), c("ambiciozan", "ambiciózus"), c("zainteresovan", "érdeklődő"),
    c("ravnodušan", "közömbös"), c("oduševljen", "lelkes"), c("razočaran", "csalódott"), c("zabrinut", "aggódó"),
    c("opušten", "laza"), c("napet", "feszült"), c("nervozan", "ideges"), c("miran", "békés")
  ],
  5: [
    c("zvaničan", "hivatalos"), c("nezvaničan", "nem hivatalos"), c("javan", "nyilvános"), c("privatan", "magán"),
    c("legalan", "legális"), c("ilegalan", "illegális"), c("dozvoljen", "megengedett"), c("zabranjen", "tilos"),
    c("obavezan", "kötelező"), c("dobrovoljan", "önkéntes"), c("hitno", "sürgős"), c("bitan", "lényeges"),
    c("neophodan", "szükséges", ["elengedhetetlen"]), c("suvišan", "felesleges"), c("dodatan", "további", ["extra"]), c("konačan", "végleges"),
    c("privremen", "átmeneti"), c("stalan", "állandó"), c("stabilan", "stabil"), c("nestabilan", "labilis"),
    c("fleksibilan", "rugalmas"), c("krut", "merev"), c("efikasan", "hatékony"), c("produktivan", "termelékeny"),
    c("ekonomičan", "gazdaságos"), c("profitabilan", "nyereséges"), c("konkurentan", "versenyképes"), c("kvalitetan", "minőségi"),
    c("idealan", "ideális"), c("optimalan", "optimális"), c("potencijalan", "potenciális"), c("realan", "reális"),
    c("apstraktan", "absztrakt"), c("konkretan", "konkrét"), c("teorijski", "elméleti"), c("praktičan", "gyakorlati"),
    c("logičan", "logikus"), c("racionalan", "racionális"), c("emocionalan", "érzelmi"), c("intelektualan", "szellemi"),
    c("fizički", "fizikai"), c("psihički", "lelki", ["pszichikai"]), c("socijalan", "társadalmi"), c("kulturalan", "kulturális"),
    c("tradicionalan", "hagyományos"), c("savremen", "korszerű"), c("globalan", "globális"), c("lokalan", "helyi")
  ]
};