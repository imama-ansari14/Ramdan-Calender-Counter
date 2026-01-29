import { useEffect, useState } from "react";

const usePrayerTimes = () => {
  const [times, setTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.aladhan.com/v1/timingsByCity?city=Karachi&country=Pakistan&method=2"
    )
      .then(res => res.json())
      .then(data => {
        setTimes(data.data.timings);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return { times, loading };
};

export default usePrayerTimes;
