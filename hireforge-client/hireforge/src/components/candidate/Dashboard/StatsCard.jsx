function StatsCard({ title, value }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "150px" }}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

export default StatsCard;