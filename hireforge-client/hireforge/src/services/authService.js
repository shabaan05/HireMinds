import api from "../utils/axiosInstance";


export const registerUser = (data) => {
  return api.post("/auth/register", data);
};


export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
export const verifyOTP = async (data) => {
  const response = await api.post("/auth/verify-otp", data);
  return response.data;   // ✅ IMPORTANT
};
