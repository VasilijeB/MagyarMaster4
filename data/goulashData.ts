import { DifficultyLevel } from '../types';

export interface GoulashStepData {
  id: number;
  level: DifficultyLevel;
  title: string;
  narrativeSerbian: string;
  instructionText: string;
  conversationHungarian: string;
  conversationSerbian: string;
  introImagePrompt: string;
  storyImagePrompt: string;
  // Use these fields to provide your own image paths
  localIntroImage?: string; 
  localStoryImage?: string;
}

// Using Image 7 (Dressing up) as the main splash screen
export const ADVENTURE_BG_IMAGE = "img7.png"; 

export const ADVENTURE_INTRO_SERBIAN = "U maloj, osunčanoj kući na ivici sela, Janoš se probudio sa jednom veoma važnom mišlju. 'Danas je,' šapnuo je svojoj pospanoj mački, 'dan za gulaš.' Navukao je svoj omiljeni prsluk i krenuo u potragu za savršenim sastojcima.";

export const GOULASH_SAGA: GoulashStepData[] = [
  {
    id: 0,
    level: 1,
    title: "Početak puta (Az út kezdete)",
    narrativeSerbian: "Janoš se sprema i kreće u selo.",
    instructionText: "Pomozite Janošu da se pripremi za put tako što ćete savladati prvih 10 reči.",
    conversationHungarian: "„Szép napunk van a sétához, ugye?”",
    conversationSerbian: "„Prelep je dan za šetnju, zar ne?”",
    introImagePrompt: "A man getting dressed in a cozy bedroom with an orange cat on the bed, folk art style.",
    storyImagePrompt: "A man walking down a stone path in a green field, folk art style.",
    localIntroImage: "img7.png", 
    localStoryImage: "img8.png"
  },
  {
    id: 1,
    level: 2,
    title: "Na pijaci (A piacon)",
    narrativeSerbian: "Janoš je stigao na pijacu u potrazi za povrćem.",
    instructionText: "Pomozite Janošu da izabere najlepše paprike i luk rešavanjem ovih 10 reči.",
    conversationHungarian: "„Friss a hagyma és a paprika is, János bácsi!”",
    conversationSerbian: "„Svež je i luk i paprika, čika Janoše!”",
    introImagePrompt: "A man buying red peppers at a market stall, folk art style.",
    storyImagePrompt: "A market lady handing a bag of onions to an old man, folk art style.",
    localIntroImage: "img1.png", 
    localStoryImage: "img2.png"
  },
  {
    id: 2,
    level: 3,
    title: "Kod mesara (A hentesnél)",
    narrativeSerbian: "Sledeća stanica je mesara za najfiniju junetinu.",
    instructionText: "Pomozite Janošu da izabere najbolje meso i vrati se kući kroz ovih 10 reči.",
    conversationHungarian: "„Ez a hús tökéletes lesz a gulyáshoz, ígérem!”",
    conversationSerbian: "„Ovo meso će biti savršeno za gulaš, obećavam!”",
    introImagePrompt: "A man talking to a strong butcher in a shop, folk art style.",
    storyImagePrompt: "A man entering his garden gate with a full basket, folk art style.",
    localIntroImage: "img3.png",
    localStoryImage: "img4.png"
  },
  {
    id: 3,
    level: 4,
    title: "U kuhinji (A konyhában)",
    narrativeSerbian: "Vreme je da se gulaš konačno skuva i proba.",
    instructionText: "Pomozite Janošu da završi kuvanje i postavi sto uz poslednjih 10 reči.",
    conversationHungarian: "„Végre kész a gulyás! Nagyon finom lett.”",
    conversationSerbian: "„Konačno je gulaš gotov! Ispao je veoma ukusan.”",
    introImagePrompt: "A man chopping onions in a kitchen with a red pot on the stove, folk art style.",
    storyImagePrompt: "A man eating a bowl of soup at a table with an orange cat, folk art style.",
    localIntroImage: "img5.png",
    localStoryImage: "img6.png"
  }
];