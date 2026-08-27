import StatsCard from "./StatsCard";

const CARDS = [
  {
    key: "totalAttempts",
    title: "Total Attempts",
    suffix: "",
    icon: "🎯",
    accent: "bg-gradient-to-r from-blue-500 to-blue-400",
  },
  {
    key: "bestScore",
    title: "Best Score",
    suffix: " pts",
    icon: "🏆",
    accent: "bg-gradient-to-r from-purple-500 to-purple-400",
  },
  {
    key: "averageScore",
    title: "Avg Score",
    suffix: " pts",
    icon: "📈",
    accent: "bg-gradient-to-r from-indigo-500 to-indigo-400",
  },
  {
    key: "averageAccuracy",
    title: "Avg Accuracy",
    suffix: "%",
    icon: "✅",
    accent: "bg-gradient-to-r from-emerald-500 to-emerald-400",
  },
];

function StatsSection({ stats, loading }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        Performance Overview
      </h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {CARDS.map((card) => (
          <StatsCard
            key={card.key}
            title={card.title}
            value={loading ? undefined : stats?.[card.key]}
            suffix={card.suffix}
            icon={card.icon}
            accent={card.accent}
          />
        ))}
      </div>
    </div>
  );
}

export default StatsSection;
