import { Link, useNavigate,Outlet,useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const CandidateLayout = ({ children }) => {
  const navigate = useNavigate();
 const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/user/attempt/") ||
    location.pathname.startsWith("/user/interviews/instructions/");



  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">

      {!hideLayout && <Navbar />}

    <main className="min-h-[80vh]">
      <Outlet />
    </main>

      {!hideLayout && <Footer />}

  </div>
  );
};

export default CandidateLayout;
