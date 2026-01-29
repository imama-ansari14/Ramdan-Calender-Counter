import PrayerTimesPage from "./pages/PrayerTimesPage";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Moon,
  Sun,
  Sunrise,
  Sunset,
  CloudSun,
  Star,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Get current year
const CURRENT_YEAR = new Date().getFullYear();
// Ramadan dates map (you can extend yearly if needed)
const RAMADAN_DATES = {
  2026: { start: "2026-02-18", end: "2026-03-19" }, // 30 days approx
  2027: { start: "2027-02-08", end: "2027-03-09" },
  2028: { start: "2028-01-28", end: "2028-02-26" },
};

// Pick current or next Ramadan
const ramadanYear = RAMADAN_DATES[CURRENT_YEAR]
  ? CURRENT_YEAR
  : CURRENT_YEAR + 1;

const RAMADAN_START = new Date(`${RAMADAN_DATES[ramadanYear].start}T00:00:00`);

const RAMADAN_END = new Date(`${RAMADAN_DATES[ramadanYear].end}T23:59:59`);

// Always between 29-30 days
const RAMADAN_DAYS =
  Math.round((RAMADAN_END - RAMADAN_START) / (1000 * 60 * 60 * 24)) + 1;

// Prayer times for Karachi
const PRAYER_TIMES = {
  fajr: "05:30",
  sunrise: "06:50",
  dhuhr: "12:45",
  asr: "16:15",
  maghrib: "18:35",
  isha: "20:00",
};

// Generate Ramadan Schedule
const TOTAL_DAYS = 30; // Ramadan 2026 approx

const generateRamadanSchedule = () => {
  const schedule = [];

  // Starting & ending realistic times (in minutes)
  const sehriStart = 5 * 60 + 47; // 05:47
  const sehriEnd = 5 * 60 + 57; // 05:57

  const iftarStart = 18 * 60 + 25; // 06:25 PM
  const iftarEnd = 18 * 60 + 19; // 06:19 PM

  for (let i = 0; i < TOTAL_DAYS; i++) {
    const date = new Date(RAMADAN_START);
    date.setDate(date.getDate() + i);

    // Gradual change calculation
    const sehriTime =
      sehriStart + ((sehriEnd - sehriStart) / (TOTAL_DAYS - 1)) * i;

    const iftarTime =
      iftarStart + ((iftarEnd - iftarStart) / (TOTAL_DAYS - 1)) * i;

    const formatTime = (minutes) => {
      const h = Math.floor(minutes / 60);
      const m = Math.round(minutes % 60);
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    };

    const sehri = formatTime(sehriTime);
    const iftar = formatTime(iftarTime);

    schedule.push({
      day: i + 1,
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      sehri, // also fajr
      iftar, // also maghrib
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
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })
      );

      const difference = RAMADAN_START - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
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
          <div className="moon-icon-large mb-3">
            <Moon size={64} strokeWidth={1.5} />
          </div>
          <h1 className="display-3 ramadan-title mb-3">رمضان كريم</h1>
          <h2 className="display-5 subtitle mb-4">Ramadan Mubarak</h2>
          <p className="lead description">The blessed month is approaching</p>
        </div>

        <div className="row g-4 justify-content-center mb-5">
          <div className="col-6 col-md-3">
            <div className="countdown-card text-center p-4">
              <div className="countdown-number">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <div className="countdown-label">Days</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="countdown-card text-center p-4">
              <div className="countdown-number">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="countdown-label">Hours</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="countdown-card text-center p-4">
              <div className="countdown-number">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="countdown-label">Minutes</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="countdown-card text-center p-4">
              <div className="countdown-number">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
        </div>

        <div
          className="premium-info-card mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <div className="card-header-custom">
            <Calendar size={28} />
            <h3 className="mb-0">Ramadan {ramadanYear}- Karachi</h3>
          </div>
          <div className="card-body-custom">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="info-box">
                  <div className="info-box-icon">
                    <Moon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="info-box-content">
                    <div className="info-box-label">Starting Date</div>
                    <div className="info-box-value">
                      {RAMADAN_START.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box">
                  <div className="info-box-icon">
                    <Star size={32} strokeWidth={1.5} />
                  </div>
                  <div className="info-box-content">
                    <div className="info-box-label">Ending Date</div>
                    <div className="info-box-value">
                      {RAMADAN_END.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="duration-bar mt-4">
              <div className="duration-info">
                <MapPin size={18} />
                <span>Karachi, Pakistan</span>
              </div>
              <div className="duration-days">
                <span>30 Days of Blessings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============= CALENDAR PAGE =============
const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="calendar-page">
      <div className="container py-5">
        <div className="page-header text-center mb-5">
          <Calendar size={48} className="mb-3" />
          <h2 className="page-title">Ramadan Calendar {ramadanYear}</h2>
          <p className="page-subtitle">
            Click any day to view detailed timings
          </p>
        </div>

        <div className="row g-3 mb-4">
          {RAMADAN_SCHEDULE.map((day) => (
            <div key={day.day} className="col-6 col-md-4 col-lg-3">
              <div
                className={`calendar-day-card ${
                  selectedDay === day.day ? "selected" : ""
                }`}
                onClick={() => setSelectedDay(day.day)}
              >
                <div className="day-number">Day {day.day}</div>
                <div className="day-date">{day.date}</div>
                <div className="day-times mt-2">
                  <small className="d-block">Sehri: {day.sehri}</small>
                  <small className="d-block">Iftar: {day.iftar}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedDay && (
          <div className="detail-card-premium">
            <div className="detail-card-header">
              <h4>
                Day {selectedDay} - {RAMADAN_SCHEDULE[selectedDay - 1].date}
              </h4>
            </div>
            <div className="detail-card-body">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="timing-section">
                    <h5 className="timing-title">
                      <Moon size={20} />
                      Meal Times
                    </h5>
                    <div className="timing-item">
                      <span className="timing-label">Sehri (Pre-dawn)</span>
                      <span className="timing-value">
                        {RAMADAN_SCHEDULE[selectedDay - 1].sehri}
                      </span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-label">Iftar (Break Fast)</span>
                      <span className="timing-value">
                        {RAMADAN_SCHEDULE[selectedDay - 1].iftar}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="timing-section">
                    <h5 className="timing-title">
                      <Clock size={20} />
                      Prayer Times
                    </h5>
                    <div className="timing-item">
                      <span className="timing-label">Fajr</span>
                      <span className="timing-value">
                        {RAMADAN_SCHEDULE[selectedDay - 1].fajr}
                      </span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-label">Dhuhr</span>
                      <span className="timing-value">
                        {RAMADAN_SCHEDULE[selectedDay - 1].dhuhr}
                      </span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-label">Asr</span>
                      <span className="timing-value">
                        {RAMADAN_SCHEDULE[selectedDay - 1].asr}
                      </span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-label">Maghrib</span>
                      <span className="timing-value">
                        {RAMADAN_SCHEDULE[selectedDay - 1].maghrib}
                      </span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-label">Isha</span>
                      <span className="timing-value">
                        {RAMADAN_SCHEDULE[selectedDay - 1].isha}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============= PRAYER TIMES PAGE =============
const PrayerTimesPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentPrayer = () => {
    const timeStr = currentTime.toTimeString().slice(0, 5);
    const prayers = [
      { name: "Fajr", time: PRAYER_TIMES.fajr },
      { name: "Sunrise", time: PRAYER_TIMES.sunrise },
      { name: "Dhuhr", time: PRAYER_TIMES.dhuhr },
      { name: "Asr", time: PRAYER_TIMES.asr },
      { name: "Maghrib", time: PRAYER_TIMES.maghrib },
      { name: "Isha", time: PRAYER_TIMES.isha },
    ];

    for (let i = 0; i < prayers.length; i++) {
      if (timeStr < prayers[i].time) {
        return {
          current: i > 0 ? prayers[i - 1].name : "Isha",
          next: prayers[i],
        };
      }
    }
    return { current: "Isha", next: prayers[0] };
  };

  const prayerInfo = getCurrentPrayer();

  return (
    <div className="prayer-page">
      <div className="container py-5">
        <div className="page-header text-center mb-5">
          <Clock size={48} className="mb-3" />
          <h2 className="page-title">Daily Prayer Times</h2>
          <p className="page-subtitle">Karachi, Pakistan</p>
        </div>

        <div className="text-center mb-5">
          <div className="current-time-card">
            <Clock size={32} className="mb-2" />
            <div className="current-time-display">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
            <div className="prayer-status mt-3">
              <span className="status-badge current">
                Current: {prayerInfo.current}
              </span>
              <span className="status-badge next">
                Next: {prayerInfo.next.name} at {prayerInfo.next.time}
              </span>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-4">
            <div className="prayer-card-premium fajr">
              <div className="prayer-card-icon">
                <Sunrise size={40} strokeWidth={1.5} />
              </div>
              <h4 className="prayer-card-title">Fajr</h4>
              <div className="prayer-card-time">{PRAYER_TIMES.fajr}</div>
              <div className="prayer-card-desc">Dawn Prayer</div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="prayer-card-premium sunrise">
              <div className="prayer-card-icon">
                <Sun size={40} strokeWidth={1.5} />
              </div>
              <h4 className="prayer-card-title">Sunrise</h4>
              <div className="prayer-card-time">{PRAYER_TIMES.sunrise}</div>
              <div className="prayer-card-desc">Sun Rising</div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="prayer-card-premium dhuhr">
              <div className="prayer-card-icon">
                <Sun size={40} strokeWidth={1.5} />
              </div>
              <h4 className="prayer-card-title">Dhuhr</h4>
              <div className="prayer-card-time">{PRAYER_TIMES.dhuhr}</div>
              <div className="prayer-card-desc">Noon Prayer</div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="prayer-card-premium asr">
              <div className="prayer-card-icon">
                <CloudSun size={40} strokeWidth={1.5} />
              </div>
              <h4 className="prayer-card-title">Asr</h4>
              <div className="prayer-card-time">{PRAYER_TIMES.asr}</div>
              <div className="prayer-card-desc">Afternoon Prayer</div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="prayer-card-premium maghrib">
              <div className="prayer-card-icon">
                <Sunset size={40} strokeWidth={1.5} />
              </div>
              <h4 className="prayer-card-title">Maghrib</h4>
              <div className="prayer-card-time">{PRAYER_TIMES.maghrib}</div>
              <div className="prayer-card-desc">Sunset Prayer</div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="prayer-card-premium isha">
              <div className="prayer-card-icon">
                <Moon size={40} strokeWidth={1.5} />
              </div>
              <h4 className="prayer-card-title">Isha</h4>
              <div className="prayer-card-time">{PRAYER_TIMES.isha}</div>
              <div className="prayer-card-desc">Night Prayer</div>
            </div>
          </div>
        </div>

        <div className="location-banner">
          <MapPin size={24} />
          <div className="location-content">
            <h5>Karachi, Pakistan</h5>
            <p>
              Prayer times are calculated for Karachi. Times may vary by a few
              minutes based on your exact location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============= SCHEDULE PAGE =============
const SchedulePage = () => {
  return (
    <div className="schedule-page">
      <div className="container py-5">
        <div className="page-header text-center mb-5">
          <Calendar size={48} className="mb-3" />
          <h2 className="page-title">Complete Ramadan Schedule</h2>
          <p className="page-subtitle">Sehri & Iftar timings for all 30 days</p>
        </div>

        <div className="schedule-card-premium">
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Sehri / Fajr</th>
                  <th>Iftar / Maghrib</th>
                </tr>
              </thead>
              <tbody>
                {RAMADAN_SCHEDULE.map((day) => (
                  <tr key={day.day}>
                    <td>
                      <span className="day-badge">{day.day}</span>
                    </td>
                    <td className="date-cell">{day.date}</td>
                    <td className="sehri-cell">{day.sehri}</td>
                    <td className="iftar-cell">{day.iftar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row mt-5 g-4">
          <div className="col-md-6">
            <div className="info-banner sehri-banner">
              <div className="info-banner-icon">
                <Moon size={32} strokeWidth={1.5} />
              </div>
              <div className="info-banner-content">
                <h5>Sehri (Pre-dawn Meal)</h5>
                <p>
                  Sehri should be completed before Fajr prayer begins. It's
                  recommended to eat sehri as late as possible within the
                  permissible time.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-banner iftar-banner">
              <div className="info-banner-icon">
                <Sunset size={32} strokeWidth={1.5} />
              </div>
              <div className="info-banner-content">
                <h5>Iftar (Breaking Fast)</h5>
                <p>
                  Break your fast at Maghrib time with dates and water,
                  following the Sunnah of Prophet Muhammad (PBUH).
                </p>
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
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <Moon className="brand-icon" size={32} strokeWidth={1.5} />
          <span className="brand-text">Ramadan {ramadanYear}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Countdown
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/calendar" ? "active" : ""
                }`}
                to="/calendar"
              >
                Calendar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/prayers" ? "active" : ""
                }`}
                to="/prayers"
              >
                Prayer Times
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/schedule" ? "active" : ""
                }`}
                to="/schedule"
              >
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
        <footer className="footer">
          <div className="container text-center">
            <p className="footer-text">
              May Allah accept our fasts and prayers
            </p>
            <div className="footer-icon">
              <Moon size={24} strokeWidth={1.5} />
            </div>
            <small className="footer-subtext">
              Ramadan Kareem {ramadanYear}
            </small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
