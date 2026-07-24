import { useState, useEffect } from 'react';
import HeartParticles from './HeartParticles';

interface DecoratedTextPageProps {
  onContinue: () => void;
}

const birthdayMessage = [
  { text: 'Happy Birthday', className: 'deco-title' },
  { text: 'To Someone', className: 'deco-subtitle' },
  { text: 'Truly Special', className: 'deco-subtitle' },
  { text: '', className: 'deco-spacer' },
  { text: 'May your day be filled with as much joy', className: 'deco-line' },
  { text: 'as you bring to everyone around you.', className: 'deco-line' },
  { text: 'You deserve all the love, laughter,', className: 'deco-line' },
  { text: 'and happiness in the world.', className: 'deco-line' },
  { text: '', className: 'deco-spacer' },
  { text: 'Here\'s to you,', className: 'deco-line deco-signoff' },
  { text: 'and to many more beautiful years ahead!', className: 'deco-line deco-signoff' },
];

function DecoratedTextPage({ onContinue }: DecoratedTextPageProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Animate lines appearing one by one
    birthdayMessage.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
        // Enable continue button after all lines are shown
        if (index === birthdayMessage.length - 1) {
          setTimeout(() => setCanContinue(true), 800);
        }
      }, index * 350);
    });
  }, []);

  const handleContinueClick = () => {
    setIsFadingOut(true);
    setTimeout(() => onContinue(), 600);
  };

  const handlePageClick = () => {
    if (canContinue && !isFadingOut) {
      handleContinueClick();
    }
  };

  return (
    <div
      className={`decorated-page ${isFadingOut ? 'decorated-fade-out' : ''}`}
      onClick={handlePageClick}
      style={{ cursor: canContinue ? 'pointer' : 'default' }}
    >
      <HeartParticles count={35} />

      {/* Decorative corner elements */}
      <div className="deco-corner-decor top-left" aria-hidden>
        <span className="deco-corner-icon">🌸</span>
        <span className="deco-corner-icon">✨</span>
      </div>
      <div className="deco-corner-decor top-right" aria-hidden>
        <span className="deco-corner-icon">⭐</span>
        <span className="deco-corner-icon">🌙</span>
      </div>
      <div className="deco-corner-decor bottom-left" aria-hidden>
        <span className="deco-corner-icon">💫</span>
        <span className="deco-corner-icon">🌺</span>
      </div>
      <div className="deco-corner-decor bottom-right" aria-hidden>
        <span className="deco-corner-icon">💖</span>
        <span className="deco-corner-icon">🎀</span>
      </div>

      {/* Floating decorations */}
      <div className="deco-floating-elements" aria-hidden>
        <span className="deco-float-item di-1">🕊️</span>
        <span className="deco-float-item di-2">🌷</span>
        <span className="deco-float-item di-3">💫</span>
        <span className="deco-float-item di-4">🌹</span>
        <span className="deco-float-item di-5">✨</span>
        <span className="deco-float-item di-6">💕</span>
        <span className="deco-float-item di-7">🌻</span>
        <span className="deco-float-item di-8">🎵</span>
      </div>

      {/* Center glass card */}
      <div className="deco-center-wrapper">
        <div className="deco-glass-card">
          {/* Top ornament */}
          <div className="deco-ornament-top" aria-hidden>
            <span>✦</span>
            <span className="deco-ornament-line" />
            <span>✧</span>
            <span className="deco-ornament-line" />
            <span>✦</span>
          </div>

          {/* Message lines */}
          <div className="deco-message-container">
            {birthdayMessage.map((line, index) => (
              <div
                key={index}
                className={`deco-message-line ${line.className} ${
                  visibleLines.includes(index) ? 'deco-visible' : ''
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Bottom ornament */}
          <div className="deco-ornament-bottom" aria-hidden>
            <span>✧</span>
            <span className="deco-ornament-line" />
            <span>✦</span>
            <span className="deco-ornament-line" />
            <span>✧</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DecoratedTextPage;

