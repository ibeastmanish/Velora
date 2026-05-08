import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, DollarSign, Heart, Utensils, Mountain } from 'lucide-react';

interface DNAOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const speedOptions: DNAOption[] = [
  { id: 'relaxed', label: 'Relaxed', icon: <Heart className="w-4 h-4" /> },
  { id: 'balanced', label: 'Balanced', icon: <Zap className="w-4 h-4" /> },
  { id: 'packed', label: 'Packed', icon: <Mountain className="w-4 h-4" /> },
];

const interestOptions: DNAOption[] = [
  { id: 'food', label: 'Culinary', icon: <Utensils className="w-4 h-4" /> },
  { id: 'nature', label: 'Nature', icon: <Mountain className="w-4 h-4" /> },
  { id: 'culture', label: 'Culture', icon: <Sparkles className="w-4 h-4" /> },
];

export default function TravelerDNA({ onSave }: { onSave: (dna: any) => void }) {
  const [dna, setDna] = useState({
    speed: 'balanced',
    interests: [] as string[],
    budget: 'mid',
  });

  const toggleInterest = (id: string) => {
    setDna(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  return (
    <div className="p-10 bg-white/90 backdrop-blur-3xl rounded-[2.5rem] border border-black/5 shadow-2xl relative overflow-hidden">
      {/* Background soft blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-sage/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="mb-10 relative z-10">
        <h3 className="text-3xl font-serif mb-2 text-text-primary italic">Traveler DNA</h3>
        <p className="text-sm text-text-secondary font-medium">Personalize how Velora architects your experiences.</p>
      </div>

      <div className="space-y-10 relative z-10">
        <div>
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-tertiary mb-5 block">Journey Pace</label>
          <div className="flex gap-3">
            {speedOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setDna({ ...dna, speed: opt.id })}
                className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-500 ${
                  dna.speed === opt.id 
                    ? 'bg-accent-clay/10 border-accent-clay/30 text-accent-clay shadow-sm' 
                    : 'bg-surface-sunken border-black/[0.03] text-text-tertiary hover:border-black/10'
                }`}
              >
                <div className={`p-2 rounded-full ${dna.speed === opt.id ? 'bg-accent-clay/20' : 'bg-white'}`}>
                   {opt.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-tertiary mb-5 block">Primary Interests</label>
          <div className="grid grid-cols-3 gap-3">
            {interestOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => toggleInterest(opt.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-500 ${
                  dna.interests.includes(opt.id)
                    ? 'bg-accent-sage/10 border-accent-sage/30 text-accent-sage shadow-sm' 
                    : 'bg-surface-sunken border-black/[0.03] text-text-tertiary hover:border-black/10'
                }`}
              >
                <div className={`p-2 rounded-full ${dna.interests.includes(opt.id) ? 'bg-accent-sage/20' : 'bg-white'}`}>
                  {opt.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-tertiary mb-5 block">Budget Profile</label>
          <div className="flex p-1.5 bg-surface-sunken border border-black/5 rounded-2xl">
            {['low', 'mid', 'luxury'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setDna({ ...dna, budget: lvl })}
                className={`flex-1 py-3 rounded-[0.8rem] text-[10px] font-bold tracking-[0.2em] transition-all duration-500 uppercase ${
                  dna.budget === lvl ? 'bg-white text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-secondary'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => onSave(dna)}
          className="w-full py-5 bg-accent-clay text-white rounded-2xl font-bold uppercase tracking-[0.3em] shadow-xl shadow-accent-clay/20 hover:scale-[1.02] active:scale-95 transition-all mt-6 text-xs"
        >
          Define Identity
        </button>
      </div>
    </div>
  );
}
