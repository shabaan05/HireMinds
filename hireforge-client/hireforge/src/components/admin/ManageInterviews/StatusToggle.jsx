import { toggleInterviewStatus } from "../../../services/interviewService";
function StatusToggle({ interview, refresh }) {

  const toggle = async () => {

   await toggleInterviewStatus(interview._id);

    refresh();

  };

  return (
    <button onClick={toggle}>
      {interview.isActive ? "Deactivate" : "Activate"}
    </button>
  );
}

export default StatusToggle;