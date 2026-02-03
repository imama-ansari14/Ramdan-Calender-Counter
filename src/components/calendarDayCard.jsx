const CalendarDayCard = ({ day, date, sehri, iftar, isSelected, onClick }) => {
  return (
    <div
      className={`calendar-day-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(day)}
    >
      <div className="day-number">Day {day}</div>
      <div className="day-date">{date}</div>
      <div className="day-times mt-2">
        <small className="d-block">Sehri: {sehri}</small>
        <small className="d-block">Iftar: {iftar}</small>
      </div>
    </div>
  );
};

export default CalendarDayCard;
