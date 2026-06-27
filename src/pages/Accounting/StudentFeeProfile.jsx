import React, { useState } from "react";
import {
  User,
  IndianRupee,
  CreditCard,
  Calendar,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentFeeProfile = () => {
  const [activeTab, setActiveTab] = useState("installments");

  const [showModal, setShowModal] = useState(false);

  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const [paymentForm, setPaymentForm] = useState({
    paymentDate: "",
    paymentMode: "",
    amount: "",
    transactionNo: "",
    remarks: "",
  });

  const student = {
    studentId: "STU001",
    name: "Aarav Patil",
    className: "5-A",
    class: "5th",
    section: "A",
    plan: "4 Installments",
    admissionNo: "STU1001",
    rollNo: "15",
    fatherName: "Rajesh Patil",
    motherName: "Pooja Patil",
    dob: "12 May 2013",
    mobile: "9876543210",
    email: "aarav.patil@email.com",
    admissionDate: "01 Apr 2024",
    category: "General",
    status: "Active",
    photo: "https://i.pravatar.cc/100?img=12",
  };

  const [installments, setInstallments] = useState([
    {
      id: 1,
      installment: "1st Installment",
      dueDate: "15/06/2024",
      amount: 5000,
      paidAmount: 5000,
      paymentDate: "10/06/2024",
      paymentMode: "UPI",
      transactionNo: "TXN1001",
      remarks: "Full payment",
      status: "Paid",
    },
    {
      id: 2,
      installment: "2nd Installment",
      dueDate: "15/08/2024",
      amount: 5000,
      paidAmount: 5000,
      paymentDate: "12/08/2024",
      paymentMode: "Cash",
      transactionNo: "TXN1002",
      remarks: "Paid at office",
      status: "Paid",
    },
    {
      id: 3,
      installment: "3rd Installment",
      dueDate: "15/10/2024",
      amount: 5000,
      paidAmount: 0,
      paymentDate: "-",
      paymentMode: "",
      transactionNo: "",
      remarks: "",
      status: "Pending",
    },
    {
      id: 4,
      installment: "4th Installment",
      dueDate: "15/12/2024",
      amount: 5000,
      paidAmount: 0,
      paymentDate: "-",
      paymentMode: "",
      transactionNo: "",
      remarks: "",
      status: "Pending",
    },
  ]);

  const feeDetails = [
    {
      feeType: "Admission Fee",
      total: 5000,
      paid: 5000,
      pending: 0,
    },
    {
      feeType: "Tuition Fee",
      total: 30000,
      paid: 15000,
      pending: 15000,
    },
    {
      feeType: "Development Fee",
      total: 5000,
      paid: 3000,
      pending: 2000,
    },
    {
      feeType: "Library Fee",
      total: 2000,
      paid: 1000,
      pending: 1000,
    },
    {
      feeType: "Exam Fee",
      total: 3000,
      paid: 1000,
      pending: 2000,
    },
  ];

  const totalFee = feeDetails.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const paidFee = feeDetails.reduce(
    (sum, item) => sum + item.paid,
    0
  );

  const actionButtonStyle = {
    width: "28px",
    height: "28px",
    padding: 0,
    borderRadius: "6px",
  };

  const pendingFee = feeDetails.reduce(
    (sum, item) => sum + item.pending,
    0
  );

  const handleCollectPayment = () => {
    if (!selectedInstallment) return;

    const toDisplay = (d) => {
      if (!d) return "-";
      if (d.includes("-")) {
        // yyyy-mm-dd -> dd/mm/yyyy
        const parts = d.split("-");
        if (parts.length === 3) {
          const [yyyy, mm, dd] = parts;
          return `${dd}/${mm}/${yyyy}`;
        }
      }
      return d;
    };

    const updated = installments.map((item) => {
      if (item.id === selectedInstallment.id) {
        return {
          ...item,
          paidAmount: Number(paymentForm.amount),
          paymentDate: toDisplay(paymentForm.paymentDate),
          paymentMode: paymentForm.paymentMode || item.paymentMode || "",
          transactionNo: paymentForm.transactionNo || item.transactionNo || "",
          remarks: paymentForm.remarks || item.remarks || "",
          status: Number(paymentForm.amount) >= item.amount ? "Paid" : "Partial",
        };
      }

      return item;
    });

    setInstallments(updated);

    setShowModal(false);

    setPaymentForm({
      paymentDate: "",
      paymentMode: "",
      amount: "",
      remarks: "",
    });
  };

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

        .document-page .profile-card,
        .document-page .filter-card,
        .document-page .grid-card {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .document-page .profile-card .card-body,
        .document-page .filter-card .card-body,
        .document-page .grid-card .card-body {
          padding: 10px 12px !important;
        }

        .document-page .summary-card {
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

        .document-page .summary-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .document-page .summary-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(150px, 1fr));
          gap: 10px;
          margin-bottom: 10px;
        }

        .document-page .summary-value {
          margin: 0;
          font-size: 1.1rem;
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

        .document-page .student-photo {
          width: 92px;
          height: 92px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #dbe3ee;
        }

        .document-page .info-label {
          color: #64748b;
          font-size: 0.74rem;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .document-page .info-value {
          color: #0f172a;
          font-size: 0.84rem;
          font-weight: 700;
          margin-bottom: 9px;
        }

        .document-page .table-shell {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          overflow: auto;
        }

        .document-page .document-table {
          min-width: 980px;
          table-layout: fixed;
        }

        .document-page .document-table th,
        .document-page .document-table td {
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }

        .document-page .document-table thead th {
          background: #f8fafc;
          color: #0f172a;
          border-bottom: 1px solid #dbe3ee;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0;
        }

        .document-page .document-table tbody td {
          color: #1f2937;
          border-bottom-color: #edf2f7;
        }

        .document-page .document-table tbody tr:hover td,
        .document-page .document-table tbody tr.active-row td {
          background: #f8fbff;
        }

        @media (max-width: 768px) {
          .document-page .breadcrumb-lite {
            display: none !important;
          }
        }
      `}</style>

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <div>
          <h3 className="page-title fw-bold mb-0">Student Fee Profile</h3>
        </div>

        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <span>Dashboard</span>
          <span>/</span>
          <span>Accounting</span>
          <span>/</span>
          <span>Fee Profile</span>
        </div>
      </div>

      {/* Document Statistics (fee summary) */}

      {(() => {
        const installmentsPaid = installments.filter((it) => it.status === "Paid").length;
        const completion = totalFee ? Math.round((paidFee / totalFee) * 100) : 0;

        const summaryCards = [
          {
            title: "Total Fee",
            value: `₹${totalFee.toLocaleString()}`,
            icon: IndianRupee,
            color: "#2563eb",
            background: "#eff6ff",
          },
          {
            title: "Paid",
            value: `₹${paidFee.toLocaleString()}`,
            icon: CheckCircle,
            color: "#16a34a",
            background: "#f0fdf4",
          },
          {
            title: "Pending",
            value: `₹${pendingFee.toLocaleString()}`,
            icon: AlertCircle,
            color: "#dc2626",
            background: "#fef2f2",
          },
          {
            title: "Installments Paid",
            value: installmentsPaid,
            icon: CreditCard,
            color: "#ea580c",
            background: "#fff7ed",
          },
          {
            title: "Completion",
            value: `${completion}%`,
            icon: Calendar,
            color: "#7c3aed",
            background: "#f5f3ff",
          },
        ];

        return (
          <div>
            <h5 className="section-label">Fee Statistics</h5>

            <div className="summary-grid mb-2" style={{ gridTemplateColumns: 'repeat(5, minmax(150px, 1fr))', gap: 10 }}>
              {summaryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div className="summary-card" key={card.title}>
                    <div className="summary-icon" style={{ background: card.background, color: card.color }}>
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="summary-value mb-0">{card.value}</p>
                      <div className="summary-title text-truncate">{card.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="profile-card mb-2">
              <div className="card-body">
                <div className="d-flex gap-3 align-items-start flex-wrap">
                  <img src={student.photo} alt={student.name} className="student-photo" />
                  <div className="flex-grow-1 min-w-0">
                    <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap mb-2">
                      <div>
                        <h5 className="fw-bold mb-1">{student.name}</h5>
                        <div className="text-muted small">{student.admissionNo} | Roll No: {student.rollNo}</div>
                      </div>
                      <span className={`badge ${pendingFee > 0 ? 'bg-warning text-dark' : 'bg-success'}`}>{pendingFee > 0 ? 'Partial' : 'Paid'}</span>
                    </div>

                    <div className="row">
                      {[
                        ["Class", student.className],
                        ["Father Name", student.fatherName],
                        ["Mother Name", student.motherName],
                        ["DOB", student.dob],
                        ["Mobile", student.mobile],
                        ["Email", student.email],
                        ["Admission Date", student.admissionDate],
                        ["Category", student.category],
                      ].map(([label, value]) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={label}>
                          <div className="info-label">{label}</div>
                          <div className="info-value text-truncate">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Tabs */}

      <div className="grid-card mb-2">
        <div className="card-header bg-white border-0">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "installments"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveTab("installments")
                }
              >
                Paid Installments
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "feeDetails"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveTab("feeDetails")
                }
              >
                Fee Details
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {/* Installments Tab */}

          {activeTab === "installments" && (
            <div className="table-shell">
              <table className="table table-sm table-striped align-middle document-table mb-0">
                <thead>
                  <tr>
                    <th style={{ width: '180px' }}>Installment</th>
                    <th style={{ width: '110px' }}>Due Date</th>
                    <th style={{ width: '100px' }}>Amount</th>
                    <th style={{ width: '110px' }}>Paid Amount</th>
                    <th style={{ width: '140px' }}>Payment Date</th>
                    <th style={{ width: '140px' }}>Payment Mode</th>
                    <th style={{ width: '140px' }}>Transaction No</th>
                    <th style={{ width: '220px' }}>Remarks</th>
                    <th style={{ width: '110px' }}>Status</th>
                    <th style={{ width: '120px' }}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {installments.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-semibold text-nowrap">{item.installment}</td>
                        <td className="text-nowrap">{item.dueDate}</td>
                        <td>₹{item.amount.toLocaleString()}</td>
                        <td>₹{item.paidAmount.toLocaleString()}</td>
                        <td>{item.paymentDate}</td>
                        <td className="text-nowrap">{item.paymentMode || "-"}</td>
                        <td className="text-nowrap">{item.transactionNo || "-"}</td>
                        <td className="small text-muted text-truncate">{item.remarks || "-"}</td>
                        <td>{item.status === "Paid" ? <span className="badge bg-success">Paid</span> : <span className="badge bg-warning text-dark">Pending</span>}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success d-inline-flex align-items-center justify-content-center"
                            style={actionButtonStyle}
                            title="Collect Fees"
                            aria-label={`Collect fees for ${item.installment}`}
                            onClick={(event) => {
                              event.stopPropagation();

                              const toISO = (d) => {
                                if (!d) return "";
                                if (d.includes("/")) {
                                  // assume dd/mm/yyyy
                                  const parts = d.split("/");
                                  if (parts.length === 3) {
                                    const [dd, mm, yyyy] = parts;
                                    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
                                  }
                                }
                                if (d.includes("-")) return d;
                                return "";
                              };

                              setSelectedInstallment(item);
                              setPaymentForm({
                                paymentDate: toISO(item.paymentDate && item.paymentDate !== "-" ? item.paymentDate : ""),
                                paymentMode: item.paymentMode || "",
                                amount: item.paidAmount && item.paidAmount > 0 ? item.paidAmount : item.amount,
                                remarks: item.remarks || "",
                              });

                              setShowModal(true);
                            }}
                          >
                            <Upload size={16} />
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                            style={actionButtonStyle}
                            title="Download Receipt"
                            aria-label={`Download receipt for ${item.installment}`}
                            disabled={item.status !== "Paid"}
                            onClick={(event) => {
                              event.stopPropagation();
                              // placeholder: implement receipt download
                              if (item.status === "Paid") {
                                // simulate download action or call API
                                console.log(`download receipt for ${item.id}`);
                              }
                            }}
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Fee Details */}

          {activeTab === "feeDetails" && (
            <div className="table-shell">
              <table className="table table-sm table-striped align-middle document-table mb-0">
                <thead>
                  <tr>
                    <th style={{ width: '320px' }}>Fee Component</th>
                    <th style={{ width: '150px' }}>Total Fee</th>
                    <th style={{ width: '140px' }}>Paid</th>
                    <th style={{ width: '140px' }}>Pending</th>
                  </tr>
                </thead>

                <tbody>
                  {feeDetails.map((fee, index) => (
                    <tr key={index}>
                      <td className="fw-semibold text-nowrap">{fee.feeType}</td>
                      <td>₹{fee.total.toLocaleString()}</td>
                      <td className="text-success fw-semibold">₹{fee.paid.toLocaleString()}</td>
                      <td className="text-danger fw-semibold">₹{fee.pending.toLocaleString()}</td>
                    </tr>
                  ))}

                  <tr className="table-light fw-bold">
                    <td>Total</td>
                    <td>₹{totalFee.toLocaleString()}</td>
                    <td className="text-success">₹{paidFee.toLocaleString()}</td>
                    <td className="text-danger">₹{pendingFee.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
              background:
                "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Collect Payment
                  </h5>

                  <button
                    className="btn-close"
                    onClick={() =>
                      setShowModal(false)
                    }
                  />
                </div>

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label">
                        Student Name
                      </label>

                      <input
                        className="form-control"
                        value={student.name}
                        readOnly
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Student ID
                      </label>

                      <input
                        className="form-control"
                        value={
                          student.studentId
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Class
                      </label>

                      <input
                        className="form-control"
                        value={student.class}
                        readOnly
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Installment
                      </label>

                      <input
                        className="form-control"
                        value={
                          selectedInstallment?.installment
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Due Date
                      </label>

                      <input
                        className="form-control"
                        value={
                          selectedInstallment?.dueDate
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Due Amount
                      </label>

                      <input
                        className="form-control"
                        value={`₹${selectedInstallment?.amount}`}
                        readOnly
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Payment Date
                      </label>

                      <input
                        type="date"
                        className="form-control"
                        value={
                          paymentForm.paymentDate
                        }
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            paymentDate:
                              e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Payment Mode
                      </label>

                      <select
                        className="form-select"
                        value={
                          paymentForm.paymentMode
                        }
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            paymentMode:
                              e.target.value,
                          })
                        }
                      >
                        <option value="">
                          Select
                        </option>

                        <option>
                          Cash
                        </option>

                        <option>
                          UPI
                        </option>

                        <option>
                          Cheque
                        </option>

                        <option>
                          Net Banking
                        </option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Transaction No</label>
                      <input
                        className="form-control"
                        value={paymentForm.transactionNo}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            transactionNo: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        Amount
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        value={
                          paymentForm.amount
                        }
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            amount:
                              e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">
                        Remarks
                      </label>

                      <textarea
                        rows="3"
                        className="form-control"
                        value={
                          paymentForm.remarks
                        }
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            remarks:
                              e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

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
                    onClick={
                      handleCollectPayment
                    }
                  >
                    Collect Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentFeeProfile;