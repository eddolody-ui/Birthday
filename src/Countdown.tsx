import { useState, useEffect, useCallback } from 'react';
import HeartParticles from './HeartParticles';

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const calcTime = useCallback(() => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }, [targetDate]);

  const [time, setTime] = useState(calcTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calcTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [calcTime]);

  return (
    <div className="countdown-timer">
      <div className="countdown-block">
        <div className="countdown-glass-box">
          <div className="countdown-unit">
            <span className="countdown-number">{String(time.days).padStart(2, '0')}</span>
            <span className="countdown-label">Days</span>
          </div>
        </div>
        <span className="countdown-sep">:</span>
      </div>
      <div className="countdown-block">
        <div className="countdown-glass-box">
          <div className="countdown-unit">
            <span className="countdown-number">{String(time.hours).padStart(2, '0')}</span>
            <span className="countdown-label">Hours</span>
          </div>
        </div>
        <span className="countdown-sep">:</span>
      </div>
      <div className="countdown-block">
        <div className="countdown-glass-box">
          <div className="countdown-unit">
            <span className="countdown-number">{String(time.minutes).padStart(2, '0')}</span>
            <span className="countdown-label">Minutes</span>
          </div>
        </div>
        <span className="countdown-sep">:</span>
      </div>
      <div className="countdown-block">
        <div className="countdown-glass-box">
          <div className="countdown-unit">
            <span className="countdown-number">{String(time.seconds).padStart(2, '0')}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface CountdownProps {
  targetDate: Date;
  onEnter: () => void;
}

function Countdown({ targetDate, onEnter }: CountdownProps) {
  const isComplete = new Date().getTime() >= targetDate.getTime();

  return (
    <div className="countdown-page">
      <HeartParticles count={30} />
      <div className="countdown-center">
        <h2 className="countdown-heading">Countdown to</h2>
        <div className="countdown-divider" />
        <CountdownTimer targetDate={targetDate} />
        {isComplete ? (
          <p className="countdown-hint">The wait is over! 🎉</p>
        ) : (
          <p className="countdown-hint">Something special is coming... 🎉</p>
        )}
        <button className="countdown-enter-btn" onClick={onEnter} disabled={!isComplete}>
          {isComplete ? "Let's Go! →" : 'Enter →'}
        </button>
      </div>
    </div>
  );
}

export default Countdown;

