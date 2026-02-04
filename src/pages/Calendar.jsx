import { useState } from "react";
import { Calendar, Clock, Moon } from "lucide-react";
import CalendarDayCard from "../components/calendarDayCard";
import { RAMADAN_SCHEDULE } from "../data/ramadanShedule";
import { STATIC_PRAYER_TIMES } from "../data/PrayerTimes";

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="calendar-page">
      <div className="container py-5">
        <div className="page-header text-center mb-5">
          <Calendar size={48} className="mb-3" />
          <h2 className="page-title">Ramadan Calendar</h2>
          <p className="page-subtitle">
            Click any day to view detailed timings
          </p>
        </div>

        <div className="row g-3 mb-4">
          {RAMADAN_SCHEDULE.map((day) => (
            <div key={day.day} className="col-6 col-md-4 col-lg-3">
              <CalendarDayCard
                day={day.day}
                date={day.date}
                sehri={day.sehri}
                iftar={day.iftar}
                isSelected={selectedDay === day.day}
                onClick={setSelectedDay}
              />
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
                        {STATIC_PRAYER_TIMES.fajr}
                      </span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-label">Dhuhr</span>
                      <span className="timing-value">
                        {STATIC_PRAYER_TIMES.dhuhr}
                      </span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-label">Asr</span>
                      <span className="timing-value">
                        {STATIC_PRAYER_TIMES.asr}
                      </span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-label">Maghrib</span>
                      <span className="timing-value">
                        {STATIC_PRAYER_TIMES.maghrib}
                      </span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-label">Isha</span>
                      <span className="timing-value">
                        {STATIC_PRAYER_TIMES.isha}
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

export default CalendarPage;