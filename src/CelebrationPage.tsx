function CelebrationPage() {
  return (
    <div className="celebration-page">
      {/* Floating sparkle emojis background */}
      <div className="celebration-floating">
        <span className="celebration-float-item cf-1">✨</span>
        <span className="celebration-float-item cf-2">🎉</span>
        <span className="celebration-float-item cf-3">🌟</span>
        <span className="celebration-float-item cf-4">🎊</span>
        <span className="celebration-float-item cf-5">💫</span>
        <span className="celebration-float-item cf-6">🎈</span>
        <span className="celebration-float-item cf-7">🎇</span>
        <span className="celebration-float-item cf-8">🌸</span>
      </div>

      {/* Center content */}
      <div className="celebration-center">
        <div className="celebration-glass-card">
          <div className="celebration-ornament-top">
            <span className="celebration-ornament-line" />
            <span>🌈</span>
            <span className="celebration-ornament-line" />
          </div>

          <div className="celebration-icon-row">
            <span className="celebration-icon">🎂</span>
            <span className="celebration-icon">🎁</span>
            <span className="celebration-icon">🎈</span>
          </div>

          <h1 className="celebration-heading">Your Wish Has Been Made! 🕯️</h1>

          <p className="celebration-message">
            The candle has been blown out, and your birthday wish is now on its way
            to the stars. May everything you wished for come true this year and always!
          </p>

          <div className="celebration-divider" />

          <p className="celebration-blessing">
            Happy Birthday! 🎉🥳
          </p>

          <p className="celebration-tagline">
            May this year bring you endless joy, love, and unforgettable memories.
          </p>

          <div className="celebration-ornament-bottom">
            <span className="celebration-ornament-line" />
            <span>💖</span>
            <span className="celebration-ornament-line" />
          </div>
        </div>

        {/* Firework-like confetti burst */}
        <div className="celebration-burst-container">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="celebration-burst-particle"
              style={{
                '--dx': `${Math.cos((i / 40) * Math.PI * 2) * 160}px`,
                '--dy': `${Math.sin((i / 40) * Math.PI * 2) * 160}px`,
                '--delay': `${Math.random() * 0.5}s`,
                '--hue': `${Math.random() * 360}`,
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CelebrationPage;

