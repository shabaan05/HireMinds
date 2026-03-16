export const getQuestions = async () => {
  const res = await axiosInstance.get("/questions");
  return res.data;
};

// heer should be all funtion from question.controler
