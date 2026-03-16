import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOTP";

import Dashboard from "../pages/candidate/Dashboard";
import CandidateLayout from "../layout/CandidateLayout";

import ManageInterview from "../pages/admin/ManageInterview";
import CreateInterview from "../pages/admin/CreateInterview";
import ManageInterviewQuestions from "../pages/admin/ManageInterviewQuestions";
import InterviewList from "../pages/admin/InterviewList";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Candidate Routes with Layout */}
      <Route path="/candidate" element={<CandidateLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/interviews" element={<InterviewList />} />
      <Route path="/admin/interviews/create" element={<CreateInterview />} />
      <Route path="/admin/interviews/manage" element={<ManageInterview />} />
      <Route
        path="/admin/interviews/:id/questions"
        element={<ManageInterviewQuestions />}
      />

    </Routes>
  );
};

export default AppRoutes;