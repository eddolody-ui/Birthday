interface RevealedPageProps {
  photos: string[]; // Array of 6 photo URLs
}

function RevealedPage({ photos }: RevealedPageProps) {
  return (
    <div className="revealed-page">
      {/* Decorative corner photos - top left */}
      <div className="revealed-photo-corner top-left">
        <div className="revealed-photo-frame">
          <img src={photos[0]} alt="Photo 1" loading="lazy" />
        </div>
        <div className="revealed-photo-frame">
          <img src={photos[1]} alt="Photo 2" loading="lazy" />
        </div>
      </div>

      {/* Decorative corner photos - top right */}
      <div className="revealed-photo-corner top-right">
        <div className="revealed-photo-frame">
          <img src={photos[2]} alt="Photo 3" loading="lazy" />
        </div>
        <div className="revealed-photo-frame">
          <img src={photos[3]} alt="Photo 4" loading="lazy" />
        </div>
      </div>

      {/* Decorative corner photos - bottom left */}
      <div className="revealed-photo-corner bottom-left">
        <div className="revealed-photo-frame">
          <img src={photos[4]} alt="Photo 5" loading="lazy" />
        </div>
        <div className="revealed-photo-frame">
          <img src={photos[5]} alt="Photo 6" loading="lazy" />
        </div>
      </div>

      {/* Decorative corner photos - bottom right */}
      <div className="revealed-photo-corner bottom-right">
        <div className="revealed-photo-frame">
          <img src={photos[0]} alt="Photo 1" loading="lazy" />
        </div>
        <div className="revealed-photo-frame">
          <img src={photos[1]} alt="Photo 2" loading="lazy" />
        </div>
      </div>

      {/* Side photos - left */}
      <div className="revealed-photo-side left-side">
        <div className="revealed-photo-frame">
          <img src={photos[2]} alt="Photo 3" loading="lazy" />
        </div>
        <div className="revealed-photo-frame">
          <img src={photos[3]} alt="Photo 4" loading="lazy" />
        </div>
      </div>

      {/* Side photos - right */}
      <div className="revealed-photo-side right-side">
        <div className="revealed-photo-frame">
          <img src={photos[4]} alt="Photo 5" loading="lazy" />
        </div>
        <div className="revealed-photo-frame">
          <img src={photos[5]} alt="Photo 6" loading="lazy" />
        </div>
      </div>

      {/* Center text box */}
      <div className="revealed-center-box">
        <div className="revealed-center-content">
          <div className="revealed-icon">🎉</div>
          <h2 className="revealed-heading">Happy Birthday!</h2>
          <p className="revealed-message">
            Wishing you the happiest birthday filled with love, laughter, and
            everything you deserve! May this year bring you endless joy and
            unforgettable memories.
          </p>
          <div className="revealed-emojis">🎂🎈🎁🌟💖✨</div>
        </div>
      </div>
    </div>
  );
}

export default RevealedPage;

