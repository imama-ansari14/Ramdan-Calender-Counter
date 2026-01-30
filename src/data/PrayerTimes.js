import { useEffect, useState } from "react";

const usePrayerTimes = () => {
  const [times, setTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=Karachi&country=Pakistan&method=2`
    )
      .then(res => res.json())
      .then(data => {
        setTimes(data.data.timings);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching prayer times:", error);
        setLoading(false);
      });
  }, []);

  return { times, loading };
};

export default usePrayerTimes;

// Static prayer times fallback for Karachi
export const STATIC_PRAYER_TIMES = {
  fajr: "05:30",
  sunrise: "06:50",
  dhuhr: "12:45",
  asr: "16:15",
  maghrib: "18:35",
  isha: "20:00",
};