import { useState, useEffect } from "react";

import {
  FaDownload,
  FaUsers,
  FaTasks,
  FaFolderOpen,
  FaChartLine
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import PageHeader from "../../components/common/PageHeader";

import {
  getAllEmployees,
  getAllTasks,
  getAllProjects
} from "../../services/api";

import "./styles/manager-reports.css";

export default function ManagerReports() {

  // =========================================
  // STATES
  // =========================================

  const [employees, setEmployees] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [reportType, setReportType] =
    useState("employees");

  const [exportFormat, setExportFormat] =
    useState("csv");

  const [activeTab, setActiveTab] =
    useState("overall");

  const [selectedEmployee,
    setSelectedEmployee] =
    useState("");

  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {

    const loadData = async () => {

      setLoading(true);

      try {

        const [
          empData,
          taskData,
          projData
        ] = await Promise.all([

          getAllEmployees()
            .catch(() => []),

          getAllTasks()
            .catch(() => []),

          getAllProjects()
            .catch(() => [])

        ]);

        setEmployees(
          Array.isArray(empData)
            ? empData
            : []
        );

        setTasks(
          Array.isArray(taskData)
            ? taskData
            : []
        );

        setProjects(
          Array.isArray(projData)
            ? projData
            : []
        );

      } catch (err) {

        console.error(
          "Error loading reports:",
          err
        );

      } finally {

        setLoading(false);

      }
    };

    loadData();

  }, []);

  // =========================================
  // CHART DATA
  // =========================================

  const analyticsData = [

    {
      name: "Mon",
      tasks: 4
    },

    {
      name: "Tue",
      tasks: 7
    },

    {
      name: "Wed",
      tasks: 5
    },

    {
      name: "Thu",
      tasks: 9
    },

    {
      name: "Fri",
      tasks: 6
    },

    {
      name: "Sat",
      tasks: 8
    },

    {
      name: "Sun",
      tasks: 3
    }

  ];

  // =========================================
  // EMPLOYEE ANALYTICS
  // =========================================

  const employeeData =
    employees.find(

      (emp) =>

        emp.id ==
        selectedEmployee

    );

  const employeeTasks =
    tasks.filter(

      (task) =>

        task.employee?.id ==
        employeeData?.id

    );

  const completedTasks =
    employeeTasks.filter(

      (task) =>

        task.status === "DONE"

    ).length;

  const pendingTasks =
    employeeTasks.filter(

      (task) =>

        task.status !== "DONE"

    ).length;

  // =========================================
  // EXPORT CSV
  // =========================================

  const exportToCSV = (
    data,
    filename
  ) => {

    if (!data.length) {

      alert("No data available");

      return;
    }

    const headers =
      Object.keys(data[0]);

    const csvContent = [

      headers.join(","),

      ...data.map(row =>

        headers.map(header =>

          row[header]

        ).join(",")

      )

    ].join("\n");

    const blob =
      new Blob(
        [csvContent],
        {
          type:
          "text/csv;charset=utf-8;"
        }
      );

    const link =
      document.createElement("a");

    const url =
      URL.createObjectURL(blob);

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // =========================================
  // EXPORT JSON
  // =========================================

  const exportToJSON = (
    data,
    filename
  ) => {

    if (!data.length) {

      alert("No data available");

      return;
    }

    const blob =
      new Blob(

        [
          JSON.stringify(
            data,
            null,
            2
          )
        ],

        {
          type:
          "application/json"
        }
      );

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // =========================================
  // HANDLE EXPORT
  // =========================================

  const handleExport = () => {

    const date =
      new Date()
        .toISOString()
        .split("T")[0];

    let data = [];

    let filename = "";

    if (
      reportType ===
      "employees"
    ) {

      data = employees;

      filename =
        `employees-report-${date}.${exportFormat}`;

    }

    if (
      reportType ===
      "tasks"
    ) {

      data = tasks;

      filename =
        `tasks-report-${date}.${exportFormat}`;

    }

    if (
      reportType ===
      "projects"
    ) {

      data = projects;

      filename =
        `projects-report-${date}.${exportFormat}`;

    }

    if (
      exportFormat ===
      "csv"
    ) {

      exportToCSV(
        data,
        filename
      );

    } else {

      exportToJSON(
        data,
        filename
      );

    }
  };

  // =========================================
  // TABLE DATA
  // =========================================

  const previewData =

    reportType === "employees"

      ? employees

      : reportType === "tasks"

      ? tasks

      : projects;

  return (

    <>

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <PageHeader

        eyebrow="Manager Workspace"

        title="Reports & Analytics"

        description="Monitor team productivity, exports, and company insights"

      />

      {/* ================================= */}
      {/* MAIN PAGE */}
      {/* ================================= */}

      <div className="reports-page">

        <div className="reports-container">

          {/* ================================= */}
          {/* TABS */}
          {/* ================================= */}

          <div className="report-tabs">

            <button

              className={
                activeTab === "overall"
                  ? "active-tab"
                  : ""
              }

              onClick={() =>
                setActiveTab("overall")
              }

            >

              Overall Reports

            </button>

            <button

              className={
                activeTab === "employee"
                  ? "active-tab"
                  : ""
              }

              onClick={() =>
                setActiveTab("employee")
              }

            >

              Employee Reports

            </button>

          </div>

          {/* ================================= */}
          {/* OVERALL REPORTS */}
          {/* ================================= */}

          {

            activeTab === "overall" && (

              <>

                {/* ============================== */}
                {/* STATS */}
                {/* ============================== */}

                <div className="report-stats">

                  <div className="report-stat-card">

                    <FaUsers className="stat-icon" />

                    <h3>Total Employees</h3>

                    <h1>
                      {employees.length}
                    </h1>

                  </div>

                  <div className="report-stat-card">

                    <FaTasks className="stat-icon" />

                    <h3>Total Tasks</h3>

                    <h1>
                      {tasks.length}
                    </h1>

                  </div>

                  <div className="report-stat-card">

                    <FaFolderOpen className="stat-icon" />

                    <h3>Total Projects</h3>

                    <h1>
                      {projects.length}
                    </h1>

                  </div>

                </div>

                {/* ============================== */}
                {/* ANALYTICS CHART */}
                {/* ============================== */}

                <section className="report-chart-section">

                  <div className="chart-card">

                    <div className="chart-header">

                      <div>

                        <h2>

                          <FaChartLine />

                          Weekly Analytics

                        </h2>

                        <p>
                          Productivity insights
                          for current week
                        </p>

                      </div>

                    </div>

                    <ResponsiveContainer
                      width="100%"
                      height={320}
                    >

                      <LineChart
                        data={analyticsData}
                      >

                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#334155"
                        />

                        <XAxis
                          dataKey="name"
                          stroke="#cbd5e1"
                        />

                        <YAxis
                          stroke="#cbd5e1"
                        />

                        <Tooltip />

                        <Line
                          type="monotone"
                          dataKey="tasks"
                          stroke="#38bdf8"
                          strokeWidth={4}
                        />

                      </LineChart>

                    </ResponsiveContainer>

                  </div>

                </section>

                {/* ============================== */}
                {/* REPORT TYPES */}
                {/* ============================== */}

                <section className="report-section">

                  <h2>
                    Select Report Type
                  </h2>

                  <div className="report-cards">

                    <div

                      className={`report-card ${
                        reportType ===
                        "employees"
                          ? "active"
                          : ""
                      }`}

                      onClick={() =>
                        setReportType(
                          "employees"
                        )
                      }

                    >

                      <div className="card-header">

                        <h3>
                          Employees Report
                        </h3>

                        <span className="count">

                          {employees.length}

                        </span>

                      </div>

                      <p>
                        Export employee
                        details and
                        performance
                        records.
                      </p>

                    </div>

                    <div

                      className={`report-card ${
                        reportType ===
                        "tasks"
                          ? "active"
                          : ""
                      }`}

                      onClick={() =>
                        setReportType(
                          "tasks"
                        )
                      }

                    >

                      <div className="card-header">

                        <h3>
                          Tasks Report
                        </h3>

                        <span className="count">

                          {tasks.length}

                        </span>

                      </div>

                      <p>
                        Export assigned
                        tasks and
                        completion
                        reports.
                      </p>

                    </div>

                    <div

                      className={`report-card ${
                        reportType ===
                        "projects"
                          ? "active"
                          : ""
                      }`}

                      onClick={() =>
                        setReportType(
                          "projects"
                        )
                      }

                    >

                      <div className="card-header">

                        <h3>
                          Projects Report
                        </h3>

                        <span className="count">

                          {projects.length}

                        </span>

                      </div>

                      <p>
                        Export project
                        timeline and
                        status analytics.
                      </p>

                    </div>

                  </div>

                </section>

                {/* ============================== */}
                {/* EXPORT */}
                {/* ============================== */}

                <section className="export-section">

                  <h2>
                    Export Settings
                  </h2>

                  <div className="export-controls">

                    <div className="format-group">

                      <label>
                        Format:
                      </label>

                      <select

                        value={
                          exportFormat
                        }

                        onChange={(e) =>
                          setExportFormat(
                            e.target.value
                          )
                        }

                      >

                        <option value="csv">

                          CSV (Excel)

                        </option>

                        <option value="json">

                          JSON

                        </option>

                      </select>

                    </div>

                    <button

                      className="export-btn"

                      onClick={
                        handleExport
                      }

                    >

                      <FaDownload />

                      Export
                      {" "}
                      {
                        reportType
                          .charAt(0)
                          .toUpperCase()
                        +
                        reportType.slice(1)
                      }

                    </button>

                  </div>

                </section>

                {/* ============================== */}
                {/* PREVIEW */}
                {/* ============================== */}

                <section className="preview-section">

                  <h2>
                    Data Preview
                  </h2>

                  {

                    loading ? (

                      <p className="loading">

                        Loading data...

                      </p>

                    ) : (

                      <div className="preview-content">

                        {

                          previewData.length >
                          0 ? (

                            <table className="preview-table">

                              <thead>

                                <tr>

                                  {

                                    Object.keys(
                                      previewData[0]
                                    )

                                    .slice(0, 6)

                                    .map((key) => (

                                      <th key={key}>

                                        {key}

                                      </th>

                                    ))

                                  }

                                </tr>

                              </thead>

                              <tbody>

                                {

                                  previewData

                                    .slice(0, 5)

                                    .map((item, index) => (

                                      <tr key={index}>

                                        {

                                          Object.values(item)

                                            .slice(0, 6)

                                            .map((value, i) => (

                                              <td key={i}>

                                                {

                                                  value?.toString()

                                                }

                                              </td>

                                            ))

                                        }

                                      </tr>

                                    ))

                                }

                              </tbody>

                            </table>

                          ) : (

                            <p className="no-data">

                              No data available

                            </p>

                          )

                        }

                      </div>

                    )

                  }

                </section>

              </>

            )

          }

          {/* ================================= */}
          {/* EMPLOYEE REPORTS */}
          {/* ================================= */}

          {

            activeTab === "employee" && (

              <div className="employee-report-section">

                {/* SELECT */}

                <div className="employee-select-box">

                  <select

                    value={selectedEmployee}

                    onChange={(e) =>
                      setSelectedEmployee(
                        e.target.value
                      )
                    }

                  >

                    <option value="">
                      Select Employee
                    </option>

                    {

                      employees.map(
                        (emp) => (

                          <option
                            key={emp.id}
                            value={emp.id}
                          >

                            {emp.name}

                          </option>

                        )
                      )

                    }

                  </select>

                </div>

                {

                  employeeData && (

                    <>

                      {/* EMPLOYEE INFO */}

                      <div className="report-stats">

                        <div className="report-stat-card">

                          <h3>Name</h3>

                          <h1>
                            {
                              employeeData.name
                            }
                          </h1>

                        </div>

                        <div className="report-stat-card">

                          <h3>Skill</h3>

                          <h1>
                            {
                              employeeData.skill ||
                              "N/A"
                            }
                          </h1>

                        </div>

                        <div className="report-stat-card">

                          <h3>Experience</h3>

                          <h1>
                            {
                              employeeData.experience ||
                              0
                            }Y
                          </h1>

                        </div>

                        <div className="report-stat-card">

                          <h3>Workload</h3>

                          <h1>
                            {
                              employeeData.workload ||
                              0
                            }%
                          </h1>

                        </div>

                      </div>

                      {/* TASK ANALYTICS */}

                      <div className="report-stats">

                        <div className="report-stat-card">

                          <h3>Total Tasks</h3>

                          <h1>
                            {
                              employeeTasks.length
                            }
                          </h1>

                        </div>

                        <div className="report-stat-card">

                          <h3>Completed</h3>

                          <h1>
                            {
                              completedTasks
                            }
                          </h1>

                        </div>

                        <div className="report-stat-card">

                          <h3>Pending</h3>

                          <h1>
                            {
                              pendingTasks
                            }
                          </h1>

                        </div>

                        <div className="report-stat-card">

                          <h3>Performance</h3>

                          <h1>

                            {

                              employeeTasks.length

                              ?

                              Math.round(

                                (
                                  completedTasks /

                                  employeeTasks.length
                                )

                                * 100

                              )

                              :

                              0

                            }%

                          </h1>

                        </div>

                      </div>

                      {/* TASK TABLE */}

                      <section className="preview-section">

                        <h2>
                          Employee Tasks
                        </h2>

                        <div className="preview-content">

                          <table className="preview-table">

                            <thead>

                              <tr>

                                <th>ID</th>

                                <th>Title</th>

                                <th>Status</th>

                                <th>Priority</th>

                              </tr>

                            </thead>

                            <tbody>

                              {

                                employeeTasks.map(
                                  (task) => (

                                    <tr
                                      key={task.id}
                                    >

                                      <td>
                                        {task.id}
                                      </td>

                                      <td>
                                        {task.title}
                                      </td>

                                      <td>
                                        {
                                          task.status
                                        }
                                      </td>

                                      <td>
                                        {
                                          task.priority
                                        }
                                      </td>

                                    </tr>

                                  )
                                )

                              }

                            </tbody>

                          </table>

                        </div>

                      </section>

                    </>

                  )

                }

              </div>

            )

          }

        </div>

      </div>

    </>
  );
}