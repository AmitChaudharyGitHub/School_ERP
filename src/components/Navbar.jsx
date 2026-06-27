import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState } from "react";

import {
    FaHome,
    FaUserGraduate,
    FaClipboardList,
    FaMoneyBill,
    FaUserPlus,
    FaCalendarCheck,
    FaCog,
    FaChevronRight
} from "react-icons/fa";

function FlyoutItem({ icon, label, basePath, to, children, sidebarHovered, openMenu, setOpenMenu }) {
    const location = useLocation();
    const isActive = location.pathname.startsWith(basePath);
    const ref = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    const isOpen = openMenu === label;

    const handleChevronEnter = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setPos({ top: rect.top, left: rect.right + 4 });
        }
        setOpenMenu(label);  // open this, automatically closes others
    };

    return (
        <li
            className={`flyout-menu${isActive ? " flyout-menu--active" : ""}`}
            ref={ref}
        >
            <div className={`sidebar-link master-title${isActive ? " active" : ""}`}>

                <Link
                    to={to}
                    className="master-left"
                    style={{ textDecoration: "none", color: "inherit", flex: 1 }}
                    onMouseEnter={() => setOpenMenu(null)}  // close on label hover
                >
                    {icon}
                    {sidebarHovered && <span>{label}</span>}
                </Link>

                {sidebarHovered && (
                    <span
                        className="chevron-trigger"
                        onMouseEnter={handleChevronEnter}
                    >
                        <FaChevronRight className="dropdown-icon" style={{ fontSize: 10 }} />
                    </span>
                )}
            </div>

            {isOpen && (
                <ul
                    className="flyout-submenu"
                    style={{ top: pos.top, left: pos.left }}
                    onMouseEnter={() => setOpenMenu(label)}
                    onMouseLeave={() => setOpenMenu(null)}
                >
                    {children}
                </ul>
            )}
        </li>
    );
}

function SubLink({ to, label }) {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <li>
            <Link
                className={`flyout-submenu__link${isActive ? " active" : ""}`}
                to={to}
            >
                {label}
            </Link>
        </li>
    );
}

function Navbar() {
    const location = useLocation();
    const [hovered, setHovered] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);  // tracks which flyout is open

    const activeClass = (path) =>
        location.pathname === path ? "sidebar-link active" : "sidebar-link";

    return (
        <div
            className={`sidebar${hovered ? " sidebar--expanded" : " sidebar--collapsed"}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setOpenMenu(null); }}
        >
            <div className="sidebar-logo">
                {hovered ? "SMS" : "S"}
            </div>

            <ul className="sidebar-menu">

                <li>
                    <Link className={activeClass("/")} to="/">
                        <FaHome className="sidebar-icon" />
                        {hovered && <span>Dashboard</span>}
                    </Link>
                </li>

                <li>
                    <Link className={activeClass("/inquiry")} to="/inquiry">
                        <FaClipboardList className="sidebar-icon" />
                        {hovered && <span>Inquiry</span>}
                    </Link>
                </li>

                <FlyoutItem
                    icon={<FaUserPlus className="sidebar-icon" />}
                    label="Admission"
                    basePath="/admission"
                    to="/admission/dashboard"
                    sidebarHovered={hovered}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                >
                    <SubLink to="/admission/StudentAdmissionList" label="Admission List" />
                    <SubLink to="/admission/DocumentList" label="Document List" />
                    <SubLink to="/admission/StudentDocument" label="Student Document" />
                </FlyoutItem>

                <FlyoutItem
                    icon={<FaMoneyBill className="sidebar-icon" />}
                    label="Accounting"
                    basePath="/accounting"
                    to="/accounting/dashboard"
                    sidebarHovered={hovered}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                >
                    <SubLink to="/accounting/StudentFeeList" label="Student Fee List" />
                    <SubLink to="/accounting/StudentFeeProfile" label="Student Fee Profile" />
                    <SubLink to="/accounting/reports" label="Reports" />
                </FlyoutItem>

                <FlyoutItem
                    icon={<FaCalendarCheck className="sidebar-icon" />}
                    label="Attendance"
                    basePath="/attendance"
                    to="/attendance/dashboard"
                    sidebarHovered={hovered}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                >
                    <SubLink to="/attendance/AtendanceEntry" label="Attendance Entry" />
                    <SubLink to="/attendance/AtdendanceList" label="Student Attendance List" />
                </FlyoutItem>

                <li>
                    <Link className={activeClass("/StudentProfile")} to="/StudentProfile">
                        <FaUserGraduate className="sidebar-icon" />
                        {hovered && <span>Student Profile</span>}
                    </Link>
                </li>

                <FlyoutItem
                    icon={<FaCog className="sidebar-icon" />}
                    label="Masters"
                    basePath="/master"
                    to="/master/standard"
                    sidebarHovered={hovered}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                >
                    <SubLink to="/master/standard" label="Standard" />
                    <SubLink to="/master/subjects" label="Subjects" />
                    <SubLink to="/master/hobbies" label="Hobbies" />
                    <SubLink to="/master/inquiry-source" label="Inquiry Source" />
                    <SubLink to="/master/school" label="School" />
                    <SubLink to="/master/feestructure" label="Fee Structure" />
                    <SubLink to="/master/fee-discount" label="Fee Discount" />
                    <SubLink to="/master/fee-installment" label="Fee Installment" />
                </FlyoutItem>

            </ul>
        </div>
    );
}

export default Navbar;