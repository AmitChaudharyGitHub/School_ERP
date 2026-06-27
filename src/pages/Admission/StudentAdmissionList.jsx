import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  UserPlus,
  Users,
  FileWarning,
  IndianRupee,
  Eye,
  Pencil,
  Trash2,
  Search,
  RotateCcw,
  Menu,
  LayoutDashboard,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  CalendarDays,
  Download,
  Upload,
} from "lucide-react";

const StudentAdmissionList = () => {
  const [getStudentAdmissionList, setStudentAdmissionList] = useState([]);
  const [getAdmissionDashboardStatistics, setAdmissionDashboardStatistics] = useState([]);


  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("student");
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [admissionDateRange, setAdmissionDateRange] = useState({
    from: "",
    to: "",
  });
  const [showAdmissionCalendar, setShowAdmissionCalendar] = useState(false);
  const [editingRemarkIndex, setEditingRemarkIndex] = useState(null);
  const [hoveredAdmissionDate, setHoveredAdmissionDate] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [columnWidths, setColumnWidths] = useState({});
  const fileInputsRef = useRef([]);
  const [documents, setDocuments] = useState([]);
  const columnMenuRef = useRef(null);
  const columnToggleRef = useRef(null);

  useEffect(() => {
    if (!showColumnMenu) return;

    const handleDocumentClick = (e) => {
      const menu = columnMenuRef.current;
      const toggle = columnToggleRef.current;

      if (menu && menu.contains(e.target)) return;
      if (toggle && toggle.contains(e.target)) return;

      setShowColumnMenu(false);
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [showColumnMenu]);



  const documentsTemplate = useMemo(() => [
    { id: 1, docName: "Student Passport Size Photo", category: "Photo", required: true, uploadDate: "2024-05-28", remark: "Accepted", fileName: "photo.png", fileSize: "240 KB", status: "Verified" },
    { id: 2, docName: "Student Aadhar Card", category: "Identity", required: true, uploadDate: "2024-05-28", remark: "Pending verification", fileName: "aadharcard1.pdf", fileSize: "380 KB", status: "Pending" },
    { id: 3, docName: "Student Father Aadhar Card", category: "Identity", required: true, uploadDate: "2024-05-20", remark: "Rejected - unclear image", fileName: null, fileSize: "-", fileObject: null, status: "Missing" },
    { id: 4, docName: "Student Mother Aadhar Card", category: "Identity", required: true, uploadDate: "", remark: "", fileName: null, fileSize: "-", status: "Not Uploaded" },
  ], []);

  const handleUploadClick = (index) => {
    if (fileInputsRef.current[index]) fileInputsRef.current[index].click();
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setDocuments((prev) => {
      const copy = [...prev];
      // revoke previous url if present
      if (copy[index] && copy[index].fileUrl) URL.revokeObjectURL(copy[index].fileUrl);
      copy[index] = { ...copy[index], fileName: file.name, fileObject: file, fileUrl, status: "Pending", uploadDate: new Date().toISOString().slice(0, 10) };
      return copy;
    });
  };

  const handleDeleteFile = (index) => {
    setDocuments((prev) => {
      const copy = [...prev];
      if (copy[index] && copy[index].fileUrl) {
        try { URL.revokeObjectURL(copy[index].fileUrl); } catch (e) { }
      }
      copy[index] = { ...copy[index], fileName: null, fileObject: null, fileUrl: null, status: "Not Uploaded", uploadDate: null };
      return copy;
    });
  };

  const handleDocFieldChange = (index, field, value) => {
    setDocuments((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleDownloadFile = (index) => {
    const doc = documents[index];
    if (!doc || !doc.fileUrl) return;
    const a = document.createElement("a");
    a.href = doc.fileUrl;
    a.download = doc.fileName || "attachment";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const actionButtonStyle = useMemo(() => ({
    width: "28px",
    height: "28px",
    padding: 0,
    borderRadius: "6px",
  }), []);
  const compactFilterStyle = useMemo(() => ({
    flex: "1 1 142px",
    minWidth: "132px",
  }), []);
  const dateFilterStyle = useMemo(() => ({
    flex: "1.6 1 250px",
    minWidth: "230px",
  }), []);


  const formatDate = (date) => {
    if (!date) return "";

    const parts = date.split("-");

    //DD-MM-YYYY format 
    if (parts.length === 3 && parts[0].length === 2) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    return date.substring(0, 10);
  };

  const summaryCards = useMemo(() => [
    {
      title: "Total Admissions",
      value: getAdmissionDashboardStatistics?.[0]?.TotalAdmissions || 0,
      icon: UserPlus,
      color: "#2563eb",
      background: "#eff6ff",
    },
    {
      title: "Male Students",
      value: getAdmissionDashboardStatistics?.[0]?.MaleStudents || 0,
      icon: Users,
      color: "#16a34a",
      background: "#f0fdf4",
    },
    {
      title: "Female Students",
      value: getAdmissionDashboardStatistics?.[0]?.FemaleStudents || 0,
      icon: Users,
      color: "#db2777",
      background: "#fdf2f8",
    },
    {
      title: "Pending Documents",
      value: getAdmissionDashboardStatistics?.[0]?.PendingDocuments || 0,
      icon: FileWarning,
      color: "#ea580c",
      background: "#fff7ed",
    },
    {
      title: "Pending Fee Payments",
      value: getAdmissionDashboardStatistics?.[0]?.PendingFeePayments || 0,
      icon: IndianRupee,
      color: "#7c3aed",
      background: "#f5f3ff",
    },
  ], [getAdmissionDashboardStatistics]);

  const [getGridFilters, setGridFilters] = useState({
    AdmissionNo: "",
    AcademicYear: "",
    AdmissionDate: "",
    StudentName: "",
    Standard: "",
    Gender: "",
    DateOfBirth: "",
    BloodGroup: "",
    Religion: "",
    Category: "",
    MobileNo: "",
    AadhaarNo: "",
    FatherName: "",
    FatherMobileNo: "",
    FatherEmailID: "",
    FatherOccupation: "",
    MotherName: "",
    MotherMobileNo: "",
    MotherEmailID: "",
    MotherOccupation: "",
    Address: "",
    Pincode: "",
    FeePlan: "",
    InstallmentPlan: "",
    DocumentStatus: "",
    FeeStatus: "",
    StudentStatus: ""
  });

  const [debouncedFilters, setDebouncedFilters] = useState(getGridFilters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(getGridFilters);
    }, 500);
    return () => clearTimeout(timer);
  }, [getGridFilters]);

  const gridFilterPayload = Object.fromEntries(
    Object.entries(debouncedFilters).map(([key, value]) => [
      key,
      value?.trim() ? value : null
    ])
  );


  const [searchFilters, setSearchFilters] = useState({
    AcademicYear: "",
    FilterStandard: "",
    FilterGender: "",
    FilterDocumentStatus: "",
    FilterFeeStatus: "",
    // AdmissionDateFrom: "",
    // AdmissionDateTo: ""
  });

  const searchFilterPayload = Object.fromEntries(
    Object.entries(searchFilters).map(([key, value]) => [
      key,
      value?.trim() ? value : null
    ])
  );

  const finalPayload = {
    ...gridFilterPayload,
    ...searchFilterPayload
  };



  const handleSearch = () => {

    fetch("https://localhost:44377/api/admission/getStudentAdmissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalPayload)
    })
      .then((res) => res.json())
      .then((data) => setStudentAdmissionList(data))
      .catch((err) => console.error(err));

    fetch("https://localhost:44377/api/admission/getAdmissionDashboardStatistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalPayload)
    })
      .then((res) => res.json())
      .then((data) => setAdmissionDashboardStatistics(data))
      .catch((err) => console.error(err));


  };

  const handleReset = () => {

    const resetFilterPayload2 = Object.keys(searchFilterPayload).reduce((acc, key) => {
      acc[key] = null;
      return acc;
    }, {});

    const finalPayload = {
      ...gridFilterPayload,
      ...resetFilterPayload2
    };
    setSearchFilters({
      AcademicYear: "",
      FilterStandard: "",
      FilterGender: "",
      FilterDocumentStatus: "",
      FilterFeeStatus: ""
      // AdmissionDateFrom: null,
      // AdmissionDateTo: null
    });

    // setAdmissionDateRange({
    //   from: null,
    //   to: null
    // });

    // setCurrentPage(1);



    fetch("https://localhost:44377/api/admission/getStudentAdmissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalPayload)
    })
      .then((res) => res.json())
      .then((data) => setStudentAdmissionList(data))
      .catch((err) => console.error(err));

    fetch("https://localhost:44377/api/admission/getAdmissionDashboardStatistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalPayload)
    })
      .then((res) => res.json())
      .then((data) => setAdmissionDashboardStatistics(data))
      .catch((err) => console.error(err));



  };

  const handleSaveStudentAdmissions = async () => {
    if (!selectedStudent) return;

    const payload = {
      AdmissionNo: selectedStudent.admissionNo || null,
      AcademicYear: selectedStudent.academicYear || null,
      AdmissionDate: selectedStudent.admissionDate || null,
      Standard: selectedStudent.standard || null,
      StudentName: selectedStudent.studentName || null,
      Gender: selectedStudent.gender || null,
      DateOfBirth: selectedStudent.dateOfBirth || null,
      BloodGroup: selectedStudent.bloodGroup || null,
      Religion: selectedStudent.religion || null,
      Category: selectedStudent.category || null,
      MobileNo: selectedStudent.mobile || null,
      AadhaarNo: selectedStudent.aadhaarNo || null,
      Address: selectedStudent.address || null,
      Pincode: selectedStudent.pincode || null,
      StudentStatus: selectedStudent.studentStatus || null,
      FatherName: selectedStudent.fatherName || null,
      FatherMobileNo: selectedStudent.fatherMobileNo || null,
      FatherEmailID: selectedStudent.fatherEmailId || null,
      FatherOccupation: selectedStudent.fatherOccupation || null,
      MotherName: selectedStudent.motherName || null,
      MotherMobileNo: selectedStudent.motherMobileNo || null,
      MotherEmailID: selectedStudent.motherEmailId || null,
      MotherOccupation: selectedStudent.motherOccupation || null,
      FeePlan: selectedStudent.feePlan || null,
      InstallmentPlan: selectedStudent.installmentPlan || null,
      // TotalFeeAmount: selectedStudent.totalFeeAmount || null,
      // ExtraCharges: selectedStudent.extraCharges || null,
      // PayableAmount: selectedStudent.payableAmount || null,
      // PerInstallmentAmount: selectedStudent.perInstallmentAmount || null,
      // PaymentStatus: selectedStudent.paymentStatus || null,
      //FeeRemarks: selectedStudent.feeRemarks || null,
      Documents: JSON.stringify(documents || []),
    };

    try {
      const saveResponse = await fetch(
        "https://localhost:44377/api/admission/saveStudentAdmissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const saveData = await saveResponse.json();

      console.log("Save Success", saveData);


      const getResponse = await fetch(
        "https://localhost:44377/api/admission/getStudentAdmissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPayload),
        }
      );

      const getData = await getResponse.json();

      setStudentAdmissionList(getData);

      // Dashboard refresh
      const dashboardResponse = await fetch(
        "https://localhost:44377/api/admission/getAdmissionDashboardStatistics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPayload),
        }
      );

      const dashboardData = await dashboardResponse.json();

      setAdmissionDashboardStatistics(dashboardData);

      setShowModal(false);

    } catch (err) {
      console.error(err);
    }

  };

  const columns = useMemo(
    () => [
      { key: "AdmissionNo", label: "Admission No.", minWidth: "100px", visible: true },
      { key: "AcademicYear", label: "Academic Year", minWidth: "100px", visible: true },
      { key: "AdmissionDate", label: "Admission Date", minWidth: "100px", visible: true },
      { key: "StudentName", label: "Student Name", minWidth: "100px", visible: true },
      { key: "Standard", label: "Standard", minWidth: "80px", visible: true },
      { key: "Gender", label: "Gender", minWidth: "80px", visible: true },
      { key: "DateOfBirth", label: "Date of Birth", minWidth: "120px", visible: true },
      { key: "BloodGroup", label: "Blood Group", minWidth: "80px", visible: true },
      { key: "Religion", label: "Religion", minWidth: "80px", visible: true },
      { key: "Category", label: "Category", minWidth: "80px", visible: true },
      { key: "MobileNo", label: "Mobile No.", minWidth: "80px", visible: true },
      { key: "AadhaarNo", label: "Aadhaar No.", minWidth: "100px", visible: true },
      { key: "FatherName", label: "Father Name", minWidth: "100px", visible: true },
      { key: "FatherMobileNo", label: "Father Mobile No.", minWidth: "100px", visible: true },
      { key: "FatherEmailID", label: "Father Email ID", minWidth: "100px", visible: true },
      { key: "FatherOccupation", label: "Father Occupation", minWidth: "100px", visible: true },
      { key: "MotherName", label: "Mother Name", minWidth: "100px", visible: true },
      { key: "MotherMobileNo", label: "Mother Mobile No.", minWidth: "100px", visible: true },
      { key: "MotherEmailID", label: "Mother Email ID", minWidth: "100px", visible: true },
      { key: "MotherOccupation", label: "Mother Occupation", minWidth: "100px", visible: true },
      { key: "Address", label: "Address", minWidth: "100px", visible: true },
      { key: "Pincode", label: "Pincode", minWidth: "110px", visible: true },
      { key: "FeePlan", label: "Fee Plan", minWidth: "100px", visible: true },
      { key: "InstallmentPlan", label: "Fee Installment Plan", minWidth: "100px", visible: true },
      { key: "DocumentStatus", label: "Document Status", minWidth: "100px", visible: true },
      { key: "FeeStatus", label: "Fee Status", minWidth: "100px", visible: true },
      { key: "StudentStatus", label: "Student Status", minWidth: "100px", visible: true },
      {
        key: "action",
        label: "Action",
        minWidth: "120px",
        visible: true,
        filterable: false,
        render: (item) => (
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center"
              style={actionButtonStyle}
              title="View admission"
              aria-label={`View admission for ${item.studentName}`}
            >
              <Eye size={16} />
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-success d-inline-flex align-items-center justify-content-center"
              style={actionButtonStyle}
              title="Edit admission"
              aria-label={`Edit admission for ${item.studentName}`}
              onClick={() => {
                const normalizeStudent = (s) => ({
                  admissionNo: s.AdmissionNo || s.admissionNo || "",
                  academicYear: s.AcademicYear || s.academicYear || "",

                  admissionDate: formatDate(s.AdmissionDate || s.admissionDate),
                  standard: s.Standard || s.standard || "",
                  studentName: s.StudentName || s.studentName || "",
                  gender: s.Gender || s.gender || "",
                  dateOfBirth: formatDate(s.DateOfBirth || s.dateOfBirth),
                  bloodGroup: s.BloodGroup || s.bloodGroup || "",
                  religion: s.Religion || s.religion || "",
                  category: s.Category || s.category || "",
                  mobile: s.MobileNo || s.mobileNo || s.mobile || "",
                  aadhaarNo: s.AadhaarNo || s.aadhaarNo || "",
                  address: s.Address || s.address || "",
                  pincode: s.Pincode || s.pincode || "",
                  studentStatus: s.StudentStatus || s.studentStatus || "",
                  fatherName: s.FatherName || s.fatherName || "",
                  fatherMobileNo: s.FatherMobileNo || s.fatherMobileNo || "",
                  fatherEmailId: s.FatherEmailID || s.fatherEmailId || s.FatherEmailId || "",
                  fatherOccupation: s.FatherOccupation || s.fatherOccupation || "",
                  motherName: s.MotherName || s.motherName || "",
                  motherMobileNo: s.MotherMobileNo || s.motherMobileNo || "",
                  motherEmailId: s.MotherEmailID || s.motherEmailId || s.MotherEmailId || "",
                  motherOccupation: s.MotherOccupation || s.motherOccupation || "",
                  feePlan: s.FeePlan || s.feePlan || "",
                  installmentPlan: s.InstallmentPlan || s.installmentPlan || "",
                  totalFeeAmount: s.TotalFeeAmount || s.totalFeeAmount || "",
                  extraCharges: s.ExtraCharges || s.extraCharges || "",
                  payableAmount: s.PayableAmount || s.payableAmount || "",
                  perInstallmentAmount: s.PerInstallmentAmount || s.perInstallmentAmount || "",
                  paymentStatus: s.PaymentStatus || s.paymentStatus || "",
                  feeRemarks: s.FeeRemarks || s.feeRemarks || "",
                  documents: s.Documents || s.documents || [],
                });

                setSelectedStudent(normalizeStudent(item));
                setActiveTab("student");
                setDocuments(item.documents ? item.documents.map(d => ({ ...d })) : documentsTemplate.map(d => ({ ...d })));
                setShowModal(true);
              }}
            >
              <Pencil size={16} />
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center"
              style={actionButtonStyle}
              title="Delete admission"
              aria-label={`Delete admission for ${item.studentName}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [actionButtonStyle]
  );



  // Get Inquiry List
  useEffect(() => {



    fetch("https://localhost:44377/api/admission/getStudentAdmissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalPayload)
    })
      .then((res) => res.json())
      .then((data) => setStudentAdmissionList(data))
      .catch((err) => console.error(err));

    fetch("https://localhost:44377/api/admission/getAdmissionDashboardStatistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalPayload)
    })
      .then((res) => res.json())
      .then((data) => setAdmissionDashboardStatistics(data))
      .catch((err) => console.error(err));



  }, [debouncedFilters]);


  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.reduce(
      (acc, column) => ({
        ...acc,
        [column.key]: column.visible ?? true,
      }),
      {}
    )
  );
  const visibleTableColumns = columns.filter((column) => visibleColumns[column.key]);
  const getColumnMinWidth = useCallback((column) => Number.parseInt(column.minWidth, 10) || 120, []);
  const getColumnWidth = useCallback(
    (column) => columnWidths[column.key] || getColumnMinWidth(column),
    [columnWidths, getColumnMinWidth]
  );
  const tableWidth = visibleTableColumns.reduce(
    (total, column) => total + getColumnWidth(column),
    0
  );
  const getColumnStyle = useCallback(
    (column) => {
      const width = getColumnWidth(column);

      return {
        width: `${width}px`,
        minWidth: `${getColumnMinWidth(column)}px`,
        maxWidth: `${width}px`,
      };
    },
    [getColumnMinWidth, getColumnWidth]
  );

  const startColumnResize = useCallback(
    (event, column) => {
      event.preventDefault();
      event.stopPropagation();

      const pointer = event.touches?.[0] || event;
      const startX = pointer.clientX;
      const startWidth = getColumnWidth(column);
      const minWidth = getColumnMinWidth(column);

      const handlePointerMove = (moveEvent) => {
        const movePointer = moveEvent.touches?.[0] || moveEvent;
        const nextWidth = Math.max(minWidth, startWidth + movePointer.clientX - startX);

        setColumnWidths((widths) => ({
          ...widths,
          [column.key]: nextWidth,
        }));
      };

      const stopResize = () => {
        document.body.classList.remove("admission-column-resizing");
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", stopResize);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", stopResize);
      };

      document.body.classList.add("admission-column-resizing");
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", stopResize);
      window.addEventListener("touchmove", handlePointerMove);
      window.addEventListener("touchend", stopResize);
    },
    [getColumnMinWidth, getColumnWidth]
  );

  const toDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseDateKey = (dateKey) => {
    if (!dateKey) {
      return null;
    }

    const [year, month, day] = dateKey.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDateKey = (dateKey) => {
    const date = parseDateKey(dateKey);

    if (!date) {
      return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  const admissionRangeValue = admissionDateRange.from && admissionDateRange.to
    ? `${formatDateKey(admissionDateRange.from)} - ${formatDateKey(admissionDateRange.to)}`
    : admissionDateRange.from
      ? formatDateKey(admissionDateRange.from)
      : "";



  const getCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingBlankDays = firstDay.getDay();

    return [
      ...Array.from({ length: leadingBlankDays }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1)),
    ];
  };

  const changeCalendarMonth = (offset) => {
    setCalendarMonth((month) => new Date(month.getFullYear(), month.getMonth() + offset, 1));
  };

  const selectAdmissionDate = (dateKey) => {
    setAdmissionDateRange((range) => {
      if (!range.from || range.to) {
        return { from: dateKey, to: "" };
      }

      if (new Date(dateKey).getTime() < new Date(range.from).getTime()) {
        return { from: dateKey, to: range.from };
      }

      return { ...range, to: dateKey };
    });
    setHoveredAdmissionDate("");
    setCurrentPage(1);
  };

  const isAdmissionDateInRange = (dateKey) => {
    if (!admissionDateRange.from) {
      return false;
    }

    const startTime = new Date(admissionDateRange.from).getTime();
    const endKey = admissionDateRange.to || hoveredAdmissionDate;

    if (!endKey) {
      return dateKey === admissionDateRange.from;
    }

    const endTime = new Date(endKey).getTime();
    const dateTime = new Date(dateKey).getTime();
    return dateTime >= Math.min(startTime, endTime) && dateTime <= Math.max(startTime, endTime);
  };

  const goToPreviousTab = useCallback(() => {
    const tabs = ["student", "parent", "fees", "documents"];
    const idx = tabs.indexOf(activeTab);

    if (idx > 0) {
      setActiveTab(tabs[idx - 1]);
    } else {
      setShowModal(false);
    }
  }, [activeTab]);

  const filteredAdmissions = getStudentAdmissionList;



  const totalPages = Math.max(1, Math.ceil(filteredAdmissions.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = filteredAdmissions.length === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endIndex = Math.min(activePage * pageSize, filteredAdmissions.length);
  const paginatedAdmissions = filteredAdmissions.slice(startIndex - 1, endIndex);

  const toggleColumn = (key) => {
    setVisibleColumns((visible) => ({
      ...visible,
      [key]: !visible[key],
    }));
  };

  const showAllColumns = () => {
    setVisibleColumns(
      columns.reduce((visible, column) => ({ ...visible, [column.key]: true }), {})
    );
  };

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };


  const handleDownloadExcel = async () => {
    try {
       console.log("Download button clicked");
      const response = await fetch(

        "https://localhost:44377/api/admission/excelDownloadStudentAdmissions",
        {
          
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPayload),
        }
      );

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "StudentAdmissions.xlsx";

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  const admissionModal = showModal ? (

    <div
      className="modal fade show d-block admission-modal"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)"
      }}
    >

      <div className="modal-dialog modal-xl">

        <div className="modal-content border-0 shadow admission-modal-content">

          {/* HEADER */}


          <div className="modal-header">

            <h5 className="fw-bold modal-title">

              {selectedStudent
                ? "Edit Student Admission"
                : "New Student Admission"}

            </h5>

            <button
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>

          </div>

          {/* BODY */}

          <div className="modal-body">

            {/* TABS */}

            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === "student" ? "active" : ""}`}
                  onClick={() => setActiveTab("student")}
                >
                  Student Information
                </button>
              </li>

              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === "parent" ? "active" : ""}`}
                  onClick={() => setActiveTab("parent")}
                >
                  Parent Information
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === "fees" ? "active" : ""}`}
                  onClick={() => setActiveTab("fees")}
                >
                  Fee Section
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === "documents" ? "active" : ""}`}
                  onClick={() => setActiveTab("documents")}
                >
                  Document Section
                </button>
              </li>
            </ul>

            {/* STUDENT INFO */}

            {activeTab === "student" && (
              <div className="section-3d">
                <h6 className="fw-semibold mb-3">Student Information</h6>
                <div className="row g-3">

                  <div className="col-md-3">
                    <label className="form-label">
                      Admission No
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.admissionNo || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), admissionNo: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Academic Year
                    </label>

                    <select className="form-select" value={selectedStudent?.academicYear || "2024-25"} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), academicYear: e.target.value }))}>
                      <option>2024-25</option>
                      <option>2025-26</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Admission Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={selectedStudent?.admissionDate || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), admissionDate: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Standard
                    </label>

                    <select className="form-select" value={selectedStudent?.standard || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), standard: e.target.value }))}>
                      <option value="">Select Standard</option>
                      <option>5th Standard</option>
                      <option>6th Standard</option>
                      <option>7th Standard</option>
                      <option>8th Standard</option>
                      <option>9th Standard</option>
                      <option>10th Standard</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Student Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.studentName || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), studentName: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Gender
                    </label>

                    <select className="form-select" value={selectedStudent?.gender || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), gender: e.target.value }))}>
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Date Of Birth
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={selectedStudent?.dateOfBirth || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), dateOfBirth: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Blood Group
                    </label>

                    <select className="form-select" value={selectedStudent?.bloodGroup || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), bloodGroup: e.target.value }))}>
                      <option value="">Select Blood Group</option>
                      <option>O+</option>
                      <option>A+</option>
                      <option>AB+</option>
                      <option>O-</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Religion
                    </label>

                    <select className="form-select" value={selectedStudent?.religion || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), religion: e.target.value }))}>
                      <option value="">Select Religion</option>
                      <option>Hinduism</option>
                      <option>Buddhism</option>
                      <option>Jainism</option>
                      <option>Sikhism</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Category
                    </label>

                    <select className="form-select" value={selectedStudent?.category || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), category: e.target.value }))}>
                      <option value="">Select Category</option>
                      <option>General</option>
                      <option>OBC</option>
                      <option>SC</option>
                      <option>ST</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mobile No
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.mobile || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), mobile: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Aadhaar No
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.aadhaarNo || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), aadhaarNo: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Address
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.address || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), address: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Pincode
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.pincode || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), pincode: e.target.value }))}
                    />
                  </div>


                  <div className="col-md-3">
                    <label className="form-label">
                      Student Status
                    </label>

                    <select className="form-select" value={selectedStudent?.studentStatus || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), studentStatus: e.target.value }))}>
                      <option value="">Select Status</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                </div>
              </div>


            )}

            {activeTab === "parent" && (
              <div className="section-3d">
                <h6 className="fw-semibold mb-3">Parent Information</h6>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label">
                      Father Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.fatherName || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), fatherName: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Father Mobile No
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.fatherMobileNo || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), fatherMobileNo: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Father Email ID
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.fatherEmailId || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), fatherEmailId: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Father Occupation
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.fatherOccupation || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), fatherOccupation: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mother Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.motherName || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), motherName: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mother Mobile No
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.motherMobileNo || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), motherMobileNo: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mother Email ID
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      value={selectedStudent?.motherEmailId || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), motherEmailId: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mother Occupation
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedStudent?.motherOccupation || ""}
                      onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), motherOccupation: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="student-document-style section-3d">
                <h6 className="fw-semibold mb-2">Document Section</h6>
                <div className="table-shell">
                  <table className="table table-sm table-striped align-middle document-table mb-0">
                    <thead>
                      <tr>
                        <th>Document Name</th>
                        <th>Category</th>
                        <th>Required</th>
                        <th>Uploaded File</th>
                        <th>Upload Date</th>
                        <th>Status</th>
                        <th>Remarks</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc, idx) => (
                        <tr key={doc.id || idx} className={idx === 0 ? "active-row" : undefined}>
                          <td className="fw-medium">{doc.docName}</td>
                          <td >{doc.category || "-"}</td>
                          <td>{doc.required ? <span className="badge bg-success">Yes</span> : <span className="badge bg-secondary">No</span>}</td>
                          <td>
                            {doc.fileName ? (
                              <a href={doc.fileUrl || '#'} target="_blank" rel="noreferrer" className="text-decoration-none">{doc.fileName}</a>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>

                          <td>
                            {doc.uploadDate}
                          </td>

                          <td>
                            {doc.status === "Verified" ? (
                              <span className="badge bg-success">Verified</span>
                            ) : doc.status === "Pending" ? (
                              <span className="badge bg-warning text-dark">Pending</span>
                            ) : doc.status === "Missing" ? (
                              <span className="badge bg-danger">Missing</span>
                            ) : doc.status === "Not Required" ? (
                              <span className="badge bg-secondary">Not Required</span>
                            ) : (
                              <span className="badge bg-secondary">Not Uploaded</span>
                            )}
                          </td>
                          <td>
                            {editingRemarkIndex === idx ? (
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={doc.remark || ""}
                                autoFocus
                                onChange={(e) => handleDocFieldChange(idx, "remark", e.target.value)}
                                onBlur={() => setEditingRemarkIndex(null)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    setEditingRemarkIndex(null);
                                  }
                                }}
                              />
                            ) : (
                              <span
                                className="text-truncate d-inline-block"
                                style={{ maxWidth: "180px", cursor: "pointer" }}
                                onDoubleClick={() => setEditingRemarkIndex(idx)}
                                title={doc.remark || "Double click to edit"}
                              >
                                {doc.remark || "-"}
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <input
                                type="file"
                                style={{ display: "none" }}
                                ref={(el) => (fileInputsRef.current[idx] = el)}
                                onChange={(e) => handleFileChange(idx, e)}
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-success d-inline-flex align-items-center justify-content-center"
                                style={actionButtonStyle}
                                title="Upload"
                                aria-label={`Upload ${doc.docName}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUploadClick(idx);
                                }}
                              >
                                <Upload size={14} />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleDownloadFile(idx)}
                                title="Download"
                                disabled={!doc.fileUrl}
                              >
                                <Download size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "fees" && (
              <div className="section-3d">
                <h6 className="fw-semibold mb-3">Fee Section</h6>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label">Fee Plan</label>
                    <select className="form-select form-select-sm" value={selectedStudent?.feePlan || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), feePlan: e.target.value }))}>
                      <option value="">Select Fee Plan</option>
                      <option>Annual</option>
                      <option>Semester</option>
                      <option>Quarterly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Installment Plan</label>
                    <select className="form-select form-select-sm" value={selectedStudent?.installmentPlan || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), installmentPlan: e.target.value }))}>
                      <option value="">Select Installment</option>
                      <option>One Installments</option>
                      <option>Two Installments</option>
                      <option>Four Installments</option>
                      <option>Per Month Installments</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Total Fee Amount</label>
                    <input type="number" className="form-control form-control-sm" placeholder="Enter amount" value={selectedStudent?.totalFeeAmount || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), totalFeeAmount: e.target.value }))} />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Discount</label>
                    <input type="number" className="form-control form-control-sm" placeholder="Enter amount" value={selectedStudent?.discount || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), discount: e.target.value }))} />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Extra Charges</label>
                    <input type="number" className="form-control form-control-sm" placeholder="Enter amount" value={selectedStudent?.extraCharges || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), extraCharges: e.target.value }))} />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Payable Amount</label>
                    <input type="number" className="form-control form-control-sm" placeholder="Enter amount" value={selectedStudent?.payableAmount || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), payableAmount: e.target.value }))} />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Per Installment Amount</label>
                    <input type="number" className="form-control form-control-sm" placeholder="Auto-calculated" disabled value={selectedStudent?.perInstallmentAmount || ""} />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Payment Status</label>
                    <select className="form-select form-select-sm" value={selectedStudent?.paymentStatus || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), paymentStatus: e.target.value }))}>
                      <option value="">Select Status</option>
                      <option>Paid</option>
                      <option>Partial</option>
                      <option>Pending</option>
                      <option>Overdue</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Fee Remarks</label>
                    <input type="text" className="form-control form-control-sm" placeholder="Enter fee/payment remarks" value={selectedStudent?.feeRemarks || ""} onChange={(e) => setSelectedStudent(prev => ({ ...(prev || {}), feeRemarks: e.target.value }))} />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* FOOTER */}

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={goToPreviousTab}
              aria-label="Previous"
              title="Previous"
              disabled={activeTab === "student"}
              aria-disabled={activeTab === "student"}
            >
              Previous
            </button>

            <button
              type="button"
              className="btn btn-primary primary-action"
              onClick={() => {
                if (activeTab === "student") {
                  setActiveTab("parent");
                } else if (activeTab === "parent") {
                  setActiveTab("fees");
                } else if (activeTab === "fees") {
                  setActiveTab("documents");
                } else {
                  handleSaveStudentAdmissions();
                }
              }}
            >
              {activeTab === "documents" ? "Save" : "Next"}
            </button>

          </div>

        </div>

      </div>

    </div>

  ) : null;

  return (
    <div className="container-fluid admission-page w-100">

      <style>{`
        .admission-page {
          min-height: calc(100vh - 20px);
          background: #f6f8fb;
          color: #172033;
          -ms-overflow-style: auto; /* IE and Edge */
          scrollbar-width: auto; /* Firefox */
          scrollbar-color: rgba(0,0,0,0.12) transparent; /* Firefox thumb and track */
        }

        .admission-page::-webkit-scrollbar { width: 8px; height: 8px; }
        .admission-page::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 6px; }
        .admission-page::-webkit-scrollbar-track { background: transparent; }

        .admission-page .page-header {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-left: 4px solid #2563eb;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 10px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .admission-page .page-title {
          color: #1d4ed8;
          font-size: 1.25rem;
          line-height: 1.2;
        }

        .admission-page .breadcrumb-lite {
          color: #64748b;
        }

        .admission-page .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 8px;
          color: #1e3a8a;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .admission-page .section-label::before {
          content: "";
          width: 6px;
          height: 18px;
          border-radius: 999px;
          background: #2563eb;
        }

        .admission-page .summary-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(150px, 1fr));
          gap: 10px;
          margin-bottom: 10px;
        }

        .admission-page .summary-card {
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

        .admission-page .summary-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .admission-page .summary-value {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.1;
        }

        .admission-page .summary-title {
          color: #64748b;
          font-size: 0.76rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .admission-page .filter-card,
        .admission-page .grid-card {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .admission-page .filter-card {
          margin-bottom: 10px;
        }

        .admission-page .filter-card .card-body,
        .admission-page .grid-card .card-body {
          padding: 6px 10px !important;
        }

        .admission-page .filter-actions .btn,
        .admission-page .icon-btn {
          width: 31px;
          height: 31px;
          padding: 0;
          border-radius: 7px;
        }

        .admission-page .primary-action {
          min-height: 32px;
          border-radius: 7px;
          font-weight: 700;
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18);
        }

        .admission-page .table-shell {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          height: 350px; 
          overflow-x: auto;
          overflow-y: auto; /* allow vertical scrolling when needed */
          max-height: calc(100vh - 300px);
          -ms-overflow-style: auto;
          scrollbar-width: auto;
        }

        .admission-page .table-shell::-webkit-scrollbar { width: 8px; height: 10px; }
        .admission-page .table-shell::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 6px; }
        .admission-page .table-shell::-webkit-scrollbar-track { background: transparent; }

        .admission-page .table-shell.with-column-menu {
          overflow-y: auto;
        }

        .admission-page .admission-table {
          table-layout: fixed;
        }

        .admission-page .admission-table th,
        .admission-page .admission-table td {
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }

        .admission-page .admission-table thead tr:first-child th {
          background: #f8fafc;
          color: #0f172a;
          border-bottom: none; /* remove border to avoid gap with filter row */
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0;
          height: 36px; /* explicit header height to align filter row */
          padding: 8px 6px;
        }
        /* Keep header and filter row visible when scrolling the table */
        .admission-page .table-shell { position: relative; }
        .admission-page .admission-table thead tr:first-child th {
          position: sticky !important;
          top: 0 !important;
          z-index: 99 !important;
          background: #f8fafc !important;
        }
        .admission-page .admission-table thead tr:nth-child(2) th {
          position: sticky !important;
          top: 36px !important; /* sits directly below the header row */
          z-index: 98 !important;
          background: #ffffff !important;
          border-bottom: 1px solid #e6ebf2; /* keep separator under filters */
          padding: 2px 6px !important;
          height: 30px;
        }
          

        .admission-page .column-resize-handle {
          position: absolute;
          top: 0;
          right: -4px;
          width: 8px;
          height: 100%;
          cursor: col-resize;
          touch-action: none;
          z-index: 12;
        }

        .admission-page .column-resize-handle::after {
          content: "";
          position: absolute;
          top: 9px;
          bottom: 9px;
          left: 3px;
          width: 2px;
          border-radius: 999px;
          background: transparent;
        }

        .admission-page .column-resize-handle:hover::after {
          background: #2563eb;
        }

        body.admission-column-resizing {
          cursor: col-resize;
          user-select: none;
        }

        .admission-page .admission-table thead tr:nth-child(2) th {
          background: #ffffff;
          border-bottom: 1px solid #e6ebf2;
        }

        .admission-page .admission-table tbody td {
          color: #1f2937;
          border-bottom-color: #edf2f7;
        }

        .admission-page .admission-table tbody tr:hover td {
          background: #f8fbff;
        }

        .admission-page .badge {
          border-radius: 999px;
          padding: 0.35em 0.65em;
          font-weight: 700;
        }

        @media (max-width: 1280px) {
          .admission-page .summary-grid {
            grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .admission-page .page-header {
            align-items: flex-start !important;
          }

          .admission-page .breadcrumb-lite {
            display: none !important;
          }
        }

        /* Document-table styles copied from StudentDocument.jsx to match theme and font-size */
        /* Reusable 3D section styling (matches document section/grid visuals) */
        .admission-page .section-3d {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-left: 2px solid #2563eb;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 12px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
        }

        .admission-page .section-3d h6 {
          margin-top: 0;
          margin-bottom: 8px;
          color: #1d4ed8;
          font-weight: 700;
        }
        .admission-page .student-document-style {
          
          font-size: 0.86rem;
          color: #1f2937;
        }

        .admission-page .student-document-style .table-shell {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          overflow: auto;
           height: 180px;
        }

        .admission-page .column-menu {
          max-height: 200px;
          overflow-y: auto;
        }

        .admission-page .column-menu::-webkit-scrollbar { width: 8px; }
        .admission-page .column-menu::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 6px; }
        /* Tighten spacing and reduce font size for column toggle items */
        .admission-page .column-menu label {
          font-size: 0.72rem; /* slightly smaller than Bootstrap 'small' */
          padding: 4px 6px; /* reduce vertical padding */
          gap: 6px; /* smaller gap between checkbox and text */
          margin: 0; 
        }

        .admission-page .column-menu label .form-check-input {
          width: 14px;
          height: 14px;
          margin-right: 6px;
        }
        /* Compact action buttons inside the column popup */
        .admission-page .column-popup-action {
          font-size: 0.72rem;
          padding: 4px 8px;
          display: inline-block;
          width: auto !important;
          min-width: 0 !important;
          line-height: 1;
        }

        .admission-page .document-table {
          min-width: 980px;
          table-layout: auto;
        }

        .admission-page .document-table th,
        .admission-page .document-table td {
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }

        .admission-page .document-table thead th {
          background: #f8fafc;
          color: #0f172a;
          border-bottom: 1px solid #dbe3ee;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0;
        }

        .admission-page .document-table tbody td {
          color: #1f2937;
          border-bottom-color: #edf2f7;
        }

        .admission-page .document-table tbody tr:hover td,
        .admission-page .document-table tbody tr.active-row td {
          background: #f8fbff;
        }

        .admission-page .student-document-style .badge {
          border-radius: 999px;
          padding: 0.35em 0.65em;
          font-weight: 700;
        }

        /* Modal styling to match page header and spacing */
        .admission-page .admission-modal .modal-dialog {
          max-width: 1100px;
        }

        .admission-page .admission-modal .modal-content.admission-modal-content {
          background: transparent;
          box-shadow: none;
        }

        .admission-page .admission-modal .modal-header {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-left: 4px solid #2563eb;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          padding: 10px 14px;
          margin: 0 0 10px 0; /* small gap below header */
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
          align-items: center;
        }

        .admission-page .admission-modal .modal-header .modal-title {
          color: #1d4ed8;
          font-size: 1.125rem;
          line-height: 1.2;
          margin: 0;
          font-weight: 800;
        }

        .admission-page .admission-modal .modal-body {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          padding: 12px;
          box-shadow: 0 8px 22px rgba(15, 23, 42, 0.03);
        }

        .admission-page .admission-modal .modal-footer {
          background: transparent;
          border-top: none;
          gap: 8px;
        }

        /* Make only the Previous and Next/Save buttons opaque in the footer */
        .admission-page .admission-modal .modal-footer .btn.btn-secondary {
          background: #ffffff;
          border: 1px solid #e6ebf2;
          color: #0f172a;
          box-shadow: 0 6px 14px rgba(15, 23, 42, 0.04);
        }

        .admission-page .admission-modal .modal-footer .btn.primary-action {
          background: #2563eb;
          border: 1px solid rgba(37,99,235,0.18);
          color: #fff;
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18);
        }

        .admission-page .admission-modal .primary-action {
          min-height: 36px;
          border-radius: 7px;
          font-weight: 700;
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18);
          padding: 6px 14px;
        }

        /* Ensure Cancel and Next have identical sizing */
        .admission-page .admission-modal .modal-footer .btn {
          min-height: 36px;
          border-radius: 7px;
          padding: 6px 14px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

/* Reduce filter row height */
.admission-page .admission-table thead tr:nth-child(2) th {
    padding: 2px 4px !important;
    height: 30px;
    vertical-align: middle;
}

/* Reduce input height */
.admission-page .admission-table thead tr:nth-child(2) .form-control,
.admission-page .admission-table thead tr:nth-child(2) .form-select {
    height: 24px !important;
    min-height: 24px;
    padding: 2px 6px;
    font-size: 12px;
}

/* Reduce search icon box */
.admission-page .admission-table thead tr:nth-child(2) .input-group-text {
    height: 24px;
    padding: 0 6px;
    font-size: 12px;
}

/* Remove extra spacing */
.admission-page .admission-table thead tr:nth-child(2) .input-group {
    margin: 0;
}

.admission-page .admission-table tbody td {
    font-size: 12px;
    padding: 2px 6px !important;
    line-height: 1.1;
}

.admission-page .admission-table tbody tr {
    height: 26px;
}

.admission-page .admission-table tbody .btn {
    width: 22px;
    height: 22px;
    padding: 0;
}

.admission-page .admission-table tbody svg {
    width: 12px;
    height: 12px;
}


      `}</style>

      {/* HEADER */}

      <div className="page-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <div>
          <h3 className="page-title fw-bold mb-0">
            Student Admission List
          </h3>
        </div>

        <div className="breadcrumb-lite d-flex align-items-center gap-2 small">
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
          <span>/</span>
          <span>Admission</span>
          <span>/</span>
          <span>Student Admission</span>
        </div>
      </div>

      <h5 className="section-label">
        Admission Statistics
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

      {/* Main FILTERS */}

      <h5 className="section-label">
        Filter
      </h5>

      <div className="filter-card">

        <div className="card-body">

          <div className="d-flex align-items-end gap-2 flex-wrap overflow-visible pb-1">

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Academic Year
              </label>

              <select className="form-select form-select-sm">
                <option>2024-25</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Standard
              </label>

              <select
                className="form-select form-select-sm"
                value={searchFilters.FilterStandard}
                onChange={(e) =>
                  setSearchFilters(prev => ({
                    ...prev,
                    FilterStandard: e.target.value
                  }))
                }
              >
                <option value="">All Standards</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Gender
              </label>

              <select
                className="form-select form-select-sm"
                value={searchFilters.FilterGender}
                onChange={(e) =>
                  setSearchFilters(prev => ({
                    ...prev,
                    FilterGender: e.target.value
                  }))
                }
              >
                <option value="">All Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Document Status
              </label>

              <select
                className="form-select form-select-sm"
                value={searchFilters.FilterDocumentStatus}
                onChange={(e) =>
                  setSearchFilters(prev => ({
                    ...prev,
                    FilterDocumentStatus: e.target.value
                  }))
                }
              >
                <option>All Document Status</option>
                <option>Pending</option>
                <option>Verified</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Fee Status
              </label>

              <select
                className="form-select form-select-sm"
                value={searchFilters.FilterFeeStatus}
                onChange={(e) =>
                  setSearchFilters(prev => ({
                    ...prev,
                    FilterFeeStatus: e.target.value
                  }))
                }
              >
                <option>All Fee Status</option>
                <option>Paid</option>
                <option>Partial</option>
                <option>Pending</option>
              </select>
            </div>

            <div style={dateFilterStyle}>
              <label className="form-label small mb-1">
                Admission Date Range
              </label>

              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={admissionRangeValue}
                  readOnly
                  placeholder="Select date range"
                  onClick={() => setShowAdmissionCalendar((show) => !show)}
                  aria-label="Admission date range"
                  style={{ cursor: "pointer", paddingRight: "34px" }}
                />

                <button
                  type="button"
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y p-0 me-2 text-secondary"
                  aria-label="Open admission date calendar"
                  title="Open calendar"
                  onClick={() => setShowAdmissionCalendar((show) => !show)}
                >
                  <CalendarDays size={16} />
                </button>

                {showAdmissionCalendar && (
                  <div
                    className="position-absolute bg-white border shadow-sm p-2"
                    style={{
                      zIndex: 99999,
                      top: "36px",
                      left: 0,
                      width: "292px",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                        style={{ width: "30px", height: "30px", padding: 0 }}
                        aria-label="Previous month"
                        onClick={() => changeCalendarMonth(-1)}
                      >
                        <ChevronLeft size={15} />
                      </button>

                      <strong className="small">
                        {calendarMonth.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </strong>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                        style={{ width: "30px", height: "30px", padding: 0 }}
                        aria-label="Next month"
                        onClick={() => changeCalendarMonth(1)}
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>

                    <div
                      className="text-muted small mb-1"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        textAlign: "center",
                        fontSize: "11px",
                      }}
                    >
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: "3px",
                      }}
                    >
                      {getCalendarDays().map((date, index) => {
                        if (!date) {
                          return <span key={`blank-${index}`} style={{ height: "32px" }} />;
                        }

                        const dateKey = toDateKey(date);
                        const isRangeEdge = dateKey === admissionDateRange.from || dateKey === admissionDateRange.to;
                        const isInRange = isAdmissionDateInRange(dateKey);

                        return (
                          <button
                            key={dateKey}
                            type="button"
                            className="btn btn-sm border-0"
                            style={{
                              height: "32px",
                              borderRadius: isRangeEdge ? "50%" : "6px",
                              backgroundColor: isRangeEdge
                                ? "#0d6efd"
                                : isInRange
                                  ? "#d8ecff"
                                  : "transparent",
                              color: isRangeEdge ? "#fff" : "#1f2937",
                            }}
                            onMouseEnter={() => {
                              if (admissionDateRange.from && !admissionDateRange.to) {
                                setHoveredAdmissionDate(dateKey);
                              }
                            }}
                            onClick={() => {
                              selectAdmissionDate(dateKey);
                              if (admissionDateRange.from && !admissionDateRange.to) {
                                setShowAdmissionCalendar(false);
                              }
                            }}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="filter-actions d-flex align-items-end gap-2" style={{ flex: "0 0 72px" }}>
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center"
                aria-label="Search"
                onClick={handleSearch}
                title="Search"
              >
                <Search size={16} />
              </button>

              <button
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                aria-label="Reset"
                title="Reset"
                onClick={handleReset}
              >
                <RotateCcw size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="grid-card">

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-3 mb-2 flex-wrap">
            <div>
              <h6 className="section-label mb-0">Admission</h6>
            </div>

            <button
              className="btn btn-primary primary-action"
              style={{ padding: "4px 8px", minHeight: "28px", height: "30px", fontSize: "0.9rem" }}
              onClick={() => {
                setSelectedStudent(null);
                setActiveTab("student");
                setDocuments(documentsTemplate.map(d => ({ ...d })));
                setShowModal(true);
              }}
            >
              + New Admission
            </button>
          </div>

          <div className="position-relative">
            <div className={`table-shell ${showColumnMenu ? 'with-column-menu' : ''}`}>

              <table
                className="table table-sm table-striped align-middle admission-table"
                style={{ minWidth: `${tableWidth}px`, width: `${tableWidth}px` }}
              >

                <thead>

                  <tr>
                    {visibleTableColumns.map((column, index) => (
                      <th
                        key={column.key}
                        className="text-nowrap small position-relative"
                        style={{
                          ...getColumnStyle(column),
                          paddingRight:
                            index === visibleTableColumns.length - 1 ? "46px" : undefined,
                        }}
                      >
                        <span>{column.label}</span>

                        <span
                          className="column-resize-handle"
                          onMouseDown={(event) => startColumnResize(event, column)}
                          onTouchStart={(event) => startColumnResize(event, column)}
                          role="separator"
                          aria-orientation="vertical"
                          aria-label={`Resize ${column.label} column`}
                          title="Drag to resize column"
                        />

                        {index === visibleTableColumns.length - 1 && (
                          <span
                            className="position-absolute top-50 translate-middle-y"
                            style={{ right: "8px", zIndex: 10 }}
                          >
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary bg-white d-inline-flex align-items-center justify-content-center shadow-sm icon-btn"
                              onClick={() => setShowColumnMenu((show) => !show)}
                              aria-expanded={showColumnMenu}
                              aria-label="Table column menu"
                              title="Table column menu"
                              ref={columnToggleRef}
                            >
                              <Menu size={15} />
                            </button>
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    {visibleTableColumns.map((column) => (
                      <th
                        key={`${column.key}-filter`}
                        className="bg-white"
                        style={getColumnStyle(column)}
                      >
                        {column.filterable === false ? null : (
                          <div className="input-group input-group-sm">
                            <span className="input-group-text bg-primary text-white border-primary px-2">
                              <Search size={12} />
                            </span>

                            {column.type === "select" ? (
                              <select
                                className="form-select"


                                value={getGridFilters[column.key] || ""}

                                onChange={(e) =>
                                  setGridFilters(prev => ({
                                    ...prev,
                                    [column.key]: e.target.value
                                  }))
                                }

                                aria-label={`Filter ${column.label}`}
                              >
                                <option value="">All</option>
                                {column.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                className="form-control"
                                value={getGridFilters[column.key] || ""}
                                onChange={(e) =>
                                  setGridFilters(prev => ({
                                    ...prev,
                                    [column.key]: e.target.value
                                  }))
                                }
                              />
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>

                </thead>

                <tbody>

                  {paginatedAdmissions.map((item) => (
                    <tr key={item.id}>
                      {visibleTableColumns.map((column) => (
                        <td
                          key={`${item.id}-${column.key}`}
                          className="text-nowrap small"
                          style={getColumnStyle(column)}
                        >
                          {column.render ? column.render(item) : item[column.key]}
                        </td>
                      ))}

                    </tr>
                  ))}

                  {filteredAdmissions.length === 0 && (
                    <tr>
                      <td colSpan={Math.max(visibleTableColumns.length, 1)} className="text-center text-muted py-4">
                        No admissions found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

            {showColumnMenu && (
              <div
                className="position-absolute bg-white border rounded-3 shadow-sm p-2 text-start"
                style={{ width: "200px", top: "25px", right: "8px", zIndex: 100 }}
                ref={columnMenuRef}
              >
                <button
                  type="button"
                  className="btn btn-light btn-sm w-auto text-start column-popup-action"
                  onClick={showAllColumns}
                >
                  Use All Columns
                </button>

                <button
                  type="button"
                  className="btn btn-light btn-sm w-auto text-start column-popup-action"
                  onClick={() => {
                    setAdmissionDateRange({ from: "", to: "" });
                    setCurrentPage(1);
                  }}
                >
                  Clear All Filter
                </button>

                <button
                  type="button"
                  className="btn btn-light btn-sm w-auto mb-1 text-start column-popup-action"
                  onClick={handleDownloadExcel}
                >
                  Download Data In Excel
                </button>

                <div className="fw-normal small">
                  Columns
                </div>

                <div className="column-menu px-1">
                  {columns.map((columnOption) => (
                    <label
                      key={columnOption.key}
                      className="d-flex align-items-center gap-2 px-2 py-1 small"
                    >
                      <input
                        type="checkbox"
                        className="form-check-input m-0"
                        checked={visibleColumns[columnOption.key]}
                        onChange={() => toggleColumn(columnOption.key)}
                      />
                      <span>{columnOption.label}</span>
                    </label>

                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PAGINATION */}

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <div className="d-flex align-items-center gap-1">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                style={{ width: "28px", height: "26px", padding: 0 }}
                onClick={() => goToPage(1)}
                disabled={activePage === 1}
                aria-label="First page"
                title="First page"
              >
                <ChevronsLeft size={14} />
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                style={{ width: "28px", height: "26px", padding: 0 }}
                onClick={() => goToPage(activePage - 1)}
                disabled={activePage === 1}
                aria-label="Previous page"
                title="Previous page"
              >
                <ChevronLeft size={14} />
              </button>

              <input
                type="number"
                className="form-control form-control-sm text-center"
                style={{ width: "54px", height: "26px", padding: "0 4px" }}
                min="1"
                max={totalPages}
                value={activePage}
                onChange={(event) => goToPage(Number(event.target.value) || 1)}
                aria-label="Current page"
              />

              <small className="text-muted px-1">/ {totalPages}</small>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                style={{ width: "28px", height: "26px", padding: 0 }}
                onClick={() => goToPage(activePage + 1)}
                disabled={activePage === totalPages}
                aria-label="Next page"
                title="Next page"
              >
                <ChevronRight size={14} />
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                style={{ width: "28px", height: "26px", padding: 0 }}
                onClick={() => goToPage(totalPages)}
                disabled={activePage === totalPages}
                aria-label="Last page"
                title="Last page"
              >
                <ChevronsRight size={14} />
              </button>

              <select
                className="form-select form-select-sm ms-2"
                style={{ width: "68px", height: "26px", paddingTop: 0, paddingBottom: 0 }}
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setCurrentPage(1);
                }}
                aria-label="Items per page"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <small className="text-muted">items per page</small>
            </div>

            <small className="text-muted">
              {startIndex} - {endIndex} of {filteredAdmissions.length} items
            </small>

          </div>

        </div>

      </div>

      {admissionModal}

    </div>
  );
};

export default StudentAdmissionList;
