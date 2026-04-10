import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttemptById } from "../../services/attemptService";
import AttemptDetailsCard from "../../components/admin/attempts/AttemptDetailsCard";

function AttemptDetails1() {
  const { id } = useParams();
  const [attempt, setAttempt] = useState(null);


  const fetchAttempt = async () => {
  try {
    console.log("Fetching attempt...");

    const data = await getAttemptById(id);

    console.log("DATA RECEIVED:", data); // 🔥 MUST SHOW

    setAttempt(data?.data || data);

  } catch (err) {
    console.error("ERROR FETCHING:", err); // 🔥 YOU WILL SEE ERROR HERE
  }
};

  useEffect(() => {
      console.log("Fetching attempt...");

    fetchAttempt();
  }, [id]);

if (!attempt || Object.keys(attempt).length === 0) {
  return <p>Loading...</p>;
}
  return (
    <div>
      <h2>Attempt Details</h2>
      <AttemptDetailsCard attempt={attempt} />
    </div>
  );
}

export default AttemptDetails1;