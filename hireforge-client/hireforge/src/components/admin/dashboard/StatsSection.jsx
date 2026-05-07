import StatsCard from "./StatsCard";

function StatsSection({ stats }) {

return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    <StatsCard
      title="Total Users"
      value={stats.totalUsers}
      color="blue"
    />

    <StatsCard
      title="Total Interviews"
      value={stats.totalInterviews}
      color="purple"
    />

    <StatsCard
      title="Active Interviews"
      value={stats.activeInterviews}
      color="green"
    />

    <StatsCard
      title="Total Attempts"
      value={stats.totalAttempts}
      color="orange"
    />

  </div>
);
}

export default StatsSection;