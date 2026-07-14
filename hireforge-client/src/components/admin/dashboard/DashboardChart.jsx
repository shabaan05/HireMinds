function DashboardChart({ attempts }) {

return (
  <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">

    {/* Header */}
    <h3 className="text-lg font-semibold text-gray-800">
      Performance Overview
    </h3>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 gap-4">

      {/* Total Attempts */}
      <div className="bg-blue-50 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500">Total Attempts</p>
        <p className="text-2xl font-bold text-blue-600">
          {attempts.length}
        </p>
      </div>

      {/* Average Score */}
      <div className="bg-green-50 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500">Average Score</p>
        <p className="text-2xl font-bold text-green-600">
          {attempts.length === 0
            ? 0
            : (
                attempts.reduce((sum, a) => sum + a.score, 0) /
                attempts.length
              ).toFixed(1)}
        </p>
      </div>

    </div>

  </div>
);}

export default DashboardChart;