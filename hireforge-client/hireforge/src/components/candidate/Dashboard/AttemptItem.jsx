import { useNavigate } from "react-router-dom";

function AttemptItem({ attempt }) {

  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: "10px" }}>

      <span>{attempt.interview}</span>

      <span style={{ marginLeft: "20px" }}>
        Score: {attempt.score}
      </span>

      <button
        style={{ marginLeft: "20px" }}
        onClick={() =>
          navigate(`/attempt/${attempt.id}`)
        }
      >
        View
      </button>

    </div>
  );
}

export default AttemptItem;