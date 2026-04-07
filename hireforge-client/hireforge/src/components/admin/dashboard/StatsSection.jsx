import StatsCard from "./StatsCard";

function StatsSection({ stats }) {

  return (
    <div style={{ display: "flex", gap: "20px" }}>

      <StatsCard title="Total Users" value={stats.totalUsers} />
      <StatsCard title="Total Interviews" value={stats.totalInterviews} />
      <StatsCard title="Active Interviews" value={stats.activeInterviews} />
      <StatsCard title="Total Attempts" value={stats.totalAttempts} />

    </div>
  );
}

export default StatsSection;