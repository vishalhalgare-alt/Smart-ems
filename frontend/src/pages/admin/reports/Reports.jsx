import {
  useEffect,
  useState
} from "react";

import {
  FileText,
  Users,
  Briefcase,
  ClipboardList,
  CalendarCheck,
  Download
} from "lucide-react";

import {
  getDashboardReports,
  exportReports
} from "../../../services/api";

import "./styles/reports.css";

export default function Reports() {

  const [reports, setReports] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD REPORTS
  // =========================

  useEffect(() => {

    loadReports();

  }, []);

  const loadReports = async () => {

    try {

      const data =
        await getDashboardReports();

      setReports(data);

    } catch (error) {

      console.error(
        "Failed to load reports",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // EXPORT REPORTS
  // =========================

  const handleExport = async () => {

    try {

      const blob =
        await exportReports();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = "reports.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(
        "Export failed",
        error
      );

      alert("Failed to export reports");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="reports-loading">

        Loading reports...

      </div>
    );
  }

  return (

    <div className="reports-page">

      {/* HEADER */}

      <div className="reports-header">

        <div>

          <p className="reports-tag">
            ADMIN WORKSPACE
          </p>

          <h1>
            Reports & Analytics
          </h1>

          <p className="reports-subtitle">
            Monitor workforce performance,
            attendance, productivity,
            projects, and operational reports.
          </p>

        </div>

        <button
          className="export-btn"
          onClick={handleExport}
        >

          <Download size={18} />

          Export Reports

        </button>

      </div>

      {/* STATS */}

      <div className="reports-stats-grid">

        <div className="report-card">

          <div className="report-icon blue">
            <Users size={22} />
          </div>

          <div>

            <h3>Total Employees</h3>

            <h2>
              {reports.totalEmployees}
            </h2>

            <p>
              Active workforce members
            </p>

          </div>

        </div>

        <div className="report-card">

          <div className="report-icon green">
            <Briefcase size={22} />
          </div>

          <div>

            <h3>Active Projects</h3>

            <h2>
              {reports.activeProjects}
            </h2>

            <p>
              Running company projects
            </p>

          </div>

        </div>

        <div className="report-card">

          <div className="report-icon orange">
            <ClipboardList size={22} />
          </div>

          <div>

            <h3>Completed Tasks</h3>

            <h2>
              {reports.completedTasks}
            </h2>

            <p>
              Tasks completed this month
            </p>

          </div>

        </div>

        <div className="report-card">

          <div className="report-icon red">
            <CalendarCheck size={22} />
          </div>

          <div>

            <h3>Attendance Rate</h3>

            <h2>
              {reports.attendanceRate}%
            </h2>

            <p>
              Overall employee attendance
            </p>

          </div>

        </div>

      </div>

      {/* REPORT BOXES */}

      <div className="reports-grid">

        {/* ATTENDANCE */}

        <div className="reports-box">

          <div className="reports-box-header">

            <h2>
              Attendance Summary
            </h2>

            <FileText size={18} />

          </div>

          <div className="report-list">

            <div className="report-item">

              <span>
                Present Employees
              </span>

              <strong>
                {reports.presentEmployees}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Absent Employees
              </span>

              <strong>
                {reports.absentEmployees}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Late Check-ins
              </span>

              <strong>
                {reports.lateCheckins}
              </strong>

            </div>

          </div>

        </div>

        {/* LEAVE */}

        <div className="reports-box">

          <div className="reports-box-header">

            <h2>
              Leave Report
            </h2>

            <FileText size={18} />

          </div>

          <div className="report-list">

            <div className="report-item">

              <span>
                Pending Requests
              </span>

              <strong>
                {reports.pendingLeaves}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Approved Leaves
              </span>

              <strong>
                {reports.approvedLeaves}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Rejected Requests
              </span>

              <strong>
                {reports.rejectedLeaves}
              </strong>

            </div>

          </div>

        </div>

        {/* TASKS */}

        <div className="reports-box">

          <div className="reports-box-header">

            <h2>
              Task Productivity
            </h2>

            <FileText size={18} />

          </div>

          <div className="report-list">

            <div className="report-item">

              <span>
                Completed Tasks
              </span>

              <strong>
                {reports.completedTasks}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Pending Tasks
              </span>

              <strong>
                {reports.pendingTasks}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Overdue Tasks
              </span>

              <strong>
                {reports.overdueTasks}
              </strong>

            </div>

          </div>

        </div>

        {/* PROJECTS */}

        <div className="reports-box">

          <div className="reports-box-header">

            <h2>
              Project Overview
            </h2>

            <FileText size={18} />

          </div>

          <div className="report-list">

            <div className="report-item">

              <span>
                Running Projects
              </span>

              <strong>
                {reports.activeProjects}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Completed Projects
              </span>

              <strong>
                {reports.completedProjects}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Delayed Projects
              </span>

              <strong>
                {reports.delayedProjects}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}