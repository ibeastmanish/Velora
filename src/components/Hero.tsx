import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, Mic } from 'lucide-react';

import SocialPresence from './SocialPresence';

interface HeroProps {
  onPlan: (prompt: string) => void;
  isLoading: boolean;
}

export default function Hero({ onPlan, isLoading }: HeroProps) {
  const [isListening, setIsListening] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onPlan(prompt);
    }
  };

  const suggestions = [
    { label: '2 weeks in Japan with family', color: 'bg-accent-rose' },
    { label: 'Backpacking across Europe', color: 'bg-accent-sage' },
    { label: 'Honeymoon in Bali', color: 'bg-accent-gold' }
  ];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      <SocialPresence />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 max-w-3xl"
      >
        <h1 className="text-7xl md:text-9xl mb-8 font-serif leading-tight text-text-primary">
          Travel the world.<br />
          <span className="text-accent-clay font-sans italic font-light tracking-tight">Your way.</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl font-medium opacity-80 max-w-xl mx-auto leading-relaxed">
          Velora architects curated expeditions across 195 countries. 
          Bespoke stays, hidden gems, and seamless logistics.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-2xl relative z-20"
      >
        <form onSubmit={handleSubmit} className="relative group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Where does your curiosity lead you?"
            className="w-full bg-white/60 backdrop-blur-2xl border border-black/5 rounded-[2rem] py-8 px-10 pr-32 text-xl focus:outline-none focus:ring-16 focus:ring-accent-clay/5 transition-all outline-none text-text-primary placeholder:text-text-tertiary shadow-2xl shadow-black/5"
          />
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-accent-rose text-white shadow-lg shadow-accent-rose/30' : 'text-text-tertiary hover:bg-black/5'}`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-14 h-14 bg-accent-clay text-white rounded-full flex items-center justify-center hover:shadow-xl hover:shadow-accent-clay/20 transition-all disabled:opacity-50 group-hover:scale-105 active:scale-95"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6 stroke-[2.5px]" />}
            </button>
          </div>
        </form>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.label}
              onClick={() => setPrompt(suggestion.label)}
              className="group relative flex items-center gap-2"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={`px-6 py-2.5 rounded-full border border-black/5 ${suggestion.color}/10 text-text-secondary text-sm font-medium hover:text-text-primary transition-all backdrop-blur-md`}
              >
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${suggestion.color} opacity-60`} />
                <span className="pl-2">{suggestion.label}</span>
              </motion.div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-text-tertiary"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Drift to explore</span>
        <div className="w-px h-16 bg-gradient-to-b from-text-tertiary to-transparent" />
      </motion.div>
    </div>
  );
}
