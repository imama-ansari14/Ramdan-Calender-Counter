const CountdownCard = ({ number, label }) => {
  return (
    <div className="countdown-card text-center p-4">
      <div className="countdown-number">{String(number).padStart(2, "0")}</div>
      <div className="countdown-label">{label}</div>
    </div>
  );
};

export default CountdownCard;
