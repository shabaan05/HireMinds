import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOTP";
import Profile from "../pages/candidate/Profile";
import CandidateLayout from "../layout/CandidateLayout";
import AdminLayout from "../layout/AdminLayout";
import ManageInterview from "../pages/admin/ManageInterview";
import CreateInterview from "../pages/admin/CreateInterview";
import ManageInterviewQuestions from "../pages/admin/ManageInterviewQuestions";
import InterviewList from "../pages/admin/InterviewList";
import Instructions from "../pages/candidate/Instructions";
import Interviews from "../pages/candidate/Interviews";
import AttemptInterview from "../pages/candidate/AttemptInterview";
import Result from "../pages/candidate/Result";
import History from "../pages/candidate/History";
import Dashboard from "../pages/candidate/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import QuestionBank from "../pages/admin/QuestionBank";
import Attempts from "../pages/admin/Attempts";
import AttemptDetails1 from "../pages/admin/AttemptDetails1";
import AttemptDetails from "../pages/candidate/AttemptDetails";
import ProfileAdmin from "../pages/admin/ProfileAdmin";
import MyAttempts from "../pages/candidate/MyAttempts";
import { AttemptProvider } from "../context/AttemptContext";
import Home from "../pages/Home";


const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/" element={<Home />} />


      {/* ================= CANDIDATE ================= */}
      <Route path="/candidate" element={<CandidateLayout />}>

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="interviews" element={<Interviews />} />

        {/* 🔥 FIX: lowercase */}
        <Route path="history" element={<History />} />

        {/* 🔥 SINGLE SOURCE OF TRUTH */}
        <Route path="attempt/:attemptId" element={
          <AttemptProvider>
            <AttemptInterview />
          </AttemptProvider>
        } />

        {/* 🔥 Details */}
        <Route path="attempts/:attemptId" element={<AttemptDetails />} />

        {/* Instructions */}
        <Route
          path="interviews/instructions/:interviewId"
          element={<Instructions />}
        />

        {/* Result */}
        <Route path="result/:attemptId" element={<Result />} />

      </Route>

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<AdminLayout />}>

        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="interviews" element={<InterviewList />} />
        <Route path="attempts" element={<Attempts />} />
<Route path="profile" element={<ProfileAdmin />} />
        <Route path="attempts/:id" element={<AttemptDetails1 />} />

        <Route path="interviews/create" element={<CreateInterview />} />

        <Route path="interviews/:id/manage" element={<ManageInterview />} />
        <Route path="interviews/:id/questions" element={<ManageInterviewQuestions />} />

        <Route path="questions" element={<QuestionBank />} />

      </Route>

    </Routes>
  );
};

export default AppRoutes;