
import React, { useState, useMemo } from 'react';
import { NOUNS, VERBS, ADJECTIVES, ADVERBS, NUMBERS_CARDINAL, NUMBERS_ORDINAL, PHRASES } from '../data/vocabData';
import { DifficultyLevel } from '../types';

interface VocabEntry {
  serbian: string;
  hungarian: string;
  hungarianAlt?: string[];
  display?: string;
}

interface DictionaryProps {
  onGoBack: () => void;
}

type Tab = 'nouns' | 'verbs' | 'adjectives' | 'numbers' | 'adverbs' | 'phrases';

// Comprehensive Semantic Categories based on user request
const SEMANTIC_CATEGORIES: Record<string, string[]> = {
  "Životinje (Állatok)": ["pas", "mačka", "ptica", "riba", "konj", "krava", "svinja", "kokoška", "lav", "tigar", "slon", "medved", "vuk", "lisica", "zmija", "pauk", "muva", "komarac", "životinja", "insekt"],
  "Biljke i Priroda (Növények)": ["drvo", "cvet", "trava", "šuma", "bašta", "ruža", "lala", "biljka", "list", "koren", "priroda", "okolina"],
  "Ljudsko Telo (Emberi Test)": ["glava", "lice", "ruka", "noga", "prst", "stomak", "leđa", "srce", "krv", "oči", "uho", "nos", "usta", "zub", "jezik", "vrat", "rame", "koleno", "kosa", "koža", "kost"],
  "Zdravlje i Medicina (Egészség)": ["zdravlje", "bolest", "bol", "lekar", "bolnica", "lek", "apoteka", "hitna", "pregled", "operacija", "grip", "temperatura"],
  "Ljudi i Porodica (Emberek és Család)": ["čovek", "žena", "muškarac", "dete", "beba", "otac", "majka", "brat", "sestra", "sin", "ćerka", "deda", "baka", "muž", "roditelji", "unuk", "prijatelj", "komšija", "gost", "osoba", "narod"],
  "Hrana i Piće (Étel és Ital)": ["hrana", "piće", "hleb", "mleko", "kafa", "čaj", "meso", "sir", "jaje", "voda", "pivo", "vino", "sok", "doručak", "ručak", "večera", "restoran", "torta", "kolač", "šećer", "so", "biber", "ulje", "voće", "povrće", "jabuka", "kruška", "banana", "krompir", "paradajz", "paprika", "luk", "supa", "sendvič", "lonac", "tiganj", "poklopac"],
  "Odeća i Moda (Ruházat)": ["odeća", "majica", "pantalone", "haljina", "suknja", "košulja", "jakna", "kaput", "cipele", "čarape", "kapa", "šal", "rukavice", "naočare", "sat", "torba", "nakit", "dugme", "moda", "stil", "čizma"],
  "Kuća i Dom (Ház és Otthon)": ["kuća", "stan", "soba", "kuhinja", "kupatilo", "dnevna", "spavaća", "vrata", "prozor", "sto", "stolica", "krevet", "pod", "zid", "krov", "ormar", "lampa", "ogledalo", "ključ", "tepih", "nameštaj", "metla", "kanta", "četka", "sunđer", "dvorište", "ograda", "stepenice", "lift"],
  "Zgrade i Arhitektura (Épületek)": ["zgrada", "škola", "bolnica", "banka", "pošta", "bioskop", "pozorište", "muzej", "hotel", "restoran", "kafić", "crkva", "toranj", "zamak", "stadion", "biblioteka", "zoološki", "stan"],
  "Prevoz i Putovanja (Közlekedés)": ["auto", "autobus", "voz", "brod", "avion", "bicikl", "tramvaj", "metro", "taksi", "stanica", "aerodrom", "karta", "put", "ulica", "most", "semafor", "putovanje", "izlet", "pasoš", "prtljag"],
  "Tehnologija (Technológia)": ["telefon", "kompjuter", "računar", "laptop", "internet", "ekran", "tastatura", "miš", "baterija", "punjač", "kabl", "kamera", "robot", "mašina", "aplikacija", "energija"],
  "Vreme i Klima (Időjárás)": ["vreme", "sunce", "kiša", "sneg", "vetar", "oblak", "magla", "oluja", "grom", "temperatura", "toplo", "hladno", "leto", "zima", "proleće", "jesen", "klima"],
  "Geografija (Földrajz)": ["zemlja", "svet", "kontinent", "država", "grad", "selo", "planina", "brdo", "reka", "jezero", "more", "ocean", "ostrvo", "plaža", "dolina", "pustinja", "mapa"],
  "Svemir (Világűr)": ["svemir", "planeta", "zvezda", "mesec", "sunce", "nebo", "galaksija", "kosmos", "astronaut", "praznina"],
  "Materijali (Anyagok)": ["drvo", "metal", "zlato", "srebro", "gvožđe", "plastika", "staklo", "papir", "kamen", "pesak", "voda", "vazduh", "vatra"],
  "Boje (Színek)": ["boja", "crna", "bela", "crvena", "plava", "zelena", "žuta", "narandžasta", "ljubičasta", "roze", "siva", "braon", "svetla", "tamna"],
  "Posao i Zanimanja (Munka)": ["posao", "rad", "kancelarija", "firma", "šef", "radnik", "lekar", "učitelj", "policajac", "vatrogasac", "kuvar", "konobar", "prodavac", "advokat", "inženjer", "glumac", "pevač", "sportista", "alat", "usluga"],
  "Obrazovanje (Oktatás)": ["škola", "fakultet", "univerzitet", "čas", "lekcija", "ispit", "ocena", "knjiga", "sveska", "olovka", "tabla", "učenik", "student", "učitelj", "profesor", "znanje", "učenje", "obrazovanje"],
  "Novac i Ekonomija (Pénz)": ["novac", "cena", "račun", "banka", "kartica", "keš", "plata", "porez", "dug", "kredit", "ekonomija", "tržište", "firma", "prodaja", "kupovina", "investicija", "budžet", "resurs"],
  "Zakon i Kriminal (Jog)": ["zakon", "pravilo", "policija", "sud", "sudija", "advokat", "zločin", "kazna", "zatvor", "svedok", "dokaz", "krađa", "ubistvo", "dužnost"],
  "Politika i Vlada (Politika)": ["politika", "vlada", "predsednik", "ministar", "stranka", "izbori", "glas", "demokratija", "država", "nacija", "zastava", "himna"],
  "Religija (Vallás)": ["religija", "bog", "crkva", "molitva", "vera", "sveštenik", "anđeo", "đavo", "duša", "raj", "pakao"],
  "Rat i Vojska (Háború)": ["rat", "mir", "vojska", "vojnik", "oružje", "puška", "pištolj", "bomba", "bitka", "pobeda", "poraz"],
  "Muzika (Zene)": ["muzika", "pesma", "bend", "koncert", "instrument", "gitara", "klavir", "bubanj", "violina", "zvuk", "ritam", "melodija"],
  "Književnost i Mediji (Irodalom)": ["knjiga", "roman", "priča", "pesma", "pisac", "novine", "časopis", "vesti", "televizija", "radio", "film", "bioskop", "članak", "tekst"],
  "Umetnost (Művészet)": ["umetnost", "slika", "skulptura", "fotografija", "crtanje", "muzej", "izložba", "umetnik", "boja", "dizajn", "mašta"],
  "Sport (Sport)": ["sport", "fudbal", "košarka", "tenis", "plivanje", "trčanje", "lopta", "tim", "utakmica", "gol", "pobeda", "medalja", "trening", "konkurencija"],
  "Hobi (Hobbi)": ["hobi", "igra", "zabava", "ples", "putovanje", "čitanje", "ribolov", "lov", "kampovanje", "šetnja"],
  "Vreme (Idő - Koncept)": ["vreme", "trenutak", "prošlost", "sadašnjost", "budućnost", "istorija", "vek", "era", "kalendar", "datum", "rok"],
  "Brojevi i Količina (Számok)": ["broj", "nula", "jedan", "dva", "deset", "sto", "hiljada", "milion", "mnogo", "malo", "pola", "par", "komad", "metar", "kilogram", "litra"],
  "Osećanja (Érzelmek)": ["sreća", "tuga", "ljubav", "mržnja", "strah", "bes", "iznenađenje", "nada", "ponos", "sramota", "raspoloženje", "osmeh", "suza", "ljubomora", "strpljenje"],
  "Um i Čula (Elme)": ["um", "misao", "ideja", "sećanje", "san", "vid", "sluh", "miris", "ukus", "dodir", "pamet", "glupost", "razum", "svest", "podsvest"],
  "Komunikacija (Kommunikáció)": ["reč", "rečenica", "jezik", "govor", "razgovor", "pitanje", "odgovor", "glas", "poruka", "pismo", "telefon", "internet", "priznanje"]
};

export const Dictionary: React.FC<DictionaryProps> = ({ onGoBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('nouns');
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to flatten level-based data
  const flattenData = (data: Record<DifficultyLevel, VocabEntry[]>) => {
    return Object.values(data).flat();
  };

  const getFilteredData = useMemo(() => {
    let data: VocabEntry[] = [];
    switch (activeTab) {
      case 'nouns': data = flattenData(NOUNS); break;
      case 'verbs': data = flattenData(VERBS); break;
      case 'adjectives': data = flattenData(ADJECTIVES); break;
      case 'adverbs': data = flattenData(ADVERBS); break;
      case 'phrases': data = flattenData(PHRASES); break;
      // Note: Numbers are handled separately in renderNumbers to maintain sorting/categorization
      case 'numbers': 
        data = [...flattenData(NUMBERS_CARDINAL), ...flattenData(NUMBERS_ORDINAL)];
        break;
    }

    // Remove duplicates
    const uniqueData = data.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.serbian === item.serbian && t.hungarian === item.hungarian
      ))
    );

    if (!searchTerm.trim()) return uniqueData;

    const lowerSearch = searchTerm.toLowerCase();
    return uniqueData.filter(item => 
      item.serbian.toLowerCase().includes(lowerSearch) || 
      item.hungarian.toLowerCase().includes(lowerSearch) ||
      (item.display && item.display.toLowerCase().includes(lowerSearch))
    );
  }, [activeTab, searchTerm]);

  // Special renderer for Nouns to group by semantic category
  const renderNouns = (data: VocabEntry[]) => {
    if (searchTerm.trim()) {
      return renderFlatList(data);
    }

    const categorizedData: Record<string, VocabEntry[]> = {};
    const usedIndices = new Set<string>();

    // 1. Sort into defined categories
    Object.keys(SEMANTIC_CATEGORIES).forEach(category => {
      const keywords = SEMANTIC_CATEGORIES[category];
      categorizedData[category] = data.filter(item => {
        const isMatch = keywords.some(k => item.serbian.toLowerCase().includes(k.toLowerCase()));
        if (isMatch && !usedIndices.has(item.serbian + item.hungarian)) {
            usedIndices.add(item.serbian + item.hungarian);
            return true;
        }
        return false;
      });
    });

    // 2. Collect remaining items
    const remaining = data.filter(item => !usedIndices.has(item.serbian + item.hungarian));
    if (remaining.length > 0) {
      categorizedData["Ostalo (Egyéb)"] = remaining;
    }

    return (
      <div className="space-y-8">
        {Object.entries(categorizedData).map(([category, items]) => {
          if (items.length === 0) return null;
          return (
            <div key={category} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg">{category}</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-start gap-2 p-1 border-b border-slate-50 md:border-0">
                    <span className="text-slate-700 font-semibold text-sm md:text-base">{item.display || item.serbian}</span>
                    <span className="text-slate-300 text-xs">-</span>
                    <span className="text-emerald-600 font-bold text-sm md:text-base">{item.hungarian}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderNumbers = () => {
    // If searching, just show the flat list of search results
    if (searchTerm.trim()) {
        return renderFlatList(getFilteredData);
    }

    const cardinal = flattenData(NUMBERS_CARDINAL);
    const ordinal = flattenData(NUMBERS_ORDINAL);

    // Sort numerically by parsing the display string (e.g. "1" or "10.")
    const sortNumeric = (a: VocabEntry, b: VocabEntry) => {
        const getVal = (str?: string) => {
            if (!str) return 0;
            // Remove dot for ordinals ("10." -> "10")
            return parseInt(str.replace('.', ''), 10) || 0;
        };
        return getVal(a.display) - getVal(b.display);
    };

    // Filter duplicates and sort
    const uniqueCardinal = cardinal
        .filter((item, index, self) => index === self.findIndex(t => t.display === item.display))
        .sort(sortNumeric);

    const uniqueOrdinal = ordinal
        .filter((item, index, self) => index === self.findIndex(t => t.display === item.display))
        .sort(sortNumeric);

    const renderColumnSection = (title: string, data: VocabEntry[]) => (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
            </div>
            <div className="p-6 columns-1 md:columns-2 lg:columns-3 gap-16 space-y-3">
                {data.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-start gap-2 p-1 border-b border-slate-50 md:border-0 break-inside-avoid">
                        <span className="text-slate-700 font-semibold text-sm md:text-base w-12 text-right flex-shrink-0">{item.display || item.serbian}</span>
                        <span className="text-slate-300 text-xs">-</span>
                        <span className="text-emerald-600 font-bold text-sm md:text-base">{item.hungarian}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {renderColumnSection("Obični Brojevi (Tőszámnevek)", uniqueCardinal)}
            {renderColumnSection("Redni Brojevi (Sorszámnevek)", uniqueOrdinal)}
        </div>
    );
  };

  const renderFlatList = (data: VocabEntry[]) => (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-start gap-2 py-1 border-b border-slate-50 last:border-0">
             <span className="text-slate-700 font-semibold">{item.display || item.serbian}</span>
             <span className="text-slate-300 text-sm">-</span>
             <span className="text-emerald-600 font-bold">{item.hungarian}</span>
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <p className="text-center text-slate-400 py-8">Nema rezultata za pretragu.</p>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 animate-fade-in h-[calc(100vh-80px)] flex flex-col">
       {/* Header */}
       <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onGoBack}
            className="p-3 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Rečnik</h1>
       </div>

       {/* Search Bar */}
       <div className="relative mb-6">
         <input 
           type="text" 
           placeholder="Pretraži reči (srpski ili mađarski)..." 
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full p-4 pl-12 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-lg"
         />
         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-50">🔍</span>
       </div>

       {/* Tabs */}
       <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
         {[
           { id: 'nouns', label: 'Imenice', icon: '📦' },
           { id: 'verbs', label: 'Glagoli', icon: '🏃' },
           { id: 'phrases', label: 'Fraze', icon: '💬' },
           { id: 'adjectives', label: 'Pridevi', icon: '✨' },
           { id: 'numbers', label: 'Brojevi', icon: '🔢' },
           { id: 'adverbs', label: 'Ostalo', icon: '🔗' },
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => { setActiveTab(tab.id as Tab); setSearchTerm(''); }}
             className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all border ${
               activeTab === tab.id 
                 ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                 : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
             }`}
           >
             {tab.icon} {tab.label}
           </button>
         ))}
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
         {activeTab === 'nouns' 
            ? renderNouns(getFilteredData) 
            : activeTab === 'numbers' 
              ? renderNumbers()
              : renderFlatList(getFilteredData)
         }
       </div>
    </div>
  );
};
