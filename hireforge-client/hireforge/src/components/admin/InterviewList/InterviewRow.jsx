import { useNavigate } from "react-router-dom";

function InterviewRow({ interview }) {

  const navigate = useNavigate();

  return (
    <tr>

      <td>{interview.title}</td>

      <td>{interview.duration} min</td>

      <td>{interview.experienceLevel}</td>

      <td>

        <button
          onClick={() =>
            navigate(`/admin/interviews/${interview._id}`)
          }
        >
          Manage
        </button>

      </td>

    </tr>
  );
}

export default InterviewRow;