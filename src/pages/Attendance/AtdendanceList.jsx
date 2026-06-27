import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  LayoutDashboard,
  RotateCcw,
  Search,
  TrendingUp,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";

const STUDENTS = [
  { id: "STU1001", name: "Aarav Sharma", rollNo: "07A-01", standard: "7th Standard", division: "A", attendance: 92 },
  { id: "STU1002", name: "Vedant Patil", rollNo: "07A-02", standard: "7th Standard", division: "A", attendance: 95 },
  { id: "STU1003", name: "Swarali Deshmukh", rollNo: "07A-03", standard: "7th Standard", division: "A", attendance: 93 },
  { id: "STU1004", name: "Rohan Jadhav", rollNo: "07A-04", standard: "7th Standard", division: "A", attendance: 88 },
  { id: "STU1005", name: "Tanvi Kadam", rollNo: "07A-05", standard: "7th Standard", division: "A", attendance: 90 },
  { id: "STU1006", name: "Aditya More", rollNo: "07A-06", standard: "7th Standard", division: "A", attendance: 85 },
  { id: "STU1007", name: "Sneha Pawar", rollNo: "07A-07", standard: "7th Standard", division: "A", attendance: 91 },
  { id: "STU1008", name: "Omkar Salunkhe", rollNo: "07A-08", standard: "7th Standard", division: "A", attendance: 94 },
  { id: "STU1009", name: "Prachi Bhoite", rollNo: "07A-09", standard: "7th Standard", division: "A", attendance: 89 },
  { id: "STU1010", name: "Atharv Kulkarni", rollNo: "07A-10", standard: "7th Standard", division: "A", attendance: 87 },
];

const LAST_5_DATES = [
  { date: "16/05/2025", day: "Fri" },
  { date: "17/05/2025", day: "Sat" },
  { date: "18/05/2025", day: "Sun" },
  { date: "19/05/2025", day: "Mon" },
  { date: "20/05/2025", day: "Tue" },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function generateAttendance(studentId, year, month) {
  const seed = studentId.charCodeAt(studentId.length - 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const result = {};

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dow = new Date(year, month - 1, day).getDay();

    if (dow === 0) {
      result[day] = "holiday";
      continue;
    }

    const late = (seed * day + day * 5) % 17 === 0;
    const absent = (seed * day * 7 + day * 13) % 11 === 0;
    result[day] = absent ? "A" : late ? "L" : "P";
  }

  return result;
}

function getStatusForDate(studentId, dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return generateAttendance(studentId, year, month)[day] || "P";
}

function CalendarModal({ student, onClose }) {
  const [calYear, setCalYear] = useState(2025);
  const [calMonth, setCalMonth] = useState(5);
  const attendance = generateAttendance(student.id, calYear, calMonth);
  const daysInMonth = new Date(calYear, calMonth, 0).getDate();
  const firstDow = new Date(calYear, calMonth - 1, 1).getDay();
  const startOffset = (firstDow + 6) % 7;
  const cells = [...Array.from({ length: startOffset }, () => null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
  const totalWorking = Object.values(attendance).filter((value) => value !== "holiday").length;
  const totalPresent = Object.values(attendance).filter((value) => value === "P").length;
  const totalAbsent = Object.values(attendance).filter((value) => value === "A").length;
  const totalLate = Object.values(attendance).filter((value) => value === "L").length;
  const pct = totalWorking ? Math.round((totalPresent / totalWorking) * 100) : 0;

  const prevMonth = () => {
    if (calMonth === 1) {
      setCalMonth(12);
      setCalYear((year) => year - 1);
    } else {
      setCalMonth((month) => month - 1);
    }
  };

  const nextMonth = () => {
    if (calMonth === 12) {
      setCalMonth(1);
      setCalYear((year) => year + 1);
    } else {
      setCalMonth((month) => month + 1);
    }
  };

  const statCards = [
    { label: "Working Days", value: totalWorking, color: "#2563eb", bg: "#eff6ff" },
    { label: "Present", value: totalPresent, color: "#16a34a", bg: "#f0fdf4" },
    { label: "Absent", value: totalAbsent, color: "#dc2626", bg: "#fef2f2" },
    { label: "Late", value: totalLate, color: "#ea580c", bg: "#fff7ed" },
  ];

  return (
    <div className="modal fade show d-block attendance-list-modal" style={{ backgroundColor: "rgba(15, 23, 42, 0.42)" }} onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(event) => event.stopPropagation()}>
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <div>
              <h5 className="fw-bold mb-0">{student.name}</h5>
              <div className="text-muted small">{student.id} / {student.rollNo} / Attendance Details</div>
            </div>
            <button className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center" onClick={onClose} aria-label="Close" title="Close">
              <X size={16} />
            </button>
          </div>
          <div className="modal-body">
            <div className="row g-2 mb-3">
              {statCards.map((card) => (
                <div className="col-6 col-md-3" key={card.label}>
                  <div className="modal-stat" style={{ color: card.color, background: card.bg }}>
                    <div className="small fw-semibold">{card.label}</div>
                    <strong>{card.value}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="btn btn-outline-secondary btn-sm icon-btn d-flex align-items-center justify-content-center" onClick={prevMonth} aria-label="Previous month" title="Previous month"><ChevronLeft size={16} /></button>
              <span className="fw-bold text-primary">{MONTH_NAMES[calMonth - 1]} {calYear} / {pct}%</span>
              <button className="btn btn-outline-secondary btn-sm icon-btn d-flex align-items-center justify-content-center" onClick={nextMonth} aria-label="Next month" title="Next month"><ChevronRight size={16} /></button>
            </div>

            <div className="calendar-grid mb-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <div key={day} className="calendar-head">{day}</div>)}
              {cells.map((day, index) => {
                if (!day) return <div key={`blank-${index}`} />;

                const status = attendance[day];
                const className = status === "holiday" ? "holiday" : status === "A" ? "absent" : status === "L" ? "late" : "present";

                return (
                  <div key={day} className={`calendar-cell ${className}`}>
                    <span>{day}</span>
                    {status !== "holiday" && <strong>{status}</strong>}
                  </div>
                );
              })}
            </div>

            <div className="d-flex justify-content-center gap-3 small flex-wrap">
              <span><span className="legend-dot" style={{ background: "#16a34a" }} /> P - Present</span>
              <span><span className="legend-dot" style={{ background: "#dc2626" }} /> A - Absent</span>
              <span><span className="legend-dot" style={{ background: "#ea580c" }} /> L - Late</span>
              <span><span className="legend-dot" style={{ background: "#94a3b8" }} /> Holiday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Attendance() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    standard: "7th Standard",
    division: "A",
    shift: "Morning",
    date: "",
    search: "",
  });

  const filteredStudents = useMemo(() => (
    STUDENTS.filter((student) => student.name.toLowerCase().includes(filters.search.trim().toLowerCase()))
  ), [filters.search]);

  const totalPresent = filteredStudents.filter((student) => getStatusForDate(student.id, LAST_5_DATES[LAST_5_DATES.length - 1].date) === "P").length;
  const totalAbsent = filteredStudents.filter((student) => getStatusForDate(student.id, LAST_5_DATES[LAST_5_DATES.length - 1].date) === "A").length;
  const totalLate = filteredStudents.filter((student) => getStatusForDate(student.id, LAST_5_DATES[LAST_5_DATES.length - 1].date) === "L").length;
  const avgAttendance = Math.round(filteredStudents.reduce((total, student) => total + student.attendance, 0) / filteredStudents.length);

  const summaryCards = [
    { title: "Total Students", value: filteredStudents.length, icon: Users, color: "#2563eb", background: "#eff6ff", note: `${filters.standard} ${filters.division}` },
    { title: "Present", value: totalPresent, icon: UserCheck, color: "#16a34a", background: "#f0fdf4", note: "Latest selected day" },
    { title: "Absent", value: totalAbsent, icon: UserX, color: "#dc2626", background: "#fef2f2", note: "Needs follow-up" },
    { title: "Late", value: totalLate, icon: CalendarDays, color: "#ea580c", background: "#fff7ed", note: "Recorded late" },
    { title: "Attendance Avg.", value: `${avgAttendance}%`, icon: TrendingUp, color: "#7c3aed", background: "#f5f3ff", note: "Class average" },
  ];

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const resetFilters = () => setFilters({ standard: "7th Standard", division: "A", shift: "Morning", date: "", search: "" });

  const renderStatus = (status) => {
    if (status === "holiday") return <span className="attendance-badge holiday">-</span>;
    if (status === "A") return <span className="attendance-badge absent">A</span>;
    if (status === "L") return <span className="attendance-badge late">L</span>;
    return <span className="attendance-badge present">P</span>;
  };

  return (
    <div className="attendance-list-page">
      <style>{`
        .attendance-list-page { padding: 14px 16px 20px; font-size: 0.86rem; color: #1f2937; }
        .attendance-list-page .page-header { margin-bottom: 12px; }
        .attendance-list-page .page-title { color: #0f172a; font-size: 1.35rem; letter-spacing: 0; }
        .attendance-list-page .breadcrumb-lite { color: #64748b; }
        .attendance-list-page .section-label { color: #334155; font-size: 0.78rem; font-weight: 800; letter-spacing: 0; text-transform: uppercase; margin-bottom: 8px; }
        .attendance-list-page .summary-grid { display: grid; grid-template-columns: repeat(5, minmax(150px, 1fr)); gap: 10px; margin-bottom: 12px; }
        .attendance-list-page .summary-card, .attendance-list-page .filter-card, .attendance-list-page .table-card { background: #fff; border: 1px solid #e6ebf2; border-radius: 8px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04); }
        .attendance-list-page .summary-card { min-height: 74px; padding: 12px; display: flex; align-items: center; gap: 10px; }
        .attendance-list-page .summary-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .attendance-list-page .summary-value { margin: 0; font-size: 1.2rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .attendance-list-page .summary-title { color: #64748b; font-size: 0.76rem; font-weight: 600; white-space: nowrap; }
        .attendance-list-page .summary-note { color: #64748b; font-size: 0.72rem; font-weight: 600; }
        .attendance-list-page .filter-card { margin-bottom: 10px; }
        .attendance-list-page .filter-card .card-body, .attendance-list-page .table-card .card-body { padding: 10px 12px !important; }
        .attendance-list-page .card-heading { color: #0f172a; font-size: 0.84rem; font-weight: 800; margin: 0; }
        .attendance-list-page .filter-actions .btn, .attendance-list-page .icon-btn, .attendance-list-modal .icon-btn { width: 31px; height: 31px; padding: 0; border-radius: 7px; }
        .attendance-list-page .table-shell { border: 1px solid #e6ebf2; border-radius: 8px; overflow: auto; }
        .attendance-list-page .dashboard-table { table-layout: fixed; min-width: 940px; }
        .attendance-list-page .dashboard-table th, .attendance-list-page .dashboard-table td { overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }
        .attendance-list-page .dashboard-table thead th { background: #f8fafc; color: #0f172a; border-bottom: 1px solid #dbe3ee; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0; }
        .attendance-list-page .dashboard-table tbody td { color: #1f2937; border-bottom-color: #edf2f7; }
        .attendance-list-page .dashboard-table tbody tr:hover td { background: #f8fbff; }
        .attendance-list-page .attendance-badge { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 24px; border-radius: 999px; font-weight: 800; border: 1px solid transparent; }
        .attendance-list-page .attendance-badge.present { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
        .attendance-list-page .attendance-badge.absent { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
        .attendance-list-page .attendance-badge.late { background: #fff7ed; color: #ea580c; border-color: #fed7aa; }
        .attendance-list-page .attendance-badge.holiday { background: #f8fafc; color: #94a3b8; border-color: #e2e8f0; }
        .attendance-list-page .legend-dot, .attendance-list-modal .legend-dot { width: 9px; height: 9px; border-radius: 999px; display: inline-block; margin-right: 4px; }
        .attendance-list-modal .modal-content { border-radius: 8px; }
        .attendance-list-modal .modal-stat { border: 1px solid #e6ebf2; border-radius: 8px; padding: 10px; text-align: center; }
        .attendance-list-modal .modal-stat strong { display: block; font-size: 1.3rem; line-height: 1.1; }
        .attendance-list-modal .calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(42px, 1fr)); gap: 6px; }
        .attendance-list-modal .calendar-head { color: #64748b; font-size: 0.75rem; font-weight: 800; text-align: center; }
        .attendance-list-modal .calendar-cell { min-height: 48px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #e6ebf2; }
        .attendance-list-modal .calendar-cell span { font-weight: 700; }
        .attendance-list-modal .calendar-cell strong { font-size: 0.72rem; margin-top: 2px; }
        .attendance-list-modal .calendar-cell.present { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
        .attendance-list-modal .calendar-cell.absent { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
        .attendance-list-modal .calendar-cell.late { background: #fff7ed; color: #ea580c; border-color: #fed7aa; }
        .attendance-list-modal .calendar-cell.holiday { background: #f8fafc; color: #94a3b8; }
        @media (max-width: 992px) { .attendance-list-page .summary-grid { grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); } }
        @media (max-width: 768px) { .attendance-list-page .breadcrumb-lite { display: none !important; } }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <h3 className="page-title fw-bold mb-0">Attendance List</h3>
        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span><span>/</span><span>Attendance</span><span>/</span><span>List</span>
        </div>
      </div>

      <p className="section-label">Attendance Summary</p>
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
            <div style={{ flex: "1 1 160px", minWidth: "140px" }}>
              <label className="form-label small mb-1">Class</label>
              <select className="form-select form-select-sm" value={filters.standard} onChange={(event) => updateFilter("standard", event.target.value)}>
                <option>7th Standard</option><option>8th Standard</option><option>9th Standard</option>
              </select>
            </div>
            <div style={{ flex: "1 1 130px", minWidth: "120px" }}>
              <label className="form-label small mb-1">Division</label>
              <select className="form-select form-select-sm" value={filters.division} onChange={(event) => updateFilter("division", event.target.value)}>
                <option>A</option><option>B</option><option>C</option>
              </select>
            </div>
            <div style={{ flex: "1 1 140px", minWidth: "130px" }}>
              <label className="form-label small mb-1">Shift</label>
              <select className="form-select form-select-sm" value={filters.shift} onChange={(event) => updateFilter("shift", event.target.value)}>
                <option>Morning</option><option>Afternoon</option>
              </select>
            </div>
            <div style={{ flex: "1 1 160px", minWidth: "150px" }}>
              <label className="form-label small mb-1">Date</label>
              <input type="date" className="form-control form-control-sm" value={filters.date} onChange={(event) => updateFilter("date", event.target.value)} />
            </div>
            <div style={{ flex: "1.5 1 220px", minWidth: "200px" }}>
              <label className="form-label small mb-1">Search Student</label>
              <input className="form-control form-control-sm" placeholder="Search by name" value={filters.search} onChange={(event) => updateFilter("search", event.target.value)} />
            </div>
            <div className="filter-actions d-flex align-items-end gap-2" style={{ flex: "0 0 72px" }}>
              <button className="btn btn-primary d-flex align-items-center justify-content-center" aria-label="Search" title="Search"><Search size={16} /></button>
              <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" aria-label="Reset" title="Reset" onClick={resetFilters}><RotateCcw size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
            <p className="card-heading">Last 5 Days Attendance</p>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"><ChevronLeft size={15} /> Previous</button>
              <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1">Next <ChevronRight size={15} /></button>
            </div>
          </div>

          <div className="table-shell">
            <table className="table table-sm table-striped align-middle dashboard-table mb-0">
              <thead>
                <tr>
                  <th style={{ width: 70 }}>Sr. No.</th>
                  <th style={{ width: 110 }}>Student ID</th>
                  <th style={{ width: 160 }}>Student Name</th>
                  <th style={{ width: 90 }}>Roll No.</th>
                  <th style={{ width: 120 }}>Attendance</th>
                  {LAST_5_DATES.map((date) => (
                    <th key={date.date} className="text-center" style={{ width: 110 }}>
                      <div>{date.date}</div>
                      <div className="text-muted fw-semibold" style={{ fontSize: 11 }}>{date.day}</div>
                    </th>
                  ))}
                  <th style={{ width: 90 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{student.id}</td>
                    <td className="fw-semibold text-nowrap">{student.name}</td>
                    <td>{student.rollNo}</td>
                    <td>
                      <button className="btn btn-link btn-sm fw-bold p-0 text-decoration-none" onClick={() => setSelectedStudent(student)}>
                        {student.attendance}%
                      </button>
                    </td>
                    {LAST_5_DATES.map((date) => (
                      <td key={date.date} className="text-center">{renderStatus(getStatusForDate(student.id, date.date))}</td>
                    ))}
                    <td>
                      <button className="btn btn-sm btn-outline-primary icon-btn d-inline-flex align-items-center justify-content-center" onClick={() => setSelectedStudent(student)} aria-label={`View attendance for ${student.name}`} title="View attendance">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr><td colSpan="11" className="text-center text-muted py-4">No attendance records found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedStudent && <CalendarModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
    </div>
  );
}
