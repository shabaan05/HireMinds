import StatsCard from "./StatsCard";

function StatsSection() {

  const stats = [
    { title: "Total Attempts", value: 5 },
    { title: "Best Score", value: "9/10" },
    { title: "Average Score", value: "7.5" }
  ];

  return (
    <div>
      <h3>Your Stats</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

    </div>
  );
}

export default StatsSection;