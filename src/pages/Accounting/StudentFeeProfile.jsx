import React, { useState } from "react";
import {
  User,
  IndianRupee,
  CreditCard,
  Calendar,
  CheckCircle,
  AlertCircle,
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
    remarks: "",
  });

  const student = {
    studentId: "STU001",
    name: "Aarav Patil",
    class: "5th",
    section: "A",
    plan: "4 Installments",
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
      status: "Paid",
    },
    {
      id: 2,
      installment: "2nd Installment",
      dueDate: "15/08/2024",
      amount: 5000,
      paidAmount: 5000,
      paymentDate: "12/08/2024",
      status: "Paid",
    },
    {
      id: 3,
      installment: "3rd Installment",
      dueDate: "15/10/2024",
      amount: 5000,
      paidAmount: 0,
      paymentDate: "-",
      status: "Pending",
    },
    {
      id: 4,
      installment: "4th Installment",
      dueDate: "15/12/2024",
      amount: 5000,
      paidAmount: 0,
      paymentDate: "-",
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

  const pendingFee = feeDetails.reduce(
    (sum, item) => sum + item.pending,
    0
  );

  const handleCollectPayment = () => {
    if (!selectedInstallment) return;

    const updated = installments.map((item) => {
      if (item.id === selectedInstallment.id) {
        return {
          ...item,
          paidAmount: Number(paymentForm.amount),
          paymentDate: paymentForm.paymentDate,
          status: "Paid",
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
    <div className="container-fluid p-4 bg-light min-vh-100">
      {/* Header */}

      <div className="mb-4">
        <h3 className="fw-bold text-primary">
          Student Fee Profile
        </h3>
      </div>

      {/* Profile Card */}

      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={student.photo}
                  alt=""
                  className="rounded-circle"
                  width="70"
                  height="70"
                />

                <div>
                  <h5 className="fw-bold mb-1">
                    {student.name}
                  </h5>

                  <small className="d-block">
                    Student ID :
                    {" "}
                    {student.studentId}
                  </small>

                  <small className="d-block">
                    Class :
                    {" "}
                    {student.class}
                  </small>

                  <small className="d-block">
                    Section :
                    {" "}
                    {student.section}
                  </small>

                  <small className="d-block">
                    Installment Plan :
                    {" "}
                    {student.plan}
                  </small>
                </div>
              </div>
            </div>

            <div className="col-lg-2 text-center">
              <IndianRupee
                size={22}
                className="text-primary mb-2"
              />
              <div className="small text-muted">
                Total Fee
              </div>
              <h5 className="fw-bold">
                ₹{totalFee.toLocaleString()}
              </h5>
            </div>

            <div className="col-lg-2 text-center">
              <CheckCircle
                size={22}
                className="text-success mb-2"
              />
              <div className="small text-muted">
                Paid Amount
              </div>
              <h5 className="fw-bold text-success">
                ₹{paidFee.toLocaleString()}
              </h5>
            </div>

            <div className="col-lg-2 text-center">
              <AlertCircle
                size={22}
                className="text-danger mb-2"
              />
              <div className="small text-muted">
                Pending Amount
              </div>
              <h5 className="fw-bold text-danger">
                ₹{pendingFee.toLocaleString()}
              </h5>
            </div>

            <div className="col-lg-2 text-center">
              <CreditCard
                size={22}
                className="text-warning mb-2"
              />
              <div className="small text-muted">
                Fee Status
              </div>

              <span className="badge bg-warning text-dark px-3 py-2">
                Partial
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}

      <div className="card border-0 shadow-sm rounded-4">
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
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Installment</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Paid Amount</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                    <th width="180">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {installments.map((item) => (
                    <tr key={item.id}>
                      <td>{item.installment}</td>

                      <td>{item.dueDate}</td>

                      <td>
                        ₹
                        {item.amount.toLocaleString()}
                      </td>

                      <td>
                        ₹
                        {item.paidAmount.toLocaleString()}
                      </td>

                      <td>{item.paymentDate}</td>

                      <td>
                        {item.status === "Paid" ? (
                          <span className="badge bg-success">
                            Paid
                          </span>
                        ) : (
                          <span className="badge bg-danger">
                            Pending
                          </span>
                        )}
                      </td>

                      <td>
                        {item.status ===
                          "Pending" && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              setSelectedInstallment(
                                item
                              );

                              setPaymentForm({
                                ...paymentForm,
                                amount:
                                  item.amount,
                              });

                              setShowModal(
                                true
                              );
                            }}
                          >
                            Collect Payment
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Fee Details */}

          {activeTab === "feeDetails" && (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Fee Component</th>
                    <th>Total Fee</th>
                    <th>Paid</th>
                    <th>Pending</th>
                  </tr>
                </thead>

                <tbody>
                  {feeDetails.map(
                    (fee, index) => (
                      <tr key={index}>
                        <td>
                          {fee.feeType}
                        </td>

                        <td>
                          ₹
                          {fee.total.toLocaleString()}
                        </td>

                        <td className="text-success fw-semibold">
                          ₹
                          {fee.paid.toLocaleString()}
                        </td>

                        <td className="text-danger fw-semibold">
                          ₹
                          {fee.pending.toLocaleString()}
                        </td>
                      </tr>
                    )
                  )}

                  <tr className="table-light fw-bold">
                    <td>Total</td>

                    <td>
                      ₹
                      {totalFee.toLocaleString()}
                    </td>

                    <td className="text-success">
                      ₹
                      {paidFee.toLocaleString()}
                    </td>

                    <td className="text-danger">
                      ₹
                      {pendingFee.toLocaleString()}
                    </td>
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

                    <div className="col-md-6">
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