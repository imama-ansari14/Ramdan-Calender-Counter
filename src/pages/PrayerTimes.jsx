import usePrayerTimes from "../hooks/usePrayerTimes";

const PrayerTimesPage = () => {
  const { times, loading } = usePrayerTimes();

  if (loading) return <p>Loading prayer times...</p>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Prayer Times (Karachi)</h2>

      <div>Fajr: {times.Fajr}</div>
      <div>Dhuhr: {times.Dhuhr}</div>
      <div>Asr: {times.Asr}</div>
      <div>Maghrib: {times.Maghrib}</div>
      <div>Isha: {times.Isha}</div>
    </div>
  );
};

export default PrayerTimesPage;
