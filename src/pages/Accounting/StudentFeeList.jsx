import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AlertCircle,
  Clock3,
  Eye,
  IndianRupee,
  Users,
  Search,
  RotateCcw,
  Menu,
  LayoutDashboard,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

const StudentFeeList = () => {
  const studentData = [
    { id: "STU001", name: "Aarav Patil", className: "5th", installment: "First", totalFee: 15000, paid: 10000, pending: 5000, status: "Partial", year: "2024-25" },
    { id: "STU002", name: "Vedant Kulkarni", className: "6th", installment: "Second", totalFee: 18000, paid: 18000, pending: 0, status: "Paid", year: "2024-25" },
    { id: "STU003", name: "Tanvi Patil", className: "10th", installment: "Third", totalFee: 30000, paid: 12000, pending: 18000, status: "Pending", year: "2024-25" },
    // { id: "STU004", name: "Aarav Patil", className: "5th", installment: "First", totalFee: 15000, paid: 10000, pending: 5000, status: "Partial", year: "2024-25" },
    // { id: "STU005", name: "Vedant Kulkarni", className: "6th", installment: "Second", totalFee: 18000, paid: 18000, pending: 0, status: "Paid", year: "2024-25" },
    // { id: "STU006", name: "Tanvi Patil", className: "10th", installment: "Third", totalFee: 30000, paid: 12000, pending: 18000, status: "Pending", year: "2024-25" },
    // { id: "STU007", name: "Aarav Patil", className: "5th", installment: "First", totalFee: 15000, paid: 10000, pending: 5000, status: "Partial", year: "2024-25" },
    // { id: "STU008", name: "Vedant Kulkarni", className: "6th", installment: "Second", totalFee: 18000, paid: 18000, pending: 0, status: "Paid", year: "2024-25" },
    // { id: "STU009", name: "Tanvi Patil", className: "10th", installment: "Third", totalFee: 30000, paid: 12000, pending: 18000, status: "Pending", year: "2024-25" },
  ];

  const summaryCards = useMemo(
    () => [
      { title: "Total Students", value: "450", icon: Users, color: "#2563eb", background: "#eff6ff" },
      { title: "Total Collection", value: "Rs. 18.5L", icon: IndianRupee, color: "#16a34a", background: "#f0fdf4" },
      { title: "Total Pending", value: "Rs. 4.2L", icon: AlertCircle, color: "#ea580c", background: "#fff7ed" },
      { title: "Overdue", value: "Rs. 1.3L", icon: Clock3, color: "#dc2626", background: "#fef2f2" },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { key: "id", label: "Student ID", minWidth: "120px" },
      { key: "name", label: "Student Name", minWidth: "160px" },
      { key: "className", label: "Class", minWidth: "120px" },
      { key: "installment", label: "Installment", minWidth: "120px" },
      { key: "totalFee", label: "Total Fee", minWidth: "120px", render: (row) => formatMoney(row.totalFee) },
      { key: "paid", label: "Paid", minWidth: "120px", render: (row) => <span className="text-success fw-semibold">{formatMoney(row.paid)}</span> },
      { key: "pending", label: "Pending", minWidth: "120px", render: (row) => <span className="text-danger fw-semibold">{formatMoney(row.pending)}</span> },
      { key: "status", label: "Status", minWidth: "120px", render: (row) => renderStatus(row.status) },
      {
        key: "actions",
        label: "Action",
        minWidth: "120px",
        filterable: false,
        render: (row) => (
          <button
            type="button"
            className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center"
            style={actionButtonStyle}
            title={`View ${row.name}`}
            aria-label={`View ${row.name}`}
          >
            <Eye size={16} />
          </button>
        ),
      },
    ],
    []
  );

  const actionButtonStyle = useMemo(
    () => ({ width: "28px", height: "28px", padding: 0, borderRadius: "6px" }),
    []
  );

  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({
    year: "2024-25",
    className: "",
    installment: "",
    status: "",
  });
  const [columnFilters, setColumnFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [columnWidths, setColumnWidths] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.reduce((acc, column) => ({ ...acc, [column.key]: true }), {})
  );
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const columnMenuRef = useRef(null);
  const columnToggleRef = useRef(null);

  useEffect(() => {
    if (!showColumnMenu) return;

    const handleDocumentClick = (event) => {
      const menu = columnMenuRef.current;
      const toggle = columnToggleRef.current;
      if (menu && menu.contains(event.target)) return;
      if (toggle && toggle.contains(event.target)) return;
      setShowColumnMenu(false);
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [showColumnMenu]);

  const renderStatus = (status) => {
    const className = status === "Paid" ? "bg-success" : status === "Pending" ? "bg-danger" : "bg-warning text-dark";
    return <span className={`badge ${className}`}>{status}</span>;
  };

  const formatMoney = (value) => `Rs. ${value.toLocaleString("en-IN")}`;

  const visibleTableColumns = useMemo(
    () => columns.filter((column) => visibleColumns[column.key]),
    [columns, visibleColumns]
  );

  const getColumnMinWidth = useCallback((column) => Number.parseInt(column.minWidth, 10) || 120, []);
  const getColumnWidth = useCallback(
    (column) => columnWidths[column.key] || getColumnMinWidth(column),
    [columnWidths, getColumnMinWidth]
  );

  const tableWidth = useMemo(
    () => visibleTableColumns.reduce((total, column) => total + getColumnWidth(column), 0),
    [visibleTableColumns, getColumnWidth]
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
        setColumnWidths((prev) => ({ ...prev, [column.key]: nextWidth }));
      };

      const stopResize = () => {
        document.body.classList.remove("fees-column-resizing");
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", stopResize);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", stopResize);
      };

      document.body.classList.add("fees-column-resizing");
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", stopResize);
      window.addEventListener("touchmove", handlePointerMove);
      window.addEventListener("touchend", stopResize);
    },
    [getColumnMinWidth, getColumnWidth]
  );

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return studentData.filter((row) => {
      const matchesSearch = !query || columns.some((column) => String(row[column.key] || "").toLowerCase().includes(query));
      const matchesFilters = Object.entries(filterValues).every(([key, value]) => !value || String(row[key] || "") === String(value));
      const matchesColumnFilters = columns.every((column) => {
        if (column.filterable === false) return true;
        const columnFilter = (columnFilters[column.key] || "").trim().toLowerCase();
        if (!columnFilter) return true;
        return String(row[column.key] || "").toLowerCase().includes(columnFilter);
      });
      return matchesSearch && matchesFilters && matchesColumnFilters;
    });
  }, [columns, columnFilters, filterValues, search, studentData]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = filteredRows.length === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endIndex = Math.min(activePage * pageSize, filteredRows.length);
  const paginatedRows = filteredRows.slice((activePage - 1) * pageSize, activePage * pageSize);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const updateColumnFilter = (key, value) => {
    setColumnFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setFilterValues({ year: "2024-25", className: "", installment: "", status: "" });
    setColumnFilters({});
    setCurrentPage(1);
  };

  const showAllColumns = () => {
    setVisibleColumns(columns.reduce((visible, column) => ({ ...visible, [column.key]: true }), {}));
  };

  const toggleColumn = (key) => {
    setVisibleColumns((visible) => ({ ...visible, [key]: !visible[key] }));
  };

  return (
    <div className="container-fluid fees-page w-100">
      <style>{`
        .fees-page {
          min-height: calc(100vh - 20px);
          background: #f6f8fb;
          color: #172033;
        }

        .fees-page .page-header {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-left: 4px solid #2563eb;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 10px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .fees-page .page-title {
          color: #1d4ed8;
          font-size: 1.25rem;
          line-height: 1.2;
        }

        .fees-page .breadcrumb-lite {
          color: #64748b;
        }

        .fees-page .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 8px;
          color: #1e3a8a;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .fees-page .section-label::before {
          content: "";
          width: 6px;
          height: 18px;
          border-radius: 999px;
          background: #2563eb;
        }

        .fees-page .summary-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(150px, 1fr));
          gap: 10px;
          margin-bottom: 10px;
        }

        .fees-page .summary-card,
        .fees-page .filter-card,
        .fees-page .table-card {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .fees-page .summary-card {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          padding: 10px 12px;
        }

        .fees-page .summary-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .fees-page .summary-value {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.1;
        }

        .fees-page .summary-title {
          color: #64748b;
          font-size: 0.76rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .fees-page .filter-card .card-body,
        .fees-page .table-card .card-body {
          padding: 10px 12px !important;
        }

        .fees-page .filter-actions .btn,
        .fees-page .icon-btn {
          width: 31px;
          height: 31px;
          padding: 0;
          border-radius: 7px;
        }

        .fees-page .primary-action {
          min-height: 32px;
          border-radius: 7px;
          font-weight: 700;
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18);
        }

        .fees-page .table-shell {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          overflow: visible; /* allow the column menu to overlap the grid */
        }

        .fees-page .fees-table {
          table-layout: fixed;
        }

        .fees-page .fees-table th,
        .fees-page .fees-table td {
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }

        .fees-page .fees-table thead tr:first-child th {
          background: #f8fafc;
          color: #0f172a;
          border-bottom: 1px solid #dbe3ee;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0;
        }

        .fees-page .column-resize-handle {
          position: absolute;
          top: 0;
          right: -4px;
          width: 8px;
          height: 100%;
          cursor: col-resize;
          touch-action: none;
          z-index: 12;
        }

        .fees-page .column-resize-handle::after {
          content: "";
          position: absolute;
          top: 9px;
          bottom: 9px;
          left: 3px;
          width: 2px;
          border-radius: 999px;
          background: transparent;
        }

        .fees-page .column-resize-handle:hover::after {
          background: #2563eb;
        }

        body.fees-column-resizing {
          cursor: col-resize;
          user-select: none;
        }

        .fees-page .fees-table thead tr:nth-child(2) th {
          background: #ffffff;
          border-bottom: 1px solid #e6ebf2;
        }

        .fees-page .fees-table tbody td {
          color: #1f2937;
          border-bottom-color: #edf2f7;
        }

        .fees-page .fees-table tbody tr:hover td {
          background: #f8fbff;
        }

        .fees-page .badge {
          border-radius: 999px;
          padding: 0.35em 0.65em;
          font-weight: 700;
        }

        @media (max-width: 1280px) {
          .fees-page .summary-grid {
            grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .fees-page .page-header {
            align-items: flex-start !important;
          }

          .fees-page .breadcrumb-lite {
            display: none !important;
          }
        }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <div>
          <h3 className="page-title fw-bold mb-0">Students Fee List</h3>
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

      <h5 className="section-label">Fee Summary</h5>

      <div className="summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div className="summary-card" key={card.title}>
              <div className="summary-icon" style={{ background: card.background, color: card.color }}>
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

      <h5 className="section-label">Filter</h5>

      <div className="filter-card mb-3">
        <div className="card-body">
          <div className="d-flex align-items-end gap-2 flex-wrap overflow-visible pb-1">
            <div style={{ flex: "1.6 1 250px", minWidth: "230px" }}>
              <label className="form-label small mb-1">Search</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-primary text-white border-primary px-2">
                  <Search size={12} />
                </span>
                <input
                  className="form-control"
                  placeholder="Search..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div style={{ flex: "1 1 142px", minWidth: "132px" }}>
              <label className="form-label small mb-1">Academic Year</label>
              <select
                className="form-select form-select-sm"
                value={filterValues.year}
                onChange={(event) => {
                  setFilterValues((current) => ({ ...current, year: event.target.value }));
                  setCurrentPage(1);
                }}
              >
                <option value="">All Years</option>
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26</option>
              </select>
            </div>

            <div style={{ flex: "1 1 142px", minWidth: "132px" }}>
              <label className="form-label small mb-1">Class</label>
              <select
                className="form-select form-select-sm"
                value={filterValues.className}
                onChange={(event) => {
                  setFilterValues((current) => ({ ...current, className: event.target.value }));
                  setCurrentPage(1);
                }}
              >
                <option value="">All Classes</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
            </div>

            <div style={{ flex: "1 1 142px", minWidth: "132px" }}>
              <label className="form-label small mb-1">Installment</label>
              <select
                className="form-select form-select-sm"
                value={filterValues.installment}
                onChange={(event) => {
                  setFilterValues((current) => ({ ...current, installment: event.target.value }));
                  setCurrentPage(1);
                }}
              >
                <option value="">All Installments</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
                <option value="Fourth">Fourth</option>
              </select>
            </div>

            <div style={{ flex: "0 0 72px" }} className="filter-actions d-flex align-items-center gap-2">
              <button type="button" className="btn btn-primary d-flex align-items-center justify-content-center" aria-label="Search" title="Search">
                <Search size={16} />
              </button>
              <button type="button" className="btn btn-outline-secondary d-flex align-items-center justify-content-center" aria-label="Reset" title="Reset" onClick={resetFilters}>
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-2 mb-3 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              <h6 className="section-label mb-0">Student Fee Records</h6>
            </div>
          </div>

          <div className="table-shell position-relative">
            <table className="table table-sm table-striped align-middle fees-table mb-0" style={{ width: `${tableWidth}px`, minWidth: "100%" }}>
              <thead>
                <tr>
                  {visibleTableColumns.map((column, index) => (
                    <th
                      key={column.key}
                      style={{
                        ...getColumnStyle(column),
                        paddingRight: index === visibleTableColumns.length - 1 ? "46px" : undefined,
                      }}
                      className="position-relative text-nowrap small"
                    >
                      <span>{column.label}</span>
                      <span
                        className="column-resize-handle"
                        onMouseDown={(event) => startColumnResize(event, column)}
                        onTouchStart={(event) => startColumnResize(event, column)}
                      />
                      {index === visibleTableColumns.length - 1 && (
                        <span className="position-absolute top-50 translate-middle-y" style={{ right: "8px", zIndex: 10 }}>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary bg-white d-inline-flex align-items-center justify-content-center shadow-sm icon-btn"
                            onClick={() => setShowColumnMenu((show) => !show)}
                            aria-expanded={showColumnMenu}
                            aria-label="Table column menu"
                            title="Table column menu"
                            ref={columnToggleRef}
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
                    <th key={`${column.key}-filter`} className="bg-white" style={getColumnStyle(column)}>
                      {column.filterable !== false && column.key !== "actions" ? (
                        <div className="input-group input-group-sm">
                          <span className="input-group-text bg-primary text-white border-primary px-2">
                            <Search size={12} />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={columnFilters[column.key] || ""}
                            onChange={(e) => updateColumnFilter(column.key, e.target.value)}
                            aria-label={`Filter ${column.label}`}
                            placeholder="Filter..."
                          />
                        </div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((row) => (
                  <tr key={row.id}>
                    {visibleTableColumns.map((column) => (
                      <td key={column.key} style={getColumnStyle(column)} className="text-nowrap small">
                        {column.render ? column.render(row) : String(row[column.key] || "")}
                      </td>
                    ))}
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={visibleTableColumns.length} className="text-center text-muted py-4">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {showColumnMenu && (
              <div
                className="position-absolute bg-white border rounded-3 shadow-sm p-2 text-start column-toggle-menu"
                style={{ width: "200px", top: "36px", right: "8px", zIndex: 20 }}
                ref={columnMenuRef}
              >
                <button type="button" className="btn btn-light btn-sm w-100 text-start mb-1" onClick={showAllColumns}>
                  Use All Columns
                </button>
                <button type="button" className="btn btn-light btn-sm w-100 text-start mb-2" onClick={resetFilters}>
                  Clear All Filters
                </button>
                <div className="fw-semibold small border-top px-2 pt-2 pb-1">Show / Hide Columns</div>
                {columns.map((col) => (
                  <label key={col.key} className="d-flex align-items-center gap-2 px-2 py-1 small">
                    <input type="checkbox" className="form-check-input m-0" checked={visibleColumns[col.key]} onChange={() => toggleColumn(col.key)} />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>
            )}
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
              {startIndex} - {endIndex} of {filteredRows.length} items
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeList;
