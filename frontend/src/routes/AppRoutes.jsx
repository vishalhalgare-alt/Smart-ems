import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import DashboardLayout
from "../layouts/DashboardLayout";

import EmployeeLayout
from "../layouts/EmployeeLayout";

import Login
from "../pages/Login";

// =========================
// MANAGER PAGES
// =========================

import ManagerDashboard
from "../pages/manager/Dashboard";

import ManagerEmployees
from "../pages/manager/Employees";

import ManagerProjects
from "../pages/manager/Projects";

import ManagerTasks
from "../pages/manager/Tasks";

import ManagerReports
from "../pages/manager/Reports";

import ManagerSettings
from "../pages/manager/Settings";

import ManagerNotifications
from "../pages/manager/Notifications";

import ManagerLeaves
from "../pages/manager/Leaves";

// =========================
// ADMIN PAGES
// =========================

import AdminDashboard
from "../pages/admin/Dashboard";

import AdminEmployees
from "../pages/admin/Employees";

import AdminManagers
from "../pages/admin/Managers";

import AdminProjects
from "../pages/admin/Projects";

import AdminTasks
from "../pages/admin/Tasks";

import AdminAttendance
from "../pages/admin/Attendance";

import LeaveRequests
from "../pages/admin/leave/LeaveRequests";

import AdminReports
from "../pages/admin/reports/Reports";

import AdminAnalytics
from "../pages/admin/analytics/Analytics";

import AdminNotifications
from "../pages/admin/Notifications";

import AdminSettings
from "../pages/admin/Settings";

// =========================
// EMPLOYEE PAGES
// =========================

import EmployeeDashboard
from "../pages/employee/Dashboard";

import EmployeeTasks
from "../pages/employee/Tasks";

import EmployeeAttendance
from "../pages/employee/Attendance";

import EmployeeLeaves
from "../pages/employee/Leaves";

import EmployeeProfile
from "../pages/employee/Profile";

// =========================
// PROTECTED ROUTE
// =========================

function ProtectedRoute({

  children,

  allowedRoles

}) {

  const role =
    localStorage.getItem("role");

  const token =
    localStorage.getItem("token");

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (

    allowedRoles &&

    !allowedRoles.includes(role)

  ) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

// =========================
// APP ROUTES
// =========================

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ========================= */}
        {/* ADMIN ROUTES */}
        {/* ========================= */}

        <Route
          path="/admin"
          element={

            <ProtectedRoute
              allowedRoles={["ADMIN"]}
            >

              <DashboardLayout />

            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="employees"
            element={<AdminEmployees />}
          />

          {/* NEW ROUTES */}

          <Route
            path="employees/:id"
            element={<AdminEmployees />}
          />

          <Route
            path="employees/edit/:id"
            element={<AdminEmployees />}
          />

          <Route
            path="managers"
            element={<AdminManagers />}
          />

          <Route
            path="projects"
            element={<AdminProjects />}
          />

          <Route
            path="tasks"
            element={<AdminTasks />}
          />

          <Route
            path="attendance"
            element={<AdminAttendance />}
          />

          <Route
            path="leave"
            element={<LeaveRequests />}
          />

          <Route
            path="reports"
            element={<AdminReports />}
          />

          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />

          <Route
            path="notifications"
            element={<AdminNotifications />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />

        </Route>

        {/* ========================= */}
        {/* MANAGER ROUTES */}
        {/* ========================= */}

        <Route
          path="/manager"
          element={

            <ProtectedRoute
              allowedRoles={["MANAGER"]}
            >

              <DashboardLayout />

            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<ManagerDashboard />}
          />

          <Route
            path="tasks"
            element={<ManagerTasks />}
          />

          <Route
            path="employees"
            element={<ManagerEmployees />}
          />

          <Route
            path="projects"
            element={<ManagerProjects />}
          />

          <Route
            path="reports"
            element={<ManagerReports />}
          />

          <Route
            path="leaves"
            element={<ManagerLeaves />}
          />

          <Route
            path="notifications"
            element={<ManagerNotifications />}
          />

          <Route
            path="settings"
            element={<ManagerSettings />}
          />

        </Route>

        {/* ========================= */}
        {/* EMPLOYEE ROUTES */}
        {/* ========================= */}

        <Route
          path="/employee"
          element={

            <ProtectedRoute
              allowedRoles={["EMPLOYEE"]}
            >

              <EmployeeLayout />

            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<EmployeeDashboard />}
          />

          <Route
            path="tasks"
            element={<EmployeeTasks />}
          />

          <Route
            path="attendance"
            element={<EmployeeAttendance />}
          />

          <Route
            path="leaves"
            element={<EmployeeLeaves />}
          />

          <Route
            path="profile"
            element={<EmployeeProfile />}
          />

        </Route>

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}