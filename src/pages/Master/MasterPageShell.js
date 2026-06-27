import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CheckCircle2,
  LayoutDashboard,
  Plus,
  RotateCcw,
  Save,
  Search,
  X,
} from "lucide-react";

function MasterPageShell({
  title,
  entityName,
  columns,
  rows,
  filters,
  setFilters,
  showForm,
  setShowForm,
  formData,
  setFormData,
  initialForm,
  nameField,
  nameLabel,
  onSave,
}) {
  const [localSearch, setLocalSearch] = useState("");

  const filteredRows = rows.filter((row) => {
    const search = localSearch.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return columns.some((column) => String(row[column.field] || "").toLowerCase().includes(search));
  });

  const updateForm = (key, value) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setLocalSearch("");
    setFilters(columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {}));
  };

  return (
    <div className="master-page">
      <style>{`
        .master-page { padding: 14px 16px 20px; font-size: 0.86rem; color: #1f2937; }
        .master-page .page-header { margin-bottom: 12px; }
        .master-page .page-title { color: #0f172a; font-size: 1.35rem; letter-spacing: 0; }
        .master-page .breadcrumb-lite { color: #64748b; }
        .master-page .section-label { color: #334155; font-size: 0.78rem; font-weight: 800; letter-spacing: 0; text-transform: uppercase; margin-bottom: 8px; }
        .master-page .summary-grid { display: grid; grid-template-columns: repeat(3, minmax(150px, 1fr)); gap: 10px; margin-bottom: 12px; }
        .master-page .summary-card, .master-page .filter-card, .master-page .table-card, .master-page .form-card { background: #fff; border: 1px solid #e6ebf2; border-radius: 8px; box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04); }
        .master-page .summary-card { min-height: 74px; padding: 12px; display: flex; align-items: center; gap: 10px; }
        .master-page .summary-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .master-page .summary-value { margin: 0; font-size: 1.2rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .master-page .summary-title { color: #64748b; font-size: 0.76rem; font-weight: 600; white-space: nowrap; }
        .master-page .summary-note { color: #64748b; font-size: 0.72rem; font-weight: 600; }
        .master-page .filter-card, .master-page .form-card { margin-bottom: 10px; }
        .master-page .filter-card .card-body, .master-page .table-card .card-body, .master-page .form-card .card-body { padding: 10px 12px !important; }
        .master-page .card-heading { color: #0f172a; font-size: 0.84rem; font-weight: 800; margin: 0; }
        .master-page .filter-actions .btn, .master-page .icon-btn { width: 31px; height: 31px; padding: 0; border-radius: 7px; }
        .master-page .table-shell { border: 1px solid #e6ebf2; border-radius: 8px; overflow: auto; }
        .master-page .dashboard-table th, .master-page .dashboard-table td { overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }
        .master-page .dashboard-table thead th { background: #f8fafc; color: #0f172a; border-bottom: 1px solid #dbe3ee; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0; }
        .master-page .dashboard-table tbody td { color: #1f2937; border-bottom-color: #edf2f7; }
        .master-page .dashboard-table tbody tr:hover td { background: #f8fbff; }
        .master-page .badge { border-radius: 999px; padding: 0.35em 0.65em; font-weight: 700; }
        @media (max-width: 992px) { .master-page .summary-grid { grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); } }
        @media (max-width: 768px) { .master-page .breadcrumb-lite { display: none !important; } }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <h3 className="page-title fw-bold mb-0">{title}</h3>
        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
          <span>/</span>
          <span>Master</span>
          <span>/</span>
          <span>{entityName}</span>
        </div>
      </div>

      <p className="section-label">Master Summary</p>
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-icon" style={{ color: "#2563eb", background: "#eff6ff" }}>
            <LayoutDashboard size={21} />
          </div>
          <div className="min-w-0">
            <p className="summary-value">{rows.length}</p>
            <div className="summary-title text-truncate">Total Records</div>
            <div className="summary-note text-truncate">{entityName} master data</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon" style={{ color: "#16a34a", background: "#f0fdf4" }}>
            <CheckCircle2 size={21} />
          </div>
          <div className="min-w-0">
            <p className="summary-value">{rows.filter((row) => row.Status === "Active").length}</p>
            <div className="summary-title text-truncate">Active</div>
            <div className="summary-note text-truncate">Available for use</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon" style={{ color: "#ea580c", background: "#fff7ed" }}>
            <Search size={21} />
          </div>
          <div className="min-w-0">
            <p className="summary-value">{filteredRows.length}</p>
            <div className="summary-title text-truncate">Visible Records</div>
            <div className="summary-note text-truncate">After filters</div>
          </div>
        </div>
      </div>

      <h5 className="section-label">Filter</h5>
      <div className="filter-card">
        <div className="card-body">
          <div className="d-flex align-items-end gap-2 flex-wrap">
            <div style={{ flex: "1.4 1 220px", minWidth: "200px" }}>
              <label className="form-label small mb-1">Search</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-primary text-white border-primary px-2">
                  <Search size={12} />
                </span>
                <input
                  className="form-control"
                  placeholder={`Search ${entityName.toLowerCase()}`}
                  value={localSearch}
                  onChange={(event) => setLocalSearch(event.target.value)}
                />
              </div>
            </div>
            {columns.map((column) => (
              <div key={column.field} style={{ flex: "1 1 170px", minWidth: "150px" }}>
                <label className="form-label small mb-1">{column.header}</label>
                <input
                  className="form-control form-control-sm"
                  value={filters[column.field] || ""}
                  onChange={(event) => setFilters({ ...filters, [column.field]: event.target.value })}
                />
              </div>
            ))}
            <div className="filter-actions d-flex align-items-end gap-2" style={{ flex: "0 0 72px" }}>
              <button className="btn btn-primary d-flex align-items-center justify-content-center" aria-label="Search" title="Search">
                <Search size={16} />
              </button>
              <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" aria-label="Reset" title="Reset" onClick={resetFilters}>
                <RotateCcw size={16} />
              </button>
            </div>
            <div className="ms-auto">
              <button className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1" onClick={() => setShowForm(true)}>
                <Plus size={15} />
                New {entityName}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="form-card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p className="card-heading">Create {entityName}</p>
              <button className="btn btn-outline-secondary btn-sm icon-btn d-flex align-items-center justify-content-center" onClick={() => setShowForm(false)} aria-label="Close" title="Close">
                <X size={16} />
              </button>
            </div>
            <div className="d-flex align-items-end gap-2 flex-wrap">
              <div style={{ flex: "1 1 260px", minWidth: "220px" }}>
                <label className="form-label small mb-1">{nameLabel}</label>
                <input className="form-control form-control-sm" name={nameField} value={formData[nameField]} onChange={(event) => updateForm(nameField, event.target.value)} />
              </div>
              <div style={{ flex: "0 1 180px", minWidth: "150px" }}>
                <label className="form-label small mb-1">Status</label>
                <select className="form-select form-select-sm" name="Status" value={formData.Status} onChange={(event) => updateForm("Status", event.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Deactive">Deactive</option>
                </select>
              </div>
              <button className="btn btn-success btn-sm d-inline-flex align-items-center gap-1" onClick={onSave}>
                <Save size={15} />
                Save
              </button>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => { setShowForm(false); setFormData(initialForm); }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="table-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
            <p className="card-heading">{entityName} Records</p>
            <span className="badge bg-primary-subtle text-primary">{filteredRows.length} Records</span>
          </div>
          <div className="table-shell">
            <table className="table table-sm table-striped align-middle dashboard-table mb-0">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.field}>{column.header}</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td key={column.field}>
                        {column.field === "Status" ? (
                          <span className={`badge ${row[column.field] === "Active" ? "bg-success" : "bg-secondary"}`}>
                            {row[column.field]}
                          </span>
                        ) : (
                          row[column.field]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="text-center text-muted py-4">
                      No {entityName.toLowerCase()} records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterPageShell;
