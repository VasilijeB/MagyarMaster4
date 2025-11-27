
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Magyar<span className="text-emerald-600">Master</span>
          </h1>
          <p className="text-slate-500">Dobrodošli! Kako se zovete?</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vaše ime"
            className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white text-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none text-lg text-center font-medium transition-all"
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Započni Učenje
          </button>
        </form>
      </div>
    </div>
  );
};
