import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Countdown.css';

import confetti from 'canvas-confetti';

const Countdown = () => {
  // Event dates (October 18-19, 2025)
  const EVENT_START = '2025-10-18T00:00:00';
  const EVENT_END = '2025-10-19T23:59:59';
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [eventStatus, setEventStatus] = useState('upcoming');
  const [showCelebration, setShowCelebration] = useState(false); // Added missing state declaration
  const navigate = useNavigate();

  useEffect(() => {
    const checkEventStatus = () => {
      const now = new Date();
      const startDate = new Date(EVENT_START);
      const endDate = new Date(EVENT_END);

      if (now < startDate) {
        setEventStatus('upcoming');
      } else if (now >= startDate && now <= endDate) {
        setEventStatus('live');
      } else {
        setEventStatus('past');
      }
    };

    checkEventStatus();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(EVENT_START).getTime();
      const distance = start - now;

      if (distance < 0) {
        checkEventStatus();
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      checkEventStatus();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (eventStatus === 'live') {
      setShowCelebration(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [eventStatus]);

  const calculateProgress = () => {
    const now = new Date();
    const startDate = new Date(EVENT_START);
    const totalDays = Math.ceil((startDate.getTime() - new Date('2025-05-22').getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((now.getTime() - new Date('2025-05-22').getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
  };

  const handleLiveUpdatesClick = () => {
    navigate('/live-updates');
  };

  return (
    <div className={`countdown-container ${eventStatus}`}>
      {eventStatus === 'upcoming' && (
        <>
          <div className="countdown-grid compact">
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.days}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-separator pulse"> </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.hours}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-separator pulse"> </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.minutes}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-separator pulse"> </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.seconds}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <div className="progress-days">
              {timeLeft.days} days remaining
            </div>
          </div>
        </>
      )}

      {eventStatus === 'live' && (
        <div className="live-event">
          <div className="live-badge pulse">LIVE NOW</div>
          <div className="celebrate-message">
            <p>TRISHNA 2K25 IS LIVE</p>
            <p className="event-date">October 18-19, 2025</p>
            Join the Event! <span className="emoji">🎉</span>
          </div>
          <button className="join-button" onClick={handleLiveUpdatesClick}>
            Get Live Updates
          </button>
        </div>
      )}

      {eventStatus === 'past' && (
        <div className="past-event">
          <p>TRISHNA 2K25 WAS A GRAND SUCCESS!</p>
          <p>Thank you to all 500+ participants!</p>
          <div className="highlights-link">
            <a href="/gallery">View Event Highlights →</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
