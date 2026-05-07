import StatsCard from "./StatsCard";

function StatsSection() {

  const stats = [
    { title: "Total Attempts", value: 5 },
    { title: "Best Score", value: "9/10" },
    { title: "Average Score", value: "7.5" }
  ];

  return (
  <div className="space-y-4">

    {/* HEADER */}
    <h3 className="text-xl font-semibold text-gray-100">
      Your Stats
    </h3>

    {/* STATS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-5 
                     hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] 
                     transition duration-300"
        >
          <StatsCard
            title={stat.title}
            value={stat.value}
          />
        </div>
      ))}

    </div>

  </div>
);
}

export default StatsSection;