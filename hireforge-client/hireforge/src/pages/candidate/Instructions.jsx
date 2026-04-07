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

  // ✅ Fetch Interview
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await getInterviewById(interviewId);
        setInterview(res.data.data); 
      } catch (err) {
        console.error("Error fetching interview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  // ✅ Start Interview
  const handleStart = async () => {
    try {
      setStarting(true);

      const res = await startInterview(interviewId);

      const attemptId = res.data.data._id; // ✅ correct path

      navigate(`/candidate/attempt/${interviewId}?attemptId=${attemptId}`);
    } catch (err) {
      console.error("Error starting interview:", err);
    } finally {
      setStarting(false);
    }
  };

  // ✅ UI States
  if (loading) return <div className="p-6">Loading...</div>;
  if (!interview) return <div className="p-6">Interview not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <InstructionsHeader interview={interview} />
      <InstructionsInfo interview={interview} />
      <InstructionsRules />
      <StartInterviewButton onStart={handleStart} loading={starting} />
    </div>
  );
};

export default Instructions;