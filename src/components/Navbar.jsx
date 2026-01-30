import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Ramadan App</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/prayers">Prayer Times</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/calendar">Calendar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/schedule">Schedule</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
