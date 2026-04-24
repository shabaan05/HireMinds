import { useNavigate } from "react-router-dom";

function InterviewCard({ interview }) {

  const navigate = useNavigate();
console.log("inetrview" ,interview);//test
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>

      <h4>{interview.title}</h4>

      <p>Duration: {interview.duration} minutes</p>

      <button
      
        onClick={() => {
  if (!interview?._id) {
    return;
  }
    

  navigate(`/candidate/interviews/instructions/${interview._id}`);
}}
      >
        Start Interview
      </button>

    </div>
  );
}

export default InterviewCard;