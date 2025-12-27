import { DifficultyLevel } from '../types';

interface VocabEntry {
  serbian: string;
  hungarian: string;
  hungarianAlt: string[]; // Synonyms
  display?: string; // Optional display override
  hint?: string; // Mnemonic or logical hint
}

const c = (ser: string, hun: string, alt: string[] = [], disp?: string, hint?: string): VocabEntry => ({ 
  serbian: ser, 
  hungarian: hun, 
  hungarianAlt: alt,
  display: disp,
  hint: hint
});

// --- PHRASES (Kifejezések) ---
export const PHRASES: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("Zdravo (dolazak)", "Szia", ["Szervusz"], undefined, "Sija kao sunce kad se javiš."),
    c("Hvala", "Köszönöm", [], undefined, "Kosi-njom (kao kosim travu, hvala na pomoći)."),
    c("Molim / Izvolite", "Szívesen", [], undefined, "Svi-vesni su kad neko kaže molim."),
    c("Dobar dan", "Jó napot", ["Jó napot kívánok"], undefined, "Jo-napot (dobar dan)."),
    c("Doviđenja", "Viszontlátásra", [], undefined, "Vi-zorn-la-tasra (duga reč za odlazak)."),
    c("Da", "Igen", [], undefined, "I-gen (generacija koja kaže da)."),
    c("Ne", "Nem", [], undefined, "Nem-nem (kratko i jasno)."),
    c("Kako si?", "Hogy vagy?", [], undefined, "Hođ-vađ (hoćeš-vadiš odgovor kako si)."),
    c("Dobro sam", "Jól vagyok", [], undefined, "Jol-vađok (u doli sam dobro)."),
    c("Izvinite", "Elnézést", [], undefined, "El-nezest (pogledaj me, izvini).")
  ],
  2: [
    c("Ne razumem", "Nem értem", [], undefined, "Nem-ertem (ne razumem to)."),
    c("Koliko košta?", "Mennyibe kerül?", [], undefined, "Meni-be-keril (meni se vrti koliko košta)."),
    c("Gde je toalet?", "Hol van a mosdó?", [], undefined, "Hol-van-mosdo (gde je pranje)."),
    c("Želim kafu", "Kávét kérek", [], undefined, "Kave-kerek (okrugla kafa)."),
    c("Račun, molim", "A számlát kérem", [], undefined, "Samla-kerem (brojeve tražim)."),
    c("Govorite li srpski?", "Beszél szerbül?", [], undefined, "Besel-serbil."),
    c("Srećan put", "Jó utat", [], undefined, "Jo-utat (dobar put)."),
    c("Prijatno", "Jó étvágyat", [], undefined, "Jo-etvađat (dobar apetit)."),
    c("Srećan rođendan", "Boldog születésnapot", [], undefined, "Boldog (srećan) + rođendan."),
    c("Volim te", "Szeretlek", [], undefined, "Seretlek (srce te voli).")
  ],
  3: [
    c("Možete li mi pomoći?", "Tudna segíteni?", [], undefined, "Tudna (možete li) + pomoc."),
    c("Želeo bih da rezervišem", "Szeretnék foglalni", [], undefined, "Foglalni (rezervisati/uhvatiti)."),
    c("Šta preporučujete?", "Mit ajánl?", [], undefined, "Mit-ajan (što nudiš)."),
    c("Kasnim malo", "Késni fogok egy kicsit", [], undefined, "Kesni (kasniti) + faza."),
    c("Gde se nalazimo?", "Hol vagyunk?", [], undefined, "Hol (gde) + vađunk (smo)."),
    c("To je preskupo", "Ez túl drága", [], undefined, "Draga (skupo)."),
    c("Mogu li da platim karticom?", "Fizethetek kártyával?", [], undefined, "Fizet (platiti) + kartja."),
    c("Gde je najbliža apoteka?", "Hol van a legközelebbi gyógyszertár?", [], undefined, "Leg-kozel-ebbi (najbliža)."),
    c("Zaboravio sam", "Elfelejtettem", [], undefined, "El-felejt (pobeglo iz sećanja)."),
    c("Nema na čemu", "Nincs mit", [], undefined, "Ninč-mit (ništa mit).")
  ],
  4: [
    c("U potpunosti se slažem", "Teljesen egyetértek", [], undefined, "Teljes (potpuno) + egyet-ertek."),
    c("Šta se desilo?", "Mi történt?", [], undefined, "Mi-tirtent (šta se desilo)."),
    c("To zavisi od situacije", "Ez a helyzettől függ", [], undefined, "Fiđ (zavisi)."),
    c("Nisam siguran u to", "Nem vagyok benne biztos", [], undefined, "Biztos (siguran)."),
    c("Vredi pokušati", "Megéri megpróbálni", [], undefined, "Meg-eri (vredi)."),
    c("O čemu se radi?", "Miről van szó?", [], undefined, "Mirol-van-so (o čemu je reč)."),
    c("Nema problema", "Semmi probléma", [], undefined, "Semmi (ništa)."),
    c("Žao mi je što to čujem", "Sajnálom, hogy ezt hallom", [], undefined, "Sajnalom (žao mi je)."),
    c("Da li se slažete?", "Egyetért ön?", [], undefined, "Eđet-ert (slažete se)."),
    c("To je dobra ideja", "Ez jó ötlet", [], undefined, "Itlet (ideja).")
  ],
  5: [
    c("Uzimajući u obzir", "Figyelembe véve", [], undefined, "Fiđelem (pažnja)."),
    c("S jedne strane", "Egyrészt", [], undefined, "Jedan deo."),
    c("S druge strane", "Másrészt", [], undefined, "Drugi deo."),
    c("Ukratko rečeno", "Röviden összefoglalva", [], undefined, "Rovid (kratko)."),
    c("U poređenju sa", "Összehasonlítva valamivel", [], undefined, "Hasonlo (slično).")
  ]
};

// --- ADVERBS & CONJUNCTIONS ---
export const ADVERBS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("i", "és", [], undefined, "Es-i (I-li). Kratko i spaja."), 
    c("ili", "vagy", [], undefined, "Vaj-i (ili ovo ili ono)."), 
    c("ali", "de", [], undefined, "De-li (Ali ipak)."),
    c("da (veznik)", "hogy", [], undefined, "Hoćeš-da (Hogy)."),
    c("ovde", "itt", [], undefined, "Itt-o (ovde je to)."), 
    c("tamo", "ott", [], undefined, "Ott-o (tamo je on)."), 
    c("gde", "hol", [], undefined, "Hol je ko? (Gde je ko?)"),
    c("sada", "most", [], undefined, "Most (u ovom momentu prelazimo most)."), 
    c("uvek", "mindig", [], undefined, "Min-dig (uvek se kopa).")
  ],
  2: [
    c("blizu", "közel", [], undefined, "K'sebi (Közel) - privuci blizu."), 
    c("daleko", "távol", [], undefined, "Tamo-daleko (Távol)."), 
    c("često", "gyakran", [], undefined, "Gjak-ran (često rani)."), 
    c("možda", "talán", [], undefined, "Talan (valjda)."), 
    c("već", "már", [], undefined, "Mar-ko je već tu.")
  ],
  3: [
    c("zato", "ezért", [], undefined, "Ez (ovo) + ért (za) = za ovo."), 
    c("iako", "bár", [], undefined, "Bar-em da je iako."),
    c("prema", "felé", [], undefined, "Fale (prema tamo)."),
    c("barem", "legalább", [], undefined, "Legal- (bar) + abb."),
    c("inače", "egyébként", [], undefined, "Eg-jeb (inače je jedno).")
  ],
  4: [
    c("međutim", "azonban", [], undefined, "Azon (tome) + ban (u)."), 
    c("ipak", "mégis", [], undefined, "Még (još) + is (i)."), 
    c("dakle", "tehát", [], undefined, "Tehát - stoga."), 
    c("zapravo", "tulajdonképpen", [], undefined, "Tulajdon (bit stvari)."),
    c("uopšte", "egyáltalán", [], undefined, "Jedno preko svega.")
  ],
  5: [
    c("posledično", "következésképpen", [], undefined, "Követ (pratiti)."), 
    c("uprkos", "annak ellenére", [], undefined, "Ellen (protiv)."), 
    c("štaviše", "sőt", [], undefined, "Sőt - pojačavanje."),
    c("shodno tome", "ennek megfelelően", [], undefined, "Odgovarajuće."),
    c("u suštini", "alapjában véve", [], undefined, "Alap (osnova).")
  ]
};

// --- NOUNS (Final 200 Expansion) ---
export const NOUNS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("kuća", "ház", [], undefined, "U kući je 'Has' (stomak) uvek pun."),
    c("soba", "szoba", [], undefined, "Ista reč."),
    c("prozor", "ablak", [], undefined, "Kroz prozor se vide 'Oblaci'."),
    c("vrata", "ajtó", [], undefined, "Aj-to (Ajde kroz to - vrata)."),
    c("sto", "asztal", [], undefined, "Na stolu stoji 'Stalak'."),
    c("stolica", "szék", [], undefined, "Sediš dok 'Čekaš' (Szék)."),
    c("krevet", "ágy", [], undefined, "A-đi (Hajde u krevet)."),
    c("zid", "fal", [], undefined, "Zid je 'Fališ' (fali deo sobe)."),
    c("pod", "padló", [], undefined, "Pod je 'Padlo' (sve što padne, padne na pod)."),
    c("krov", "tető", [], undefined, "Teto (pokriva kuću odozgo)."),
    c("ključ", "kulcs", [], undefined, "Kulč (zvuči kao ključ)."),
    c("lampa", "lámpa", [], undefined, "Ista reč."),
    c("sat", "óra", [], undefined, "Gledaš u sat 'Ora' (Sada)."),
    c("ogledalo", "tükör", [], undefined, "U ogledalu se 'Tu-vidiš' (Tükör)."),
    c("sapun", "szappan", [], undefined, "Ista reč."),
    c("peškir", "törölköző", [], undefined, "Trljati (Töröl) telo."),
    c("voda", "víz", [], undefined, "Voda je 'Viz-ura' (čista vizija)."),
    c("čaša", "pohár", [], undefined, "Poharaš piće iz čaše."),
    c("tanjir", "tányér", [], undefined, "Ista reč."),
    c("kašika", "kanál", [], undefined, "Kanal (kašika je kao mali kanal za supu)."),
    c("nož", "kés", [], undefined, "Keš (nož je oštar kao keš)."),
    c("viljuška", "villa", [], undefined, "Zvuči kao vile za seno."),
    c("otac", "apa", [], undefined, "A-pa (Tata)."),
    c("majka", "anya", [], undefined, "A-nja (Mama)."),
    c("dete", "gyerek", [], undefined, "Gjerek (Đerek - dete koje skače)."),
    c("beba", "baba", [], undefined, "Beba-baba (lako se pamti)."),
    c("sin", "fiú", [], undefined, "Fiju (sin/dečko brzo protrči)."),
    c("ćerka", "lány", [], undefined, "Lanj (Lane - nežno kao ćerka)."),
    c("brat", "fiútestvér", [], undefined, "Fiú (muški) + testvér (krvni srodnik)."),
    c("sestra", "lánytestvér", [], undefined, "Lány (ženski) + testvér (krvni srodnik)."),
    c("hleb", "kenyér", [], undefined, "Kenjer (Kelner donosi hleb)."),
    c("mleko", "tej", [], undefined, "Tej (Tea sa mlekom)."),
    c("jaje", "tojás", [], undefined, "To-jas (To ja jedem za doručak)."),
    c("sir", "sajt", [], undefined, "Sajt (Sir je 'Site' - zasićuje)."),
    c("meso", "hús", [], undefined, "Huš (Huškati na meso)."),
    c("jabuka", "alma", [], undefined, "Alma (Prva reč u azbuci i prvo voće)."),
    c("so", "só", [], undefined, "So - Só (kratko i slano)."),
    c("šećer", "cukor", [], undefined, "Cuker (Cukor)."),
    c("kafa", "kávé", [], undefined, "Kave (Kafa)."),
    c("čaj", "tea", [], undefined, "Tea (Čaj)."),
    c("put", "út", [], undefined, "Ut (Uputstvo za put)."),
    c("glava", "fej", [], undefined, "Fej (Zvuči kao Face - lice na glavi)."),
    c("ruka", "kéz", [], undefined, "Kez (Knez koji drži ruku)."),
    c("noga", "láb", [], undefined, "Lab (Lavirint kroz koji hodaš nogama)."),
    c("oko", "szem", [], undefined, "Szem (Sve vidim okom)."),
    c("uvo", "fül", [], undefined, "Fül (Fićuk u uvo)."),
    c("nos", "orr", [], undefined, "Or (Miris ide u nos)."),
    c("usta", "száj", [], undefined, "Saj (Sjajno pričaju usta)."),
    c("kosa", "haj", [], undefined, "Haj (Hajde očešljaj kosu)."),
    c("pas", "kutya", [], undefined, "Kutja (Pas ide u kućicu)."),
    c("mačka", "macska", [], undefined, "Mačka (Mac-mac)."),
    c("ptica", "madár", [], undefined, "Madar (Madar-fader, leti kao luda)."),
    c("riba", "hal", [], undefined, "Hal (Hali-gali u vodi)."),
    c("konj", "ló", [], undefined, "Lo (Lopta konjske trke)."),
    // Expansion 1
    c("dvorište", "udvar", [], undefined, "U-dvor (idemo u dvorište)."),
    c("ograda", "kerítés", [], undefined, "Ker-ites (kerovi su iza ograde)."),
    c("bašta", "kert", [], undefined, "Kert (zvuči kao krtica u bašti)."),
    c("čizma", "csizma", [], undefined, "Ista reč."),
    c("pantalone", "nadrág", [], undefined, "Na-drag (pantalone su mu drage)."),
    c("košulja", "ing", [], undefined, "Ing (zvuči kao uing - krilo košulje)."),
    c("kapa", "sapka", [], undefined, "Ista reč."),
    c("šal", "sál", [], undefined, "Ista reč."),
    c("rukavica", "kesztyű", [], undefined, "Kes-tju (ruka ide u kesu)."),
    c("majica", "póló", [], undefined, "Polo majica."),
    c("haljina", "ruha", [], undefined, "Ruha (ruho)."),
    c("torba", "táska", [], undefined, "Taška (tašna)."),
    c("četka", "kefe", [], undefined, "Kefe (kao kafa, ali četka)."),
    c("sunđer", "szivacs", [], undefined, "Sivač (sivi sunđer)."),
    c("metla", "seprű", [], undefined, "Sep-ru (lep-ru-ko kojom se mete)."),
    c("kanta", "vödör", [], undefined, "Vodor (voda u kanti)."),
    c("lonac", "fazék", [], undefined, "Fazek (faza kuvanja u loncu)."),
    c("tiganj", "serpenyő", [], undefined, "Serpen-jo (šerpa u tiganju)."),
    c("poklopac", "fedő", [], undefined, "Fedo (pokriva)."),
    c("krpa", "rongy", [], undefined, "Ronj (roniti suze u krpu)."),
    // Final L1 Extension (+30)
    c("kruška", "körte", [], undefined, "Korte (Kao korte-ljati krušku)."),
    c("jagoda", "eper", [], undefined, "Eper (Jedna e-jagoda)."),
    c("krompir", "burgonya", [], undefined, "Burgonja (Kao burgija u zemlju)."),
    c("paradajz", "paradicsom", [], undefined, "Paradajz je 'Rajska' (Paradicsom) hrana."),
    c("paprika", "paprika", [], undefined, "Ista reč."),
    c("luk", "hagyma", [], undefined, "Ha-đima (Hajde-đipni od luka)."),
    c("puter", "vaj", [], undefined, "Vaj (Vaj-kuka meko kao puter)."),
    c("ulje", "olaj", [], undefined, "Olaj (O-laj-i ulje)."),
    c("sirće", "ecet", [], undefined, "Ecet (Kiselina koja 'Ece-tira')."),
    c("biber", "bors", [], undefined, "Borš (Crn kao bor)."),
    c("supa", "leves", [], undefined, "Leveš (Levaš supu u tanjir)."),
    c("pivo", "sör", [], undefined, "Šer (Kao šerif koji pije pivo)."),
    c("vino", "bor", [], undefined, "Bor (Vino se pije pod borom)."),
    c("sok", "gyümölcslé", [], undefined, "Gjumilč (Voće) + le (Tečnost)."),
    c("med", "méz", [], undefined, "Mez (Meze slatki med)."),
    c("kolač", "sütemény", [], undefined, "Šite (Pecivo) + menj."),
    c("mesar", "hentes", [], undefined, "Henteš (Onaj ko 'Henta'/seče)."),
    c("pekara", "pékség", [], undefined, "Pek (Peći) + seg."),
    c("pijaca", "piac", [], undefined, "Ista reč."),
    c("krava", "tehén", [], undefined, "Te-hen (Te-ha-en, krava daje mleko)."),
    c("svinja", "sertés", [], undefined, "Ser-teš (Teška svinja)."),
    c("ovca", "juh", [], undefined, "Juh (Kao juh-hu vuna)."),
    c("kokoška", "csirke", [], undefined, "Čirke (Kao čirkanje/kljucanje)."),
    c("zec", "nyúl", [], undefined, "Njul (Njuška zec)."),
    c("miš", "egér", [], undefined, "Eger (Zvuči kao 'Eger' grad miševa)."),
    c("slon", "elefánt", [], undefined, "Elefant."),
    c("lav", "oroszlán", [], undefined, "Oros-lan (Ruski lan-lav)."),
    c("tigar", "tigris", [], undefined, "Tigris."),
    c("medved", "medve", [], undefined, "Medve."),
    c("vuk", "farkas", [], undefined, "Farkaš (Onaj sa repom/fark).")
  ],
  2: [
    c("škola", "iskola", [], undefined, "Ista reč."),
    c("bolnica", "kórház", [], undefined, "Kór (Bolest) + ház (Kuća)."),
    c("banka", "bank", [], undefined, "Ista reč."),
    c("pošta", "posta", [], undefined, "Ista reč."),
    c("policija", "rendőrség", [], undefined, "Rend (Red) + őrség (Straža)."),
    c("bioskop", "mozi", [], undefined, "Mozi (Bioskop gde je 'Mozak' na paši)."),
    c("park", "park", [], undefined, "Ista reč."),
    c("ulica", "utca", [], undefined, "Utca (Put-ca)."),
    c("trg", "tér", [], undefined, "Ter (Teren)."),
    c("most", "híd", [], undefined, "Hid (Hidraulika mosta)."),
    c("stanica", "állomás", [], undefined, "Alomaš (Mesto gde se stoji)."),
    c("apoteka", "gyógyszertár", [], undefined, "Gjogj (Lek) + tar (Ostava)."),
    c("prodavnica", "bolt", [], undefined, "Bolt (Kao krunski vijak - prodavnica šrafova)."),
    c("pijaca", "piac", [], undefined, "Pijac (Piac)."),
    c("restoran", "étterem", [], undefined, "Etel (Hrana) + terem (Sala)."),
    c("kafić", "kávézó", [], undefined, "Mesto za kávé."),
    c("crkva", "templom", [], undefined, "Templom (Hram)."),
    c("pozorište", "színház", [], undefined, "Szin (Scena/Boja) + ház (Kuća)."),
    c("lekar", "orvos", [], undefined, "Orvoš (Onaj ko 'Orošava' rane/leči)."),
    c("učitelj", "tanár", [], undefined, "Tanar (Onaj ko te 'Tamani' znanjem)."),
    c("prodavac", "eladó", [], undefined, "Elado (Onaj ko 'Daje' robu)."),
    c("vozač", "sofőr", [], undefined, "Šofer."),
    c("kuvar", "szakács", [], undefined, "Sakač (Onaj ko 'Secka' hranu)."),
    c("konobar", "pincér", [], undefined, "Pincer (Onaj ko ide u 'Pincer'/podrum po vino)."),
    c("radnik", "munkás", [], undefined, "Munkaš (Onaj ko radi 'Munka')."),
    c("drvo", "fa", [], undefined, "Fa (Kratko kao drvo)."),
    c("cvet", "virág", [], undefined, "Virag (Viri iz zemlje)."),
    c("reka", "folyó", [], undefined, "Foljo (Tečnost koja 'Foljira'/teče)."),
    c("jezero", "tó", [], undefined, "To (To je voda - jezero)."),
    c("more", "tenger", [], undefined, "Tenger (Tengerine - boja mora)."),
    c("planina", "hegy", [], undefined, "Hegj (Hej, vidi planinu)."),
    c("šuma", "erdő", [], undefined, "Erdo (Zvuči kao 'Brdo' puno drveća)."),
    c("nebo", "ég", [], undefined, "Eg (E-gore je nebo)."),
    c("sunce", "nap", [], undefined, "Nap (Sunce sija po danu - Nap)."),
    c("mesec", "hold", [], undefined, "Hold (Mesec drži 'Hold' noć)."),
    c("zvezda", "csillag", [], undefined, "Čilag (Čili - sija zvezda)."),
    c("vetar", "szél", [], undefined, "Sel (Vetrić koji 'Seli' lišće)."),
    c("kiša", "eső", [], undefined, "Ešo (E-to, pada kiša)."),
    c("sneg", "hó", [], undefined, "Ho (Ho-ho-ho, Deda Mraz i sneg)."),
    c("ormar", "szekrény", [], undefined, "Sekrenj (Gde se 'Skrivaju' stvari)."),
    c("frižider", "hűtőszekrény", [], undefined, "Huto (Hladi) + szekrény (ormar)."),
    c("šporet", "tűzhely", [], undefined, "Tiz (Vatra) + helj (Mesto)."),
    c("rerna", "sütő", [], undefined, "Šito (Gde se 'Šiti'/peče meso)."),
    c("sudopera", "mosogató", [], undefined, "Mošo (Pranje) + gató."),
    c("kada", "kád", [], undefined, "Kad (Kada)."),
    c("tuš", "zuhany", [], undefined, "Zuhanja (Voda koja 'Zuhne'/padne)."),
    c("kompjuter", "számítógép", [], undefined, "Sami (Brojanje) + gep (Mašina)."),
    c("telefon", "telefon", [], undefined, "Ista reč."),
    c("novčanik", "pénztárca", [], undefined, "Penz (Novac) + tarca (torbica)."),
    c("torba", "táska", [], undefined, "Taška (Tašna)."),
    // Expansion 2
    c("hotel", "szálloda", [], undefined, "Salloda (sala za odmor)."),
    c("muzej", "múzeum", [], undefined, "Ista reč."),
    c("zoološki vrt", "állatkert", [], undefined, "Allat (životinja) + kert (bašta)."),
    c("stan", "lakás", [], undefined, "Lakaš (lako je u stanu)."),
    c("komšija", "szomszéd", [], undefined, "Som-sed (osom sedi pored)."),
    c("lift", "lift", [], undefined, "Ista reč."),
    c("stepenice", "lépcső", [], undefined, "Lepčo (lepe stepenice)."),
    c("ogledalo", "tükör", [], undefined, "Tukor (tu se gledaš)."),
    c("peškir", "törölköző", [], undefined, "Torol-kozo (trljati se)."),
    c("taksi", "taxi", [], undefined, "Ista reč."),
    c("karta", "jegy", [], undefined, "Jeđ (jedi kartu)."),
    c("pasoš", "útlevél", [], undefined, "Ut (put) + level (pismo)."),
    c("prtljag", "csomag", [], undefined, "Čomag (čvorak u paketu)."),
    c("avion", "repülőgép", [], undefined, "Repil (rep aviona) + gep (mašina)."),
    c("voz", "vonat", [], undefined, "Vonat (vuče nat-rag)."),
    c("autobus", "autóbusz", [], undefined, "Ista reč."),
    c("bicikl", "bicikli", [], undefined, "Ista reč."),
    c("semafor", "közlekedési lámpa", [], undefined, "Lampa za kretanje."),
    c("vreme (prognoza)", "időjárás", [], undefined, "Ido (vreme) + jaraš (šetnja)."),
    c("oblak", "felhő", [], undefined, "Fel-ho (gore na nebu)."),
    // Final L2 Extension (+30)
    c("magla", "köd", [], undefined, "Kid (Kao kidati maglu)."),
    c("oluja", "vihar", [], undefined, "Vihar (Kao vihor)."),
    c("munja", "villám", [], undefined, "Vilam (Vila-munja)."),
    c("grom", "dörgés", [], undefined, "Dir-geš (Dirka-grom)."),
    c("leto", "nyár", [], undefined, "Njar (Njar-njar toplo je)."),
    c("zima", "tél", [], undefined, "Tel (Telo zimi drhti)."),
    c("proleće", "tavasz", [], undefined, "Tavas (Tava sunca)."),
    c("jesen", "ősz", [], undefined, "Is (Is-is pada lišće)."),
    c("sever", "észak", [], undefined, "Isak (Severni Isak)."),
    c("jug", "dél", [], undefined, "Del (Južni deo)."),
    c("istok", "kelet", [], undefined, "Kelet (Kao klet istok)."),
    c("zapad", "nyugat", [], undefined, "Njugat (Njuška zapad)."),
    c("selo", "falu", [], undefined, "Falu (Kao fali-malo-selo)."),
    c("grad", "város", [], undefined, "Varoš."),
    c("država", "ország", [], undefined, "Orsag (Orlovi na zemlji)."),
    c("granica", "határ", [], undefined, "Hatar (Atar/Granica)."),
    c("pasoš", "útlevél", [], undefined, "Ut (put) + level (pismo)."),
    c("aerodrom", "repülőtér", [], undefined, "Repil (avion) + ter (teren)."),
    c("kamera", "fényképezőgép", [], undefined, "Fenj (svetlo) + kep (slika) + gep."),
    c("televizija", "televízió", [], undefined, "Ista reč."),
    c("radio", "rádió", [], undefined, "Ista reč."),
    c("novine", "újság", [], undefined, "Uj (novo) + sag."),
    c("časopis", "magazin", [], undefined, "Ista reč."),
    c("pismo", "levél", [], undefined, "Level (List/Pismo)."),
    c("olovka", "toll", [], undefined, "Tol (Kao pero/tol)."),
    c("knjiga", "könyv", [], undefined, "Konjv (Kao konj čita)."),
    c("sveska", "füzet", [], undefined, "Fizet (Kao fizet-plati-svesku)."),
    c("tabla", "tábla", [], undefined, "Ista reč."),
    c("učenik", "tanuló", [], undefined, "Tanulo (Onaj ko se tamani učenjem)."),
    c("student", "egyetemista", [], undefined, "Egyetem (Fakultet) + ista.")
  ],
  3: [
    c("sreća", "boldogság", [], undefined, "Boldog (Bolje-do-gore - srećan)."),
    c("tuga", "szomorúság", [], undefined, "Somoru (Zvuči kao 'Smoran')."),
    c("ljubav", "szerelem", [], undefined, "Ser-elem (Element srca)."),
    c("mržnja", "gyűlölet", [], undefined, "Gjilo (Zvuči kao 'Gilo' - giljotina/mržnja)."),
    c("strah", "félelem", [], undefined, "Felelem (Fali mi hrabrosti)."),
    c("nada", "remény", [], undefined, "Remenj (Remen koji drži nadu)."),
    c("ponos", "büszkeség", [], undefined, "Biske (Zvuči kao 'Bistar' i ponosan)."),
    c("istina", "igazság", [], undefined, "Igaz (I-gas, prava istina)."),
    c("laž", "hazugság", [], undefined, "Hazug (Onaj ko 'Hulji'/laže)."),
    c("mir", "béke", [], undefined, "Beke (Zvuči kao 'Bekstvo' od rata)."),
    c("rat", "háború", [], undefined, "Haboru (Habor - haos rata)."),
    c("sloboda", "szabadság", [], undefined, "Szabad (Slobodan - kao Sabado/subota)."),
    c("pravda", "igazság", [], undefined, "Isto što i istina."),
    c("znanje", "tudás", [], undefined, "Tudaš (Tuda se ide do znanja)."),
    c("iskustvo", "tapasztalat", [], undefined, "Tapasztal (Tapa-tapa, hodaš i stičeš iskustvo)."),
    c("moć", "hatalom", [], undefined, "Hatalom (Hata - uticaj)."),
    c("prilika", "lehetőség", [], undefined, "Lehet (Može biti - prilika)."),
    c("razlika", "különbség", [], undefined, "Kilonb (Kilo-više, razlika)."),
    c("sličnost", "hasonlóság", [], undefined, "Hasonlo (Slično kao pas - haski)."),
    c("posao", "munka", [], undefined, "Munka (Mučna rabota)."),
    c("novac", "pénz", [], undefined, "Penzos (Penzija/Novac)."),
    c("račun", "számla", [], undefined, "Samla (Sami se brojevi na računu)."),
    c("plata", "fizetés", [], undefined, "Fizet (Fizički rad za platu)."),
    c("odmor", "pihenés", [], undefined, "Pihen (Pih, odmaram konačno)."),
    c("putovanje", "utazás", [], undefined, "Utazas (U-taze, novi put)."),
    c("praznik", "ünnep", [], undefined, "Unep (U-lepo - praznik)."),
    c("poklon", "ajándék", [], undefined, "Ajandek (A-ja-nek-dam poklon)."),
    c("muzika", "zene", [], undefined, "Zene (Zvuci u ušima)."),
    c("film", "film", [], undefined, "Ista reč."),
    c("sport", "sport", [], undefined, "Ista reč."),
    c("hobi", "hobbi", [], undefined, "Ista reč."),
    c("umetnost", "művészet", [], undefined, "Mu (Delo) + veszet."),
    c("kultura", "kultúra", [], undefined, "Ista reč."),
    c("čekić", "kalapács", [], undefined, "Kalapač (Onaj ko 'Lupa')."),
    c("ekser", "szög", [], undefined, "Sog (Zvuči kao 'Šiljak')."),
    c("makaze", "olló", [], undefined, "Ollo (Dva kruga kao o-o)."),
    c("lepak", "ragasztó", [], undefined, "Ragasz (Raga - lepi se)."),
    c("papir", "papír", [], undefined, "Ista reč."),
    c("koverta", "boríték", [], undefined, "Bori (Bora papir u koverti)."),
    c("pečat", "bélyegző", [], undefined, "Beljeg (Beleg/Pečat)."),
    c("potpis", "aláírás", [], undefined, "Ala (Ispod) + iras (pisanje)."),
    c("ugovor", "szerződés", [], undefined, "Serze (Serija pravila)."),
    c("sastanak", "megbeszélés", [], undefined, "Beszel (Pričati) na sastanku."),
    c("poruka", "üzenet", [], undefined, "Uzenet (U-u-zenu, stigla poruka)."),
    c("vest", "hír", [], undefined, "Hir (Brza kao hir)."),
    c("vreme", "idő", [], undefined, "Ido (Idemo dalje kroz vreme)."),
    // Expansion 3
    c("iznenađenje", "meglepetés", [], undefined, "Meg-lepe-tes (lepo iznenađenje)."),
    c("usamljenost", "magány", [], undefined, "Maganj (kao magla u glavi)."),
    c("bes", "düh", [], undefined, "Duh (besan duh)."),
    c("ljubomora", "féltékenység", [], undefined, "Fel (plaši se) + tekeny."),
    c("strpljenje", "türelem", [], undefined, "Ture-lem (moraš istrpiti turu)."),
    c("mašta", "képzelet", [], undefined, "Kep (slika) + zelet."),
    c("misao", "gondolat", [], undefined, "Gond (briga/misao)."),
    c("rešenje", "megoldás", [], undefined, "Oldaš problem."),
    c("uspeh", "siker", [], undefined, "Siker (zvuči kao seker/šećer - sladak uspeh)."),
    c("greška", "hiba", [], undefined, "Hiba (riba u grešci)."),
    c("budućnost", "jövő", [], undefined, "Jovo (onaj koji dolazi)."),
    c("prošlost", "múlt", [], undefined, "Mult (mnogo puta prošlo)."),
    c("sadašnjost", "jelen", [], undefined, "Jelen (ovde i sad)."),
    c("priroda", "természet", [], undefined, "Termeset (plodovi prirode)."),
    c("okolina", "környezet", [], undefined, "Kor (krug) + nyezet."),
    c("društvo", "társaság", [], undefined, "Tarša (drug) + sag."),
    c("razgovor", "beszélgetés", [], undefined, "Beszel (pričati)."),
    c("pitanje", "kérdés", [], undefined, "Kerdes (tražim odgovor)."),
    c("odgovor", "válasz", [], undefined, "Valasz (vadiš odgovor)."),
    c("jezik", "nyelv", [], undefined, "Njelv (njen jezik)."),
    // Final L3 Extension (+30)
    c("glas", "hang", [], undefined, "Hang (Kao klatno/hang)."),
    c("pesma", "dal", [], undefined, "Dal (Kao daleki zvuci)."),
    c("bend", "zenekar", [], undefined, "Zene (muzika) + kar."),
    c("koncert", "koncert", [], undefined, "Ista reč."),
    c("instrument", "hangszer", [], undefined, "Hang (glas) + szer."),
    c("slika", "kép", [], undefined, "Kep (Kao kapa slike)."),
    c("skulptura", "szobor", [], undefined, "Sobor (Sabor kipova)."),
    c("crtanje", "rajzolás", [], undefined, "Rajz (Kao rajf/linija)."),
    c("izložba", "kiállítás", [], undefined, "Alitas (Stajanje/Izlaganje)."),
    c("umetnik", "művész", [], undefined, "Mu (Delo) + vesz."),
    c("fudbal", "foci", [], undefined, "Foci."),
    c("košarka", "kosárlabda", [], undefined, "Kosar (Korpa) + labda."),
    c("tenis", "tenisz", [], undefined, "Ista reč."),
    c("plivanje", "úszás", [], undefined, "Usas (U-sas plivanje)."),
    c("trčanje", "futás", [], undefined, "Futas (Fudbal/Trčanje)."),
    c("lopta", "labda", [], undefined, "Labda (Labava lopta)."),
    c("tim", "csapat", [], undefined, "Čapat (Kao čopor)."),
    c("utakmica", "mérkőzés", [], undefined, "Merko (Meriti snagu)."),
    c("gol", "gól", [], undefined, "Ista reč."),
    c("pobeda", "győzelem", [], undefined, "Gjize (Kao griz pobede)."),
    c("medalja", "érem", [], undefined, "Erem (Kao jaram oko vrata)."),
    c("trening", "edzés", [], undefined, "Edzes (E-džes trening)."),
    c("igra", "játék", [], undefined, "Jatek (Ja-tek igram)."),
    c("zabava", "szórakozás", [], undefined, "Sora (Sve-u-red zabava)."),
    c("ples", "tánc", [], undefined, "Tanc."),
    c("ribolov", "horgászat", [], undefined, "Horgas (Kao horgoš udica)."),
    c("lov", "vadászat", [], undefined, "Vadas (Vadi divljač)."),
    c("kampovanje", "kempingezés", [], undefined, "Ista reč."),
    c("šetnja", "séta", [], undefined, "Seta (Setaš stazom)."),
    c("uspomena", "emlék", [], undefined, "Emlek (Kao emblem sećanja).")
  ],
  4: [
    c("društvo", "társadalom", [], undefined, "Társ (drug) + dalom."),
    c("ekonomija", "gazdaság", [], undefined, "Gazda (domaćin) + ság."),
    c("politika", "politika", [], undefined, "Politika."),
    c("vlada", "kormány", [], undefined, "Kormilo države."),
    c("zakon", "törvény", [], undefined, "Pravilo."),
    c("odgovornost", "felelősség", [], undefined, "Felel (odgovarati)."),
    c("zdravlje", "egészség", [], undefined, "Egész (ceo)."),
    c("nauka", "tudomány", [], undefined, "Tud (znati)."),
    c("umetnost", "művészet", [], undefined, "Delo (mű)."),
    c("okolina", "környezet", [], undefined, "Krug (kör)."),
    c("napredak", "haladás", [], undefined, "Halad (napredovati)."),
    c("sigurnost", "biztonság", [], undefined, "Biztos (siguran)."),
    c("promena", "változás", [], undefined, "Vált (menjati)."),
    c("uticaj", "hatás", [], undefined, "Hat (delovati)."),
    c("izvor", "forrás", [], undefined, "Vrelo."),
    c("razum", "értelem", [], undefined, "Ért (razumeti)."),
    c("vrednost", "érték", [], undefined, "Vredeti."),
    c("zajednica", "közösség", [], undefined, "Közös (zajednički)."),
    c("pojedinac", "egyén", [], undefined, "Egy (jedan)."),
    c("uzrok", "ok", [], undefined, "Razlog."),
    c("posledica", "következmény", [], undefined, "Követ (pratiti)."),
    c("izazov", "kihívás", [], undefined, "Hív (zvati) van."),
    c("odluka", "döntés", [], undefined, "Dönt (prelomiti)."),
    c("činjenica", "tény", [], undefined, "Fakt."),
    c("podrška", "támogatás", [], undefined, "Pomoć."),
    c("saradnja", "együttműködés", [], undefined, "Zajedno raditi."),
    c("identitet", "identitás", [], undefined, "Identitet."),
    c("kultura", "kultúra", [], undefined, "Kultura."),
    c("religija", "vallás", [], undefined, "Vera."),
    c("moral", "erkölcs", [], undefined, "Moral."),
    c("pravo", "jog", [], undefined, "Zakon."),
    c("dužnost", "kötelesség", [], undefined, "Köt (vezati)."),
    c("investicija", "befektetés", [], undefined, "Ulaganje."),
    c("porez", "adó", [], undefined, "Dati (ad)."),
    c("budžet", "költségvetés", [], undefined, "Trošak."),
    c("resurs", "erőforrás", [], undefined, "Snaga + izvor."),
    c("analiza", "elemzés", [], undefined, "Element (elem)."),
    c("dokaz", "bizonyíték", [], undefined, "Dokazati."),
    c("priznanje", "elismerés", [], undefined, "Poznati (ismer)."),
    c("nezavisnost", "függetlenség", [], undefined, "Függ (zavisiti)."),
    // Expansion 4
    c("razvoj", "fejlődés", [], undefined, "Fejlodes (kao fej-glava koja raste)."),
    c("istraživanje", "kutatás", [], undefined, "Kutataš (kucaš na vrata nauke)."),
    c("obrazovanje", "oktatás", [], undefined, "Oktataš (onaj ko te uči)."),
    c("tržište", "piac", [], undefined, "Pijac (isto kao pijaca)."),
    c("konkurencija", "verseny", [], undefined, "Veršenj (trka)."),
    c("proizvod", "termék", [], undefined, "Termek (rezultat rada)."),
    c("usluga", "szolgáltatás", [], undefined, "Szolga (sluga/usluga)."),
    c("ugovor", "szerződés", [], undefined, "Szerzo (autor ugovora)."),
    c("sud", "bíróság", [], undefined, "Biro (birati pravdu)."),
    c("zatvor", "börtön", [], undefined, "Borton (kao beton)."),
    c("vojska", "hadsereg", [], undefined, "Had (vojska) + sereg."),
    c("svemir", "világűr", [], undefined, "Vilag (svet) + ur (praznina)."),
    c("energija", "energia", [], undefined, "Ista reč."),
    c("okolnost", "körülmény", [], undefined, "Korul (okolo)."),
    c("mogućnost", "lehetőség", [], undefined, "Lehet (može biti)."),
    c("cilj", "cél", [], undefined, "Ista reč."),
    c("pravilo", "szabály", [], undefined, "Sabalj (kao sablja koja seče pravilo)."),
    c("izbor", "választás", [], undefined, "Valaszt (vadiš/biraš)."),
    c("sloboda", "szabadság", [], undefined, "Szabad (slobodan)."),
    c("praznina", "űr", [], undefined, "Ur (prazan prostor)."),
    // Final L4 Extension (+30)
    c("vlast", "hatalom", [], undefined, "Moć."),
    c("demokratija", "demokrácia", [], undefined, "Sloboda."),
    c("republika", "köztársaság", [], undefined, "Javno društvo."),
    c("parlament", "parlament", [], undefined, "Skupština."),
    c("ustav", "alkotmány", [], undefined, "Stvaranje."),
    c("sporazum", "megállapodás", [], undefined, "Stajanje."),
    c("kompromis", "kompromisszum", [], undefined, "Dogovor."),
    c("strategija", "stratégia", [], undefined, "Plan."),
    c("vizija", "vízió", [], undefined, "Pogled."),
    c("misija", "küldetés", [], undefined, "Slanje."),
    c("kontekst", "kontextus", [], undefined, "Okvir."),
    c("perspektiva", "perspektíva", [], undefined, "Pogled."),
    c("princip", "elv", [], undefined, "Pravilo."),
    c("autoritet", "tekintély", [], undefined, "Ugled."),
    c("birokratija", "bürokrácia", [], undefined, "Administracija."),
    c("kapital", "tőke", [], undefined, "Glavnica."),
    c("kriza", "válság", [], undefined, "Válik (postati)."),
    c("reforma", "reform", [], undefined, "Promena."),
    c("sankcija", "szankció", [], undefined, "Kazna."),
    c("suverenitet", "szuverenitás", [], undefined, "Nezavisnost."),
    c("tolerancija", "tolerancia", [], undefined, "Trpeljivost."),
    c("unifikacija", "egyesítés", [], undefined, "Jedan (egy)."),
    c("integracija", "integráció", [], undefined, "Spajanje."),
    c("globalizacija", "globalizáció", [], undefined, "Svet."),
    c("lokalizacija", "lokalizáció", [], undefined, "Mesto."),
    c("urbanizacija", "urbanizáció", [], undefined, "Grad."),
    c("industrija", "ipar", [], undefined, "Rad."),
    c("poljoprivreda", "mezőgazdaság", [], undefined, "Mezo (polje) + gazda."),
    c("turizam", "turizmus", [], undefined, "Put."),
    c("medicina", "orvostudomány", [], undefined, "Orvos (lek) + tud (znanje).")
  ],
  5: [
    c("svest", "tudat", [], undefined, "Tud (znati)."),
    c("podsvest", "tudatalatti", [], undefined, "Ispod svesti."),
    c("konflikt", "konfliktus", [], undefined, "Sukob."),
    c("stvarnost", "valóság", [], undefined, "Való (stvaran)."),
    c("osećanje", "érzelem", [], undefined, "Érez (osećati)."),
    c("infrastruktura", "infrastruktúra", [], undefined, "Sistem."),
    c("fleksibilnost", "rugalmasság", [], undefined, "Elastičnost."),
    c("otpornost", "ellenállás", [], undefined, "Protiv-stajanje."),
    c("transparentnost", "átláthatóság", [], undefined, "Videti preko."),
    c("efikasnost", "hatékonyság", [], undefined, "Hat (delovati)."),
    c("inovacija", "innováció", [], undefined, "Novo."),
    c("konkurentnost", "versenyképesség", [], undefined, "Trka + sposobnost."),
    c("održivost", "fenntarthatóság", [], undefined, "Tart (držati)."),
    c("ravnoteža", "egyensúly", [], undefined, "Jednaka težina."),
    c("prioritet", "prioritás", [], undefined, "Bitan."),
    c("dostignuće", "eredmény", [], undefined, "Rezultat."),
    c("institucija", "intézmény", [], undefined, "Sistem."),
    c("reprezentacija", "képviselet", [], undefined, "Slika + nošenje."),
    c("vlast", "hatalom", [], undefined, "Moć."),
    c("demokratija", "demokrácia", [], undefined, "Sloboda."),
    c("republika", "köztársaság", [], undefined, "Javno društvo."),
    c("parlament", "parlament", [], undefined, "Skupština."),
    c("ustav", "alkotmány", [], undefined, "Stvaranje."),
    c("sporazum", "megállapodás", [], undefined, "Stajanje."),
    c("kompromis", "kompromisszum", [], undefined, "Dogovor."),
    c("strategija", "stratégia", [], undefined, "Plan."),
    c("vizija", "vízió", [], undefined, "Pogled."),
    c("misija", "küldetés", [], undefined, "Slanje."),
    c("kontekst", "kontextus", [], undefined, "Okvir."),
    c("perspektiva", "perspektíva", [], undefined, "Pogled."),
    c("princip", "elv", [], undefined, "Pravilo."),
    c("autoritet", "tekintély", [], undefined, "Ugled."),
    c("birokratija", "bürokrácia", [], undefined, "Administracija."),
    c("kapital", "tőke", [], undefined, "Glavnica."),
    c("kriza", "válság", [], undefined, "Válik (postati)."),
    c("reforma", "reform", [], undefined, "Promena."),
    c("sankcija", "szankció", [], undefined, "Kazna."),
    c("suverenitet", "szuverenitás", [], undefined, "Nezavisnost."),
    c("tolerancija", "tolerancia", [], undefined, "Trpeljivost."),
    c("unifikacija", "egyesítés", [], undefined, "Jedan (egy).")
  ]
};

// --- VERBS ---
export const VERBS: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("biti", "lenni", [], undefined, "Len-ji ljudi samo 'Biju' vreme."),
    c("imati", "van", ["birtokolni"], undefined, "On 'Van' - on ima."),
    c("ići", "menni", [], undefined, "Menni se ide (Menni)."),
    c("doći", "jönni", [], undefined, "Jon (Jon Snow) dolazi."),
    c("jesti", "enni", [], undefined, "E-njami (Enni)."),
    c("piti", "inni", [], undefined, "I-pij (Inni)."),
    c("spavati", "aludni", [], undefined, "A-ludi spavaju."),
    c("raditi", "dolgozni", [], undefined, "Dugo-raditi (Dolgozni)."),
    c("učiti", "tanulni", [], undefined, "Tanul-ni (Zvuči kao 'Taman' za učenje)."),
    c("znati", "tudni", [], undefined, "Tud (Znam tuda put)."),
    c("videti", "látni", [], undefined, "Lat (Latinica se vidi)."),
    c("čuti", "hallani", [], undefined, "Hal (Haluciniram da čujem)."),
    c("reći", "mondani", [], undefined, "Monda (Priča mondene priče)."),
    c("pitati", "kérdezni", [], undefined, "Kerdez (K'tebi ide pitanje)."),
    c("tražiti", "kérni", [], undefined, "Kerni (Kreni da tražiš)."),
    c("voleti", "szeretni", [], undefined, "Seret (Srce kuca za ljubav)."),
    c("pisati", "írni", [], undefined, "Ir-ni (Iritiram papir pisanjem)."),
    c("čitati", "olvasni", [], undefined, "Olvas (Olovka prati čitanje)."),
    c("živeti", "élni", [], undefined, "El (On živi na El-bi)."),
    c("stanovati", "lakni", [], undefined, "Lak (Lako je stanovati)."),
    c("trčati", "futni", [], undefined, "Fut (Fudbal i trčanje)."),
    c("stajati", "állni", [], undefined, "Al (Ali on stoji)."),
    c("sedeti", "ülni", [], undefined, "Ul (Uleti u stolicu)."),
    c("dati", "adni", [], undefined, "Ad (Hajde daj)."),
    c("uzeti", "venni", [], undefined, "Ven (Veni-vidi-vici, uzeo pobedu)."),
    c("kupiti", "vásárolni", [], undefined, "Vašar-olni (Kupovina na vašaru)."),
    c("otvoriti", "nyitni", [], undefined, "Njiti (Njiti otvori)."),
    c("zatvoriti", "zárni", [], undefined, "Zar (Zatvori žar)."),
    c("plakati", "sírni", [], undefined, "Sir-ni (Plače jer nema sira)."),
    c("smejati se", "nevetni", [], undefined, "Nevet (Neverovatno smešno)."),
    c("pevati", "énekelni", [], undefined, "Ene-ko peva (Enekelni)."),
    c("plesati", "táncolni", [], undefined, "Tanc (Tan-tan tancuj)."),
    c("igrati se", "játszani", [], undefined, "Jac (Jac-jac igra)."),
    c("prati", "mosni", [], undefined, "Moš (Možeš da pereš)."),
    c("kuvati", "főzni", [], undefined, "Foz (Faza kuvanja)."),
    c("nositi", "vinni", [], undefined, "Vin (Vini-nošenje)."),
    c("doneti", "hozni", [], undefined, "Hoz (Hajde donesi)."),
    c("čekati", "várni", [], undefined, "Var (Varka čekanja)."),
    c("razumeti", "érteni", [], undefined, "Ert (E-razumem).")
  ],
  2: [
    c("pomoći", "segíteni", [], undefined, "Segit (Sve-git-pomoć)."),
    c("platiti", "fizetni", [], undefined, "Fizet (Fizički plati)."),
    c("tražiti (objekat)", "keresni", [], undefined, "Keres (Kreni s'traženjem)."),
    c("naći", "találni", [], undefined, "Talal (Talentovan da nađe)."),
    c("misliti", "gondolni", [], undefined, "Gond (Misao-gondola)."),
    c("verovati", "hinni", [], undefined, "Hin (Himen-veruje u snagu)."),
    c("zaboraviti", "felejteni", [], undefined, "Felejt (Fali mi sećanje)."),
    c("setiti se", "emlékezni", [], undefined, "Emlek (Uspomena-emblem)."),
    c("krenuti", "indulni", [], undefined, "Indul (U-startu kreni)."),
    c("stići", "érkezni", [], undefined, "Erkez (E-stigli smo)."),
    c("ostati", "maradni", [], undefined, "Marad (Mora-da ostane)."),
    c("ostaviti", "hagyni", [], undefined, "Hagj (Hajde pusti)."),
    c("poslati", "küldeni", [], undefined, "Kild (Kilo pisama poslati)."),
    c("obećati", "ígérni", [], undefined, "Iger (I-greška je ne obećati)."),
    c("nadati se", "remélni", [], undefined, "Remelj (Remen nade)."),
    c("plašiti se", "félni", [], undefined, "Fel (Plaši se da ne padne)."),
    c("radovati se", "örülni", [], undefined, "Oril (Orilo-gorilo od radosti)."),
    c("leteti", "repülni", [], undefined, "Repil (Rep aviona koji leti)."),
    c("voziti", "vezetni", [], undefined, "Vezet (Veze-vozi)."),
    c("peći", "sütni", [], undefined, "Sit (Šiš-ćevap se peče)."),
    c("seći", "vágni", [], undefined, "Vag (Vaga-seče na pola)."),
    c("zvati", "hívni", [], undefined, "Hiv (Hej-zovi)."),
    c("slikati", "festeni", [], undefined, "Fest (Fešta-slikanje)."),
    c("staviti", "tenni", [], undefined, "Ten (Tenis-stavi loptu)."),
    c("sakupljati", "gyűjteni", [], undefined, "Gjijt (Gjitaj-skupljaj)."),
    c("izgubiti", "veszíteni", [], undefined, "Vesit (Vezan-izgubljen)."),
    c("vikati", "kiabálni", [], undefined, "Kiabal (Ko-bali-viče)."),
    c("zahvaliti", "köszönni", [], undefined, "Kosen (Kosa-hvala)."),
    c("završiti", "befejezni", [], undefined, "Befejez (Bez-feze-kraj)."),
    c("početi", "kezdeni", [], undefined, "Kezden (Kreni)."),
    c("preporučiti", "ajánlani", [], undefined, "Ajan (Hajde-preporuči)."),
    c("pokazati", "mutatni", [], undefined, "Mutat (Mutira-pokazuje)."),
    c("gledati", "nézni", [], undefined, "Nez (Ne-zuri-gledaj)."),
    c("odmarati", "pihenni", [], undefined, "Pihen (Pih-odmaram)."),
    c("umoriti se", "fáradni", [], undefined, "Farad (Fali-rad-umor)."),
    c("zaustaviti se", "megállni", [], undefined, "Al (Stani)."),
    c("okrenuti se", "fordulni", [], undefined, "Ford (Ford-okreće se)."),
    c("skočiti", "ugrani", [], undefined, "Ugran (U-gran-skok)."),
    c("baciti", "dobni", [], undefined, "Dob (Dob-baciti)."),
    c("vući", "húzni", [], undefined, "Huz (Hajde vuci)."),
    c("gurati", "tolni", [], undefined, "Tol (Toliko guraj)."),
    c("podizati", "emelni", [], undefined, "Emel (E-podigni)."),
    c("računati", "számolni", [], undefined, "Samol (Sami brojevi).")
  ],
  3: [
    c("trenirati", "edzeni", [], undefined, "Edzen (E-treniraj)."),
    c("voziti bicikl", "biciklizni", [], undefined, "Bicikli."),
    c("razmišljati", "gondolkodni", [], undefined, "Gond (Misao)."),
    c("čistiti", "takarítani", [], undefined, "Takari (Taman-čisto)."),
    c("popravljati", "javítani", [], undefined, "Javit (Javi-popravljeno)."),
    c("graditi", "építeni", [], undefined, "Epit (E-gradi)."),
    c("saditi", "ültetni", [], undefined, "Ultet (Uleti biljka)."),
    c("zalivati", "locsolni", [], undefined, "Locsol (Loči vodu)."),
    c("juriti", "szaladni", [], undefined, "Salad (Salata-juriš)."),
    c("penjati se", "mászni", [], undefined, "Masz (Mazi-penji)."),
    c("padati", "esni", [], undefined, "Es-ni (S-neba pada)."),
    c("ustajati", "kelni", [], undefined, "Kel (Hajde-ustaj)."),
    c("ležati", "feküdni", [], undefined, "Fekid (Fale-krevet)."),
    c("sanjati", "álmodni", [], undefined, "Almod (Al-mod-sna)."),
    c("buditi se", "ébredni", [], undefined, "Ebred (E-budi se)."),
    c("birati", "választani", [], undefined, "Valasz (Hajde-biraj)."),
    c("naručiti", "rendelni", [], undefined, "Rend (Red-naruči)."),
    c("probati", "próbálni", [], undefined, "Probal (Probaj)."),
    c("koristiti", "használni", [], undefined, "Has-nal (Korist za has/stomak)."),
    c("istraživati", "kutatni", [], undefined, "Kutat (Kuca-istražuje)."),
    c("pripremati", "készíteni", [], undefined, "Kesz (Gotov-priprema)."),
    c("putovati", "utazni", [], undefined, "Utaz (Put)."),
    c("boriti se", "harcolni", [], undefined, "Harco (Hrabro-bori)."),
    c("pobediti", "győzni", [], undefined, "Gjiz (Zvuči kao 'Griz' za pobedu)."),
    c("vladati", "uralkodni", [], undefined, "Ur (Gospodin-vlada)."),
    c("služiti", "szolgálni", [], undefined, "Szolg (Sluga-služi)."),
    c("verovati (nekome)", "megbízni", [], undefined, "Biz (Siguran-verujem)."),
    c("sumnjati", "kételkedni", [], undefined, "Ket (Dva-sumnjam)."),
    c("rešiti", "megoldani", [], undefined, "Oldan (E-reši)."),
    c("razvijati", "fejleszteni", [], undefined, "Fej (Glava-razvijaj)."),
    c("menjati", "változtatni", [], undefined, "Valto (Vario-menjati)."),
    c("organizovati", "szervezni", [], undefined, "Servez (Sredi-organizuj)."),
    c("planirati", "tervezni", [], undefined, "Terv (Plan)."),
    c("proizvoditi", "gyártani", [], undefined, "Gjar (Fabrika-proizvodi)."),
    c("polagati ispit", "vizsgázni", [], undefined, "Vizsga (Ispit)."),
    c("nedostajati", "hiányozni", [], undefined, "Hijan (Hvali-fali)."),
    c("dogovoriti se", "megbeszélni", [], undefined, "Beszel (Pričati)."),
    c("nagađati", "találgatni", [], undefined, "Talal (Naći-pogoditi)."),
    c("rasti", "nőni", [], undefined, "Noni (On raste)."),
    c("smanjiti se", "csökkenni", [], undefined, "Csok (Čok-manje)."),
    c("prihvatiti", "elfogadni", [], undefined, "Fogad (Primiti).")
  ],
  4: [
    c("odlučiti", "dönteni", [], undefined, "Prelom."),
    c("objasniti", "magyarázni", [], undefined, "Razjasniti."),
    c("razviti", "fejleszteni", [], undefined, "Razvijati."),
    c("prihvatiti", "elfogadni", [], undefined, "Primiti."),
    c("učestvovati", "részt venni", [], undefined, "Deo uzeti."),
    c("rešiti", "megoldani", [], undefined, "Rešiti."),
    c("stvoriti", "alkotni", [], undefined, "Kreirati."),
    c("izraziti", "kifejezni", [], undefined, "Iskazati.")
  ],
  5: [
    c("pretpostaviti", "feltételezni", [], undefined, "Pretpostavka."),
    c("analizirati", "elemezni", [], undefined, "Analiza."),
    c("uticati", "befolyásolni", [], undefined, "Uticaj."),
    c("ubediti", "meggyőzni", [], undefined, "Ubediti."),
    c("tumačiti", "értelmezni", [], undefined, "Tumačenje."),
    c("istražiti", "kutatni", [], undefined, "Istraživanje."),
    c("proveriti", "ellenőrizni", [], undefined, "Provera."),
    c("realizovati", "megvalósítani", [], undefined, "Ostvariti.")
  ]
};

// --- ADJECTIVES ---
export const ADJECTIVES: Record<DifficultyLevel, VocabEntry[]> = {
  1: [
    c("dobar", "jó", [], undefined, "Jo-jo je 'Dobra' igračka."),
    c("loš", "rossz", [], undefined, "Roš (Loš-loš)."),
    c("velik", "nagy", [], undefined, "Nađ-i nešto 'Veliko'."),
    c("mali", "kicsi", [], undefined, "Kiči (Kao kikiriki-mali)."),
    c("lep", "szép", [], undefined, "Sep (Zvuči kao 'Sjajan' i lep)."),
    c("ružan", "csúnya", [], undefined, "Čunja (Zvuči kao 'Čudo' od ružnoće).")
  ],
  2: [
    c("jak", "erős", [], undefined, "Eroš (E-jak je)."),
    c("slab", "gyenge", [], undefined, "Gjenge (Đene-đene, slab je)."),
    c("pametan", "okos", [], undefined, "Oko (Pametne oči-okos)."),
    c("glup", "buta", [], undefined, "Buta (Kao butina-glup)."),
    c("skup", "drága", [], undefined, "Draga (Draga je cena)."),
    c("jeftin", "olcsó", [], undefined, "Olčo (Ološ-jeftin).")
  ],
  3: [
    c("važan", "fontos", [], undefined, "Fontos (Bitan kao font)."),
    c("koristan", "hasznos", [], undefined, "Has-nos (Dobar za has/stomak)."),
    c("opasan", "veszélyes", [], undefined, "Veselj (Veselo-opasno)."),
    c("zanimljiv", "érdekes", [], undefined, "Inderes (Zanimljiv)."),
    c("dosadan", "unalmas", [], undefined, "U-nal (U-la-la, dosadno)."),
    c("čudan", "furcsa", [], undefined, "Furča (Furka-čudan).")
  ],
  4: [
    c("odgovoran", "felelős", [], undefined, "Odgovoran."),
    c("iskren", "őszinte", [], undefined, "Iskren."),
    c("efikasan", "hatékony", [], undefined, "Efikasan."),
    c("nezavisan", "független", [], undefined, "Nezavisan."),
    c("uspešan", "sikeres", [], undefined, "Uspešan."),
    c("ponosan", "büszke", [], undefined, "Ponosan.")
  ],
  5: [
    c("neophodan", "szükséges", [], undefined, "Neophodno."),
    c("precizan", "pontos", [], undefined, "Tačan."),
    c("značajan", "jelentős", [], undefined, "Značajan."),
    c("privremen", "átmeneti", [], undefined, "Privremen."),
    c("stalan", "állandó", [], undefined, "Stalan."),
    c("savršen", "tökéletes", [], undefined, "Savršen.")
  ]
};

// --- NUMBERS ---
const sUnits = ["", "jedan", "dva", "tri", "četiri", "pet", "šest", "sedam", "osam", "devet"];
const sTeens = ["deset", "jedanaest", "dvanaest", "trinaest", "četrnaest", "petnaest", "šesnaest", "sedamnaest", "osamneest", "devetnaest"];
const sTens = ["", "deset", "dvadeset", "trideset", "četrneset", "pedeset", "šezdeset", "sedamdeset", "osamdeset", "devedeset"];
const sHundreds = ["", "sto", "dvesta", "trista", "četiristo", "petsto", "šesto", "sedamsto", "osamsto", "devetsto"];

const genSer = (n: number): string => {
  if (n === 0) return "nula";
  if (n === 1000000) return "milion";
  if (n >= 1000) {
    const th = Math.floor(n / 1000);
    const rem = n % 1000;
    let thStr = th === 1 ? "hiljada" : th === 2 ? "dve hiljade" : th < 5 ? sUnits[th] + " hiljade" : genSer(th) + " hiljada";
    return rem === 0 ? thStr : thStr + " " + genSer(rem);
  }
  if (n >= 100) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    return rem === 0 ? sHundreds[h] : sHundreds[h] + " " + genSer(rem);
  }
  if (n >= 20) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    return u === 0 ? sTens[t] : sTens[t] + " " + sUnits[u];
  }
  if (n >= 10) return sTeens[n - 10];
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
    let thStr = th === 1 ? "ezer" : (th === 2 ? "két" : genHun(th)) + "ezer";
    return rem === 0 ? thStr : thStr + genHun(rem);
  }
  if (n >= 100) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    let hStr = h === 1 ? "száz" : (h === 2 ? "két" : genHun(h)) + "száz";
    return rem === 0 ? hStr : hStr + genHun(rem);
  }
  if (n >= 10) {
    if (n < 20) return n === 10 ? "tíz" : "tizen" + hUnits[n-10];
    if (n < 30) return n === 20 ? "húsz" : "huszon" + hUnits[n-20];
    const t = Math.floor(n/10);
    const u = n%10;
    return hTens[t] + hUnits[u];
  }
  return hUnits[n];
};

const genRange = (start: number, end: number) => {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(c(genSer(i), genHun(i), [], i.toString(), `Broj ${i}`));
  }
  return arr;
};

export const NUMBERS_CARDINAL: Record<DifficultyLevel, VocabEntry[]> = {
  1: [c("nula", "nulla", [], "0", "Nulla."), c("jedan", "egy", [], "1", "Prvi."), c("dva", "kettő", ["két"], "2", "Par."), c("tri", "három", [], "3", "Trio."), c("četiri", "négy", [], "4", "Kvadrat."), c("pet", "öt", [], "5", "Šaka."), c("šest", "hat", [], "6", "Pola tuceta."), c("sedam", "hét", [], "7", "Srećan."), c("osam", "nyolc", [], "8", "Beskonačno."), c("devet", "kilenc", [], "9", "Skoro deset."), c("deset", "tíz", [], "10", "Dve šake.")],
  2: [c("jedanaest", "tizenegy", [], "11", "10+1."), c("dvanaest", "tizenkettő", [], "12", "10+2."), c("dvadeset", "húsz", [], "20", "Dvadeset.")],
  3: [...genRange(21, 100)],
  4: [c("sto", "száz", [], "100", "Sto."), c("dvesta", "kétszáz", [], "200", "Dvesta."), c("hiljada", "ezer", [], "1000", "Hiljada.")],
  5: [c("milion", "egymillió", [], "1000000", "Milion.")]
};

export const NUMBERS_ORDINAL: Record<DifficultyLevel, VocabEntry[]> = {
  1: [c("prvi", "első", [], "1.", "Lider."), c("drugi", "második", [], "2.", "Pratilac."), c("treći", "harmadik", [], "3.", "Bronza."), c("četvrti", "negyedik", [], "4.", "Četvrti."), c("peti", "ötödik", [], "5.", "Peti.")],
  2: [c("šesti", "hatodik", [], "6.", "Šesti."), c("deseti", "tizedik", [], "10.", "Deseti.")],
  3: [c("dvadeseti", "huszadik", [], "20.", "Dvadeseti.")],
  4: [c("stoti", "századik", [], "100.", "Stoti.")],
  5: [c("milioniti", "milliomodik", [], "1.000.000.", "Milioniti.")]
};
