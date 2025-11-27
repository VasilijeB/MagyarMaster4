import React, { useState, useRef } from 'react';
import { generateFlashcards, playPronunciation, evaluatePronunciation } from '../services/geminiService';
import { WordCategory } from '../types';

export const PronunciationGame: React.FC = () => {
  const [word, setWord] = useState<{serbian: string, hungarian: string} | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const loadNewWord = async () => {
    setLoading(true);
    setFeedback(null);
    setWord(null);
    try {
      // Re-use flashcard generator to get a single word (we just take the first one)
      const cards = await generateFlashcards(WordCategory.NOUNS, 2); // Level 2 for basic words
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      setWord({ serbian: randomCard.serbian, hungarian: randomCard.hungarian });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Molimo omogućite pristup mikrofonu.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        
        // Stop all tracks
        mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
      };
    }
  };

  const processAudio = async (blob: Blob) => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64data = (reader.result as string).split(',')[1];
      if (word) {
        try {
          const result = await evaluatePronunciation(word.hungarian, base64data);
          setFeedback(result);
        } catch (e) {
          setFeedback("Greška pri analizi audio zapisa.");
        }
        setLoading(false);
      }
    };
  };

  if (!word && !loading) return (
    <div className="max-w-2xl mx-auto px-6 py-12 text-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Vežbanje Izgovora</h2>
      <button 
        onClick={loadNewWord}
        className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg"
      >
        Započni Vežbanje
      </button>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-6 py-12 text-center animate-fade-in">
      {loading && !word ? (
        <div className="flex justify-center"><div className="w-10 h-10 border-4 border-emerald-500 rounded-full animate-spin border-t-transparent"></div></div>
      ) : (
        <>
           <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 mb-8">
              <h3 className="text-slate-400 font-bold text-sm uppercase mb-4">Pročitajte naglas</h3>
              <p className="text-5xl font-bold text-slate-800 mb-2">{word?.hungarian}</p>
              <p className="text-slate-500 text-lg mb-6">{word?.serbian}</p>
              
              <button 
                onClick={() => word && playPronunciation(word.hungarian)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 mx-auto transition-colors"
              >
                🔊 Poslušaj primer
              </button>
           </div>

           <div className="mb-8">
             <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                disabled={loading}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl mx-auto select-none
                  ${isRecording 
                    ? 'bg-rose-600 scale-110 ring-4 ring-rose-200' 
                    : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105'
                  }
                  ${loading ? 'opacity-50 cursor-wait' : ''}
                `}
             >
                <span className="text-4xl">{isRecording ? '⬛' : '🎙️'}</span>
             </button>
             <p className="mt-4 text-slate-500 font-medium">
               {isRecording ? "Slušam..." : (loading ? "Analiziram..." : "Držite dugme dok govorite")}
             </p>
           </div>

           {feedback && (
             <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl text-left animate-scale-in">
               <h4 className="font-bold text-blue-900 mb-2">Povratna informacija:</h4>
               <p className="text-blue-800 whitespace-pre-wrap">{feedback}</p>
               <button 
                 onClick={loadNewWord}
                 className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
               >
                 Sledeća reč →
               </button>
             </div>
           )}
        </>
      )}
    </div>
  );
};
