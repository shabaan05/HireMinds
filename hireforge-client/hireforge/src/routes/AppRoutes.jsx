import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOTP";

import CandidateLayout from "../layout/CandidateLayout";

import ManageInterview from "../pages/admin/ManageInterview";
import CreateInterview from "../pages/admin/CreateInterview";
import ManageInterviewQuestions from "../pages/admin/ManageInterviewQuestions";
import InterviewList from "../pages/admin/InterviewList";
import Instructions from "../pages/candidate/Instructions";
import AttemptInterview from "../pages/candidate/AttemptInterview";
import Result from "../pages/candidate/Result";
import History from "../pages/candidate/History";
import AttemptDetails from "../pages/candidate/AttemptDetails";
import Dashboard from "../pages/candidate/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import QuestionBank from "../pages/admin/QuestionBank";
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
         <Route
  path="instructions/:interviewId"
  element={<Instructions />}
/>
<Route path="attempt/:interviewId" element={<AttemptInterview />}

/>
<Route
  path="attempt-details/:attemptId"
  element={<AttemptDetails />}
/>
<Route
  path="history"
  element={<History />}
/>
<Route path="result/:attemptId" element={<Result />}
/>
 </Route>

      {/* Admin Routes */}
       <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/interviews" element={<InterviewList />} />
      <Route path="/admin/interviews/create" element={<CreateInterview />} />
      <Route path="/admin/interviews/manage" element={<ManageInterview />} />
      <Route path="/admin/interviews/:id/questions" element={<ManageInterviewQuestions />}  />
<Route path="/admin/questions" element={<QuestionBank />} />
    </Routes>
  );
};

export default AppRoutes;