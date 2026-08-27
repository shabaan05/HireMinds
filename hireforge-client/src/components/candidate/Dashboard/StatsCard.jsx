function StatsCard({ title, value, suffix = "", accent, icon }) {
  return (
    <div
      className="group relative bg-gray-900 border border-white/5 rounded-2xl p-5
                 hover:border-white/10 hover:bg-gray-900/80
                 transition-all duration-200 overflow-hidden"
    >
      {/* Subtle top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${accent} opacity-60 group-hover:opacity-100 transition-opacity`} />

      <div className="space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <span className="text-base opacity-60 group-hover:opacity-100 transition-opacity">
            {icon}
          </span>
        </div>

        {/* Value */}
        <p className="text-3xl font-bold text-white leading-none tracking-tight">
          {value !== "—" && value !== undefined && value !== null
            ? `${value}${suffix}`
            : <span className="text-gray-600">—</span>
          }
        </p>
      </div>
    </div>
  );
}

export default StatsCard;
