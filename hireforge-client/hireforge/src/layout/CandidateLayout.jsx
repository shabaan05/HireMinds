import { Link, useNavigate,Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const CandidateLayout = ({ children }) => {
  const navigate = useNavigate();



  return (
    <div>
     
     <Navbar />

          <main>
        <Outlet />
      </main>


     <Footer />
    </div>
  );
};

export default CandidateLayout;
