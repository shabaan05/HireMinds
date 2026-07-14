import axiosInstance from "./axiosInstance";


export const getRoadmap = async (userId) => {

    const res = await axiosInstance.get(
    `/roadmap/${userId}`
  );
//console.log("dataa",res.data)
  return res.data;

};