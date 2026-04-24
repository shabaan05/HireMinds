import { useEffect, useState } from "react";

import WelcomeCard from "../../components/candidate/Dashboard/WelcomeCard";
import StatsSection from "../../components/candidate/Dashboard/StatsSection";
import AvailableInterviews from "../../components/candidate/Dashboard/AvailableInterviews";
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
    <div>

      <WelcomeCard name="Candidate" />

      <StatsSection attempts={attempts} />


      <RecentAttempts attempts={attempts} />

    </div>
  );
}

export default Dashboard;