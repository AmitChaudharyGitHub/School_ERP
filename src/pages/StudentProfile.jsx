import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AlertCircle,
  Award,
  Bell,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  Download,
  Eye,
  FileText,
  IndianRupee,
  LayoutDashboard,
  MessageSquareText,
  Upload,
  UserRound,
} from "lucide-react";

const money = (value) => `Rs. ${value.toLocaleString("en-IN")}`;

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const student = {
    name: "Aarav Sharma",
    className: "5-A",
    rollNo: "15",
    admissionNo: "STU1001",
    fatherName: "Rajesh Sharma",
    motherName: "Pooja Sharma",
    dob: "12 May 2013",
    mobile: "9876543210",
    email: "aarav@email.com",
    address: "New Delhi",
    category: "General",
    admissionDate: "01 Apr 2024",
    bloodGroup: "O+",
    academicYear: "2024-25",
    section: "A",
    status: "Active",
    photo: "https://i.pravatar.cc/100",
  };

  const tabs = [
    { key: "overview", label: "Overview", icon: UserRound },
    { key: "attendance", label: "Attendance", icon: CalendarCheck },
    { key: "marks", label: "Marks", icon: Award },
    { key: "fees", label: "Fees", icon: IndianRupee },
    { key: "exams", label: "Exams", icon: BookOpen },
    { key: "assignments", label: "Assignments", icon: FileText },
    { key: "remarks", label: "Remarks", icon: MessageSquareText },
    { key: "documents", label: "Documents", icon: FileText },
    { key: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="student-profile-page">
      <style>{`
        .student-profile-page { padding: 14px 16px 20px; font-size: 0.86rem; color: #1f2937; }
        .student-profile-page .page-header { margin-bottom: 12px; }
        .student-profile-page .page-title { color: #0f172a; font-size: 1.35rem; letter-spacing: 0; }
        .student-profile-page .breadcrumb-lite { color: #64748b; }
        .student-profile-page .section-label { color: #334155; font-size: 0.78rem; font-weight: 800; letter-spacing: 0; text-transform: uppercase; margin-bottom: 8px; }
        .student-profile-page .summary-grid { display: grid; grid-template-columns: repeat(4, minmax(150px, 1fr)); gap: 10px; margin-bottom: 12px; }
        .student-profile-page .summary-card, .student-profile-page .profile-card, .student-profile-page .tabs-card, .student-profile-page .content-card { background: #fff; border: 1px solid #e6ebf2; border-radius: 8px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04); }
        .student-profile-page .summary-card { min-height: 74px; padding: 12px; display: flex; align-items: center; gap: 10px; }
        .student-profile-page .summary-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .student-profile-page .summary-value { margin: 0; font-size: 1.2rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .student-profile-page .summary-title, .student-profile-page .info-label { color: #64748b; font-size: 0.76rem; font-weight: 700; }
        .student-profile-page .info-value { color: #0f172a; font-size: 0.84rem; font-weight: 700; margin-bottom: 8px; }
        .student-profile-page .card-body { padding: 12px !important; }
        .student-profile-page .student-photo { width: 82px; height: 82px; object-fit: cover; border-radius: 8px; border: 1px solid #dbe3ee; }
        .student-profile-page .tab-button { min-height: 33px; border-radius: 7px; }
        .student-profile-page .table-shell { border: 1px solid #e6ebf2; border-radius: 8px; overflow: auto; }
        .student-profile-page .profile-table { min-width: 760px; }
        .student-profile-page .profile-table thead th { background: #f8fafc; color: #0f172a; border-bottom: 1px solid #dbe3ee; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0; }
        .student-profile-page .profile-table tbody td { color: #1f2937; border-bottom-color: #edf2f7; }
        .student-profile-page .profile-table tbody tr:hover td { background: #f8fbff; }
        .student-profile-page .badge { border-radius: 999px; padding: 0.35em 0.65em; font-weight: 700; }
        .student-profile-page .icon-btn { width: 28px; height: 28px; padding: 0; border-radius: 6px; }
        @media (max-width: 992px) { .student-profile-page .summary-grid { grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); } }
        @media (max-width: 768px) { .student-profile-page .breadcrumb-lite { display: none !important; } }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <h3 className="page-title fw-bold mb-0">Student Profile</h3>
        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
          <span>/</span>
          <span>Student</span>
          <span>/</span>
          <span>Student Profile</span>
        </div>
      </div>

      <p className="section-label">Profile Summary</p>
      <div className="summary-grid">
        <SummaryCard title="Academic Year" value={student.academicYear} icon={BookOpen} color="#2563eb" background="#eff6ff" />
        <SummaryCard title="Class & Section" value={student.className} icon={UserRound} color="#16a34a" background="#f0fdf4" />
        <SummaryCard title="Attendance" value="81.90%" icon={CalendarCheck} color="#ea580c" background="#fff7ed" />
        <SummaryCard title="Fee Status" value="Partial" icon={CreditCard} color="#7c3aed" background="#f5f3ff" />
      </div>

      

      <div className="profile-card mb-2">
        <div className="card-body">
          <div className="d-flex gap-3 align-items-start flex-wrap">
            <img src={student.photo} alt={student.name} className="student-photo" />
            <div className="flex-grow-1 min-w-0">
              <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap mb-2">
                <div>
                  <h5 className="fw-bold mb-1">{student.name}</h5>
                  <div className="text-muted small">{student.admissionNo} | Roll No: {student.rollNo}</div>
                </div>
                <span className="badge bg-success">{student.status}</span>
              </div>
              <div className="row">
                {[
                  ["Class", student.className],
                  ["Father Name", student.fatherName],
                  ["Mother Name", student.motherName],
                  ["DOB", student.dob],
                  ["Mobile", student.mobile],
                  ["Email", student.email],
                  ["Admission Date", student.admissionDate],
                  ["Category", student.category],
                ].map(([label, value]) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={label}>
                    <div className="info-label">{label}</div>
                    <div className="info-value text-truncate">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tabs-card mb-2">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.key} className={`btn btn-sm tab-button d-inline-flex align-items-center gap-1 ${activeTab === tab.key ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setActiveTab(tab.key)}>
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activeTab === "overview" && <Overview student={student} />}
      {activeTab === "attendance" && <Attendance />}
      {activeTab === "marks" && <Marks />}
      {activeTab === "fees" && <Fees />}
      {activeTab === "exams" && <Exams />}
      {activeTab === "assignments" && <Assignments />}
      {activeTab === "remarks" && <Remarks />}
      {activeTab === "documents" && <Documents />}
      {activeTab === "notifications" && <Notifications />}
    </div>
  );
};

const SummaryCard = ({ title, value, icon: Icon, color, background }) => (
  <div className="summary-card">
    <div className="summary-icon" style={{ color, background }}>
      <Icon size={21} />
    </div>
    <div className="min-w-0">
      <p className="summary-value">{value}</p>
      <div className="summary-title text-truncate">{title}</div>
    </div>
  </div>
);

const SectionCard = ({ title, children, count }) => (
  <div className="content-card">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
        <p className="section-label mb-0">{title}</p>
        {count && <span className="badge bg-primary-subtle text-primary">{count}</span>}
      </div>
      {children}
    </div>
  </div>
);

const Overview = ({ student }) => (
  <SectionCard title="Personal Information">
    <div className="row">
      {[
        ["Admission Date", student.admissionDate],
        ["Blood Group", student.bloodGroup],
        ["Address", student.address],
        ["Email", student.email],
        ["Category", student.category],
        ["Mobile", student.mobile],
      ].map(([label, value]) => (
        <div className="col-lg-3 col-md-4 col-sm-6" key={label}>
          <div className="info-label">{label}</div>
          <div className="info-value">{value}</div>
        </div>
      ))}
    </div>
  </SectionCard>
);

const Attendance = () => (
  <SectionCard title="Attendance Summary" count="4 Months">
    <div className="summary-grid">
      <SummaryCard title="Working Days" value="210" icon={CalendarCheck} color="#2563eb" background="#eff6ff" />
      <SummaryCard title="Present Days" value="172" icon={CheckCircle2} color="#16a34a" background="#f0fdf4" />
      <SummaryCard title="Absent Days" value="28" icon={AlertCircle} color="#dc2626" background="#fef2f2" />
      <SummaryCard title="Attendance %" value="81.90%" icon={Award} color="#7c3aed" background="#f5f3ff" />
    </div>
    <SimpleTable
      headers={["Month", "Working Days", "Present", "Absent", "Attendance %"]}
      rows={[
        ["April", "22", "18", "2", "81%"],
        ["May", "23", "19", "3", "82%"],
        ["June", "20", "16", "3", "80%"],
        ["July", "22", "17", "4", "77%"],
      ]}
    />
  </SectionCard>
);

const Marks = () => (
  <SectionCard title="Marks Overview" count="3 Exams">
    <SimpleTable
      headers={["Exam", "English", "Hindi", "Maths", "Science", "Total", "Percentage"]}
      rows={[
        ["Unit Test 1", "78", "82", "85", "80", "400", "80%"],
        ["Unit Test 2", "81", "79", "90", "85", "415", "83%"],
        ["Final Exam", "88", "90", "95", "91", "451", "90%"],
      ]}
    />
  </SectionCard>
);

const Fees = () => {
  const totalFees = 18000;
  const paidAmount = 9000;
  const pendingAmount = totalFees - paidAmount;

  return (
    <div className="row g-2">
      <div className="col-12">
        <div className="summary-grid">
          <SummaryCard title="Total Fees" value={money(totalFees)} icon={IndianRupee} color="#2563eb" background="#eff6ff" />
          <SummaryCard title="Paid Amount" value={money(paidAmount)} icon={CheckCircle2} color="#16a34a" background="#f0fdf4" />
          <SummaryCard title="Pending Amount" value={money(pendingAmount)} icon={AlertCircle} color="#dc2626" background="#fef2f2" />
        </div>
      </div>
      <div className="col-lg-6">
        <SectionCard title="Fee Details">
          <SimpleTable headers={["Fee Type", "Amount"]} rows={[["Tuition Fee", money(25000)], ["Admission Fee", money(3000)], ["Exam Fee", money(2000)], ["Transport Fee", money(6000)]]} />
        </SectionCard>
      </div>
      <div className="col-lg-6">
        <SectionCard title="Installment Details">
          <SimpleTable headers={["Installment", "Due Date", "Status"]} rows={[["Installment 1", "10 Apr 2024", <span className="badge bg-success">Paid</span>], ["Installment 2", "10 Jul 2024", <span className="badge bg-warning text-dark">Partial</span>], ["Installment 3", "10 Oct 2024", <span className="badge bg-danger">Pending</span>]]} />
        </SectionCard>
      </div>
    </div>
  );
};

const Exams = () => (
  <SectionCard title="Exam List" count="3 Exams">
    <SimpleTable headers={["Exam Name", "Start Date", "Status"]} rows={[["Unit Test 1", "01 Apr 2024", "Completed"], ["Half Yearly", "01 Sep 2024", "Upcoming"], ["Final Exam", "01 Mar 2025", "Upcoming"]]} />
  </SectionCard>
);

const Assignments = () => (
  <SectionCard title="Assignments" count="2 Tasks">
    <SimpleTable headers={["Title", "Subject", "Status"]} rows={[["Science Project", "Science", <span className="badge bg-warning text-dark">Pending</span>], ["Math Worksheet", "Maths", <span className="badge bg-success">Submitted</span>]]} />
  </SectionCard>
);

const Remarks = () => (
  <SectionCard title="Teacher Remarks">
    <div className="d-grid gap-2">
      {["Excellent performance in Maths.", "Needs improvement in attendance.", "Very active in class activities."].map((remark) => (
        <div className="border rounded-2 p-2 bg-light small" key={remark}>{remark}</div>
      ))}
    </div>
  </SectionCard>
);

const Documents = () => (
  <SectionCard title="Documents" count="4 Documents">
    <SimpleTable
      headers={["Document Name", "Type", "Upload Date", "Action"]}
      rows={[
        ["Aadhaar Card", <span className="badge bg-primary">ID Proof</span>, "01 Apr 2024", <DocumentActions />],
        ["Birth Certificate", <span className="badge bg-primary">ID Proof</span>, "05 Apr 2024", <DocumentActions />],
        ["Previous Marksheet", <span className="badge bg-success">Academic</span>, "10 Apr 2024", <DocumentActions />],
        ["Transfer Certificate", <span className="badge bg-success">Academic</span>, "15 Apr 2024", <DocumentActions />],
      ]}
    />
  </SectionCard>
);

const Notifications = () => (
  <SectionCard title="Recent Notifications" count="3 New">
    <SimpleTable
      headers={["Date", "Title", "Type", "Status"]}
      rows={[
        ["20 Jul 2024", "Holiday Notice", <span className="badge bg-primary">General</span>, <span className="badge bg-primary">New</span>],
        ["18 Jul 2024", "Exam Schedule", <span className="badge bg-success">Exam</span>, <span className="badge bg-success">Read</span>],
        ["15 Jul 2024", "Fee Reminder", <span className="badge bg-warning text-dark">Fee</span>, <span className="badge bg-primary">New</span>],
      ]}
    />
  </SectionCard>
);

const DocumentActions = () => (
  <div className="d-flex gap-2">
    <button className="btn btn-sm btn-outline-primary icon-btn d-inline-flex align-items-center justify-content-center" title="View" aria-label="View document"><Eye size={15} /></button>
    <button className="btn btn-sm btn-outline-success icon-btn d-inline-flex align-items-center justify-content-center" title="Download" aria-label="Download document"><Download size={15} /></button>
    <button className="btn btn-sm btn-outline-secondary icon-btn d-inline-flex align-items-center justify-content-center" title="Upload" aria-label="Upload document"><Upload size={15} /></button>
  </div>
);

const SimpleTable = ({ headers, rows }) => (
  <div className="table-shell">
    <table className="table table-sm table-striped align-middle profile-table mb-0">
      <thead>
        <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`} className={cellIndex === 0 ? "fw-semibold" : ""}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StudentProfile;
