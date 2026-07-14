function RecentAttemptsTable({ attempts }) {

return (
  <div className="space-y-4">

    {/* Header */}
    <h3 className="text-lg font-semibold text-gray-800">
      Recent Attempts
    </h3>

    {/* Table Container */}
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <table className="w-full text-sm">

        {/* Head */}
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">User</th>
            <th className="px-4 py-3 text-left">Interview</th>
            <th className="px-4 py-3 text-left">Score</th>
            <th className="px-4 py-3 text-left">Date</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y">

          {attempts.slice(0, 5).map((a) => (
            <tr
              key={a._id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-800">
                {a.userId?.name}
              </td>

              <td className="px-4 py-3 text-gray-600">
                {a.interviewId?.title}
              </td>

              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 font-medium">
                  {a.score}
                </span>
              </td>

              <td className="px-4 py-3 text-gray-500">
                {new Date(a.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  </div>
);
}

export default RecentAttemptsTable;