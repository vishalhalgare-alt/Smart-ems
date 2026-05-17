import {
  useEffect,
  useState
} from "react";

import {
  FaPlus,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes
} from "react-icons/fa";

import "../../styles/dashboard.css";

import {

  getAllTasks,

  getAllEmployees,

  getAllProjects,

  createTask

} from "../../services/api";

export default function ManagerTasks() {

  // ===================================
  // STATES
  // ===================================

  const [tasks, setTasks] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("ALL");

  const [showModal, setShowModal] =
    useState(false);

  // ===================================
  // FORM STATE
  // ===================================

  const [taskForm, setTaskForm] =
    useState({

      title: "",

      description: "",

      priority: "MEDIUM",

      status: "PENDING",

      deadline: "",

      employeeId: "",

      projectId: ""

    });

  // ===================================
  // LOAD DATA
  // ===================================

  useEffect(() => {

    loadTasks();

    loadEmployees();

    loadProjects();

  }, []);

  const loadTasks = async () => {

    try {

      const data =
        await getAllTasks();

      setTasks(data);

    } catch (error) {

      console.error(
        "Failed to load tasks",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  const loadEmployees =
    async () => {

      try {

        const data =
          await getAllEmployees();

        setEmployees(data);

      } catch (error) {

        console.error(
          "Failed to load employees",
          error
        );
      }
    };

  const loadProjects =
    async () => {

      try {

        const data =
          await getAllProjects();

        setProjects(data);

      } catch (error) {

        console.error(
          "Failed to load projects",
          error
        );
      }
    };

  // ===================================
  // FILTER TASKS
  // ===================================

  const filteredTasks =

    filter === "ALL"

      ? tasks

      : tasks.filter(
          (task) =>
            task.status === filter
        );

  // ===================================
  // COUNTS
  // ===================================

  const completedCount =
    tasks.filter(
      (t) =>
        t.status === "COMPLETED"
    ).length;

  const pendingCount =
    tasks.filter(
      (t) =>
        t.status === "PENDING"
    ).length;

  const overdueCount =
    tasks.filter(
      (t) =>
        t.status === "OVERDUE"
    ).length;

  // ===================================
  // HANDLE FORM
  // ===================================

  const handleChange =
    (e) => {

      setTaskForm({

        ...taskForm,

        [e.target.name]:
          e.target.value

      });
    };

  // ===================================
  // CREATE TASK
  // ===================================

  const handleCreateTask =
    async (e) => {

      e.preventDefault();

      try {

        await createTask({

          title:
            taskForm.title,

          description:
            taskForm.description,

          priority:
            taskForm.priority,

          status:
            taskForm.status,

          dueDate:
            taskForm.deadline,

          employee: {

            id:
              taskForm.employeeId
          },

          project: {

            id:
              taskForm.projectId
          }
        });

        setShowModal(false);

        setTaskForm({

          title: "",

          description: "",

          priority: "MEDIUM",

          status: "PENDING",

          deadline: "",

          employeeId: "",

          projectId: ""

        });

        loadTasks();

      } catch (error) {

        console.error(
          "Failed to create task",
          error
        );
      }
    };

  // ===================================
  // UI
  // ===================================

  return (

    <div className="analytics-page">

      {/* HEADER */}

      <div className="analytics-header">

        <div className="analytics-tag">
          TASK MANAGEMENT
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >

          <div>

            <h1>
              Manager Tasks
            </h1>

            <p className="analytics-subtitle">

              Manage employee tasks,
              deadlines,
              and productivity.

            </p>

          </div>

          <button
            className="addBtn"
            onClick={() =>
              setShowModal(true)
            }
          >

            <FaPlus />

            Add Task

          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="analytics-cards-grid">

        <div className="analytics-card">

          <div className="analytics-icon blue">

            <FaClock />

          </div>

          <div>

            <h3>
              Pending Tasks
            </h3>

            <h2>
              {pendingCount}
            </h2>

          </div>

        </div>

        <div className="analytics-card">

          <div className="analytics-icon green">

            <FaCheckCircle />

          </div>

          <div>

            <h3>
              Completed
            </h3>

            <h2>
              {completedCount}
            </h2>

          </div>

        </div>

        <div className="analytics-card">

          <div className="analytics-icon orange">

            <FaExclamationTriangle />

          </div>

          <div>

            <h3>
              Overdue
            </h3>

            <h2>
              {overdueCount}
            </h2>

          </div>

        </div>

      </div>

      {/* FILTERS */}

      <div className="notification-filters">

        {[
          "ALL",
          "PENDING",
          "COMPLETED",
          "OVERDUE"
        ].map((item) => (

          <button
            key={item}
            className={
              filter === item

                ? "filter-btn active"

                : "filter-btn"
            }
            onClick={() =>
              setFilter(item)
            }
          >

            {item}

          </button>

        ))}

      </div>

      {/* TABLE */}

      <div className="chart-box">

        <div className="chart-header">

          <h2>
            Team Tasks
          </h2>

        </div>

        {loading ? (

          <p>
            Loading tasks...
          </p>

        ) : (

          <div
            style={{
              overflowX: "auto"
            }}
          >

            <table className="performance-table">

              <thead>

                <tr>

                  <th>
                    Task
                  </th>

                  <th>
                    Project
                  </th>

                  <th>
                    Assigned To
                  </th>

                  <th>
                    Priority
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Deadline
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredTasks.map(
                  (task) => (

                    <tr key={task.id}>

                      <td>
                        {task.title}
                      </td>

                      <td>

                        {
                          task.project?.name ||

                          "No Project"
                        }

                      </td>

                      <td>

                        {
                          task.employee?.name ||

                          "Unassigned"
                        }

                      </td>

                      <td>
                        {task.priority}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${task.status?.toLowerCase()}`}
                        >

                          {task.status}

                        </span>

                      </td>

                      <td>

                        {
                          task.dueDate ||

                          "No deadline"
                        }

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ================================= */}
      {/* MODAL */}
      {/* ================================= */}

      {showModal && (

        <div className="modalOverlay">

          <div className="modalBox">

            <div className="modalHeader">

              <h2>
                Create Task
              </h2>

              <button
                className="closeBtn"
                onClick={() =>
                  setShowModal(false)
                }
              >

                <FaTimes />

              </button>

            </div>

            <form
              onSubmit={handleCreateTask}
              className="taskForm"
            >

              <input
                type="text"
                name="title"
                placeholder="Task title"
                value={taskForm.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={taskForm.description}
                onChange={handleChange}
              />

              {/* EMPLOYEE */}

              <select
                name="employeeId"
                value={taskForm.employeeId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Assign Employee
                </option>

                {employees.map(
                  (employee) => (

                    <option
                      key={employee.id}
                      value={employee.id}
                    >

                      {employee.name}

                    </option>
                  )
                )}

              </select>

              {/* PROJECT */}

              <select
                name="projectId"
                value={taskForm.projectId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Project
                </option>

                {projects.map(
                  (project) => (

                    <option
                      key={project.id}
                      value={project.id}
                    >

                      {project.name}

                    </option>
                  )
                )}

              </select>

              {/* PRIORITY */}

              <select
                name="priority"
                value={taskForm.priority}
                onChange={handleChange}
              >

                <option value="LOW">
                  LOW
                </option>

                <option value="MEDIUM">
                  MEDIUM
                </option>

                <option value="HIGH">
                  HIGH
                </option>

              </select>

              {/* DEADLINE */}

              <input
                type="date"
                name="deadline"
                value={taskForm.deadline}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="addBtn"
              >

                Create Task

              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}