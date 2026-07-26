import { useRef, useState } from "react";

function CelebrationPage() {
  const [showMedia, setShowMedia] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayButton = () => {
    setShowMedia(true);
    setPlayClicked(true);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 0);
  };

  const closeMedia = () => {
    setShowMedia(false);
    videoRef.current?.pause();
  };

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
            <span></span>
            <span className="celebration-ornament-line" />
          </div>

          <h1 className="celebration-heading">ကလေးလေးအတွက် ကိုကို သီချင်းလေးပြင်ထားပါတယ်။</h1>

          <div className="celebration-divider" />
          {!playClicked && (
            <button
              className="celebration-play-btn"
              type="button"
              onClick={handlePlayButton}
            >
              Play Video
            </button>
          )}
        </div>
      </div>

      {showMedia && (
        <div className="celebration-video-overlay" onClick={closeMedia}>
          <div className="celebration-video-card popup" onClick={(e) => e.stopPropagation()}>
            <button className="celebration-video-close" type="button" onClick={closeMedia}>
              ×
            </button>
            <video
              ref={videoRef}
              className="celebration-video-player"
              controls
              autoPlay
              preload="metadata"
              poster="/video-poster.jpg"
              playsInline
            >
              <source src="/stickers/mmm.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default CelebrationPage;

