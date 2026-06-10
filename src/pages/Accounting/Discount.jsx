import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BadgePercent, IndianRupee, Pencil, Plus, School, Tags, Trash2 } from "lucide-react";
import AccountingPageShell from "./AccountingPageShell";

const Discount = () => {
  const discountData = [
    { name: "Sibling Discount", type: "Percentage", applicable: "All Classes", value: "10%", on: "Tuition Fee", status: "Active" },
    { name: "Merit Scholarship", type: "Percentage", applicable: "Class 5 to 10", value: "20%", on: "Tuition Fee", status: "Active" },
    { name: "Transport Discount", type: "Fixed", applicable: "All Classes", value: "Rs. 500", on: "Transport Fee", status: "Active" },
    { name: "Staff Child Discount", type: "Percentage", applicable: "All Classes", value: "50%", on: "Tuition Fee", status: "Inactive" },
  ];

  const actionButtonStyle = { width: "28px", height: "28px", padding: 0, borderRadius: "6px" };
  const columns = [
    { key: "name", label: "Discount Name" },
    { key: "type", label: "Type", render: (row) => <span className="badge bg-info-subtle text-info">{row.type}</span> },
    { key: "applicable", label: "Applicable To" },
    { key: "value", label: "Value" },
    { key: "on", label: "Applicable On" },
    { key: "status", label: "Status", render: (row) => <span className={`badge ${row.status === "Active" ? "bg-success" : "bg-secondary"}`}>{row.status}</span> },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center" style={actionButtonStyle} title={`Edit ${row.name}`} aria-label={`Edit ${row.name}`}>
            <Pencil size={15} />
          </button>
          <button className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center" style={actionButtonStyle} title={`Delete ${row.name}`} aria-label={`Delete ${row.name}`}>
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AccountingPageShell
      title="Discounts & Concessions"
      breadcrumb="Discounts"
      sectionLabel="Discount Summary"
      summaryCards={[
        { title: "Total Discounts", value: "4", note: "Configured", icon: Tags, color: "#2563eb", background: "#eff6ff" },
        { title: "Percentage Rules", value: "3", note: "Tuition linked", icon: BadgePercent, color: "#16a34a", background: "#f0fdf4" },
        { title: "Fixed Rules", value: "1", note: "Transport linked", icon: IndianRupee, color: "#ea580c", background: "#fff7ed" },
        { title: "Class Coverage", value: "6", note: "Standards", icon: School, color: "#7c3aed", background: "#f5f3ff" },
      ]}
      filters={[
        { key: "type", label: "Type", options: ["Percentage", "Fixed"] },
        { key: "status", label: "Status", options: ["Active", "Inactive"] },
      ]}
      primaryAction={{ label: "Add Discount" }}
      tableTitle="Discount Rules"
      columns={columns}
      rows={discountData}
    />
  );
};

export default Discount;
