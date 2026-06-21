import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  Clock3,
  LayoutDashboard,
  RotateCcw,
  Save,
  Search,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

function AttendanceEntry() {
  const students = useMemo(() => [
    "Aarav Sharma",
    "Priya Patel",
    "Rohan Verma",
    "Anaya Singh",
    "Karan Mehta",
    "Rahul Patil",
    "Sneha Jadhav",
    "Om Joshi",
    "Pooja Deshmukh",
    "Aditya More",
    "Sanket Patil",
    "Neha More",
    "Ritesh Jadhav",
    "Akash Shinde",
    "Vaishnavi Patil",
    "Rohit Pawar",
    "Aditi Patil",
    "Raj More",
    "Pratik Jadhav",
    "Snehal Shinde",
  ], []);

  const today = new Date();
  const [academicYear, setAcademicYear] = useState("2025-26");
  const [studentClass, setStudentClass] = useState("10");
  const [division, setDivision] = useState("A");
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);

  const selectedMonthDate = new Date(selectedDate);
  const year = selectedMonthDate.getFullYear();
  const month = selectedMonthDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = selectedMonthDate.getDate();
  const monthLabel = selectedMonthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const [attendance, setAttendance] = useState(() => {
    const data = {};
    const workingDayCodes = ["P", "P", "P", "A", "L"];

    students.forEach((student) => {
      data[student] = {};

      for (let day = 1; day <= 31; day += 1) {
        const date = new Date(today.getFullYear(), today.getMonth(), day);
        data[student][day] = date.getDay() === 0 || date.getDay() === 6
          ? "-"
          : workingDayCodes[Math.floor(Math.random() * workingDayCodes.length)];
      }
    });

    return data;
  });

  const getDayName = (day) => new Date(year, month, day).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const isWeekend = (day) => {
    const weekDay = new Date(year, month, day).getDay();
    return weekDay === 0 || weekDay === 6;
  };

  const changeMonth = (direction) => {
    const date = new Date(selectedDate);
    date.setMonth(date.getMonth() + direction);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const markAttendance = (student, day) => {
    if (isWeekend(day)) return;
    const sequence = ["P", "A", "L"];

    setAttendance((prev) => {
      const current = prev[student][day];
      const next = sequence[(sequence.indexOf(current) + 1) % sequence.length];

      return {
        ...prev,
        [student]: {
          ...prev[student],
          [day]: next,
        },
      };
    });
  };

  const markAll = (status) => {
    if (isWeekend(currentDay)) return;

    setAttendance((prev) => {
      const updated = { ...prev };
      students.forEach((student) => {
        updated[student] = {
          ...updated[student],
          [currentDay]: status,
        };
      });
      return updated;
    });
  };

  const dayStatuses = students.map((student) => attendance[student]?.[currentDay] || "P");
  const presentCount = dayStatuses.filter((value) => value === "P").length;
  const absentCount = dayStatuses.filter((value) => value === "A").length;
  const lateCount = dayStatuses.filter((value) => value === "L").length;
  const attendanceAvg = Math.round((presentCount / students.length) * 100);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.max(1, Math.ceil(students.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = students.length === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endIndex = Math.min(activePage * pageSize, students.length);
  const paginatedStudents = students.slice((activePage - 1) * pageSize, activePage * pageSize);

  const goToPage = (page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages));

  const summaryCards = [
    { title: "Total Students", value: students.length, note: `Class ${studentClass}-${division}`, icon: Users, color: "#2563eb", background: "#eff6ff" },
    { title: "Present", value: presentCount, note: `${attendanceAvg}% today`, icon: UserCheck, color: "#16a34a", background: "#f0fdf4" },
    { title: "Absent", value: absentCount, note: `${Math.round((absentCount / students.length) * 100)}% today`, icon: UserX, color: "#dc2626", background: "#fef2f2" },
    { title: "Late", value: lateCount, note: "Needs review", icon: Clock3, color: "#ea580c", background: "#fff7ed" },
    { title: "Marked Date", value: currentDay, note: monthLabel, icon: CalendarDays, color: "#7c3aed", background: "#f5f3ff" },
  ];

  const getStatusClass = (value) => {
    if (value === "P") return "status-present";
    if (value === "A") return "status-absent";
    if (value === "L") return "status-late";
    return "status-holiday";
  };

  const saveAttendance = () => {
    window.alert("Attendance saved successfully");
  };

  const [selectedStudentModal, setSelectedStudentModal] = useState(null);

  const computeStudentPercent = (student) => {
    const att = attendance[student] || {};
    let working = 0;
    let present = 0;
    for (let day = 1; day <= daysInMonth; day += 1) {
      if (isWeekend(day)) continue;
      working += 1;
      const v = att[day] || "P";
      if (v === "P") present += 1;
    }
    return working ? Math.round((present / working) * 100) : 0;
  };

  function AttendanceCalendarModal({ student, onClose }) {
    const att = attendance[student] || {};
    const yearSel = selectedMonthDate.getFullYear();
    const monthSel = selectedMonthDate.getMonth();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const totalWorking = days.filter((d) => !isWeekend(d)).length;
    const totalPresent = days.filter((d) => !isWeekend(d) && (att[d] || "P") === "P").length;
    const totalAbsent = days.filter((d) => !isWeekend(d) && (att[d] || "P") === "A").length;
    const totalLate = days.filter((d) => !isWeekend(d) && (att[d] || "P") === "L").length;
    const pct = totalWorking ? Math.round((totalPresent / totalWorking) * 100) : 0;

    return (
      <div className="modal fade show d-block attendance-entry-modal" style={{ backgroundColor: "rgba(15,23,42,0.42)" }} onClick={onClose}>
        <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <div className="header-left">
                <h5 className="fw-bold mb-0 modal-title">{student} <span className="badge bg-primary ms-2">{pct}%</span></h5>
              </div>

              <div className="header-center">{monthLabel}</div>

              <button className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center close-btn" onClick={onClose} aria-label="Close" title="Close">✕</button>
            </div>
            <div className="modal-body">
              <div className="row g-2 mb-3">
                <div className="col-6 col-md-3">
                  <div className="modal-stat" style={{ color: "#2563eb", background: "#eff6ff" }}>
                    <div className="small fw-semibold">Working Days</div>
                    <strong>{totalWorking}</strong>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="modal-stat" style={{ color: "#16a34a", background: "#f0fdf4" }}>
                    <div className="small fw-semibold">Present</div>
                    <strong>{totalPresent}</strong>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="modal-stat" style={{ color: "#dc2626", background: "#fef2f2" }}>
                    <div className="small fw-semibold">Absent</div>
                    <strong>{totalAbsent}</strong>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="modal-stat" style={{ color: "#ea580c", background: "#fff7ed" }}>
                    <div className="small fw-semibold">Late</div>
                    <strong>{totalLate}</strong>
                  </div>
                </div>
              </div>

              <div className="calendar-grid mb-3">
                {Array.from({ length: 7 }, (_, i) => ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]).map((d) => (
                  <div key={d} className="calendar-head">{d}</div>
                ))}
                {days.map((day) => {
                  const status = isWeekend(day) ? "holiday" : (att[day] || "P");
                  const className = status === "holiday" ? "holiday" : status === "A" ? "absent" : status === "L" ? "late" : "present";
                  return (
                    <div key={day} className={`calendar-cell ${className}`}>
                      {status === "holiday" ? (
                        <div className="holiday-dot">{day}</div>
                      ) : (
                        <>
                          <span>{day}</span>
                          <strong>{status}</strong>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="d-flex justify-content-center gap-3 small flex-wrap">
                <span><span className="legend-dot" style={{ background: "#16a34a" }} /> P - Present</span>
                <span><span className="legend-dot" style={{ background: "#dc2626" }} /> A - Absent</span>
                <span><span className="legend-dot" style={{ background: "#ea580c" }} /> L - Late</span>
                <span><span className="legend-dot" style={{ background: "#94a3b8" }} /> Sat / Sun - Holiday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid attendance-page w-100">
      <style>{`
        .attendance-page { min-height: calc(100vh - 20px); background: #f6f8fb; color: #172033; }
        .attendance-page .page-header { background: #ffffff; border: 1px solid #e6ebf2; border-left: 4px solid #2563eb; border-radius: 8px; padding: 10px 14px; margin-bottom: 10px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05); }
        .attendance-page .page-title { color: #1d4ed8; font-size: 1.25rem; line-height: 1.2; }
        .attendance-page .breadcrumb-lite { color: #64748b; }
        .attendance-page .section-label { display: flex; align-items: center; gap: 8px; margin: 0 0 8px; color: #1e3a8a; font-size: 0.9rem; font-weight: 700; }
        .attendance-page .section-label::before { content: ""; width: 6px; height: 18px; border-radius: 999px; background: #2563eb; }
        .attendance-page .summary-grid { display: grid; grid-template-columns: repeat(5, minmax(150px, 1fr)); gap: 10px; margin-bottom: 10px; }
        .attendance-page .summary-card, .attendance-page .filter-card, .attendance-page .dashboard-card { background: #ffffff; border: 1px solid #e6ebf2; border-radius: 8px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05); }
        .attendance-page .summary-card { display: flex; align-items: center; gap: 10px; min-width: 0; padding: 10px 12px; }
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
        .attendance-page .table-shell, .attendance-page .attendance-shell { border: 1px solid #e6ebf2; border-radius: 8px; overflow: auto; }
        .attendance-page .dashboard-table thead th, .attendance-page .attendance-grid th { background: #f8fafc; color: #0f172a; border-bottom: 1px solid #dbe3ee; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0; }
        .attendance-page .dashboard-table tbody td, .attendance-page .attendance-grid td { color: #1f2937; border-bottom-color: #edf2f7; vertical-align: middle; }
        .attendance-page .dashboard-table tbody tr:hover td, .attendance-page .attendance-grid tbody tr:hover td { background: #f8fbff; }
        .attendance-page .badge { border-radius: 999px; padding: 0.35em 0.65em; font-weight: 700; }
        .attendance-page .pending-item { border: 1px solid #e6ebf2; border-radius: 8px; padding: 9px; }
        .attendance-page .legend-dot { width: 9px; height: 9px; border-radius: 999px; display: inline-block; }
        .attendance-entry-modal .modal-content { border-radius: 8px; }
        .attendance-entry-modal .modal-header { background: #ffffff; border-left: 4px solid #2563eb; border-radius: 8px 8px 0 0; padding: 12px; display: flex; align-items: center; gap: 12px; }
        .attendance-entry-modal .modal-title { color: #1d4ed8; font-size: 1.05rem; margin: 0; }
        .attendance-entry-modal .modal-breadcrumb { color: #64748b; margin-bottom: 4px; }
        .attendance-entry-modal .modal-header .header-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .attendance-entry-modal .modal-header .header-center { flex: 1 1 auto; text-align: center; color: #64748b; font-size: 0.95rem; }
        .attendance-entry-modal .modal-header .close-btn { flex: 0 0 auto; }
        .attendance-entry-modal .modal-body { background: #ffffff; padding: 14px; }
        .attendance-entry-modal .modal-stat { border: 1px solid #e6ebf2; border-radius: 8px; padding: 10px; text-align: center; }
        .attendance-entry-modal .modal-stat strong { display: block; font-size: 1.3rem; line-height: 1.1; }
        .attendance-entry-modal .calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(42px, 1fr)); gap: 6px; }
        .attendance-entry-modal .calendar-head { color: #64748b; font-size: 0.75rem; font-weight: 800; text-align: center; }
        .attendance-entry-modal .calendar-cell { min-height: 48px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #e6ebf2; }
        .attendance-entry-modal .calendar-cell span { font-weight: 700; }
        .attendance-entry-modal .calendar-cell strong { font-size: 0.72rem; margin-top: 2px; }
        .attendance-entry-modal .calendar-cell.present { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
        .attendance-entry-modal .calendar-cell.absent { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
        .attendance-entry-modal .calendar-cell.late { background: #fff7ed; color: #ea580c; border-color: #fed7aa; }
        .attendance-entry-modal .calendar-cell.holiday { background: transparent; color: #64748b; border-color: #e6ebf2; }
        .attendance-entry-modal .holiday-dot { width: 36px; height: 36px; border-radius: 50%; background: #94a3b8; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; }
        .attendance-page .holiday-dot-small { width: 12px; height: 12px; border-radius: 50%; background: #94a3b8; display: inline-block; }
        .attendance-page .sticky-name { position: sticky; left: 0; z-index: 3; min-width: 230px; max-width: 230px; background: #fff; box-shadow: 1px 0 0 #e6ebf2; }
        .attendance-page thead .sticky-name { z-index: 5; background: #f8fafc; }
        .attendance-page .day-cell { min-width: 54px; max-width: 54px; height: 38px; font-weight: 800; cursor: default; }
        .attendance-page .day-cell.active-day { outline: 2px solid #2563eb; outline-offset: -2px; cursor: pointer; }
        .attendance-page .status-present { background: #f0fdf4 !important; color: #16a34a !important; }
        .attendance-page .status-absent { background: #fef2f2 !important; color: #dc2626 !important; }
        .attendance-page .status-late { background: #fff7ed !important; color: #ea580c !important; }
        .attendance-page .status-holiday { background: #f8fafc !important; color: #94a3b8 !important; }
        @media (max-width: 1280px) { .attendance-page .summary-grid { grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); } }
        @media (max-width: 768px) { .attendance-page .breadcrumb-lite { display: none !important; } }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <h3 className="page-title fw-bold mb-0">Attendance Entry</h3>
        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span><span>/</span><span>Attendance</span><span>/</span><span>Entry</span>
        </div>
      </div>

      <p className="section-label">Daily Attendance</p>
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
              <label className="form-label small mb-1">Academic Year</label>
              <select className="form-select form-select-sm" value={academicYear} onChange={(event) => setAcademicYear(event.target.value)}>
                <option>2025-26</option><option>2024-25</option>
              </select>
            </div>
            <div style={{ flex: "1 1 130px", minWidth: "120px" }}>
              <label className="form-label small mb-1">Class</label>
              <select className="form-select form-select-sm" value={studentClass} onChange={(event) => setStudentClass(event.target.value)}>
                <option>10</option><option>9</option><option>8</option><option>7</option>
              </select>
            </div>
            <div style={{ flex: "1 1 130px", minWidth: "120px" }}>
              <label className="form-label small mb-1">Division</label>
              <select className="form-select form-select-sm" value={division} onChange={(event) => setDivision(event.target.value)}>
                <option>A</option><option>B</option><option>C</option>
              </select>
            </div>
            <div style={{ flex: "1 1 170px", minWidth: "150px" }}>
              <label className="form-label small mb-1">Date</label>
              <input type="date" className="form-control form-control-sm" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} />
            </div>
            <div className="filter-actions d-flex align-items-end gap-2" style={{ flex: "0 0 72px" }}>
              <button className="btn btn-primary d-flex align-items-center justify-content-center" aria-label="Search" title="Search"><Search size={16} /></button>
              <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" aria-label="Reset" title="Reset" onClick={() => { setAcademicYear("2025-26"); setStudentClass("10"); setDivision("A"); setSelectedDate(today.toISOString().split("T")[0]); }}><RotateCcw size={16} /></button>
            </div>
            <div className="ms-auto d-flex align-items-center gap-2 flex-wrap">
              <button className="btn btn-success btn-sm d-inline-flex align-items-center gap-1" onClick={() => markAll("P")}><CheckCircle2 size={15} /> Present</button>
              <button className="btn btn-danger btn-sm d-inline-flex align-items-center gap-1" onClick={() => markAll("A")}><UserX size={15} /> Absent</button>
              <button className="btn btn-warning btn-sm d-inline-flex align-items-center gap-1" onClick={() => markAll("L")}><Clock3 size={15} /> Late</button>
              <button className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1" onClick={saveAttendance}><Save size={15} /> Save</button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-2">
            <p className="card-heading">Monthly Attendance Sheet</p>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary btn-sm icon-btn d-flex align-items-center justify-content-center" onClick={() => changeMonth(-1)} aria-label="Previous month" title="Previous month"><ChevronLeft size={16} /></button>
              <span className="fw-bold text-primary px-2">{monthLabel}</span>
              <button className="btn btn-outline-secondary btn-sm icon-btn d-flex align-items-center justify-content-center" onClick={() => changeMonth(1)} aria-label="Next month" title="Next month"><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className="attendance-shell">
            <table className="table table-sm text-center mb-0 attendance-grid">
              <thead>
                <tr>
                  <th className="sticky-name text-start">Student Name</th>
                  <th className="text-center" style={{ minWidth: 120 }}>Avg Attendance</th>
                  {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    return (
                      <th key={day} className={currentDay === day ? "table-primary" : ""}>
                        <div>{day}</div>
                        <small className="d-block" style={{ fontSize: 10 }}>{getDayName(day)}</small>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student) => (
                  <tr key={student}>
                    <td className="sticky-name text-start fw-semibold">
                      <div className="d-flex align-items-center gap-2">
                        <span>{student}</span>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <button className="btn btn-link btn-sm p-0 text-decoration-none text-muted" onClick={() => setSelectedStudentModal(student)} title="View attendance details">
                        {computeStudentPercent(student)}%
                      </button>
                    </td>
                    {Array.from({ length: daysInMonth }, (_, index) => {
                      const day = index + 1;
                      const value = isWeekend(day) ? "-" : attendance[student]?.[day] || "P";
                      return (
                        <td
                          key={day}
                          className={`day-cell ${getStatusClass(value)} ${currentDay === day && !isWeekend(day) ? "active-day" : ""}`}
                          onClick={() => currentDay === day && !isWeekend(day) && markAttendance(student, day)}
                          title={currentDay === day && !isWeekend(day) ? "Click to cycle status" : undefined}
                        >
                          {isWeekend(day) ? <span className="holiday-dot-small" aria-hidden="true" /> : value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <div className="d-flex align-items-center gap-1 flex-wrap">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                style={{ width: "28px", height: "26px", padding: 0 }}
                onClick={() => goToPage(1)}
                disabled={activePage === 1}
                aria-label="First page"
                title="First page"
              >
                <ChevronsLeft size={14} />
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                style={{ width: "28px", height: "26px", padding: 0 }}
                onClick={() => goToPage(activePage - 1)}
                disabled={activePage === 1}
                aria-label="Previous page"
                title="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <input
                type="number"
                className="form-control form-control-sm text-center"
                style={{ width: "54px", height: "26px", padding: "0 4px" }}
                min="1"
                max={totalPages}
                value={activePage}
                onChange={(event) => goToPage(Number(event.target.value) || 1)}
                aria-label="Current page"
              />
              <small className="text-muted px-1">/ {totalPages}</small>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                style={{ width: "28px", height: "26px", padding: 0 }}
                onClick={() => goToPage(activePage + 1)}
                disabled={activePage === totalPages}
                aria-label="Next page"
                title="Next page"
              >
                <ChevronRight size={14} />
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                style={{ width: "28px", height: "26px", padding: 0 }}
                onClick={() => goToPage(totalPages)}
                disabled={activePage === totalPages}
                aria-label="Last page"
                title="Last page"
              >
                <ChevronsRight size={14} />
              </button>
              <select
                className="form-select form-select-sm ms-2"
                style={{ width: "68px", height: "26px", paddingTop: 0, paddingBottom: 0 }}
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setCurrentPage(1);
                }}
                aria-label="Items per page"
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <small className="text-muted">items per page</small>
            </div>
            <small className="text-muted">
              {startIndex} - {endIndex} of {students.length} items
            </small>
          </div>

          <div className="d-flex gap-3 flex-wrap small mt-3">
            <span className="d-inline-flex align-items-center gap-1"><span className="legend-dot" style={{ background: "#16a34a" }} /> P - Present</span>
            <span className="d-inline-flex align-items-center gap-1"><span className="legend-dot" style={{ background: "#dc2626" }} /> A - Absent</span>
            <span className="d-inline-flex align-items-center gap-1"><span className="legend-dot" style={{ background: "#ea580c" }} /> L - Late</span>
            <span className="d-inline-flex align-items-center gap-1"><span className="legend-dot" style={{ background: "#94a3b8" }} /> Sat / Sun - Holiday</span>
          </div>
        </div>
      </div>
      {selectedStudentModal && (
        <AttendanceCalendarModal student={selectedStudentModal} onClose={() => setSelectedStudentModal(null)} />
      )}
    </div>
  );
}

export default AttendanceEntry;
