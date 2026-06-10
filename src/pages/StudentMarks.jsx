import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
function StudentMarks() {

    const [studentData, setStudentData] = useState({});
    const [marksDetails, setMarksDetails] = useState([]);
    const [showMarksModal, setShowMarksModal] = useState(false);

    const { studentId } = useParams();

    // Summary Cards
    const [summary, setSummary] = useState({
        totalTests: 12,
        averagePercentage: 78,
        highestMarks: 95,
        lastTestDate: "01 May 2026"
    });

    // Grid Columns
    const columns = [

        { field: "StudentID", header: "Student ID" },

        { field: "StudentName", header: "Student Name" },

        { field: "TestName", header: "Test Name" },

        { field: "SubjectName", header: "Subject" },

        { field: "MarksObtained", header: "Marks" },

        { field: "TotalMarks", header: "Total" },

        { field: "Percentage", header: "%" },

        { field: "TestDate", header: "Test Date" }

    ];

    // Filters
    const [filters, setFilters] = useState({
        StudentID: studentId,
        StudentName: "",
        TestName: "",
        SubjectName: "",
        MarksObtained: "",
        TotalMarks: "",
        Percentage: "",
        TestDate: ""
    });

    // Marks Form
    const initialMarksForm = {
        StudentID: studentId,
        TestName: "",
        SubjectName: "",
        MarksObtained: "",
        TotalMarks: "",
        Percentage: "",
        TestDate: "",
        Remark: ""
    };

    const [marksForm, setMarksForm] = useState(initialMarksForm);

    const handleChange = (e) => {

        setMarksForm({
            ...marksForm,
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

        fetch("https://localhost:44377/api/StudentMark/GetAllStudentMarks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filters)
        })
            .then((res) => res.json())
            .then((data) => {
                setMarksDetails(data);
            });

    }, [filters, studentId]);

    // Save Marks
    const handleSaveMarks = () => {

        fetch("https://localhost:44377/api/StudentMark/saveStudentMarks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(marksForm)
        })
            .then((res) => res.json())
            .then(() => {

                setShowMarksModal(false);

                setMarksForm(initialMarksForm);

                setFilters({ ...filters });

            });

    };

    // Delete
    const handleDelete = (id) => {

        fetch(`https://localhost:44377/api/StudentMark/deleteMarks/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then(() => {

                setFilters({ ...filters });

            });

    };

    // Edit
    const handleEdit = (item) => {

        setMarksForm(item);

        setShowMarksModal(true);

    };

    return (

        <div className="container-fluid mt-4">

            {/* Header */}
            <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">

                <div>

                    <h3 className="page-title fw-bold mb-0">
                        Student Marks
                    </h3>

                    <div className="breadcrumb-lite d-flex align-items-center gap-2 small mt-1">
                        <span>Dashboard</span><span>/</span><span>Student Profile</span><span>/</span><span>Marks</span>
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

                        <span className="fw-semibold">
                            Admin
                        </span>

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
                                        <strong>Student ID :</strong> STU-0009
                                    </p>

                                    <p className="mb-0">
                                        <strong>Last Test :</strong> {summary.lastTestDate}
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

                                <i className="bi bi-journal-text text-primary fs-4"></i>

                            </div>

                            <div>

                                <small className="text-muted">
                                    Total Tests
                                </small>

                                <h4 className="fw-bold mb-0">
                                    {summary.totalTests}
                                </h4>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body d-flex align-items-center gap-3">

                            <div className="bg-success bg-opacity-10 p-3 rounded-circle">

                                <i className="bi bi-graph-up text-success fs-4"></i>

                            </div>

                            <div>

                                <small className="text-muted">
                                    Average %
                                </small>

                                <h4 className="fw-bold mb-0">
                                    {summary.averagePercentage}%
                                </h4>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body d-flex align-items-center gap-3">

                            <div className="bg-warning bg-opacity-10 p-3 rounded-circle">

                                <i className="bi bi-award text-warning fs-4"></i>

                            </div>

                            <div>

                                <small className="text-muted">
                                    Highest Marks
                                </small>

                                <h4 className="fw-bold mb-0">
                                    {summary.highestMarks}
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

                                <small className="text-muted">
                                    Last Test
                                </small>

                                <h5 className="fw-bold mb-0">
                                    {summary.lastTestDate}
                                </h5>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Marks Grid */}
            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="fw-bold mb-0">
                            Student Marks Details
                        </h5>

                        <button
                            className="btn btn-primary rounded-3"
                            onClick={() => {

                                setMarksForm({
                                    ...initialMarksForm,
                                    StudentID: studentId
                                });

                                setShowMarksModal(true);

                            }}
                        >

                            <i className="bi bi-plus-lg me-1"></i>
                            Add Marks

                        </button>

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

                                {marksDetails.map((item, index) => (

                                    <tr key={index}>

                                        <td>{item.StudentID}</td>
                                        <td>{item.StudentName}</td>
                                        <td>{item.TestName}</td>
                                        <td>{item.SubjectName}</td>
                                        <td>{item.MarksObtained}</td>
                                        <td>{item.TotalMarks}</td>
                                        <td>{item.Percentage}%</td>
                                        <td>{item.TestDate}</td>

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
                                                    onClick={() => handleDelete(item.MarkID)}
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

            {/* Marks Modal */}
            {showMarksModal && (

                <>

                    <div className="modal d-block">

                        <div className="modal-dialog modal-lg modal-dialog-centered">

                            <div className="modal-content border-0 rounded-4 shadow-lg">

                                <div className="modal-header border-0">

                                    <h4 className="fw-bold">
                                        Add Student Marks
                                    </h4>

                                    <button
                                        className="btn-close"
                                        onClick={() => setShowMarksModal(false)}
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <div className="form-floating">

                                                <input
                                                    type="text"
                                                    name="TestName"
                                                    className="form-control"
                                                    placeholder="Test Name"
                                                    value={marksForm.TestName}
                                                    onChange={handleChange}
                                                />

                                                <label>Test Name</label>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="form-floating">

                                                <input
                                                    type="text"
                                                    name="SubjectName"
                                                    className="form-control"
                                                    placeholder="Subject"
                                                    value={marksForm.SubjectName}
                                                    onChange={handleChange}
                                                />

                                                <label>Subject</label>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="form-floating">

                                                <input
                                                    type="number"
                                                    name="MarksObtained"
                                                    className="form-control"
                                                    placeholder="Marks"
                                                    value={marksForm.MarksObtained}
                                                    onChange={handleChange}
                                                />

                                                <label>Marks Obtained</label>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="form-floating">

                                                <input
                                                    type="number"
                                                    name="TotalMarks"
                                                    className="form-control"
                                                    placeholder="Total Marks"
                                                    value={marksForm.TotalMarks}
                                                    onChange={handleChange}
                                                />

                                                <label>Total Marks</label>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="form-floating">

                                                <input
                                                    type="number"
                                                    name="Percentage"
                                                    className="form-control"
                                                    placeholder="Percentage"
                                                    value={marksForm.Percentage}
                                                    onChange={handleChange}
                                                />

                                                <label>Percentage</label>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="form-floating">

                                                <input
                                                    type="date"
                                                    name="TestDate"
                                                    className="form-control"
                                                    value={marksForm.TestDate}
                                                    onChange={handleChange}
                                                />

                                                <label>Test Date</label>

                                            </div>

                                        </div>

                                        <div className="col-md-12">

                                            <div className="form-floating">

                                                <textarea
                                                    name="Remark"
                                                    className="form-control"
                                                    placeholder="Remark"
                                                    style={{ height: "100px" }}
                                                    value={marksForm.Remark}
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
                                        onClick={handleSaveMarks}
                                    >
                                        Save Marks
                                    </button>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowMarksModal(false)}
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

export default StudentMarks;
