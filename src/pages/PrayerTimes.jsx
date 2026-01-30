import { useState, useEffect } from "react";
import {
  Clock,
  MapPin,
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  Moon,
} from "lucide-react";
import PrayerCard from "../components/PrayerCard";
import { STATIC_PRAYER_TIMES } from "../data/PrayerTimes";

const PrayerTimesPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentPrayer = () => {
    const timeStr = currentTime.toTimeString().slice(0, 5);
    const prayers = [
      { name: "Fajr", time: STATIC_PRAYER_TIMES.fajr },
      { name: "Sunrise", time: STATIC_PRAYER_TIMES.sunrise },
      { name: "Dhuhr", time: STATIC_PRAYER_TIMES.dhuhr },
      { name: "Asr", time: STATIC_PRAYER_TIMES.asr },
      { name: "Maghrib", time: STATIC_PRAYER_TIMES.maghrib },
      { name: "Isha", time: STATIC_PRAYER_TIMES.isha },
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
            <PrayerCard
              title="Fajr"
              time={STATIC_PRAYER_TIMES.fajr}
              description="Dawn Prayer"
              icon={Sunrise}
              className="fajr"
            />
          </div>

          <div className="col-md-6 col-lg-4">
            <PrayerCard
              title="Sunrise"
              time={STATIC_PRAYER_TIMES.sunrise}
              description="Sun Rising"
              icon={Sun}
              className="sunrise"
            />
          </div>

          <div className="col-md-6 col-lg-4">
            <PrayerCard
              title="Dhuhr"
              time={STATIC_PRAYER_TIMES.dhuhr}
              description="Noon Prayer"
              icon={Sun}
              className="dhuhr"
            />
          </div>

          <div className="col-md-6 col-lg-4">
            <PrayerCard
              title="Asr"
              time={STATIC_PRAYER_TIMES.asr}
              description="Afternoon Prayer"
              icon={CloudSun}
              className="asr"
            />
          </div>

          <div className="col-md-6 col-lg-4">
            <PrayerCard
              title="Maghrib"
              time={STATIC_PRAYER_TIMES.maghrib}
              description="Sunset Prayer"
              icon={Sunset}
              className="maghrib"
            />
          </div>

          <div className="col-md-6 col-lg-4">
            <PrayerCard
              title="Isha"
              time={STATIC_PRAYER_TIMES.isha}
              description="Night Prayer"
              icon={Moon}
              className="isha"
            />
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

export default PrayerTimesPage;
