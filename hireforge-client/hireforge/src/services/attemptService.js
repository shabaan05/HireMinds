import axiosInstance from "./axiosInstance";

export const getUserAttempts = async () => {
  const res = await axiosInstance.get("/attempts/user");
  return res.data;
};