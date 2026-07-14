export const saveAuthData = (data) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const saveEmail = (email) => {
  localStorage.setItem("email", email);
};

export const clearAuthData = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  localStorage.removeItem("email");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};