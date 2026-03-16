import axiosInstance from "./axiosInstance";

export const getInterviews = async () => {
  const response = await axiosInstance.get("/interviews");
  return response.data;
};

export const getInterviewById = async (id) => {
  const response = await axiosInstance.get(`/interviews/${id}`);
  return response.data;
};

export const createInterview = async (data) => {
  const response = await axiosInstance.post("/interviews", data);
  return response.data;
};

export const updateInterview = async (id, data) => {
  const response = await axiosInstance.put(`/interviews/${id}`, data);
  return response.data;
};

export const deleteInterview = async (id) => {
  const response = await axiosInstance.delete(`/interviews/${id}`);
  return response.data;
};

export const toggleInterviewStatus = async (id) => {
  const response = await axiosInstance.patch(`/interviews/${id}/status`);
  return response.data;
};
//..
export const attachQuestions = async (interviewId, questions) => {
  const res = await axiosInstance.post(
    `/interviews/${interviewId}/questions`,
    { questions }
  );
  return res.data;
};