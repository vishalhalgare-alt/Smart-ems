import {
  useState,
  useEffect,
  useCallback
} from "react";

import {
  getAllEmployees
} from "../services/api";

import "./styles/employees.css";

export default function Employees() {

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  // =========================
  // LOAD EMPLOYEES
  // =========================

  const loadEmployees =
    useCallback(async () => {

      setLoading(true);

      setError(null);

      try {

        const employeeData =
          await getAllEmployees();

        // =========================
        // LOAD TASKS
        // =========================

        const taskResponse =
          await fetch(
            "http://localhost:8081/api/tasks"
          );

        const tasks =
          await taskResponse.json();

        // =========================
        // LOAD ATTENDANCE
        // =========================

        const updatedEmployees =
          await Promise.all(

            employeeData.map(
              async (emp) => {

                try {

                  const attendanceResponse =
                    await fetch(

                      `http://localhost:8081/attendance/employee/${emp.id}`
                    );

                  const attendance =
                    await attendanceResponse.json();

                  // =========================
                  // ATTENDANCE %
                  // =========================

                  const presentDays =
                    attendance.filter(

                      (a) =>
                        a.status ===
                        "PRESENT"
                    ).length;

                  const attendancePercentage =
                    attendance.length > 0

                      ? Math.round(
                          (
                            presentDays /
                            attendance.length
                          ) * 100
                        )

                      : 0;

                  // =========================
                  // TASKS
                  // =========================

                  const employeeTasks =
                    tasks.filter(

                      (task) =>
                        task.employee &&
                        task.employee.id === emp.id
                    );

                  const completedTasks =
                    employeeTasks.filter(

                      (task) =>
                        task.status ===
                        "DONE"
                    ).length;

                  const performance =
                    employeeTasks.length > 0

                      ? Math.round(
                          (
                            completedTasks /
                            employeeTasks.length
                          ) * 100
                        )

                      : 0;

                  return {

                    ...emp,

                    attendancePercentage,

                    performance,

                    totalTasks:
                      employeeTasks.length,

                    completedTasks,

                    activeStatus:
                      attendance.length > 0
                        ? "Active"
                        : "Inactive",
                  };

                } catch (err) {

                  console.error(err);

                  return {

                    ...emp,

                    attendancePercentage: 0,

                    performance: 0,

                    totalTasks: 0,

                    completedTasks: 0,

                    activeStatus:
                      "Inactive",
                  };
                }
              }
            )
          );

        setEmployees(
          updatedEmployees
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load employees"
        );

      } finally {

        setLoading(false);
      }

    }, []);

  useEffect(() => {

    loadEmployees();

  }, [loadEmployees]);

  // =========================
  // FILTER
  // =========================

  const filteredEmployees =
    employees.filter((emp) =>

      emp.name
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

      ||

      emp.email
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

      ||

      emp.skill
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  return (

    <div className="employees-page">

      <div className="page-content">

        {/* HEADER */}

        <div className="header-section">

          <h1>
            Employee Directory
          </h1>

          <p>
            Real-time employee analytics
          </p>

        </div>

        {/* SEARCH */}

        <div className="search-section">

          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="search-input"
          />

          <button
            className="refresh-button"
            onClick={loadEmployees}
          >

            Refresh

          </button>

        </div>

        {/* ERROR */}

        {error && (

          <div className="error-banner">

            {error}

          </div>

        )}

        {/* LOADING */}

        {loading && (

          <div className="loading-state">

            Loading employees...

          </div>

        )}

        {/* EMPLOYEES */}

        {!loading && (

          <div className="employees-grid">

            {filteredEmployees.map(
              (emp) => (

                <div
                  key={emp.id}
                  className="employee-card"
                >

                  {/* AVATAR */}

                  <div className="employee-avatar">

                    {(emp.name || "E")
                      .charAt(0)
                      .toUpperCase()}

                  </div>

                  {/* INFO */}

                  <div className="employee-info">

                    <h3>
                      {emp.name}
                    </h3>

                    <p className="email">
                      {emp.email}
                    </p>

                    <p>

                      <strong>
                        Role:
                      </strong>{" "}

                      {emp.role}

                    </p>

                    <p>

                      <strong>
                        Skill:
                      </strong>{" "}

                      {emp.skill}

                    </p>

                    <p>

                      <strong>
                        Experience:
                      </strong>{" "}

                      {emp.experience} Years

                    </p>

                    <p>

                      <strong>
                        Workload:
                      </strong>{" "}

                      {emp.workload}%

                    </p>

                    <p>

                      <strong>
                        Attendance:
                      </strong>{" "}

                      {
                        emp.attendancePercentage
                      }%

                    </p>

                    <p>

                      <strong>
                        Performance:
                      </strong>{" "}

                      {
                        emp.performance
                      }%

                    </p>

                    <p>

                      <strong>
                        Tasks:
                      </strong>{" "}

                      {
                        emp.completedTasks
                      }

                      /

                      {
                        emp.totalTasks
                      }

                    </p>

                    <p>

                      <strong>
                        Status:
                      </strong>{" "}

                      {
                        emp.activeStatus
                      }

                    </p>

                  </div>

                </div>
              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}