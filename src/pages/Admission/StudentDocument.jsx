import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  CheckCircle2,
  CircleX,
  Download,
  Eye,
  FileCheck2,
  FileClock,
  FileText,
  LayoutDashboard,
  RotateCcw,
  Search,
  Upload,
  UserRound,
  X,
} from "lucide-react";

function StudentDocument() {
  const [student] = useState({
name: "Aarav Sharma",
    className: "5-A",
    rollNo: "15",
    admissionNo: "STU1001",
    fatherName: "Rajesh Sharma",
    motherName: "Pooja Sharma",
    dob: "12 May 2013",
    mobile: "9876543210",
    email: "aarav@email.com",
    address: "New Delhi",
    category: "General",
    admissionDate: "01 Apr 2024",
    bloodGroup: "O+",
    academicYear: "2024-25",
    section: "A",
    status: "Active",
    photo: "https://i.pravatar.cc/100",
  });




  const [documents] = useState([
    {
      id: 1,
      documentName: "Birth Certificate",
      category: "Identity",
      required: true,
      uploadedFile: "birth_certificate.pdf",
      fileSize: "420 KB",
      uploadDate: "28/05/2024",
      verifiedBy: "Admin",
      status: "Verified",
      remarks: "Clear copy received",
    },
    {
      id: 2,
      documentName: "Aadhaar Card",
      category: "Identity",
      required: true,
      uploadedFile: "aadhar_card.pdf",
      fileSize: "380 KB",
      uploadDate: "28/05/2024",
      verifiedBy: "Admin",
      status: "Verified",
      remarks: "Verified with admission form",
    },
    {
      id: 3,
      documentName: "Address Proof",
      category: "Address",
      required: true,
      uploadedFile: "address_proof.pdf",
      fileSize: "515 KB",
      uploadDate: "28/05/2024",
      verifiedBy: "-",
      status: "Pending",
      remarks: "Waiting for office verification",
    },
    {
      id: 4,
      documentName: "Previous School TC",
      category: "Academic",
      required: true,
      uploadedFile: "",
      fileSize: "-",
      uploadDate: "-",
      verifiedBy: "-",
      status: "Missing",
      remarks: "Required before final confirmation",
    },
    {
      id: 5,
      documentName: "Passport Size Photo",
      category: "Profile",
      required: true,
      uploadedFile: "photo.jpg",
      fileSize: "240 KB",
      uploadDate: "28/05/2024",
      verifiedBy: "Admin",
      status: "Verified",
      remarks: "Accepted",
    },
    {
      id: 6,
      documentName: "Medical Certificate",
      category: "Health",
      required: false,
      uploadedFile: "",
      fileSize: "-",
      uploadDate: "-",
      verifiedBy: "-",
      status: "Not Required",
      remarks: "Optional for this course",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeDocument, setActiveDocument] = useState(documents[0]);
  const [uploadDocument, setUploadDocument] = useState(null);

  const actionButtonStyle = {
    width: "28px",
    height: "28px",
    padding: 0,
    borderRadius: "6px",
  };

  const documentStats = useMemo(() => {
    const requiredDocuments = documents.filter((item) => item.required);
    const uploadedDocuments = requiredDocuments.filter((item) => item.uploadedFile);
    const verifiedDocuments = documents.filter((item) => item.status === "Verified").length;
    const pendingDocuments = documents.filter((item) => item.status === "Pending").length;
    const missingDocuments = documents.filter((item) => item.status === "Missing").length;
    const completion = Math.round((uploadedDocuments.length / requiredDocuments.length) * 100);

    return {
      total: documents.length,
      verified: verifiedDocuments,
      pending: pendingDocuments,
      missing: missingDocuments,
      completion,
    };
  }, [documents]);

  const summaryCards = useMemo(
    () => [
      {
        title: "Total Documents",
        value: documentStats.total,
        icon: FileText,
        color: "#2563eb",
        background: "#eff6ff",
      },
      {
        title: "Verified",
        value: documentStats.verified,
        icon: CheckCircle2,
        color: "#16a34a",
        background: "#f0fdf4",
      },
      {
        title: "Pending",
        value: documentStats.pending,
        icon: FileClock,
        color: "#ea580c",
        background: "#fff7ed",
      },
      {
        title: "Missing",
        value: documentStats.missing,
        icon: CircleX,
        color: "#dc2626",
        background: "#fef2f2",
      },
      {
        title: "Completion",
        value: `${documentStats.completion}%`,
        icon: FileCheck2,
        color: "#7c3aed",
        background: "#f5f3ff",
      },
    ],
    [documentStats]
  );

  const filteredDocuments = documents.filter((doc) => {
    const text = searchText.trim().toLowerCase();
    const matchesSearch = !text
      || doc.documentName.toLowerCase().includes(text)
      || doc.category.toLowerCase().includes(text)
      || doc.uploadedFile.toLowerCase().includes(text);
    const matchesStatus = !statusFilter || doc.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const badgeClass = {
      Verified: "bg-success",
      Pending: "bg-warning text-dark",
      Missing: "bg-danger",
      "Not Required": "bg-secondary",
    }[status] || "bg-light text-dark";

    return <span className={`badge ${badgeClass}`}>{status}</span>;
  };

  const resetFilters = () => {
    setSearchText("");
    setStatusFilter("");
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

        .document-page .summary-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(150px, 1fr));
          gap: 10px;
          margin-bottom: 10px;
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

        .document-page .summary-value {
          margin: 0;
          font-size: 1.2rem;
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

        .document-page .profile-card,
        .document-page .filter-card,
        .document-page .grid-card {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .document-page .profile-card {
          margin-bottom: 10px;
        }

        .document-page .filter-card {
          margin-bottom: 10px;
        }

        .document-page .profile-card .card-body,
        .document-page .filter-card .card-body,
        .document-page .grid-card .card-body {
          padding: 10px 12px !important;
        }

        .document-page .filter-actions .btn,
        .document-page .icon-btn {
          width: 31px;
          height: 31px;
          padding: 0;
          border-radius: 7px;
        }

        .document-page .student-photo {
          width: 92px;
          height: 108px;
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

        .document-page .progress {
          height: 8px;
          border-radius: 999px;
          background: #eef2f7;
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

        .document-page .badge {
          border-radius: 999px;
          padding: 0.35em 0.65em;
          font-weight: 700;
        }

        .document-page .preview-frame {
          min-height: 190px;
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
          background: #f8fafc;
        }

        .document-page .modal-backdrop-lite {
          position: fixed;
          inset: 0;
          z-index: 1050;
          background: rgba(15, 23, 42, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .document-page .upload-modal {
          width: min(560px, 100%);
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.22);
        }

        @media (max-width: 1280px) {
          .document-page .summary-grid {
            grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .document-page .page-header {
            align-items: flex-start !important;
          }

          .document-page .breadcrumb-lite {
            display: none !important;
          }
        }
      `}</style>

 <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
  <div>
    <h3 className="page-title fw-bold mb-0">Student Documents</h3>
  </div>

  <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
    <LayoutDashboard size={16} />
    <span>Dashboard</span>
    <span>/</span>
    <span>Admission</span>
    <span>/</span>
    <span>Student Documents</span>
  </div>
</div>



      <h5 className="section-label">
        Document Statistics
      </h5>

      {/* SUMMARY CARDS */}

      <div className="summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div className="summary-card" key={card.title}>
              <div
                className="summary-icon"
                style={{ background: card.background, color: card.color }}
              >
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="summary-value">{card.value}</p>
                <div className="summary-title text-truncate">{card.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="row g-2 mb-2">
        <div className="col-lg-8">
          <div className="profile-card h-100">
            <div className="card-body">
              <div className="d-flex gap-3 flex-wrap">
                <img src={student.photo} alt={student.studentName} className="student-photo" />

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap mb-2">
                    <div>
                      <h6 className="fw-bold mb-1">{student.studentName}</h6>
                      <div className="text-muted small">{student.applicationNo} • {student.rollNo}</div>
                    </div>
                    <span className="badge bg-primary">Active Admission</span>
                  </div>

                  <div className="row">
                    {[
                      ["Course", student.course],
                      ["Current Year/Sem", student.currentYear],
                      ["DOB", student.dob],
                      ["Mobile No", student.mobileNo],
                      ["Email ID", student.emailId],
                      ["Guardian", student.guardianName],
                      ["Admission Batch", student.admissionBatch],
                      ["Admission Date", student.admissionDate],
                    ].map(([label, value]) => (
                      <div className="col-md-3 col-sm-6" key={label}>
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

        <div className="col-lg-4">
          <div className="preview-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="section-label mb-0">Selected Document</p>
                {activeDocument && getStatusBadge(activeDocument.status)}
              </div>

              <div className="preview-frame d-flex flex-column align-items-center justify-content-center text-center p-3">
                <FileText size={42} className="text-primary mb-2" />
                <h6 className="fw-bold mb-1">{activeDocument?.documentName}</h6>
                <div className="text-muted small mb-2">
                  {activeDocument?.uploadedFile || "No file uploaded"}
                </div>
                <div className="small text-muted">{activeDocument?.remarks}</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

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
                <span className="badge bg-success">{student.status}</span>
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

      {/* FILTERS */}

      <h5 className="section-label">
        Filter
      </h5>

      <div className="filter-card">
        <div className="card-body">
          <div className="d-flex align-items-end gap-2 flex-wrap overflow-visible pb-1">
            <div style={{ flex: "1 1 142px", minWidth: "132px" }}>
              <label className="form-label small mb-1">
                Status
              </label>
              <select
                className="form-select form-select-sm"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="">All</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Missing">Missing</option>
                <option value="Not Required">Not Required</option>
              </select>
            </div>

            <div style={{ flex: "1.6 1 250px", minWidth: "230px" }}>
              <label className="form-label small mb-1">
                Required Upload Progress
              </label>
              <div className="d-flex align-items-center gap-2">
                <div className="progress flex-grow-1">
                  <div
                    className="progress-bar"
                    style={{ width: `${documentStats.completion}%` }}
                    role="progressbar"
                    aria-valuenow={documentStats.completion}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <strong className="small">{documentStats.completion}%</strong>
              </div>
            </div>

            <div className="filter-actions ms-auto d-flex gap-2">
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center"
                aria-label="Search"
                title="Search"
              >
                <Search size={16} />
              </button>
              <button
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                aria-label="Reset"
                title="Reset"
                onClick={resetFilters}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DOCUMENT TABLE */}

      <div className="grid-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-2 mb-2 flex-wrap">
            <h5 className="section-label mb-0">Document Upload & Verification</h5>
            <button
              type="button"
              className="btn btn-primary btn-sm d-inline-flex align-items-center gap-2"
              onClick={() => setUploadDocument(activeDocument)}
            >
              <Upload size={15} />
              Upload Document
            </button>
          </div>

          <div className="table-shell">
            <table className="table table-sm table-striped align-middle document-table mb-0">
              <thead>
                <tr>
                  <th style={{ width: "210px" }}>Document Name</th>
                  <th style={{ width: "130px" }}>Category</th>
                  <th style={{ width: "90px" }}>Required</th>
                  <th style={{ width: "190px" }}>Uploaded File</th>
                  <th style={{ width: "115px" }}>Upload Date</th>
                  <th style={{ width: "120px" }}>Verified By</th>
                  <th style={{ width: "110px" }}>Status</th>
                  <th style={{ width: "180px" }}>Remarks</th>
                  <th style={{ width: "125px" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className={activeDocument?.id === doc.id ? "active-row" : ""}
                    onClick={() => setActiveDocument(doc)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="fw-semibold text-nowrap">{doc.documentName}</td>
                    <td className="text-nowrap">{doc.category}</td>
                    <td>{doc.required ? "Yes" : "No"}</td>
                    <td className="text-nowrap">{doc.uploadedFile || "-"}</td>
                    <td>{doc.uploadDate}</td>
                    <td>{doc.verifiedBy}</td>
                    <td>{getStatusBadge(doc.status)}</td>
                    <td className="small text-muted">{doc.remarks}</td>
                    <td>
                      <div className="d-flex gap-2">

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success d-inline-flex align-items-center justify-content-center"
                          style={actionButtonStyle}
                          title="Upload document"
                          aria-label={`Upload ${doc.documentName}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setUploadDocument(doc);
                          }}
                        >
                          <Upload size={16} />
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                          style={actionButtonStyle}
                          title="Download document"
                          aria-label={`Download ${doc.documentName}`}
                          disabled={!doc.uploadedFile}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredDocuments.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No documents found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {uploadDocument && (
        <div className="modal-backdrop-lite">
          <div className="upload-modal">
            <div className="border-bottom px-3 py-2 bg-light rounded-top">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="fw-bold mb-0 text-primary">Upload Document</h6>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                  style={actionButtonStyle}
                  aria-label="Close upload"
                  title="Close"
                  onClick={() => setUploadDocument(null)}
                >
                  <X size={16} />
                </button>
              </div>
              {/* <div className="breadcrumb-lite d-flex align-items-center gap-2 small" style={{ fontSize: '0.75rem' }}>
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
                <span>/</span>
                <span>Admission</span>
                <span>/</span>
                <span className="fw-semibold">{uploadDocument.documentName}</span>
              </div> */}
            </div>

            <div className="p-3">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small mb-1">Document Name</label>
                  <input className="form-control form-control-sm" value={uploadDocument.documentName} disabled />
                </div>

                <div className="col-md-6">
                  <label className="form-label small mb-1">Uploaded File Name</label>
                  <input className="form-control form-control-sm" value={uploadDocument.uploadedFile || "File not uploaded"} disabled />
                </div>

                <div className="col-md-6">
                  <label className="form-label small mb-1">Document Status</label>
                  <select className="form-select form-select-sm" defaultValue={uploadDocument.status}>
                    <option>Verified</option>
                    <option>Pending</option>
                    <option>Missing</option>
                    <option>Not Required</option>
                  </select>
                </div>


                <div className="col-12">
                  <label className="form-label small mb-1">Choose File</label>
                  <input type="file" className="form-control form-control-sm" />
                </div>

                <div className="col-12">
                  <label className="form-label small mb-1">File Preview</label>
                  <div className="preview-frame d-flex align-items-center justify-content-center p-3" style={{ minHeight: '140px' }}>
                    {uploadDocument.uploadedFile ? (
                      <div className="text-center">
                        <img src={`https://placehold.co/100x120/e2e8f0/2563eb?text=${uploadDocument.uploadedFile.split('.').pop().toUpperCase()}`} alt="Preview" className="img-thumbnail mb-2 shadow-sm" style={{ height: '90px' }} />
                        <div className="d-flex align-items-center justify-content-center gap-2 text-primary">
                          <FileText size={16} />
                          <span className="fw-semibold small">{uploadDocument.uploadedFile}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted">
                        <div className="mb-2 opacity-25"><FileText size={48} /></div>
                        <span className="small">File not uploaded</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label small mb-1">Remarks</label>
                  <textarea className="form-control form-control-sm" rows="3" defaultValue={uploadDocument.remarks} />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 border-top px-3 py-2">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setUploadDocument(null)}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setUploadDocument(null)}>
                Save Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDocument;
