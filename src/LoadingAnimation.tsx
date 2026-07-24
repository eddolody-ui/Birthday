import { useState, useEffect } from 'react';
import HeartParticles from './HeartParticles';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const loadingMessages = [
  'Preparing your surprise...',
  'Adding sparkles...',
  'Wrapping the gift...',
  'Almost there...',
  'Just a moment...',
];

function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Advance messages as progress increases
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < loadingMessages.length - 1) return prev + 1;
        return prev;
      });
    }, 600);

    // Progress from 0 to 100 over ~3 seconds
    const startTime = Date.now();
    const duration = 3200; // 3.2 seconds

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(progressInterval);
        clearInterval(msgInterval);
        // Brief pause then complete
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onComplete(), 400);
        }, 400);
      }
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
    };
  }, [onComplete]);

  return (
    <div className={`loading-page ${isVisible ? 'loading-visible' : 'loading-fade-out'}`}>
      <HeartParticles count={30} />

      {/* Central loading content */}
      <div className="loading-center">
        {/* Animated ring spinner */}
        <div className="loading-ring-container">
          <svg className="loading-ring-svg" viewBox="0 0 120 120" width="140" height="140">
            {/* Background ring */}
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="4"
            />
            {/* Progress ring */}
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#loadingGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.1s ease' }}
            />
            {/* Spinning glow dots around the ring */}
            {Array.from({ length: 8 }).map((_, i) => (
              <circle
                key={i}
                cx={60 + 52 * Math.cos((i * Math.PI * 2) / 8 + (progress / 100) * Math.PI * 2)}
                cy={60 + 52 * Math.sin((i * Math.PI * 2) / 8 + (progress / 100) * Math.PI * 2)}
                r="3"
                fill="rgba(255,255,255,0.6)"
                className="loading-dot"
              />
            ))}
            {/* Center icon */}
            <text
              x="60"
              y="65"
              textAnchor="middle"
              fontSize="36"
              fill="url(#loadingGradient)"
              className="loading-sparkle-emoji"
            >
              May
            </text>
            <defs>
              <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B9D" />
                <stop offset="50%" stopColor="#A6C8FF" />
                <stop offset="100%" stopColor="#FF9FFC" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glow behind the ring */}
          <div className="loading-ring-glow" />
        </div>

        {/* Loading text */}
        <div className="loading-text-wrapper">
          <p className="loading-message" key={messageIndex}>
            {loadingMessages[messageIndex]}
          </p>
        </div>

        {/* Dots animation */}
        <div className="loading-dots-bar">
          <div
            className="loading-dots-fill"
            style={{ width: `${progress}%` }}
          />
          <div className="loading-dots-track">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="loading-dot-particle"
                style={{
                  left: `${(i + 1) * 9}%`,
                  opacity: progress > (i + 1) * 10 ? 0.8 : 0.2,
                  transition: 'opacity 0.3s ease',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoadingAnimation;

