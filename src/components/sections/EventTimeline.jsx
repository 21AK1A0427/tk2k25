import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { FaCalendarAlt, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../styles/Eventtimeline.css';

gsap.registerPlugin(MotionPathPlugin);

const events = [
  {
    id: 1,
    date: 'March 15',
    title: 'Opening Ceremony',
    location: 'Main Auditorium',
    description: 'Inauguration of TRISHNA 2K25 with guest speakers and performances',
    icon: '🎤'
  },
  {
    id: 2,
    date: 'March 16',
    title: 'Technical Workshops',
    location: 'Engineering Block',
    description: 'Hands-on sessions on AI, Blockchain, and IoT technologies',
    icon: '💻'
  },
  {
    id: 3,
    date: 'March 17',
    title: 'Hackathon Begins',
    location: 'Computer Center',
    description: '36-hour coding marathon to build innovative solutions',
    icon: '👨‍💻'
  },
  {
    id: 4,
    date: 'March 18',
    title: 'Cultural Night',
    location: 'Open Air Theater',
    description: 'Music, dance and drama performances from across India',
    icon: '🎭'
  },
  {
    id: 5,
    date: 'March 19',
    title: 'Prize Distribution',
    location: 'Main Auditorium',
    description: 'Closing ceremony and award distribution for all events',
    icon: '🏆'
  }
];

const EventTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const droneRef = useRef(null);
  const pathRef = useRef(null);
  const timelineRef = useRef();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!droneRef.current || !pathRef.current) return;
    const path = pathRef.current;
    const drone = droneRef.current;
    timelineRef.current = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      defaults: { duration: 2, ease: "power1.inOut" },
      paused: !isPlaying
    });
    events.forEach((_, i) => {
      const start = i / events.length;
      const end = (i + 1) / events.length;
      timelineRef.current
        .to(drone, {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            start: start,
            end: end
          },
          onStart: () => setActiveIndex(i)
        })
        .to(drone, { 
          rotation: 360, 
          duration: 0.5 
        }, `+=${i === events.length - 1 ? 1 : 0.5}`);
    });
    return () => {
      timelineRef.current?.kill();
    };
  }, [isPlaying]);

  const handleEventClick = (index) => {
    setActiveIndex(index);
    if (timelineRef.current) {
      const progress = index / events.length;
      timelineRef.current.pause().progress(progress);
      setIsPlaying(false);
    }
  };

  const nextEvent = () => {
    const newIndex = (activeIndex + 1) % events.length;
    handleEventClick(newIndex);
  };

  const prevEvent = () => {
    const newIndex = (activeIndex - 1 + events.length) % events.length;
    handleEventClick(newIndex);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (timelineRef.current) {
      if (isPlaying) {
        timelineRef.current.pause();
      } else {
        timelineRef.current.play();
      }
    }
  };

  return (
    <div className="timeline-container" ref={containerRef}>
      <div className="timeline-header">
        <h3>Event Roadmap</h3>
        <div className="timeline-controls">
          <button onClick={prevEvent} className="control-btn" aria-label="Previous event">
            <FaChevronLeft />
          </button>
          <button onClick={togglePlay} className="control-btn play-btn" aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={nextEvent} className="control-btn" aria-label="Next event">
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="timeline">
        {events.map((event, index) => (
          <div 
            key={event.id}
            className={`timeline-event ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleEventClick(index)}
          >
            <div className="event-icon">{event.icon}</div>
            <div className="event-date">{event.date}</div>
            <div className="event-dot"></div>
            <div className="event-line"></div>
          </div>
        ))}
      </div>
      <div className="event-details">
        <div className="event-title">{events[activeIndex].title}</div>
        <div className="event-info">
          <span className="info-item">
            <FaCalendarAlt /> {events[activeIndex].date}
          </span>
          <span className="info-item">
            <FaMapMarkerAlt /> {events[activeIndex].location}
          </span>
        </div>
        <p className="event-description">{events[activeIndex].description}</p>
      </div>
      <div className="drone-animation">
        <svg width="100%" height="100%" viewBox="0 0 1000 200" className="drone-path-svg">
          <path
            ref={pathRef}
            d="M50,150 C200,50 300,170 450,100 S700,150 850,80"
            fill="none"
            stroke="transparent"
            strokeWidth="2"
          />
        </svg>
        <div ref={droneRef} className="drone">
          <div className="drone-body">
            <div className="drone-rotor drone-rotor-front"></div>
            <div className="drone-rotor drone-rotor-back"></div>
            <div className="drone-rotor drone-rotor-left"></div>
            <div className="drone-rotor drone-rotor-right"></div>
            <div className="drone-camera"></div>
            <div className="drone-light"></div>
          </div>
        </div>
      </div>
      <div className="event-progress">
        {events.map((_, index) => (
          <button
            key={`progress-${index}`}
            className={`progress-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleEventClick(index)}
            aria-label={`Go to event ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventTimeline;
