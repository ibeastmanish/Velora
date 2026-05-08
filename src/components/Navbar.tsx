import React from 'react';
import { motion } from 'motion/react';
import { Globe, Map as MapIcon, Compass, User, Award } from 'lucide-react';

export default function Navbar({ activeView, onViewChange, onProfileClick }: { activeView: string, onViewChange: (view: string) => void, onProfileClick: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-8 bg-surface-base/40 backdrop-blur-xl border-b border-white/20">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onViewChange('explore')}>
        <div className="w-10 h-10 rounded-full bg-accent-rose/10 flex items-center justify-center border border-accent-rose/20 group-hover:scale-110 transition-transform duration-500">
          <Globe className="w-5 h-5 text-accent-rose" />
        </div>
        <span className="text-2xl font-serif font-medium tracking-tight text-text-primary">Velora</span>
      </div>

      <div className="flex items-center gap-12">
        <NavLink 
          icon={<Compass className="w-4 h-4" />} 
          label="Explore" 
          active={activeView === 'explore'} 
          onClick={() => onViewChange('explore')}
        />
        <NavLink 
          icon={<Award className="w-4 h-4" />} 
          label="Passport" 
          active={activeView === 'passport'} 
          onClick={() => onViewChange('passport')}
        />
        <NavLink 
          icon={<MapIcon className="w-4 h-4" />} 
          label="Itineraries" 
          active={activeView === 'itineraries'}
          onClick={() => onViewChange('itineraries')}
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-accent-clay/10 rounded-full border border-accent-clay/20 text-[10px] font-bold text-accent-clay tracking-widest font-mono">
          <span className="opacity-60">L</span> 25 GP
        </div>
        <div 
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-surface-sunken border border-white/40 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-white transition-all shadow-sm ring-4 ring-black/5"
        >
          PV
        </div>
      </div>
    </nav>
  );
}

function NavLink({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex items-center gap-2 text-sm font-medium transition-all ${active ? 'text-text-primary' : 'text-text-tertiary hover:text-text-primary'}`}
    >
      {icon}
      <span className="tracking-wide">{label}</span>
      {active && (
        <motion.div 
          layoutId="underline" 
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-clay" 
        />
      )}
    </button>
  );
}
