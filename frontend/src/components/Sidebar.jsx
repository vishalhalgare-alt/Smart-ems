import {
  FaChartPie,
  FaChartLine,
  FaTasks,
  FaUsers,
  FaFolder,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaBell,
  FaQuestionCircle
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {

  const menuItems = [
    {
      path: "/",
      icon: <FaChartPie />,
      name: "Dashboard"
    },
    {
      path: "/tasks",
      icon: <FaTasks />,
      name: "Tasks",
  
    },
    {
      path: "/employees",
      icon: <FaUsers />,
      name: "Employees"
    },
    {
      path: "/projects",
      icon: <FaFolder />,
      name: "Projects"
    },
    {
      path: "/reports",
      icon: <FaFileAlt />,
      name: "Reports"
    },
    {
      path: "/settings",
      icon: <FaCog />,
      name: "Settings"
    }
  ];

  const generalItems = [
    {
      path: "/notifications",
      icon: <FaBell />,
      name: "Notifications"
    },
    {
      path: "/help",
      icon: <FaQuestionCircle />,
      name: "Help & Support"
    }
  ];

  return (

    <aside className="sidebar">

      {/* SIDEBAR TOP */}

      <div className="sidebarTop">

        {/* LOGO */}

        <div className="logo">

          <FaChartLine className="logoIcon" />

          <h1>Manager</h1>

        </div>

        {/* MENU */}

        <div className="menuSection">
          <p className="menuLabel">MENU</p>
          <ul className="menu">

            {
              menuItems.map((item) => (

                <li key={item.path}>

                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "navItem active"
                        : "navItem"
                    }
                  >

                    {item.icon}

                    <span>{item.name}</span>

                    {item.badge && <span className="badge">{item.badge}</span>}

                  </NavLink>

                </li>

              ))
            }

          </ul>
        </div>

        {/* GENERAL */}

        <div className="menuSection">
          <p className="menuLabel">GENERAL</p>
          <ul className="menu">

            {
              generalItems.map((item) => (

                <li key={item.path}>

                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "navItem active"
                        : "navItem"
                    }
                  >

                    {item.icon}

                    <span>{item.name}</span>

                  </NavLink>

                </li>

              ))
            }

          </ul>
        </div>

      </div>

      {/* SIDEBAR BOTTOM */}

      <div className="sidebarBottom">

        {/* LOGOUT */}

        <button className="logout">

          <FaSignOutAlt />

          <span>Logout</span>

        </button>

        {/* FOOTER */}

        <div className="sidebarFooter">

          Smart EMS v1.0

        </div>

      </div>

    </aside>

  );

}

export default Sidebar;