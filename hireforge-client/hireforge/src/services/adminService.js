import axiosInstance from "./axiosInstance";

export const getAdminStats = async () => {

  const res = await axiosInstance.get("/admin/stats");

  return res.data.data;
};
//admin route
export const getAllAttempts = async () => {
  const res = await axiosInstance.get("/admin");
    console.log("DATA:", res); // 🔥 ADD THIS

  return res.data.data;
};