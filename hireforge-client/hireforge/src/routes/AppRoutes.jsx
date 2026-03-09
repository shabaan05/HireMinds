import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/candidate/Dashboard";
import CandidateLayout from "../layout/CandidateLayout";
import Home from "../pages/Home";
import VerifyOtp from "../pages/VerifyOTP";
const AppRoutes = () => {
  
  return (
      <Routes>
           <Route
        path="/candidate/dashboard"
        element={
          <CandidateLayout>
            <Dashboard />

          </CandidateLayout>
        }
   />
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
  );
};

export default AppRoutes;


