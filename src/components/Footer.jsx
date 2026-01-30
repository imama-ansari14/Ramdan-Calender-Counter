import { Moon } from "lucide-react";
import { getRamadanYear } from "../data/ramadanDates";

const Footer = () => {
  const ramadanYear = getRamadanYear();

  return (
    <footer className="footer">
      <div className="container text-center">
        <p className="footer-text">May Allah accept our fasts and prayers</p>
        <div className="footer-icon">
          <Moon size={24} strokeWidth={1.5} />
        </div>
        <small className="footer-subtext">Ramadan Kareem {ramadanYear}</small>
      </div>
    </footer>
  );
};

export default Footer;
