import { useState, useEffect } from "react";

import "../styles/manager-dashboard.css";

import ChartBox from "../components/ChartBox";
import TaskTable from "../components/TaskTable";
import NotificationBox from "../components/NotificationBox";
import ProfileCard from "../components/ProfileCard";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaFolder
} from "react-icons/fa";

import StatsCard from "../components/StatsCard";

import {
  getDashboardStats,
  getAllTasks
} from "../services/api";

function ManagerDashboard() {

  const [dashboardData, setDashboardData] =
    useState(null);

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          setLoading(true);

          setError(null);

          console.log(
            "Fetching manager dashboard..."
          );

          const dashData =
            await getDashboardStats();

          console.log(
            "Dashboard stats:",
            dashData
          );

          const tasksData =
            await getAllTasks();

          console.log(
            "Tasks:",
            tasksData
          );

          setDashboardData(
            dashData
          );

          setTasks(
            tasksData
          );

        } catch (err) {

          console.error(
            "Dashboard Error:",
            err
          );

          setError(

            err.message ||

            "Failed to load dashboard"

          );

        } finally {

          setLoading(false);

        }
      };

    fetchData();

  }, []);

  // =========================================
  // LOADING UI
  // =========================================

  if (loading) {

    return (

      <div className="dashboard-loading">

        Loading Manager Dashboard...

      </div>

    );
  }

  // =========================================
  // ERROR UI
  // =========================================

  if (error) {

    return (

      <div className="dashboard-error">

        Error: {error}

      </div>

    );
  }

  // =========================================
  // MAIN DASHBOARD
  // =========================================

  return (

    <div className="main">

      {/* ============================== */}
      {/* PAGE HEADER */}
      {/* ============================== */}

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Manager Dashboard
          </h1>

          <p className="page-subtitle">
            Welcome back,
            {" "}
            {
              localStorage.getItem("name")
            || "Manager"
            }
            👋
          </p>

        </div>

      </div>

      {/* ============================== */}
      {/* STATS CARDS */}
      {/* ============================== */}

      <div className="cards">

        <StatsCard
          title="Total Tasks"
          value={
            dashboardData?.totalTasks || "0"
          }
          icon={<FaTasks />}
        />

        <StatsCard
          title="Completed"
          value={
            dashboardData?.completedTasks || "0"
          }
          icon={<FaCheckCircle />}
        />

        <StatsCard
          title="Pending"
          value={
            dashboardData?.pendingTasks || "0"
          }
          icon={<FaClock />}
        />

        <StatsCard
          title="Projects"
          value={
            dashboardData?.totalProjects || "0"
          }
          icon={<FaFolder />}
        />

      </div>

      {/* ============================== */}
      {/* CHART SECTION */}
      {/* ============================== */}

      <div className="dashboard-section">

        <ChartBox />

      </div>

      {/* ============================== */}
      {/* LOWER GRID */}
      {/* ============================== */}

      <div className="bottomGrid">

        <div className="dashboard-card">

          <TaskTable
            tasks={tasks}
          />

        </div>

        <div className="dashboard-side-column">

          <div className="dashboard-card">

            <NotificationBox />

          </div>

          <div className="dashboard-card">

            <ProfileCard />

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManagerDashboard;