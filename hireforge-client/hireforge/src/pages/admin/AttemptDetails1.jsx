import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAttemptById } from "../../services/attemptService";
import AttemptDetailsCard from "../../components/admin/attempts/AttemptDetailsCard";

function AttemptDetails1() {
  const { id } = useParams();
  const location = useLocation();
const [attempt, setAttempt] = useState(location.state?.attempt || null)

const fetchAttempt = async () => {
  try {
    const data = await getAttemptById(id);
    setAttempt(data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  if (!attempt) {
    fetchAttempt();
  }
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