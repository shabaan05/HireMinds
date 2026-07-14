import AdminNavbar from "../components/admin/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

export default AdminLayout;