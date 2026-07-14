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
// LOADING
if (!attempt || Object.keys(attempt).length === 0) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <p className="text-gray-500 text-lg animate-pulse">
        Loading attempt...
      </p>
    </div>
  );
}

return (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

    {/* HEADER */}
    <div>
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Attempt Details
      </h2>
      <p className="text-gray-500 mt-1">
        Review candidate performance and answers
      </p>
    </div>

    {/* CARD */}
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <AttemptDetailsCard attempt={attempt} />
    </div>

  </div>
);
}

export default AttemptDetails1;