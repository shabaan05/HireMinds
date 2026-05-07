import { Link, useNavigate,Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const CandidateLayout = ({ children }) => {
  const navigate = useNavigate();



  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">

    <Navbar />

    <main className="min-h-[80vh]">
      <Outlet />
    </main>

    <Footer />

  </div>
  );
};

export default CandidateLayout;
