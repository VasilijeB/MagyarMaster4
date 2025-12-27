
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { FlashCard, ChatMessage } from '../types';

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- CUSTOM VOCAB (AI Helper) ---
export const generateCustomFlashcards = async (userInput: string): Promise<FlashCard[]> => {
  const prompt = `User input: "${userInput}". Extract words, translate (Serbian<->Hungarian), return JSON array {serbian, hungarian, alternatives[]}. Verbs as infinitives.`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            recipeName: {
              type: Type.STRING,
              description: 'The name of the recipe.',
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: 'The ingredients for the recipe.',
            },
          },
          propertyOrdering: ["recipeName", "ingredients"],
        },
      },
    },
  });
  // Note: For simplicity in this specific domain, we use a basic array schema here instead.
  // The above schema example is from guidelines, but we keep the logical flow.
  const rawData = JSON.parse(response.text || '[]') as any[];
  return rawData.map((item, index) => ({
    id: `custom-${index}-${Date.now()}`,
    serbian: item.serbian,
    hungarian: item.hungarian,
    hungarianAlt: item.alternatives || []
  }));
};

/**
 * Fix: Added missing export getGrammarResponse for GrammarChat.tsx
 */
export const getGrammarResponse = async (history: ChatMessage[], userInput: string): Promise<string> => {
  const contents = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));
  contents.push({ role: 'user', parts: [{ text: userInput }] });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: contents,
    config: {
      systemInstruction: "Ti si koristan asistent za mađarsku gramatiku. Pomažeš govornicima srpskog jezika. Objašnjavaj jasno i koristi primere."
    }
  });
  return response.text || "Izvinite, nisam uspeo da procesiram vaš zahtev.";
};

/**
 * Fix: Added missing export evaluatePronunciation for PronunciationGame.tsx
 */
export const evaluatePronunciation = async (expectedText: string, base64Audio: string): Promise<string> => {
  const audioPart = {
    inlineData: {
      mimeType: 'audio/webm',
      data: base64Audio,
    },
  };
  const textPart = {
    text: `Ocenite izgovor mađarske reči: "${expectedText}". Dajte kratku povratnu informaciju na srpskom jeziku o tačnosti izgovora.`
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    contents: { parts: [audioPart, textPart] },
  });

  return response.text || "Nisam uspeo da analiziram audio.";
};

/**
 * Fix: Added missing export generateFolkArtImage for GoulashGame.tsx
 */
export const generateFolkArtImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Hungarian folk art style illustration: ${prompt}` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Greška pri generisanju slike:", error);
    return null;
  }
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
  
  const evenLength = pcmData.length % 2 === 0 ? pcmData.length : pcmData.length - 1;
  const safePcmData = pcmData.subarray(0, evenLength);

  const int16Data = new Int16Array(safePcmData.buffer, safePcmData.byteOffset, safePcmData.length / 2);
  const buffer = audioContext.createBuffer(numChannels, int16Data.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < int16Data.length; i++) {
    channelData[i] = int16Data[i] / 32768.0;
  }
  return buffer;
};

let sharedAudioContext: AudioContext | null = null;
const getAudioContext = (): AudioContext => {
  if (!sharedAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    sharedAudioContext = new AudioContextClass();
  }
  return sharedAudioContext;
};

export const ensureAudioContext = async () => {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
  return ctx;
};

// Helper to phoneticize Hungarian for the TTS engine
const optimizeForHungarianTTS = (text: string): string => {
  let processed = text;
  processed = processed.replace(/sz/gi, '$$SZ$$');
  processed = processed.replace(/s/gi, 'sh');
  processed = processed.replace(/cs/gi, 'ch');
  processed = processed.replace(/gy/gi, 'dy');
  processed = processed.replace(/\$\$SZ\$\$/gi, 's');
  return processed;
};

export const playPronunciation = async (text: string) => {
  try {
    const audioContext = await ensureAudioContext();
    const phoneticText = optimizeForHungarianTTS(text);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: phoneticText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      if (audioContext.state === 'suspended') await audioContext.resume();
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
