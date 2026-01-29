import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Ramadan 2025 starts on February 28, 2025 (estimated)
const RAMADAN_START = new Date('2025-02-28T00:00:00');
const RAMADAN_DAYS = 30;

// Prayer times for Karachi (example times)
const PRAYER_TIMES = {
  fajr: '05:30',
  sunrise: '06:50',
  dhuhr: '12:45',
  asr: '16:15',
  maghrib: '18:35',
  isha: '20:00'
};

// Sehri and Iftar times for each day of Ramadan
const generateRamadanSchedule = () => {
  const schedule = [];
  for (let i = 0; i < RAMADAN_DAYS; i++) {
    const date = new Date(RAMADAN_START);
    date.setDate(date.getDate() + i);
    
    schedule.push({
      day: i + 1,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sehri: '05:20',
      iftar: '18:35',
      fajr: PRAYER_TIMES.fajr,
      dhuhr: PRAYER_TIMES.dhuhr,
      asr: PRAYER_TIMES.asr,
      maghrib: PRAYER_TIMES.maghrib,
      isha: PRAYER_TIMES.isha
    });
  }
  return schedule;
};

const RAMADAN_SCHEDULE = generateRamadanSchedule();

// ============= COUNTDOWN PAGE =============
const CountdownPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = RAMADAN_START - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-page">
      <div className="islamic-pattern"></div>
      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-5">
          <h1 className="display-3 ramadan-title mb-3">رمضان كريم</h1>
          <h2 className="display-5 text-light mb-4">Ramadan Mubarak</h2>
          <p className="lead text-light-subtle">The blessed month is approaching</p>
        </div>

        <div className="row g-4 justify-content-center mb-5">
          <div className="col-6 col-md-3">
            <div className="countdown-card text-center p-4">
              <div className="countdown-number">{timeLeft.days}</div>
              <div className="countdown-label">Days</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="countdown-card text-center p-4">
              <div className="countdown-number">{timeLeft.hours}</div>
              <div className="countdown-label">Hours</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="countdown-card text-center p-4">
              <div className="countdown-number">{timeLeft.minutes}</div>
              <div className="countdown-label">Minutes</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="countdown-card text-center p-4">
              <div className="countdown-number">{timeLeft.seconds}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
        </div>

        <div className="card info-card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4">Ramadan 2025</h3>
            <div className="row text-center">
              <div className="col-6 mb-3">
                <div className="info-item">
                  <div className="info-icon mb-2">🌙</div>
                  <div className="info-label">Starts</div>
                  <div className="info-value">Feb 28, 2025</div>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="info-item">
                  <div className="info-icon mb-2">⭐</div>
                  <div className="info-label">Ends</div>
                  <div className="info-value">Mar 29, 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

// ============= NAVIGATION COMPONENT =============
const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-icon">🌙</span>
          <span className="brand-text">Ramadan 2025</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                Countdown
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/calendar' ? 'active' : ''}`} to="/calendar">
                Calendar
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/prayers' ? 'active' : ''}`} to="/prayers">
                Prayer Times
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/schedule' ? 'active' : ''}`} to="/schedule">
                Full Schedule
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// ============= MAIN APP COMPONENT =============
function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<CountdownPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/prayers" element={<PrayerTimesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
        <footer className="footer text-center py-4">
          <div className="container">
            <p className="mb-1">May Allah accept our fasts and prayers</p>
            <small className="text-muted">Ramadan Kareem 🌙</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;