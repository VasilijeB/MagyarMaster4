import { GoogleGenAI, Type, Modality } from "@google/genai";
import { FlashCard, WordCategory, DifficultyLevel, ConjugationTask, ChatMessage, StoryTask } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getLevelInstruction = (level: DifficultyLevel): string => {
  switch (level) {
    case 1: return "Difficulty Level: Absolute Beginner (CEFR A1). Use very high-frequency, essential words.";
    case 2: return "Difficulty Level: Beginner to Elementary (CEFR A1-A2). Use common everyday words.";
    case 3: return "Difficulty Level: Elementary (CEFR A2). Use routine words for family, shopping, local geography, employment.";
    case 4: return "Difficulty Level: Intermediate (CEFR B1). Use standard language on familiar matters regularly encountered in work, school, leisure.";
    case 5: return "Difficulty Level: Upper Intermediate (CEFR B2). Use slightly more complex, concrete or abstract topics, but DO NOT exceed B2 complexity.";
    default: return "Difficulty Level: Beginner (A1).";
  }
};

// --- VOCABULARY ---

export const generateFlashcards = async (category: WordCategory, level: DifficultyLevel): Promise<FlashCard[]> => {
  const levelPrompt = getLevelInstruction(level);
  const prompt = `Generate exactly 10 distinct Hungarian ${category.toLowerCase()}.
  ${levelPrompt}
  IMPORTANT instructions:
  - Select words randomly from this difficulty tier.
  - Return a strict JSON array. 
  - "serbian": word in Serbian.
  - "hungarian": primary Hungarian translation.
  - "alternatives": array of valid synonyms (in Hungarian).
  - For VERBS: Provide the INFINITIVE form (e.g., "futni", "enni", "olvasni") NOT the 3rd person singular.
  Ensure proper accented characters.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            serbian: { type: Type.STRING },
            hungarian: { type: Type.STRING },
            alternatives: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["serbian", "hungarian", "alternatives"]
        }
      }
    }
  });

  const rawData = JSON.parse(response.text || '[]') as { serbian: string; hungarian: string; alternatives: string[] }[];
  
  return rawData.map((item, index) => {
    const primary = item.hungarian.toLowerCase();
    const alts = item.alternatives ? item.alternatives.map(a => a.toLowerCase()) : [];
    
    return {
      id: `card-${index}-${Date.now()}`,
      serbian: item.serbian,
      hungarian: primary,
      hungarianAlt: alts
    };
  });
};

export const generateCustomFlashcards = async (userInput: string): Promise<FlashCard[]> => {
  const prompt = `The user has provided the following text (words or phrases) in Serbian or Hungarian: "${userInput}".
  Extract meaningful words, find their translation (if Serbian provided, give Hungarian; if Hungarian, give Serbian), and create a flashcard set.
  Return JSON array with serbian, hungarian, alternatives.
  For verbs, use Infinitive form.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            serbian: { type: Type.STRING },
            hungarian: { type: Type.STRING },
            alternatives: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["serbian", "hungarian", "alternatives"]
        }
      }
    }
  });

  const rawData = JSON.parse(response.text || '[]') as { serbian: string; hungarian: string; alternatives: string[] }[];
  return rawData.map((item, index) => {
    const primary = item.hungarian.toLowerCase();
    const alts = item.alternatives ? item.alternatives.map(a => a.toLowerCase()) : [];
    return {
      id: `custom-${index}-${Date.now()}`,
      serbian: item.serbian,
      hungarian: primary,
      hungarianAlt: alts
    };
  });
};

// --- CONJUGATION ---

export const generateConjugationTask = async (level: DifficultyLevel): Promise<ConjugationTask> => {
  const levelPrompt = getLevelInstruction(level);
  const prompt = `Generate ONE random Hungarian verb.
  ${levelPrompt}
  Provide the Present Indefinite (Jelen idő, alanyi ragozás) conjugation for all persons.
  Return strict JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verbInfinite: { type: Type.STRING, description: "Infinitive form" },
          translation: { type: Type.STRING, description: "Serbian translation" },
          forms: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              te: { type: Type.STRING },
              o: { type: Type.STRING },
              mi: { type: Type.STRING },
              ti: { type: Type.STRING },
              ok: { type: Type.STRING }
            },
            required: ["en", "te", "o", "mi", "ti", "ok"]
          }
        },
        required: ["verbInfinite", "translation", "forms"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as ConjugationTask;
};

// --- STORIES ---

const STORY_THEMES = [
  "an unexpected journey",
  "a day at the local market",
  "a family celebration dinner",
  "a funny misunderstanding",
  "finding a lost item",
  "meeting a new friend in the park",
  "a cooking experiment gone wrong",
  "a sudden change in weather",
  "a school project about history",
  "a weekend trip to the lake",
  "a mystery in the old library",
  "a futuristic invention",
  "exploring a forest",
  "busy city life",
  "learning a new hobby or sport",
  "a surprise gift",
  "a conversation with a neighbor"
];

export const generateStoryTask = async (level: DifficultyLevel): Promise<StoryTask> => {
  const levelPrompt = getLevelInstruction(level);
  const theme = STORY_THEMES[Math.floor(Math.random() * STORY_THEMES.length)];
  
  const prompt = `Generate a unique short story in Hungarian (approx 30-50 words) suitable for a student at this level: ${levelPrompt}.
  
  THEME: ${theme}.
  
  The story should be simple but engaging and distinct from typical generic stories.
  Also provide a correct Serbian translation.
  Return strict JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          hungarianText: { type: Type.STRING },
          serbianTranslation: { type: Type.STRING }
        },
        required: ["title", "hungarianText", "serbianTranslation"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as StoryTask;
};

export const evaluateStoryTranslation = async (hungarianText: string, userTranslation: string): Promise<string> => {
  const prompt = `
  Original Hungarian text: "${hungarianText}"
  Student's Serbian translation: "${userTranslation}"
  
  Evaluate the student's translation. 
  1. Give a score out of 10.
  2. Explain any major errors or correct specific phrases.
  3. Respond in Serbian.
  Keep it concise.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });

  return response.text || "Greška pri evaluaciji.";
};

// --- GRAMMAR CHAT ---

export const getGrammarResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are an expert Hungarian language teacher explaining grammar to a Serbian speaker. 
      Your explanations must be EXTREMELY CLEAR and VISUALLY STRUCTURED.
      
      RULES FOR FORMATTING:
      1. Use SHORT PARAGRAPHS. Don't write walls of text.
      2. Separate different ideas or rules with EMPTY LINES.
      3. Use dashes (-) or numbering (1.) for lists.
      4. DO NOT use markdown characters like '#' or '*'. Do not use bold (**) or italics (*) syntax.
      5. Provide SIMPLE EXAMPLES with Serbian translations for every concept.
      6. Avoid complex linguistic jargon. Keep it simple.
      7. Be encouraging.`
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }))
  });

  const result = await chat.sendMessage({ message: newMessage });
  let cleanText = result.text || "";
  
  // Post-processing: remove any stray markdown characters if the model ignores instructions
  cleanText = cleanText.replace(/[*#]/g, '');

  return cleanText;
};


// --- AUDIO UTILS ---

const base64ToBytes = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const pcmToAudioBuffer = (pcmData: Uint8Array, audioContext: AudioContext): AudioBuffer => {
  const sampleRate = 24000;
  const numChannels = 1;
  const int16Data = new Int16Array(pcmData.buffer, pcmData.byteOffset, pcmData.length / 2);
  const buffer = audioContext.createBuffer(numChannels, int16Data.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < int16Data.length; i++) {
    channelData[i] = int16Data[i] / 32768.0;
  }
  return buffer;
};

// Singleton AudioContext to avoid hitting browser limits
let sharedAudioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!sharedAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    sharedAudioContext = new AudioContextClass();
  }
  return sharedAudioContext;
};

// Helper to phoneticize Hungarian for English-biased TTS
const optimizeForHungarianTTS = (text: string): string => {
  let processed = text;

  // 1. Protect Digraphs with Placeholders
  
  // 'sz' -> 's' (English 'see')
  // We replace it with a placeholder first so the 's' -> 'sh' rule doesn't mess it up later.
  processed = processed.replace(/sz/gi, '$$SZ$$');
  
  // 'zs' -> 'zh' (English 'measure')
  processed = processed.replace(/zs/gi, 'zh');
  
  // 'cs' -> 'ch' (English 'church')
  processed = processed.replace(/cs/gi, 'ch');
  
  // 'gy' -> 'dy' (English 'due')
  processed = processed.replace(/gy/gi, 'dy');
  
  // 'ly' -> 'y' (English 'yes')
  processed = processed.replace(/ly/gi, 'y');
  
  // 'ny' -> 'ny' (English 'canyon')
  processed = processed.replace(/ny/gi, 'ny');

  // 2. Vowels (Hungarian to English approximations)
  // 'a' -> 'o' (English 'hot')
  processed = processed.replace(/a/g, 'o'); 
  processed = processed.replace(/A/g, 'O');
  
  // 'á' -> 'aa' (English 'father')
  processed = processed.replace(/á/g, 'aa');
  processed = processed.replace(/Á/g, 'AA');

  // 'é' -> 'ay' (English 'say')
  processed = processed.replace(/é/g, 'ay');
  processed = processed.replace(/É/g, 'AY');

  // 3. Single Consonants
  
  // 's' -> 'sh' (Hungarian 's' is always /ʃ/ like 'ship')
  processed = processed.replace(/s/gi, 'sh');
  
  // 'c' -> 'ts' (Hungarian 'c' is /ts/ like 'cats')
  processed = processed.replace(/c/gi, 'ts');
  
  // 'j' -> 'y' (English 'yes')
  processed = processed.replace(/j/gi, 'y');

  // 4. Restore 'sz' as 's'
  processed = processed.replace(/\$\$SZ\$\$/gi, 's');
  
  return processed;
};

export const playPronunciation = async (text: string) => {
  // Apply phonetic optimization to fix accents (e.g. s -> sh, sz -> s)
  const phoneticText = optimizeForHungarianTTS(text);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: phoneticText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioContext = getAudioContext();
      
      // Ensure context is running (browsers suspend it if no interaction)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const pcmBytes = base64ToBytes(base64Audio);
      const audioBuffer = pcmToAudioBuffer(pcmBytes, audioContext);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    }
  } catch (error) {
    console.error("Error generating speech:", error);
  }
};

export const evaluatePronunciation = async (hungarianText: string, base64Audio: string): Promise<string> => {
  const prompt = `
  Analyze the pronunciation of the following Hungarian text: "${hungarianText}".
  The audio provided is from a Serbian speaker learning Hungarian.
  
  Provide feedback in Serbian:
  1. Is the pronunciation correct?
  2. What are the specific mistakes?
  3. Give a score from 1-10.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'audio/webm',
              data: base64Audio
            }
          },
          { text: prompt }
        ]
      }
    });

    return response.text || "Nije uspela analiza.";
  } catch (error) {
    console.error("Error evaluating pronunciation:", error);
    return "Greška pri analizi izgovora.";
  }
};