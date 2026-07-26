import { useState, useEffect } from 'react';
import HeartParticles from './HeartParticles';

interface DecoratedTextPageProps {
  onContinue: () => void;
}

const birthdayMessage = [
  { text: 'ပျော်ရှင်စရာမွေးနေ့လေးပါ', className: 'deco-title' },
  { text: ' ကိုကို့ ကလေးလေး', className: 'deco-title' },
  { text: 'From', className: 'deco-subtitle' },
  { text: 'ကိုကို', className: 'deco-subtitle' },
  { text: '', className: 'deco-spacer' },
  { text: 'ကလေးလေးကို တွေ့ခွင့်ရတာက ကိုကို့ဘ၀အတွက် အကောင်းဆုံးလက်ဆောင်တစ်ခုပါနော်။ ယနေ့မွေးနေ့ကစပြီး ကလေးလေးရဲ့ဘဝမှာ ပျော်ရွှင်ခြင်း၊ ကျန်းမာခြင်း၊ အောင်မြင်ခြင်းတွေနဲ့ အမြဲပြည့်စုံပါစေ။ ကလေးလေးလိုချင်တဲ့အိပ်မက်တိုင်း အကောင် အထည်ဖော်နိုင်ပြီး ကံကောင်းခြင်းတွေနဲ့ အမြဲပြည့်စုံပါစေ။', className: 'deco-line' },
  { text: 'ကိုကို့ ကိုလဲအများကြီးပိုချစ်ပေးနိုင်ပါစေ။', className: 'deco-line' },
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

      {/* Photo glass containers */}
      <div className="deco-photo-gallery" aria-hidden>
        <div className="deco-photo-frame top-left">
          <div className="deco-photo-surface">📸 Photo</div>
        </div>
        <div className="deco-photo-frame top-right">
          <div className="deco-photo-surface">📸 Photo</div>
        </div>
        <div className="deco-photo-frame mid-left">
          <div className="deco-photo-surface">📸 Photo</div>
        </div>
        <div className="deco-photo-frame mid-right">
          <div className="deco-photo-surface">📸 Photo</div>
        </div>
        <div className="deco-photo-frame bottom-left">
          <div className="deco-photo-surface">📸 Photo</div>
        </div>
        <div className="deco-photo-frame bottom-right">
          <div className="deco-photo-surface">📸 Photo</div>
        </div>
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

