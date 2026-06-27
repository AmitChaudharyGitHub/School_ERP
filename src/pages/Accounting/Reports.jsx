import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BarChart3, FileText, IndianRupee, ListChecks, PieChart, Users } from "lucide-react";
import AccountingPageShell from "./AccountingPageShell";

const Reports = () => {
  const reports = [
    {
      title: "Fee Collection Report",
      description: "Daily and monthly fee collection with payment mode breakup.",
      icon: IndianRupee,
      tone: "primary",
    },
    {
      title: "Pending Fees Report",
      description: "Class wise pending amount, overdue dues, and follow-up status.",
      icon: ListChecks,
      tone: "danger",
    },
    {
      title: "Student Ledger Report",
      description: "Student wise fee ledger with installments, concessions, and receipts.",
      icon: Users,
      tone: "success",
    },
    {
      title: "Class Wise Report",
      description: "Standard wise collection, pending fees, and concession summary.",
      icon: BarChart3,
      tone: "warning",
    },
    {
      title: "Concession Report",
      description: "Discounts and scholarships applied across classes and students.",
      icon: PieChart,
      tone: "info",
    },
  ];

  const summaryCards = [
    { title: "Available Reports", value: "5", note: "Accounting", icon: FileText, color: "#2563eb", background: "#eff6ff" },
    { title: "Collection", value: "Rs. 18.5L", note: "This year", icon: IndianRupee, color: "#16a34a", background: "#f0fdf4" },
    { title: "Pending", value: "Rs. 4.2L", note: "Open dues", icon: ListChecks, color: "#ea580c", background: "#fff7ed" },
    { title: "Students", value: "450", note: "Ledger records", icon: Users, color: "#7c3aed", background: "#f5f3ff" },
    { title: "Classes", value: "6", note: "Fee groups", icon: BarChart3, color: "#0891b2", background: "#ecfeff" },
  ];

  return (
    <AccountingPageShell
      title="Reports"
      breadcrumb="Reports"
      sectionLabel="Report Summary"
      summaryCards={summaryCards}
    >
      <div className="table-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-2 mb-2 flex-wrap">
            <p className="card-heading">Accounting Reports</p>
            <span className="badge bg-primary-subtle text-primary">{reports.length} Reports</span>
          </div>

          <div className="report-grid">
            {reports.map((report) => {
              const Icon = report.icon;

              return (
                <div className="report-card" key={report.title}>
                  <div className={`report-icon text-${report.tone} bg-${report.tone}-subtle`}>
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0 flex-grow-1">
                    <h6 className="fw-bold mb-1 text-truncate">{report.title}</h6>
                    <p className="text-muted small mb-2">{report.description}</p>
                    <button className={`btn btn-${report.tone} btn-sm w-100`}>
                      Generate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AccountingPageShell>
  );
};

export default Reports;
