import { useEffect, useState } from "react";


function StudentInquiry() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [inquiries, setInquiries] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [standards, setStandards] = useState([]);
    const [schools, setSchools] = useState([]);
    const [InquirySources, setInquirySources] = useState([]);
    const [subject, setsubjects] = useState([]);


    // Grid columns
    const columns = [

        { field: "StudentID", header: "Inquiry ID" },
        { field: "StudentName", header: "Student Name" },
        { field: "FatherName", header: "Father Name" },
        { field: "MotherName", header: "MotherName" },
        { field: "Mobile", header: "Mobile" },
        { field: "StandardName", header: "Standard" },
        { field: "SchoolName", header: "School Name" },
        { field: "InquiryDate", header: "Inquiry Date" },
        { field: "Status", header: "Status" }
    ];

    // Filters (same logic)
    const [filters, setFilters] = useState(
        columns.reduce((acc, col) => ({ ...acc, [col.field]: null }), {})
    );



    // Form initial data
    const initialForm = {
        StudentID:"",
        StudentName: "",
        StandardID: "",
        SchoolID: "",
        Medium: "English",
        Batch: "Morning Batch",
        FatherName: "",
        MotherName: "",
        Mobile: "",
        AlternateMobile: "",
        Address: "",
        LastYearPercentage: "",
        WeakSubjectID: "",
        InquirySourceID: "",
        InquiryDate: "",
        Remark: "",
        Status: "Pending"
    };

    const [formData, setFormData] = useState(initialForm);

    // handleChange (same logic)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Get Inquiry List
    useEffect(() => {
        fetch("https://localhost:44377/api/inquiry/getInquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters)
        })
            .then((res) => res.json())
            .then((data) => setInquiries(data))
            .catch((err) => console.error(err));
    }, [filters]);

    useEffect(() => {
        fetch("https://localhost:44377/api/master/getStandards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})  
        })
            .then((res) => res.json())
            .then((data) => {
                setStandards(data.data || data); 
            })
            .catch((err) => console.error(err));

        fetch("https://localhost:44377/api/master/getSchools", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})   
        })
            .then((res) => res.json())
            .then((data) => {
                setSchools(data.data || data);
            })
            .catch((err) => console.error(err));

        fetch("https://localhost:44377/api/master/getInquirySources", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})    
        })
            .then((res) => res.json())
            .then((data) => {
                setInquirySources(data.data || data); 
            })
            .catch((err) => console.error(err));

        fetch("https://localhost:44377/api/master/getSubjects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})   
        })
            .then((res) => res.json())
            .then((data) => {
                setsubjects(data.data || data); // handle both formats
            })
            .catch((err) => console.error(err));

    }, []);

    // Save Inquiry
    const handleSave = () => {

         const payload = {
        StudentId: isEdit ? editId : null,

        StudentName: formData.StudentName,
        StandardID: formData.StandardID,
        SchoolID: formData.SchoolID,
        Medium: formData.Medium,
        Batch: formData.Batch,

        FatherName: formData.FatherName,
        MotherName: formData.MotherName,
        Mobile: formData.Mobile,
        AlternateMobile: formData.AlternateMobile,
        Address: formData.Address,

        Percentage: formData.LastYearPercentage,

        WeakSubjectID: formData.WeakSubjects,

        InquirySourceID: formData.InquirySource,

        InquiryDate: formData.InquiryDate,
        Remark: formData.Remark,

        Status: formData.Status
    };

        fetch("https://localhost:44377/api/inquiry/saveInquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then(() => {
                setShowForm(false);
                setFormData(initialForm);
                setIsEdit(false);
                setEditId(null);
                setFilters({ ...filters });
                setShowSuccess(true);
            });
    };
    const handleDelete = (id) => {
        fetch(`https://localhost:44377/api/inquiry/deleteInquiry/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                setFilters({ ...filters }); // refresh grid
            });
    };

    const handleEdit = (item) => {
        setFormData(item);       
        setEditId(item.StudentID);
        setIsEdit(true);
        setShowForm(true);      
    };
    return (

        <div className="container-fluid mt-4">

            <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
                <div>
                    <h3 className="page-title fw-bold mb-0">Student Inquiry</h3>
                    <div className="breadcrumb-lite d-flex align-items-center gap-2 small mt-1">
                        <span>Dashboard</span><span>/</span><span>Student Inquiry</span>
                    </div>
                </div>
            </div>

            <button
                className="btn btn-primary mb-3"
                onClick={() => {
                    setFormData(initialForm);
                    setIsEdit(false);
                    setShowForm(true);
                }}
            >
                Add Inquiry
            </button>
            {showSuccess && (
                <>
                    <div className="modal d-block" tabIndex="-1">
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                            <div className="modal-content text-center p-3 shadow border-0">

                                <div className="text-success fs-1">
                                    ✔
                                </div>

                                <h5 className="text-success">
                                    Saved Successfully
                                </h5>

                                <button
                                    className="btn btn-success btn-sm mt-2"
                                    onClick={() => setShowSuccess(false)}
                                >
                                    OK
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop fade show"></div>
                </>
            )}
            {showForm && (
                <>
                    <div className="modal d-block" tabIndex="-1">
                        <div className="modal-dialog modal-xl modal-dialog-centered">
                            <div className="modal-content shadow-lg rounded-4 p-3">

                                <div className="modal-header border-0">
                                    <h4 className="modal-title fw-bold">Student Inquiry Form</h4>
                                    <button className="btn-close" onClick={() => setShowForm(false)}></button>
                                </div>

                                <div className="modal-body">

                                    {/* Student Details */}
                                    <div className="card shadow-sm mb-4">
                                        <div className="card-header bg-info text-dark fw-semibold">
                                            <i className="bi bi-person me-2"></i> Student Details
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-3">

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input type="text" name="StudentName" className="form-control"
                                                            placeholder="Student Name"
                                                            value={formData.StudentName}
                                                            onChange={handleChange} />
                                                        <label>Student Name</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <select
                                                            name="StandardID"
                                                            className="form-select"
                                                            value={formData.StandardID}
                                                            onChange={handleChange}
                                                        >
                                                            {/* <option value="">Select Class</option> */}

                                                            {Array.isArray(standards) &&
                                                                standards.map((item) => (
                                                                    <option key={item.StandardID} value={item.StandardID}>
                                                                        {item.StandardName}
                                                                    </option>
                                                                ))}
                                                        </select>

                                                        <label>Standard</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <select
                                                            name="ClassName"
                                                            className="form-select"
                                                            value={formData.ClassName}
                                                            onChange={handleChange}
                                                        >
                                                      

                                                            {Array.isArray(schools) &&
                                                                schools.map((item) => (
                                                                    <option key={item.SchoolID} value={item.SchoolName}>
                                                                        {item.SchoolName}
                                                                    </option>
                                                                ))}
                                                        </select>

                                                        <label>School Name</label>
                                                    </div>
                                                </div>




                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <select name="Medium" className="form-select"
                                                            value={formData.Medium}
                                                            onChange={handleChange}>
                                                            <option value="English">English</option>
                                                            <option value="Marathi">Marathi</option>
                                                            <option value="Marathi">Semi-English</option>
                                                        </select>
                                                        <label>Medium</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <select name="Medium" className="form-select"
                                                            value={formData.Medium}
                                                            onChange={handleChange}>
                                                            <option value="MorningBatch">Morning Batch</option>
                                                            <option value="EveningBatch">Evening Batch</option>
                                                            <option value="WeekendBatch">Weekend Batch</option>
                                                        </select>
                                                        <label>Batch</label>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    {/* Parent Details */}
                                    <div className="card shadow-sm mb-4">
                                        <div className="card-header bg-info text-dark fw-semibold">
                                            <i className="bi bi-people me-2"></i> Parent Details
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-3">

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input type="text" name="FatherName" className="form-control"
                                                            placeholder="Father Name"
                                                            value={formData.FatherName}
                                                            onChange={handleChange} />
                                                        <label>Father Name</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input type="text" name="MotherName" className="form-control"
                                                            placeholder="Mother Name"
                                                            value={formData.MotherName}
                                                            onChange={handleChange} />
                                                        <label>Mother Name</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input type="text" name="Mobile" className="form-control"
                                                            placeholder="Mobile"
                                                            value={formData.Mobile}
                                                            onChange={handleChange} />
                                                        <label>Mobile</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input type="text" name="AlternateMobile" className="form-control"
                                                            placeholder="Alternate Mobile"
                                                            value={formData.AlternateMobile}
                                                            onChange={handleChange} />
                                                        <label>Alternate Mobile</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-8">
                                                    <div className="form-floating">
                                                        <input type="text" name="Address" className="form-control"
                                                            placeholder="Address"
                                                            value={formData.Address}
                                                            onChange={handleChange} />
                                                        <label>Address</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Academic Details */}
                                    <div className="card shadow-sm mb-4">
                                        <div className="card-header bg-info text-dark fw-semibold">
                                            <i className="bi bi-book me-2"></i> Academic Details
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-3">

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input type="text" name="LastYearPercentage" className="form-control"
                                                            placeholder="Percentage"
                                                            value={formData.LastYearPercentage}
                                                            onChange={handleChange} />
                                                        <label>Last Year %</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <select
                                                            name="WeakSubjects"
                                                            className="form-select"
                                                            value={formData.Subject}
                                                            onChange={handleChange}
                                                        >
                                                        

                                                            {Array.isArray(subject) &&
                                                                subject.map((item) => (
                                                                    <option key={item.SubjectID} value={item.SubjectID}>
                                                                        {item.SubjectName}
                                                                    </option>
                                                                ))}
                                                        </select>

                                                        <label>Weak Subjects</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Inquiry Details */}
                                    <div className="card shadow-sm mb-4">
                                        <div className="card-header bg-info text-dark fw-semibold">
                                            <i className="bi bi-info-circle me-2"></i> Inquiry Details
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-3">

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <select
                                                            name="ClassName"
                                                            className="form-select"
                                                            value={formData.ClassName}
                                                            onChange={handleChange}
                                                        >
                                                            {Array.isArray(InquirySources) &&
                                                                InquirySources.map((item) => (
                                                                    <option key={item.InquirySourceId} value={item.InquirySourceName}>
                                                                        {item.InquirySourceName}
                                                                    </option>
                                                                ))}
                                                        </select>

                                                        <label>Inquiry Source</label>
                                                    </div>
                                                </div>


                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input type="date" name="InquiryDate" className="form-control"
                                                            value={formData.InquiryDate}
                                                            onChange={handleChange} />
                                                        <label>Inquiry Date</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-floating">
                                                        <textarea name="Remark" className="form-control"
                                                            placeholder="Remark"
                                                            style={{ height: "100px" }}
                                                            value={formData.Remark}
                                                            onChange={handleChange} />
                                                        <label>Remark</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <select name="Status" className="form-select"
                                                            value={formData.Status}
                                                            onChange={handleChange}>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Admitted">Admitted</option>
                                                            <option value="Not Interested">Not Interested</option>
                                                        </select>
                                                        <label>Status</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="modal-footer border-0">
                                    <button className="btn btn-success px-4 shadow-sm" onClick={handleSave}>
                                        <i className="bi bi-check-circle me-1"></i> Save
                                    </button>
                                    <button className="btn btn-outline-secondary px-4" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Blur Background */}
                    <div className="modal-backdrop fade show" style={{ backdropFilter: "blur(5px)" }}></div>
                </>
            )}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.field}>
                                {col.header}
                                <br />
                                <input
                                    type="text"
                                    className="form-control form-control-sm mt-1"
                                    value={filters[col.field] || ""}
                                    onChange={(e) =>
                                        setFilters({ ...filters, [col.field]: e.target.value })
                                    }
                                />
                            </th>

                        ))}
                        <th className="align-top">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries.map((item, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col.field}>{item[col.field]}</td>
                            ))}
                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.InquiryID)}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default StudentInquiry;
