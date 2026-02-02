import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg  custom-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-icon">🌙</span>
          <span className="brand-text">Ramadan 2025</span>
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
            <li className="nav-item d-flex justify-content-center">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Countdown
              </Link>
            </li>

            <li className="nav-item d-flex justify-content-center">
              <Link
                className={`nav-link ${
                  location.pathname === "/calendar" ? "active" : ""
                }`}
                to="/calendar"
              >
                Calendar
              </Link>
            </li>

            <li className="nav-item d-flex justify-content-center">
              <Link
                className={`nav-link ${
                  location.pathname === "/prayers" ? "active" : ""
                }`}
                to="/prayers"
              >
                Prayer Times
              </Link>
            </li>

            <li className="nav-item d-flex justify-content-center">
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

export default Navbar;
