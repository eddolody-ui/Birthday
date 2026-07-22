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
      <p className="surprise-subtitle">Happy Birthday!</p>
      {/* The 3D Gift Box */}
      <div className={`gift-box ${isOpen ? 'box-opened' : ''}`}>
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
      </div>

      {/* Open Button */}
      <button
        className={`open-box-btn ${isOpen ? 'opened' : ''}`}
        onClick={handleOpen}
        disabled={isOpen}
      >
        {isOpen ? 'Opened! 🎉' : 'Open Box'}
      </button>
    </div>
  );
}

export default SurpriseBox;

