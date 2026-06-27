// AllStudentMarks.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllStudentMarks() {

    const navigate = useNavigate();

    const [marksData, setMarksData] = useState([]);

    const [filters, setFilters] = useState({
        StudentID: "",
        StudentName: "",
        TestName: "",
        SubjectName: ""
    });

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

    useEffect(() => {

        fetch("https://localhost:44377/api/StudentMark/GetAllStudentMarks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filters)
        })
            .then((res) => res.json())
            .then((data) => {

                setMarksData(data);

            });

    }, [filters]);

    return (

        <div className="container-fluid mt-4">

            {/* Header */}

            <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">

                <div>

                    <h3 className="page-title fw-bold mb-0">
                        Student Marks
                    </h3>

                    <div className="breadcrumb-lite d-flex align-items-center gap-2 small mt-1">
                        <span>Dashboard</span><span>/</span><span>Student Marks</span>
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

            {/* Grid */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="fw-bold mb-0">
                            Marks Details
                        </h5>

                    </div>

                    <div className="table-responsive">

                        <table className="table align-middle">

                            <thead className="table-light">

                                <tr>

                                    {

                                        columns.map((col) => (

                                            <th key={col.field}>

                                                {col.header}

                                                <br />

                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm mt-1"
                                                    value={filters[col.field] || ""}
                                                    onChange={(e) =>
                                                        setFilters({
                                                            ...filters,
                                                            [col.field]: e.target.value
                                                        })
                                                    }
                                                />

                                            </th>

                                        ))

                                    }

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    marksData.map((item, index) => (

                                        <tr key={index}>

                                            <td>

                                                <span
                                                    style={{
                                                        color: "#0d6efd",
                                                        cursor: "pointer",
                                                        textDecoration: "underline",
                                                        fontWeight: "600"
                                                    }}
                                                    onClick={() =>
                                                        navigate(`/studentMarks/${item.StudentID}`)
                                                    }
                                                >

                                                    {item.StudentID}

                                                </span>

                                            </td>

                                            <td>
                                                {item.StudentName}
                                            </td>

                                            <td>
                                                {item.TestName}
                                            </td>

                                            <td>
                                                {item.SubjectName}
                                            </td>

                                            <td>
                                                {item.MarksObtained}
                                            </td>

                                            <td>
                                                {item.TotalMarks}
                                            </td>

                                            <td>

                                                <span className={`badge rounded-pill px-3 py-2
                                                
                                                    ${item.Percentage >= 75
                                                        ? "bg-success-subtle text-success"
                                                        : item.Percentage >= 50
                                                            ? "bg-warning-subtle text-warning"
                                                            : "bg-danger-subtle text-danger"
                                                    }
                                                
                                                `}>

                                                    {item.Percentage}%

                                                </span>

                                            </td>

                                            <td>
                                                {item.TestDate}
                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AllStudentMarks;
