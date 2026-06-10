import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import StudentInquiry from "./pages/StudentInquiry";

import StudentProfile from "./pages/StudentProfile";

import StudentFee from "./pages/StudentFees";
import StudentMarks from "./pages/StudentMarks";
import AllStudentFees from "./pages/AllStudentFees";
import Dashboard from "./pages/Dashboard";
import AllStudentMarks from "./pages/AllStudentMarks";

import StandardMaster from "./pages/Master/StandardMaster";
import SubjectsMaster from "./pages/Master/SubjectMaster";
import HobbiesMaster from "./pages/Master/HobbiesMaster";
import InquirySourceMaster from "./pages/Master/InquirySourceMaster";
import SchoolMaster from "./pages/Master/SchoolMaster";

import AccountingDashboard from "./pages/Accounting/AccountingDashboard";
import FeeStructure from "./pages/Accounting/FeeStructure";
import StudentFeesPage from "./pages/Accounting/StudentFeesPage";
import StudentFeeProfile from "./pages/Accounting/StudentFeeProfile";
import Discount from "./pages/Accounting/Discount";
import Reports from "./pages/Accounting/Reports";
import FeeInstallment from "./pages/Accounting/FeeInstallment";

import AdmissionDashboard from "./pages/Admission/AdmissionDashboard";
import StudentAdmissionList from "./pages/Admission/StudentAdmissionList";
import DocumentList from "./pages/Admission/DocumentList";
import StudentDocument from "./pages/Admission/StudentDocument";


import AttendanceDashboard from "./pages/Attendance/AttendanceDashboard";
import AttendanceEntry from "./pages/Attendance/AttendanceEntry";
import AtdendanceList from "./pages/Attendance/AtdendanceList";

import "./App.css";

function App() {

  return (
    <Router>
      <div className="app-container">

        {/* LEFT SIDEBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inquiry" element={<StudentInquiry />} />

            <Route path="/StudentProfile" element={<StudentProfile />} />


            <Route path="/studentFee/:studentId" element={<StudentFee />} />
            <Route path="/StudentMarks/:studentId" element={<StudentMarks />} />
            <Route path="/AllStudentFees" element={<AllStudentFees />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/AllStudentMarks" element={<AllStudentMarks />} />

            <Route path="/master/standard" element={<StandardMaster />} />
            <Route path="/master/subjects" element={<SubjectsMaster />} />
            <Route path="/master/hobbies" element={<HobbiesMaster />} />
            <Route path="/master/inquiry-source" element={<InquirySourceMaster />} />
            <Route path="/master/school" element={<SchoolMaster />} />

            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/accounting/dashboard" element={<AccountingDashboard />} />

            <Route path="/accounting/feestructure" element={<FeeStructure />} />

            <Route path="/accounting/studentfees" element={<StudentFeesPage />} />

            <Route path="/accounting/StudentFeeProfile" element={<StudentFeeProfile />} />

            <Route path="/accounting/discount" element={<Discount />} />
            <Route path="/accounting/FeeInstallment" element={<FeeInstallment />} />

            <Route path="/accounting/reports" element={<Reports />} />

            <Route path="/admission/dashboard" element={<AdmissionDashboard />} />
            <Route path="/admission/StudentAdmissionList" element={<StudentAdmissionList />} />
            <Route path="/admission/DocumentList" element={<DocumentList />} />
            <Route path="/admission/StudentDocument" element={<StudentDocument />} />
            <Route path="/attendance/dashboard" element={<AttendanceDashboard />} />
            <Route path="/attendance/entry" element={<AttendanceEntry />} />
            <Route path="/attendance/AtdendanceList" element={<AtdendanceList />} />


          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;