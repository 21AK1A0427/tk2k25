import { useState, useEffect } from 'react';
import '../../styles/StatsCounter.css';

const StatsCounter = ({ target, title, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const increment = target / (duration / 16); // 60fps

    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return prev + increment;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="stats-card">
      <div className="stats-value">
        {Math.floor(count)}
        {suffix}
      </div>
      <div className="stats-title">{title}</div>
    </div>
  );
};

export default StatsCounter;
