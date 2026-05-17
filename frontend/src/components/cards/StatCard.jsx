export default function StatCard({ label, value, icon: Icon, trend, progress = 0 }) {
  const width = typeof progress === "number" ? `${progress}%` : progress;

  return (
    <article className="stat-card">
      <div className="stat-card__head">
        <span>{Icon && <Icon />}</span>
        <small>{width}</small>
      </div>
      <p>{label}</p>
      <h3>{value}</h3>
      <div className="stat-card__meter">
        <i style={{ width }} />
      </div>
      {trend && <em>{trend}</em>}
    </article>
  );
}
