import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AbstractGlobe from './components/AbstractGlobe';
import ItineraryView from './components/ItineraryView';
import PassportGrid from './components/PassportGrid';
import TravelerDNA from './components/TravelerDNA';
import { generateTripPlan, type TripPlan } from './services/geminiService';

import BackgroundDecorations from './components/BackgroundDecorations';

export default function App() {
  const [activeView, setActiveView] = useState('explore');
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dna, setDna] = useState<any>(null);
  const [showDNA, setShowDNA] = useState(false);

  useEffect(() => {
    const savedDNA = localStorage.getItem('velora_dna');
    if (savedDNA) setDna(JSON.parse(savedDNA));
  }, []);

  const handlePlanTrip = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const dnaContext = dna ? ` Traveler preferences: Pace is ${dna.speed}, interested in ${dna.interests.join(', ')}, budget is ${dna.budget}.` : "";
      const plan = await generateTripPlan(prompt + dnaContext);
      setTripPlan(plan);
      setActiveView('itinerary');
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [dna]);

  const handleViewChange = (view: string) => {
    if (view === 'explore') setTripPlan(null);
    setActiveView(view);
  };

  return (
    <div className="relative min-h-screen selection:bg-accent-rose selection:text-white">
      <AbstractGlobe />
      <BackgroundDecorations />
      <Navbar 
        activeView={activeView} 
        onViewChange={handleViewChange} 
        onProfileClick={() => setShowDNA(true)} 
      />

      <main className="relative z-10 pt-24">
        <AnimatePresence>
          {showDNA && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-base/80 backdrop-blur-xl px-4"
              onClick={() => setShowDNA(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md"
              >
                <TravelerDNA onSave={(newDna) => {
                  setDna(newDna);
                  localStorage.setItem('velora_dna', JSON.stringify(newDna));
                  setShowDNA(false);
                }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeView === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Hero onPlan={handlePlanTrip} isLoading={isLoading} />
              {error && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 px-8 py-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl shadow-xl backdrop-blur-md">
                  {error}
                </div>
              )}
            </motion.div>
          )}

          {activeView === 'itinerary' && tripPlan && (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ItineraryView plan={tripPlan} />
              
              <button 
                onClick={() => handleViewChange('explore')}
                className="fixed bottom-12 left-1/2 -translate-x-1/2 px-10 py-5 bg-white border border-black/5 rounded-full text-sm font-semibold shadow-2xl hover:shadow-accent-clay/10 hover:scale-105 active:scale-95 transition-all text-text-primary"
              >
                Plan Another Expedition
              </button>
            </motion.div>
          )}

          {activeView === 'passport' && (
            <motion.div
              key="passport"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto px-4 py-24"
            >
              <PassportGrid />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

