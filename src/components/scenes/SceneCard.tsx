import React, { useState, useEffect } from 'react';
import Confetti from '@/components/Confetti';
import TypewriterText from '@/components/TypewriterText';

// ===== PERSONALISASI =====
// Ganti nama dan pesan di bawah ini sesuai keinginan
const nama = "Sayangku";
const pesan = `Setiap hari bersamamu adalah hadiah terindah yang pernah aku terima. Kamu mengajarkanku banyak hal tentang arti cinta yang tulus, sabar, dan perjuangan untuk meraih kebahagiaan.

Di hari spesialmu ini, aku berdoa semoga Tuhan selalu melindungimu, memberikanmu kesehatan, kebahagiaan, dan segala impianmu yang tertunda dapat tercapai.

Terima kasih sudah menjadi alasan aku untuk tersenyum, dan rumah tempatku pulang. Terimakasih atas setiap usaha yang kamu berikan untuk aku. Terimaksih telah mencintaiku sampai saat ini.

Seberapapun jauhnya jarak kita, momen-momen yang membuat kita saling tidak mengerti, salah paham yang membuat kita saling menyakiti, diam yang membuat kita saling merindukan, dimanapun kamu berada aku akan selalu ada untukmu.

I love u and I will always love you in every version of you 💞. 

Happy Birthday My Gorgeous Gurl 🤍`;

const reasons = [
  "Senyummu yang selalu menenangkan hatiku",
  "Caramu tertawa yang membuatku ikut bahagia",
  "Kesabaranmu menghadapi sifatku",
  "Ketulusan hatimu kepada semua orang bahkan yang menyakitimu",
  "Tatapan matamu yang teduh dan tenang",
  "Semangatmu yang tak pernah padam dan terus berjuang",
  "Caramu peduli pada hal-hal kecil tentang diriku",
  "Suaramu yang selalu aku rindukan",
  "Kebaikanmu yang luar biasa",
  "Karena kamu adalah rumah bagiku"
];
// ===========================

interface SceneCardProps {
  isVisible: boolean;
  onNext?: () => void;
}

const SceneCard: React.FC<SceneCardProps> = ({ isVisible, onNext }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentReason, setCurrentReason] = useState<string>("");
  const [isAnimateReason, setIsAnimateReason] = useState(false);
  const [isPlayingReasons, setIsPlayingReasons] = useState(false);
  const [isMessageComplete, setIsMessageComplete] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowConfetti(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlayingReasons) {
      const cycleReason = () => {
        setIsAnimateReason(true);
        setTimeout(() => {
          setCurrentReason((prev) => {
            let next;
            do {
              next = reasons[Math.floor(Math.random() * reasons.length)];
            } while (next === prev && reasons.length > 1);
            return next;
          });
          setIsAnimateReason(false);
        }, 300);
      };

      cycleReason(); // Trigger immediately
      interval = setInterval(cycleReason, 3000); // Change every 3 seconds for readability
    }

    return () => clearInterval(interval);
  }, [isPlayingReasons]);

  const handleShowReason = () => {
    if (!isPlayingReasons) {
      setIsPlayingReasons(true);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 romantic-gradient relative overflow-hidden">
      <Confetti active={showConfetti} />

      {/* Background glows */}
      <div className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/6 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />

      {/* The Card */}
      <div
        className="relative z-10 w-full max-w-lg opacity-0 animate-flip-in"
        style={{ perspective: '1000px' }}
      >
        <div className="card-gradient rounded-2xl shadow-card p-6 md:p-10 border border-rose-soft/50">
          {/* Card header decoration */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary/40" />
              <svg
                className="w-8 h-8 text-primary animate-pulse-soft"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary/40" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display italic text-center text-foreground mb-2">
            Happy Birthday
          </h1>
          <p className="text-2xl md:text-3xl font-display text-center text-primary mb-8">
            {nama} 🤍
          </p>

          {/* Decorative divider */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8" />

          {/* Message */}
          <div className="text-center mb-8 min-h-[200px]">
            <TypewriterText
              text={pesan}
              delay={1000}
              speed={30}
              className="text-base md:text-lg font-body text-foreground/90 leading-relaxed whitespace-pre-line"
              onComplete={() => setIsMessageComplete(true)}
            />
          </div>

          {/* Decorative divider */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8" />

          {/* Closing */}
          <p className="text-xl md:text-2xl font-display italic text-center text-foreground">
            I Love U
          </p>
          <p className="text-lg md:text-xl font-display italic text-center text-muted-foreground mt-2">
            Today, tomorrow, dan forever 🤍
          </p>

          {/* Interactive Reason */}
          <div className={`mt-12 text-center transition-opacity duration-1000 ${isMessageComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              onClick={handleShowReason}
              className="text-sm font-body text-primary/80 hover:text-primary transition-colors underline decoration-dotted mb-4"
            >
              Why i so love u? (Click Me)
            </button>
            <div className={`h-8 transition-opacity duration-300 ${isAnimateReason ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-lg font-display italic text-rose-deep">
                {currentReason}
              </p>
            </div>
          </div>

          {/* Special Surprise Button */}
          {onNext && (
            <div className={`mt-8 text-center transition-opacity duration-1000 delay-500 ${isMessageComplete ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={onNext}
                className="px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full font-display shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse-soft"
              >
                Special Surprise on Here! 🎁
              </button>
            </div>
          )}

          {/* Footer hearts */}
          <div className="flex justify-center gap-4 mt-8">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-primary/60"
                style={{
                  animationDelay: `${i * 200}ms`,
                  animation: 'pulse-soft 2s ease-in-out infinite'
                }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Card shadow glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-rose-soft/20 to-primary/10 rounded-3xl blur-2xl -z-10" />
      </div>

      {/* Bottom decoration */}
      <p className="text-sm font-body text-muted-foreground mt-10 opacity-0 animate-fade-in-slow delay-1000">
        Dibuat dengan 💕 untukmu
      </p>
    </div>
  );
};

export default SceneCard;
