import {
  useEffect,
  useState
} from "react";

import "../../styles/employee-dashboard.css";

export default function Tasks() {

  const [tasks,
    setTasks] =
      useState([]);

  const employeeEmail =
    localStorage.getItem("email");

  // =========================
  // LOAD TASKS
  // =========================

  useEffect(() => {

    loadTasks();

  }, []);

  const loadTasks =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:8081/tasks"
          );

        const data =
          await response.json();

        // ONLY ASSIGNED TASKS

        const myTasks =
          data.filter(
            (task) =>

              task.assignedTo ===
              employeeEmail
          );

        setTasks(myTasks);

      } catch (error) {

        console.error(error);
      }
    };

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await fetch(

          `http://localhost:8081/tasks/${id}/status?status=${status}`,

          {
            method: "PUT",
          }
        );

        loadTasks();

      } catch (error) {

        console.error(error);
      }
    };

  // =========================
  // COUNTS
  // =========================

  const completed =
    tasks.filter(
      (t) =>
        t.status === "DONE"
    ).length;

  const pending =
    tasks.filter(
      (t) =>
        t.status === "PENDING"
    ).length;

  const progress =
    tasks.filter(
      (t) =>
        t.status === "IN_PROGRESS"
    ).length;

  return (

    <div className="emp-container">

      {/* HEADER */}

      <div className="emp-navbar">

        <div>

          <h1>
            My Tasks
          </h1>

          <p>
            Manage your assigned tasks
          </p>

        </div>

      </div>

      {/* STATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <div className="profile-card">

          <h3>
            My Tasks
          </h3>

          <h1>
            {tasks.length}
          </h1>

        </div>

        <div className="profile-card">

          <h3>
            Completed
          </h3>

          <h1>
            {completed}
          </h1>

        </div>

        <div className="profile-card">

          <h3>
            In Progress
          </h3>

          <h1>
            {progress}
          </h1>

        </div>

        <div className="profile-card">

          <h3>
            Pending
          </h3>

          <h1>
            {pending}
          </h1>

        </div>

      </div>

      {/* TASK TABLE */}

      <div className="emp-section">

        <div className="section-header">

          <h2>
            Assigned Tasks
          </h2>

        </div>

        <div className="emp-table-wrapper">

          <table className="emp-task-table">

            <thead>

              <tr>

                <th>ID</th>

                <th>Task</th>

                <th>Description</th>

                <th>Status</th>

                <th>Priority</th>

                <th>Due Date</th>

                <th>Update</th>

              </tr>

            </thead>

            <tbody>

              {tasks.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "30px"
                    }}
                  >

                    No tasks assigned yet

                  </td>

                </tr>

              ) : (

                tasks.map(
                  (task) => (

                    <tr
                      key={task.id}
                    >

                      <td>
                        #{task.id}
                      </td>

                      <td>
                        {task.title}
                      </td>

                      <td>
                        {
                          task.description
                        }
                      </td>

                      <td>

                        <span
                          className={`status-badge ${task.status}`}
                        >

                          {
                            task.status
                          }

                        </span>

                      </td>

                      <td>
                        {
                          task.priority
                        }
                      </td>

                      <td>
                        {
                          task.dueDate
                        }
                      </td>

                      <td>

                        <select
                          value={
                            task.status
                          }
                          onChange={(e) =>
                            updateStatus(
                              task.id,
                              e.target.value
                            )
                          }
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            background: "#111827",
                            color: "white",
                            border:
                              "1px solid #374151"
                          }}
                        >

                          <option value="PENDING">
                            Pending
                          </option>

                          <option value="IN_PROGRESS">
                            In Progress
                          </option>

                          <option value="DONE">
                            Done
                          </option>

                        </select>

                      </td>

                    </tr>

                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}