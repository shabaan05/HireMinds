function StatsCard({ title, value }) {
return (
  <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-5 overflow-hidden">

    {/* GLOW EFFECT */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl opacity-50"></div>

    {/* CONTENT */}
    <div className="relative z-10">

      {/* TITLE */}
      <h4 className="text-sm text-gray-400">
        {title}
      </h4>

      {/* VALUE */}
      <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        {value}
      </p>

    </div>

  </div>
);
}

export default StatsCard;