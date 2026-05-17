import { NavLink } from "react-router-dom";

import {
  FaLock,
  FaShieldAlt,
  FaSignOutAlt,
  FaUsers
} from "react-icons/fa";

export default function Sidebar({

  items,
  isOpen,
  onNavigate,
  onLogout

}) {

  const role =
    localStorage.getItem("role");

  const isManager =
    role === "MANAGER";

  return (

    <aside
      className={`app-sidebar ${isOpen ? "is-open" : ""}`}
    >

      <div>

        {/* ========================= */}
        {/* BRAND */}
        {/* ========================= */}

        <div className="app-sidebar__brand">

          <span className="app-sidebar__mark">
            <FaShieldAlt />
          </span>

          <div>
            <strong>Smart EMS</strong>
            <span>IT Operations Suite</span>
          </div>

        </div>

        {/* ========================= */}
        {/* NAVIGATION */}
        {/* ========================= */}

        <nav className="app-sidebar__nav">

          {items.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                className={({ isActive }) =>
                  `app-sidebar__link ${
                    isActive ? "active" : ""
                  }`
                }
                end={item.end}
                key={item.path}
                onClick={onNavigate}
                to={item.path}
                title={item.label}
              >

                <Icon />

                <span>
                  {item.label}
                </span>

                {item.badge && (

                  <em className="app-sidebar__badge">

                    {item.badge}

                  </em>

                )}

              </NavLink>

            );

          })}

        </nav>

      </div>

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <div className="app-sidebar__footer">

        <div className="app-sidebar__security">

          {

            isManager

              ? <FaUsers />

              : <FaLock />

          }

          <div>

            <strong>

              {

                isManager

                  ? "Team Workspace"

                  : "Secure Admin"

              }

            </strong>

            <span>

              {

                isManager

                  ? "Manager Access"

                  : "2FA enabled"

              }

            </span>

          </div>

        </div>

        <button
          className="app-sidebar__logout"
          type="button"
          onClick={onLogout}
        >

          <FaSignOutAlt />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}