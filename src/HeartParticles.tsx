import React, { useMemo } from 'react';

interface HeartParticlesProps {
  count?: number;
  className?: string;
}

function HeartParticles({ count = 20, className }: HeartParticlesProps) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 14 + Math.random() * 24,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      drift: -30 + Math.random() * 60,
      opacity: 0.2 + Math.random() * 0.5,
      color: ['#FF6B6B', '#FF9FFC', '#FFD93D', '#FF9F9F', '#FF4081', '#E040FB', '#FF80AB'][Math.floor(Math.random() * 7)],
    }));
  }, [count]);

  return (
    <div className={`heart-particles ${className ?? ''}`}>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart-particle"
          style={{
            left: h.left,
            width: h.size,
            height: h.size,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            '--drift': `${h.drift}px`,
            opacity: h.opacity,
            color: h.color,
          } as React.CSSProperties}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

export default HeartParticles;

