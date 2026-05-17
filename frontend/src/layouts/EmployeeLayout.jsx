import {
  Outlet,
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  FaTasks,
  FaCalendarCheck,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
  FaLayerGroup
} from "react-icons/fa";

import "../styles/dashboard.css";

export default function EmployeeLayout() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <div className="dashboard-layout">

      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <aside className="employee-sidebar">

        {/* TOP */}

        <div>

          <div className="employee-logo-section">

            <div className="employee-logo-icon">

              <FaLayerGroup />

            </div>

            <div>

              <h2>
                Smart EMS
              </h2>

              <p>
                Employee Workspace
              </p>

            </div>

          </div>

          {/* NAVIGATION */}

          <nav className="employee-sidebar-nav">

            <NavLink
              to="/employee"
              end
              className="employee-nav-item"
            >

              <FaClipboardList />

              <span>
                Dashboard
              </span>

            </NavLink>

            <NavLink
              to="/employee/tasks"
              className="employee-nav-item"
            >

              <FaTasks />

              <span>
                Tasks
              </span>

            </NavLink>

            <NavLink
              to="/employee/attendance"
              className="employee-nav-item"
            >

              <FaCalendarCheck />

              <span>
                Attendance
              </span>

            </NavLink>

            <NavLink
              to="/employee/leaves"
              className="employee-nav-item"
            >

              <FaClipboardList />

              <span>
                Leaves
              </span>

            </NavLink>

            <NavLink
              to="/employee/profile"
              className="employee-nav-item"
            >

              <FaUserCircle />

              <span>
                Profile
              </span>

            </NavLink>

          </nav>

        </div>

        {/* LOGOUT */}

        <button
          className="employee-logout-btn"
          onClick={logout}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </aside>

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <main className="employee-main-content">

        <Outlet />

      </main>

    </div>
  );
}