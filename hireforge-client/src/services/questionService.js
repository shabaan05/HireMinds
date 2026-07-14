import axiosInstance from "./axiosInstance";

// ─── Get All Questions ────────────────────────────────────────────────────────
export const getQuestions = async () => {
  const res = await axiosInstance.get("/questions");
  return res.data.data;
};

// ─── Create Question ──────────────────────────────────────────────────────────
export const createQuestion = async (data) => {
  const res = await axiosInstance.post("/questions", data);
  return res.data.data;
};

// ─── Update Question ──────────────────────────────────────────────────────────
export const updateQuestion = async (id, data) => {
  const res = await axiosInstance.put(`/questions/${id}`, data);
  return res.data.data;
};

// ─── Delete Question ──────────────────────────────────────────────────────────
export const deleteQuestion = async (id) => {
  const res = await axiosInstance.delete(`/questions/${id}`);
  return res.data;
};

// ─── Get Question By ID ───────────────────────────────────────────────────────
export const getQuestionById = async (id) => {
  const res = await axiosInstance.get(`/questions/${id}`);
  return res.data.data;
};
