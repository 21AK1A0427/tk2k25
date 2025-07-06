import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/games/playground.css";

const Playground = () => {
  const navigate = useNavigate();
  const [activeZone, setActiveZone] = useState("Fun Zone");
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [streakCount, setStreakCount] = useState(3);
  const [userPoints, setUserPoints] = useState(3080);
  const [showConfetti, setShowConfetti] = useState(false);

  // Event dates - October 18-19, 2025
  const eventStartDate = new Date("2025-10-18T00:00:00");
  const today = new Date();
  const eventStarted = today >= eventStartDate;

  // Zones data
  const zones = [
    { name: "Fun Zone", icon: "🎮", color: "#FF6B6B" },
    { name: "Brain Zone", icon: "🧠", color: "#4ECDC4" },
    { name: "Thrill Zone", icon: "🎢", color: "#FFBE0B" },
  ];

  // Games data
  const funZoneGames = [
    {
      id: "spin-the-wheel",
      title: "Spin the Wheel",
      description: "Try your luck & win daily prizes!",
      imgSrc: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c435c385-6f91-4ad1-a735-325f3fadd269.png",
      points: 100,
    },
    {
      id: "create-avatar",
      title: "Create Your Avatar",
      description: "Design a personalized character!",
      imgSrc: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ce7984b1-79bb-48cb-aa21-ce5ab97a5ef1.png",
      points: 150,
    },
    {
      id: "boom-or-bonus",
      title: "Boom or Bonus?",
      description: "What will you get inside mystery box?",
      imgSrc: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e34c7a98-e529-4614-afa4-17c68fb87be1.png",
      points: 200,
    },
    {
      id: "voice-battle",
      title: "Voice Battle",
      description: "Get loud and compete with others!",
      imgSrc: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a5df5948-f966-4351-a8f0-b8f8070928df.png",
      points: 120,
    },
  ];

  const brainZoneGames = [
    {
      id: "math-marathon",
      title: "Math Marathon",
      description: "Solve problems against the clock!",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/4479/4479707.png",
      points: 180,
    },
    {
      id: "memory-matrix",
      title: "Memory Matrix",
      description: "Test your pattern recognition!",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/3132/3132739.png",
      points: 160,
    },
    {
      id: "code-crack",
      title: "Code Crack",
      description: "Decipher the secret messages!",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/2881/2881142.png",
      points: 220,
    },
    {
      id: "trivia-titan",
      title: "Trivia Titan",
      description: "Prove your knowledge across categories!",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/3899/3899616.png",
      points: 150,
    },
  ];

  const thrillZoneGames = [
    {
      id: "speed-racer",
      title: "Speed Racer",
      description: "Race against time and opponents!",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/785/785116.png",
      points: 250,
    },
    {
      id: "zombie-survival",
      title: "Zombie Survival",
      description: "How long can you last?",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/3480/3480477.png",
      points: 300,
    },
    {
      id: "laser-maze",
      title: "Laser Maze",
      description: "Navigate through deadly lasers!",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/3281/3281289.png",
      points: 280,
    },
    {
      id: "gravity-flip",
      title: "Gravity Flip",
      description: "Defy physics in this mind-bending game!",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/3281/3281285.png",
      points: 270,
    },
  ];

  // Leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Ananya", points: 5720, days: 8, avatar: "👩‍💻" },
    { rank: 2, name: "Raj", points: 5280, days: 7, avatar: "👨‍🎤" },
    { rank: 3, name: "Neha", points: 4825, days: 4, avatar: "👩‍🎨" },
    { rank: 4, name: "You", points: userPoints, days: 5, avatar: "😎" },
    { rank: 5, name: "Priya", points: 2980, days: 6, avatar: "👩‍🍳" },
    { rank: 6, name: "Vikram", points: 2750, days: 5, avatar: "👨‍🔬" },
  ];

  // Daily challenge countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Event countdown
  const [eventTimeLeft, setEventTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Daily challenge countdown timer
    const dailyTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset for new day
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    // Event countdown timer
    const eventTimer = setInterval(() => {
      const now = new Date();
      const diff = eventStartDate - now;

      if (diff <= 0) {
        clearInterval(eventTimer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setEventTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(dailyTimer);
      clearInterval(eventTimer);
    };
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const handlePlayGame = (game) => {
    setCurrentGame(game);
    setShowPlayerForm(true);
  };

  const handleSubmitPlayerInfo = (e) => {
    e.preventDefault();
    if (playerName.trim() && rollNumber.trim()) {
      // In a real app, you would save this info to state/context/backend
      setShowPlayerForm(false);
      navigate(`/games/${currentGame.id}`);
      // This would navigate to the game page in full screen
      // The actual game component would be developed separately
    }
  };

  const addStreak = () => {
    setStreakCount(prev => prev + 1);
    setUserPoints(prev => prev + 50);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const getCurrentGames = () => {
    switch (activeZone) {
      case "Brain Zone":
        return brainZoneGames;
      case "Thrill Zone":
        return thrillZoneGames;
      default:
        return funZoneGames;
    }
  };

  return (
    <div className="game-platform">
      {/* Sci-fi Background Elements */}
      <div className="sci-fi-background">
        <div className="grid-lines"></div>
        <div className="floating-particles"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="confetti" style={{
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }} />
          ))}
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav className="game-navbar">
        <div className="nav-logo">
          <span className="logo-text">TRISHNA 2K25</span>
          <span className="logo-badge">GAME ZONE</span>
        </div>
        
        <div className="nav-links">
          <button 
            className={`nav-link ${activeZone === "Fun Zone" ? "active" : ""}`}
            onClick={() => setActiveZone("Fun Zone")}
          >
            <span className="link-icon">🎮</span> Fun Zone
          </button>
          <button 
            className={`nav-link ${activeZone === "Brain Zone" ? "active" : ""}`}
            onClick={() => setActiveZone("Brain Zone")}
          >
            <span className="link-icon">🧠</span> Brain Zone
          </button>
          <button 
            className={`nav-link ${activeZone === "Thrill Zone" ? "active" : ""}`}
            onClick={() => setActiveZone("Thrill Zone")}
          >
            <span className="link-icon">🎢</span> Thrill Zone
          </button>
        </div>
        
        <div className="nav-user">
          <div className="user-points">
            <span className="points-icon">🪙</span>
            <span className="points-value">{userPoints}</span>
          </div>
          <div className="user-avatar">😎</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="game-main-content">
        {/* Left Sidebar - Leaderboard */}
        <aside className="game-sidebar">
          <section className="sidebar-section">
            <h3 className="section-title">
              <span className="title-icon">🏆</span> LEADERBOARD
            </h3>
            
            <div className="leaderboard-top3">
              {leaderboardData.slice(0, 3).map((player) => (
                <div key={player.rank} className={`leaderboard-podium ${player.name === "You" ? "current-user" : ""}`}>
                  <div className="podium-rank">{player.rank}</div>
                  <div className="podium-avatar">{player.avatar}</div>
                  <div className="podium-info">
                    <span className="podium-name">{player.name}</span>
                    <span className="podium-points">{player.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="leaderboard-list">
              {leaderboardData.slice(3).map((player) => (
                <div key={player.rank} className={`leaderboard-item ${player.name === "You" ? "current-user" : ""}`}>
                  <span className="item-rank">{player.rank}</span>
                  <span className="item-avatar">{player.avatar}</span>
                  <span className="item-name">{player.name}</span>
                  <span className="item-points">{player.points}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Streak Section */}
          <section className="sidebar-section streak-section">
            <h3 className="section-title">
              <span className="title-icon">🔥</span> DAILY STREAK
            </h3>
            
            <div className="streak-container">
              <div className="streak-count">{streakCount} days</div>
              <div className="streak-bar">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`streak-day ${i < streakCount ? "active" : ""}`}
                    onClick={() => i < streakCount && addStreak()}
                  >
                    {i < streakCount ? "🔥" : i + 1}
                  </div>
                ))}
              </div>
              <button className="streak-button" onClick={addStreak}>
                Claim Today's Reward
              </button>
            </div>
          </section>
        </aside>

        {/* Center Content - Games */}
        <section className="game-content">
          {/* Daily Challenge Banner */}
          <div className="challenge-banner">
            <div className="banner-content">
              <div className="banner-text">
                <span className="banner-tag">DAILY CHALLENGE</span>
                <h2 className="banner-title">Mystery of the Day</h2>
                <p className="banner-desc">Complete today's special challenge for 200 bonus points!</p>
              </div>
              <div className="banner-timer">
                <span className="timer-icon">⏳</span>
                <span className="timer-text">
                  {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)} remaining
                </span>
              </div>
            </div>
            <button className="banner-button">
              PLAY NOW <span className="button-arrow">→</span>
            </button>
          </div>

          {/* Zone Title */}
          <div className="zone-header">
            <h2 className="zone-title">
              <span className="zone-icon">
                {zones.find(z => z.name === activeZone)?.icon}
              </span>
              {activeZone}
            </h2>
            <div className="zone-description">
              {activeZone === "Fun Zone" && "Casual games for quick fun and rewards"}
              {activeZone === "Brain Zone" && "Challenge your mind with puzzles and trivia"}
              {activeZone === "Thrill Zone" && "High-intensity games for adrenaline junkies"}
            </div>
          </div>

          {/* Games Grid */}
          <div className="games-grid">
            {getCurrentGames().map((game, index) => (
              <div key={index} className="game-card">
                <div className="game-card-inner">
                  <div className="game-card-front">
                    <div className="game-badge">+{game.points} pts</div>
                    <img
                      src={game.imgSrc}
                      alt={game.title}
                      className="game-image"
                    />
                    <h3 className="game-name">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                  </div>
                  <div className="game-card-back">
                    <h3 className="game-name">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="play-button"
                      onClick={() => handlePlayGame(game)}
                    >
                      PLAY NOW
                      <span className="button-icon">🎮</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Event Countdown Banner */}
      {!eventStarted && (
        <div className="event-countdown">
          <div className="countdown-content">
            <div className="countdown-text">
              <h3>TRISHNA 2K25 STARTS IN</h3>
              <div className="countdown-timer">
                <div className="countdown-unit">
                  <span className="unit-value">{formatTime(eventTimeLeft.days)}</span>
                  <span className="unit-label">DAYS</span>
                </div>
                <div className="countdown-unit">
                  <span className="unit-value">{formatTime(eventTimeLeft.hours)}</span>
                  <span className="unit-label">HRS</span>
                </div>
                <div className="countdown-unit">
                  <span className="unit-value">{formatTime(eventTimeLeft.minutes)}</span>
                  <span className="unit-label">MIN</span>
                </div>
                <div className="countdown-unit">
                  <span className="unit-value">{formatTime(eventTimeLeft.seconds)}</span>
                  <span className="unit-label">SEC</span>
                </div>
              </div>
            </div>
            <button className="countdown-button">
              REGISTER NOW <span className="button-arrow">→</span>
            </button>
          </div>
        </div>
      )}

      {/* Player Info Modal */}
      {showPlayerForm && (
        <div className="player-modal">
          <div className="modal-content">
            <h3 className="modal-title">Enter Your Details</h3>
            <p className="modal-subtitle">To play {currentGame?.title}</p>
            
            <form onSubmit={handleSubmitPlayerInfo}>
              <div className="form-group">
                <label htmlFor="playerName">Full Name</label>
                <input
                  type="text"
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="rollNumber">Roll Number</label>
                <input
                  type="text"
                  id="rollNumber"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowPlayerForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Start Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playground;