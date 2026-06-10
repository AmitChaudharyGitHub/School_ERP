import React, { useCallback, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  UserPlus,
  Users,
  FileWarning,
  IndianRupee,
  Eye,
  Pencil,
  Trash2,
  Search,
  RotateCcw,
  Menu,
  LayoutDashboard,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  CalendarDays,
} from "lucide-react";

const StudentAdmissionList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [columnFilters, setColumnFilters] = useState({});
  const [admissionDateRange, setAdmissionDateRange] = useState({
    from: "",
    to: "",
  });
  const [showAdmissionCalendar, setShowAdmissionCalendar] = useState(false);
  const [hoveredAdmissionDate, setHoveredAdmissionDate] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [columnWidths, setColumnWidths] = useState({});
  const actionButtonStyle = useMemo(() => ({
    width: "28px",
    height: "28px",
    padding: 0,
    borderRadius: "6px",
  }), []);
  const compactFilterStyle = useMemo(() => ({
    flex: "1 1 142px",
    minWidth: "132px",
  }), []);
  const dateFilterStyle = useMemo(() => ({
    flex: "1.6 1 250px",
    minWidth: "230px",
  }), []);
  const summaryCards = useMemo(() => [
    {
      title: "Total Admissions",
      value: "256",
      icon: UserPlus,
      color: "#2563eb",
      background: "#eff6ff",
    },
    {
      title: "Male Students",
      value: "132",
      icon: Users,
      color: "#16a34a",
      background: "#f0fdf4",
    },
    {
      title: "Female Students",
      value: "124",
      icon: Users,
      color: "#db2777",
      background: "#fdf2f8",
    },
    {
      title: "Pending Documents",
      value: "36",
      icon: FileWarning,
      color: "#ea580c",
      background: "#fff7ed",
    },
    {
      title: "Pending Fee Payments",
      value: "27",
      icon: IndianRupee,
      color: "#7c3aed",
      background: "#f5f3ff",
    },
  ], []);
  const [admissions] = useState([
    {
      id: 1,
      admissionNo: "ADM2024/001",
      studentName: "Aarav Sharma",
      standard: "5th Standard",
      gender: "Male",
      admissionDate: "15/05/2024",
      installmentPlan: "2 Installments",
      mobile: "9876543210",
      fatherName: "Rajesh Sharma",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 2,
      admissionNo: "ADM2024/002",
      studentName: "Diya Patel",
      standard: "6th Standard",
      gender: "Female",
      admissionDate: "14/05/2024",
      installmentPlan: "3 Installments",
      mobile: "9123456780",
      fatherName: "Viral Patel",
      documentStatus: "Verified",
      feeStatus: "Paid",
    },
    {
      id: 3,
      admissionNo: "ADM2024/003",
      studentName: "Vivaan Singh",
      standard: "7th Standard",
      gender: "Male",
      admissionDate: "13/05/2024",
      installmentPlan: "2 Installments",
      mobile: "9988776655",
      fatherName: "Amit Singh",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
       {
      id: 4,
      admissionNo: "ADM2024/001",
      studentName: "Aarav Sharma",
      standard: "5th Standard",
      gender: "Male",
      admissionDate: "15/05/2024",
      installmentPlan: "2 Installments",
      mobile: "9876543210",
      fatherName: "Rajesh Sharma",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 5,
      admissionNo: "ADM2024/002",
      studentName: "Diya Patel",
      standard: "6th Standard",
      gender: "Female",
      admissionDate: "14/05/2024",
      installmentPlan: "3 Installments",
      mobile: "9123456780",
      fatherName: "Viral Patel",
      documentStatus: "Verified",
      feeStatus: "Paid",
    },
    {
      id: 6,
      admissionNo: "ADM2024/003",
      studentName: "Vivaan Singh",
      standard: "7th Standard",
      gender: "Male",
      admissionDate: "13/05/2024",
      installmentPlan: "2 Installments",
      mobile: "9988776655",
      fatherName: "Amit Singh",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
      {
      id: 7,
      admissionNo: "ADM2024/001",
      studentName: "Aarav Sharma",
      standard: "5th Standard",
      gender: "Male",
      admissionDate: "15/05/2024",
      installmentPlan: "2 Installments",
      mobile: "9876543210",
      fatherName: "Rajesh Sharma",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 8,
      admissionNo: "ADM2024/002",
      studentName: "Diya Patel",
      standard: "6th Standard",
      gender: "Female",
      admissionDate: "14/05/2024",
      installmentPlan: "3 Installments",
      mobile: "9123456780",
      fatherName: "Viral Patel",
      documentStatus: "Verified",
      feeStatus: "Paid",
    },
    {
      id: 9,
      admissionNo: "ADM2024/003",
      studentName: "Vivaan Singh",
      standard: "7th Standard",
      gender: "Male",
      admissionDate: "13/05/2024",
      installmentPlan: "2 Installments",
      mobile: "9988776655",
      fatherName: "Amit Singh",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
  ]);

  const columns = useMemo(
    () => [
      { key: "admissionNo", label: "Admission No.", minWidth: "120px" },
      { key: "studentName", label: "Student Name", minWidth: "120px" },
      { key: "standard", label: "Standard", minWidth: "150px" },
      { key: "gender", label: "Gender", minWidth: "150px" },
      { key: "admissionDate", label: "Admission Date", minWidth: "120px" },
      { key: "installmentPlan", label: "Fee Installment Plan", minWidth: "120px" },
      { key: "mobile", label: "Mobile No.", minWidth: "120px" },
      { key: "fatherName", label: "Father Name", minWidth: "120px" },
      { key: "documentStatus",label: "Document Status",minWidth: "120px"},
      {key: "feeStatus",label: "Fee Status", minWidth: "120px"},
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
              style={actionButtonStyle}
              title="View admission"
              aria-label={`View admission for ${item.studentName}`}
            >
              <Eye size={16} />
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-success d-inline-flex align-items-center justify-content-center"
              style={actionButtonStyle}
              title="Edit admission"
              aria-label={`Edit admission for ${item.studentName}`}
              onClick={() => {
                setSelectedStudent(item);
                setShowModal(true);
              }}
            >
              <Pencil size={16} />
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center"
              style={actionButtonStyle}
              title="Delete admission"
              aria-label={`Delete admission for ${item.studentName}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [actionButtonStyle]
  );
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((visible, column) => ({ ...visible, [column.key]: true }), {})
  );

  const visibleTableColumns = columns.filter((column) => visibleColumns[column.key]);
  const getColumnMinWidth = useCallback((column) => Number.parseInt(column.minWidth, 10) || 120, []);
  const getColumnWidth = useCallback(
    (column) => columnWidths[column.key] || getColumnMinWidth(column),
    [columnWidths, getColumnMinWidth]
  );
  const tableWidth = visibleTableColumns.reduce(
    (total, column) => total + getColumnWidth(column),
    0
  );
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
        document.body.classList.remove("admission-column-resizing");
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", stopResize);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", stopResize);
      };

      document.body.classList.add("admission-column-resizing");
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", stopResize);
      window.addEventListener("touchmove", handlePointerMove);
      window.addEventListener("touchend", stopResize);
    },
    [getColumnMinWidth, getColumnWidth]
  );

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

  const admissionRangeValue = admissionDateRange.from && admissionDateRange.to
    ? `${formatDateKey(admissionDateRange.from)} - ${formatDateKey(admissionDateRange.to)}`
    : admissionDateRange.from
      ? formatDateKey(admissionDateRange.from)
      : "";

  const parseAdmissionDate = (dateValue) => {
    const [day, month, year] = dateValue.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  };

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

  const selectAdmissionDate = (dateKey) => {
    setAdmissionDateRange((range) => {
      if (!range.from || range.to) {
        return { from: dateKey, to: "" };
      }

      if (new Date(dateKey).getTime() < new Date(range.from).getTime()) {
        return { from: dateKey, to: range.from };
      }

      return { ...range, to: dateKey };
    });
    setHoveredAdmissionDate("");
    setCurrentPage(1);
  };

  const isAdmissionDateInRange = (dateKey) => {
    if (!admissionDateRange.from) {
      return false;
    }

    const startTime = new Date(admissionDateRange.from).getTime();
    const endKey = admissionDateRange.to || hoveredAdmissionDate;

    if (!endKey) {
      return dateKey === admissionDateRange.from;
    }

    const endTime = new Date(endKey).getTime();
    const dateTime = new Date(dateKey).getTime();
    return dateTime >= Math.min(startTime, endTime) && dateTime <= Math.max(startTime, endTime);
  };

  const filteredAdmissions = admissions.filter((item) => {
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

    const admissionTime = parseAdmissionDate(item.admissionDate);
    const fromTime = admissionDateRange.from
      ? new Date(admissionDateRange.from).getTime()
      : null;
    const toTime = admissionDateRange.to
      ? new Date(admissionDateRange.to).getTime()
      : null;

    if (fromTime && admissionTime < fromTime) {
      return false;
    }

    if (toTime && admissionTime > toTime) {
      return false;
    }

    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filteredAdmissions.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = filteredAdmissions.length === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endIndex = Math.min(activePage * pageSize, filteredAdmissions.length);
  const paginatedAdmissions = filteredAdmissions.slice(startIndex - 1, endIndex);

  const updateColumnFilter = (key, value) => {
    setColumnFilters((filters) => ({
      ...filters,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const toggleColumn = (key) => {
    setVisibleColumns((visible) => ({
      ...visible,
      [key]: !visible[key],
    }));
  };

  const showAllColumns = () => {
    setVisibleColumns(
      columns.reduce((visible, column) => ({ ...visible, [column.key]: true }), {})
    );
  };

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const admissionModal = showModal ? (

    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)"
      }}
    >

      <div className="modal-dialog modal-xl">

        <div className="modal-content border-0 shadow">

          {/* HEADER */}

          <div className="modal-header">

            <h5 className="fw-bold">

              {selectedStudent
                ? "Edit Student Admission"
                : "New Student Admission"}

            </h5>

            <button
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>

          </div>

          {/* BODY */}

          <div className="modal-body">

            {/* TABS */}

            <ul
              className="nav nav-tabs mb-4"
            >

              <li className="nav-item">
                <button
                  className="nav-link active"
                >
                  Student Information
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                >
                  Guardian Information
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                >
                  Other Information
                </button>
              </li>

            </ul>

            {/* STUDENT INFO */}

            <div className="row g-3">

              <div className="col-md-3">
                <label className="form-label">
                  Admission No
                </label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    selectedStudent?.admissionNo || ""
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Admission Date
                </label>

                <input
                  type="date"
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Academic Year
                </label>

                <select className="form-select">
                  <option>2024-25</option>
                  <option>2025-26</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Standard
                </label>

                <select className="form-select">
                  <option>Select Standard</option>
                  <option>5th Standard</option>
                  <option>6th Standard</option>
                  <option>7th Standard</option>
                  <option>8th Standard</option>
                  <option>9th Standard</option>
                  <option>10th Standard</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Student Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    selectedStudent?.studentName || ""
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Gender
                </label>

                <select className="form-select">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Date Of Birth
                </label>

                <input
                  type="date"
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Category
                </label>

                <select className="form-select">
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Mobile No
                </label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    selectedStudent?.mobile || ""
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Father Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    selectedStudent?.fatherName || ""
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Mother Name
                </label>

                <input
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Email ID
                </label>

                <input
                  type="email"
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Fee Installment Plan
                </label>

                <select className="form-select">

                  <option>
                    Select Plan
                  </option>

                  <option>
                    Full Payment
                  </option>

                  <option>
                    2 Installments
                  </option>

                  <option>
                    3 Installments
                  </option>

                  <option>
                    4 Installments
                  </option>

                </select>

              </div>

            </div>

            {/* STATUS SECTION */}

            <div className="row mt-4">

              <div className="col-md-6">

                <div
                  className="card border-warning"
                >

                  <div className="card-body">

                    <h6 className="text-warning">
                      Document Status
                    </h6>

                    <h5>Pending</h5>

                    <small>
                      Documents Verification Pending
                    </small>

                  </div>

                </div>

              </div>

              <div className="col-md-6">

                <div
                  className="card border-danger"
                >

                  <div className="card-body">

                    <h6 className="text-danger">
                      Fee Status
                    </h6>

                    <h5>Pending</h5>

                    <small>
                      Admission Fee Pending
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={() =>
                setShowModal(false)
              }
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
            >
              Save
            </button>

          </div>

        </div>

      </div>

    </div>

  ) : null;

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

        .admission-page .table-shell {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          overflow: auto;
        }

        .admission-page .admission-table {
          table-layout: fixed;
        }

        .admission-page .admission-table th,
        .admission-page .admission-table td {
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }

        .admission-page .admission-table thead tr:first-child th {
          background: #f8fafc;
          color: #0f172a;
          border-bottom: 1px solid #dbe3ee;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0;
        }

        .admission-page .column-resize-handle {
          position: absolute;
          top: 0;
          right: -4px;
          width: 8px;
          height: 100%;
          cursor: col-resize;
          touch-action: none;
          z-index: 12;
        }

        .admission-page .column-resize-handle::after {
          content: "";
          position: absolute;
          top: 9px;
          bottom: 9px;
          left: 3px;
          width: 2px;
          border-radius: 999px;
          background: transparent;
        }

        .admission-page .column-resize-handle:hover::after {
          background: #2563eb;
        }

        body.admission-column-resizing {
          cursor: col-resize;
          user-select: none;
        }

        .admission-page .admission-table thead tr:nth-child(2) th {
          background: #ffffff;
          border-bottom: 1px solid #e6ebf2;
        }

        .admission-page .admission-table tbody td {
          color: #1f2937;
          border-bottom-color: #edf2f7;
        }

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

      {/* HEADER */}

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <div>
          <h3 className="page-title fw-bold mb-0">
            Student Admission List
          </h3>
        </div>

        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
          <span>/</span>
          <span>Admission</span>
          <span>/</span>
          <span>Student Admission</span>
        </div>
      </div>

      <h5 className="section-label">
        Admission Statistics
      </h5>

      {/* SUMMARY CARDS */}

      <div className="summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div className="summary-card" key={card.title}>
              <div
                className="summary-icon"
                style={{ background: card.background, color: card.color }}
              >
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="summary-value">{card.value}</p>
                <div className="summary-title text-truncate">{card.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FILTERS */}

      <h5 className="section-label">
        Filter
      </h5>

      <div className="filter-card">

        <div className="card-body">

          <div className="d-flex align-items-end gap-2 flex-wrap overflow-visible pb-1">

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Academic Year
              </label>

              <select className="form-select form-select-sm">
                <option>2024-25</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Standard
              </label>

              <select className="form-select form-select-sm">
                <option>All Standards</option>
                <option>5th</option>
                <option>6th</option>
                <option>7th</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Gender
              </label>

              <select className="form-select form-select-sm">
                <option>All Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Document Status
              </label>

              <select className="form-select form-select-sm">
                <option>All Document Status</option>
                <option>Pending</option>
                <option>Verified</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Fee Status
              </label>

              <select className="form-select form-select-sm">
                <option>All Fee Status</option>
                <option>Paid</option>
                <option>Partial</option>
                <option>Pending</option>
              </select>
            </div>

            <div style={dateFilterStyle}>
              <label className="form-label small mb-1">
                Admission Date Range
              </label>

              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={admissionRangeValue}
                  readOnly
                  placeholder="Select date range"
                  onClick={() => setShowAdmissionCalendar((show) => !show)}
                  aria-label="Admission date range"
                  style={{ cursor: "pointer", paddingRight: "34px" }}
                />

                <button
                  type="button"
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y p-0 me-2 text-secondary"
                  aria-label="Open admission date calendar"
                  title="Open calendar"
                  onClick={() => setShowAdmissionCalendar((show) => !show)}
                >
                  <CalendarDays size={16} />
                </button>

                {showAdmissionCalendar && (
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
                        const isRangeEdge = dateKey === admissionDateRange.from || dateKey === admissionDateRange.to;
                        const isInRange = isAdmissionDateInRange(dateKey);

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
                            }}
                            onMouseEnter={() => {
                              if (admissionDateRange.from && !admissionDateRange.to) {
                                setHoveredAdmissionDate(dateKey);
                              }
                            }}
                            onClick={() => {
                              selectAdmissionDate(dateKey);
                              if (admissionDateRange.from && !admissionDateRange.to) {
                                setShowAdmissionCalendar(false);
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
                onClick={() => {
                  setAdmissionDateRange({ from: "", to: "" });
                  setCurrentPage(1);
                }}
              >
                <RotateCcw size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="grid-card">

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-3 mb-2 flex-wrap">
            <div>
              <h6 className="section-label mb-0">Admission</h6>
            </div>

            <button
              className="btn btn-primary primary-action px-3"
              onClick={() => {
                setSelectedStudent(null);
                setShowModal(true);
              }}
            >
              + New Admission
            </button>
          </div>

          <div className="position-relative">
            <div className="table-shell">

              <table
                className="table table-sm table-striped align-middle admission-table"
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
                          paddingRight:
                            index === visibleTableColumns.length - 1 ? "46px" : undefined,
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
                            style={{ right: "8px", zIndex: 10 }}
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
                                onChange={(event) =>
                                  updateColumnFilter(column.key, event.target.value)
                                }
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
                                onChange={(event) =>
                                  updateColumnFilter(column.key, event.target.value)
                                }
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

                  {paginatedAdmissions.map((item) => (
                    <tr key={item.id}>
                      {visibleTableColumns.map((column) => (
                        <td
                          key={`${item.id}-${column.key}`}
                          className="text-nowrap small"
                          style={getColumnStyle(column)}
                        >
                          {column.render ? column.render(item) : item[column.key]}
                        </td>
                      ))}

                    </tr>
                  ))}

                  {filteredAdmissions.length === 0 && (
                    <tr>
                      <td colSpan={Math.max(visibleTableColumns.length, 1)} className="text-center text-muted py-4">
                        No admissions found
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
                  onClick={() => {
                    setColumnFilters({});
                    setAdmissionDateRange({ from: "", to: "" });
                    setCurrentPage(1);
                  }}
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

          {/* PAGINATION */}

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
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <small className="text-muted">items per page</small>
            </div>

            <small className="text-muted">
              {startIndex} - {endIndex} of {filteredAdmissions.length} items
            </small>

          </div>

        </div>

      </div>

      {admissionModal}

    </div>
  );
};

export default StudentAdmissionList;
