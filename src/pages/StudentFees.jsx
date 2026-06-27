import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentFees() {

    const [studentData, setStudentData] = useState({});
    const [feeDetails, setFeeDetails] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const { studentId } = useParams();
    // Summary Cards
    const [summary, setSummary] = useState({
        totalFees: 12000,
        totalPaid: 7000,
        totalPending: 5000,
        lastPaymentDate: "01 May 2026"
    });

    // Grid Columns
    const columns = [
        { field: "MonthName", header: "Month" },
        { field: "YearName", header: "Year" },
        { field: "FeeAmount", header: "Fee Amount" },
        { field: "PaidAmount", header: "Paid Amount" },
        { field: "DueAmount", header: "Due Amount" },
        { field: "PaymentDate", header: "Payment Date" },
        { field: "PaymentMode", header: "Payment Mode" },
        { field: "Status", header: "Status" }
    ];

    // Filters
    const [filters, setFilters] = useState({
        StudentID: studentId,
        MonthName: "",
        YearName: "",
        FeeAmount: "",
        PaidAmount: "",
        DueAmount: "",
        PaymentDate: "",
        PaymentMode: "",
        Status: ""
    });

    // Payment Form
    const initialPaymentForm = {
        StudentID: studentId,
        MonthName: "",
        YearName: "2026",
        FeeAmount: "",
        PaidAmount: "",
        PaymentDate: "",
        PaymentMode: "Cash",
        Remark: ""
    };

    const [paymentForm, setPaymentForm] = useState(initialPaymentForm);

    const handleChange = (e) => {
        setPaymentForm({
            ...paymentForm,
            [e.target.name]: e.target.value
        });
    };

    // Get Student Profile
    useEffect(() => {

        fetch(`https://localhost:44377/api/student/GetStudentProfileByStudentID/${studentId}`)
            .then((res) => res.json())
            .then((data) => {
                setStudentData(data[0]);
            });


        fetch("https://localhost:44377/api/StudentFee/GetAllStudentFees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filters)
        })
            .then((res) => res.json())
            .then((data) => {
                setFeeDetails(data);
            });




    }, [filters, studentId]);

    // Save Payment
    const handleSavePayment = () => {

        fetch("https://localhost:44377/api/StudentFee/saveStudentFees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentForm)
        })
            .then((res) => res.json())
            .then(() => {

                setShowPaymentModal(false);

                setPaymentForm(initialPaymentForm);

                setFilters({ ...filters });

            });

    };

    // Delete
    const handleDelete = (id) => {

        fetch(`https://localhost:44377/api/StudentFee/deleteFees/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then(() => {
                setFilters({ ...filters });
            });

    };

    // Edit
    const handleEdit = (item) => {

        setPaymentForm(item);

        setShowPaymentModal(true);

    };

    return (

        <div className="container-fluid mt-4">

            {/* Header */}
            <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
                <div>
                    <h3 className="page-title fw-bold mb-0">Student Fees</h3>
                    <div className="breadcrumb-lite d-flex align-items-center gap-2 small mt-1">
                        <span>Dashboard</span><span>/</span><span>Student Profile</span><span>/</span><span>Fees</span>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">

                    <i className="bi bi-bell fs-5"></i>

                    <div className="d-flex align-items-center gap-2">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt=""
                            className="rounded-circle"
                            width="35"
                            height="35"
                        />

                        <span className="fw-semibold">Admin</span>
                    </div>

                </div>
            </div>

            {/* Student Profile Card */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">

                <div className="card-body p-4">

                    <div className="row align-items-center">

                        <div className="col-md-1 text-center">

                            <img
                                src="https://i.pravatar.cc/100"
                                alt=""
                                className="rounded-circle border"
                                width="80"
                                height="80"
                            />

                        </div>

                        <div className="col-md-11">

                            <div className="d-flex align-items-center gap-3 mb-3">

                                <h4 className="fw-bold mb-0">
                                    {studentData.StudentName}
                                </h4>

                                <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                                    Active
                                </span>

                            </div>

                            <div className="row">

                                <div className="col-md-4">

                                    <p className="mb-2">
                                        <strong>Father Name :</strong> {studentData.FatherName}
                                    </p>

                                    <p className="mb-2">
                                        <strong>Mother Name :</strong> {studentData.MotherName}
                                    </p>

                                    <p className="mb-0">
                                        <strong>Mobile :</strong> {studentData.Mobile}
                                    </p>

                                </div>

                                <div className="col-md-4">

                                    <p className="mb-2">
                                        <strong>Standard :</strong> {studentData.StandardName}
                                    </p>

                                    <p className="mb-2">
                                        <strong>School :</strong> {studentData.SchoolName}
                                    </p>

                                    <p className="mb-0">
                                        <strong>Admission Date :</strong> 09 May 2026
                                    </p>

                                </div>

                                <div className="col-md-4">

                                    <p className="mb-2">
                                        <strong>Inquiry Date :</strong> 09 May 2026
                                    </p>

                                    <p className="mb-0">
                                        <strong>Student ID :</strong> STU-0009
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Summary Cards */}
            <div className="row mb-4">

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body d-flex align-items-center gap-3">

                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                                <i className="bi bi-wallet2 text-primary fs-4"></i>
                            </div>

                            <div>
                                <small className="text-muted">Total Fees</small>

                                <h4 className="fw-bold mb-0">
                                    ₹ {summary.totalFees}
                                </h4>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body d-flex align-items-center gap-3">

                            <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                                <i className="bi bi-cash-stack text-success fs-4"></i>
                            </div>

                            <div>
                                <small className="text-muted">Total Paid</small>

                                <h4 className="fw-bold mb-0">
                                    ₹ {summary.totalPaid}
                                </h4>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body d-flex align-items-center gap-3">

                            <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                                <i className="bi bi-hourglass-split text-warning fs-4"></i>
                            </div>

                            <div>
                                <small className="text-muted">Total Pending</small>

                                <h4 className="fw-bold mb-0">
                                    ₹ {summary.totalPending}
                                </h4>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body d-flex align-items-center gap-3">

                            <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                                <i className="bi bi-calendar-check text-info fs-4"></i>
                            </div>

                            <div>
                                <small className="text-muted">Last Payment</small>

                                <h5 className="fw-bold mb-0">
                                    {summary.lastPaymentDate}
                                </h5>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Fees Grid */}
            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="fw-bold mb-0">
                            Fees Details
                        </h5>

                        <div className="d-flex gap-2">

                            <button
                                className="btn btn-primary rounded-3"
                                onClick={() => {
                                    setPaymentForm({
                                        ...initialPaymentForm,
                                        StudentID: studentId
                                    });
                                    setShowPaymentModal(true);
                                }}
                            >
                                <i className="bi bi-plus-lg me-1"></i>
                                Add Fee
                            </button>

                            <button className="btn btn-success rounded-3">
                                Record Payment
                            </button>

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table align-middle">

                            <thead className="table-light">

                                <tr>

                                    {columns.map((col) => (

                                        <th key={col.field}>

                                            {col.header}

                                            <br />

                                            <input
                                                type="text"
                                                className="form-control form-control-sm mt-1"
                                                value={filters[col.field]}
                                                onChange={(e) =>
                                                    setFilters({
                                                        ...filters,
                                                        [col.field]: e.target.value
                                                    })
                                                }
                                            />

                                        </th>

                                    ))}

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {feeDetails.map((item, index) => (

                                    <tr key={index}>

                                        <td>{item.MonthName}</td>
                                        <td>{item.YearName}</td>
                                        <td>₹ {item.FeeAmount}</td>
                                        <td>₹ {item.PaidAmount}</td>
                                        <td>₹ {item.DueAmount}</td>
                                        <td>{item.PaymentDate}</td>
                                        <td>{item.PaymentMode}</td>

                                        <td>

                                            <span className={`badge rounded-pill px-3 py-2
                                                
                                                ${item.Status === "Paid"
                                                    ? "bg-success-subtle text-success"
                                                    : item.Status === "Partial"
                                                        ? "bg-warning-subtle text-warning"
                                                        : "bg-danger-subtle text-danger"
                                                }
                                                
                                            `}>
                                                {item.Status}
                                            </span>

                                        </td>

                                        <td>

                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(item.FeeID)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* Payment Modal */}
            {showPaymentModal && (

                <>
                    <div className="modal d-block">

                        <div className="modal-dialog modal-lg modal-dialog-centered">

                            <div className="modal-content border-0 rounded-4 shadow-lg">

                                <div className="modal-header border-0">

                                    <h4 className="fw-bold">
                                        Record Student Fee
                                    </h4>

                                    <button
                                        className="btn-close"
                                        onClick={() => setShowPaymentModal(false)}
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <div className="form-floating">

                                                <select
                                                    name="MonthName"
                                                    className="form-select"
                                                    value={paymentForm.MonthName}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Month</option>
                                                    <option value="January">January</option>
                                                    <option value="February">February</option>
                                                    <option value="March">March</option>
                                                    <option value="April">April</option>
                                                    <option value="May">May</option>
                                                </select>

                                                <label>Month</label>

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">

                                                <input
                                                    type="number"
                                                    name="FeeAmount"
                                                    className="form-control"
                                                    placeholder="Fee Amount"
                                                    value={paymentForm.FeeAmount}
                                                    onChange={handleChange}
                                                />

                                                <label>Fee Amount</label>

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">

                                                <input
                                                    type="number"
                                                    name="PaidAmount"
                                                    className="form-control"
                                                    placeholder="Paid Amount"
                                                    value={paymentForm.PaidAmount}
                                                    onChange={handleChange}
                                                />

                                                <label>Paid Amount</label>

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">

                                                <input
                                                    type="date"
                                                    name="PaymentDate"
                                                    className="form-control"
                                                    value={paymentForm.PaymentDate}
                                                    onChange={handleChange}
                                                />

                                                <label>Payment Date</label>

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">

                                                <select
                                                    name="PaymentMode"
                                                    className="form-select"
                                                    value={paymentForm.PaymentMode}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Cash">Cash</option>
                                                    <option value="UPI">UPI</option>
                                                    <option value="Card">Card</option>
                                                    <option value="Bank Transfer">
                                                        Bank Transfer
                                                    </option>
                                                </select>

                                                <label>Payment Mode</label>

                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-floating">

                                                <textarea
                                                    name="Remark"
                                                    className="form-control"
                                                    placeholder="Remark"
                                                    style={{ height: "100px" }}
                                                    value={paymentForm.Remark}
                                                    onChange={handleChange}
                                                ></textarea>

                                                <label>Remark</label>

                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="modal-footer border-0">

                                    <button
                                        className="btn btn-success px-4"
                                        onClick={handleSavePayment}
                                    >
                                        Save Payment
                                    </button>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowPaymentModal(false)}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div
                        className="modal-backdrop fade show"
                        style={{ backdropFilter: "blur(5px)" }}
                    ></div>
                </>

            )}

        </div>

    );
}

export default StudentFees;
