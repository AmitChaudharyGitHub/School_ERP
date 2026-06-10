import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IndianRupee, Layers, Pencil, Plus, School, Trash2, WalletCards } from "lucide-react";
import AccountingPageShell from "./AccountingPageShell";

const money = (value) => `Rs. ${value.toLocaleString("en-IN")}`;

const FeeInstallment = () => {
  const standards = ["5th Standard", "6th Standard", "7th Standard", "8th Standard", "9th Standard", "10th Standard"];
  const [selectedStandard, setSelectedStandard] = useState("5th Standard");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const planData = {
    "5th Standard": [
      { id: 1, planName: "Full Payment", installments: 1, amount: 30000, extraCharge: 0, totalPayable: 30000, dueDate: "15-Jun-2025", status: "Active" },
      { id: 2, planName: "2 Installments", installments: 2, amount: 30000, extraCharge: 600, totalPayable: 30600, dueDate: "15-Jun-2025, 15-Sep-2025", status: "Active" },
      { id: 3, planName: "3 Installments", installments: 3, amount: 30000, extraCharge: 1500, totalPayable: 31500, dueDate: "15-Jun-2025, 15-Aug-2025, 15-Oct-2025", status: "Active" },
    ],
    "6th Standard": [
      { id: 1, planName: "Full Payment", installments: 1, amount: 40000, extraCharge: 0, totalPayable: 40000, dueDate: "15-Jun-2025", status: "Active" },
    ],
    "7th Standard": [],
    "8th Standard": [],
    "9th Standard": [],
    "10th Standard": [],
  };

  const activePlans = planData[selectedStandard] || [];
  const actionButtonStyle = { width: "28px", height: "28px", padding: 0, borderRadius: "6px" };

  return (
    <AccountingPageShell
      title="Student Installment Plans"
      breadcrumb="Fee Installments"
      sectionLabel="Installment Summary"
      summaryCards={[
        { title: "Total Standards", value: "6", note: "Class 5-10", icon: School, color: "#2563eb", background: "#eff6ff" },
        { title: "Active Plans", value: "24", note: "Configured", icon: Layers, color: "#16a34a", background: "#f0fdf4" },
        { title: "Options", value: "4", note: "Payment cycles", icon: WalletCards, color: "#ea580c", background: "#fff7ed" },
        { title: "Fee Range", value: "Rs. 30K-1L", note: "Annual", icon: IndianRupee, color: "#7c3aed", background: "#f5f3ff" },
      ]}
      primaryAction={{ label: "Add New Plan" }}
    >
      <div className="table-card mb-2">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-2 mb-2 flex-wrap">
            <p className="card-heading">Standard</p>
            <button className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1">
              <Plus size={15} />
              Add Plan
            </button>
          </div>
          <div className="nav nav-pills gap-2 flex-wrap">
            {standards.map((item) => (
              <button key={item} className={`nav-link small ${selectedStandard === item ? "active" : ""}`} onClick={() => setSelectedStandard(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-card mb-2">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
            <p className="card-heading">Installment Plans - {selectedStandard}</p>
            <span className="badge bg-primary-subtle text-primary">{activePlans.length} Records</span>
          </div>
          <div className="table-shell">
            <table className="table table-sm table-striped align-middle dashboard-table mb-0">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Installments</th>
                  <th>Total Amount</th>
                  <th>Extra Charges</th>
                  <th>Total Payable</th>
                  <th>Per Installment</th>
                  <th>Due Dates</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activePlans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="fw-semibold">{plan.planName}</td>
                    <td>{plan.installments}</td>
                    <td>{money(plan.amount)}</td>
                    <td>{money(plan.extraCharge)}</td>
                    <td className="fw-bold">{money(plan.totalPayable)}</td>
                    <td className="text-primary fw-semibold">{money(Math.round(plan.totalPayable / plan.installments))}</td>
                    <td>{plan.dueDate}</td>
                    <td><span className="badge bg-success">{plan.status}</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center" style={actionButtonStyle} title="Edit plan" aria-label={`Edit ${plan.planName}`} onClick={() => { setSelectedPlan(plan); setShowModal(true); }}>
                          <Pencil size={15} />
                        </button>
                        <button className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center" style={actionButtonStyle} title="Delete plan" aria-label={`Delete ${plan.planName}`}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {activePlans.length === 0 && (
                  <tr><td colSpan="9" className="text-center text-muted py-4">No plans found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="card-body">
          <p className="card-heading mb-2">Installment Summary Preview - {selectedStandard}</p>
          <div className="table-shell">
            <table className="table table-sm table-striped align-middle dashboard-table mb-0">
              <thead>
                <tr><th>Detail</th><th>1 Installment</th><th>2 Installments</th><th>3 Installments</th><th>4 Installments</th></tr>
              </thead>
              <tbody>
                <tr><td className="fw-semibold">Due Dates</td><td>15-Jun</td><td>15-Jun, 15-Sep</td><td>15-Jun, 15-Aug, 15-Oct</td><td>15-Jun, 15-Jul, 15-Aug, 15-Sep</td></tr>
                <tr><td className="fw-semibold">Per Installment</td><td>{money(30000)}</td><td>{money(15300)}</td><td>{money(10500)}</td><td>{money(8000)}</td></tr>
                <tr><td className="fw-semibold">Total Payable</td><td className="fw-bold text-success">{money(30000)}</td><td className="fw-bold text-primary">{money(30600)}</td><td className="fw-bold text-info">{money(31500)}</td><td className="fw-bold text-warning">{money(32000)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selectedPlan && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(15,23,42,0.45)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="fw-bold mb-0">Edit Installment Plan</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label">Plan Name</label><input className="form-control" defaultValue={selectedPlan.planName} /></div>
                  <div className="col-md-6"><label className="form-label">Installments</label><input className="form-control" defaultValue={selectedPlan.installments} /></div>
                  <div className="col-md-6"><label className="form-label">Total Amount</label><input className="form-control" defaultValue={selectedPlan.amount} /></div>
                  <div className="col-md-6"><label className="form-label">Extra Charges</label><input className="form-control" defaultValue={selectedPlan.extraCharge} /></div>
                  <div className="col-md-6"><label className="form-label">Per Installment Payment</label><input className="form-control" value={(selectedPlan.totalPayable / selectedPlan.installments).toFixed(2)} readOnly /></div>
                  <div className="col-12"><label className="form-label">Due Dates</label><textarea rows="3" className="form-control" defaultValue={selectedPlan.dueDate} /></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AccountingPageShell>
  );
};

export default FeeInstallment;
