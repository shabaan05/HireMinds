export const getQuestions = async () => {
  const res = await axiosInstance.get("/questions");
  return res.data.data;
};
import axiosInstance from "./axiosInstance";

//  CREATE QUESTION
export const createQuestion = async (data) => {
  const res = await axiosInstance.post("/questions", data);
  return res.data.data; // clean return
};



//  DELETE QUESTION
export const deleteQuestion = async (id) => {
  const res = await axiosInstance.delete(`/questions/${id}`);
  return res.data;
};
