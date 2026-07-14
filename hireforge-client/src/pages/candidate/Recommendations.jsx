import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecommendations } from "../../services/recommendationService";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const accuracyColor = (accuracy) => {
  if (accuracy >= 80) return "text-green-400";
  if (accuracy >= 60) return "text-yellow-400";
  return "text-red-400";
};

const accuracyBarColor = (accuracy) => {
  if (accuracy >= 80) return "bg-green-500";
  if (accuracy >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

// ─── Study Roadmap (rule-based) ───────────────────────────────────────────────
const buildRoadmap = (weakTopics, improvementAreas) => {
  const steps = [];

  if (weakTopics.length > 0) {
    steps.push({
      phase: "Phase 1 — Foundation",
      description: "Focus on your weakest topics first to build a solid base.",
      topics: weakTopics.map((t) => t.topic),
    });
  }

  if (improvementAreas.length > 0) {
    steps.push({
      phase: "Phase 2 — Consolidation",
      description:
        "Strengthen topics where you're close to mastery (60–80% accuracy).",
      topics: improvementAreas.map((t) => t.topic),
    });
  }

  steps.push({
    phase: "Phase 3 — Practice",
    description:
      "Attempt timed mock interviews covering all topics to build speed and confidence.",
    topics: [],
  });

  return steps;
};

// ─── Component ────────────────────────────────────────────────────────────────
const Recommendations = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getRecommendations(userId);
        console.log("rres",result)
        setData(result);
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.data?.message || "Failed to load recommendations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-400">
        Loading recommendations...
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-400">
        {error}
      </div>
    );
  }

  // ── No data ────────────────────────────────────────────────────────────────
  if (!data || data.summary.totalQuestionsAttempted === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-gray-400 space-y-4">
        <h1 className="text-2xl font-bold text-gray-100">Recommendations</h1>
        <p>No attempt data found yet. Complete an interview to see your personalised recommendations.</p>
        <button
          onClick={() => navigate("/user/interviews")}
          className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition"
        >
          Browse Interviews →
        </button>
      </div>
    );
  }

  const { topicAccuracy, weakTopics, summary } = data;
  const { strengths, improvementAreas, subtopicAccuracy, totalQuestionsAttempted } = summary;
  const roadmap = buildRoadmap(weakTopics, improvementAreas);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-100">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Your Recommendations
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Based on {totalQuestionsAttempted} questions attempted across{" "}
          {topicAccuracy.length} topic{topicAccuracy.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── TOPIC-WISE ACCURACY ──────────────────────────────────────────────── */}
      <section className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-100">
          Topic-wise Accuracy
        </h2>

        {topicAccuracy.length === 0 ? (
          <p className="text-gray-400 text-sm">No data available.</p>
        ) : (
          <div className="space-y-4">
            {topicAccuracy.map((t) => (
              <div key={t.topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-200">{t.topic}</span>
                  <span className={`font-semibold ${accuracyColor(t.accuracy)}`}>
                    {t.accuracy}%
                    <span className="text-gray-500 font-normal ml-1">
                      ({t.correct}/{t.total})
                    </span>
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${accuracyBarColor(t.accuracy)}`}
                    style={{ width: `${t.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── WEAK TOPICS ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-900/70 backdrop-blur border border-red-900/40 rounded-2xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-red-400">
          Weak Topics{" "}
          <span className="text-xs text-gray-500 font-normal">(below 60%)</span>
        </h2>

        {weakTopics.length === 0 ? (
          <p className="text-green-400 text-sm">
            Great job! No weak topics found.
          </p>
        ) : (
          <ul className="space-y-2">
            {weakTopics.map((t) => (
              <li
                key={t.topic}
                className="flex items-center justify-between bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
              >
                <span className="text-gray-200 font-medium">{t.topic}</span>
                <span className="text-red-400 font-semibold text-sm">
                  {t.accuracy}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── STRENGTHS ───────────────────────────────────────────────────────── */}
      {strengths.length > 0 && (
        <section className="bg-gray-900/70 backdrop-blur border border-green-900/40 rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            Your Strengths{" "}
            <span className="text-xs text-gray-500 font-normal">(80%+)</span>
          </h2>
          <ul className="space-y-2">
            {strengths.map((t) => (
              <li
                key={t.topic}
                className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2"
              >
                <span className="text-gray-200 font-medium">{t.topic}</span>
                <span className="text-green-400 font-semibold text-sm">
                  {t.accuracy}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── IMPROVEMENT AREAS ───────────────────────────────────────────────── */}
      {improvementAreas.length > 0 && (
        <section className="bg-gray-900/70 backdrop-blur border border-yellow-900/40 rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-yellow-400">
            Improvement Areas{" "}
            <span className="text-xs text-gray-500 font-normal">(60–80%)</span>
          </h2>
          <ul className="space-y-2">
            {improvementAreas.map((t) => (
              <li
                key={t.topic}
                className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2"
              >
                <span className="text-gray-200 font-medium">{t.topic}</span>
                <span className="text-yellow-400 font-semibold text-sm">
                  {t.accuracy}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── SUBTOPIC BREAKDOWN ──────────────────────────────────────────────── */}
      {subtopicAccuracy.length > 0 && (
        <section className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-100">
            Subtopic Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="pb-2 pr-4">Topic</th>
                  <th className="pb-2 pr-4">Subtopic</th>
                  <th className="pb-2 pr-4 text-right">Correct</th>
                  <th className="pb-2 text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {subtopicAccuracy.map((s, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                  >
                    <td className="py-2 pr-4 text-gray-300">{s.topic}</td>
                    <td className="py-2 pr-4 text-gray-400">{s.subtopic}</td>
                    <td className="py-2 pr-4 text-right text-gray-400">
                      {s.correct}/{s.total}
                    </td>
                    <td
                      className={`py-2 text-right font-semibold ${accuracyColor(
                        s.accuracy
                      )}`}
                    >
                      {s.accuracy}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── STUDY ROADMAP ───────────────────────────────────────────────────── */}
      <section className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-100">
          Study Roadmap
        </h2>
        <p className="text-gray-400 text-sm">
          A personalised plan based on your current performance.
        </p>

        <div className="space-y-4">
          {roadmap.map((step, i) => (
            <div
              key={i}
              className="border border-gray-700 rounded-xl p-4 space-y-2"
            >
              <h3 className="font-semibold text-blue-400">{step.phase}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
              {step.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {step.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 rounded-full text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ACTIONS ─────────────────────────────────────────────────────────── */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 rounded-lg text-sm font-medium text-gray-300 border border-gray-700 hover:bg-gray-800 transition"
        >
          ← Back
        </button>
        <button
           onClick={() =>
    navigate("/user/roadmap")
  }
          className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition"
        >
          View Roadmap 
        </button>
      </div>

    </div>
  );
};

export default Recommendations;
