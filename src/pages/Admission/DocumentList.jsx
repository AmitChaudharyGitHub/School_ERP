import React, { useCallback, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleX,
  Eye,
  FileClock,
  FileText,
  LayoutDashboard,
  Menu,
  RotateCcw,
  Search,
  SearchX,
} from "lucide-react";

function DocumentList() {
  const [documents] = useState([
    {
      id: 1,
      academicYear: "2024-25",
      admissionDate: "10/05/2024",
      studentName: "Aarav Sharma",
      className: "Class 6",
      mobile: "9876543210",
      pendingDocument: "Birth Certificate, Aadhaar Card",
      pendingDocumentCount: 2,
      standard: "Class 6",
      documentType: "Birth Certificate",
      documentStatus: "Pending",
      uploadDate: "15/05/2024",
      lastUpdated: "15/05/2024",
    },
    {
      id: 2,
      academicYear: "2024-25",
      admissionDate: "09/05/2024",
      studentName: "Diya Patel",
      className: "Class 5",
      mobile: "9123456780",
      pendingDocument: "Photo, Aadhaar Card, Transfer Certificate",
      pendingDocumentCount: 3,
      standard: "Class 5",
      documentType: "Aadhaar Card",
      documentStatus: "Pending",
      uploadDate: "14/05/2024",
      lastUpdated: "14/05/2024",
    },
    {
      id: 3,
      academicYear: "2024-25",
      admissionDate: "08/05/2024",
      studentName: "Rohan Verma",
      className: "Class 8",
      mobile: "9988776655",
      pendingDocument: "-",
      pendingDocumentCount: 0,
      standard: "Class 8",
      documentType: "Medical Certificate",
      documentStatus: "Verified",
      uploadDate: "13/05/2024",
      lastUpdated: "13/05/2024",
    },
    {
      id: 4,
      academicYear: "2023-24",
      admissionDate: "07/05/2024",
      studentName: "Ananya Singh",
      className: "Class 7",
      mobile: "9012345678",
      pendingDocument: "Transfer Certificate",
      pendingDocumentCount: 1,
      standard: "Class 7",
      documentType: "Transfer Certificate",
      documentStatus: "Rejected",
      uploadDate: "12/05/2024",
      lastUpdated: "12/05/2024",
    },
    {
      id: 5,
      academicYear: "2023-24",
      admissionDate: "06/05/2024",
      studentName: "Vihaan Gupta",
      className: "Class 9",
      mobile: "9898989898",
      pendingDocument: "Birth Certificate, Aadhaar Card",
      pendingDocumentCount: 2,
      standard: "Class 9",
      documentType: "Previous Marksheet",
      documentStatus: "Missing",
      uploadDate: "11/05/2024",
      lastUpdated: "11/05/2024",
    },
  ]);

  const [filters, setFilters] = useState({
    academicYear: "",
    standard: "",
    documentType: "",
    documentStatus: "",
    uploadDateFrom: "",
    uploadDateTo: "",
    admissionDateFrom: "",
    admissionDateTo: "",
  });
  const [columnFilters, setColumnFilters] = useState({});
  const [uploadDateRange, setUploadDateRange] = useState({ from: "", to: "" });
  const [admissionDateRange, setAdmissionDateRange] = useState({ from: "", to: "" });
  const [activeCalendar, setActiveCalendar] = useState(null);
  const [hoveredDate, setHoveredDate] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const summaryCards = useMemo(() => [
    {
      title: "Total Documents",
      value: documents.length,
      icon: FileText,
      color: "#2563eb",
      background: "#eff6ff",
    },
    {
      title: "Verified Documents",
      value: documents.filter((item) => item.documentStatus === "Verified").length,
      icon: CheckCircle2,
      color: "#16a34a",
      background: "#f0fdf4",
    },
    {
      title: "Pending Verification",
      value: documents.filter((item) => item.documentStatus === "Pending").length,
      icon: FileClock,
      color: "#ea580c",
      background: "#fff7ed",
    },
    {
      title: "Rejected Documents",
      value: documents.filter((item) => item.documentStatus === "Rejected").length,
      icon: CircleX,
      color: "#dc2626",
      background: "#fef2f2",
    },
    {
      title: "Missing Documents",
      value: documents.filter((item) => item.documentStatus === "Missing").length,
      icon: SearchX,
      color: "#7c3aed",
      background: "#f5f3ff",
    },
  ], [documents]);

  const columns = useMemo(
    () => [
      { key: "admissionDate", label: "Admission Date", minWidth: "160px" },
      { key: "studentName", label: "Student Name", minWidth: "180px" },
      { key: "className", label: "Class", minWidth: "130px" },
      { key: "mobile", label: "Mobile No", minWidth: "140px" },
      { key: "pendingDocument", label: "Pending Document", minWidth: "260px" },
      { key: "pendingDocumentCount", label: "Count", minWidth: "100px" },
      {
        key: "documentStatus",
        label: "Status",
        minWidth: "140px",
        type: "select",
        options: ["Verified", "Pending", "Rejected", "Missing"],
        render: (item) => (
          <span
            className={`badge ${item.documentStatus === "Verified"
              ? "bg-success"
              : item.documentStatus === "Rejected"
                ? "bg-danger"
                : item.documentStatus === "Missing"
                  ? "bg-secondary"
                : "bg-warning text-dark"
              }`}
          >
            {item.documentStatus}
          </span>
        ),
      },
      { key: "lastUpdated", label: "Last Updated", minWidth: "150px" },
      {
        key: "action",
        label: "Action",
        minWidth: "120px",
        filterable: false,
        render: (item) => (
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center"
              style={{ width: "28px", height: "28px", padding: 0, borderRadius: "6px" }}
              title="View student document"
              aria-label={`View document for ${item.studentName}`}
            >
              <Eye size={16} />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-success d-inline-flex align-items-center justify-content-center"
              style={{ width: "28px", height: "28px", padding: 0, borderRadius: "6px" }}
              title="Open document"
              aria-label={`Open document for ${item.studentName}`}
            >
              <FileText size={16} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((visible, column) => ({ ...visible, [column.key]: true }), {})
  );

  const visibleTableColumns = columns.filter((column) => visibleColumns[column.key]);
  const compactFilterStyle = useMemo(() => ({
    flex: "1 1 142px",
    minWidth: "132px",
  }), []);
  const dateFilterStyle = useMemo(() => ({
    flex: "1.6 1 250px",
    minWidth: "230px",
  }), []);
  const getColumnMinWidth = useCallback((column) => Number.parseInt(column.minWidth, 10) || 120, []);
  const getColumnWidth = useCallback(
    (column) => columnWidths[column.key] || getColumnMinWidth(column),
    [columnWidths, getColumnMinWidth]
  );
  const tableWidth = visibleTableColumns.reduce((total, column) => total + getColumnWidth(column), 0);
  const getColumnStyle = useCallback(
    (column) => {
      const width = getColumnWidth(column);

      return {
        width: `${width}px`,
        minWidth: `${getColumnMinWidth(column)}px`,
        maxWidth: `${width}px`,
      };
    },
    [getColumnMinWidth, getColumnWidth]
  );

  const toggleColumn = (key) => {
    setVisibleColumns((visible) => ({
      ...visible,
      [key]: !visible[key],
    }));
  };

  const showAllColumns = () => {
    setVisibleColumns(columns.reduce((visible, column) => ({ ...visible, [column.key]: true }), {}));
  };

  const toDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseDateKey = (dateKey) => {
    if (!dateKey) {
      return null;
    }

    const [year, month, day] = dateKey.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDateKey = (dateKey) => {
    const date = parseDateKey(dateKey);

    if (!date) {
      return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getRangeValue = (range) => range.from && range.to
    ? `${formatDateKey(range.from)} - ${formatDateKey(range.to)}`
    : range.from
      ? formatDateKey(range.from)
      : "";

  const getCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingBlankDays = firstDay.getDay();

    return [
      ...Array.from({ length: leadingBlankDays }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1)),
    ];
  };

  const changeCalendarMonth = (offset) => {
    setCalendarMonth((month) => new Date(month.getFullYear(), month.getMonth() + offset, 1));
  };

  const selectRangeDate = (rangeKey, dateKey) => {
    const setRange = rangeKey === "upload" ? setUploadDateRange : setAdmissionDateRange;

    setRange((range) => {
      if (!range.from || range.to) {
        return { from: dateKey, to: "" };
      }

      if (new Date(dateKey).getTime() < new Date(range.from).getTime()) {
        return { from: dateKey, to: range.from };
      }

      return { ...range, to: dateKey };
    });
    setHoveredDate("");
    setCurrentPage(1);
  };

  const isDateInRange = (range, dateKey) => {
    if (!range.from) {
      return false;
    }

    const startTime = new Date(range.from).getTime();
    const endKey = range.to || hoveredDate;

    if (!endKey) {
      return dateKey === range.from;
    }

    const endTime = new Date(endKey).getTime();
    const dateTime = new Date(dateKey).getTime();
    return dateTime >= Math.min(startTime, endTime) && dateTime <= Math.max(startTime, endTime);
  };

  const startColumnResize = useCallback(
    (event, column) => {
      event.preventDefault();
      event.stopPropagation();

      const pointer = event.touches?.[0] || event;
      const startX = pointer.clientX;
      const startWidth = getColumnWidth(column);
      const minWidth = getColumnMinWidth(column);

      const handlePointerMove = (moveEvent) => {
        const movePointer = moveEvent.touches?.[0] || moveEvent;
        const nextWidth = Math.max(minWidth, startWidth + movePointer.clientX - startX);

        setColumnWidths((widths) => ({
          ...widths,
          [column.key]: nextWidth,
        }));
      };

      const stopResize = () => {
        document.body.classList.remove("document-column-resizing");
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", stopResize);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", stopResize);
      };

      document.body.classList.add("document-column-resizing");
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", stopResize);
      window.addEventListener("touchmove", handlePointerMove);
      window.addEventListener("touchend", stopResize);
    },
    [getColumnMinWidth, getColumnWidth]
  );

  const updateFilter = (key, value) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }));
    setCurrentPage(1);
  };

  const updateColumnFilter = (key, value) => {
    setColumnFilters((currentFilters) => ({ ...currentFilters, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      academicYear: "",
      standard: "",
      documentType: "",
      documentStatus: "",
    });
    setUploadDateRange({ from: "", to: "" });
    setAdmissionDateRange({ from: "", to: "" });
    setColumnFilters({});
    setCurrentPage(1);
  };

  const parseDisplayDate = (dateValue) => {
    const [day, month, year] = dateValue.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  };

  const filteredDocuments = documents.filter((item) => {
    const matchesColumnFilters = columns.every((column) => {
      if (column.filterable === false) {
        return true;
      }

      const filterValue = (columnFilters[column.key] || "").trim().toLowerCase();

      if (!filterValue) {
        return true;
      }

      return String(item[column.key] || "").toLowerCase().includes(filterValue);
    });

    if (!matchesColumnFilters) {
      return false;
    }

    const textFilters = ["academicYear", "standard", "documentType", "documentStatus"];
    const matchesTextFilters = textFilters.every((key) => {
      const filterValue = filters[key].trim().toLowerCase();

      if (!filterValue) {
        return true;
      }

      return String(item[key] || "").toLowerCase().includes(filterValue);
    });

    if (!matchesTextFilters) {
      return false;
    }

    const uploadTime = parseDisplayDate(item.uploadDate);
    const uploadFrom = uploadDateRange.from ? new Date(uploadDateRange.from).getTime() : null;
    const uploadTo = uploadDateRange.to ? new Date(uploadDateRange.to).getTime() : null;
    const admissionTime = parseDisplayDate(item.admissionDate);
    const admissionFrom = admissionDateRange.from ? new Date(admissionDateRange.from).getTime() : null;
    const admissionTo = admissionDateRange.to ? new Date(admissionDateRange.to).getTime() : null;

    if (uploadFrom && uploadTime < uploadFrom) {
      return false;
    }

    if (uploadTo && uploadTime > uploadTo) {
      return false;
    }

    if (admissionFrom && admissionTime < admissionFrom) {
      return false;
    }

    if (admissionTo && admissionTime > admissionTo) {
      return false;
    }

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = filteredDocuments.length === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endIndex = Math.min(activePage * pageSize, filteredDocuments.length);
  const paginatedDocuments = filteredDocuments.slice((activePage - 1) * pageSize, activePage * pageSize);
  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const renderDateRangeFilter = (rangeKey, label, range) => (
    <div style={dateFilterStyle}>
      <label className="form-label small mb-1">
        {label}
      </label>

      <div className="position-relative">
        <input
          type="text"
          className="form-control form-control-sm"
          value={getRangeValue(range)}
          readOnly
          placeholder="dd-mm-yyyy"
          onClick={() => setActiveCalendar((calendar) => calendar === rangeKey ? null : rangeKey)}
          aria-label={label}
          style={{ cursor: "pointer", paddingRight: "34px" }}
        />

        <button
          type="button"
          className="btn btn-link position-absolute top-50 end-0 translate-middle-y p-0 me-2 text-secondary"
          aria-label={`Open ${label} calendar`}
          title="Open calendar"
          onClick={() => setActiveCalendar((calendar) => calendar === rangeKey ? null : rangeKey)}
        >
          <CalendarDays size={16} />
        </button>

        {activeCalendar === rangeKey && (
          <div
            className="position-absolute bg-white border shadow-sm p-2"
            style={{
              zIndex: 20,
              top: "36px",
              left: 0,
              width: "292px",
              borderRadius: "8px",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                style={{ width: "30px", height: "30px", padding: 0 }}
                aria-label="Previous month"
                onClick={() => changeCalendarMonth(-1)}
              >
                <ChevronLeft size={15} />
              </button>

              <strong className="small">
                {calendarMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </strong>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                style={{ width: "30px", height: "30px", padding: 0 }}
                aria-label="Next month"
                onClick={() => changeCalendarMonth(1)}
              >
                <ChevronRight size={15} />
              </button>
            </div>

            <div
              className="text-muted small mb-1"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                fontSize: "11px",
              }}
            >
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "3px",
              }}
            >
              {getCalendarDays().map((date, index) => {
                if (!date) {
                  return <span key={`blank-${index}`} style={{ height: "32px" }} />;
                }

                const dateKey = toDateKey(date);
                const isRangeEdge = dateKey === range.from || dateKey === range.to;
                const isInRange = isDateInRange(range, dateKey);

                return (
                  <button
                    key={dateKey}
                    type="button"
                    className="btn btn-sm border-0"
                    style={{
                      height: "32px",
                      borderRadius: isRangeEdge ? "50%" : "6px",
                      backgroundColor: isRangeEdge
                        ? "#0d6efd"
                        : isInRange
                          ? "#d8ecff"
                          : "transparent",
                      color: isRangeEdge ? "#fff" : "#1f2937",
                      padding: 0,
                    }}
                    onMouseEnter={() => {
                      if (range.from && !range.to) {
                        setHoveredDate(dateKey);
                      }
                    }}
                    onClick={() => {
                      selectRangeDate(rangeKey, dateKey);
                      if (range.from && !range.to) {
                        setActiveCalendar(null);
                      }
                    }}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container-fluid document-page w-100">
      <style>{`
        .document-page {
          min-height: calc(100vh - 20px);
          background: #f6f8fb;
          color: #172033;
        }

        .document-page .page-header {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-left: 4px solid #2563eb;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 10px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .document-page .page-title {
          color: #1d4ed8;
          font-size: 1.25rem;
          line-height: 1.2;
        }

        .document-page .breadcrumb-lite {
          color: #64748b;
        }

        .document-page .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 8px;
          color: #1e3a8a;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .document-page .section-label::before {
          content: "";
          width: 6px;
          height: 18px;
          border-radius: 999px;
          background: #2563eb;
        }

        .document-page .summary-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(150px, 1fr));
          gap: 10px;
          margin-bottom: 10px;
        }

        .document-page .summary-card,
        .document-page .filter-card,
        .document-page .grid-card {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .document-page .summary-card {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          padding: 10px 12px;
        }

        .document-page .summary-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .document-page .summary-value {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.1;
        }

        .document-page .summary-title {
          color: #64748b;
          font-size: 0.76rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .document-page .filter-card {
          margin-bottom: 10px;
        }

        .document-page .filter-field {
          flex: 1 1 170px;
          min-width: 150px;
        }

        .document-page .filter-date-field {
          flex: 1.4 1 250px;
          min-width: 230px;
        }

        .document-page .filter-card .card-body,
        .document-page .grid-card .card-body {
          padding: 10px 12px !important;
        }

        .document-page .filter-actions .btn,
        .document-page .icon-btn {
          width: 31px;
          height: 31px;
          padding: 0;
          border-radius: 7px;
        }

        .document-page .primary-action {
          min-height: 32px;
          border-radius: 7px;
          font-weight: 700;
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18);
        }

        .document-page .table-shell {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          overflow: auto;
        }

        .document-page .document-table {
          table-layout: fixed;
        }

        .document-page .document-table th,
        .document-page .document-table td {
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }

        .document-page .document-table thead tr:first-child th {
          background: #f8fafc;
          color: #0f172a;
          border-bottom: 1px solid #dbe3ee;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0;
        }

        .document-page .document-table thead tr:nth-child(2) th {
          background: #ffffff;
          border-bottom: 1px solid #e6ebf2;
        }

        .document-page .document-table tbody td {
          color: #1f2937;
          border-bottom-color: #edf2f7;
        }

        .document-page .document-table tbody tr:hover td {
          background: #f8fbff;
        }

        .document-page .column-resize-handle {
          position: absolute;
          top: 0;
          right: -4px;
          width: 8px;
          height: 100%;
          cursor: col-resize;
          touch-action: none;
          z-index: 12;
        }

        .document-page .column-resize-handle::after {
          content: "";
          position: absolute;
          top: 9px;
          bottom: 9px;
          left: 3px;
          width: 2px;
          border-radius: 999px;
          background: transparent;
        }

        .document-page .column-resize-handle:hover::after {
          background: #2563eb;
        }

        body.document-column-resizing {
          cursor: col-resize;
          user-select: none;
        }

        .document-page .badge {
          border-radius: 999px;
          padding: 0.35em 0.65em;
          font-weight: 700;
        }

        @media (max-width: 992px) {
          .document-page .summary-grid {
            grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .document-page .page-header {
            align-items: flex-start !important;
          }

          .document-page .breadcrumb-lite {
            display: none !important;
          }
        }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <div>
          <h3 className="page-title fw-bold mb-0">Student Document List</h3>
        </div>

        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
          <span>/</span>
          <span>Admission</span>
          <span>/</span>
          <span>Student Document List</span>
        </div>
      </div>

      <p className="section-label">Document Statistics</p>

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
              </div>
            </div>
          );
        })}
      </div>

      <h5 className="section-label">Filter</h5>

      <div className="filter-card">
        <div className="card-body">
          <div className="d-flex align-items-end gap-2 flex-wrap overflow-visible pb-1">
            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">Academic Year</label>
              <select
                className="form-select form-select-sm"
                value={filters.academicYear}
                onChange={(event) => updateFilter("academicYear", event.target.value)}
              >
                <option value="">All</option>
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">Standard</label>
              <select
                className="form-select form-select-sm"
                value={filters.standard}
                onChange={(event) => updateFilter("standard", event.target.value)}
              >
                <option value="">All</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">Document Type</label>
              <select
                className="form-select form-select-sm"
                value={filters.documentType}
                onChange={(event) => updateFilter("documentType", event.target.value)}
              >
                <option value="">All</option>
                <option value="Birth Certificate">Birth Certificate</option>
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="Medical Certificate">Medical Certificate</option>
                <option value="Transfer Certificate">Transfer Certificate</option>
                <option value="Previous Marksheet">Previous Marksheet</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">Document Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.documentStatus}
                onChange={(event) => updateFilter("documentStatus", event.target.value)}
              >
                <option value="">All</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Missing">Missing</option>
              </select>
            </div>

            {renderDateRangeFilter("upload", "Upload Date Range", uploadDateRange)}

            {renderDateRangeFilter("admission", "Admission Date Range", admissionDateRange)}

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

      <div className="grid-card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-2 mb-2 flex-wrap">
            <p className="section-label mb-0">Document</p>
          </div>

          <div className="position-relative">
            <div className="table-shell">
              <table
                className="table table-sm table-striped align-middle document-table"
                style={{ minWidth: `${tableWidth}px`, width: `${tableWidth}px` }}
              >
                <thead>
                  <tr>
                    {visibleTableColumns.map((column, index) => (
                      <th
                        key={column.key}
                        className="text-nowrap small position-relative"
                        style={{
                          ...getColumnStyle(column),
                          paddingRight: index === visibleTableColumns.length - 1 ? "46px" : undefined,
                        }}
                      >
                        <span>{column.label}</span>
                        <span
                          className="column-resize-handle"
                          onMouseDown={(event) => startColumnResize(event, column)}
                          onTouchStart={(event) => startColumnResize(event, column)}
                          role="separator"
                          aria-orientation="vertical"
                          aria-label={`Resize ${column.label} column`}
                          title="Drag to resize column"
                        />

                        {index === visibleTableColumns.length - 1 && (
                          <span
                            className="position-absolute top-50 translate-middle-y"
                            style={{ right: "8px", zIndex: 14 }}
                          >
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary bg-white d-inline-flex align-items-center justify-content-center shadow-sm icon-btn"
                              onClick={() => setShowColumnMenu((show) => !show)}
                              aria-expanded={showColumnMenu}
                              aria-label="Table column menu"
                              title="Table column menu"
                            >
                              <Menu size={15} />
                            </button>
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>

                  <tr>
                    {visibleTableColumns.map((column) => (
                      <th
                        key={`${column.key}-filter`}
                        className="bg-white"
                        style={getColumnStyle(column)}
                      >
                        {column.filterable === false ? null : (
                          <div className="input-group input-group-sm">
                            <span className="input-group-text bg-primary text-white border-primary px-2">
                              <Search size={12} />
                            </span>

                            {column.type === "select" ? (
                              <select
                                className="form-select"
                                value={columnFilters[column.key] || ""}
                                onChange={(event) => updateColumnFilter(column.key, event.target.value)}
                                aria-label={`Filter ${column.label}`}
                              >
                                <option value="">All</option>
                                {column.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                className="form-control"
                                value={columnFilters[column.key] || ""}
                                onChange={(event) => updateColumnFilter(column.key, event.target.value)}
                                aria-label={`Filter ${column.label}`}
                              />
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {paginatedDocuments.map((item) => (
                    <tr key={item.id}>
                      {visibleTableColumns.map((column) => (
                        <td key={`${item.id}-${column.key}`} className="text-nowrap small" style={getColumnStyle(column)}>
                          {column.render ? column.render(item) : item[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {filteredDocuments.length === 0 && (
                    <tr>
                      <td colSpan={Math.max(visibleTableColumns.length, 1)} className="text-center text-muted py-4">
                        No documents found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {showColumnMenu && (
              <div
                className="position-absolute bg-white border rounded-3 shadow-sm p-2 text-start"
                style={{ width: "260px", top: "36px", right: "8px", zIndex: 20 }}
              >
                <button
                  type="button"
                  className="btn btn-light btn-sm w-100 text-start mb-1"
                  onClick={showAllColumns}
                >
                  Use All Columns
                </button>

                <button
                  type="button"
                  className="btn btn-light btn-sm w-100 text-start mb-2"
                  onClick={resetFilters}
                >
                  Clear All Filter
                </button>

                <div className="fw-semibold small border-top px-2 pt-2 pb-1">
                  Show / Hide Columns
                </div>

                {columns.map((columnOption) => (
                  <label
                    key={columnOption.key}
                    className="d-flex align-items-center gap-2 px-2 py-1 small"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input m-0"
                      checked={visibleColumns[columnOption.key]}
                      onChange={() => toggleColumn(columnOption.key)}
                    />
                    <span>{columnOption.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <div className="d-flex align-items-center gap-1">
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
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <small className="text-muted">
              Showing {startIndex} to {endIndex} of {filteredDocuments.length} entries
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentList;
