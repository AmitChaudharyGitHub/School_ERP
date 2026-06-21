import React, { useMemo, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LayoutDashboard, Plus, RotateCcw, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Menu } from "lucide-react";

const formatValue = (value) => {
  if (typeof value === "number") {
    return `Rs. ${value.toLocaleString("en-IN")}`;
  }

  return value;
};

const AccountingPageShell = ({
  title,
  sectionLabel,
  breadcrumb,
  summaryCards = [],
  filters = [],
  primaryAction,
  columns = [],
  rows = [],
  emptyText = "No records found",
  tableTitle,
  children,
}) => {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState(
    filters.reduce((acc, filter) => ({ ...acc, [filter.key]: filter.defaultValue || "" }), {})
  );
  const [columnFilters, setColumnFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [columnWidths, setColumnWidths] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((visible, column) => ({ ...visible, [column.key]: true }), {})
  );
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const visibleTableColumns = useMemo(() => columns.filter((column) => visibleColumns[column.key]), [columns, visibleColumns]);

  const getColumnMinWidth = useCallback((column) => Number.parseInt(column.minWidth, 10) || 120, []);
  const getColumnWidth = useCallback(
    (column) => columnWidths[column.key] || getColumnMinWidth(column),
    [columnWidths, getColumnMinWidth]
  );

  const tableWidth = useMemo(() => visibleTableColumns.reduce(
    (total, column) => total + getColumnWidth(column),
    0
  ), [visibleTableColumns, getColumnWidth]);

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
        setColumnWidths((widths) => ({ ...widths, [column.key]: nextWidth }));
      };

      const stopResize = () => {
        document.body.classList.remove("column-resizing");
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", stopResize);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", stopResize);
      };

      document.body.classList.add("column-resizing");
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", stopResize);
      window.addEventListener("touchmove", handlePointerMove);
      window.addEventListener("touchend", stopResize);
    },
    [getColumnWidth, getColumnMinWidth]
  );

  const filteredRows = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch = !keyword || columns.some((column) => (
        String(row[column.key] || "").toLowerCase().includes(keyword)
      ));

      const matchesFilters = filters.every((filter) => (
        !filterValues[filter.key] || String(row[filter.key] || "") === String(filterValues[filter.key])
      ));

      const matchesColumnFilters = columns.every((column) => {
        if (column.filterable === false) return true;
        const filterValue = (columnFilters[column.key] || "").trim().toLowerCase();
        if (!filterValue) return true;
        return String(row[column.key] || "").toLowerCase().includes(filterValue);
      });

      return matchesSearch && matchesFilters && matchesColumnFilters;
    });
  }, [columns, filterValues, filters, rows, search, columnFilters]);

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
    setFilterValues(filters.reduce((acc, filter) => ({ ...acc, [filter.key]: filter.defaultValue || "" }), {}));
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
    <div className="accounting-list-page">
      <style>{`
        .accounting-list-page { min-height: calc(100vh - 20px); background: #f6f8fb; padding: 14px 16px 20px; font-size: 0.86rem; color: #1f2937; }
        .accounting-list-page .page-header { background: #ffffff; border: 1px solid #e6ebf2; border-left: 4px solid #2563eb; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05); }
        .accounting-list-page .page-title { color: #1d4ed8; font-size: 1.25rem; line-height: 1.2; }
        .accounting-list-page .breadcrumb-lite { color: #64748b; }
        .accounting-list-page .section-label { display: flex; align-items: center; gap: 8px; color: #1e3a8a; font-size: 0.9rem; font-weight: 700; margin: 0 0 8px; }
        .accounting-list-page .section-label::before { content: ""; width: 6px; height: 18px; border-radius: 999px; background: #2563eb; }
        .accounting-list-page .summary-grid { display: grid; grid-template-columns: repeat(5, minmax(150px, 1fr)); gap: 10px; margin-bottom: 12px; }
        .accounting-list-page .summary-card, .accounting-list-page .filter-card, .accounting-list-page .table-card, .accounting-list-page .dashboard-card { background: #fff; border: 1px solid #e6ebf2; border-radius: 8px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05); }
        .accounting-list-page .summary-card { min-height: 74px; padding: 12px; display: flex; align-items: center; gap: 10px; }
        .accounting-list-page .summary-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .accounting-list-page .summary-value { margin: 0; font-size: 1.2rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .accounting-list-page .summary-title { color: #64748b; font-size: 0.76rem; font-weight: 600; white-space: nowrap; }
        .accounting-list-page .summary-note { color: #64748b; font-size: 0.72rem; font-weight: 600; }
        .accounting-list-page .filter-card { margin-bottom: 10px; }
        .accounting-list-page .filter-card .card-body, .accounting-list-page .table-card .card-body, .accounting-list-page .dashboard-card .card-body { padding: 10px 12px !important; }
        .accounting-list-page .card-heading { color: #0f172a; font-size: 0.84rem; font-weight: 800; margin: 0; }
        .accounting-list-page .filter-actions .btn, .accounting-list-page .icon-btn { width: 31px; height: 31px; padding: 0; border-radius: 7px; }
        .accounting-list-page .table-shell { border: 1px solid #e6ebf2; border-radius: 8px; overflow: auto; }
        .accounting-list-page .dashboard-table { table-layout: fixed; }
        .accounting-list-page .dashboard-table th, .accounting-list-page .dashboard-table td { overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }
        .accounting-list-page .dashboard-table thead th { background: #f8fafc; color: #0f172a; border-bottom: 1px solid #dbe3ee; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0; }
        .accounting-list-page .column-resize-handle { position: absolute; top: 0; right: -4px; width: 8px; height: 100%; cursor: col-resize; touch-action: none; z-index: 12; }
        .accounting-list-page .column-resize-handle::after { content: ""; position: absolute; top: 9px; bottom: 9px; left: 3px; width: 2px; border-radius: 999px; background: transparent; }
        .accounting-list-page .column-resize-handle:hover::after { background: #2563eb; }
        body.column-resizing { cursor: col-resize; user-select: none; }
        .accounting-list-page .dashboard-table tbody td { color: #1f2937; border-bottom-color: #edf2f7; }
        .accounting-list-page .dashboard-table tbody tr:hover td { background: #f8fbff; }
        .accounting-list-page .badge { border-radius: 999px; padding: 0.35em 0.65em; font-weight: 700; }
        .accounting-list-page .report-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
        .accounting-list-page .report-card { border: 1px solid #e6ebf2; border-radius: 8px; padding: 12px; display: flex; align-items: flex-start; gap: 10px; background: #fff; min-height: 132px; }
        .accounting-list-page .report-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .accounting-list-page .student-profile-photo { width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #dbe3ee; }
        @media (max-width: 992px) { .accounting-list-page .summary-grid { grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); } }
        @media (max-width: 768px) { .accounting-list-page .breadcrumb-lite { display: none !important; } }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <h3 className="page-title fw-bold mb-0">{title}</h3>
        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span><span>/</span><span>Accounting</span><span>/</span><span>{breadcrumb || title}</span>
        </div>
      </div>

      {!!summaryCards.length && (
        <div className="mb-2">
          <h5 className="section-label mb-0">{sectionLabel || "Accounting Summary"}</h5>
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
        </div>
      )}

      <h5 className="section-label">Filter</h5>
      <div className="filter-card">
        <div className="card-body">
          <div className="d-flex align-items-end gap-2 flex-wrap">
            <div style={{ flex: "1.6 1 250px", minWidth: "230px" }}>
              <label className="form-label small mb-1">Search</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-primary text-white border-primary px-2">
                  <Search size={12} />
                </span>
                <input className="form-control" placeholder={`Search...`} value={search} onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }} />
              </div>
            </div>
            {filters.map((filter) => (
              <div key={filter.key} style={{ flex: "1 1 142px", minWidth: "132px" }}>
                <label className="form-label small mb-1">{filter.label}</label>
                <select className="form-select form-select-sm" value={filterValues[filter.key]} onChange={(event) => { setFilterValues((current) => ({ ...current, [filter.key]: event.target.value })); setCurrentPage(1); }}>
                  <option value="">{filter.allLabel || "All"}</option>
                  {filter.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            ))}
            <div className="filter-actions d-flex align-items-end gap-2" style={{ flex: "0 0 72px" }}>
              <button className="btn btn-primary d-flex align-items-center justify-content-center" aria-label="Search" title="Search"><Search size={16} /></button>
              <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" aria-label="Reset" title="Reset" onClick={resetFilters}><RotateCcw size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      {children}

      {!!columns.length && (
        <div className="table-card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center gap-2 mb-2 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <h6 className="section-label mb-0">{tableTitle || title}</h6>
                <span className="badge bg-primary-subtle text-primary">{filteredRows.length} Records</span>
              </div>
              {primaryAction && (
                <button
                  className="btn btn-primary btn-sm primary-action d-inline-flex align-items-center gap-1 px-3"
                  onClick={primaryAction.onClick}
                >
                  <Plus size={15} />
                  {primaryAction.label}
                </button>
              )}
            </div>
            <div className="table-shell position-relative">
              <table 
                className="table table-sm table-striped align-middle dashboard-table mb-0"
                style={{ width: `${tableWidth}px`, minWidth: "100%" }}
              >
                <thead>
                  <tr>
                    {visibleTableColumns.map((column, index) => (
                      <th key={column.key} style={getColumnStyle(column)} className="position-relative text-nowrap small">
                        <span>{column.label}</span>
                        <span
                          className="column-resize-handle"
                          onMouseDown={(event) => startColumnResize(event, column)}
                          onTouchStart={(event) => startColumnResize(event, column)}
                        />
                        {index === visibleTableColumns.length - 1 && (
                          <span className="position-absolute top-50 translate-middle-y" style={{ right: "8px", zIndex: 10 }}>
                            <button type="button" className="btn btn-sm btn-outline-secondary bg-white d-inline-flex align-items-center justify-content-center shadow-sm icon-btn" onClick={() => setShowColumnMenu((show) => !show)}>
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
                        {column.filterable !== false && column.key !== "actions" && (
                          <div className="input-group input-group-sm">
                            <span className="input-group-text bg-primary text-white border-primary px-2">
                              <Search size={12} />
                            </span>
                            {column.type === "select" ? (
                              <select
                                className="form-select"
                                value={columnFilters[column.key] || ""}
                                onChange={(e) => updateColumnFilter(column.key, e.target.value)}
                                aria-label={`Filter ${column.label}`}
                              >
                                <option value="">All</option>
                                {column.options?.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                className="form-control"
                                value={columnFilters[column.key] || ""}
                                onChange={(e) => updateColumnFilter(column.key, e.target.value)}
                                aria-label={`Filter ${column.label}`}
                                placeholder="Filter..."
                              />
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedRows.map((row, index) => (
                    <tr key={row.id || index}>
                      {visibleTableColumns.map((column) => (
                        <td key={column.key} style={getColumnStyle(column)} className="text-nowrap small">
                          {column.render ? column.render(row) : formatValue(row[column.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {filteredRows.length === 0 && (
                    <tr><td colSpan={columns.length} className="text-center text-muted py-4">{emptyText}</td></tr>
                  )}
                </tbody>
              </table>

              {showColumnMenu && (
                <div className="position-absolute bg-white border rounded-3 shadow-sm p-2 text-start" style={{ width: "200px", top: "36px", right: "8px", zIndex: 20 }}>
                  <button type="button" className="btn btn-light btn-sm w-100 text-start mb-1" onClick={showAllColumns}>
                    Use All Columns
                  </button>
                  <button type="button" className="btn btn-light btn-sm w-100 text-start mb-2" onClick={resetFilters}>
                    Clear All Filters
                  </button>
                  <div className="fw-semibold small border-bottom px-2 pb-1 mb-1">Show / Hide Columns</div>
                  {columns.map((col) => (
                    <label key={col.key} className="d-flex align-items-center gap-2 px-2 py-1 small cursor-pointer">
                      <input type="checkbox" className="form-check-input m-0" checked={visibleColumns[col.key]} onChange={() => toggleColumn(col.key)} />
                      <span>{col.label}</span>
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
                  {[10, 25, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
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
      )}
    </div>
  );
};

export default AccountingPageShell;
