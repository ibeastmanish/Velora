import React from 'react';
import { motion } from 'motion/react';
import { Wind, Clover, Sun } from 'lucide-react';

export default function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
      {/* Aerial Background Image Blur */}
      <div className="absolute inset-0 opacity-10 grayscale mix-blend-multiply transition-opacity duration-1000">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1920"
          className="w-full h-full object-cover"
          alt=""
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Floating Elements */}
      <FloatingElement delay={0} className="top-1/4 left-[10%] text-accent-rose/20">
        <Wind className="w-12 h-12" />
      </FloatingElement>
      
      <FloatingElement delay={1} className="top-1/3 right-[15%] text-accent-sage/20">
        <Clover className="w-8 h-8" />
      </FloatingElement>

      <FloatingElement delay={2} className="bottom-1/4 left-[20%] text-accent-gold/20">
        <Sun className="w-16 h-16" />
      </FloatingElement>
      
      <FloatingElement delay={3} className="top-2/3 right-[10%] text-accent-clay/20">
        <div className="w-24 h-24 rounded-full border border-current opacity-30" />
      </FloatingElement>

      {/* Watercolor Vignettes */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-accent-rose/5 blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-accent-sage/5 blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-accent-gold/5 blur-[200px] opacity-30" />
    </div>
  );
}

function FloatingElement({ children, delay, className }: { children: React.ReactNode, delay: number, className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 0.6,
        y: [0, -40, 0],
        x: [0, 20, 0],
        rotate: [0, 10, 0]
      }}
      transition={{ 
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay 
      }}
      className={`absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}
