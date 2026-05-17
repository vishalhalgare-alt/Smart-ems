import {
  useEffect,
  useState
} from "react";

import {
  FaPlus,
  FaTrash,
  FaTimes,
  FaTasks,
  FaClock,
  FaExclamationTriangle
} from "react-icons/fa";

import "./styles/manager-tasks.css";

import {

  getManagerTasks,

  getAllEmployees,

  getAllProjects,

  createTask,

  deleteTask

} from "../../services/api";

export default function Tasks() {

  // ===================================
  // STATES
  // ===================================

  const [tasks, setTasks] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

  // ===================================
  // FORM STATE
  // ===================================

  const [taskForm, setTaskForm] =
    useState({

      title: "",

      description: "",

      employeeId: "",

      projectId: "",

      priority: "MEDIUM",

      status: "PENDING",

      deadline: ""

    });

  // ===================================
  // LOAD DATA
  // ===================================

  useEffect(() => {

    loadTasks();

    loadEmployees();

    loadProjects();

  }, []);

  // ===================================
  // LOAD TASKS
  // ===================================

  const loadTasks = async () => {

    try {

      setLoading(true);

      const email =
        localStorage.getItem(
          "email"
        );

      console.log(
        "Manager Email:",
        email
      );

      const data =
        await getManagerTasks(
          email
        );

      console.log(
        "Manager Tasks:",
        data
      );

      setTasks(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Failed to load tasks:",
        error
      );

      setTasks([]);

    } finally {

      setLoading(false);

    }
  };

  // ===================================
  // LOAD EMPLOYEES
  // ===================================

  const loadEmployees =
    async () => {

      try {

        const data =
          await getAllEmployees();

        const filtered =
          data.filter((emp) => {

            const role =
              String(emp.role || "")
                .toUpperCase();

            return (

              role !== "ADMIN" &&

              role !== "MANAGER"

            );
          });

        setEmployees(filtered);

      } catch (error) {

        console.error(error);

      }
    };

  // ===================================
  // LOAD PROJECTS
  // ===================================

  const loadProjects =
    async () => {

      try {

        const data =
          await getAllProjects();

        const email =
          localStorage.getItem(
            "email"
          );

        const filtered =
          data.filter(
            (project) =>

              project.manager?.email ===
              email
          );

        setProjects(filtered);

      } catch (error) {

        console.error(error);

      }
    };

  // ===================================
  // HANDLE CHANGE
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

      if (creating) return;

      try {

        setCreating(true);

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
              Number(
                taskForm.employeeId
              )

          },

          project: {

            id:
              Number(
                taskForm.projectId
              )

          }

        });

        // RESET FORM

        setTaskForm({

          title: "",

          description: "",

          employeeId: "",

          projectId: "",

          priority: "MEDIUM",

          status: "PENDING",

          deadline: ""

        });

        // CLOSE MODAL

        setShowModal(false);

        // RELOAD TASKS

        loadTasks();

      } catch (error) {

        console.error(
          "Failed to create task:",
          error
        );

      } finally {

        setCreating(false);

      }
    };

  // ===================================
  // DELETE TASK
  // ===================================

  const handleDelete =
    async (id) => {

      try {

        await deleteTask(id);

        loadTasks();

      } catch (error) {

        console.error(error);

      }
    };

  // ===================================
  // STATS
  // ===================================

  const totalTasks =
    tasks.length;

  const pendingTasks =
    tasks.filter(

      task =>

        task.status ===
        "PENDING"

    ).length;

  const highPriority =
    tasks.filter(

      task =>

        task.priority ===
        "HIGH"

    ).length;

  // ===================================
  // UI
  // ===================================

  return (

    <div className="analytics-page">

      {/* HERO */}

      <div className="taskHero">

        <div>

          <div className="analytics-tag">

            TASK MANAGEMENT

          </div>

          <h1>
            Manager Tasks
          </h1>

          <p className="analytics-subtitle">

            Manage assigned
            project tasks

          </p>

        </div>

        <button
          className="addBtn"
          onClick={() =>
            setShowModal(true)
          }
        >

          <FaPlus />

          Create Task

        </button>

      </div>

      {/* STATS */}

      <div className="statsGrid">

        <div className="statCard">

          <FaTasks className="statIcon" />

          <div>

            <h3>
              {totalTasks}
            </h3>

            <p>
              Total Tasks
            </p>

          </div>

        </div>

        <div className="statCard">

          <FaClock className="statIcon" />

          <div>

            <h3>
              {pendingTasks}
            </h3>

            <p>
              Pending Tasks
            </p>

          </div>

        </div>

        <div className="statCard">

          <FaExclamationTriangle
            className="statIcon"
          />

          <div>

            <h3>
              {highPriority}
            </h3>

            <p>
              High Priority
            </p>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="chart-box">

        <div className="chart-header">

          <h2>
            Assigned Tasks
          </h2>

        </div>

        {loading ? (

          <p>
            Loading...
          </p>

        ) : (

          <table className="performance-table">

            <thead>

              <tr>

                <th>ID</th>

                <th>Task</th>

                <th>Project</th>

                <th>Status</th>

                <th>Priority</th>

                <th>Deadline</th>

                <th>Assigned</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {tasks.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="emptyState"
                  >

                    No tasks assigned yet

                  </td>

                </tr>

              ) : (

                tasks.map((task) => (

                  <tr key={task.id}>

                    <td>
                      #{task.id}
                    </td>

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

                      <span
                        className={`status-badge ${task.status?.toLowerCase()}`}
                      >

                        {task.status}

                      </span>

                    </td>

                    <td>
                      {task.priority}
                    </td>

                    <td>

                      {
                        task.dueDate ||
                        "N/A"
                      }

                    </td>

                    <td>

                      {
                        task.employee?.name ||

                        "Unassigned"
                      }

                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            task.id
                          )
                        }
                      >

                        <FaTrash />

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        )}

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="modalOverlay">

          <div className="modalBox">

            <div className="modalHeader">

              <h2>
                Create New Task
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
                placeholder="Task Title"
                value={taskForm.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Task Description"
                value={taskForm.description}
                onChange={handleChange}
              />

              <select
                name="employeeId"
                value={taskForm.employeeId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Employee
                </option>

                {employees.map((emp) => (

                  <option
                    key={emp.id}
                    value={emp.id}
                  >

                    {emp.name}

                  </option>

                ))}

              </select>

              <select
                name="projectId"
                value={taskForm.projectId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Project
                </option>

                {projects.map((project) => (

                  <option
                    key={project.id}
                    value={project.id}
                  >

                    {project.name}

                  </option>

                ))}

              </select>

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

              <input
                type="date"
                name="deadline"
                value={taskForm.deadline}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="addBtn"
                disabled={creating}
              >

                {

                  creating

                    ? "Creating..."

                    : "Create Task"

                }

              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}