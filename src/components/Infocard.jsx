const InfoCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="info-box">
      <div className="info-box-icon">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div className="info-box-content">
        <div className="info-box-label">{title}</div>
        <div className="info-box-value">{value}</div>
      </div>
    </div>
  );
};

export default InfoCard;