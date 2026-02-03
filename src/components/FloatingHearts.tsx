import React from 'react';

interface FloatingHeartsProps {
  count?: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 30 }) => {
  const hearts = Array.from({ length: count }, (_, i) => {
    // Negative delay ensures hearts are already floating all over screen on load
    const delay = -(Math.random() * 20);
    const duration = 15 + Math.random() * 10; // Slower, more floating feel
    const left = Math.random() * 100;
    const size = 15 + Math.random() * 25; // Slightly larger variation
    const opacity = 0.2 + Math.random() * 0.3; // More subtle transparency

    return (
      <div
        key={i}
        className="absolute pointer-events-none"
        style={{
          left: `${left}%`,
          bottom: '-20px',
          animation: `float-heart ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-primary"
          style={{ opacity }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    );
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts}
    </div>
  );
};

export default FloatingHearts;
