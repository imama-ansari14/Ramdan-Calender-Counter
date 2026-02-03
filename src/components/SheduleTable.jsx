const ScheduleTable = ({ schedule }) => {
  return (
    <div className="table-responsive">
      <table className="premium-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Sehri / Fajr</th>
            <th>Iftar / Maghrib</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((day) => (
            <tr key={day.day}>
              <td>
                <span className="day-badge">{day.day}</span>
              </td>
              <td className="date-cell">{day.date}</td>
              <td className="sehri-cell">{day.sehri}</td>
              <td className="iftar-cell">{day.iftar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
