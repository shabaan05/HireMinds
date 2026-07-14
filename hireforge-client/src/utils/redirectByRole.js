export const redirectByRole = (role) => {
  switch (role) {
    case "admin":
      return "/admin/dashboard";

    case "candidate":
      return "/user/dashboard";

    default:
      return "/";
  }
};