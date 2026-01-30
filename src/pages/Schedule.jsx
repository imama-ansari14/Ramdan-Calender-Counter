import { Calendar, Moon, Sunset } from "lucide-react";
import ScheduleTable from "../components/SheduleTable";
import { RAMADAN_SCHEDULE } from "../data/ramadanShedule";

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
          <ScheduleTable schedule={RAMADAN_SCHEDULE} />
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

export default SchedulePage;
