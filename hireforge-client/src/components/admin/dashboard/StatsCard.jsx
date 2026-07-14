function StatsCard({ title, value }) {
return (
  <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center justify-between hover:shadow-md transition">

    {/* Left */}
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold text-gray-800 mt-1">
        {value || 0}
      </h2>
    </div>

    {/* Right Icon Circle */}
    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
      {title?.charAt(0)}
    </div>

  </div>
);
}

export default StatsCard;