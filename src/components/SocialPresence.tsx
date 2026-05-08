import { motion } from 'motion/react';
import { Camera, Compass, Briefcase, MapPin } from 'lucide-react';

const activePlanners = [
  { id: 1, name: 'Alex', location: 'Tokyo', avatar: 'A', icon: <Compass className="w-3 h-3" />, color: 'bg-accent-rose' },
  { id: 2, name: 'Sarah', location: 'Paris', avatar: 'S', icon: <Briefcase className="w-3 h-3" />, color: 'bg-accent-sage' },
  { id: 3, name: 'Mika', location: 'Rome', avatar: 'M', icon: <Camera className="w-3 h-3" />, color: 'bg-accent-gold' },
];

export default function SocialPresence() {
  return (
    <div className="absolute top-32 left-10 hidden lg:block z-10">
      <div className="flex flex-col gap-5">
        <div className="text-[10px] uppercase font-mono text-text-tertiary tracking-[0.3em] mb-2 px-1">Live Co-planning</div>
        {activePlanners.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + idx * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center gap-4 p-3 pr-6 bg-white/80 backdrop-blur-md rounded-2xl border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500"
          >
            <div className={`w-10 h-10 rounded-full ${user.color}/20 flex items-center justify-center text-xs font-bold text-text-primary ring-4 ring-white`}>
              {user.avatar}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-primary mb-0.5">{user.name}</span>
              <div className="flex items-center gap-1.5 opacity-60">
                {user.icon}
                <span className="text-[10px] font-medium tracking-tight">{user.location}</span>
              </div>
            </div>
            <div className="ml-4 flex flex-col items-end">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-sage animate-pulse" />
              <span className="text-[8px] font-mono text-text-tertiary mt-1 uppercase tracking-tighter">Active</span>
            </div>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-[10px] font-medium text-text-tertiary mt-2 pl-1 flex items-center gap-2"
        >
          <div className="flex -space-x-2">
             {[1,2,3].map(i => <div key={i} className="w-4 h-4 rounded-full bg-surface-sunken border border-white" />)}
          </div>
          <span>+ 2,491 others exploring</span>
        </motion.div>
      </div>
    </div>
  );
}
