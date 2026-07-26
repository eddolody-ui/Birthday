import { useState } from 'react';

interface SurpriseBoxProps {
  onBoxOpened?: () => void;
}

function SurpriseBox({ onBoxOpened }: SurpriseBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    setIsOpen(true);
    // Let the lid animation play, then trigger the revealed page transition
    setTimeout(() => {
      setIsAnimating(false);
      // Notify parent to transition to revealed page
      onBoxOpened?.();
    }, 1800);
  };

  return (
    <div className="surprise-box-container">
      <p className="surprise-subtitle">Happy Birthday ပါ ကိုကို့ချစ်ဆုံးလေး။</p>
      {/* The 3D Gift Box */}
      <div className={`gift-box ${isOpen ? 'box-opened' : ''} ${isAnimating ? 'opening' : ''}`}>
        <div className="gift-box-lid">
          <div className="lid-top">
            <div className="lid-ribbon-h" />
            <div className="lid-bow">🎀</div>
          </div>
        </div>
        <div className="gift-box-body">
          <div className="box-ribbon-v" />
          <div className="box-ribbon-h" />
        </div>
        {/* Confetti burst while opening */}
        {isAnimating && (
          <div className="box-confetti" aria-hidden>
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="confetti-piece box-confetti-piece"
                style={{
                  left: `${10 + i * 6}%`,
                  background: `hsl(${(i * 35) % 360} 80% 60%)`,
                  animationDuration: `${900 + (i % 5) * 150}ms`,
                  animationDelay: `${(i % 6) * 60}ms`,
                  // horizontal burst distance
                  ['--dx' as any]: `${(i - 7) * 18}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Open Button */}
      <button
        className={`open-box-btn ${isOpen ? 'opened' : ''}`}
        onClick={handleOpen}
        disabled={isOpen}
      >
        {isOpen ? 'ဖွင့်ပြီးပါပြီ။' : 'ဖွင့်ပါ။'}
      </button>
    </div>
  );
}

export default SurpriseBox;

