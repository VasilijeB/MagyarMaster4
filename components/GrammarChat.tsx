import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getGrammarResponse } from '../services/geminiService';

interface GrammarChatProps {
  onGoBack: () => void;
}

export const GrammarChat: React.FC<GrammarChatProps> = ({ onGoBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Szia! Ja ti mogu pomoći oko mađarske gramatike. Šta te danas zanima? (Npr. kada koristiti -ban/-ben, ili određeni član?)' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await getGrammarResponse(messages, userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Izvinite, došlo je do greške. Pokušajte ponovo.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-100px)] flex flex-col pt-6 pb-2">
      <div className="px-4 mb-2">
         <button 
            onClick={onGoBack}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors font-medium"
         >
            ← Nazad na početnu
         </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start">
             <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-none">
               <div className="flex gap-2">
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
               </div>
             </div>
           </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-slate-50 mt-2">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pitajte o gramatici..."
            className="w-full p-4 pr-16 rounded-xl border border-slate-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );
};