import { DifficultyLevel } from '../types';

interface VocabEntry {
  serbian: string;
  hungarian: string;
  hungarianAlt: string[]; // Synonyms
  display?: string; // Optional display override (e.g. "1" instead of "jedan")
  hint?: string; // Mnemonic or logical hint
}

// Helper to create entry. Signature: serbian, hungarian, alts, display, hint
const c = (ser: string, hun: string, alt: string[] = [], disp?: string, hint?: string): VocabEntry => ({ 
  serbian: ser, 
  hungarian: hun, 
  hungarianAlt: alt,
  display: disp,
  hint: hint
});

// --- NUMBER GENERATORS (CARDINAL) ---

const sUnits = ["", "jedan", "dva", "tri", "četiri", "pet", "šest", "sedam", "osam", "devet"];
const sTeens = ["deset", "jedanaest", "dvanaest", "trinaest", "četrnaest", "petnaest", "šesnaest", "sedamnaest", "osamnaest", "devetnaest"];
const sTens = ["", "deset", "dvadeset", "trideset", "četrdeset", "pedeset", "šezdeset", "sedamdeset", "osamdeset", "devedeset"];
const sHundreds = ["", "sto", "dvesta", "trista", "četiristo", "petsto", "šesto", "sedamsto", "osamsto", "devetsto"];

const genSer = (n: number): string => {
  if (n === 0) return "nula";
  if (n === 1000000) return "milion";
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
  if (n === 1000000) return "egymillió";
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
  for (let i = start; i <= end; i++) {
    // Pass undefined for hint
    arr.push(c(genSer(i), genHun(i), [], i.toString(), "Broj se gradi logički (npr. dvadeset + jedan)."));
  }
  return arr;
};

// --- ADVERBS & CONJUNCTIONS ---
export const ADVERBS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("i", "és", [], undefined, "Zvuči kao 'eš'."), 
    c("ili", "vagy", [], undefined, "Možda ovo 'ili' ono? (Vagy)."), 
    c("ali", "de", [], undefined, "Kratko kao 'de'."), 
    c("da (veznik)", "hogy", [], undefined, "Kako? Hogy?"),
    c("ovde", "itt", [], undefined, "Itt je hit (ovde)."), 
    c("tamo", "ott", [], undefined, "Ott je otprilike tamo."), 
    c("gde", "hol", [], undefined, "Hol je hol (gde si?)."), 
    c("kada", "mikor", [], undefined, "Liči na 'Mikor' (u koje vreme)."),
    c("kako", "hogy", [], undefined, "Isto kao 'da' (veznik) - Hogy vagy? (Kako si?)"), 
    c("zašto", "miért", [], undefined, "Mi (šta) + ért (za)."), 
    c("ko", "ki", [], undefined, "Ki je ko?"), 
    c("šta", "mi", [], undefined, "Mi radimo šta?"),
    c("mnogo", "sok", [], undefined, "Sok je šokantno mnogo."), 
    c("malo", "kevés", [], undefined, "Zvuči kao keš (malo keša)."), 
    c("jako", "nagyon", [], undefined, "Nađ (veliki) + on."),
    c("sada", "most", [], undefined, "Most (ćuprija) je sada tu."), 
    c("kasnije", "később", [], undefined, "Od reči késő (kasno)."), 
    c("danas", "ma", [], undefined, "Ma daj, danas?"), 
    c("juče", "tegnap", [], undefined, "Tegnap."), 
    c("sutra", "holnap", [], undefined, "Holnap zvuči kao 'hol' (gde) nap (dan)."),
    c("uvek", "mindig", [], undefined, "Mindig - mind (sve) + ig (dok)."), 
    c("nikad", "soha", [], undefined, "Soha ne reci nikad."), 
    c("brzo", "gyorsan", [], undefined, "Đorsan."), 
    c("sporo", "lassan", [], undefined, "Lasan (lagan).")
  ],
  2: [
    c("blizu", "közel", [], undefined, "Közel (kod cilja)."), 
    c("daleko", "távol", ["messze"], undefined, "Távol (tamo)."), 
    c("gore", "fent", [], undefined, "Fent je gore."), 
    c("dole", "lent", [], undefined, "Lent je dole (land)."),
    c("unutra", "bent", [], undefined, "Bent."), 
    c("napolju", "kint", [], undefined, "Kint."), 
    c("levo", "balra", [], undefined, "Bal (kao bal)."), 
    c("desno", "jobbra", [], undefined, "Job (posao) je desna ruka."),
    c("rano", "korán", [], undefined, "Korán (u zoru)."), 
    c("kasno", "későn", [], undefined, "Késő (kasno)."), 
    c("često", "gyakran", [], undefined, "Gyakran."), 
    c("retko", "ritkán", [], undefined, "Ritkán (ritko)."),
    c("obično", "általában", [], undefined, "Általában."), 
    c("ponekad", "néha", [], undefined, "Néha."), 
    c("odmah", "azonnal", [], undefined, "Azonnal."), 
    c("uskoro", "nemsokára", [], undefined, "Nem (ne) + sokára (dugo)."),
    c("možda", "talán", [], undefined, "Talán."), 
    c("sigurno", "biztosan", [], undefined, "Biztosan (bisto)."), 
    c("stvarno", "tényleg", [], undefined, "Tényleg."), 
    c("već", "már", [], undefined, "Már."),
    c("još", "még", [], undefined, "Még."), 
    c("samo", "csak", [], undefined, "Čak i samo to."), 
    c("takođe", "szintén", ["is"], undefined, "Is (isto).")
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

// --- CARDINAL NUMBERS (Obični) ---
export const NUMBERS_CARDINAL: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("nula", "nulla", [], "0", "Zvuči kao nula."), 
    c("jedan", "egy", [], "1", "Zvuči kao 'eđ' (početak)."), 
    c("dva", "kettő", ["két"], "2", "Kettő (kao duet)."), 
    c("tri", "három", [], "3", "Három (kao harem, tri žene)."),
    c("četiri", "négy", [], "4", "Négy."), 
    c("pet", "öt", [], "5", "Öt (pet prstiju)."), 
    c("šest", "hat", [], "6", "Hat (šešir/hat ima 6 slova?)."), 
    c("sedam", "hét", [], "7", "Hét (kao 'hot' 7)."),
    c("osam", "nyolc", [], "8", "Nyolc."), 
    c("devet", "kilenc", [], "9", "Kilenc."), 
    c("deset", "tíz", [], "10", "Tíz (kao 'tease').")
  ],
  2: [
    c("jedanaest", "tizenegy", [], "11", "Tíz (10) + en + egy (1)."), 
    c("dvanaest", "tizenkettő", [], "12", "Tíz (10) + en + kettő (2)."), 
    c("trinaest", "tizenhárom", [], "13", "10 + 3"),
    c("četrnaest", "tizennégy", [], "14", "10 + 4"), 
    c("petnaest", "tizenöt", [], "15", "10 + 5"), 
    c("šesnaest", "tizenhat", [], "16", "10 + 6"),
    c("sedamnaest", "tizenhét", [], "17", "10 + 7"), 
    c("osamnaest", "tizennyolc", [], "18", "10 + 8"), 
    c("devetnaest", "tizenkilenc", [], "19", "10 + 9"),
    c("dvadeset", "húsz", [], "20", "Zvuči kao 'hustle'.")
  ],
  3: [
    ...genRange(21, 100)
  ],
  4: [
    c("sto", "száz", [], "100", "Száz (sto)."), 
    c("dvesta", "kétszáz", [], "200", "Két (2) + száz (100)."), 
    c("trista", "háromszáz", [], "300", "Három (3) + száz (100)."),
    c("četiristo", "négyszáz", [], "400"), c("petsto", "ötszáz", [], "500"), c("šesto", "hatszáz", [], "600"),
    c("sedamsto", "hétszáz", [], "700"), c("osamsto", "nyolcszáz", [], "800"), c("devetsto", "kilencszáz", [], "900")
  ],
  5: [
    c("hiljada", "ezer", [], "1000", "Ezer."), 
    c("dve hiljade", "kétezer", [], "2000", "Két (2) + ezer (1000)."), 
    c("tri hiljade", "háromezer", [], "3000"), c("četiri hiljade", "négyezer", [], "4000"),
    c("pet hiljada", "ötezer", [], "5000"), c("šest hiljada", "hatezer", [], "6000"),
    c("sedam hiljada", "hétezer", [], "7000"), c("osam hiljada", "nyolcezer", [], "8000"),
    c("devet hiljada", "kilencezer", [], "9000"), c("deset hiljada", "tízezer", [], "10000"),
    c("milion", "egymillió", [], "1000000")
  ]
};

// --- ORDINAL NUMBERS (Redni) ---
export const NUMBERS_ORDINAL: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("prvi", "első", [], "1.", "Első (kao 'Alice')."), 
    c("drugi", "második", [], "2.", "Más (drugi/drugačiji) + odik."), 
    c("treći", "harmadik", [], "3.", "Három (3) + adik."),
    c("četvrti", "negyedik", [], "4."), c("peti", "ötödik", [], "5."), c("šesti", "hatodik", [], "6."),
    c("sedmi", "hetedik", [], "7."), c("osmi", "nyolcadik", [], "8."), c("deveti", "kilencedik", [], "9."),
    c("deseti", "tizedik", [], "10.")
  ],
  2: [
    c("jedanaesti", "tizenegyedik", [], "11."), c("dvanaesti", "tizenkettedik", [], "12."),
    c("trinaesti", "tizenharmadik", [], "13."), c("dvadeseti", "huszadik", [], "20.")
  ],
  3: [c("dvadeset prvi", "huszonegyedik", [], "21."), c("trideseti", "harmincadik", [], "30.")],
  4: [c("stoti", "századik", [], "100."), c("hiljaditi", "ezredik", [], "1000.")],
  5: [c("milioniti", "milliomodik", [], "1.000.000.")]
};

// --- NOUNS (Imenice) ---
export const NOUNS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("pas", "kutya", [], undefined, "Na srpskom se kaže i 'kuca' za psa."),
    c("mačka", "macska", [], undefined, "Zvuči skoro isto kao mačka."),
    c("kuća", "ház", [], undefined, "Kao 'haus' u nemačkom ili engleskom."),
    c("auto", "autó", [], undefined, "Ista reč."),
    c("autobus", "busz", [], undefined, "Skraćeno od autobus."),
    c("grad", "város", [], undefined, "Srpska reč 'varoš' dolazi od ovoga."),
    c("ulica", "utca", [], undefined, "Zvuči kao ulica."),
    c("voda", "víz", [], undefined, "Zvuči kao 'viz' (vizir, providno)."),
    c("hleb", "kenyér", [], undefined, "Asocijacija na 'krompir'? Ne, ali 'kenjer' je hleb."),
    c("mleko", "tej", [], undefined, "Tej je beo."),
    c("pivo", "sör", [], undefined, "Šer (share) pivo sa prijateljem."),
    c("vino", "bor", [], undefined, "Bor je crven (crno vino)."),
    c("jabuka", "alma", [], undefined, "Alma mater (plod znanja)."),
    c("dan", "nap", [], undefined, "Napolju je sunce (Nap)."),
    c("sunce", "nap", [], undefined, "Napolju je dan (Nap)."),
    c("drvo", "fa", [], undefined, "Fa."),
    c("cvet", "virág", [], undefined, "Viri iz zemlje (virag)."),
    c("dečak", "fiú", [], undefined, "Fiu! (zvižduk za dečaka)."),
    c("devojčica", "lány", [], undefined, "Lana je devojčica."),
    c("čovek", "ember", [], undefined, "Emberi su ljudi."),
    c("žena", "nő", [], undefined, "No, ona je žena."),
    c("muškarac", "férfi", [], undefined, "Fer-fi (fer plej)."),
    c("otac", "apa", [], undefined, "Apa (tata)."),
    c("majka", "anya", [], undefined, "Ana je majka."),
    c("glava", "fej", [], undefined, "Fej (fejs/face)."),
    c("ruka", "kéz", [], undefined, "Kez (kezati rukom).")
  ],
  2: [
    c("škola", "iskola", [], undefined, "Skoro isto."),
    c("učitelj", "tanár", [], undefined, "Tanar (uči 'tane')."),
    c("učenik", "diák", [], undefined, "Đak (diák)."),
    c("knjiga", "könyv", [], undefined, "Liči na 'knjiga' (k-ny-v)."),
    c("olovka", "ceruza", [], undefined, "Liči na 'seriju' crtanja."),
    c("sto", "asztal", [], undefined, "Astal (koristi se i u vojvođanskom)."),
    c("stolica", "szék", [], undefined, "Seka sedi na stolici."),
    c("soba", "szoba", [], undefined, "Isto."),
    c("krevet", "ágy", [], undefined, "Ađ (kao 'ajde' u krevet)."),
    c("prozor", "ablak", [], undefined, "Oblak se vidi kroz ablak."),
    c("vrata", "ajtó", [], undefined, "Auto prolazi kroz vrata? Ne, ajto."),
    c("kuhinja", "konyha", [], undefined, "Liči na kuhinja."),
    c("ručak", "ebéd", [], undefined, "E bed (nije bed, nego ručak)."),
    c("večera", "vacsora", [], undefined, "Zvuči kao večera."),
    c("doručak", "reggeli", [], undefined, "Reggel je jutro."),
    c("kafa", "kávé", [], undefined, "Kave."),
    c("čaj", "tea", [], undefined, "Tea."),
    c("prijatelj", "barát", [], undefined, "Brat (barat)."),
    c("porodica", "család", [], undefined, "Čeljad (család)."),
    c("lekar", "orvos", [], undefined, "Orvos."),
    c("novac", "pénz", [], undefined, "Penzija (novac).")
  ],
  3: [
    c("vreme", "idő"), c("sat", "óra"), c("minut", "perc"),
    c("leto", "nyár"), c("zima", "tél"), c("proleće", "tavasz"), c("jesen", "ősz"),
    c("stanica", "állomás"), c("aerodrom", "repülőtér"), c("karta", "jegy"),
    c("more", "tenger"), c("planina", "hegy"), c("jezero", "tó"), c("reka", "folyó"),
    c("prodavnica", "bolt"), c("pijaca", "piac"), c("cena", "ár"),
    c("odeća", "ruha"), c("cipela", "cipő"), c("kaput", "kabát"),
    c("telo", "test"), c("srce", "szív"), c("krv", "vér"),
    c("muzika", "zene"), c("film", "film"), c("slika", "kép")
  ],
  4: [
    c("društvo", "társadalom"), c("ekonomija", "gazdaság"), c("politika", "politika"),
    c("zakon", "törvény"), c("pravo", "jog"), c("vlada", "kormány"),
    c("zdravlje", "egészség"), c("bolest", "betegség"), c("lek", "gyógyszer"),
    c("nauka", "tudomány"), c("umetnost", "művészet"), c("istorija", "történelem"),
    c("mir", "béke"), c("rat", "háború"), c("vojska", "hadsereg"),
    c("uspeh", "siker"), c("sreća", "boldogság"), c("ljubav", "szerelem"),
    c("istina", "igazság"), c("laž", "hazugság"), c("mišljenje", "vélemény")
  ],
  5: [
    c("svest", "tudat"), c("podsvest", "tudatalatti"), c("iskustvo", "tapasztalat"),
    c("mogućnost", "lehetőség"), c("odgovornost", "felelősség"), c("sloboda", "szabadság"),
    c("jednakost", "egyenlőség"), c("razvoj", "fejlődés"), c("okolina", "környezet"),
    c("posledica", "következmény"), c("uzrok", "ok"), c("cilj", "cél"),
    c("rešenje", "megoldás"), c("problém", "probléma"), c("izazov", "kihívás"),
    c("odluka", "döntés"), c("zajednica", "közösség"), c("pojedinac", "egyén"),
    c("kultura", "kultúra"), c("tradicija", "hagyomány")
  ]
};

// --- VERBS (Glagoli) ---
export const VERBS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("biti", "lenni", ["van"], undefined, "Van (on je)."),
    c("imati", "birtokolni", ["van neki"], undefined, "Nekem van (ja imam)."),
    c("jesti", "enni", [], undefined, "Eni voli da jede."),
    c("piti", "inni", [], undefined, "Inni."),
    c("spavati", "aludni", [], undefined, "Al (all) zzz."),
    c("ići", "menni", [], undefined, "Meni se ide."),
    c("doći", "jönni", [], undefined, "Jon dolazi."),
    c("čekati", "várni", [], undefined, "Varati (ne, čekati 'var')."),
    c("trčati", "futni", [], undefined, "Futing (footing) je trčanje."),
    c("sedeti", "ülni", [], undefined, "Ulni (uljiti se)."),
    c("stajati", "állni", [], undefined, "Áll (stati)."),
    c("videti", "látni", [], undefined, "Lampa (da vidiš)."),
    c("čuti", "hallani", [], undefined, "Halo (čujem te)."),
    c("znati", "tudni", [], undefined, "Tudum (znam)."),
    c("razumeti", "érteni", [], undefined, "Erteti (razumeti)."),
    c("učiti", "tanulni", [], undefined, "Tanulni."),
    c("raditi", "dolgozni", [], undefined, "Dolgozni (dugo raditi)."),
    c("voleti", "szeretni", [], undefined, "Szeretni (srce)."),
    c("želeti", "akarni", [], undefined, "Akarni (ako želiš)."),
    c("pisati", "írni", [], undefined, "Irni (šarati)."),
    c("čitati", "olvasni", [], undefined, "Olvasni."),
    c("igrati", "játszani", [], undefined, "Játszani (jaca igra).")
  ],
  2: [
    c("krenuti", "indulni", [], undefined, "Indulni."),
    c("stići", "érkezni", [], undefined, "Erkezni."),
    c("kupiti", "venni", [], undefined, "Veni (vidi, vici - kupi)."),
    c("platiti", "fizetni", [], undefined, "Fizetni (fizički platiti)."),
    c("tražiti", "keresni", [], undefined, "Keresni (kera traži)."),
    c("naći", "találni", [], undefined, "Találni (taman)."),
    c("dati", "adni", [], undefined, "Adni (dodati)."),
    c("dobiti", "kapni", [], undefined, "Kapni (uhvatiti kap)."),
    c("pitati", "kérdezni", [], undefined, "Kerdezni."),
    c("odgovoriti", "felelni", [], undefined, "Felelni."),
    c("misliti", "gondolni", [], undefined, "Gondola (misli)."),
    c("verovati", "hinni", [], undefined, "Hinni (himna vere)."),
    c("otvoriti", "nyitni", [], undefined, "Nyitni (nitne)."),
    c("zatvoriti", "zárni", [], undefined, "Zarni (zarobiti)."),
    c("prati", "mosni", [], undefined, "Mosni (mošus)."),
    c("kuvati", "főzni", [], undefined, "Fozni."),
    c("živeti", "élni", [], undefined, "Elni."),
    c("stanovati", "lakni", [], undefined, "Lakni (lako)."),
    c("nositi", "viselni", [], undefined, "Viselni (visiti)."),
    c("seći", "vágni", [], undefined, "Vagni (vagati pa seći).")
  ],
  3: [
    c("putovati", "utazni"), c("voziti", "vezetni"), c("leteti", "repülni"),
    c("pomoći", "segíteni"), c("koristiti", "használni"), c("próbati", "próbálni"),
    c("početi", "kezdeni"), c("završiti", "befejezni"), c("nastaviti", "folytatni"),
    c("promeniti", "változtatni"), c("dogoditi se", "történni"), c("osećati", "érezni"),
    c("bojati se", "félni"), c("radovati se", "örülni"), c("smejati se", "nevetni"),
    c("plakati", "sírni"), c("vikati", "kiabálni"), c("šaputati", "suttogni")
  ],
  4: [
    c("odlučiti", "dönteni"), c("planirati", "tervezni"), c("organizovati", "szervezni"),
    c("pregovarati", "tárgyalni"), c("raspravljati", "vitatkozni"), c("slagati se", "egyetérteni"),
    c("obećati", "ígérni"), c("lagati", "hazudni"), c("priznati", "beismerni"),
    c("nadati se", "remélni"), c("zaboraviti", "elfelejteni"), c("setiti se", "emlékezni"),
    c("objasniti", "magyarázni"), c("razviti", "fejleszteni"), c("poboljšati", "javítani"),
    c("uspeti", "sikerülni"), c("propasti", "bukni"), c("pobediti", "győzni")
  ],
  5: [
    c("pretpostaviti", "feltételezni"), c("zaključiti", "következtetni"), c("analizirati", "elemzni"),
    c("dokazati", "bizonyítani"), c("poreći", "tagadni"), c("sumnjati", "gyanakodni"),
    c("uticati", "befolyásolni"), c("inspirisati", "inspirálni"), c("motivisati", "motiválni"),
    c("sarađivati", "együttműködni"), c("podržati", "támogatni"), c("kritikovati", "kritizálni"),
    c("upravljati", "irányítani"), c("proizvoditi", "gyártani"), c("investirati", "befektetni"),
    c("riskirati", "kockáztatni"), c("ceniti", "értékelni"), c("poštovati", "tisztelni")
  ]
};

// --- ADJECTIVES (Pridevi) ---
export const ADJECTIVES: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("dobar", "jó", [], undefined, "Jo, to je dobro!"),
    c("loš", "rossz", [], undefined, "Ros (loš)."),
    c("velik", "nagy", [], undefined, "Nađ (veliko prezime)."),
    c("mali", "kicsi", [], undefined, "Liči na 'kiša' (sitne kapi) ili 'kic'."),
    c("lep", "szép", [], undefined, "Sep (lep)."),
    c("ružan", "csúnya", [], undefined, "Čunja (čudno)."),
    c("nov", "új", [], undefined, "Új (ujak je nov)."),
    c("star", "régi", [], undefined, "Regi (regija je stara)."),
    c("mlad", "fiatal", [], undefined, "Fiatal (fijaker)."),
    c("beo", "fehér", [], undefined, "Feher."),
    c("crn", "fekete", [], undefined, "Fekete."),
    c("crven", "piros", [], undefined, "Piros."),
    c("plav", "kék", [], undefined, "Kek (keks je plav?)."),
    c("zelen", "zöld", [], undefined, "Zold."),
    c("žut", "sárga", [], undefined, "Šarga-repa (žuta)."),
    c("toplo", "meleg", [], undefined, "Meleg (kao melem)."),
    c("hladno", "hideg", [], undefined, "Hideg."),
    c("brz", "gyors", [], undefined, "Đors."),
    c("spor", "lassú", [], undefined, "Lasu (lasom hvataš sporo).")
  ],
  2: [
    c("visok", "magas", [], undefined, "Magas."),
    c("nizak", "alacsony", [], undefined, "Alačonj."),
    c("debeo", "kövér", [], undefined, "Kover (kaver/poklopac je debeo)."),
    c("mršav", "vékony", [], undefined, "Vekonj (veka hleba je tanka)."),
    c("dug", "hosszú", [], undefined, "Hosu."),
    c("kratak", "rövid", [], undefined, "Rovid."),
    c("jak", "erős", [], undefined, "Eroš (heroj)."),
    c("slab", "gyenge", [], undefined, "Đenge."),
    c("pametan", "okos", [], undefined, "Okoš (oko sokolovo)."),
    c("glup", "buta", [], undefined, "Buta (buntovan i glup)."),
    c("srećan", "boldog", [], undefined, "Boldog (buldog je srećan)."),
    c("tužan", "szomorú", [], undefined, "Sumoran."),
    c("jeftin", "olcsó", [], undefined, "Olčo."),
    c("skup", "drága", [], undefined, "Draga moja, ovo je skupo."),
    c("lak", "könnyű", [], undefined, "Konju (konj je lak?)."),
    c("težak", "nehéz", [], undefined, "Nehez (ne + hez)."),
    c("pun", "tele", [], undefined, "Tele je puno mleka."),
    c("prazan", "üres", [], undefined, "Ures (urezan)."),
    c("čist", "tiszta", [], undefined, "Tista (čista)."),
    c("prljav", "piszkos", [], undefined, "Piskos (pis).")
  ],
  3: [
    c("zanimljiv", "érdekes"), c("dosadan", "unalmas"), c("važan", "fontos"),
    c("koristan", "hasznos"), c("opasan", "veszélyes"), c("siguran", "biztonságos"),
    c("jednostavan", "egyszerű"), c("komplikovan", "bonyolult"), c("otvoren", "nyitott"),
    c("zatvoren", "zárt"), c("moguć", "lehetséges"), c("nemoguć", "lehetetlen"),
    c("spreman", "kész"), c("umoran", "fáradt"), c("bolestan", "beteg"),
    c("zdrav", "egészséges"), c("gladan", "éhes"), c("žedan", "szomjas"),
    c("ljubazan", "kedves"), c("strog", "szigorú")
  ],
  4: [
    c("odgovoran", "felelős"), c("nezavisan", "független"), c("iskren", "őszinte"),
    c("poznat", "híres"), c("uspešan", "sikeres"), c("büszke", "ponosan"),
    c("iznenađen", "meglepett"), c("razočaran", "csalódott"), c("nervozan", "ideges"),
    c("miran", "nyugodt"), c("aktivan", "aktív"), c("pasivan", "passzív"),
    c("kreativan", "kreatív"), c("logičan", "logikus"), c("efikasan", "hatékony"),
    c("privatan", "magán"), c("javni", "nyilvános"), c("zvaničan", "hivatalos")
  ],
  5: [
    c("privremen", "átmeneti"), c("stalan", "állandó"), c("sličan", "hasonló"),
    c("različit", "különböző"), c("neophodan", "szükséges"), c("suvišan", "felesleges"),
    c("tipičan", "tipikus"), c("jedinstven", "egyedi"), c("savršen", "tökéletes"),
    c("strašan", "szörnyű"), c("divan", "csodálatos"), c("prirodan", "természetes"),
    c("veštački", "mesterséges"), c("duhovni", "szellemi"), c("fizički", "fizikai"),
    c("pozitivan", "pozitív"), c("negativan", "negatív"), c("objektivan", "objektív")
  ]
};
