import {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaHourglassHalf,
  FaSignOutAlt
} from "react-icons/fa";

import {
  getAllTasks,
  updateTaskStatus
} from "../services/api";

import "../styles/employee-dashboard.css";

export default function EmployeeDashboard() {

  const navigate = useNavigate();

  const [userName] = useState(
    () => localStorage.getItem("name") || ""
  );

  const [userEmail] = useState(
    () => localStorage.getItem("email") || ""
  );

  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({
    myTasks: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });

  const [loading, setLoading] =
    useState(true);

  const [updatingTaskId, setUpdatingTaskId] =
    useState(null);

  // =========================
  // LOAD TASKS
  // =========================

  const loadTasks = useCallback(
    async () => {

      try {

        const email =
          localStorage.getItem("email");

        if (!email) {

          setLoading(false);

          return;
        }

        // GET ALL TASKS

        const allTasks =
          await getAllTasks();

        // FILTER EMPLOYEE TASKS

        const myTasks =
          allTasks.filter(
            (task) =>
              task.employee?.email === email
          );

        setTasks(myTasks);

        // STATS

        const completed =
          myTasks.filter(
            (task) =>
              task.status === "DONE" ||
              task.status === "COMPLETED"
          ).length;

        const inProgress =
          myTasks.filter(
            (task) =>
              task.status === "IN_PROGRESS"
          ).length;

        const pending =
          myTasks.filter(
            (task) =>
              task.status === "PENDING"
          ).length;

        setStats({
          myTasks: myTasks.length,
          completed,
          inProgress,
          pending,
        });

      } catch (err) {

        console.error(
          "Error loading tasks:",
          err
        );

      } finally {

        setLoading(false);
      }
    },
    []
  );

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    const role =
      localStorage.getItem("role");

    const token =
      localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;
    }

    if (
      role &&
      role !== "EMPLOYEE"
    ) {

      console.warn(
        "Non employee access detected"
      );
    }

    queueMicrotask(
      () => loadTasks()
    );

  }, [loadTasks, navigate]);

  // =========================
  // UPDATE STATUS
  // =========================

  const handleStatusChange = async (
    taskId,
    newStatus
  ) => {

    try {

      setUpdatingTaskId(taskId);

      await updateTaskStatus(
        taskId,
        newStatus
      );

      // UPDATE UI

      const updatedTasks =
        tasks.map((task) => {

          if (task.id === taskId) {

            return {
              ...task,
              status: newStatus,
            };
          }

          return task;
        });

      setTasks(updatedTasks);

      // UPDATE STATS

      const completed =
        updatedTasks.filter(
          (task) =>
            task.status === "DONE" ||
            task.status === "COMPLETED"
        ).length;

      const inProgress =
        updatedTasks.filter(
          (task) =>
            task.status === "IN_PROGRESS"
        ).length;

      const pending =
        updatedTasks.filter(
          (task) =>
            task.status === "PENDING"
        ).length;

      setStats({
        myTasks: updatedTasks.length,
        completed,
        inProgress,
        pending,
      });

    } catch (err) {

      console.error(
        "Error updating task:",
        err
      );

      alert(
        "Failed to update task status"
      );

    } finally {

      setUpdatingTaskId(null);
    }
  };

  // =========================
  // HELPERS
  // =========================

  const getStatusColor = (
    status
  ) => {

    if (
      status === "DONE" ||
      status === "COMPLETED"
    ) {

      return "status-done";
    }

    if (
      status === "IN_PROGRESS"
    ) {

      return "status-in-progress";
    }

    return "status-pending";
  };

  const getStatusLabel = (
    status
  ) => {

    if (
      status === "DONE" ||
      status === "COMPLETED"
    ) {

      return "Completed";
    }

    if (
      status === "IN_PROGRESS"
    ) {

      return "In Progress";
    }

    return "Pending";
  };

  const getPriorityColor = (
    priority
  ) => {

    if (priority === "HIGH") {

      return "priority-high";
    }

    if (
      priority === "MEDIUM"
    ) {

      return "priority-medium";
    }

    return "priority-low";
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="emp-container">

        <div className="emp-loading">

          Loading tasks...

        </div>

      </div>
    );
  }

  return (

    <div className="emp-container">

      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <div className="emp-navbar">

        <div className="emp-navbar-left">

          <h1>

            <FaTasks />

            Employee Dashboard

          </h1>

          <p>

            Welcome back,
            {" "}
            <strong>
              {userName}
            </strong>

          </p>

        </div>

        <div className="navbar-right">

          <span className="emp-email">

            {userEmail}

          </span>

          <button
            onClick={logout}
            className="logout-btn"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

      {/* ========================= */}
      {/* MAIN */}
      {/* ========================= */}

      <div className="emp-main">

        {/* ========================= */}
        {/* STATS */}
        {/* ========================= */}

        <div className="emp-stats-grid">

          <div className="emp-stat-card">

            <FaTasks className="emp-stat-icon" />

            <h3>My Tasks</h3>

            <div className="emp-stat-value">
              {stats.myTasks}
            </div>

          </div>

          <div className="emp-stat-card">

            <FaCheckCircle className="emp-stat-icon" />

            <h3>Completed</h3>

            <div className="emp-stat-value">
              {stats.completed}
            </div>

          </div>

          <div className="emp-stat-card">

            <FaHourglassHalf className="emp-stat-icon" />

            <h3>In Progress</h3>

            <div className="emp-stat-value">
              {stats.inProgress}
            </div>

          </div>

          <div className="emp-stat-card">

            <FaClock className="emp-stat-icon" />

            <h3>Pending</h3>

            <div className="emp-stat-value">
              {stats.pending}
            </div>

          </div>

        </div>

        {/* ========================= */}
        {/* TASK TABLE */}
        {/* ========================= */}

        <div className="emp-section">

          <div className="section-header">

            <h2>Assigned Tasks</h2>

            <p>
              Manage and update your work progress
            </p>

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
                      className="no-data"
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

                        <strong>
                          {task.title}
                        </strong>

                      </td>

                      <td>

                        {task.description ||
                          "No description"}

                      </td>

                      <td>

                        <span
                          className={`status-badge ${getStatusColor(
                            task.status
                          )}`}
                        >

                          {getStatusLabel(
                            task.status
                          )}

                        </span>

                      </td>

                      <td>

                        <span
                          className={`priority-badge ${getPriorityColor(
                            task.priority
                          )}`}
                        >

                          {task.priority}

                        </span>

                      </td>

                      <td>

                        {task.dueDate ||
                          "N/A"}

                      </td>

                      <td>

                        <select
                          className="status-select"
                          value={task.status}
                          disabled={
                            updatingTaskId ===
                            task.id
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              task.id,
                              e.target.value
                            )
                          }
                        >

                          <option value="PENDING">
                            Pending
                          </option>

                          <option value="IN_PROGRESS">
                            In Progress
                          </option>

                          <option value="DONE">
                            Completed
                          </option>

                        </select>

                      </td>

                    </tr>

                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}