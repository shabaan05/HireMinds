import { useNavigate } from "react-router-dom";
import { deleteInterview } from "../../../services/interviewService";

function InterviewActions({ interviewId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteInterview(interviewId);
    navigate("/admin/interviews");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={() =>
          navigate(`/admin/interviews/${interviewId}/questions`)
        }
      >
        Manage Questions
      </button>

      <button
        onClick={handleDelete}
        style={{ marginLeft: "10px", color: "red" }}
      >
        Delete Interview
      </button>
    </div>
  );
}

export default InterviewActions;