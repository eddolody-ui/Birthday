import { useState } from 'react';
import Countdown from './Countdown';
import HeartParticles from './HeartParticles';
import SurpriseBox from './SurpriseBox';
import RevealedPage from './RevealedPage';

function App() {
  const [page, setPage] = useState<'countdown' | 'surprise' | 'revealed'>('countdown');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setPage('surprise');
      setIsFadingOut(false);
    }, 800);
  };

  const handleBoxOpened = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setPage('revealed');
      setIsFadingOut(false);
    }, 600);
  };

  return (
    <div className={`App ${isFadingOut ? 'page-fade-out' : ''}`}>
      {page === 'countdown' && (
        <Countdown targetDate={new Date('2026-09-29T00:00:00')} onEnter={handleEnter} />
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
          <RevealedPage
            photos={[
              '/photos/photo1.jpg',
              '/photos/photo2.jpg',
              '/photos/photo3.jpg',
              '/photos/photo4.jpg',
              '/photos/photo5.jpg',
              '/photos/photo6.jpg',
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default App;
