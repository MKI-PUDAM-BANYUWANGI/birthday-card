import React from 'react';
import { Button } from '@/components/ui/button';
import TypewriterText from '@/components/TypewriterText';

interface SceneMessageProps {
  onNext: () => void;
}

const SceneMessage: React.FC<SceneMessageProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 intimate-gradient relative overflow-hidden">


      {/* Darker, more intimate atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-burgundy/5 to-burgundy/10" />

      {/* Soft glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-rose-medium/20 blur-3xl" />

      <div className="text-center z-10 max-w-md">
        <div className="mb-10">
          <p className="text-2xl md:text-3xl font-display italic text-foreground opacity-0 animate-fade-up leading-relaxed">
            Terima kasih sudah selalu ada
          </p>

          <p className="text-2xl md:text-3xl font-display italic text-foreground opacity-0 animate-fade-up delay-700 leading-relaxed mt-4">
            di setiap senyum dan lelahku 🤍
          </p>
        </div>

        {/* Decorative line */}
        <div className="opacity-0 animate-zoom-in delay-1000 mb-10">
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
        </div>

        <div className="h-8 mb-10">
          <TypewriterText
            text="Kamu adalah alasan aku tersenyum setiap hari"
            delay={2000}
            speed={50}
            className="text-lg font-body text-muted-foreground"
          />
        </div>

        <div className="opacity-0 animate-fade-up delay-1500">
          <Button
            variant="intimate"
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

export default SceneMessage;
