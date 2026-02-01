import { useState, useEffect, useMemo } from "react";
import { Moon, Calendar, MapPin, Star } from "lucide-react";
import CountdownCard from "../components/Countdown";
import InfoCard from "../components/Infocard";
import { getRamadanDates } from "../data/ramadanDates";

const HomePage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ✅ Memoize so it doesn't recreate on every render
  const ramadanDates = useMemo(() => getRamadanDates(), []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })
      );

      const difference = ramadanDates.start - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    // Run once immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [ramadanDates]); // ✅ safe dependency now

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
            <CountdownCard number={timeLeft.days} label="Days" />
          </div>

          <div className="col-6 col-md-3">
            <CountdownCard number={timeLeft.hours} label="Hours" />
          </div>

          <div className="col-6 col-md-3">
            <CountdownCard number={timeLeft.minutes} label="Minutes" />
          </div>

          <div className="col-6 col-md-3">
            <CountdownCard number={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        <div
          className="premium-info-card mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <div className="card-header-custom">
            <Calendar size={28} />
            <h3 className="mb-0">Ramadan {ramadanDates.year} - Karachi</h3>
          </div>

          <div className="card-body-custom">
            <div className="row g-4">
              <div className="col-md-6">
                <InfoCard
                  title="Starting Date"
                  value={ramadanDates.start.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  icon={Moon}
                />
              </div>

              <div className="col-md-6">
                <InfoCard
                  title="Ending Date"
                  value={ramadanDates.end.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  icon={Star}
                />
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

export default HomePage;