import { motion } from 'motion/react';
import { ShieldCheck, Award, Flag, Map } from 'lucide-react';

const visitedCountries = [
  { code: 'JP', name: 'Japan', status: 'COMPLETED', xp: 500 },
  { code: 'FR', name: 'France', status: 'COMPLETED', xp: 300 },
  { code: 'IT', name: 'Italy', status: 'PLANNING', xp: 0 },
  { code: 'US', name: 'USA', status: 'COMPLETED', xp: 450 },
  { code: 'IS', name: 'Iceland', status: 'COMPLETED', xp: 600 },
  { code: 'NO', name: 'Norway', status: 'WISHLIST', xp: 0 },
];

export default function PassportGrid() {
  return (
    <div className="p-12 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-black/5 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h3 className="text-4xl font-serif mb-2 text-text-primary italic">Global Passport</h3>
          <p className="text-[10px] text-text-tertiary font-bold tracking-[0.3em] uppercase">5 / 195 COUNTRIES COLLECTED</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-accent-clay/10 rounded-full border border-accent-clay/20 self-start">
          <Award className="w-5 h-5 text-accent-clay" />
          <span className="text-xs font-bold text-accent-clay tracking-widest uppercase">LEGENDARY EXPLORER</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visitedCountries.map((country, idx) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
              country.status === 'COMPLETED' 
                ? 'bg-white border-black/5 shadow-[0_15px_40px_rgba(0,0,0,0.04)]' 
                : 'bg-surface-sunken border-black/[0.02] grayscale opacity-40'
            }`}
          >
            {/* Soft organic blur blob */}
            {country.status === 'COMPLETED' && (
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-rose/5 rounded-full blur-3xl" />
            )}

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-surface-sunken flex items-center justify-center text-3xl shadow-inner-lg">
                {getFlagEmoji(country.code)}
              </div>
              {country.status === 'COMPLETED' && (
                <div className="w-8 h-8 rounded-full bg-accent-sage/10 flex items-center justify-center border border-accent-sage/20">
                  <ShieldCheck className="w-4 h-4 text-accent-sage" />
                </div>
              )}
            </div>
            
            <h4 className="text-xl font-serif mb-4 text-text-primary tracking-tight leading-none">{country.name}</h4>
            <div className="flex items-center justify-between relative z-10 pt-4 border-t border-black/[0.03]">
              <span className="text-[9px] font-bold tracking-widest uppercase text-text-tertiary">
                {country.status}
              </span>
              {country.xp > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-accent-clay" />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-accent-clay">
                    +{country.xp} XP
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        <button className="flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-black/5 hover:border-accent-clay/30 hover:bg-accent-clay/5 transition-all duration-700 group min-h-[220px]">
          <div className="w-16 h-16 rounded-full bg-surface-sunken flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all">
            <Map className="w-8 h-8 text-text-tertiary group-hover:text-accent-clay transition-colors" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-tertiary group-hover:text-accent-clay">Unlock New Expedition</span>
        </button>
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
