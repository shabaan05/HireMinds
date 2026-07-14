import { useNavigate } from "react-router-dom";

function InterviewRow({ interview }) {
  const navigate = useNavigate();

return (
  <tr className="hover:bg-gray-50 transition">

    {/* TITLE */}
    <td className="px-4 py-3 font-medium text-gray-800">
      {interview?.title}
    </td>

    {/* DURATION */}
    <td className="px-4 py-3 text-gray-600">
      {interview?.duration} min
    </td>

    {/* EXPERIENCE */}
    <td className="px-4 py-3">
      <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-600 font-medium">
        {interview?.experienceLevel}
      </span>
    </td>

    {/* ACTION */}
    <td className="px-4 py-3">
      <button
        onClick={() =>
          navigate(`/admin/interviews/${interview._id}/manage`, {
            state: interview,
          })
        }
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        Manage
      </button>
    </td>

  </tr>
);
}

export default InterviewRow;