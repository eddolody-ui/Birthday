import BirthdayCake from './BirthdayCake';

interface RevealedPageProps {
  photos: string[]; // Array of 6 photo URLs
}

function RevealedPage({ photos }: RevealedPageProps) {
  return (
    <div className="revealed-page">
      {/* Center text box */}
      <div className="revealed-center-box">
        <div className="revealed-center-content">
          <h2 className="revealed-heading">Happy Birthday!</h2>
          <p className="revealed-message">
            Wishing you the happiest birthday filled with love, laughter, and
            everything you deserve! May this year bring you endless joy and
            unforgettable memories.
          </p>
        </div>
      </div>

      {/* Moveable Birthday Cake with Candle */}
      <div className="cakes-row">
        <BirthdayCake />
      </div>
    </div>
  );
}

export default RevealedPage;

