import React, { useState } from 'react';
import { Sparkles, Send, X } from 'lucide-react';
import { getGeminiFoodSuggestion } from '../api/geminiService';
import { DISHES } from '../../../config/constants';

interface GeminiChefProps {
  onClose: () => void;
}

const GeminiChef: React.FC<GeminiChefProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const dishNames = DISHES.map(d => d.name);
    const suggestion = await getGeminiFoodSuggestion(input, dishNames);
    setResponse(suggestion);
    setLoading(false);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md h-[80%] sm:h-auto sm:rounded-2xl rounded-t-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="animate-pulse" />
            <h2 className="font-bold text-lg">Assistant Chef IA</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {!response ? (
            <div className="text-center mt-10 text-gray-500">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <p className="font-medium text-gray-800 mb-2">Vous ne savez pas quoi manger ?</p>
              <p className="text-sm">Dites-moi ce dont vous avez envie (ex: "J'ai envie de piquant" ou "J'ai besoin de réconfort").</p>
            </div>
          ) : (
             <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 text-white font-bold">IA</div>
               <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-700">
                 {response}
               </div>
             </div>
          )}

          {loading && (
             <div className="flex gap-3 mt-4 animate-pulse">
               <div className="w-8 h-8 rounded-full bg-orange-200" />
               <div className="h-10 bg-gray-200 rounded-2xl w-3/4" />
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: J'ai faim et je suis joyeux..."
              className="w-full bg-gray-100 text-gray-900 placeholder:text-gray-400 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button 
              onClick={handleAsk}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChef;