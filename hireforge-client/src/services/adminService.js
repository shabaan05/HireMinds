import axiosInstance from "./axiosInstance";

export const getAdminStats = async () => {

  const res = await axiosInstance.get("/admin/stats");

  return res.data.data;
};


export const getAllAttempts = async () => {
  const res = await axiosInstance.get("/admin");
    console.log("DATA:", res); 

  return res.data.data;
};

export const getAdminProfile = async () => {
  const res = await axiosInstance.get("/admin/profile");
  return res.data;
};

export const updateAdminProfile = async (data) => {
  const res = await axiosInstance.put("/admin/profile", data);
  return res.data;
};