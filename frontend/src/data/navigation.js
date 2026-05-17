import {
  FaHome,
  FaUsers,
  FaTasks,
  FaFolderOpen,
  FaBell,
  FaCog,
  FaUserTie,
  FaClipboardList,
  FaChartBar,
  FaCalendarAlt
} from "react-icons/fa";

// =========================
// ADMIN SIDEBAR
// =========================

export const adminSidebarItems = [

  {
    label: "Dashboard",
    path: "/admin",
    icon: FaHome,
    end: true
  },

  {
    label: "Employees",
    path: "/admin/employees",
    icon: FaUsers
  },

  {
    label: "Managers",
    path: "/admin/managers",
    icon: FaUserTie
  },

  {
    label: "Projects",
    path: "/admin/projects",
    icon: FaFolderOpen
  },

  {
    label: "Tasks",
    path: "/admin/tasks",
    icon: FaTasks
  },

  {
    label: "Attendance",
    path: "/admin/attendance",
    icon: FaClipboardList
  },

  {
    label: "Reports",
    path: "/admin/reports",
    icon: FaChartBar
  },

  {
    label: "Notifications",
    path: "/admin/notifications",
    icon: FaBell,
    badge: 8
  },

  {
    label: "Settings",
    path: "/admin/settings",
    icon: FaCog
  }

];

// =========================
// MANAGER SIDEBAR
// =========================

export const managerSidebarItems = [

  {
    label: "Dashboard",
    path: "/manager",
    icon: FaHome,
    end: true
  },

  {
    label: "Employees",
    path: "/manager/employees",
    icon: FaUsers
  },

  {
    label: "Projects",
    path: "/manager/projects",
    icon: FaFolderOpen
  },

  {
    label: "Tasks",
    path: "/manager/tasks",
    icon: FaTasks
  },

  // =========================
  // LEAVES ADDED
  // =========================

  {
    label: "Leaves",
    path: "/manager/leaves",
    icon: FaCalendarAlt
  },

  {
    label: "Reports",
    path: "/manager/reports",
    icon: FaChartBar
  },

  {
    label: "Notifications",
    path: "/manager/notifications",
    icon: FaBell,
    badge: 3
  },

  {
    label: "Settings",
    path: "/manager/settings",
    icon: FaCog
  }

];