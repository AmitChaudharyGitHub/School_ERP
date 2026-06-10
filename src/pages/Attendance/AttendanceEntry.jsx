import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
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

  return (
    <div className="attendance-entry-page">
      <style>{`
        .attendance-entry-page { padding: 14px 16px 20px; font-size: 0.86rem; color: #1f2937; }
        .attendance-entry-page .page-header { margin-bottom: 12px; }
        .attendance-entry-page .page-title { color: #0f172a; font-size: 1.35rem; letter-spacing: 0; }
        .attendance-entry-page .breadcrumb-lite { color: #64748b; }
        .attendance-entry-page .section-label { color: #334155; font-size: 0.78rem; font-weight: 800; letter-spacing: 0; text-transform: uppercase; margin-bottom: 8px; }
        .attendance-entry-page .summary-grid { display: grid; grid-template-columns: repeat(5, minmax(150px, 1fr)); gap: 10px; margin-bottom: 12px; }
        .attendance-entry-page .summary-card, .attendance-entry-page .filter-card, .attendance-entry-page .dashboard-card { background: #fff; border: 1px solid #e6ebf2; border-radius: 8px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04); }
        .attendance-entry-page .summary-card { min-height: 74px; padding: 12px; display: flex; align-items: center; gap: 10px; }
        .attendance-entry-page .summary-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .attendance-entry-page .summary-value { margin: 0; font-size: 1.2rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .attendance-entry-page .summary-title { color: #64748b; font-size: 0.76rem; font-weight: 600; white-space: nowrap; }
        .attendance-entry-page .summary-note { color: #64748b; font-size: 0.72rem; font-weight: 600; }
        .attendance-entry-page .filter-card { margin-bottom: 10px; }
        .attendance-entry-page .filter-card .card-body, .attendance-entry-page .dashboard-card .card-body { padding: 10px 12px !important; }
        .attendance-entry-page .card-heading { color: #0f172a; font-size: 0.84rem; font-weight: 800; margin: 0; }
        .attendance-entry-page .filter-actions .btn, .attendance-entry-page .icon-btn { width: 31px; height: 31px; padding: 0; border-radius: 7px; }
        .attendance-entry-page .attendance-shell { border: 1px solid #e6ebf2; border-radius: 8px; overflow: auto; max-height: 620px; }
        .attendance-entry-page .attendance-grid { width: max-content; white-space: nowrap; table-layout: fixed; }
        .attendance-entry-page .attendance-grid th { background: #f8fafc; color: #0f172a; border-color: #dbe3ee; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0; }
        .attendance-entry-page .attendance-grid td { border-color: #edf2f7; vertical-align: middle; }
        .attendance-entry-page .sticky-name { position: sticky; left: 0; z-index: 3; min-width: 230px; max-width: 230px; background: #fff; box-shadow: 1px 0 0 #e6ebf2; }
        .attendance-entry-page thead .sticky-name { z-index: 5; background: #f8fafc; }
        .attendance-entry-page .day-cell { min-width: 54px; max-width: 54px; height: 38px; font-weight: 800; cursor: default; }
        .attendance-entry-page .day-cell.active-day { outline: 2px solid #2563eb; outline-offset: -2px; cursor: pointer; }
        .attendance-entry-page .status-present { background: #f0fdf4 !important; color: #16a34a !important; }
        .attendance-entry-page .status-absent { background: #fef2f2 !important; color: #dc2626 !important; }
        .attendance-entry-page .status-late { background: #fff7ed !important; color: #ea580c !important; }
        .attendance-entry-page .status-holiday { background: #f8fafc !important; color: #94a3b8 !important; }
        .attendance-entry-page .legend-dot { width: 9px; height: 9px; border-radius: 999px; display: inline-block; }
        @media (max-width: 992px) { .attendance-entry-page .summary-grid { grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); } }
        @media (max-width: 768px) { .attendance-entry-page .breadcrumb-lite { display: none !important; } }
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
                {students.map((student) => (
                  <tr key={student}>
                    <td className="sticky-name text-start fw-semibold">{student}</td>
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
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex gap-3 flex-wrap small mt-3">
            <span className="d-inline-flex align-items-center gap-1"><span className="legend-dot" style={{ background: "#16a34a" }} /> P - Present</span>
            <span className="d-inline-flex align-items-center gap-1"><span className="legend-dot" style={{ background: "#dc2626" }} /> A - Absent</span>
            <span className="d-inline-flex align-items-center gap-1"><span className="legend-dot" style={{ background: "#ea580c" }} /> L - Late</span>
            <span className="d-inline-flex align-items-center gap-1"><span className="legend-dot" style={{ background: "#94a3b8" }} /> - Holiday</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceEntry;
