import { useNavigate } from "react-router-dom";

function InterviewCard({ interview }) {

  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>

      <h4>{interview.title}</h4>

      <p>Duration: {interview.duration} minutes</p>

      <button
        onClick={() =>
          navigate(`/interviews/${interview.id}/instructions`)
        }
      >
        Start Interview
      </button>

    </div>
  );
}

export default InterviewCard;