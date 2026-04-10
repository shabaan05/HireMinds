import { useNavigate } from "react-router-dom";

function InterviewCard({ interview }) {

  const navigate = useNavigate();
console.log("inetrview" ,interview);//test
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>

      <h4>{interview.title}</h4>

      <p>Duration: {interview.duration} minutes</p>

      <button
        // onClick={() =>
        //   navigate(`/interviews/instructions/${interview._id}`)
        // }
        onClick={() => {
  if (!interview?._id) {
    console.log("Missing ID:", interview);
    return;
  }
    console.log("CLICKED");
console.log("FULL OBJECT:", interview);
  console.log("ID:", interview?._id);

  navigate(`/candidate/interviews/instructions/${interview._id}`);
}}
      >
        Start Interview
      </button>

    </div>
  );
}

export default InterviewCard;