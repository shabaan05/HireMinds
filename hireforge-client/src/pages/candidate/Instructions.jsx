import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import InstructionsHeader from "../../components/candidate/instructions/InstructionsHeader";
import InstructionsInfo from "../../components/candidate/instructions/InstructionsInfo";
import InstructionsRules from "../../components/candidate/instructions/InstructionsRules";
import StartInterviewButton from "../../components/candidate/instructions/StartInterviewButton";

import { getInterviewById } from "../../services/interviewService";
import { startInterview } from "../../services/attemptService";

const Instructions = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        setLoading(true);

        const data = await getInterviewById(interviewId);
        setInterview(data);

      } catch (err) {
        console.error(err);
        setError("Failed to load interview");
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  // ================= START =================
  const handleStart = async () => {
    try {
      if (starting) return; //  prevent double click

      setStarting(true);

      const res = await startInterview(interviewId);

      //  handle both cases safely
      const attemptId = res._id || res.data?._id;

      navigate(`/user/attempt/${attemptId}`);

    } catch (err) {
      console.error(err);
      setError("Failed to start interview");
    } finally {
      setStarting(false);
    }
  };

  // ================= UI =================
  if (loading) return <div className="p-6">Loading interview...</div>;

  if (error)
    return <div className="p-6 text-red-500">{error}</div>;

  if (!interview)
    return <div className="p-6">Interview not found</div>;

return (
  <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-100">

    {/* HEADER */}
    <div className="text-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Interview Instructions
      </h1>
      <p className="text-gray-400 text-sm mt-1">
        Please read carefully before starting
      </p>
    </div>

    {/* MAIN CARD */}
    <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        <InstructionsHeader interview={interview} />
      </div>

      {/* INFO */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        <InstructionsInfo interview={interview} />
      </div>

      {/* RULES */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        <InstructionsRules />
      </div>

      {/* BUTTON */}
      <div className="pt-2 text-center">
        <StartInterviewButton
          onStart={handleStart}
          loading={starting}
        />
      </div>

    </div>

  </div>
);
};

export default Instructions;