import { useEffect, useState } from "react";
import WelcomeCard from "../../components/candidate/Dashboard/WelcomeCard";
import StatsSection from "../../components/candidate/Dashboard/StatsSection";
import RecentAttempts from "../../components/candidate/Dashboard/RecentAttempts";
import ScoreChart from "../../components/candidate/Dashboard/ScoreChart";
import PerformanceSummary from "../../components/candidate/Dashboard/PerformanceSummary";
import { getUserAttempts, getUserStats } from "../../services/attemptService";

function Dashboard() {
  const [attempts, setAttempts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attemptsData, statsData] = await Promise.all([
          getUserAttempts(),
          getUserStats(),
        ]);
        setAttempts(attemptsData || []);
        setStats(statsData?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
      <div className="w-[92%] max-w-[1400px] mx-auto py-8 space-y-7">

        {/* PAGE HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">
              Overview
            </p>
            <h1 className="text-2xl font-bold text-white">
              Dashboard
            </h1>
          </div>
          <p className="text-xs text-gray-500 hidden sm:block">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        {/* WELCOME */}
        <WelcomeCard name={user?.name || "Candidate"} />

        {/* STATS */}
        <StatsSection stats={stats} loading={loading} />

        {/* CHART + SUMMARY */}
        {attempts.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2">
              <ScoreChart attempts={attempts} />
            </div>
            <div>
              <PerformanceSummary attempts={attempts} stats={stats} />
            </div>
          </div>
        )}

        {/* RECENT ATTEMPTS */}
        <RecentAttempts attempts={attempts} loading={loading} />

      </div>
    </div>
  );
}

export default Dashboard;
