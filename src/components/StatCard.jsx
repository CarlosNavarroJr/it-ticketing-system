function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <p className="stat-card-title">{title}</p>

        <div className="stat-card-icon" style={{ color: color }}>
          <Icon size={24} />
        </div>
      </div>

      <h2 className="stat-card-value">{value}</h2>
    </div>
  );
}

export default StatCard;
