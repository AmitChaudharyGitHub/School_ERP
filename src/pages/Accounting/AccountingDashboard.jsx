import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  IndianRupee,
  LayoutDashboard,
  ReceiptText,
  RotateCcw,
  Search,
  TrendingUp,
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

const AccountingDashboard = () => {
  const [filters, setFilters] = useState({
    academicYear: "2024-25",
    standard: "",
    feeStatus: "",
  });

  const feeRecords = useMemo(
    () => [
      { name: "Aarav Sharma", standard: "Class 5", rollNo: "05A-021", status: "Paid", amount: 5000, dueAmount: 0, receipt: "RCPT00125", date: "20 May 2024", mode: "UPI" },
      { name: "Diya Patel", standard: "Class 6", rollNo: "06B-014", status: "Partial", amount: 4500, dueAmount: 15500, receipt: "RCPT00124", date: "20 May 2024", mode: "Card" },
      { name: "Rohan Verma", standard: "Class 7", rollNo: "07A-009", status: "Pending", amount: 0, dueAmount: 18000, receipt: "-", date: "19 May 2024", mode: "-" },
      { name: "Sneha Singh", standard: "Class 8", rollNo: "08A-017", status: "Paid", amount: 6000, dueAmount: 0, receipt: "RCPT00123", date: "19 May 2024", mode: "Cash" },
      { name: "Kabir Khan", standard: "Class 9", rollNo: "09B-011", status: "Partial", amount: 7000, dueAmount: 11500, receipt: "RCPT00121", date: "18 May 2024", mode: "UPI" },
    ],
    []
  );

  const monthlyFeeTrend = [
    { month: "Apr", expected: 18, collected: 12, pending: 6 },
    { month: "May", expected: 22, collected: 15, pending: 7 },
    { month: "Jun", expected: 20, collected: 14, pending: 6 },
    { month: "Jul", expected: 28, collected: 21, pending: 7 },
    { month: "Aug", expected: 24, collected: 19, pending: 5 },
    { month: "Sep", expected: 30, collected: 23, pending: 7 },
    { month: "Oct", expected: 26, collected: 20, pending: 6 },
    { month: "Nov", expected: 34, collected: 27, pending: 7 },
    { month: "Dec", expected: 31, collected: 24, pending: 7 },
    { month: "Jan", expected: 36, collected: 29, pending: 7 },
    { month: "Feb", expected: 32, collected: 27, pending: 5 },
  ];

  const classWiseDue = [
    { standard: "Class 5", collected: 420000, pending: 120000 },
    { standard: "Class 6", collected: 510000, pending: 180000 },
    { standard: "Class 7", collected: 480000, pending: 210000 },
    { standard: "Class 8", collected: 455000, pending: 110000 },
    { standard: "Class 9", collected: 500500, pending: 70500 },
  ];

  const collectionStatusData = [
    { name: "Collected", value: 1865500, color: "#16a34a" },
    { name: "Pending", value: 712500, color: "#dc2626" },
    { name: "Concession", value: 135000, color: "#2563eb" },
  ];

  const paymentModeData = [
    { name: "UPI", value: 46, color: "#2563eb" },
    { name: "Cash", value: 24, color: "#16a34a" },
    { name: "Card", value: 18, color: "#ea580c" },
    { name: "Bank", value: 12, color: "#7c3aed" },
  ];

  const pendingItems = [
    { title: "Overdue Students", value: 198, icon: AlertCircle, color: "#dc2626", background: "#fef2f2" },
    { title: "Due This Week", value: 64, icon: Clock3, color: "#ea580c", background: "#fff7ed" },
    { title: "Receipts Issued", value: 356, icon: ReceiptText, color: "#2563eb", background: "#eff6ff" },
    { title: "Fully Paid", value: 1050, icon: CheckCircle2, color: "#16a34a", background: "#f0fdf4" },
  ];

  const summaryCards = [
    { title: "Total Students", value: "1,248", note: "+12% from last month", icon: Users, color: "#2563eb", background: "#eff6ff" },
    { title: "Total Fees Due", value: "Rs. 25.78L", note: "Academic year 2024-25", icon: IndianRupee, color: "#ea580c", background: "#fff7ed" },
    { title: "Fee Collected", value: "Rs. 18.65L", note: "+15% from last month", icon: Wallet, color: "#16a34a", background: "#f0fdf4" },
    { title: "Fee Pending", value: "Rs. 7.12L", note: "198 students pending", icon: Clock3, color: "#dc2626", background: "#fef2f2" },
    { title: "Concessions", value: "Rs. 1.35L", note: "42 approved cases", icon: CreditCard, color: "#7c3aed", background: "#f5f3ff" },
  ];

  const filteredFeeRecords = feeRecords.filter((item) => {
    const matchesStandard = !filters.standard || item.standard === filters.standard;
    const matchesStatus = !filters.feeStatus || item.status === filters.feeStatus;
    return matchesStandard && matchesStatus;
  });

  const resetFilters = () => {
    setFilters({
      academicYear: "2024-25",
      standard: "",
      feeStatus: "",
    });
  };

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const formatAmount = (amount) => `Rs. ${amount.toLocaleString("en-IN")}`;

  return (
    <div className="container-fluid admission-page w-100">
      <style>{`
        .admission-page {
          min-height: calc(100vh - 20px);
          background: #f6f8fb;
          color: #172033;
        }

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

        .admission-page .dashboard-card {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
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

        .admission-page .card-heading {
          color: #0f172a;
          font-size: 0.84rem;
          font-weight: 800;
          margin: 0;
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

        .admission-page .dashboard-card {
          overflow: visible;
        }

        .admission-page .card-body {
          overflow: visible;
        }

        .admission-page .chart-wrap {
          height: 245px;
          width: 100%;
          min-width: 0;
        }

        .admission-page .small-chart-wrap {
          height: 188px;
          width: 100%;
          min-width: 0;
        }

        .admission-page .table-shell {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          overflow: auto;
        }

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
          <h3 className="page-title fw-bold mb-0">Accounting Dashboard</h3>
        </div>

        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
          <span>/</span>
          <span>Accounting</span>
          <span>/</span>
          <span>Student Fees</span>
        </div>
      </div>

      <p className="section-label">Student Fee Statistics</p>

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
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
              </select>
            </div>

            <div style={{ flex: "1 1 170px", minWidth: "150px" }}>
              <label className="form-label small mb-1">Fee Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.feeStatus}
                onChange={(event) => updateFilter("feeStatus", event.target.value)}
              >
                <option value="">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div style={{ flex: "1.4 1 220px", minWidth: "210px" }}>
              <label className="form-label small mb-1">Fee Period</label>
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
                <p className="card-heading">Monthly Fee Trend</p>
                <span className="badge bg-success-subtle text-success">Amount in Lakh</span>
              </div>

              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyFeeTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="expected" stroke="#7c3aed" strokeWidth={2} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="collected" stroke="#16a34a" strokeWidth={3} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="pending" stroke="#dc2626" strokeWidth={2} dot={{ r: 2 }} />
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
                <p className="card-heading">Class Wise Fee</p>
                <IndianRupee size={17} className="text-success" />
              </div>

              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classWiseDue} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="#e6ebf2" strokeDasharray="3 3" />
                    <XAxis dataKey="standard" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 100000}L`} />
                    <Tooltip formatter={(value) => formatAmount(value)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="collected" fill="#16a34a" radius={[5, 5, 0, 0]} />
                    <Bar dataKey="pending" fill="#dc2626" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="card-heading">Collection Status</p>
                <Wallet size={17} className="text-primary" />
              </div>

              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={collectionStatusData} dataKey="value" innerRadius={58} outerRadius={88} paddingAngle={3}>
                      {collectionStatusData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatAmount(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="d-flex justify-content-center gap-3 small flex-wrap">
                {collectionStatusData.map((item) => (
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

      <div className="row g-2">
        <div className="col-xl-3 col-lg-6">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <p className="card-heading mb-2">Fee Follow-Up</p>

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
                <p className="card-heading">Payment Mode</p>
                <TrendingUp size={17} className="text-primary" />
              </div>

              <div className="small-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={paymentModeData} dataKey="value" innerRadius={48} outerRadius={76} paddingAngle={3}>
                      {paymentModeData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="row g-1 small">
                {paymentModeData.map((item) => (
                  <div className="col-6 text-truncate" key={item.name}>
                    <span className="legend-dot me-1" style={{ background: item.color }} />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-12">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <p className="card-heading mb-2">Class Wise Pending Fee</p>

              <div className="table-shell">
                <table className="table table-sm table-striped align-middle dashboard-table mb-0">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Collected</th>
                      <th>Pending</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classWiseDue.map((item) => (
                      <tr key={item.standard}>
                        <td className="fw-semibold">{item.standard}</td>
                        <td>{formatAmount(item.collected)}</td>
                        <td className="fw-bold text-danger">{formatAmount(item.pending)}</td>
                        <td>{formatAmount(item.collected + item.pending)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="dashboard-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                <p className="card-heading">Recent Student Fee Records</p>
                <button type="button" className="btn btn-primary btn-sm">View All</button>
              </div>

              <div className="table-shell">
                <table className="table table-sm table-striped align-middle dashboard-table mb-0">
                  <thead>
                    <tr>
                      <th>Receipt</th>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Roll No.</th>
                      <th>Status</th>
                      <th>Paid</th>
                      <th>Due</th>
                      <th>Mode</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFeeRecords.map((item) => (
                      <tr key={`${item.name}-${item.receipt}`}>
                        <td className="fw-semibold text-nowrap">{item.receipt}</td>
                        <td className="fw-semibold text-nowrap">{item.name}</td>
                        <td>{item.standard}</td>
                        <td>{item.rollNo}</td>
                        <td>
                          <span className={`badge ${
                            item.status === "Paid"
                              ? "bg-success"
                              : item.status === "Partial"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{formatAmount(item.amount)}</td>
                        <td className={item.dueAmount > 0 ? "fw-bold text-danger" : "text-success"}>
                          {formatAmount(item.dueAmount)}
                        </td>
                        <td>{item.mode}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))}

                    {filteredFeeRecords.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center text-muted py-4">
                          No student fee records found
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

export default AccountingDashboard;
