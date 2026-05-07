import InterviewRow from "./InterviewRow";
import { useNavigate } from "react-router-dom";
function InterviewTable({ interviews = [] }) { 

    const navigate = useNavigate();

return (
  <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

    <table className="w-full text-sm">

      {/* HEAD */}
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-4 py-3 text-left">Title</th>
          <th className="px-4 py-3 text-left">Duration</th>
          <th className="px-4 py-3 text-left">Experience</th>
          <th className="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody className="divide-y">

        {interviews.length === 0 ? (
          <tr>
            <td
              colSpan="4"
              className="text-center py-6 text-gray-400"
            >
              No interviews found
            </td>
          </tr>
        ) : (
          interviews.map((interview) => (
            <tr
              key={interview._id}
              className="hover:bg-gray-50 transition"
            >

              {/* TITLE */}
              <td className="px-4 py-3 font-medium text-gray-800">
                {interview.title}
              </td>

              {/* DURATION */}
              <td className="px-4 py-3 text-gray-600">
                {interview.duration} min
              </td>

              {/* EXPERIENCE */}
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-600 font-medium">
                  {interview.experienceLevel}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3 space-x-3">

                <button
                  type="button"  // ✅ IMPORTANT

                  onClick={() =>
                    navigate(`/admin/interviews/${interview._id}/manage`)
                  }
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Manage
                </button>

                <button
                  type="button"  // ✅ IMPORTANT

                  onClick={() =>
                    navigate(`/admin/interviews/${interview._id}/questions`)
                  }
                  className="text-indigo-600 hover:underline text-sm font-medium"
                >
                  Questions
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

export default InterviewTable;