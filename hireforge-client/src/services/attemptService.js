import api from "./axiosInstance";

//  Start Interview
export const startInterview = async (interviewId) => {
  const res = await api.post(`/attempts/${interviewId}/start`);
  return res.data;
};
//run code before suubmit
export const runCode = async (data) => {
  const res = await api.post("/code/run", data);
  return res.data;
};
// Get Attempt by ID
export const getAttemptById = async (attemptId) => {
  const res = await api.get(`/attempts/single/${attemptId}`);
  return res.data;
};

export const submitAttempt = async ({ attemptId, answers }) => {
  const res = await api.post(`/attempts/${attemptId}/submit`, {
    answers,
  });

  return res.data;
};
//  Save Answer
export const saveAnswer = async (attemptId, data) => {
  const res = await api.post(`/attempts/${attemptId}/answer`, data);
  return res.data;
};

//  Get User Attempts
export const getUserAttempts = async () => {
  const res = await api.get(`/attempts/user`);
  console.log('service attempt', res)
  return res.data.completedAttempts;
};

//  Submit Interview
export const submitInterview = async (attemptId) => {
  const res = await api.post(`/attempts/${attemptId}/submit`);
  return res.data;
};

// Get Result
export const getResult = async (attemptId) => {
  const res = await api.get(`/attempts/${attemptId}/result`);
  return res.data;
};
//stats
export const getUserStats = async () => {

  const res = await api.get("/attempts/stats");
  console.log("res is",res)
  return res.data;
};
