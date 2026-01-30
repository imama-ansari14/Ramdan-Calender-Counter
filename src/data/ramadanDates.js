// Ramadan dates map
export const RAMADAN_DATES = {
  2026: { start: "2026-02-18", end: "2026-03-19" },
  2027: { start: "2027-02-08", end: "2027-03-09" },
  2028: { start: "2028-01-28", end: "2028-02-26" },
};

// Get current year
export const CURRENT_YEAR = new Date().getFullYear();

// Pick current or next Ramadan
export const getRamadanYear = () => {
  return RAMADAN_DATES[CURRENT_YEAR] ? CURRENT_YEAR : CURRENT_YEAR + 1;
};

export const getRamadanDates = () => {
  const ramadanYear = getRamadanYear();
  return {
    start: new Date(`${RAMADAN_DATES[ramadanYear].start}T00:00:00`),
    end: new Date(`${RAMADAN_DATES[ramadanYear].end}T23:59:59`),
    year: ramadanYear
  };
};