import React from 'react';
import { Button } from '@/components/ui/button';
import FloatingHearts from '@/components/FloatingHearts';

interface SceneFeelingProps {
  onNext: () => void;
}

const SceneFeeling: React.FC<SceneFeelingProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 warm-gradient relative overflow-hidden">
      <FloatingHearts count={12} />
      
      {/* Decorative gradients */}
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-56 h-56 rounded-full bg-mauve/20 blur-3xl" />
      
      <div className="text-center z-10 max-w-lg">
        <div className="mb-8">
          <p className="text-3xl md:text-4xl font-display italic text-foreground opacity-0 animate-fade-up mb-6">
            Di hari ini…
          </p>
          
          <p className="text-2xl md:text-3xl font-display text-foreground opacity-0 animate-fade-up delay-700">
            orang paling aku sayang
          </p>
          
          <p className="text-2xl md:text-3xl font-display text-foreground opacity-0 animate-fade-up delay-1000 mt-2">
            bertambah usianya 🎂
          </p>
        </div>
        
        {/* Decorative heart */}
        <div className="opacity-0 animate-zoom-in delay-1500 mb-10">
          <svg
            className="w-16 h-16 mx-auto text-primary animate-pulse-soft"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        
        <div className="opacity-0 animate-fade-up delay-2000">
          <Button 
            variant="soft" 
            size="xl"
            onClick={onNext}
          >
            Lanjut 💗
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SceneFeeling;
