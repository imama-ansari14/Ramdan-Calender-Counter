const PrayerCard = ({
  title,
  time,
  description,
  icon: Icon,
  className = "",
}) => {
  return (
    <div className={`prayer-card-premium ${className}`}>
      <div className="prayer-card-icon">
        <Icon size={40} strokeWidth={1.5} />
      </div>
      <h4 className="prayer-card-title">{title}</h4>
      <div className="prayer-card-time">{time}</div>
      <div className="prayer-card-desc">{description}</div>
    </div>
  );
};

export default PrayerCard;
