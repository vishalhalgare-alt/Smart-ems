import { useState } from "react";

import {
  Outlet,
  useNavigate
} from "react-router-dom";

import TopNavbar
from "../components/navbar/TopNavbar";

import Sidebar
from "../components/sidebar/Sidebar";

import {

  adminSidebarItems,

  managerSidebarItems

} from "../data/navigation";

export default function DashboardLayout({

  title

}) {

  const navigate =
    useNavigate();

  // =====================================
  // SIDEBAR STATE
  // =====================================

  const [sidebarOpen, setSidebarOpen] =
    useState(window.innerWidth >= 768);

  // =====================================
  // SEARCH STATE
  // =====================================

  const [searchValue, setSearchValue] =
    useState("");

  // =====================================
  // USER DATA
  // =====================================

  const role =
    localStorage.getItem("role");

  const userName =
    localStorage.getItem("name") ||

    "User";

  // =====================================
  // MANAGER SIDEBAR ADD LEAVES
  // =====================================

  const updatedManagerSidebar = [

    ...managerSidebarItems,

    {
      label: "Leaves",

      path: "/manager/leaves",

      icon: "calendar",
    },
  ];

  // =====================================
  // ROLE-BASED SIDEBAR
  // =====================================

  const sidebarItems =

    role === "MANAGER"

      ? updatedManagerSidebar

      : adminSidebarItems;

  // =====================================
  // ROLE-BASED TITLE
  // =====================================

  const dashboardTitle =

    role === "MANAGER"

      ? "Manager Operations Dashboard"

      : "Company Operations Dashboard";

  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div className="dashboard-layout">

      {/* ============================== */}
      {/* MOBILE OVERLAY */}
      {/* ============================== */}

      {

        sidebarOpen &&

        window.innerWidth < 768 && (

          <button
            className="dashboard-layout__overlay"
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          />

        )

      }

      {/* ============================== */}
      {/* SIDEBAR */}
      {/* ============================== */}

      <Sidebar
        items={sidebarItems}
        isOpen={sidebarOpen}
        onNavigate={() => {

          if (window.innerWidth < 768) {

            setSidebarOpen(false);

          }

        }}
        onLogout={logout}
      />

      {/* ============================== */}
      {/* MAIN CONTENT */}
      {/* ============================== */}

      <main className="dashboard-layout__main">

        <div className="dashboard-layout__content">

          <TopNavbar
            title={
              title || dashboardTitle
            }
            userName={userName}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <Outlet
            context={{
              searchValue
            }}
          />

        </div>

      </main>

    </div>

  );

}