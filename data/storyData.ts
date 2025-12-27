import { DifficultyLevel, StoryTask } from '../types';

export const STORIES: Record<DifficultyLevel, StoryTask[]> = {
  1: [
    {
      title: "U školi",
      hungarianText: "A diák az iskolában tanul. A tanár ír a táblára. A ceruza kék. A könyv nagy.",
      serbianTranslation: "Učenik uči u školi. Nastavnik piše na tabli. Olovka je plava. Knjiga je velika."
    },
    {
      title: "Voće",
      hungarianText: "Szeretem a gyümölcsöt. A banán sárga és édes. A narancs lédús. Eszem egy körtét.",
      serbianTranslation: "Volim voće. Banana je žuta i slatka. Pomorandža je sočna. Jedem jednu krušku."
    },
    {
      title: "Vreme",
      hungarianText: "Ma süt a nap. Meleg van. Az ég kék. Nincs felhő. Szeretem a nyarat.",
      serbianTranslation: "Danas sija sunce. Toplo je. Nebo je plavo. Nema oblaka. Volim leto."
    },
    {
      title: "Boje",
      hungarianText: "A fű zöld. Az ég kék. A nap sárga. A rózsa piros. A hó fehér.",
      serbianTranslation: "Trava je zelena. Nebo je plavo. Sunce je žuto. Ruža je crvena. Sneg je beo."
    },
    {
      title: "Moj telefon",
      hungarianText: "Ez az új telefonom. Fekete és vékony. Sokat telefonálok. A barátom hív.",
      serbianTranslation: "Ovo je moj novi telefon. Crn je i tanak. Mnogo telefoniram. Moj prijatelj zove."
    },
    {
      title: "Autobus",
      hungarianText: "Várom az autóbuszt. A busz nagy és kék. Sok ember utazik. Én ülök az ablaknál.",
      serbianTranslation: "Čekam autobus. Autobus je velik i plav. Mnogo ljudi putuje. Ja sedim pored prozora."
    },
    {
      title: "Knjiga",
      hungarianText: "Olvasok egy könyvet. A könyv érdekes. Sok kép van benne. Este olvasok az ágyban.",
      serbianTranslation: "Čitam knjigu. Knjiga je zanimljiva. Ima mnogo slika u njoj. Uveče čitam u krevetu."
    },
    {
      title: "Ponedeljak",
      hungarianText: "Ma hétfő van. Kezdődik a hét. Megyek dolgozni. Korán kelek.",
      serbianTranslation: "Danas je ponedeljak. Počinje nedelja. Idem da radim. Rano ustajem."
    },
    {
      title: "Sestra",
      hungarianText: "Van egy lánytestvérem. Ő fiatal és kedves. Szőke haja van. Szeret énekelni.",
      serbianTranslation: "Imam sestru. Ona je mlada i ljubazna. Ima plavu kosu. Voli da peva."
    },
    {
      title: "Lopta",
      hungarianText: "A fiúk fociznak. A labda kerek és fehér. A fiú rúgja a labdát. Gól!",
      serbianTranslation: "Dečaci igraju fudbal. Lopta je okrugla i bela. Dečak šutira loptu. Gol!"
    },
    {
      title: "Cvet",
      hungarianText: "A kertben van egy virág. A virág illatos. Én locsolom a virágot minden nap.",
      serbianTranslation: "U bašti je jedan cvet. Cvet je mirisan. Ja zalivam cvet svaki dan."
    },
    {
      title: "Voda",
      hungarianText: "Szomjas vagyok. Kérek egy pohár vizet. A víz hideg és tiszta. Jól esik.",
      serbianTranslation: "Žedan sam. Tražim čašu vode. Voda je hladna i čista. Prija mi."
    },
    {
      title: "Hladno je",
      hungarianText: "Tél van. Hideg van kint. Esik a hó. Veszek egy kabátot és egy sapkát.",
      serbianTranslation: "Zima je. Hladno je napolju. Pada sneg. Uzimam kaput i kapu."
    },
    {
      title: "Igram se",
      hungarianText: "A gyerek játszik a szobában. Van sok játéka. Épít egy várat kockákból.",
      serbianTranslation: "Dete se igra u sobi. Ima mnogo igračaka. Gradi zamak od kocki."
    },
    {
      title: "Spavam",
      hungarianText: "Fáradt vagyok. Aludni megyek. Az ágy puha. Jó éjszakát kívánok.",
      serbianTranslation: "Umoran sam. Idem da spavam. Krevet je mekan. Želim laku noć."
    },
    {
      title: "Srećan sam",
      hungarianText: "Ma boldog vagyok. Süt a nap és itt vannak a barátaim. Nevetünk.",
      serbianTranslation: "Danas sam srećan. Sija sunce i ovde su moji prijatelji. Smejemo se."
    },
    {
      title: "Velika kuća",
      hungarianText: "Ez egy nagy ház. Fehér falai vannak. Van kert is. Itt lakik a nagymamám.",
      serbianTranslation: "Ovo je velika kuća. Ima bele zidove. Ima i baštu. Ovde stanuje moja baka."
    },
    {
      title: "Mačka",
      hungarianText: "A macska a széken alszik. A szőre puha. Szereti a tejet. Dorombol.",
      serbianTranslation: "Mačka spava na stolici. Krzno joj je meko. Voli mleko. Prede."
    },
    {
      title: "Čaj",
      hungarianText: "Reggel teát iszom. Teszek bele cukrot és citromot. A tea meleg.",
      serbianTranslation: "Ujutru pijem čaj. Stavljam u njega šećer i limun. Čaj je topao."
    },
    {
      title: "Muzika",
      hungarianText: "Szeretem a zenét. Hallgatom a rádiót. A zene hangos. Táncolok a szobában.",
      serbianTranslation: "Volim muziku. Slušam radio. Muzika je glasna. Plešem u sobi."
    },
    {
      title: "Mali pas",
      hungarianText: "A kutya kicsi és barna. A neve Morzsi. Morzsi szeret játszani a kertben.",
      serbianTranslation: "Pas je mali i braon. Ime mu je Morži. Morži voli da se igra u bašti."
    },
    {
      title: "Crveni auto",
      hungarianText: "Az apa autója piros. Az autó gyors. Megyünk a boltba.",
      serbianTranslation: "Tatin auto je crven. Auto je brz. Idemo u prodavnicu."
    },
    {
      title: "Moja soba",
      hungarianText: "A szobám tiszta. Van egy asztal és egy szék. Az ablak nyitva van.",
      serbianTranslation: "Moja soba je čista. Ima jedan sto i jedna stolica. Prozor je otvoren."
    },
    {
      title: "Sladoled",
      hungarianText: "Szeretem a fagyit. A fagyi hideg és édes. Ma eper fagyit eszem.",
      serbianTranslation: "Volim sladoled. Sladoled je hladan i sladak. Danas jedem sladoled od jagode."
    },
    {
      title: "Veliko drvo",
      hungarianText: "A kertben van egy nagy fa. A fa zöld. A madár a fán ül.",
      serbianTranslation: "U bašti je jedno veliko drvo. Drvo je zeleno. Ptica sedi na drvetu."
    },
    {
      title: "Moja kafa",
      hungarianText: "A kávé forró. Sok cukor van benne. Reggel kávét iszom.",
      serbianTranslation: "Kafa je vrela. Ima mnogo šećera u njoj. Ujutru pijem kafu."
    },
    {
      title: "Žuti sunce",
      hungarianText: "A nap sárga és kerek. Süt a nap az égen. Meleg van.",
      serbianTranslation: "Sunce je žuto i okruglo. Sunce sija na nebu. Toplo je."
    },
    {
      title: "Novi cipele",
      hungarianText: "Ez az új cipőm. Fekete és szép. Ma a parkba megyek.",
      serbianTranslation: "Ovo su moje nove cipele. Crne su i lepe. Danas idem u park."
    },
    {
      title: "Beli hleb",
      hungarianText: "A kenyér fehér és friss. Szeretem a kenyeret vajjal. Reggelit eszem.",
      serbianTranslation: "Hleb je beo i svež. Volim hleb sa puterom. Jedem doručak."
    },
    {
      title: "Moja majka",
      hungarianText: "Az anyukám kedves. Ő főz a konyhában. A vacsora finom.",
      serbianTranslation: "Moja majka je ljubazna. Ona kuva u kuhinji. Večera je ukusna."
    },
    {
      title: "Dva mačke",
      hungarianText: "Van két macskám. Az egyik fehér, a másik fekete. Szeretnek aludni.",
      serbianTranslation: "Imam dve mačke. Jedna je bela, druga je crna. Vole da spavaju."
    },
    {
      title: "Plava olovka",
      hungarianText: "A ceruza kék. Írok a papírra. A lecke kész van.",
      serbianTranslation: "Olovka je plava. Pišem na papiru. Domaći je gotov."
    },
    {
      title: "Lepa cvet",
      hungarianText: "A virág piros és szép. Váza van az asztalon. A virág a vázában van.",
      serbianTranslation: "Cvet je crven i lep. Na stolu je vaza. Cvet je u vazi."
    },
    {
      title: "Hladna voda",
      hungarianText: "A víz hideg. Iszom egy pohár vizet. Szomjas vagyok.",
      serbianTranslation: "Voda je hladna. Pijem čašu vode. Žedan sam."
    },
    {
      title: "Moj brat",
      hungarianText: "Van egy bátyám. Ő magas és erős. Focizni szeret.",
      serbianTranslation: "Imam starijeg brata. On je visok i jak. Voli da igra fudbal."
    },
    {
      title: "Ulica",
      hungarianText: "Az utca hosszú. Sok autó van az utcán. A házunk itt van.",
      serbianTranslation: "Ulica je duga. Ima mnogo automobila na ulici. Naša kuća je ovde."
    },
    {
      title: "Ručak",
      hungarianText: "Dél van. Eszem az ebédet. A leves meleg. Szeretem a levest.",
      serbianTranslation: "Podne je. Jedem ručak. Supa je topla. Volim supu."
    },
    {
      title: "Nebo",
      hungarianText: "Az ég kék. Sok fehér felhő van. Repül egy madár.",
      serbianTranslation: "Nebo je plavo. Ima mnogo belih oblaka. Leti jedna ptica."
    },
    {
      title: "Sat",
      hungarianText: "Az óra az asztalon van. Az óra kerek. Már nyolc óra van.",
      serbianTranslation: "Sat je na stolu. Sat je okrugao. Već je osam sati."
    },
    {
      title: "Mali kuća",
      hungarianText: "A ház kicsi, de szép. Van egy ablak. A kert zöld.",
      serbianTranslation: "Kuća je mala, ali lepa. Ima jedan prozor. Bašta je zelena."
    },
    {
      title: "Zelena trava",
      hungarianText: "A fű zöld és puha. A kutya a fűben fut. Süt a nap.",
      serbianTranslation: "Trava je zelena i meka. Pas trči u travi. Sija sunce."
    },
    {
      title: "Moja olovka",
      hungarianText: "Ez az én ceruzám. A ceruza sárga. Írok egy levelet.",
      serbianTranslation: "Ovo je moja olovka. Olovka je žuta. Pišem jedno pismo."
    },
    {
      title: "Slatka jabuka",
      hungarianText: "Az alma piros és édes. Eszem egy almát. Finom az alma.",
      serbianTranslation: "Jabuka je crvena i slatka. Jedem jednu jabuku. Ukusna je jabuka."
    },
    {
      title: "Velika torba",
      hungarianText: "A táska fekete és nagy. Sok könyv van a táskában. Megyek az iskolába.",
      serbianTranslation: "Torba je crna i velika. Mnogo knjiga je u torbi. Idem u školu."
    },
    {
      title: "Bela kafa",
      hungarianText: "Kérek egy kávét tejjel. A kávé meleg. Reggel kávét iszom.",
      serbianTranslation: "Molim jednu kafu sa mlekom. Kafa je topla. Ujutru pijem kafu."
    },
    {
      title: "Crna mačka",
      hungarianText: "A macska fekete. A macska az ágyon alszik. Puha a macska.",
      serbianTranslation: "Mačka je crna. Mačka spava na krevetu. Meka je mačka."
    },
    {
      title: "Stari knjiga",
      hungarianText: "A könyv régi és nagy. Olvasom a könyvet este. Érdekes a könyv.",
      serbianTranslation: "Knjiga je stara i velika. Čitam knjigu uveče. Zanimljiva je knjiga."
    },
    {
      title: "Mali grad",
      hungarianText: "Ez egy kicsi város. Van egy park és egy bolt. Szeretek itt lakni.",
      serbianTranslation: "Ovo je jedan mali grad. Ima jedan park i jedna prodavnica. Volim ovde da živim."
    },
    {
      title: "Prazna čaša",
      hungarianText: "A pohár üres. Kérek egy kis vizet. Szomjas vagyok.",
      serbianTranslation: "Čaša je prazna. Molim malo vode. Žedan sam."
    },
    {
      title: "Dobro dan",
      hungarianText: "Jó napot kívánok! Hogy vagy? Én jól vagyok, köszönöm.",
      serbianTranslation: "Dobar dan želim! Kako si? Ja sam dobro, hvala."
    }
  ],
  2: [
    {
      title: "Kupovina odeće",
      hungarianText: "Ma ruhát vásárolok. Kell egy új nadrág és egy ing. A boltban sok ruha van. Felpróbálok egy kéket.",
      serbianTranslation: "Danas kupujem odeću. Trebaju mi nove pantalone i jedna košulja. U prodavnici ima mnogo odeće. Probam jednu plavu."
    },
    {
      title: "Omiljeni film",
      hungarianText: "Tegnap láttam egy jó filmet. Ez egy vígjáték volt. Sokat nevettem. A színészek jól játszottak.",
      serbianTranslation: "Juče sam gledao dobar film. To je bila komedija. Mnogo sam se smejao. Glumci su dobro glumili."
    },
    {
      title: "U kafiću",
      hungarianText: "Találkozom a barátommal a kávézóban. Rendelünk két kávét és egy süteményt. Beszélgetünk az életről.",
      serbianTranslation: "Sastajem se sa prijateljem u kafiću. Naručujemo dve kafe i jedan kolač. Razgovaramo o životu."
    },
    {
      title: "Vožnja bicikla",
      hungarianText: "Szeretek biciklizni a parkban. A levegő friss. Gyorsan megyek. Vigyázok az emberekre.",
      serbianTranslation: "Volim da vozim bicikl u parku. Vazduh je svež. Idem brzo. Pazim na ljude."
    },
    {
      title: "Poseta baki",
      hungarianText: "Hétvégén meglátogatom a nagymamámat. Ő falun lakik. Mindig finom ebédet főz nekem.",
      serbianTranslation: "Vikendom posećujem svoju baku. Ona živi na selu. Uvek mi kuva ukusan ručak."
    },
    {
      title: "Učenje jezika",
      hungarianText: "Most magyarul tanulok. A nyelvtan nehéz, de a szavak szépek. Minden nap gyakorlok egy órát.",
      serbianTranslation: "Sada učim mađarski. Gramatika je teška, ali reči su lepe. Svaki dan vežbam sat vremena."
    },
    {
      title: "Kuvanje",
      hungarianText: "Ma este én főzöm a vacsorát. Csirkét sütök krumplival. Anyukám segít nekem a konyhában.",
      serbianTranslation: "Večeras ja kuvam večeru. Pečem piletinu sa krompirom. Mama mi pomaže u kuhinji."
    },
    {
      title: "Čišćenje sobe",
      hungarianText: "A szobám rendetlen. Össze kell pakolnom a ruhákat. Porszívózok és felmosok. Most már tiszta minden.",
      serbianTranslation: "Moja soba je u neredu. Moram da spakujem odeću. Usisavam i brišem pod. Sada je sve čisto."
    },
    {
      title: "Čekanje voza",
      hungarianText: "Az állomáson vagyok. A vonat késik tíz percet. Veszek egy újságot és olvasok, amíg várok.",
      serbianTranslation: "Na stanici sam. Voz kasni deset minuta. Kupujem novine i čitam dok čekam."
    },
    {
      title: "Telefonski poziv",
      hungarianText: "Csörög a telefon. Az anyukám hív. Megkérdezi, hogy vagyok. Mondom neki, hogy minden rendben.",
      serbianTranslation: "Telefon zvoni. Zove me mama. Pita me kako sam. Kažem joj da je sve u redu."
    },
    {
      title: "Nova haljina",
      hungarianText: "Mária vett egy új ruhát. A ruha piros és hosszú. Holnap felveszi a buliba. Nagyon csinos lesz.",
      serbianTranslation: "Marija je kupila novu haljinu. Haljina je crvena i dugačka. Sutra će je obući na žurku. Biće veoma zgodna."
    },
    {
      title: "Kišni dan",
      hungarianText: "Egész nap esik az eső. Nem tudunk kimenni játszani. Benn maradunk és kártyázunk a testvéremmel.",
      serbianTranslation: "Ceo dan pada kiša. Ne možemo da izađemo da se igramo. Ostajemo unutra i igramo karte sa mojim bratom."
    },
    {
      title: "Šetnja šumom",
      hungarianText: "Az erdő csendes és szép. Hallom a madarakat. Sétálunk az ösvényen. Látunk egy mókust a fán.",
      serbianTranslation: "Šuma je tiha i lepa. Čujem ptice. Šetamo stazom. Vidimo vevericu na drvetu."
    },
    {
      title: "Igranje tenisa",
      hungarianText: "Péter szeret teniszezni. Minden kedden edzésre jár. Ügyesen üti a labdát. Ő akar lenni a bajnok.",
      serbianTranslation: "Peter voli da igra tenis. Svakog utorka ide na trening. Vešto udara lopticu. On želi da bude šampion."
    },
    {
      title: "Pisanje pisma",
      hungarianText: "Levelet írok a barátomnak. Külföldön él. Leírom, mi történt velem itthon. Remélem, hamar válaszol.",
      serbianTranslation: "Pišem pismo prijatelju. Živi u inostranstvu. Opisujem šta mi se desilo kod kuće. Nadam se da će brzo odgovoriti."
    },
    {
      title: "Doručak u krevetu",
      hungarianText: "Vasárnap reggel van. Kávét és pirítóst eszem az ágyban. Ez a kedvenc napom. Pihenek délig.",
      serbianTranslation: "Nedelja je ujutru. Jedem kafu i tost u krevetu. Ovo je moj omiljeni dan. Odmaram do podneva."
    },
    {
      title: "Plivanje",
      hungarianText: "Nyár van, meleg a víz. Bemegyek a medencébe. Szeretek úszni a víz alatt. Frissítő érzés.",
      serbianTranslation: "Leto je, voda je topla. Ulazim u bazen. Volim da plivam ispod vode. Osvežavajući osećaj."
    },
    {
      title: "Zoološki vrt",
      hungarianText: "A gyerekek az állatkertben vannak. Nézik az oroszlánokat és a zsiráfokat. Az elefánt nagyon nagy. Mindenki boldog.",
      serbianTranslation: "Deca su u zoološkom vrtu. Gledaju lavove i žirafe. Slon je veoma velik. Svi su srećni."
    },
    {
      title: "Sladoled",
      hungarianText: "Kérek két gombóc fagyit. Egy csokoládét és egy epret. Tölcsérbe kérem. Nagyon finom hideg.",
      serbianTranslation: "Tražim dve kugle sladoleda. Jednu čokoladu i jednu jagodu. Tražim u kornetu. Veoma je ukusan hladan."
    },
    {
      title: "Praznici",
      hungarianText: "Jön a karácsony. Feldíszítjük a fát. Ajándékot veszünk a családnak. Együtt énekelünk dalokat.",
      serbianTranslation: "Dolazi Božić. Ukrašavamo jelku. Kupujemo poklone za porodicu. Zajedno pevamo pesme."
    },
    {
      title: "Novi posao",
      hungarianText: "Anna új munkát kapott egy irodában. Az iroda a belvárosban van. Anna minden reggel busszal jár dolgozni.",
      serbianTranslation: "Ana je dobila novi posao u jednoj kancelariji. Kancelarija je u centru grada. Ana svakog jutra ide autobusom na posao."
    },
    {
      title: "Mala bašta",
      hungarianText: "A kertemben sok virág és zöldség van. Szeretem gondozni a növényeket. A paradicsom már piros és édes.",
      serbianTranslation: "U mojoj bašti ima mnogo cveća i povrća. Volim da negujem biljke. Paradajz je već crven i sladak."
    },
    {
      title: "Rođendanska zabava",
      hungarianText: "Holnap lesz a születésnapom. Meghívom a barátaimat egy buliba. Eszünk tortát és táncolunk egész este.",
      serbianTranslation: "Sutra će biti moj rođendan. Pozivam prijatelje na žurku. Ješćemo tortu i plesati celo veče."
    },
    {
      title: "Pas u parku",
      hungarianText: "A parkban sokan sétáltatnak kutyát. Én is elviszem a kutyámat futni. Ő nagyon boldog, amikor kint vagyunk.",
      serbianTranslation: "U parku mnogi šetaju pse. I ja vodim svog psa na trčanje. On je veoma srećan kada smo napolju."
    },
    {
      title: "Zimski sportok",
      hungarianText: "Szeretek síelni a hegyekben. A hó fehér és puha. Vigyázok, mert a pálya néha jeges.",
      serbianTranslation: "Volim da skijam u planinama. Sneg je beo i mekan. Pazim, jer je staza ponekad zaleđena."
    },
    {
      title: "Večera u restoranu",
      hungarianText: "Ma este egy elegáns étteremben vacsorázunk. Halat rendelek salátával. A pincér nagyon udvarias.",
      serbianTranslation: "Večeras večeramo u jednom elegantnom restoranu. Naručujem ribu sa salatom. Konobar je veoma učtiv."
    },
    {
      title: "Stari prijatelj",
      hungarianText: "Ma találkoztam egy régi iskolatársammal. Sokat változott az évek alatt. Megittunk egy teát és beszélgettünk.",
      serbianTranslation: "Danas sam sreo jednog starog školskog druga. Mnogo se promenio tokom godina. Popili smo čaj i razgovarali."
    },
    {
      title: "Putovanje vozom",
      hungarianText: "A vonat Budapestről indul. Az út két óra hosszú. Szeretek az ablakon keresztül nézni a tájat.",
      serbianTranslation: "Voz polazi iz Budimpešte. Put traje dva sata. Volim da gledam predeo kroz prozor."
    },
    {
      title: "Kišobran",
      hungarianText: "Elkezdett esni az eső. Szerencsére nálam van az esernyőm. Sietek haza, hogy ne ázzak el.",
      serbianTranslation: "Počela je da pada kiša. Srećom, imam kod sebe kišobran. Žurim kući da ne pokisnem."
    },
    {
      title: "Čitanje vesti",
      hungarianText: "Minden reggel elolvasom a híreket az interneten. Fontos tudni, mi történik a világban. Utána megyek dolgozni.",
      serbianTranslation: "Svakog jutra pročitam vesti na internetu. Važno je znati šta se dešava u svetu. Posle idem na posao."
    },
    {
      title: "Hobi",
      hungarianText: "A hobbim a fotózás. Sok képet készítek a természetről. A fények reggel a legszebbek.",
      serbianTranslation: "Moj hobi je fotografisanje. Pravim mnogo slika prirode. Svetla su najlepša ujutru."
    },
    {
      title: "Mali stan",
      hungarianText: "A lakásom kicsi, de nagyon otthonos. A falak fehérek, és sok kép van rajta. Egyedül lakom itt.",
      serbianTranslation: "Moj stan je mali, ali veoma ušuškan. Zidovi su beli i na njima ima mnogo slika. Živim ovde sam."
    },
    {
      title: "Pijaca",
      hungarianText: "Szombaton korán megyek a piacra. Veszek friss tojást, tejet és gyümölcsöt. Az eladók nagyon kedvesek.",
      serbianTranslation: "Subotom rano idem na pijacu. Kupujem sveža jaja, mleko i voće. Prodavci su veoma ljubazni."
    },
    {
      title: "Koncert",
      hungarianText: "Este elmegyünk egy koncertre a parkba. A zene hangos és vidám. Sokan táncolnak a fűben.",
      serbianTranslation: "Uveče idemo na jedan koncert u park. Muzika je glasna i vesela. Mnogi plešu u travi."
    },
    {
      title: "Olovka és papír",
      hungarianText: "Le kell írnom a bevásárlólistát. Keresek egy tollat és egy papírt. Kell venni kenyeret és vajat.",
      serbianTranslation: "Moram da napišem listu za kupovinu. Tražim hemijsku i papir. Treba kupiti hleb i puter."
    },
    {
      title: "Torta",
      hungarianText: "Sütöttem egy csokoládétortát. Illata bejárja az egész házat. Várom, hogy kihűljön, és megegyük.",
      serbianTranslation: "Ispekao sam čokoladnu tortu. Miris se širi celom kućom. Čekam da se ohladi pa da je pojedemo."
    },
    {
      title: "Bicikl",
      hungarianText: "A biciklim sárga és gyors. Minden nap ezzel megyek a boltba. Vigyázok az utakon.",
      serbianTranslation: "Moj bicikl je žut i brz. Svaki dan njime idem u prodavnicu. Pazim na putevima."
    },
    {
      title: "Srećna porodica",
      hungarianText: "A családom nagy és boldog. Sokszor találkozunk vasárnap. Együtt ebédelünk és sokat nevetünk.",
      serbianTranslation: "Moja porodica je velika i srećna. Često se viđamo nedeljom. Zajedno ručamo i mnogo se smejemo."
    },
    {
      title: "Hladno jutro",
      hungarianText: "Ma reggel nagyon hideg van. Felveszem a meleg kabátomat és a sálamat. Köd van az utcán.",
      serbianTranslation: "Jutros je veoma hladno. Oblačim svoj topli kaput i šal. Magla je na ulici."
    },
    {
      title: "Zeleni čaj",
      hungarianText: "Délután iszom egy zöld teát. Segít pihenni a munka után. Nem teszek bele se cukrot, se mézet.",
      serbianTranslation: "Popodne pijem zeleni čaj. Pomaže mi da se odmorim posle posla. Ne stavljam u njega ni šećer ni med."
    },
    {
      title: "Mačke és kutyák",
      hungarianText: "Van egy macskám és egy kutyám. Jól kijönnek egymással. Gyakran játszanak a nappaliban.",
      serbianTranslation: "Imam mačku i psa. Dobro se slažu. Često se igraju u dnevnoj sobi."
    },
    {
      title: "Učionica",
      hungarianText: "Az iskolában a terem tiszta és világos. A diákok csendben ülnek a padokban. A tanár éppen magyaráz.",
      serbianTranslation: "U školi je učionica čista i svetla. Učenici tiho sede u klupama. Nastavnik upravo objašnjava."
    },
    {
      title: "Put do kuće",
      hungarianText: "A házunk az utca végén van. Sétálok hazafelé a munka után. Már látom a lámpák fényét.",
      serbianTranslation: "Naša kuća je na kraju ulice. Šetam prema kući posle posla. Već vidim svetlost lampi."
    },
    {
      title: "Šolja čaja",
      hungarianText: "Kérek egy csésze teát citrommal. A tea meleg és finom. Kint esik az eső.",
      serbianTranslation: "Molim jednu šolju čaja sa limunom. Čaj je topao i ukusan. Napolju pada kiša."
    },
    {
      title: "Bioskop",
      hungarianText: "Este moziba megyünk. Megvesszük a jegyeket és a popcornt. A film két óra hosszú lesz.",
      serbianTranslation: "Uveče idemo u bioskop. Kupujemo karte i kokice. Film će trajati dva sata."
    },
    {
      title: "Prazan autobus",
      hungarianText: "A busz ma reggel szinte üres. Leülök az ablak mellé. Korán van még, mindenki alszik.",
      serbianTranslation: "Autobus je jutros skoro prazan. Sedam pored prozora. Rano je još, svi spavaju."
    },
    {
      title: "Sunčan dan",
      hungarianText: "Ma egész nap süt a nap. Kimegyünk a strandra úszni. A víz nagyon kellemes.",
      serbianTranslation: "Danas ceo dan sija sunce. Idemo na plažu da plivamo. Voda je veoma prijatna."
    },
    {
      title: "Večera",
      hungarianText: "A vacsora már az asztalon van. Halat eszünk rrizzsel. Nagyon éhes vagyok.",
      serbianTranslation: "Večera je već na stolu. Jedemo ribu sa pirinčem. Veoma sam gladan."
    },
    {
      title: "Crna olovka",
      hungarianText: "Keresem a fekete tollamat. Itt volt az asztalon, de most nincs sehol. Talán a táskámban van.",
      serbianTranslation: "Tražim svoju crnu hemijsku. Bila je ovde na stolu, ali je sada nema nigde. Možda je u mojoj torbi."
    },
    {
      title: "Dobro jutro",
      hungarianText: "Jó reggelt! Hogy aludtál? Kérsz egy kis kávét vagy teát?",
      serbianTranslation: "Dobro jutro! Kako si spavao? Želiš li malo kafe ili čaja?"
    }
  ],
  3: [
    {
      title: "Izgubljen novčanik",
      hungarianText: "Tegnap elvesztettem a pénztárcámat a piacon. Nagyon ideges voltam. Szerencsére egy becsületes ember megtalálta és visszaadta nekem.",
      serbianTranslation: "Juče sam izgubio novčanik na pijaci. Bio sam veoma nervozan. Srećom, jedan pošten čovek ga je našao i vratio mi ga."
    },
    {
      title: "Razgovor za posao",
      hungarianText: "Holnap állásinterjúra megyek. Felvettem a legjobb öltönyömet. Kicsit izgulok, de felkészültem a kérdésekre. Remélem, megkapom a munkát.",
      serbianTranslation: "Sutra idem na razgovor za posao. Obukao sam svoje najbolje odelo. Malo imam tremu, ali sam spreman za pitanja. Nadama se da ću dobiti posao."
    },
    {
      title: "Planiranje puta",
      hungarianText: "Jövőre Olaszországba utazunk. Már nézzük a térképet és a szállásokat. Szeretnénk Rómát és Velencét is látni. Sok pizzát fogunk enni.",
      serbianTranslation: "Sledeće godine putujemo u Italiju. Već gledamo mapu i smeštaj. Želeli bismo da vidimo Rim i Veneciju. Ješćemo mnogo pice."
    },
    {
      title: "Kod zubara",
      hungarianText: "Fájt a fogam, ezért elmentem a fogorvoshoz. Nem szeretek oda járni. Az orvos adott egy injekciót és betömte a fogamat. Most már nem fáj.",
      serbianTranslation: "Boleo me je zub, zato sam otišao kod zubara. Ne volim da idem tamo. Lekar mi je dao injekciju i plombirao zub. Sada me više ne boli."
    },
    {
      title: "Stari prijatelji",
      hungarianText: "Találkoztam egy régi osztálytársammal az utcán. Évek óta nem láttuk egymást. Beültünk egy kávéra és órákig beszélgettünk a régi szép időkről.",
      serbianTranslation: "Sreo sam starog školskog druga na ulici. Nismo se videli godinama. Seli smo na kafu i satima razgovarali o starim dobrim vremenima."
    },
    {
      title: "Kvar u kući",
      hungarianText: "Elromlott a mosógépünk. Víz folyt a padlóra. Hívtuk a szerelőt, de csak holnap tud jönni. Addig kézzel kell mosnunk.",
      serbianTranslation: "Pokvarila nam se veš mašina. Voda je curela po podu. Zvali smo majstora, ali može da dođe tek sutra. Do tada moramo da peremo ručno."
    },
    {
      title: "Omiljeni sportista",
      hungarianText: "Az én példaképem egy híres úszó. Ő nyerte az olimpiát. Minden nap keményen edz. Én is szeretnék olyan lenni, mint ő.",
      serbianTranslation: "Moj uzor je jedan poznati plivač. On je pobedio na Olimpijadi. Svaki dan naporno trenira. I ja bih voleo da budem kao on."
    },
    {
      title: "Opis grada",
      hungarianText: "Budapest gyönyörű város. A Duna kettészeli a várost Budára és Pestre. Éjszaka a fények varázslatosak. Sok turista látogat ide minden évben.",
      serbianTranslation: "Budimpešta je prelep grad. Dunav deli grad na Budim i Peštu. Noću su svetla čarobna. Mnogo turista posećuje ovo mesto svake godine."
    },
    {
      title: "Selidba",
      hungarianText: "A barátom új lakásba költözik. Segítek neki dobozokat cipelni. A bútorok nehezek, de ketten könnyebb. Este pizzát rendelünk jutalmul.",
      serbianTranslation: "Moj prijatelj se seli u novi stan. Pomažem mu da nosi kutije. Nameštaj je težak, ali udvoje je lakše. Uveče naručujemo picu kao nagradu."
    },
    {
      title: "Venčanje",
      hungarianText: "A nővérem férjhez megy. A ruhája hófehér és gyönyörű. Nagy ünnepséget tartunk a kertben. Mindenki táncol és örül a párnak.",
      serbianTranslation: "Moja sestra se udaje. Njena haljina je snežnobela i prelepa. Pravimo veliku proslavu u bašti. Svi plešu i raduju se paru."
    },
    {
      title: "Saobraćajna gužva",
      hungarianText: "Reggel nagy dugó volt a városban. Késtünk a munkából. Az autók alig mozdultak. Jobb lett volna villamossal menni.",
      serbianTranslation: "Ujutru je bila velika gužva u gradu. Kasnili smo na posao. Automobili su se jedva pomerali. Bilo bi bolje da smo išli tramvajem."
    },
    {
      title: "Kasnim",
      hungarianText: "Sajnos nem érek oda időben. Kérem, várjatok meg! Lerobbant a busz. Tíz perc múlva ott leszek.",
      serbianTranslation: "Nažalost, neću stići na vreme. Molim vas, sačekajte me! Pokvario se autobus. Biću tamo za deset minuta."
    },
    {
      title: "Poklon",
      hungarianText: "Születésnapjára vettem neki egy órát. Remélem, tetszeni fog neki. Sokáig kerestem a boltban, mire megtaláltam a tökéleteset.",
      serbianTranslation: "Za rođendan sam mu kupio sat. Nadam se da će mu se svideti. Dugo sam tražio u prodavnici dok nisam našao onaj savršeni."
    },
    {
      title: "Muzej",
      hungarianText: "Tegnap múzeumban voltunk az iskolával. Régi képeket és szobrokat láttunk. A tárlatvezető sokat mesélt a történelemről. Érdekes volt.",
      serbianTranslation: "Juče smo bili u muzeju sa školom. Videli smo stare slike i kipove. Vodič je mnogo pričao o istoriji. Bilo je zanimljivo."
    },
    {
      title: "Biblioteka",
      hungarianText: "Gyakran járok könyvtárba. Szeretem a könyvek illatát. Kikölcsönöztem egy regényt. Két hetem van elolvasni és visszavinni.",
      serbianTranslation: "Često idem u biblioteku. Volim miris knjiga. Pozajmio sam jedan roman. Imam dve nedelje da ga pročitam i vratim."
    },
    {
      title: "Teretana",
      hungarianText: "Heti háromszor edzőterembe járok. Szeretnék erősebb lenni. Súlyokat emelek és futok a gépen. Utána szaunázok.",
      serbianTranslation: "Tri puta nedeljno idem u teretanu. Želeo bih da budem jači. Dižem tegove i trčim na traci. Posle idem u saunu."
    },
    {
      title: "Ribolov",
      hungarianText: "Hajnalban mentünk horgászni a tóra. Nagy volt a csend. Fogtunk két nagy halat. Ebédre megsütöttük őket.",
      serbianTranslation: "U zoru smo išli na pecanje na jezero. Bila je velika tišina. Upecali smo dve velike ribe. Za ručak smo ih ispekli."
    },
    {
      title: "Kampovanje",
      hungarianText: "A hegyekben sátoroztunk a barátaimmal. Tüzet raktunk és szalonnát sütöttünk. Éjszaka fáztunk kicsit, de a csillagok gyönyörűek voltak.",
      serbianTranslation: "Kampovali smo u planinama sa prijateljima. Založili smo vatru i pekli slaninu. Noću nam je bilo malo hladno, ali su zvezde bile prelepe."
    },
    {
      title: "Skijanje",
      hungarianText: "Télen szeretünk síelni Ausztriában. A hegyek havasak és fehérek. Egész nap csúszunk a lejtőn. Este forró csokit iszunk.",
      serbianTranslation: "Zimi volimo da skijamo u Austriji. Planine su snežne i bele. Ceo dan se spuštamo niz padinu. Uveče pijemo toplu čokoladu."
    },
    {
      title: "Pomoć prijatelju",
      hungarianText: "A barátom beteg lett, ezért bevásároltam neki. Vittem neki gyümölcsöt és gyógyszert. Megköszönte a segítséget. Jó érzés segíteni másokon.",
      serbianTranslation: "Moj prijatelj se razboleo, pa sam mu obavio kupovinu. Odneo sam mu voće i lekove. Zahvalio se na pomoći. Dobar je osećaj pomagati drugima."
    },
    {
      title: "Prvi dan na fakultetu",
      hungarianText: "Izgultam az első napon az egyetemen. Nem ismertem senkit, és eltévedtem a nagy épületben. Végül találtam egy kedves csoporttársat, aki segített.",
      serbianTranslation: "Bio sam nervozan prvog dana na fakultetu. Nisam poznavao nikoga i izgubio sam se u velikoj zgradi. Na kraju sam našao ljubaznog kolegu koji mi je pomogao."
    },
    {
      title: "Pisanje dnevnika",
      hungarianText: "Minden este írok néhány sort a naplómba. Ez segít rendszerezni a gondolataimat és átgondolni, mi történt velem. Sok év múlva érdekes lesz visszaolvasni.",
      serbianTranslation: "Svake večeri napišem nekoliko redova u svoj dnevnik. To mi pomaže da organizujem misli i razmislim o tome šta mi se desilo. Za mnogo godina biće zanimljivo to ponovo pročitati."
    },
    {
      title: "Vrtlarenje",
      hungarianText: "A hétvégén a kertben dolgoztam. Ültettem néhány új virágot és megnyírtam a füvet. Elfáradtam, de jó érzés volt a friss levegőn lenni.",
      serbianTranslation: "Za vikend sam radio u bašti. Posadio sam nekoliko novih cvetova i pokosio travu. Umorio sam se, ali je bio dobar osećaj biti na svežem vazduhu."
    },
    {
      title: "Popravka bicikla",
      hungarianText: "Defektet kaptam, ezért meg kellett javítanom a biciklimet. Szerencsére volt nálam szerszám és egy pótkerék. Fél óra alatt kész lettem.",
      serbianTranslation: "Pukla mi je guma, pa sam morao da popravim bicikl. Srećom, imao sam kod sebe alat i rezervnu gumu. Bio sam gotov za pola sata."
    },
    {
      title: "Učenje gitare",
      hungarianText: "Egy hónapja kezdtem el gitározni tanulni. Még fájnak az ujjaim, de már tudok játszani néhány egyszerű dalt. Minden nap gyakorlok egy kicsit.",
      serbianTranslation: "Počeo sam da učim gitaru pre mesec dana. Još me bole prsti, ali već znam da odsviram nekoliko jednostavnih pesama. Svaki dan vežbam po malo."
    },
    {
      title: "Kišno popodne",
      hungarianText: "Mivel egész délután esett az eső, bent maradtam a házban. Sütöttem egy almás pitét és megnéztem egy régi filmet a televízióban.",
      serbianTranslation: "Pošto je celo popodne padala kiša, ostao sam unutar kuće. Ispekao sam pitu od jabuka i pogledao jedan stari film na televiziji."
    },
    {
      title: "Poseta muzeju umetnosti",
      hungarianText: "A szépművészeti múzeumban jártam. Lenyűgöztek a hatalmas festmények és a szobrok. Sokat tanultam a különböző művészeti korszakokról.",
      serbianTranslation: "Bio sam u muzeju lepih umetnosti. Očarale su me ogromne slike i skulpture. Mnogo sam naučio o različitim umetničkim periodima."
    },
    {
      title: "Rođendansko iznenađenje",
      hungarianText: "A barátaim meglepetés bulit szerveztek nekem. Nem sejtettem semmit, amíg be nem léptem a lakásba. Nagyon boldog voltam, hogy mindenki ott volt.",
      serbianTranslation: "Moji prijatelji su mi organizovali žurku iznenađenja. Nisam ništa slutio dok nisam ušao u stan. Bio sam veoma srećan što su svi bili tamo."
    },
    {
      title: "Šetnja uz more",
      hungarianText: "Nyáron minden este sétáltunk a tengerparton. A naplemente színei gyönyörűek voltak. A sós levegő és a hullámok hangja megnyugtatott.",
      serbianTranslation: "Letos smo svake večeri šetali obalom mora. Boje zalaska sunca su bile prelepe. Slani vazduh i zvuk talasa su me umirivali."
    },
    {
      title: "Kuvanje večere za goste",
      hungarianText: "Vendégeket vártam vacsorára, ezért egész délután a konyhában voltam. Olasz ételt készítettem, ami mindenkinek nagyon ízlett.",
      serbianTranslation: "Čekao sam goste na večeri, pa sam celo popodne bio u kuhinji. Pripremio sam italijansko jelo koje se svima veoma dopalo."
    },
    {
      title: "Selidba u drugi grad",
      hungarianText: "Amikor Budapestre költöztem, minden új volt számomra. Meg kellett szoknom a nagy forgalmat és a tömeget, de most már nagyon szeretem a várost.",
      serbianTranslation: "Kada sam se preselio u Budimpeštu, sve mi je bilo novo. Morao sam da se naviknem na veliki saobraćaj i gužvu, ali sada veoma volim ovaj grad."
    },
    {
      title: "Zaboravljen ključ",
      hungarianText: "Reggel otthon hagytam a kulcsomat az asztalon. Csak este vettem észre, amikor hazaértem a munkából. Szerencsére a feleségemnek volt pótkulcsa.",
      serbianTranslation: "Ujutru sam ostavio ključ kod kuće na stolu. To sam primetio tek uveče kada sam se vratio s posla. Srećom, moja žena je imala rezervni ključ."
    },
    {
      title: "Planinarenje",
      hungarianText: "Felmásztunk a hegy tetejére. Az út meredek és fárasztó volt, de a kilátás kárpótolt mindenért. Messzire el lehetett látni.",
      serbianTranslation: "Popeli smo se na vrh planine. Put je bio strm i zamoran, ali je pogled nadoknadio sve. Moglo se videti daleko."
    },
    {
      title: "Prvi let avionom",
      hungarianText: "Emlékszem az első repülőutamra. Kicsit féltem a felszállásnál, de aztán lenyűgözött a felhők feletti látvány. Gyorsan odaértünk a célhoz.",
      serbianTranslation: "Sećam se svog prvog leta avionom. Malo sam se plašio pri poletanju, ali me je onda očarao prizor iznad oblaka. Brzo smo stigli na cilj."
    },
    {
      title: "Zimski odmor",
      hungarianText: "A téli szünetet a hegyekben töltöttük. Rengeteg hó esett, így minden nap tudtunk szánkózni és hógolyózni. Esténként a kandalló mellett ültünk.",
      serbianTranslation: "Zimski raspust smo proveli u planinama. Palo je mnogo snega, pa smo svakog dana mogli da se sankamo i grudvamo. Večerima smo sedeli pored kamina."
    },
    {
      title: "Nova knjiga",
      hungarianText: "Vettem egy új könyvet, amit már régóta el akartam olvasni. Alig tudtam letenni, annyira izgalmas volt a történet. Egy hét alatt befejeztem.",
      serbianTranslation: "Kupio sam novu knjigu koju sam odavno želeo da pročitam. Jedva sam je ispuštao iz ruku, toliko je priča bila uzbudljiva. Završio sam je za nedelju dana."
    },
    {
      title: "Popravka automobila",
      hungarianText: "A kocsim furcsa hangot adott, ezért elvittem a szerelőhöz. Kiderült, hogy ki kell cserélni egy alkatrészt. Két napig tartott a javítás.",
      serbianTranslation: "Moj auto je ispuštao čudan zvuk, pa sam ga odvezao kod majstora. Ispostavilo se da treba zameniti jedan deo. Popravka je trajala dva dana."
    },
    {
      title: "Lepa uspomena",
      hungarianText: "Nézegettem a régi fényképeket a családi albumban. Sok szép emlék jutott eszembe a gyerekkoromról és a régi nyaralásokról.",
      serbianTranslation: "Razgledao sam stare fotografije u porodičnom albumu. Setio sam se mnogih lepih uspomena iz detinjstva i sa starih letovanja."
    },
    {
      title: "Učenje plivanja",
      hungarianText: "Gyerekkoromban féltem a víztől, de a szüleim beírattak egy úszótanfolyamra. A végére nagyon megszerettem a vizet és megtanultam úszni.",
      serbianTranslation: "U detinjstvu sam se plašio vode, ali su me roditelji upisali na kurs plivanja. Na kraju sam veoma zavoleo vodu i naučio da plivam."
    },
    {
      title: "Večernji trčanje",
      hungarianText: "Szeretek este futni a parkban, amikor már hűvösebb az idő. Ez segít levezetni a napközbeni feszültséget és jobban tudok aludni utána.",
      serbianTranslation: "Volim da trčim uveče u parku kada je vreme već svežije. To mi pomaže da se oslobodim dnevne napetosti i posle toga mogu bolje da spavam."
    },
    {
      title: "Poklon iz inostranstva",
      hungarianText: "A barátom hozott nekem egy különleges ajándékot Japánból. Ez egy kézzel készített teáscsésze volt. Nagyon örültem neki, mert egyedi.",
      serbianTranslation: "Prijatelj mi je doneo poseban poklon iz Japana. To je bila ručno rađena šolja za čaj. Veoma sam joj se obradovao jer je unikatna."
    },
    {
      title: "Ispitni rok",
      hungarianText: "A vizsgaidőszak alatt rengeteget kellett tanulnom. Alig aludtam, és sokat kávéztam, hogy ébren maradjak. Szerencsére minden vizsgám sikerült.",
      serbianTranslation: "Tokom ispitnog roka morao sam mnogo da učim. Jedva sam spavao i pio sam mnogo kafe da bih ostao budan. Srećom, položio sam sve ispite."
    },
    {
      title: "Šetnja gradom noću",
      hungarianText: "Éjszaka a város egészen más arcát mutatja. A fények és a csend varázslatos hangulatot teremtenek. Szeretek ilyenkor céltalanul sétálni.",
      serbianTranslation: "Noću grad pokazuje sasvim drugo lice. Svetla i tišina stvaraju čarobnu atmosferu. Volim tada da šetam bez cilja."
    },
    {
      title: "Prvi kućni ljubimac",
      hungarianText: "Tízéves voltam, amikor megkaptam az első kutyámat. Nagyon sokat kellett foglalkoznom vele, de megtanított az állatok iránti felelősségre.",
      serbianTranslation: "Imao sam deset godina kada sam dobio svog prvog psa. Morao sam mnogo da se bavim njime, ali me je naučio odgovornosti prema životinjama."
    },
    {
      title: "Praznični ručak",
      hungarianText: "Karácsonykor az egész család összegyűlt nálunk. Rengeteg ételt készítettünk, és órákig ültünk az asztalnál. Jó volt látni mindenkit együtt.",
      serbianTranslation: "Za Božić se cela porodica okupila kod nas. Pripremili smo mnogo hrane i satima smo sedeli za stolom. Bilo je lepo videti sve zajedno."
    },
    {
      title: "Iznenadna poseta",
      hungarianText: "Délután váratlanul beállított egy régi barátom. Nagyon meglepődtem, de örültem neki. Megittunk egy sört és felidéztük a régi kalandokat.",
      serbianTranslation: "Popodne je neočekivano upao jedan stari prijatelj. Veoma sam se iznenadio, ali mi je bilo drago. Popili smo pivo i prisetili se starih avantura."
    },
    {
      title: "Gubitak struje",
      hungarianText: "A vihar miatt elment az áram az egész utcában. Gyertyákat gyújtottunk és társasjátékoztunk a gyerekekkel. Különleges és meghitt este volt.",
      serbianTranslation: "Zbog oluje je nestalo struje u celoj ulici. Zapalili smo sveće i igrali društvene igre sa decom. Bila je to posebna i intimna veče."
    },
    {
      title: "Učenje novog recepta",
      hungarianText: "Kipróbáltam egy új receptet, amit az interneten találtam. Ez egy egzotikus ázsiai étel volt. Kicsit csípős lett, de az íze kiváló volt.",
      serbianTranslation: "Isprobao sam novi recept koji sam našao na internetu. To je bilo egzotično azijsko jelo. Ispalo je malo ljuto, ali je ukus bio odličan."
    },
    {
      title: "Šetnja u zoru",
      hungarianText: "Néha szeretek nagyon korán felkelni és sétálni a városban, mielőtt mindenki felébredne. A csend és a friss levegő feltölt energiával egész napra.",
      serbianTranslation: "Ponekad volim da ustanem veoma rano i prošetam gradom pre nego što se svi probude. Tišina i svež vazduh me napune energijom za ceo dan."
    },
    {
      title: "Zaboravljena torba",
      hungarianText: "A buszon felejtettem a táskámat. Szerencsére a sofőr megtalálta és leadta a központi irodában. Másnap érte mentem és visszakaptam mindent.",
      serbianTranslation: "Zaboravio sam torbu u autobusu. Srećom, vozač ju je našao i predao u centralnu kancelariju. Sutradan sam otišao po nju i dobio sve nazad."
    }
  ],
  4: [
    {
      title: "Poslovni sastanak",
      hungarianText: "A mai értekezlet nagyon fontos volt a cég jövője szempontjából. Megvitattuk az új stratégiát és a pénzügyi terveket. Mindenki egyetértett abban, hogy növelnünk kell a hatékonyságot.",
      serbianTranslation: "Današnji sastanak je bio veoma važan za budućnost firme. Razmotrili smo novu strategiju i finansijske planove. Svi su se složili da moramo povećati efikasnost."
    },
    {
      title: "Reklamacija",
      hungarianText: "Szeretnék panaszt tenni a megvásárolt termék miatt. Két nap után elromlott, pedig rendeltetésszerűen használtam. Kérem, cseréljék ki vagy fizessék vissza az árát.",
      serbianTranslation: "Želeo bih da podnesem žalbu zbog kupljenog proizvoda. Pokvario se posle dva dana, iako sam ga koristio prema uputstvu. Molim vas, zamenite ga ili mi vratite novac."
    },
    {
      title: "Istorija",
      hungarianText: "A történelem során sok birodalom felemelkedett és elbukott. Érdekes tanulmányozni, hogyan éltek az emberek régen, és milyen hibákat követtek el. Tanulnunk kell a múltból.",
      serbianTranslation: "Tokom istorije mnoga carstva su se uzdigla i pala. Zanimljivo je proučavati kako su ljudi nekada živeli i kakve su greške pravili. Moramo učiti iz prošlosti."
    },
    {
      title: "Umetnost",
      hungarianText: "A modern művészet gyakran megosztja a közönséget. Vannak, akik szeretik az absztrakt formákat, mások a klasszikus stílust részesítik előnyben. A lényeg, hogy érzelmeket váltson ki.",
      serbianTranslation: "Moderna umetnost često deli publiku. Ima onih koji vole apstraktne forme, dok drugi daju prednost klasičnom stilu. Suština je da izazove emocije."
    },
    {
      title: "Politika",
      hungarianText: "A választások közeledtével a politikusok egyre többet ígérnek. A szavazóknak fontos, hogy tájékozódjanak a pártok programjairól, mielőtt döntenek. A demokrácia alapja a részvétel.",
      serbianTranslation: "Kako se bliže izbori, političari sve više obećavaju. Glasačima je važno da se informišu o programima stranaka pre nego što odluče. Osnova demokratije je učešće."
    },
    {
      title: "Obrazovanje",
      hungarianText: "Az oktatási rendszer folyamatosan változik. Fontos, hogy a diákok ne csak lexikális tudást szerezzenek, hanem megtanuljanak kritikusan gondolkodni is. A tanárok szerepe kulcsfontosságú.",
      serbianTranslation: "Obrazovni sistem se neprestano menja. Važno je da učenici ne stiču samo leksičko znanje, već da nauče i kritički da razmišljaju. Uloga nastavnika je ključna."
    },
    {
      title: "Klimatske promene",
      hungarianText: "Ha nem teszünk valamit a felmelegedés ellen, a következmények katasztrofálisak lesznek. A jégsapkák olvadnak, és a tengerszint emelkedik. Cselekednünk kell most.",
      serbianTranslation: "Ako ne učinimo nešto protiv zagrevanja, posledice će biti katastrofalne. Ledene kape se tope i nivo mora raste. Moramo delovati sada."
    },
    {
      title: "Tehnologija",
      hungarianText: "Az okostelefonok teljesen megváltoztatták a kommunikációs szokásainkat. Bárhol és bármikor elérhetjük egymást, de ez néha terhes is lehet. Nehéz kikapcsolni.",
      serbianTranslation: "Pametni telefoni su potpuno promenili naše navike u komunikaciji. Bilo gde i bilo kada možemo dobiti jedni druge, ali to ponekad može biti i opterećujuće. Teško je isključiti se."
    },
    {
      title: "Zdrava ishrana",
      hungarianText: "Az orvosok azt javasolják, hogy kerüljük a feldolgozott élelmiszereket. A sok zöldség és gyümölcs fogyasztása elengedhetetlen az egészség megőrzéséhez. A vízivás is nagyon fontos.",
      serbianTranslation: "Lekari preporučuju da izbegavamo prerađene namirnice. Konzumiranje mnogo povrća i voća je neophodno za očuvanje zdravlja. Pijenje vode je takođe veoma važno."
    },
    {
      title: "Stres",
      hungarianText: "A modern élet sok stresszel jár. A munkahelyi elvárások magasak, és kevés idő jut a pihenésre. Fontos, hogy találjunk módot a feszültség levezetésére, például sportolással.",
      serbianTranslation: "Moderan život nosi mnogo stresa. Očekivanja na poslu su visoka, a malo vremena preostaje za odmor. Važno je da nađemo način za oslobađanje od napetosti, na primer sportom."
    },
    {
      title: "Budućnost",
      hungarianText: "Senki sem tudja pontosan, mit hoz a jövő. Valószínűleg repülő autók még nem lesznek, de a robotika sokat fog fejlődni. Reméljük, békésebb világban fogunk élni.",
      serbianTranslation: "Niko ne zna tačno šta donosi budućnost. Verovatno još neće biti letećih automobila, ali će robotika mnogo napredovati. Nadamo se da ćemo živeti u mirnijem svetu."
    },
    {
      title: "Tradicija",
      hungarianText: "Húsvétkor sok régi szokást tartunk. A fiúk meglocsolják a lányokat, a lányok pedig tojást festenek. Ez egy szép ünnep, ami összehozza a családot.",
      serbianTranslation: "Za Uskrs održavamo mnoge stare običaje. Dečaci prskaju devojke vodom (ili parfemom), a devojke farbaju jaja. To je lep praznik koji okuplja porodicu."
    },
    {
      title: "Put oko sveta",
      hungarianText: "Álmom, hogy egyszer körbeutazzam a Földet. Szeretnék megismerni különböző kultúrákat és embereket. Már gyűjtöm a pénzt erre a nagy kalandra.",
      serbianTranslation: "San mi je da jednom proputujem oko Zemlje. Želeo bih da upoznam različite kulture i ljude. Već skupljam novac za ovu veliku avanturu."
    },
    {
      title: "Investicije",
      hungarianText: "A tőzsdei befektetés kockázatos lehet, de nagy hasznot is hozhat. Fontos, hogy több lábon álljunk, és ne tegyünk fel mindent egy lapra. Érdemes szakértővel konzultálni.",
      serbianTranslation: "Ulaganje na berzi može biti rizično, ali može doneti i veliku dobit. Važno je da imamo više opcija i da ne stavljamo sve na jednu kartu. Vredi se posavetovati sa stručnjakom."
    },
    {
      title: "Arhitektura",
      hungarianText: "Ez az épület a szecessziós stílus remeke. A homlokzat díszítései növényi motívumokat ábrázolnak. A tervező híres volt a különleges megoldásairól.",
      serbianTranslation: "Ova zgrada je remek-delo secesijskog stila. Ukrasi na fasadi prikazuju biljne motive. Projektant je bio poznat po svojim posebnim rešenjima."
    },
    {
      title: "Književnost",
      hungarianText: "Ez a regény a 19. században játszódik. A főhős egy szegény diák, aki megpróbál kitörni a nyomorból. A könyv társadalomkritikát is megfogalmaz.",
      serbianTranslation: "Ovaj roman se odvija u 19. veku. Glavni junak je siromašan student koji pokušava da se izvuče iz bede. Knjiga formuliše i društvenu kritiku."
    },
    {
      title: "Psihologija",
      hungarianText: "Az emberi viselkedés tanulmányozása bonyolult feladat. Sokszor a tudatalatti vágyak irányítják a tetteinket. A pszichológia segít megérteni önmagunkat.",
      serbianTranslation: "Proučavanje ljudskog ponašanja je složen zadatak. Često podsvesne želje upravljaju našim postupcima. Psihologija pomaže da razumemo sami sebe."
    },
    {
      title: "Mediji",
      hungarianText: "A hírek gyorsan terjednek az interneten. Sajnos sok az álhír is, ezért óvatosnak kell lennünk. Mindig ellenőrizzük a forrást, mielőtt elhiszünk valamit.",
      serbianTranslation: "Vesti se brzo šire internetom. Nažalost, ima mnogo lažnih vesti, zato moramo biti oprezni. Uvek proverimo izvor pre nego što poverujemo u nešto."
    },
    {
      title: "Bankarstvo",
      hungarianText: "Hitelt szerettem volna felvenni a lakásvásárláshoz. A bank szigorú feltételeket szabott. Végül sikerült megállapodnunk a kamatokról és a futamidőről.",
      serbianTranslation: "Želeo sam da podignem kredit za kupovinu stana. Banka je postavila stroge uslove. Na kraju smo uspeli da se dogovorimo o kamatama i roku otplate."
    },
    {
      title: "Pravo",
      hungarianText: "A törvény előtt mindenki egyenlő. Az ügyvédem azt mondta, hogy jó esélyünk van megnyerni a pert. A bizonyítékok egyértelműen mellettünk szólnak.",
      serbianTranslation: "Pred zakonom su svi jednaki. Moj advokat je rekao da imamo dobre šanse da dobijemo parnicu. Dokazi su jasno na našoj strani."
    },
    {
      title: "Etikai dilemmák",
      hungarianText: "A modern tudomány számos etikai dilemmát vet fel, különösen a genetika és a mesterséges intelligencia területén. Fontos, hogy a technológiai fejlődés ne haladja meg az erkölcsi felelősségünket.",
      serbianTranslation: "Moderna nauka pokreće brojne etičke dileme, naročito u oblasti genetike i veštačke inteligencije. Važno je da tehnološki napredak ne prevaziđe našu moralnu odgovornost."
    },
    {
      title: "Fenntartható gazdaság",
      hungarianText: "A jövő gazdaságának alapja a fenntarthatóság kell, hogy legyen. Ez magában foglalja a megújuló energiaforrások használatát és a pazarlás minimalizálását a gyártási folyamatok során.",
      serbianTranslation: "Osnova buduće ekonomije mora biti održivost. To uključuje korišćenje obnovljivih izvora energije i minimiziranje rasipanja tokom procesa proizvodnje."
    },
    {
      title: "Digitális nomád életmód",
      hungarianText: "A távmunka terjedésével egyre többen választják a digitális nomád életmódot. Ez lehetővé teszi, hogy a világ bármely pontjáról dolgozzunk, miközben új kultúrákat ismerünk meg.",
      serbianTranslation: "Širenjem rada na daljinu sve više ljudi bira način života digitalnog nomada. To omogućava da radimo sa bilo koje tačke na svetu, dok istovremeno upoznajemo nove kulture."
    },
    {
      title: "Mesterséges intelligencia a művészetben",
      hungarianText: "Vajon a mesterséges intelligencia képes-e valódi kreativitásra, vagy csak a meglévő mintákat másolja? Ez a kérdés élénk vitákat vált ki a művészek és a technológusok körében.",
      serbianTranslation: "Da li je veštačka inteligencija sposobna za pravu kreativnost, ili samo kopira postojeće obrasce? Ovo pitanje izaziva žive debate među umetnicima i tehnolozima."
    },
    {
      title: "Városfejlesztési stratégiák",
      hungarianText: "A modern városfejlesztés célja az élhetőbb környezet kialakítása. Ez több zöldfelületet, jobb tömegközlekedést és a gyalogosforgalom előtérbe helyezését jelenti a belvárosokban.",
      serbianTranslation: "Cilj modernog urbanog razvoja je stvaranje okruženja ugodnijeg za život. To podrazumeva više zelenih površina, bolji javni prevoz i stavljanje pešačkog saobraćaja u prvi plan u centrima gradova."
    },
    {
      title: "Generációs különbségek",
      hungarianText: "A különböző generációk eltérő értékrenddel és munkamorállal rendelkeznek. A munkahelyi siker kulcsa az ezek közötti megértés és a hatékony együttműködés kialakítása lehet.",
      serbianTranslation: "Različite generacije poseduju različite sisteme vrednosti i radnu etiku. Ključ uspeha na poslu može biti razumevanje između njih i uspostavljanje efikasne saradnje."
    },
    {
      title: "Űrkutatás távlatai",
      hungarianText: "Az űrkutatás új korszaka elé nézünk, ahol a Mars-utazás már nem csak sci-fi. A magáncégek megjelenése felgyorsította a technológiai innovációt ezen a területen.",
      serbianTranslation: "Gledamo u susret novoj eri istraživanja svemira, gde putovanje na Mars više nije samo naučna fantastika. Pojava privatnih kompanija ubrzala je tehnološku inovaciju u ovoj oblasti."
    },
    {
      title: "Kulturális diplomácia",
      hungarianText: "A kulturális diplomácia fontos eszköz az országok közötti feszültség enyhítésére. A művészet és a zene nyelve univerzális, ami képes hidat építeni a különböző nemzetek közé.",
      serbianTranslation: "Kulturna diplomatija je važno sredstvo za ublažavanje tenzija između država. Jezik umetnosti i muzike je univerzalan, što je sposobno da izgradi mostove između različitih nacija."
    },
    {
      title: "Pszichológiai reziliencia",
      hungarianText: "A reziliencia az a képesség, amellyel túltesszük magunkat a nehézségeken. Ennek fejlesztése elengedhetetlen a modern, stresszel teli világban a mentális egészség megőrzéséhez.",
      serbianTranslation: "Reziliencija je sposobnost kojom prevazilazimo poteškoće. Razvoj ovoga je neophodan u modernom svetu punom stresa radi očuvanja mentalnog zdravlja."
    },
    {
      title: "Biodiverzitás védelme",
      hungarianText: "Az ökoszisztémák stabilitása a fajok sokszínűségétől függ. Az erdőirtás és a környezetszennyezés súlyos veszélyt jelent a biodiverzitásra, amit azonnal meg kell állítanunk.",
      serbianTranslation: "Stabilnost ekosistema zavisi od raznolikosti vrsta. Krčenje šuma i zagađenje životne sredine predstavljaju ozbiljnu pretnju biodiverzitetu, što moramo odmah zaustaviti."
    },
    {
      title: "E-learning előnyei",
      hungarianText: "Az online oktatás rugalmasságot biztosít a tanulók számára. Bárki hozzáférhet a legmagasabb szintű tudáshoz, függetlenül a földrajzi helyzetétől, ami demokratizálja az oktatást.",
      serbianTranslation: "Online obrazovanje pruža fleksibilnost učenicima. Bilo ko može pristupiti znanju na najvišem nivou, bez obzira na geografski položaj, što demokratizuje obrazovanje."
    },
    {
      title: "Kiberbiztonsági kockázatok",
      hungarianText: "A digitalizációval párhuzamosan a kiberbűnözés is növekszik. A cégeknek és az egyéneknek is nagy hangsúlyt kell fektetniük adataik védelmére a hálózati támadásokkal szemben.",
      serbianTranslation: "Uporedo sa digitalizacijom raste i sajber kriminal. Kompanije i pojedinci moraju staviti veliki naglasak na zaštitu svojih podataka od mrežnih napada."
    },
    {
      title: "Szociális hálók hatása",
      hungarianText: "A közösségi média alapjaiban változtatta meg a társas kapcsolatainkat. Bár segít a kapcsolattartásban, a túlzott használata izolációhoz és torzult énképhez vezethet.",
      serbianTranslation: "Društvene mreže su iz korena promenile naše društvene odnose. Iako pomažu u održavanju kontakata, prekomerna upotreba može voditi ka izolaciji i iskrivljenoj slici o sebi."
    },
    {
      title: "Megújuló energiaforrások",
      hungarianText: "A nap- és szélenergia használata kulcsfontosságú a szén-dioxid-kibocsátás csökkentésében. Az energetikai átállás gazdasági és környezetvédelmi szempontból is elengedhetetlen.",
      serbianTranslation: "Korišćenje solarne energije i energije vetra je ključno za smanjenje emisije ugljen-dioksida. Energetska tranzicija je neophodna i sa ekonomskog i sa ekološkog aspekta."
    },
    {
      title: "Munka és magánélet egyensúlya",
      hungarianText: "A kiégés megelőzése érdekében kritikus fontosságú a munka és a magánélet közötti egyensúly fenntartása. A tudatos időbeosztás és a pihenés nem luxus, hanem szükséglet.",
      serbianTranslation: "Radi prevencije sagorevanja, od kritične je važnosti održavanje ravnoteže između posla i privatnog života. Svesno planiranje vremena i odmor nisu luksuz, već potreba."
    },
    {
      title: "Globális népességnövekedés",
      hungarianText: "A Föld népességének növekedése óriási nyomást gyakorol az élelmiszer- és vízkészletekre. Az innovatív mezőgazdasági megoldások keresése a jövő egyik legnagyobb kihívása.",
      serbianTranslation: "Porast svetske populacije vrši ogroman pritisak na zalihe hrane i vode. Potraga za inovativnim poljoprivrednim rešenjima je jedan od najvećih izazova budućnosti."
    },
    {
      title: "Mesterséges intelligencia az orvoslásban",
      hungarianText: "A MI képes nagy mennyiségű orvosi adat elemzésére, ami segíthet a korai diagnózis felállításában. Ez forradalmasíthatja az egészségügyet és életeket menthet.",
      serbianTranslation: "VI je sposobna za analizu velike količine medicinskih podataka, što može pomoći u postavljanju rane dijagnoze. To može revolucionisati zdravstvo i spasiti živote."
    },
    {
      title: "Vállalati társadalmi felelősségvállalás",
      hungarianText: "A cégeknek nemcsak a profitra, hanem a közösségre és a környezetre is figyelniük kell. A felelős üzleti magatartás hosszú távon növeli a bizalmat és a versenyképességet.",
      serbianTranslation: "Kompanije ne treba da paze samo na profit, već i na zajednicu i životnu sredinu. Odgovorno poslovno ponašanje dugoročno povećava poverenje i konkurentnost."
    },
    {
      title: "Nyelvek eltűnése",
      hungarianText: "A globalizáció miatt számos kisebbségi nyelv a kihalás szélére került. A nyelvi sokszínűség megőrzése kulturális kincsünk védelmét jelenti a jövő generációi számára.",
      serbianTranslation: "Zbog globalizacije mnogi manjinski jezici su se našli na ivici izumiranja. Očuvanje jezičke raznolikosti znači zaštitu našeg kulturnog blaga za buduće generacije."
    },
    {
      title: "Városi kerékpározás előnyei",
      hungarianText: "A biciklizés nemcsak környezetbarát, hanem egészséges és gyakran gyorsabb is a városi forgalomban. A megfelelő infrastruktúra kiépítése alapvető a biztonsághoz.",
      serbianTranslation: "Biciklizam nije samo ekološki prihvatljiv, već je i zdrav i često brži u gradskom saobraćaju. Izgradnja odgovarajuće infrastrukture je osnovna za bezbednost."
    },
    {
      title: "Önvezető autók jövője",
      hungarianText: "Az önvezető járművek ígérete a biztonságosabb és hatékonyabb közlekedés. Azonban még számos technikai és jogi kérdést kell tisztázni a széles körű elterjedés előtt.",
      serbianTranslation: "Obećanje autonomnih vozila je bezbedniji i efikasniji saobraćaj. Međutim, još uvek treba razjasniti brojna tehnička i pravna pitanja pre široke primene."
    },
    {
      title: "Élethosszig tartó tanulás",
      hungarianText: "A gyorsan változó világban a tanulás nem ér véget az iskolapadban. Az új készségek folyamatos elsajátítása a szakmai és személyes fejlődés záloga.",
      serbianTranslation: "U svetu koji se brzo menja, učenje se ne završava u školskoj klupi. Neprestano savladavanje novih veština je zalog profesionalnog i ličnog razvoja."
    },
    {
      title: "Körforgásos gazdaság",
      hungarianText: "A lineáris gazdasági modellt fel kell váltania a körforgásosnak, ahol az erőforrásokat újrahasznosítjuk. Ez az egyetlen út a hulladékmentes és fenntartható jövő felé.",
      serbianTranslation: "Linearni ekonomski model mora zameniti cirkularni, gde ponovo koristimo resurse. To je jedini put ka održivoj budućnosti bez otpada."
    },
    {
      title: "Emocionális intelligencia jelentősége",
      hungarianText: "A vezetők számára az érzelmi intelligencia ugyanolyan fontos, mint a szakmai tudás. A csapat motiválása és a konfliktusok kezelése ezen a készségen alapszik.",
      serbianTranslation: "Za vođe je emocionalna inteligencija isto toliko važna kao i stručno znanje. Motivisanje tima i rešavanje konflikata zasnivaju se na ovoj veštini."
    },
    {
      title: "Okos otthonok technológiája",
      hungarianText: "Az okos eszközök kényelmesebbé és energiahatékonyabbá teszik az életünket. A fűtés, a világítás és a biztonsági rendszerek távolról is vezérelhetőek.",
      serbianTranslation: "Pametni uređaji čine naš život udobnijim i energetski efikasnijim. Grejanje, osvetljenje i bezbednosni sistemi mogu se kontrolisati i na daljinu."
    },
    {
      title: "Műanyagszennyezés elleni küzdelem",
      hungarianText: "Az óceánokban felhalmozódó műanyag hulladék globális katasztrófa. Az egyszer használatos műanyagok betiltása és az újrahasznosítás fokozása elkerülhetetlen.",
      serbianTranslation: "Plastični otpad koji se nagomilava u okeanima je globalna katastrofa. Zabrana plastike za jednokratnu upotrebu i povećanje reciklaže su neizbežni."
    },
    {
      title: "Személyre szabott orvoslás",
      hungarianText: "A genetikai profil alapján történő kezelés a gyógyítás jövője. Ez lehetővé teszi, hogy minden beteg a számára leghatékonyabb terápiát kapja, minimális mellékhatással.",
      serbianTranslation: "Lečenje na osnovu genetskog profila je budućnost lečenja. To omogućava da svaki pacijent dobije najefikasniju terapiju za sebe, uz minimalne nuspojave."
    },
    {
      title: "Migráció és társadalom",
      hungarianText: "A migráció komplex folyamat, amely gazdasági, politikai és humanitárius kérdéseket vet fel. A sikeres integrációhoz mindkét fél részéről nyitottságra és türelemre van szükség.",
      serbianTranslation: "Migracija je kompleksan proces koji postavlja ekonomska, politička i humanitarna pitanja. Za uspešnu integraciju potrebni su otvorenost i strpljenje sa obe strane."
    },
    {
      title: "Robotizáció a gyártásban",
      hungarianText: "A robotok átveszik a monoton és veszélyes feladatokat a gyárakban. Ez növeli a termelékenységet, de megköveteli a munkaerő átképzését az új technológiákhoz.",
      serbianTranslation: "Roboti preuzimaju monotone i opasne zadatke u fabrikama. To povećava produktivnost, ali zahteva prekvalifikaciju radne snage za nove tehnologije."
    },
    {
      title: "Értékrendváltás a modern világban",
      hungarianText: "A fogyasztói társadalom mellett egyre erősebben jelenik meg az igény a lassabb, tudatosabb életre. Az anyagi javak helyett az élmények és a kapcsolatok válnak fontossá.",
      serbianTranslation: "Uz potrošačko društvo sve se jače javlja potreba za sporijim, svesnijim životom. Umesto materijalnih dobara, važni postaju doživljaji i odnosi."
    }
  ],
  5: [
    {
      title: "Filozofija",
      hungarianText: "Az élet értelmének keresése évezredek óta foglalkoztatja a filozófusokat. Vajon van-e szabad akaratunk, vagy minden előre elrendeltetett? Erre a kérdésre nehéz egyértelmű választ adni.",
      serbianTranslation: "Potraga za smislom života vekovima zaokuplja filozofe. Da li imamo slobodnu volju ili je sve unapred određeno? Na ovo pitanje je teško dati jasan odgovor."
    },
    {
      title: "Astronomija",
      hungarianText: "A világegyetem tágulása egyre gyorsul. A fekete lyukak olyan erős gravitációval rendelkeznek, hogy még a fény sem tud kiszabadulni belőlük. Még mindig keveset tudunk a kozmoszról.",
      serbianTranslation: "Širenje svemira se sve više ubrzava. Crne rupe poseduju tako jaku gravitaciju da čak ni svetlost ne može da im pobegne. Još uvek malo znamo o kosmosu."
    },
    {
      title: "Veštačka inteligencija",
      hungarianText: "A mesterséges intelligencia fejlődése etikai kérdéseket is felvet. Képesek lesznek-e a gépek érezni vagy öntudatra ébredni? Fontos szabályozni a technológia használatát.",
      serbianTranslation: "Razvoj veštačke inteligencije pokreće i etička pitanja. Da li će mašine biti sposobne da osećaju ili da postanu svesne? Važno je regulisati upotrebu tehnologije."
    },
    {
      title: "Održivi razvoj",
      hungarianText: "A fenntartható fejlődés célja, hogy kielégítsük a jelen szükségleteit anélkül, hogy veszélyeztetnénk a jövő generációit. Ehhez megújuló energiaforrásokra van szükség.",
      serbianTranslation: "Cilj održivog razvoja je da zadovoljimo potrebe sadašnjosti bez ugrožavanja budućih generacija. Za to su potrebni obnovljivi izvori energije."
    },
    {
      title: "Globalna ekonomija",
      hungarianText: "A tőzsdekrach hatása az egész világon érezhető volt. A nemzetközi kereskedelem összekapcsolja az országokat, így egy válság mindenkit érint. A stabilitás megőrzése közös érdek.",
      serbianTranslation: "Uticaj berzanskog kraha se osetio u celom svetu. Međunarodna trgovina povezuje zemlje, tako da kriza pogađa sve. Očuvanje stabilnosti je zajednički interes."
    },
    {
      title: "Kulturni identitet",
      hungarianText: "A globalizáció korában fontos a nemzeti identitás megőrzése. A nyelv, a zene és a szokások alkotják egy nép kultúráját. Büszkének kell lennünk az örökségünkre.",
      serbianTranslation: "U doba globalizacije važno je očuvanje nacionalnog identiteta. Jezik, muzika i običaji čine kulturu jednog naroda. Treba da budemo ponosni na svoje nasleđe."
    },
    {
      title: "Etika",
      hungarianText: "Az orvosi etikában gyakran merülnek fel nehéz döntések. Például, kinek jusson a korlátozott számú szervdonáció? Az igazságosság és az emberi élet védelme a legfontosabb elvek.",
      serbianTranslation: "U medicinskoj etici se često javljaju teške odluke. Na primer, kome da pripadne ograničen broj doniranih organa? Pravednost i zaštita ljudskog života su najvažniji principi."
    },
    {
      title: "Nauka",
      hungarianText: "A tudományos módszer alapja a megfigyelés és a kísérletezés. Egy elméletet csak akkor fogadunk el, ha bizonyítékok támasztják alá. A tudomány folyamatosan önkorrekciót végez.",
      serbianTranslation: "Osnova naučnog metoda su posmatranje i eksperimentisanje. Jednu teoriju prihvatamo samo ako je dokazi potkrepljuju. Nauka neprestano vrši samokorekciju."
    },
    {
      title: "Diplomatija",
      hungarianText: "A nemzetközi konfliktusok megoldásában a diplomáciának van a legnagyobb szerepe. A tárgyalások során kompromisszumokat kell kötni a béke érdekében. A háború sosem jó megoldás.",
      serbianTranslation: "U rešavanju međunarodnih konflikata diplomatija ima najveću ulogu. Tokom pregovora moraju se praviti kompromisi zarad mira. Rat nikada nije dobro rešenje."
    },
    {
      title: "Sociologija",
      hungarianText: "A társadalmi egyenlőtlenségek növekedése feszültségekhez vezet. A szegénység és a kirekesztés komoly problémák, amelyeket orvosolni kell. A szociológusok ezeket a folyamatokat vizsgálják.",
      serbianTranslation: "Rast društvenih nejednakosti vodi ka tenzijama. Siromaštvo i isključenost su ozbiljni problemi koje treba rešiti. Sociolozi istražuju ove procese."
    },
    {
      title: "Evolucija",
      hungarianText: "Darwin elmélete szerint a fajok a természetes kiválasztódás útján fejlődnek. Azok az egyedek élik túl, amelyek a legjobban alkalmazkodnak a környezethez. Ez egy lassú folyamat.",
      serbianTranslation: "Prema Darvinovoj teoriji, vrste se razvijaju putem prirodne selekcije. One jedinke preživljavaju koje se najbolje prilagođavaju okolini. To je spor proces."
    },
    {
      title: "Kvantna fizika",
      hungarianText: "A kvantumfizika a mikroszkopikus részecskék viselkedését írja le. Ebben a világban a dolgok egyszerre több helyen is lehetnek. Ez ellentmond a józan észnek.",
      serbianTranslation: "Kvantna fizika opisuje ponašanje mikroskopskih čestica. U tom svetu stvari mogu biti na više mesta istovremeno. To prkosi zdravom razumu."
    },
    {
      title: "Lingvistika",
      hungarianText: "A nyelvészet a nyelvek szerkezetét és fejlődését kutatja. Minden nyelvnek sajátos logikája van. Érdekes látni, hogyan hatnak egymásra a különböző nyelvek.",
      serbianTranslation: "Lingvistika istražuje strukturu i razvoj jezika. Svaki jezik ima svoju specifičnu logiku. Zanimljivo je videti kako različiti jezici utiču jedni na druge."
    },
    {
      title: "Genetika",
      hungarianText: "A DNS hordozza az örökítő információt. A génszerkesztés lehetővé teheti bizonyos betegségek gyógyítását, de veszélyeket is rejt. Óvatosan kell bánnunk ezzel a tudással.",
      serbianTranslation: "DNK nosi nasledne informacije. Genetsko modifikovanje može omogućiti lečenje određenih bolesti, ali krije i opasnosti. Moramo pažljivo postupati sa ovim znanjem."
    },
    {
      title: "Psihijatrija",
      hungarianText: "A mentális egészség ugyanolyan fontos, mint a testi. A depresszió és a szorongás sok embert érint. A terápia és a gyógyszerek segíthetnek a gyógyulásban.",
      serbianTranslation: "Mentalno zdravlje je isto toliko važno kao i telesno. Depresija i anksioznost pogađaju mnoge ljude. Terapija i lekovi mogu pomoći u izlečenju."
    },
    {
      title: "Geopolitika",
      hungarianText: "A földrajzi elhelyezkedés befolyásolja egy ország politikai döntéseit. Az erőforrásokért, mint az olaj vagy a víz, gyakran folyik küzdelem. A stratégiai szövetségek kulcsfontosságúak.",
      serbianTranslation: "Geografski položaj utiče na političke odluke jedne zemlje. Za resurse, kao što su nafta ili voda, često se vodi borba. Strateški savezi su od ključnog značaja."
    },
    {
      title: "Metafizika",
      hungarianText: "A metafizika a valóság természetével foglalkozik, ami túlmutat a fizikai világon. Olyan kérdéseket vizsgál, mint a létezés oka és az idő természete. Ez tiszta spekuláció.",
      serbianTranslation: "Metafizika se bavi prirodom stvarnosti koja prevazilazi fizički svet. Istražuje pitanja kao što su uzrok postojanja i priroda vremena. To je čista spekulacija."
    },
    {
      title: "Antropologija",
      hungarianText: "Az antropológusok különböző kultúrákat tanulmányoznak, hogy megértsék az emberi természetet. A rítusok és mítoszok sokat elárulnak egy közösségről. Minden kultúra egyedi értékkel bír.",
      serbianTranslation: "Antropolozi proučavaju različite kulture da bi razumeli ljudsku prirodu. Rituali i mitovi mnogo otkrivaju o jednoj zajednici. Svaka kultura ima jedinstvenu vrednost."
    },
    {
      title: "Kibernetika",
      hungarianText: "A kibernetika a rendszerek irányításával és kommunikációjával foglalkozik. Ez magában foglalja mind az élő szervezeteket, mind a gépeket. Az információáramlás a központi fogalom.",
      serbianTranslation: "Kibernetika se bavi upravljanjem i komunikacijom sistema. To uključuje i žive organizme i mašine. Protok informacija je centralni pojam."
    },
    {
      title: "Nanotehnologija",
      hungarianText: "A nanotechnológia az anyagok atomi szintű manipulálását jelenti. Ez forradalmasíthatja az orvostudományt és az anyagtudományt. A jövőben mikroszkopikus robotok gyógyíthatnak minket.",
      serbianTranslation: "Nanotehnologija znači manipulaciju materijalima na atomskom nivou. To može revolucionisati medicinu i nauku o materijalima. U budućnosti bi nas mogli lečiti mikroskopski roboti."
    }
  ]
};