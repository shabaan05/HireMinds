import { useNavigate } from "react-router-dom";

function RecentInterviewsTable({ interviews }) {
  const navigate = useNavigate();

return (
  <div className="space-y-4">

    {/* Header + Button */}
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-800">
        Recent Interviews
      </h3>

      <button
        onClick={() => navigate("/admin/interviews/create")}
        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-90 transition"
      >
        + Create Interview
      </button>
    </div>

    {/* Table */}
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <table className="w-full text-sm">

        {/* HEAD */}
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Created</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y">

          {interviews && interviews.length > 0 ? (
            interviews.slice(0, 5).map((interview) => (
              <tr
                key={interview._id}
                className="hover:bg-gray-50 transition"
              >

                <td className="px-4 py-3 font-medium text-gray-800">
                  {interview.title}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {interview.duration} min
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      interview.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {interview.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {new Date(interview.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-gray-400"
              >
                No interviews found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>

  </div>
);
}

export default RecentInterviewsTable;