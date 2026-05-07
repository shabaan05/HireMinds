import { useNavigate } from "react-router-dom";
import { deleteInterview } from "../../../services/interviewService";

function InterviewActions({ interviewId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteInterview(interviewId);
    navigate("/admin/interviews");
  };

return (
  <div className="flex items-center gap-4 mt-4">

    {/* MANAGE QUESTIONS */}
    <button
      onClick={() =>
        navigate(`/admin/interviews/${interviewId}/questions`)
      }
      className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-90 transition"
    >
      Manage Questions
    </button>

    {/* DELETE */}
    <button
      onClick={handleDelete}
      className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      Delete Interview
    </button>

  </div>
);
}

export default InterviewActions;