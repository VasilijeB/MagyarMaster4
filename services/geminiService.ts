import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ChatMessage, FlashCard } from '../types';

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- GRAMMAR CHAT (AI Enabled) ---
export const getGrammarResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are an expert Hungarian language teacher explaining grammar to a Serbian speaker. 
      Your explanations must be EXTREMELY CLEAR and VISUALLY STRUCTURED.
      
      RULES FOR FORMATTING:
      1. Use SHORT PARAGRAPHS (whitespace-pre-wrap is enabled).
      2. Separate different ideas with EMPTY LINES.
      3. Use dashes (-) or numbering (1.) for lists.
      4. DO NOT use markdown headers (#) or bold (**). Just plain text formatting.
      5. Provide SIMPLE EXAMPLES with Serbian translations.
      6. Be encouraging.`
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }))
  });

  const result = await chat.sendMessage({ message: newMessage });
  let cleanText = result.text || "";
  cleanText = cleanText.replace(/[*#]/g, '');
  return cleanText;
};

// --- CUSTOM VOCAB (AI Helper) ---
// Kept because parsing user raw input requires NLP
export const generateCustomFlashcards = async (userInput: string): Promise<FlashCard[]> => {
  const prompt = `User input: "${userInput}". Extract words, translate (Serbian<->Hungarian), return JSON array {serbian, hungarian, alternatives[]}. Verbs as infinitives.`;
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
  const rawData = JSON.parse(response.text || '[]') as any[];
  return rawData.map((item, index) => ({
    id: `custom-${index}-${Date.now()}`,
    serbian: item.serbian,
    hungarian: item.hungarian,
    hungarianAlt: item.alternatives || []
  }));
};

// --- AUDIO UTILS (AI Helper) ---
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

let sharedAudioContext: AudioContext | null = null;
const getAudioContext = (): AudioContext => {
  if (!sharedAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    sharedAudioContext = new AudioContextClass();
  }
  return sharedAudioContext;
};

const optimizeForHungarianTTS = (text: string): string => {
  let processed = text;
  // Phonetic optimization
  processed = processed.replace(/sz/gi, '$$SZ$$');
  processed = processed.replace(/zs/gi, 'zh');
  processed = processed.replace(/cs/gi, 'ch');
  processed = processed.replace(/gy/gi, 'dy');
  processed = processed.replace(/ly/gi, 'y');
  processed = processed.replace(/ny/gi, 'ny');
  processed = processed.replace(/a/g, 'o'); 
  processed = processed.replace(/A/g, 'O');
  processed = processed.replace(/á/g, 'aa');
  processed = processed.replace(/Á/g, 'AA');
  processed = processed.replace(/é/g, 'ay');
  processed = processed.replace(/É/g, 'AY');
  processed = processed.replace(/s/gi, 'sh');
  processed = processed.replace(/c/gi, 'ts');
  processed = processed.replace(/j/gi, 'y');
  processed = processed.replace(/\$\$SZ\$\$/gi, 's');
  return processed;
};

export const playPronunciation = async (text: string) => {
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

export const evaluatePronunciation = async (targetText: string, audioBase64: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: audioBase64,
              mimeType: "audio/webm",
            },
          },
          {
            text: `Evaluiraj moj izgovor mađarske reči: "${targetText}". Odgovori na srpskom jeziku kratko i jasno.`,
          },
        ],
      },
    });
    return response.text || "Nije uspela procena.";
  } catch (error) {
    console.error("Pronunciation evaluation error:", error);
    return "Došlo je do greške prilikom analize izgovora.";
  }
};