function PerformanceSummary({ attempts = [] }) {
  if (attempts.length === 0) return null;

  const withPct = attempts
    .filter((a) => a.totalMarks > 0)
    .map((a) => Math.round((a.score / a.totalMarks) * 100));

  const total = attempts.length;
  const bestPct = withPct.length > 0 ? Math.max(...withPct) : null;
  const avgPct =
    withPct.length > 0
      ? Math.round(withPct.reduce((s, v) => s + v, 0) / withPct.length)
      : null;

  let trend = null;
  if (withPct.length >= 2) {
    const diff = withPct[0] - withPct[1];
    if (diff > 0)
      trend = { label: `↑ ${diff}% vs previous`, color: "text-emerald-400" };
    else if (diff < 0)
      trend = { label: `↓ ${Math.abs(diff)}% vs previous`, color: "text-red-400" };
    else
      trend = { label: "→ Same as previous", color: "text-gray-400" };
  }

  const rows = [
    { label: "Total Attempts", value: total, valueClass: "text-blue-400" },
    bestPct !== null
      ? { label: "Best Score", value: `${bestPct}%`, valueClass: "text-purple-400" }
      : null,
    avgPct !== null
      ? { label: "Avg Score", value: `${avgPct}%`, valueClass: "text-indigo-400" }
      : null,
    trend
      ? { label: "Latest Trend", value: trend.label, valueClass: trend.color }
      : null,
  ].filter(Boolean);

  return (
    <div className="bg-gray-900 border border-white/5 rounded-2xl p-5 space-y-4 h-full flex flex-col">
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Summary
        </h2>
        <p className="text-xs text-gray-600 mt-0.5">Based on completed attempts</p>
      </div>

      <div className="flex-1 space-y-1">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-3 py-3 rounded-xl
                        ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
          >
            <span className="text-xs text-gray-500">{row.label}</span>
            <span className={`text-sm font-semibold ${row.valueClass}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformanceSummary;
