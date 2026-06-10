import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AlertCircle, Clock3, Eye, IndianRupee, Users } from "lucide-react";
import AccountingPageShell from "./AccountingPageShell";

const StudentFeesPage = () => {
  const studentData = [
    { id: "STU001", name: "Aarav Patil", className: "5th", installment: "First", totalFee: 15000, paid: 10000, pending: 5000, status: "Partial", year: "2024-25" },
    { id: "STU002", name: "Vedant Kulkarni", className: "6th", installment: "Second", totalFee: 18000, paid: 18000, pending: 0, status: "Paid", year: "2024-25" },
    { id: "STU003", name: "Tanvi Patil", className: "10th", installment: "Third", totalFee: 30000, paid: 12000, pending: 18000, status: "Pending", year: "2024-25" },
  ];

  const actionButtonStyle = { width: "28px", height: "28px", padding: 0, borderRadius: "6px" };
  const money = (value) => `Rs. ${value.toLocaleString("en-IN")}`;
  const statusBadge = (status) => {
    const className = status === "Paid" ? "bg-success" : status === "Pending" ? "bg-danger" : "bg-warning text-dark";
    return <span className={`badge ${className}`}>{status}</span>;
  };

  const columns = [
    { key: "id", label: "Student ID" },
    { key: "name", label: "Student Name" },
    { key: "className", label: "Class" },
    { key: "installment", label: "Installment" },
    { key: "totalFee", label: "Total Fee", render: (row) => money(row.totalFee) },
    { key: "paid", label: "Paid", render: (row) => <span className="text-success fw-semibold">{money(row.paid)}</span> },
    { key: "pending", label: "Pending", render: (row) => <span className="text-danger fw-semibold">{money(row.pending)}</span> },
    { key: "status", label: "Status", render: (row) => statusBadge(row.status) },
    {
      key: "actions",
      label: "Action",
      render: (row) => (
        <button className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center" style={actionButtonStyle} title={`View ${row.name}`} aria-label={`View ${row.name}`}>
          <Eye size={15} />
        </button>
      ),
    },
  ];

  return (
    <AccountingPageShell
      title="All Student Fees"
      breadcrumb="Student Fees"
      sectionLabel="Fee Summary"
      summaryCards={[
        { title: "Total Students", value: "450", note: "Active", icon: Users, color: "#2563eb", background: "#eff6ff" },
        { title: "Total Collection", value: "Rs. 18.5L", note: "Received", icon: IndianRupee, color: "#16a34a", background: "#f0fdf4" },
        { title: "Total Pending", value: "Rs. 4.2L", note: "Outstanding", icon: AlertCircle, color: "#ea580c", background: "#fff7ed" },
        { title: "Overdue", value: "Rs. 1.3L", note: "Past due", icon: Clock3, color: "#dc2626", background: "#fef2f2" },
      ]}
      filters={[
        { key: "year", label: "Academic Year", options: ["2024-25", "2025-26"], defaultValue: "2024-25" },
        { key: "className", label: "Class", options: ["5th", "6th", "7th", "8th", "9th", "10th"] },
        { key: "installment", label: "Installment", options: ["First", "Second", "Third", "Fourth"] },
        { key: "status", label: "Status", options: ["Paid", "Partial", "Pending"] },
      ]}
      tableTitle="Student Fee Records"
      columns={columns}
      rows={studentData}
    />
  );
};

export default StudentFeesPage;
