import { useEffect, useState } from "react";

import WelcomeCard from "../../components/candidate/Dashboard/WelcomeCard";
import StatsSection from "../../components/candidate/Dashboard/StatsSection";
import RecentAttempts from "../../components/candidate/Dashboard/RecentAttempts";

import { getInterviews } from "../../services/interviewService";
import { getUserAttempts } from "../../services/attemptService";

function Dashboard() {

  const [attempts, setAttempts] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const attemptsData = await getUserAttempts();

      setAttempts(attemptsData);

    };

    fetchData();

  }, []);
return (
  <div className="p-6 space-y-6 bg-gray-950 min-h-screen text-gray-100">

    {/* HEADER */}
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Candidate Dashboard
      </h2>
      <p className="text-gray-400 mt-1">
        Track your performance and activity
      </p>
    </div>

    {/* WELCOME CARD */}
    <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6">
      <WelcomeCard name="Candidate" />
    </div>

    {/* STATS SECTION */}
    <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6">
      <StatsSection attempts={attempts} />
    </div>

    {/* RECENT ATTEMPTS */}
    <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6">
      <RecentAttempts attempts={attempts} />
    </div>

  </div>
);

}

export default Dashboard;