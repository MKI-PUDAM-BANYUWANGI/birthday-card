import React from 'react';
import { Button } from '@/components/ui/button';
import HeartFireworks from '@/components/HeartFireworks';

interface SceneOpeningProps {
  onNext: () => void;
}

const SceneOpening: React.FC<SceneOpeningProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 romantic-gradient relative overflow-hidden">
      <HeartFireworks />
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-rose-soft/40 blur-3xl" />
      <div className="absolute bottom-32 right-10 w-40 h-40 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-gold/20 blur-2xl" />

      <div className="text-center z-10 max-w-md">
        <p className="text-4xl md:text-5xl font-display italic text-foreground opacity-0 animate-fade-up mb-4">
          Hai sayang… 💕
        </p>

        <p className="text-xl md:text-2xl font-body text-muted-foreground opacity-0 animate-fade-up delay-700 mb-12">
          Aku punya sesuatu yang spesial buatmu nih..
        </p>

        <div className="opacity-0 animate-fade-up delay-1500">
          <Button
            variant="romantic"
            size="xl"
            onClick={onNext}
            className="animate-pulse-soft"
          >
            Sentuh layar 💫
          </Button>
        </div>
      </div>

      {/* Subtle sparkles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold rounded-full animate-sparkle" />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary/60 rounded-full animate-sparkle delay-500" />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent rounded-full animate-sparkle delay-1000" />
    </div>
  );
};

export default SceneOpening;
