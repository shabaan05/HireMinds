@echo off
echo Creating HireForge Full Project Structure...

REM =========================
REM BACKEND STRUCTURE
REM =========================

mkdir hireforge-server
cd hireforge-server

mkdir config controllers middlewares models routes services sockets validations utils

type nul > app.js
type nul > server.js

cd ..

REM =========================
REM FRONTEND STRUCTURE
REM =========================

mkdir hireforge-client
cd hireforge-client

mkdir src
cd src

mkdir api assets context hooks routes utils
mkdir components
mkdir pages

REM Components
cd components
mkdir common layout interview dashboard

cd common
type nul > Button.jsx
type nul > Input.jsx
type nul > Modal.jsx
type nul > Loader.jsx
cd ..

cd layout
type nul > Sidebar.jsx
type nul > Navbar.jsx
type nul > AdminLayout.jsx
type nul > CandidateLayout.jsx
cd ..

cd interview
type nul > QuestionCard.jsx
type nul > MCQSection.jsx
type nul > CodingEditor.jsx
type nul > SubjectiveSection.jsx
type nul > Timer.jsx
type nul > QuestionNavigator.jsx
cd ..

cd dashboard
type nul > StatsCard.jsx
type nul > LeaderboardTable.jsx
type nul > DashboardChart.jsx
cd ..

cd ..

REM Pages
cd pages
mkdir public admin candidate

cd public
type nul > Landing.jsx
type nul > Login.jsx
type nul > Register.jsx
type nul > ForgotPassword.jsx
type nul > ResetPassword.jsx
cd ..

cd admin
type nul > Dashboard.jsx
type nul > ManageInterviews.jsx
type nul > CreateInterview.jsx
type nul > QuestionBank.jsx
type nul > UserManagement.jsx
type nul > Leaderboard.jsx
type nul > Analytics.jsx
type nul > Profile.jsx
cd ..

cd candidate
type nul > Dashboard.jsx
type nul > Instructions.jsx
type nul > AttemptInterview.jsx
type nul > Result.jsx
type nul > History.jsx
type nul > AttemptDetails.jsx
type nul > Profile.jsx
cd ..

cd ..

type nul > App.jsx
type nul > main.jsx

cd ../..

echo.
echo HireForge Structure Created Successfully!
pause
