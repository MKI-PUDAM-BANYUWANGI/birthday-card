import React from 'react';

interface ConfettiProps {
  active?: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active = true }) => {
  if (!active) return null;

  const pieces = Array.from({ length: 50 }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 2;
    const size = 6 + Math.random() * 8;
    const colors = [
      'hsl(350 60% 65%)',
      'hsl(340 50% 75%)',
      'hsl(20 50% 97%)',
      'hsl(40 70% 65%)',
      'hsl(350 70% 95%)',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isHeart = Math.random() > 0.6;

    return (
      <div
        key={i}
        className="absolute pointer-events-none"
        style={{
          left: `${left}%`,
          top: '-20px',
          animation: `confetti-fall ${duration}s ease-in forwards`,
          animationDelay: `${delay}s`,
        }}
      >
        {isHeart ? (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        )}
      </div>
    );
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {pieces}
    </div>
  );
};

export default Confetti;
