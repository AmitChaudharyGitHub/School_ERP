import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  RotateCcw,
  Search,
  TrendingUp,
  UserCheck,
  UserX,
  Users,
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

const AttendanceDashboard = () => {
  const [filters, setFilters] = useState({
    academicYear: "2025-26",
    standard: "",
    division: "",
  });

  const summaryCards = [
    { title: "Total Students", value: "1,248", note: "Enrolled students", icon: Users, color: "#2563eb", background: "#eff6ff" },
    { title: "Present Today", value: "1,120", note: "+32 from yesterday", icon: UserCheck, color: "#16a34a", background: "#f0fdf4" },
    { title: "Absent Today", value: "128", note: "10.26% absent", icon: UserX, color: "#dc2626", background: "#fef2f2" },
    { title: "Attendance Avg.", value: "89.74%", note: "+2.45% this month", icon: TrendingUp, color: "#7c3aed", background: "#f5f3ff" },
    { title: "Late Entries", value: "24", note: "5 fewer than yesterday", icon: Clock3, color: "#ea580c", background: "#fff7ed" },
  ];

  const monthlyTrend = [
    { month: "Jan", attendance: 86 },
    { month: "Feb", attendance: 88 },
    { month: "Mar", attendance: 91 },
    { month: "Apr", attendance: 87 },
    { month: "May", attendance: 90 },
    { month: "Jun", attendance: 94 },
    { month: "Jul", attendance: 86 },
    { month: "Aug", attendance: 89 },
    { month: "Sep", attendance: 85 },
    { month: "Oct", attendance: 88 },
    { month: "Nov", attendance: 92 },
  ];

  const classData = [
    { standard: "6-A", present: 58, absent: 4, late: 2 },
    { standard: "6-B", present: 56, absent: 6, late: 1 },
    { standard: "7-A", present: 60, absent: 5, late: 3 },
    { standard: "7-B", present: 57, absent: 8, late: 2 },
    { standard: "8-A", present: 62, absent: 6, late: 1 },
    { standard: "8-B", present: 59, absent: 7, late: 3 },
  ];

  const statusData = [
    { name: "Present", value: 1120, color: "#16a34a" },
    { name: "Absent", value: 128, color: "#dc2626" },
    { name: "Late", value: 24, color: "#ea580c" },
  ];

  const pendingItems = [
    { title: "Leave Requests", value: 12, icon: CalendarDays, color: "#2563eb", background: "#eff6ff" },
    { title: "Not Marked", value: 3, icon: AlertCircle, color: "#dc2626", background: "#fef2f2" },
    { title: "Late Approvals", value: 8, icon: Clock3, color: "#ea580c", background: "#fff7ed" },
    { title: "Completed Classes", value: 26, icon: CheckCircle2, color: "#16a34a", background: "#f0fdf4" },
  ];

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const resetFilters = () => setFilters({ academicYear: "2025-26", standard: "", division: "" });

  return (
    <div className="attendance-page">
      <style>{`
        .attendance-page { padding: 14px 16px 20px; font-size: 0.86rem; color: #1f2937; }
        .attendance-page .page-header { margin-bottom: 12px; }
        .attendance-page .page-title { color: #0f172a; font-size: 1.35rem; letter-spacing: 0; }
        .attendance-page .breadcrumb-lite { color: #64748b; }
        .attendance-page .section-label { color: #334155; font-size: 0.78rem; font-weight: 800; letter-spacing: 0; text-transform: uppercase; margin-bottom: 8px; }
        .attendance-page .summary-grid { display: grid; grid-template-columns: repeat(5, minmax(150px, 1fr)); gap: 10px; margin-bottom: 12px; }
        .attendance-page .summary-card, .attendance-page .filter-card, .attendance-page .dashboard-card { background: #fff; border: 1px solid #e6ebf2; border-radius: 8px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04); }
        .attendance-page .summary-card { min-height: 74px; padding: 12px; display: flex; align-items: center; gap: 10px; }
        .attendance-page .summary-icon, .attendance-page .pending-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .attendance-page .summary-value { margin: 0; font-size: 1.2rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .attendance-page .summary-title { color: #64748b; font-size: 0.76rem; font-weight: 600; white-space: nowrap; }
        .attendance-page .summary-note { color: #64748b; font-size: 0.72rem; font-weight: 600; }
        .attendance-page .filter-card { margin-bottom: 10px; }
        .attendance-page .filter-card .card-body, .attendance-page .dashboard-card .card-body { padding: 10px 12px !important; }
        .attendance-page .card-heading { color: #0f172a; font-size: 0.84rem; font-weight: 800; margin: 0; }
        .attendance-page .chart-wrap { height: 245px; }
        .attendance-page .small-chart-wrap { height: 188px; }
        .attendance-page .filter-actions .btn { width: 31px; height: 31px; padding: 0; border-radius: 7px; }
        .attendance-page .table-shell { border: 1px solid #e6ebf2; border-radius: 8px; overflow: auto; }
        .attendance-page .dashboard-table thead th { background: #f8fafc; color: #0f172a; border-bottom: 1px solid #dbe3ee; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0; }
        .attendance-page .dashboard-table tbody td { color: #1f2937; border-bottom-color: #edf2f7; }
        .attendance-page .dashboard-table tbody tr:hover td { background: #f8fbff; }
        .attendance-page .badge { border-radius: 999px; padding: 0.35em 0.65em; font-weight: 700; }
        .attendance-page .pending-item { border: 1px solid #e6ebf2; border-radius: 8px; padding: 9px; }
        .attendance-page .legend-dot { width: 9px; height: 9px; border-radius: 999px; display: inline-block; }
        @media (max-width: 992px) { .attendance-page .summary-grid { grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); } }
        @media (max-width: 768px) { .attendance-page .breadcrumb-lite { display: none !important; } }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <h3 className="page-title fw-bold mb-0">Attendance Dashboard</h3>
        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span><span>/</span><span>Attendance</span><span>/</span><span>Overview</span>
        </div>
      </div>

      <p className="section-label">Attendance Statistics</p>
      <div className="summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div className="summary-card" key={card.title}>
              <div className="summary-icon" style={{ color: card.color, background: card.background }}><Icon size={21} /></div>
              <div className="min-w-0">
                <p className="summary-value">{card.value}</p>
                <div className="summary-title text-truncate">{card.title}</div>
                <div className="summary-note text-truncate">{card.note}</div>
              </div>
            </div>
          );
        })}
      </div>

      <h5 className="section-label">Filter</h5>
      <div className="filter-card">
        <div className="card-body">
          <div className="d-flex align-items-end gap-2 flex-wrap">
            <div style={{ flex: "1 1 170px", minWidth: "150px" }}>
              <label className="form-label small mb-1">Academic Year</label>
              <select className="form-select form-select-sm" value={filters.academicYear} onChange={(event) => updateFilter("academicYear", event.target.value)}>
                <option>2025-26</option><option>2024-25</option>
              </select>
            </div>
            <div style={{ flex: "1 1 170px", minWidth: "150px" }}>
              <label className="form-label small mb-1">Class</label>
              <select className="form-select form-select-sm" value={filters.standard} onChange={(event) => updateFilter("standard", event.target.value)}>
                <option value="">All Classes</option><option>6-A</option><option>7-A</option><option>8-A</option><option>9-A</option><option>10-A</option>
              </select>
            </div>
            <div style={{ flex: "1 1 170px", minWidth: "150px" }}>
              <label className="form-label small mb-1">Division</label>
              <select className="form-select form-select-sm" value={filters.division} onChange={(event) => updateFilter("division", event.target.value)}>
                <option value="">All Divisions</option><option>A</option><option>B</option><option>C</option>
              </select>
            </div>
            <div style={{ flex: "1.4 1 220px", minWidth: "210px" }}>
              <label className="form-label small mb-1">Date</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-primary text-white border-primary px-2"><CalendarDays size={12} /></span>
                <input className="form-control" value="Today, 20 May 2025" readOnly />
              </div>
            </div>
            <div className="filter-actions d-flex align-items-end gap-2" style={{ flex: "0 0 72px" }}>
              <button className="btn btn-primary d-flex align-items-center justify-content-center" aria-label="Search" title="Search"><Search size={16} /></button>
              <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" aria-label="Reset" title="Reset" onClick={resetFilters}><RotateCcw size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-xl-4 col-lg-6">
          <div className="dashboard-card h-100"><div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-2"><p className="card-heading">Monthly Attendance Trend</p><span className="badge bg-primary-subtle text-primary">Percent</span></div>
            <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><LineChart data={monthlyTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" /><XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip /><Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} /></LineChart></ResponsiveContainer></div>
          </div></div>
        </div>
        <div className="col-xl-4 col-lg-6">
          <div className="dashboard-card h-100"><div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-2"><p className="card-heading">Class Wise Attendance</p><Users size={17} className="text-primary" /></div>
            <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={classData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" /><XAxis dataKey="standard" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip /><Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} /><Bar dataKey="present" fill="#16a34a" radius={[5, 5, 0, 0]} /><Bar dataKey="absent" fill="#dc2626" radius={[5, 5, 0, 0]} /><Bar dataKey="late" fill="#ea580c" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>
          </div></div>
        </div>
        <div className="col-xl-4">
          <div className="dashboard-card h-100"><div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2"><p className="card-heading">Present vs Absent</p><UserCheck size={17} className="text-success" /></div>
            <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} dataKey="value" innerRadius={58} outerRadius={88} paddingAngle={3}>{statusData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
            <div className="d-flex justify-content-center gap-3 small flex-wrap">{statusData.map((item) => <span key={item.name} className="d-inline-flex align-items-center gap-1"><span className="legend-dot" style={{ background: item.color }} />{item.name}</span>)}</div>
          </div></div>
        </div>
      </div>

      <div className="row g-2">
        <div className="col-xl-3 col-lg-6">
          <div className="dashboard-card h-100"><div className="card-body">
            <p className="card-heading mb-2">Attendance Follow-Up</p>
            <div className="d-flex flex-column gap-2">{pendingItems.map((item) => { const Icon = item.icon; return <div className="pending-item d-flex align-items-center justify-content-between gap-2" key={item.title}><div className="d-flex align-items-center gap-2 min-w-0"><div className="pending-icon" style={{ color: item.color, background: item.background }}><Icon size={18} /></div><div className="fw-semibold text-truncate">{item.title}</div></div><strong>{item.value}</strong></div>; })}</div>
          </div></div>
        </div>
        <div className="col-xl-9 col-lg-6">
          <div className="dashboard-card h-100"><div className="card-body">
            <div className="d-flex justify-content-between align-items-center gap-2 mb-2"><p className="card-heading">Today's Class Summary</p><button type="button" className="btn btn-primary btn-sm">View All</button></div>
            <div className="table-shell">
              <table className="table table-sm table-striped align-middle dashboard-table mb-0">
                <thead><tr><th>Class</th><th>Present</th><th>Absent</th><th>Late</th><th>Attendance</th><th>Status</th></tr></thead>
                <tbody>{classData.map((row) => {
                  const total = row.present + row.absent + row.late;
                  const percent = Math.round((row.present / total) * 100);
                  return <tr key={row.standard}><td className="fw-semibold">{row.standard}</td><td>{row.present}</td><td>{row.absent}</td><td>{row.late}</td><td className="fw-bold">{percent}%</td><td><span className={`badge ${percent >= 90 ? "bg-success" : percent >= 85 ? "bg-warning text-dark" : "bg-danger"}`}>{percent >= 90 ? "Good" : percent >= 85 ? "Review" : "Low"}</span></td></tr>;
                })}</tbody>
              </table>
            </div>
          </div></div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
