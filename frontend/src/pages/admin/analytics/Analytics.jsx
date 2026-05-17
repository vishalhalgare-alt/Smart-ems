import AnalyticsCards
  from "./components/AnalyticsCards";

import EmployeeGrowthChart
  from "./components/EmployeeGrowthChart";

import AttendanceChart
  from "./components/AttendanceChart";

import TaskChart
  from "./components/TaskChart";

import PerformanceTable
  from "./components/PerformanceTable";

import "./styles/analytics.css";

export default function Analytics() {

  return (

    <div className="analytics-page">

      {/* HEADER */}

      <div className="analytics-header">

        <div>

          <p className="analytics-tag">
            ADMIN WORKSPACE
          </p>

          <h1>
            Analytics Dashboard
          </h1>

          <p className="analytics-subtitle">
            Monitor company growth,
            workforce productivity,
            attendance trends,
            project performance,
            and operational analytics.
          </p>

        </div>

      </div>

      {/* KPI CARDS */}

      <AnalyticsCards />

      {/* CHARTS */}

      <div className="analytics-chart-grid">

        <EmployeeGrowthChart />

        <AttendanceChart />

      </div>

      <div className="analytics-chart-grid">

        <TaskChart />

        <PerformanceTable />

      </div>

    </div>
  );
}