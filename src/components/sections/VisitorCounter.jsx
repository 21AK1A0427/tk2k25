import { useState, useEffect } from 'react';
import '../../styles/VisitorCounter.css';
import trishnaLogo from '../../assets/images/tk logo.png';

// Use environment variable or fallback to production URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  'https://visitor-count-backend-1.onrender.com';

const VisitorCounter = () => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // First check if this is a new visitor
        const hasVisited = sessionStorage.getItem('hasVisited');
        const isPageRefresh = performance.getEntriesByType('navigation')[0]?.type === 'reload';

        // Get current count with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${API_BASE_URL}/api/visitors`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Backend responded with status ${response.status}`);
        }

        const data = await response.json();
        const currentCount = data.count || 0;
        
        setCount(currentCount);
        setIsLoading(false);
        localStorage.setItem('visitorCount', currentCount.toString());

        // Only increment if it's truly a new visitor
        if (!hasVisited && !isPageRefresh) {
          const incrementResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });

          if (!incrementResponse.ok) {
            throw new Error('Failed to increment count');
          }

          const newData = await incrementResponse.json();
          const newCount = newData.count || currentCount + 1;
          
          animateCounter(currentCount, newCount);
          sessionStorage.setItem('hasVisited', 'true');
        }
      } catch (error) {
        console.error('Connection error:', error);
        setIsLoading(false);
        
        // Use cached count if available
        const cachedCount = localStorage.getItem('visitorCount');
        if (cachedCount) {
          setCount(parseInt(cachedCount));
          setError('Connection issue - showing cached count');
        } else {
          setError('Failed to connect to server. Please check your connection.');
        }
      }
    };

    const timer = setTimeout(trackVisitor, 300);
    return () => clearTimeout(timer);
  }, []);

  const animateCounter = (start, end) => {
    setIsAnimating(true);
    const duration = 1500;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentCount = Math.floor(start + (end - start) * progress);
      
      setCount(currentCount);
      localStorage.setItem('visitorCount', currentCount.toString());
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  return (
    <div className={`visitor-counter ${isAnimating ? 'pulse' : ''}`} style={{ padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', width: 'auto' }}>
      <div className="counter-icon" style={{ width: '40px', height: '40px' }}>
        <img src={trishnaLogo} alt="Trishna Logo" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="counter-content" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {isLoading ? (
          <div className="counter-loading" style={{ fontSize: '1rem', color: '#ffffff', fontStyle: 'italic' }}>Loading visitor count...</div>
        ) : error ? (
          <div className="counter-error" style={{ fontSize: '1rem', color: '#ffffff', fontStyle: 'italic' }}>
            {error}
            <button 
              onClick={() => window.location.reload()}
              className="retry-button">Retry</button>
          </div>
        ) : (
          <div className="counter-value" style={{ fontSize: '1.5rem', color: '#3ecc94' }}>
            {count} <span className="counter-label" style={{ fontSize: '1rem', color: '#FFF8DC', fontStyle: 'italic', textTransform: 'uppercase' }}>Members Visited</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorCounter;
