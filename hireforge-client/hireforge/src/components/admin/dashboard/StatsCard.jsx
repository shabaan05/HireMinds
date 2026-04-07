function StatsCard({ title, value }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", width: "180px" }}>
      <h4>{title}</h4>
      <p>{value || 0}</p>
    </div>
  );
}

export default StatsCard;