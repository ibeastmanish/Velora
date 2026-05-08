import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, DollarSign, CheckCircle2, Circle, List, Map as MapIcon } from 'lucide-react';
import type { TripPlan } from '../services/geminiService';
import MapView from './MapView';

interface ItineraryViewProps {
  plan: TripPlan;
}

export default function ItineraryView({ plan }: ItineraryViewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [heroImage, setHeroImage] = useState<string | null>(null);

  const destinationImage = `https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1280`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-[30rem] rounded-[2.5rem] overflow-hidden mb-16 relative group shadow-2xl"
      >
        <img 
          src={destinationImage} 
          alt={plan.destination}
          className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2.5rem]" />
        
        <div className="absolute bottom-12 left-12">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="flex items-center gap-3 mb-4"
           >
             <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-full border border-white/30">
               {plan.countryCode}
             </span>
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="text-7xl font-serif text-white drop-shadow-lg"
           >
             {plan.destination}
           </motion.h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-b border-black/[0.03] pb-12"
      >
        <div className="flex gap-10 text-text-secondary text-sm font-medium">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-sage/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-accent-sage" />
            </div>
            <span>{plan.days.length} Days</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-accent-gold" />
            </div>
            <span>{plan.totalBudget}</span>
          </div>
        </div>

        <div className="flex p-1.5 bg-surface-sunken border border-black/5 rounded-full shadow-inner">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-500 ${viewMode === 'list' ? 'bg-white text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-secondary'}`}
          >
            <List className="w-3.5 h-3.5" />
            Timeline
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-500 ${viewMode === 'map' ? 'bg-white text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-secondary'}`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Map
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-24"
          >
            {plan.days.map((day, idx) => (
              <section key={day.day} className="relative">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 rounded-full bg-accent-clay/10 flex items-center justify-center border border-accent-clay/20">
                     <span className="text-2xl font-serif text-accent-clay italic">{day.day}</span>
                  </div>
                  <h3 className="text-3xl font-serif text-text-primary tracking-tight">{day.title}</h3>
                </div>

                <div className="space-y-8 relative pl-6 border-l border-black/[0.05]">
                  {day.items.map((item, itemIdx) => (
                    <motion.div 
                      key={itemIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIdx * 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute -left-[30px] top-6 w-3 h-3 rounded-full bg-white border-2 border-accent-clay shadow-sm group-hover:scale-125 transition-transform" />
                      
                      <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-black/5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-text-tertiary">
                            <Clock className="w-3.5 h-3.5 text-accent-rose" />
                            <span>{item.time}</span>
                            <span className="px-3 py-1 rounded-full bg-surface-sunken text-accent-sage">
                              {item.type}
                            </span>
                          </div>
                          {item.estimatedCost && (
                            <span className="text-xs font-bold text-accent-gold font-mono">
                              {item.estimatedCost}
                            </span>
                          )}
                        </div>

                        <h4 className="text-2xl font-serif mb-3 text-text-primary group-hover:text-accent-clay transition-colors duration-500">
                          {item.activity}
                        </h4>
                        <p className="text-sm text-text-secondary leading-relaxed mb-6 font-medium opacity-90">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-text-tertiary">
                          <MapPin className="w-3.5 h-3.5 text-accent-teal" />
                          <span>{item.location.name}</span>
                        </div>

                        <div className="absolute right-8 bottom-8 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                          <Circle className="w-6 h-6 text-text-tertiary cursor-pointer hover:text-accent-clay shadow-sm" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <MapView plan={plan} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
