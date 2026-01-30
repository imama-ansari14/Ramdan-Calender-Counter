import { getRamadanDates } from "../data/ramadanDates";

export const generateRamadanSchedule = () => {
    const TOTAL_DAYS = 30;
    const schedule = [];

    const { start: RAMADAN_START } = getRamadanDates();

    // Starting & ending realistic times (in minutes)
    const sehriStart = 5 * 60 + 47; // 05:47
    const sehriEnd = 5 * 60 + 57; // 05:57
    const iftarStart = 18 * 60 + 25; // 06:25 PM
    const iftarEnd = 18 * 60 + 19; // 06:19 PM

    for (let i = 0; i < TOTAL_DAYS; i++) {
        const date = new Date(RAMADAN_START);
        date.setDate(date.getDate() + i);

        // Gradual change calculation
        const sehriTime = sehriStart + ((sehriEnd - sehriStart) / (TOTAL_DAYS - 1)) * i;
        const iftarTime = iftarStart + ((iftarEnd - iftarStart) / (TOTAL_DAYS - 1)) * i;

        const formatTime = (minutes) => {
            const h = Math.floor(minutes / 60);
            const m = Math.round(minutes % 60);
            return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        };

        schedule.push({
            day: i + 1,
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            sehri: formatTime(sehriTime),
            iftar: formatTime(iftarTime),
        });
    }

    return schedule;
};

export const RAMADAN_SCHEDULE = generateRamadanSchedule();