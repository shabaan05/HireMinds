import axiosInstance from "./axiosInstance";


export const getRecommendations = async (userId) => {
  const res = await axiosInstance.get(`/recommendations/${userId}`);
  console.log("recom is", res)
  return res.data.data;
};
