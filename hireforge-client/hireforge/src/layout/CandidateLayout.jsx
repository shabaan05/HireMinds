import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const CandidateLayout = ({ children }) => {
  const navigate = useNavigate();



  return (
    <div>
      {/* Navbar */}
     
     <Navbar />

      {/* Navigation */}
      <nav>
        <Link to="/candidate/dashboard">Dashboard</Link> |{" "}
       
        <button >Logout</button>
      </nav>

      <hr />

      {/* Page Content */}
      <main>
        {children}
      </main>

      <hr />

     <Footer />
    </div>
  );
};

export default CandidateLayout;
