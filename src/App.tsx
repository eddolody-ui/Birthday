import { useState } from 'react';
import Countdown from './Countdown';
import HeartParticles from './HeartParticles';
import SurpriseBox from './SurpriseBox';
import BirthdayCake from './BirthdayCake';
import RevealedPage from './RevealedPage';
import LoadingAnimation from './LoadingAnimation';
import DecoratedTextPage from './DecoratedTextPage';
import CelebrationPage from './CelebrationPage';

function App() {
  const [page, setPage] = useState<'countdown' | 'loading' | 'decorated-text' | 'surprise' | 'revealed' | 'celebration'>('countdown');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setPage('loading');
      setIsFadingOut(false);
    }, 800);
  };

  const handleLoadingComplete = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setPage('decorated-text');
      setIsFadingOut(false);
    }, 600);
  };

  const handleTextComplete = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setPage('surprise');
      setIsFadingOut(false);
    }, 600);
  };

  const handleBoxOpened = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setPage('revealed');
      setIsFadingOut(false);
    }, 600);
  };

  const handleCandleBlown = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setPage('celebration');
      setIsFadingOut(false);
    }, 800);
  };

  return (
    <div className={`App ${isFadingOut ? 'page-fade-out' : ''}`}>
      {page === 'countdown' && (
        <Countdown targetDate={new Date('2026-07-22T00:00:00')} onEnter={handleEnter} />
      )}
      {page === 'loading' && (
        <LoadingAnimation onComplete={handleLoadingComplete} />
      )}
      {page === 'decorated-text' && (
        <DecoratedTextPage onContinue={handleTextComplete} />
      )}
      {page === 'surprise' && (
        <div className="surprise-page">
          <HeartParticles count={50} />
          <SurpriseBox onBoxOpened={handleBoxOpened} />
        </div>
      )}
      {page === 'revealed' && (
        <div className="revealed-page-wrapper">
          <HeartParticles count={40} />
          <BirthdayCake onCandleBlown={handleCandleBlown} />
        </div>
      )}
      {page === 'celebration' && (
        <CelebrationPage />
      )}
    </div>
  );
}

export default App;
