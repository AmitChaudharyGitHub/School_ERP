import React, { useMemo, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileClock,
  FileText,
  IndianRupee,
  LayoutDashboard,
  RotateCcw,
  Search,
  TrendingUp,
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

const AdmissionDashboard = () => {
  const [filters, setFilters] = useState({
    academicYear: "2024-25",
    standard: "",
    admissionStatus: "",
  });

  const admissions = useMemo(
    () => [
      { name: "Aarav Sharma", standard: "Class 6", gender: "Male", status: "Confirmed", feeStatus: "Pending", pendingFee: 45000, documentStatus: "Pending" },
      { name: "Diya Patel", standard: "Class 8", gender: "Female", status: "Confirmed", feeStatus: "Pending", pendingFee: 40000, documentStatus: "Verified" },
      { name: "Rohan Verma", standard: "Class 7", gender: "Male", status: "Provisional", feeStatus: "Partial", pendingFee: 38000, documentStatus: "Pending" },
      { name: "Anaya Singh", standard: "Class 9", gender: "Female", status: "Pending", feeStatus: "Pending", pendingFee: 35000, documentStatus: "Pending" },
      { name: "Vihaan Gupta", standard: "Class 10", gender: "Male", status: "Confirmed", feeStatus: "Pending", pendingFee: 32000, documentStatus: "Verified" },
    ],
    []
  );

  const admissionTrend = [
    { month: "Apr", admissions: 20 },
    { month: "May", admissions: 55 },
    { month: "Jun", admissions: 50 },
    { month: "Jul", admissions: 82 },
    { month: "Aug", admissions: 42 },
    { month: "Sep", admissions: 30 },
    { month: "Oct", admissions: 60 },
    { month: "Nov", admissions: 72 },
    { month: "Dec", admissions: 45 },
    { month: "Jan", admissions: 50 },
    { month: "Feb", admissions: 95 },
  ];

  const feeTrend = [
    { month: "Apr", expected: 10, collected: 3 },
    { month: "May", expected: 12, collected: 4 },
    { month: "Jun", expected: 25, collected: 8 },
    { month: "Jul", expected: 18, collected: 8 },
    { month: "Aug", expected: 30, collected: 15 },
    { month: "Sep", expected: 20, collected: 12 },
    { month: "Oct", expected: 35, collected: 20 },
    { month: "Nov", expected: 28, collected: 15 },
    { month: "Dec", expected: 30, collected: 18 },
    { month: "Jan", expected: 32, collected: 17 },
    { month: "Feb", expected: 25, collected: 23 },
  ];

  const genderClassData = [
    { standard: "Class 5", male: 64, female: 52, total: 116 },
    { standard: "Class 6", male: 58, female: 48, total: 106 },
    { standard: "Class 7", male: 56, female: 44, total: 100 },
    { standard: "Class 8", male: 54, female: 42, total: 96 },
    { standard: "Class 9", male: 42, female: 38, total: 80 },
  ];

  const feeCollectionData = [
    { name: "Collected", value: 2845000, color: "#16a34a" },
    { name: "Pending", value: 2030000, color: "#ea580c" },
  ];

  const paymentPlanData = [
    { name: "1 Installment", value: 120, color: "#2563eb" },
    { name: "2 Installments", value: 180, color: "#16a34a" },
    { name: "3 Installments", value: 130, color: "#ea580c" },
    { name: "4+ Installments", value: 82, color: "#7c3aed" },
  ];

  const docVerificationData = [
    { name: "Verified", value: 412, color: "#16a34a" },
    { name: "Pending", value: 100, color: "#ea580c" },
  ];

  const pendingItems = [
    { title: "Documents Pending", value: 100, icon: FileClock, color: "#ea580c", background: "#fff7ed" },
    { title: "Fee Pending", value: 198, icon: Wallet, color: "#dc2626", background: "#fef2f2" },
    { title: "Approval Pending", value: 45, icon: Clock3, color: "#2563eb", background: "#eff6ff" },
    { title: "Verification Pending", value: 25, icon: AlertCircle, color: "#7c3aed", background: "#f5f3ff" },
  ];

  const summaryCards = [
    { title: "Total Admissions", value: "512", note: "+1.6% from last year", icon: UserPlus, color: "#2563eb", background: "#eff6ff" },
    { title: "Expected Fee", value: "Rs. 48.75L", note: "+12.5% from last year", icon: IndianRupee, color: "#ea580c", background: "#fff7ed" },
    { title: "Fee Collected", value: "Rs. 28.45L", note: "+10.3% from last year", icon: Wallet, color: "#16a34a", background: "#f0fdf4" },
    { title: "Fee Pending", value: "Rs. 20.30L", note: "198 students pending", icon: Clock3, color: "#dc2626", background: "#fef2f2" },
    { title: "Docs Verified", value: "412", note: "80.47% completed", icon: CheckCircle2, color: "#7c3aed", background: "#f5f3ff" },
  ];

  const filteredOutstanding = admissions.filter((item) => {
    const matchesStandard = !filters.standard || item.standard === filters.standard;
    const matchesStatus = !filters.admissionStatus || item.status === filters.admissionStatus;
    return matchesStandard && matchesStatus;
  });

  const resetFilters = () => {
    setFilters({
      academicYear: "2024-25",
      standard: "",
      admissionStatus: "",
    });
  };

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const formatAmount = (amount) => `Rs. ${amount.toLocaleString("en-IN")}`;

  // allow page scrolling; scrollbar visuals will be hidden via CSS

  return (
    <div className="container-fluid admission-page w-100">
      <style>{`
        .admission-page {
          min-height: calc(100vh - 20px);
          background: #f6f8fb;
          color: #172033;
          -ms-overflow-style: none; /* IE and Edge - hide scrollbar visuals */
          scrollbar-width: none; /* Firefox */
        }

        .admission-page::-webkit-scrollbar { width: 0; height: 0; }

        .admission-page .page-header {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-left: 4px solid #2563eb;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 10px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .admission-page .page-title {
          color: #1d4ed8;
          font-size: 1.25rem;
          line-height: 1.2;
        }

        .admission-page .breadcrumb-lite {
          color: #64748b;
        }

        .admission-page .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 8px;
          color: #1e3a8a;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .admission-page .section-label::before {
          content: "";
          width: 6px;
          height: 18px;
          border-radius: 999px;
          background: #2563eb;
        }

        .admission-page .summary-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(150px, 1fr));
          gap: 10px;
          margin-bottom: 10px;
        }

        .admission-page .summary-card {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          background: #fff;
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          padding: 10px 12px;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
        }

        .admission-page .summary-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .admission-page .summary-value {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.1;
        }

        .admission-page .summary-title {
          color: #64748b;
          font-size: 0.76rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .admission-page .filter-card,
        .admission-page .grid-card {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .admission-page .filter-card {
          margin-bottom: 10px;
        }

        .admission-page .filter-card .card-body,
        .admission-page .grid-card .card-body {
          padding: 10px 12px !important;
        }

        .admission-page .filter-actions .btn,
        .admission-page .icon-btn {
          width: 31px;
          height: 31px;
          padding: 0;
          border-radius: 7px;
        }

        .admission-page .primary-action {
          min-height: 32px;
          border-radius: 7px;
          font-weight: 700;
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18);
        }

        .admission-page .chart-wrap {
          height: 245px;
        }

        .admission-page .small-chart-wrap {
          height: 188px;
        }

        .admission-page .dashboard-card {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .admission-page .card-heading {
          color: #0f172a;
          font-size: 0.84rem;
          font-weight: 800;
          margin: 0;
        }

        .admission-page .pending-item {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          padding: 9px;
          background: #fff;
        }

        .admission-page .pending-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .admission-page .legend-dot {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          display: inline-block;
        }

        .admission-page .table-shell {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          overflow-x: auto; /* allow horizontal scrolling if needed */
          overflow-y: auto; /* allow vertical scrolling when needed */
          -ms-overflow-style: none; /* hide scrollbar visuals */
          scrollbar-width: none;
        }

        .admission-page .table-shell::-webkit-scrollbar { width: 0; height: 0; }

        .admission-page .dashboard-table,
        .admission-page .admission-table {
          table-layout: fixed;
        }

        .admission-page .dashboard-table th,
        .admission-page .dashboard-table td,
        .admission-page .admission-table th,
        .admission-page .admission-table td {
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }

        .admission-page .dashboard-table thead th,
        .admission-page .admission-table thead th {
          background: #f8fafc;
          color: #0f172a;
          border-bottom: 1px solid #dbe3ee;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0;
        }

        .admission-page .dashboard-table tbody td,
        .admission-page .admission-table tbody td {
          color: #1f2937;
          border-bottom-color: #edf2f7;
        }

        .admission-page .dashboard-table tbody tr:hover td,
        .admission-page .admission-table tbody tr:hover td {
          background: #f8fbff;
        }

        .admission-page .badge {
          border-radius: 999px;
          padding: 0.35em 0.65em;
          font-weight: 700;
        }

        @media (max-width: 1280px) {
          .admission-page .summary-grid {
            grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .admission-page .page-header {
            align-items: flex-start !important;
          }

          .admission-page .breadcrumb-lite {
            display: none !important;
          }
        }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <div>
          <h3 className="page-title fw-bold mb-0">Admission Dashboard</h3>
        </div>

        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
          <span>/</span>
          <span>Admission</span>
          <span>/</span>
          <span>Overview</span>
        </div>
      </div>

      <p className="section-label">Admission Statistics</p>

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

      <h5 className="section-label">Filter</h5>

      <div className="filter-card">
        <div className="card-body">
          <div className="d-flex align-items-end gap-2 flex-wrap">
            <div style={{ flex: "1 1 170px", minWidth: "150px" }}>
              <label className="form-label small mb-1">Academic Year</label>
              <select
                className="form-select form-select-sm"
                value={filters.academicYear}
                onChange={(event) => updateFilter("academicYear", event.target.value)}
              >
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
              </select>
            </div>

            <div style={{ flex: "1 1 170px", minWidth: "150px" }}>
              <label className="form-label small mb-1">Standard</label>
              <select
                className="form-select form-select-sm"
                value={filters.standard}
                onChange={(event) => updateFilter("standard", event.target.value)}
              >
                <option value="">All Standards</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>

            <div style={{ flex: "1 1 170px", minWidth: "150px" }}>
              <label className="form-label small mb-1">Admission Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.admissionStatus}
                onChange={(event) => updateFilter("admissionStatus", event.target.value)}
              >
                <option value="">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Provisional">Provisional</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div style={{ flex: "1.4 1 220px", minWidth: "210px" }}>
              <label className="form-label small mb-1">Admission Month</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-primary text-white border-primary px-2">
                  <CalendarDays size={12} />
                </span>
                <input className="form-control" value="Apr 2024 - Feb 2025" readOnly />
              </div>
            </div>

            <div className="filter-actions d-flex align-items-end gap-2" style={{ flex: "0 0 72px" }}>
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center"
                aria-label="Search"
                title="Search"
              >
                <Search size={16} />
              </button>

              <button
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                aria-label="Reset"
                title="Reset"
                onClick={resetFilters}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-xl-4 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="card-heading">Admissions Trend</p>
                <span className="badge bg-primary-subtle text-primary">Monthly</span>
              </div>

              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={admissionTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="admissions" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="card-heading">Fee Collection Trend</p>
                <span className="badge bg-success-subtle text-success">Amount in Lakh</span>
              </div>

              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={feeTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="expected" stroke="#7c3aed" strokeWidth={2} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="collected" stroke="#16a34a" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="card-heading">Class Wise Admissions</p>
                <Users size={17} className="text-primary" />
              </div>

              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genderClassData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" />
                    <XAxis dataKey="standard" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="male" fill="#2563eb" radius={[5, 5, 0, 0]} />
                    <Bar dataKey="female" fill="#db2777" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-2">
        <div className="col-xl-3 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <p className="card-heading mb-2">Pending Overview</p>

              <div className="d-flex flex-column gap-2">
                {pendingItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="pending-item d-flex align-items-center justify-content-between gap-2" key={item.title}>
                      <div className="d-flex align-items-center gap-2 min-w-0">
                        <div className="pending-icon" style={{ color: item.color, background: item.background }}>
                          <Icon size={18} />
                        </div>
                        <div className="fw-semibold text-truncate">{item.title}</div>
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
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="card-heading">Fee Collection</p>
                <IndianRupee size={17} className="text-success" />
              </div>

              <div className="small-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={feeCollectionData} dataKey="value" innerRadius={48} outerRadius={76} paddingAngle={3}>
                      {feeCollectionData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatAmount(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="d-flex justify-content-center gap-3 small">
                {feeCollectionData.map((item) => (
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
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="card-heading">Payment Plans</p>
                <TrendingUp size={17} className="text-primary" />
              </div>

              <div className="small-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={paymentPlanData} dataKey="value" innerRadius={48} outerRadius={76} paddingAngle={3}>
                      {paymentPlanData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="row g-1 small">
                {paymentPlanData.map((item) => (
                  <div className="col-6 text-truncate" key={item.name}>
                    <span className="legend-dot me-1" style={{ background: item.color }} />
                    {item.name}
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
                <p className="card-heading">Document Status</p>
                <FileText size={17} className="text-primary" />
              </div>

              <div className="small-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={docVerificationData} dataKey="value" innerRadius={48} outerRadius={76} paddingAngle={3}>
                      {docVerificationData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="d-flex justify-content-center gap-3 small">
                {docVerificationData.map((item) => (
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
              <p className="card-heading mb-2">Gender & Class Wise Admissions</p>

              <div className="table-shell">
                <table className="table table-sm table-striped align-middle dashboard-table mb-0">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Male</th>
                      <th>Female</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genderClassData.map((item) => (
                      <tr key={item.standard}>
                        <td className="fw-semibold">{item.standard}</td>
                        <td>{item.male}</td>
                        <td>{item.female}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-7 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                <p className="card-heading">Top Fee Outstanding</p>
                <button type="button" className="btn btn-primary btn-sm">View All</button>
              </div>

              <div className="table-shell">
                <table className="table table-sm table-striped align-middle dashboard-table mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Admission</th>
                      <th>Document</th>
                      <th>Document Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOutstanding.map((item) => (
                      <tr key={item.name}>
                        <td className="fw-semibold text-nowrap">{item.name}</td>
                        <td>{item.standard}</td>
                        <td>
                          <span className={`badge ${
                            item.status === "Confirmed"
                              ? "bg-success"
                              : item.status === "Provisional"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${item.documentStatus === "Verified" ? "bg-success" : "bg-warning text-dark"}`}>
                            {item.documentStatus}
                          </span>
                        </td>
                        <td className="fw-bold">{formatAmount(item.pendingFee)}</td>
                      </tr>
                    ))}

                    {filteredOutstanding.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          No outstanding fee records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionDashboard;
