import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  IndianRupee,
  LayoutDashboard,
  Megaphone,
  School,
  Trophy,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const enquiryData = [
  { month: "Apr", enquiry: 170, admission: 60 },
  { month: "May", enquiry: 110, admission: 50 },
  { month: "Jun", enquiry: 130, admission: 55 },
  { month: "Jul", enquiry: 180, admission: 80 },
  { month: "Aug", enquiry: 180, admission: 100 },
  { month: "Sep", enquiry: 180, admission: 70 },
  { month: "Oct", enquiry: 100, admission: 45 },
  { month: "Nov", enquiry: 130, admission: 60 },
  { month: "Dec", enquiry: 200, admission: 80 },
  { month: "Jan", enquiry: 110, admission: 50 },
  { month: "Feb", enquiry: 100, admission: 70 },
  { month: "Mar", enquiry: 130, admission: 70 },
];

const classData = [
  { standard: "5th", students: 612 },
  { standard: "6th", students: 598 },
  { standard: "7th", students: 586 },
  { standard: "8th", students: 565 },
  { standard: "9th", students: 580 },
  { standard: "10th", students: 571 },
];

const genderData = [
  { name: "Boys", value: 1842, color: "#2563eb" },
  { name: "Girls", value: 1670, color: "#db2777" },
];

const feeTrend = [
  { month: "Apr", collection: 8 },
  { month: "May", collection: 20 },
  { month: "Jun", collection: 12 },
  { month: "Jul", collection: 21 },
  { month: "Aug", collection: 30 },
  { month: "Sep", collection: 22 },
  { month: "Oct", collection: 25 },
  { month: "Nov", collection: 20 },
  { month: "Dec", collection: 29 },
  { month: "Jan", collection: 22 },
  { month: "Feb", collection: 31 },
  { month: "Mar", collection: 28 },
];

const feeOverviewData = [
  { name: "Collected", value: 12580000, color: "#16a34a" },
  { name: "Pending", value: 3880000, color: "#ea580c" },
];

const resultData = [
  { name: "Distinction", value: 512, pct: "20.1%", color: "#16a34a" },
  { name: "First Class", value: 1254, pct: "49.3%", color: "#2563eb" },
  { name: "Second Class", value: 612, pct: "24.1%", color: "#ea580c" },
  { name: "Third Class", value: 134, pct: "6.5%", color: "#dc2626" },
];

const staffData = [
  { name: "Teaching Staff", value: 98, color: "#2563eb" },
  { name: "Non-Teaching Staff", value: 30, color: "#16a34a" },
];

const toppers = [
  { rank: 1, name: "Ananya Sharma", standard: "Class 10th", score: "94.8%", color: "#ca8a04" },
  { rank: 2, name: "Rohan Patil", standard: "Class 10th", score: "93.2%", color: "#64748b" },
  { rank: 3, name: "Neha Deshmukh", standard: "Class 10th", score: "92.1%", color: "#b45309" },
];

const alerts = [
  { title: "Monthly fee last date", detail: "31 May 2025", color: "#ea580c", background: "#fff7ed" },
  { title: "PTM meeting", detail: "15 June 2025", color: "#2563eb", background: "#eff6ff" },
  { title: "Summer vacation", detail: "Starts 10 May 2025", color: "#16a34a", background: "#f0fdf4" },
  { title: "Result declaration", detail: "25 June 2025", color: "#7c3aed", background: "#f5f3ff" },
];

const formatAmount = (amount) => `Rs. ${amount.toLocaleString("en-IN")}`;

export default function Dashboard() {
  const summaryCards = [
    { title: "Total Enquiries", value: "1,245", note: "+12.5% vs last year", icon: ClipboardList, color: "#7c3aed", background: "#f5f3ff" },
    { title: "Total Admissions", value: "862", note: "+15.3% vs last year", icon: UserPlus, color: "#2563eb", background: "#eff6ff" },
    { title: "Total Students", value: "3,512", note: "+8.7% vs last year", icon: Users, color: "#16a34a", background: "#f0fdf4" },
    { title: "Total Staff", value: "128", note: "+3.2% vs last year", icon: GraduationCap, color: "#ea580c", background: "#fff7ed" },
    { title: "Fee Collection", value: "Rs. 1.25Cr", note: "+18.6% vs last year", icon: IndianRupee, color: "#dc2626", background: "#fef2f2" },
  ];

  const quickSummary = [
    { label: "New Enquiries Today", value: 34, icon: ClipboardList, color: "#7c3aed", background: "#f5f3ff" },
    { label: "New Admissions This Month", value: 28, icon: UserPlus, color: "#2563eb", background: "#eff6ff" },
    { label: "Fee Due Students", value: 256, icon: Wallet, color: "#ea580c", background: "#fff7ed" },
    { label: "Exams Conducted", value: 12, icon: ClipboardList, color: "#db2777", background: "#fdf2f8" },
    { label: "Upcoming Exams", value: "05", icon: CalendarDays, color: "#16a34a", background: "#f0fdf4" },
  ];

  return (
    <div className="main-dashboard-page">
      <style>{`
        .main-dashboard-page { padding: 14px 16px 20px; font-size: 0.86rem; color: #1f2937; }
        .main-dashboard-page .page-header { margin-bottom: 12px; }
        .main-dashboard-page .page-title { color: #0f172a; font-size: 1.35rem; letter-spacing: 0; }
        .main-dashboard-page .breadcrumb-lite { color: #64748b; }
        .main-dashboard-page .section-label { color: #334155; font-size: 0.78rem; font-weight: 800; letter-spacing: 0; text-transform: uppercase; margin-bottom: 8px; }
        .main-dashboard-page .summary-grid { display: grid; grid-template-columns: repeat(5, minmax(150px, 1fr)); gap: 10px; margin-bottom: 12px; }
        .main-dashboard-page .summary-card, .main-dashboard-page .dashboard-card { background: #fff; border: 1px solid #e6ebf2; border-radius: 8px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04); }
        .main-dashboard-page .summary-card { min-height: 74px; padding: 12px; display: flex; align-items: center; gap: 10px; }
        .main-dashboard-page .summary-icon, .main-dashboard-page .item-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .main-dashboard-page .summary-value { margin: 0; font-size: 1.2rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .main-dashboard-page .summary-title { color: #64748b; font-size: 0.76rem; font-weight: 600; white-space: nowrap; }
        .main-dashboard-page .summary-note { color: #64748b; font-size: 0.72rem; font-weight: 600; }
        .main-dashboard-page .dashboard-card .card-body { padding: 10px 12px !important; }
        .main-dashboard-page .card-heading { color: #0f172a; font-size: 0.84rem; font-weight: 800; margin: 0; }
        .main-dashboard-page .chart-wrap { height: 245px; }
        .main-dashboard-page .small-chart-wrap { height: 188px; }
        .main-dashboard-page .table-shell { border: 1px solid #e6ebf2; border-radius: 8px; overflow: auto; }
        .main-dashboard-page .dashboard-table thead th { background: #f8fafc; color: #0f172a; border-bottom: 1px solid #dbe3ee; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0; }
        .main-dashboard-page .dashboard-table tbody td { color: #1f2937; border-bottom-color: #edf2f7; }
        .main-dashboard-page .dashboard-table tbody tr:hover td { background: #f8fbff; }
        .main-dashboard-page .badge { border-radius: 999px; padding: 0.35em 0.65em; font-weight: 700; }
        .main-dashboard-page .legend-dot { width: 9px; height: 9px; border-radius: 999px; display: inline-block; }
        .main-dashboard-page .list-item { border: 1px solid #e6ebf2; border-radius: 8px; padding: 9px; }
        @media (max-width: 992px) { .main-dashboard-page .summary-grid { grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); } }
        @media (max-width: 768px) { .main-dashboard-page .breadcrumb-lite { display: none !important; } }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <div>
          <h3 className="page-title fw-bold mb-0">Dashboard</h3>
          <div className="text-muted small">Overview of School Management System</div>
        </div>
        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
          <span>/</span>
          <span>School Overview</span>
          <span className="badge bg-danger ms-2 d-inline-flex align-items-center gap-1"><Bell size={12} /> 5</span>
        </div>
      </div>

      <p className="section-label">School Statistics</p>
      <div className="summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div className="summary-card" key={card.title}>
              <div className="summary-icon" style={{ color: card.color, background: card.background }}>
                <Icon size={21} />
              </div>
              <div className="min-w-0">
                <p className="summary-value">{card.value}</p>
                <div className="summary-title text-truncate">{card.title}</div>
                <div className="summary-note text-truncate">{card.note}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row g-2 mb-2">
        <div className="col-xl-4 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="card-heading">Enquiry vs Admission Trend</p>
                <span className="badge bg-primary-subtle text-primary">2024-25</span>
              </div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={enquiryData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="enquiry" fill="#2563eb" radius={[5, 5, 0, 0]} />
                    <Bar dataKey="admission" fill="#16a34a" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="card-heading">Students by Class</p>
                <School size={17} className="text-primary" />
              </div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" />
                    <XAxis dataKey="standard" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="students" fill="#2563eb" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="card-heading">Students by Gender</p>
                <Users size={17} className="text-primary" />
              </div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderData} dataKey="value" innerRadius={58} outerRadius={88} paddingAngle={3}>
                      {genderData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="d-flex justify-content-center gap-3 small flex-wrap">
                {genderData.map((item) => (
                  <span key={item.name} className="d-inline-flex align-items-center gap-1">
                    <span className="legend-dot" style={{ background: item.color }} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-xl-3 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="card-heading">Fee Collection</p>
                <IndianRupee size={17} className="text-success" />
              </div>
              <div className="small-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={feeOverviewData} dataKey="value" innerRadius={48} outerRadius={76} paddingAngle={3}>
                      {feeOverviewData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(value) => formatAmount(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="d-flex justify-content-center gap-3 small flex-wrap">
                {feeOverviewData.map((item) => (
                  <span key={item.name} className="d-inline-flex align-items-center gap-1">
                    <span className="legend-dot" style={{ background: item.color }} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-5 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="card-heading">Fee Collection Trend</p>
                <span className="badge bg-success-subtle text-success">Amount in Lakh</span>
              </div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={feeTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value) => [`${value} Lakhs`, "Collection"]} />
                    <Line type="monotone" dataKey="collection" stroke="#16a34a" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <p className="card-heading mb-2">Result Summary</p>
              <div className="small-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={resultData} dataKey="value" innerRadius={48} outerRadius={76} paddingAngle={3}>
                      {resultData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="row g-1 small">
                {resultData.map((item) => (
                  <div className="col-6 text-truncate" key={item.name}>
                    <span className="legend-dot me-1" style={{ background: item.color }} />
                    {item.name} ({item.pct})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-2">
        <div className="col-xl-3 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <p className="card-heading mb-2">Quick Summary</p>
              <div className="d-flex flex-column gap-2">
                {quickSummary.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="list-item d-flex align-items-center justify-content-between gap-2" key={item.label}>
                      <div className="d-flex align-items-center gap-2 min-w-0">
                        <div className="item-icon" style={{ color: item.color, background: item.background }}>
                          <Icon size={18} />
                        </div>
                        <div className="fw-semibold text-truncate">{item.label}</div>
                      </div>
                      <strong>{item.value}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <p className="card-heading mb-2">Notice / Alerts</p>
              <div className="d-flex flex-column gap-2">
                {alerts.map((item) => (
                  <div className="list-item d-flex align-items-center gap-2" key={item.title}>
                    <div className="item-icon" style={{ color: item.color, background: item.background }}>
                      <Megaphone size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="fw-semibold text-truncate">{item.title}</div>
                      <div className="small text-muted text-truncate">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="card-heading">Staff Overview</p>
                <GraduationCap size={17} className="text-primary" />
              </div>
              <div className="small-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={staffData} dataKey="value" innerRadius={48} outerRadius={76} paddingAngle={3}>
                      {staffData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="d-flex justify-content-center gap-3 small flex-wrap">
                {staffData.map((item) => (
                  <span key={item.name} className="d-inline-flex align-items-center gap-1">
                    <span className="legend-dot" style={{ background: item.color }} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                <p className="card-heading">Top Toppers</p>
                <Trophy size={17} className="text-warning" />
              </div>
              <div className="table-shell">
                <table className="table table-sm table-striped align-middle dashboard-table mb-0">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Student</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toppers.map((student) => (
                      <tr key={student.rank}>
                        <td><span className="badge bg-warning text-dark">#{student.rank}</span></td>
                        <td>
                          <div className="fw-semibold text-nowrap">{student.name}</div>
                          <div className="small text-muted">{student.standard}</div>
                        </td>
                        <td className="fw-bold" style={{ color: student.color }}>{student.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="small text-muted mt-2 d-flex align-items-center gap-1">
                <AlertCircle size={13} />
                Latest exam performance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
