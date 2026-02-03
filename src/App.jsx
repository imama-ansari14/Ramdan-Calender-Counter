import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import CalendarPage from "./pages/Calendar";
import PrayerTimesPage from "./pages/PrayerTimes";
import SchedulePage from "./pages/Schedule";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/prayers" element={<PrayerTimesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
