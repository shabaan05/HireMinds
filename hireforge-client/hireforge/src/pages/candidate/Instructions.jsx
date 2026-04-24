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

      navigate(`/candidate/attempt/${attemptId}`);

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
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <InstructionsHeader interview={interview} />
      <InstructionsInfo interview={interview} />
      <InstructionsRules />

      <StartInterviewButton
        onStart={handleStart}
        loading={starting}
      />

    </div>
  );
};

export default Instructions;