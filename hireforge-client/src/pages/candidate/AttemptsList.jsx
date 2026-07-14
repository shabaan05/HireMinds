import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserAttempts } from "../../services/attemptService";

const AttemptsList = () => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const res = await getUserAttempts();
  
      setAttempts(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      
      <div className="max-w-5xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-8 text-center">
          My Attempts
        </h1>
  
        <div className="grid gap-6">
          {attempts.map((attempt) => (
            
            <div
              key={attempt._id}
              className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg hover:border-blue-500 transition"
            >
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                <div>
                  <h2 className="text-xl font-semibold text-blue-400">
                    {attempt.interviewTitle || "Interview Attempt"}
                  </h2>
  
                  <p className="text-slate-400 mt-2">
                    Attempt ID: {attempt._id}
                  </p>
  
                  <p className="text-slate-500 text-sm mt-1">
                    {new Date(attempt.createdAt).toLocaleString()}
                  </p>
                </div>
  
                <Link
                  to={`/user/attempts/${attempt._id}`}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-medium transition text-center"
                >
                  View Attempt
                </Link>
  
              </div>
            </div>
  
          ))}
        </div>
  
      </div>
    </div>
  );
};

export default AttemptsList;