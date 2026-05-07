import AttemptRow from "./AttemptRow";

function AttemptTable({ attempts = [] }) {
return (
  <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

    <table className="w-full text-sm">

      {/* HEAD */}
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-4 py-3 text-left">User</th>
          <th className="px-4 py-3 text-left">Interview</th>
          <th className="px-4 py-3 text-left">Score</th>
          <th className="px-4 py-3 text-left">Accuracy</th>
          <th className="px-4 py-3 text-left">Date</th>
          <th className="px-4 py-3 text-left">Action</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody className="divide-y">

        {attempts.length === 0 ? (
          <tr>
            <td
              colSpan="6"
              className="text-center py-6 text-gray-400"
            >
              No attempts found
            </td>
          </tr>
        ) : (
          attempts.map((a) => (
            <tr
              key={a._id}
              className="hover:bg-gray-50 transition"
            >

              {/* USER */}
              <td className="px-4 py-3 font-medium text-gray-800">
                {a.userId?.name}
              </td>

              {/* INTERVIEW */}
              <td className="px-4 py-3 text-gray-600">
                {a.interviewId?.title}
              </td>

              {/* SCORE */}
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 font-medium">
                  {a.score}
                </span>
              </td>

              {/* ACCURACY */}
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded font-medium ${
                    a.accuracy >= 70
                      ? "bg-green-100 text-green-600"
                      : a.accuracy >= 40
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {a.accuracy}%
                </span>
              </td>

              {/* DATE */}
              <td className="px-4 py-3 text-gray-500">
                {new Date(a.createdAt).toLocaleDateString()}
              </td>

              {/* ACTION */}
              <td className="px-4 py-3">
                <button
                  onClick={() => navigate(`/admin/attempts/${a._id}`)}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  View
                </button>
              </td>

            </tr>
          ))
        )}

      </tbody>

    </table>

  </div>
);
}

export default AttemptTable;