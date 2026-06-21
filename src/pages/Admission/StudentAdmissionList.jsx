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
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("student");
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [columnFilters, setColumnFilters] = useState({});
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

  useEffect(() => {
    // allow page scrolling; scrollbar visuals will be hidden via CSS
  }, []);

  const documentsTemplate = useMemo(() => [
    { id: 1, docName: "Student Passport Size Photo", category: "Photo", required: true, documentNo: "", uploadDate: "2024-05-28", remark: "Accepted", verifiedBy: "Admin", fileName: "photo.png", fileSize: "240 KB", fileObject: null, fileUrl: "#", status: "Verified" },
    { id: 2, docName: "Student Aadhar Card", category: "Identity", required: true, documentNo: "", uploadDate: "2024-05-28", remark: "Pending verification", verifiedBy: "", fileName: "aadharcard1.pdf", fileSize: "380 KB", fileObject: null, fileUrl: "#", status: "Pending" },
    { id: 3, docName: "Student Father Aadhar Card", category: "Identity", required: true, documentNo: "", uploadDate: "2024-05-20", remark: "Rejected - unclear image", verifiedBy: "", fileName: null, fileSize: "-", fileObject: null, fileUrl: null, status: "Missing" },
    { id: 4, docName: "Student Mother Aadhar Card", category: "Identity", required: true, documentNo: "", uploadDate: "", remark: "", verifiedBy: "", fileName: null, fileSize: "-", fileObject: null, fileUrl: null, status: "Not Uploaded" },
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
  const summaryCards = useMemo(() => [
    {
      title: "Total Admissions",
      value: "256",
      icon: UserPlus,
      color: "#2563eb",
      background: "#eff6ff",
    },
    {
      title: "Male Students",
      value: "132",
      icon: Users,
      color: "#16a34a",
      background: "#f0fdf4",
    },
    {
      title: "Female Students",
      value: "124",
      icon: Users,
      color: "#db2777",
      background: "#fdf2f8",
    },
    {
      title: "Pending Documents",
      value: "36",
      icon: FileWarning,
      color: "#ea580c",
      background: "#fff7ed",
    },
    {
      title: "Pending Fee Payments",
      value: "27",
      icon: IndianRupee,
      color: "#7c3aed",
      background: "#f5f3ff",
    },
  ], []);
  const [admissions] = useState([
    {
      id: 1,
      admissionNo: "ADM2024/001",
      studentName: "Aarav Sharma",
      standard: "5th Standard",
      gender: "Male",
      admissionDate: "15/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Annual",
      studentStatus: "Active",
      mobile: "9876543210",
      fatherName: "Rajesh Sharma",
      motherName: "Sunita Sharma",
      motherOccupation: "Homemaker",
      address: "12 Bluebell Street, Mumbai",
      pincode: "400001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 2,
      admissionNo: "ADM2024/002",
      studentName: "Diya Patel",
      standard: "6th Standard",
      gender: "Female",
      admissionDate: "14/05/2024",
      installmentPlan: "3 Installments",
      feePlan: "Term-wise",
      studentStatus: "Active",
      mobile: "9123456780",
      fatherName: "Viral Patel",
      motherName: "Nisha Patel",
      motherOccupation: "Teacher",
      address: "45 Green Park, Pune",
      pincode: "411001",
      documentStatus: "Verified",
      feeStatus: "Paid",
    },
    {
      id: 3,
      admissionNo: "ADM2024/003",
      studentName: "Vivaan Singh",
      standard: "7th Standard",
      gender: "Male",
      admissionDate: "13/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Quarterly",
      studentStatus: "Pending",
      mobile: "9988776655",
      fatherName: "Amit Singh",
      motherName: "Priya Singh",
      motherOccupation: "Nurse",
      address: "78 Sunrise Avenue, Nashik",
      pincode: "422001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 4,
      admissionNo: "ADM2024/001",
      studentName: "Aarav Sharma",
      standard: "5th Standard",
      gender: "Male",
      admissionDate: "15/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Annual",
      studentStatus: "Active",
      mobile: "9876543210",
      fatherName: "Rajesh Sharma",
      motherName: "Sunita Sharma",
      motherOccupation: "Homemaker",
      address: "12 Bluebell Street, Mumbai",
      pincode: "400001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 5,
      admissionNo: "ADM2024/002",
      studentName: "Diya Patel",
      standard: "6th Standard",
      gender: "Female",
      admissionDate: "14/05/2024",
      installmentPlan: "3 Installments",
      feePlan: "Term-wise",
      studentStatus: "Active",
      mobile: "9123456780",
      fatherName: "Viral Patel",
      motherName: "Nisha Patel",
      motherOccupation: "Teacher",
      address: "45 Green Park, Pune",
      pincode: "411001",
      documentStatus: "Verified",
      feeStatus: "Paid",
    },
    {
      id: 6,
      admissionNo: "ADM2024/003",
      studentName: "Vivaan Singh",
      standard: "7th Standard",
      gender: "Male",
      admissionDate: "13/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Quarterly",
      studentStatus: "Pending",
      mobile: "9988776655",
      fatherName: "Amit Singh",
      motherName: "Priya Singh",
      motherOccupation: "Nurse",
      address: "78 Sunrise Avenue, Nashik",
      pincode: "422001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 7,
      admissionNo: "ADM2024/001",
      studentName: "Aarav Sharma",
      standard: "5th Standard",
      gender: "Male",
      admissionDate: "15/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Annual",
      studentStatus: "Active",
      mobile: "9876543210",
      fatherName: "Rajesh Sharma",
      motherName: "Sunita Sharma",
      motherOccupation: "Homemaker",
      address: "12 Bluebell Street, Mumbai",
      pincode: "400001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 8,
      admissionNo: "ADM2024/002",
      studentName: "Diya Patel",
      standard: "6th Standard",
      gender: "Female",
      admissionDate: "14/05/2024",
      installmentPlan: "3 Installments",
      feePlan: "Term-wise",
      studentStatus: "Active",
      mobile: "9123456780",
      fatherName: "Viral Patel",
      motherName: "Nisha Patel",
      motherOccupation: "Teacher",
      address: "45 Green Park, Pune",
      pincode: "411001",
      documentStatus: "Verified",
      feeStatus: "Paid",
    },
    {
      id: 9,
      admissionNo: "ADM2024/003",
      studentName: "Vivaan Singh",
      standard: "7th Standard",
      gender: "Male",
      admissionDate: "13/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Quarterly",
      studentStatus: "Pending",
      mobile: "9988776655",
      fatherName: "Amit Singh",
      motherName: "Priya Singh",
      motherOccupation: "Nurse",
      address: "78 Sunrise Avenue, Nashik",
      pincode: "422001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 1,
      admissionNo: "ADM2024/001",
      studentName: "Aarav Sharma",
      standard: "5th Standard",
      gender: "Male",
      admissionDate: "15/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Annual",
      studentStatus: "Active",
      mobile: "9876543210",
      fatherName: "Rajesh Sharma",
      motherName: "Sunita Sharma",
      motherOccupation: "Homemaker",
      address: "12 Bluebell Street, Mumbai",
      pincode: "400001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 2,
      admissionNo: "ADM2024/002",
      studentName: "Diya Patel",
      standard: "6th Standard",
      gender: "Female",
      admissionDate: "14/05/2024",
      installmentPlan: "3 Installments",
      feePlan: "Term-wise",
      studentStatus: "Active",
      mobile: "9123456780",
      fatherName: "Viral Patel",
      motherName: "Nisha Patel",
      motherOccupation: "Teacher",
      address: "45 Green Park, Pune",
      pincode: "411001",
      documentStatus: "Verified",
      feeStatus: "Paid",
    },
    {
      id: 3,
      admissionNo: "ADM2024/003",
      studentName: "Vivaan Singh",
      standard: "7th Standard",
      gender: "Male",
      admissionDate: "13/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Quarterly",
      studentStatus: "Pending",
      mobile: "9988776655",
      fatherName: "Amit Singh",
      motherName: "Priya Singh",
      motherOccupation: "Nurse",
      address: "78 Sunrise Avenue, Nashik",
      pincode: "422001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 4,
      admissionNo: "ADM2024/001",
      studentName: "Aarav Sharma",
      standard: "5th Standard",
      gender: "Male",
      admissionDate: "15/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Annual",
      studentStatus: "Active",
      mobile: "9876543210",
      fatherName: "Rajesh Sharma",
      motherName: "Sunita Sharma",
      motherOccupation: "Homemaker",
      address: "12 Bluebell Street, Mumbai",
      pincode: "400001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 5,
      admissionNo: "ADM2024/002",
      studentName: "Diya Patel",
      standard: "6th Standard",
      gender: "Female",
      admissionDate: "14/05/2024",
      installmentPlan: "3 Installments",
      feePlan: "Term-wise",
      studentStatus: "Active",
      mobile: "9123456780",
      fatherName: "Viral Patel",
      motherName: "Nisha Patel",
      motherOccupation: "Teacher",
      address: "45 Green Park, Pune",
      pincode: "411001",
      documentStatus: "Verified",
      feeStatus: "Paid",
    },
    {
      id: 6,
      admissionNo: "ADM2024/003",
      studentName: "Vivaan Singh",
      standard: "7th Standard",
      gender: "Male",
      admissionDate: "13/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Quarterly",
      studentStatus: "Pending",
      mobile: "9988776655",
      fatherName: "Amit Singh",
      motherName: "Priya Singh",
      motherOccupation: "Nurse",
      address: "78 Sunrise Avenue, Nashik",
      pincode: "422001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 7,
      admissionNo: "ADM2024/001",
      studentName: "Aarav Sharma",
      standard: "5th Standard",
      gender: "Male",
      admissionDate: "15/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Annual",
      studentStatus: "Active",
      mobile: "9876543210",
      fatherName: "Rajesh Sharma",
      motherName: "Sunita Sharma",
      motherOccupation: "Homemaker",
      address: "12 Bluebell Street, Mumbai",
      pincode: "400001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
    {
      id: 8,
      admissionNo: "ADM2024/002",
      studentName: "Diya Patel",
      standard: "6th Standard",
      gender: "Female",
      admissionDate: "14/05/2024",
      installmentPlan: "3 Installments",
      feePlan: "Term-wise",
      studentStatus: "Active",
      mobile: "9123456780",
      fatherName: "Viral Patel",
      motherName: "Nisha Patel",
      motherOccupation: "Teacher",
      address: "45 Green Park, Pune",
      pincode: "411001",
      documentStatus: "Verified",
      feeStatus: "Paid",
    },
    {
      id: 9,
      admissionNo: "ADM2024/003",
      studentName: "Vivaan Singh",
      standard: "7th Standard",
      gender: "Male",
      admissionDate: "13/05/2024",
      installmentPlan: "2 Installments",
      feePlan: "Quarterly",
      studentStatus: "Pending",
      mobile: "9988776655",
      fatherName: "Amit Singh",
      motherName: "Priya Singh",
      motherOccupation: "Nurse",
      address: "78 Sunrise Avenue, Nashik",
      pincode: "422001",
      documentStatus: "Pending",
      feeStatus: "Pending",
    },
  ]);

  const columns = useMemo(
    () => [
      { key: "admissionNo", label: "Admission No.", minWidth: "120px", visible: true },
      { key: "studentName", label: "Student Name", minWidth: "120px", visible: true },
      { key: "standard", label: "Standard", minWidth: "150px", visible: true },
      { key: "gender", label: "Gender", minWidth: "100px", visible: true },
      { key: "admissionDate", label: "Admission Date", minWidth: "120px", visible: true },

      { key: "installmentPlan", label: "Fee Installment Plan", minWidth: "120px", visible: true },
      { key: "mobile", label: "Mobile No.", minWidth: "120px", visible: true },
      { key: "fatherName", label: "Father Name", minWidth: "120px", visible: true },
      { key: "motherOccupation", label: "Mother Occupation", minWidth: "150px", visible: true },
      { key: "address", label: "Address", minWidth: "180px", visible: true },
      { key: "pincode", label: "Pincode", minWidth: "110px", visible: true },
      { key: "feePlan", label: "Fee Plan", minWidth: "120px", visible: true },
      { key: "studentStatus", label: "Student Status", minWidth: "120px", visible: true },
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
                setSelectedStudent(item);
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

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    // already in DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;
    // YYYY-MM-DD
    const iso = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const admissionRangeValue = admissionDateRange.from && admissionDateRange.to
    ? `${formatDateKey(admissionDateRange.from)} - ${formatDateKey(admissionDateRange.to)}`
    : admissionDateRange.from
      ? formatDateKey(admissionDateRange.from)
      : "";

  const parseAdmissionDate = (dateValue) => {
    const [day, month, year] = dateValue.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  };

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
    const tabs = ["student", "parent", "documents", "fees"];
    const idx = tabs.indexOf(activeTab);

    if (idx > 0) {
      setActiveTab(tabs[idx - 1]);
    } else {
      setShowModal(false);
    }
  }, [activeTab]);

  const filteredAdmissions = admissions.filter((item) => {
    const matchesColumnFilters = columns.every((column) => {
      if (column.filterable === false) {
        return true;
      }

      const filterValue = (columnFilters[column.key] || "").trim().toLowerCase();

      if (!filterValue) {
        return true;
      }

      return String(item[column.key] || "").toLowerCase().includes(filterValue);
    });

    if (!matchesColumnFilters) {
      return false;
    }

    const admissionTime = parseAdmissionDate(item.admissionDate);
    const fromTime = admissionDateRange.from
      ? new Date(admissionDateRange.from).getTime()
      : null;
    const toTime = admissionDateRange.to
      ? new Date(admissionDateRange.to).getTime()
      : null;

    if (fromTime && admissionTime < fromTime) {
      return false;
    }

    if (toTime && admissionTime > toTime) {
      return false;
    }

    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filteredAdmissions.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = filteredAdmissions.length === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endIndex = Math.min(activePage * pageSize, filteredAdmissions.length);
  const paginatedAdmissions = filteredAdmissions.slice(startIndex - 1, endIndex);

  const updateColumnFilter = (key, value) => {
    setColumnFilters((filters) => ({
      ...filters,
      [key]: value,
    }));
    setCurrentPage(1);
  };

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
                  className={`nav-link ${activeTab === "documents" ? "active" : ""}`}
                  onClick={() => setActiveTab("documents")}
                >
                  Document Section
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
            </ul>

            {/* STUDENT INFO */}

            {activeTab === "student" && (
              <div className="row g-3">

                <div className="col-md-3">
                  <label className="form-label">
                    Admission No
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    defaultValue={selectedStudent?.admissionNo || ""}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">
                    Academic Year
                  </label>

                  <select className="form-select" defaultValue={selectedStudent?.academicYear || "2024-25"}>
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
                    defaultValue={selectedStudent?.admissionDate || ""}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">
                    Standard
                  </label>

                  <select className="form-select" defaultValue={selectedStudent?.standard || ""}>
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
                    defaultValue={selectedStudent?.studentName || ""}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">
                    Gender
                  </label>

                  <select className="form-select" defaultValue={selectedStudent?.gender || ""}>
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
                    defaultValue={selectedStudent?.dateOfBirth || ""}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">
                    Blood Group
                  </label>

                  <select className="form-select" defaultValue={selectedStudent?.bloodGroup || ""}>
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

                  <select className="form-select" defaultValue={selectedStudent?.religion || ""}>
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

                  <select className="form-select" defaultValue={selectedStudent?.category || ""}>
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
                    defaultValue={selectedStudent?.mobile || ""}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">
                    Aadhaar No
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    defaultValue={selectedStudent?.aadhaarNo || ""}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">
                    Address
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    defaultValue={selectedStudent?.address || ""}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">
                    Pincode
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    defaultValue={selectedStudent?.pincode || ""}
                  />
                </div>


                <div className="col-md-3">
                  <label className="form-label">
                    Student Status
                  </label>

                  <select className="form-select" defaultValue={selectedStudent?.studentStatus || ""}>
                    <option value="">Select Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Inactive</option>
                  </select>
                </div>

              </div>
            )}

            {activeTab === "parent" && (
              <div>
                <h6 className="fw-semibold mb-3">Parent Information</h6>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label">
                      Father Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedStudent?.fatherName || ""}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Father Mobile No
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedStudent?.fatherMobileNo || ""}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Father Email ID
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedStudent?.fatherEmailId || ""}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Father Occupation
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedStudent?.fatherOccupation || ""}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mother Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedStudent?.motherName || ""}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mother Mobile No
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedStudent?.motherMobileNo || ""}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mother Email ID
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      defaultValue={selectedStudent?.motherEmailId || ""}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mother Occupation
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedStudent?.motherOccupation || ""}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="student-document-style">
                <h6 className="fw-semibold mb-3">Document Section</h6>
                <div className="table-shell">
                  <table className="table table-sm table-striped align-middle document-table">
                    <thead>
                      <tr>
                        <th>Document Name</th>
                        <th>Category</th>
                        <th>Required</th>
                        <th>Uploaded File</th>
                        <th>Upload Date</th>
                        <th>Verified By</th>
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
                            {doc.uploadDate ? (
                              <span>{formatDisplayDate(doc.uploadDate)}</span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>{doc.verifiedBy || "-"}</td>
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
              <div>
                <h6 className="fw-semibold mb-3">Fee Section</h6>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      Fee Plan
                    </label>

                    <select className="form-select" defaultValue={selectedStudent?.feePlan || ""}>
                      <option value="">Select Fee Plan</option>
                      <option>Annual</option>
                      <option>Semester</option>
                      <option>Quarterly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">
                      Installment Plan
                    </label>

                    <select className="form-select" defaultValue={selectedStudent?.installmentPlan || ""}>
                      <option value="">Select Installment</option>
                      <option>One Installments</option>
                      <option>Two Installments</option>
                      <option>Four Installments</option>
                      <option>Per Month Installments</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Total Fee Amount
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter amount"
                      defaultValue={selectedStudent?.totalFeeAmount || ""}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Extra Charges
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter amount"
                      defaultValue={selectedStudent?.extraCharges || ""}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Payable Amount
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter amount"
                      defaultValue={selectedStudent?.payableAmount || ""}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Per Installment Amount
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Auto-calculated"
                      disabled
                      defaultValue={selectedStudent?.perInstallmentAmount || ""}
                    />
                  </div>



                  <div className="col-md-4">
                    <label className="form-label">
                      Payment Status
                    </label>

                    <select className="form-select" defaultValue={selectedStudent?.paymentStatus || ""}>
                      <option value="">Select Status</option>
                      <option>Paid</option>
                      <option>Partial</option>
                      <option>Pending</option>
                      <option>Overdue</option>
                    </select>
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">
                      Fee Remarks
                    </label>

                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter any remarks"
                      defaultValue={selectedStudent?.feeRemarks || ""}
                    />
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
                  setActiveTab("documents");
                } else if (activeTab === "documents") {
                  setActiveTab("fees");
                } else {
                  setShowModal(false);
                }
              }}
            >
              {activeTab === "fees" ? "Save" : "Next"}
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
        .admission-page .student-document-style {
          padding: 8px 0 0;
          font-size: 0.86rem;
          color: #1f2937;
        }

        .admission-page .student-document-style .table-shell {
          border: 1px solid #e6ebf2;
          border-radius: 8px;
          overflow: auto;
          max-height: calc(100vh - 300px);
        }

        .admission-page .column-menu {
          max-height: 290px;
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
          border-top-right-radius: 8px;
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

      {/* FILTERS */}

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

              <select className="form-select form-select-sm">
                <option>All Standards</option>
                <option>5th</option>
                <option>6th</option>
                <option>7th</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Gender
              </label>

              <select className="form-select form-select-sm">
                <option>All Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Document Status
              </label>

              <select className="form-select form-select-sm">
                <option>All Document Status</option>
                <option>Pending</option>
                <option>Verified</option>
              </select>
            </div>

            <div style={compactFilterStyle}>
              <label className="form-label small mb-1">
                Fee Status
              </label>

              <select className="form-select form-select-sm">
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
                      zIndex: 20,
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
                title="Search"
              >
                <Search size={16} />
              </button>

              <button
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                aria-label="Reset"
                title="Reset"
                onClick={() => {
                  setAdmissionDateRange({ from: "", to: "" });
                  setCurrentPage(1);
                }}
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
                                value={columnFilters[column.key] || ""}
                                onChange={(event) =>
                                  updateColumnFilter(column.key, event.target.value)
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
                                value={columnFilters[column.key] || ""}
                                onChange={(event) =>
                                  updateColumnFilter(column.key, event.target.value)
                                }
                                aria-label={`Filter ${column.label}`}
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
                style={{ width: "200px", top: "25px", right: "8px", zIndex: 20 }}
                ref={columnMenuRef}
              >
                <button
                  type="button"
                  className="btn btn-light btn-sm w-auto text-start mb-1 column-popup-action"
                  onClick={showAllColumns}
                >
                  Use All Columns
                </button>

                <button
                  type="button"
                  className="btn btn-light btn-sm w-auto text-start mb-2 column-popup-action"
                  onClick={() => {
                    setColumnFilters({});
                    setAdmissionDateRange({ from: "", to: "" });
                    setCurrentPage(1);
                  }}
                >
                  Clear All Filter
                </button>

                <div className="fw-semibold small border-top px-2 pt-2 pb-1">
                  Show / Hide Columns
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
