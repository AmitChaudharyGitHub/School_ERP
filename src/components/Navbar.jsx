import { Link, useLocation } from "react-router-dom";

import {
    FaHome,
    FaUserGraduate,
    FaClipboardList,
    FaMoneyBill,
    FaBook,
    FaCog,
    FaChevronDown
} from "react-icons/fa";

function Navbar() {

    const location = useLocation();

    const activeClass = (path) =>
        location.pathname === path
            ? "sidebar-link active"
            : "sidebar-link";

    const sectionActiveClass = (basePath) =>
        location.pathname.startsWith(basePath)
            ? "sidebar-link master-title active"
            : "sidebar-link master-title";

    const submenuActiveClass = (path) =>
        location.pathname === path
            ? "submenu-link active"
            : "submenu-link";

    return (

        <div className="sidebar">

            {/* LOGO */}

            <div className="sidebar-logo">
                SMS
            </div>

            {/* MENU */}

            <ul className="sidebar-menu">

                {/* DASHBOARD */}

                <li>
                    <Link className={activeClass("/")} to="/">
                        <FaHome className="sidebar-icon" />
                        <span>Dashboard</span>
                    </Link>
                </li>

                {/* INQUIRY */}

                <li>
                    <Link className={activeClass("/inquiry")} to="/inquiry">
                        <FaClipboardList className="sidebar-icon" />
                        <span>Inquiry</span>
                    </Link>
                </li>


                {/* ADMISSION */}
                <li className="master-menu">

                    <div className={sectionActiveClass("/admission")}>

                        <div className="master-left">

                            <FaMoneyBill className="sidebar-icon" />

                            <span>Admission</span>

                        </div>

                        <FaChevronDown className="dropdown-icon" />

                    </div>

                    {/* Admission SUBMENU */}

                    <ul className="submenu">

                        <li>
                            <Link
                                className={submenuActiveClass("/admission/dashboard")}
                                to="/admission/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={submenuActiveClass("/admission/StudentAdmissionList")}
                                to="/admission/StudentAdmissionList"
                            >
                                Admission List
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={submenuActiveClass("/admission/DocumentList")}
                                to="/admission/DocumentList"
                            >
                                Document List
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={submenuActiveClass("/admission/StudentDocument")}
                                to="/admission/StudentDocument"
                            >
                                Student Document
                            </Link>
                        </li>




                    </ul>

                </li>








                {/* ACCOUNTING MENU */}

                <li className="master-menu">

                    <div className={sectionActiveClass("/accounting")}>

                        <div className="master-left">

                            <FaMoneyBill className="sidebar-icon" />

                            <span>Accounting</span>

                        </div>

                        <FaChevronDown className="dropdown-icon" />

                    </div>

                    {/* ACCOUNTING SUBMENU */}

                    <ul className="submenu">

                        <li>
                            <Link
                                className={submenuActiveClass("/accounting/dashboard")}
                                to="/accounting/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={submenuActiveClass("/accounting/feestructure")}
                                to="/accounting/feestructure"
                            >
                                Fee Structure
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={submenuActiveClass("/accounting/discount")}
                                to="/accounting/discount"
                            >
                                Discount
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={submenuActiveClass("/accounting/FeeInstallment")}
                                to="/accounting/FeeInstallment"
                            >
                                Fee Installment
                            </Link>
                        </li>


                        <li>
                            <Link
                                className={submenuActiveClass("/accounting/studentfees")}
                                to="/accounting/studentfees"
                            >
                                Student Fees
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={submenuActiveClass("/accounting/StudentFeeProfile")}
                                to="/accounting/StudentFeeProfile"
                            >
                                Student Fee Profile
                            </Link>
                        </li>



                        <li>
                            <Link
                                className={submenuActiveClass("/accounting/reports")}
                                to="/accounting/reports"
                            >
                                Reports
                            </Link>
                        </li>

                    </ul>

                </li>

                {/* Attendance MENU */}

                <li className="master-menu">

                    <div className={sectionActiveClass("/attendance")}>

                        <div className="master-left">

                            <FaMoneyBill className="sidebar-icon" />

                            <span>Attendance</span>

                        </div>

                        <FaChevronDown className="dropdown-icon" />

                    </div>

                    {/* Attendance SUBMENU */}

                    <ul className="submenu">

                        <li>
                            <Link
                                className={submenuActiveClass("/attendance/dashboard")}
                                to="/attendance/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={submenuActiveClass("/attendance/entry")}
                                to="/attendance/entry"
                            >
                                Atendance Entry
                            </Link>
                        </li>

                        {/*Student ATTENDANCE */}
                        <li>
                            <Link
                                className={submenuActiveClass("/attendance/AtdendanceList")}
                                to="/attendance/AtdendanceList"
                            >
                                Student Attendance List
                            </Link>
                        </li>

                    </ul>

                </li>


                {/* FEES */}

                {/* <li>
                    <Link
                        className={activeClass("/AllStudentFees")}
                        to="/AllStudentFees"
                    >
                        <FaMoneyBill className="sidebar-icon" />
                        <span>Fees</span>
                    </Link>
                </li> */}

                {/* MARKS */}

                {/* <li>
                    <Link
                        className={activeClass("/AllStudentMarks")}
                        to="/AllStudentMarks"
                    >
                        <FaBook className="sidebar-icon" />
                        <span>Marks</span>
                    </Link>
                </li> */}

                {/* Student Profile */}

                <li>
                    <Link className={activeClass("/StudentProfile")} to="/StudentProfile">
                        <FaUserGraduate className="sidebar-icon" />
                        <span>Student Profile</span>
                    </Link>
                </li>


                {/* MASTER MENU */}

                <li className="master-menu">

                    <div className={sectionActiveClass("/master")}>

                        <div className="master-left">

                            <FaCog className="sidebar-icon" />

                            <span>Masters</span>

                        </div>

                        <FaChevronDown className="dropdown-icon" />

                    </div>

                    {/* SUB MENU */}

                    <ul className="submenu">

                        <li>
                            <Link
                                className={submenuActiveClass("/master/standard")}
                                to="/master/standard"
                            >
                                Standard
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={submenuActiveClass("/master/subjects")}
                                to="/master/subjects"
                            >
                                Subjects
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={submenuActiveClass("/master/hobbies")}
                                to="/master/hobbies"
                            >
                                Hobbies
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={submenuActiveClass("/master/inquiry-source")}
                                to="/master/inquiry-source"
                            >
                                Inquiry Source
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={submenuActiveClass("/master/school")}
                                to="/master/school"
                            >
                                School
                            </Link>
                        </li>

                    </ul>

                </li>

            </ul>

        </div>
    );
}

export default Navbar;
