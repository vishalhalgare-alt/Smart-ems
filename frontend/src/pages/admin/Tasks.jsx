import {
  useEffect,
  useState,
  useCallback
} from "react";

import {
  getAllTasks,
  deleteTask,
  updateTaskStatus,
  createTask
} from "../../services/api";

import AddTaskModal from "./components/AddTaskModal";

import "./styles/admin-tasks.css";

export default function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
      useState("ALL");

  const [isModalOpen,
    setIsModalOpen] =
      useState(false);

  // =========================
  // LOAD TASKS
  // =========================

  const loadTasks = useCallback(
    async () => {

      setLoading(true);

      setError(null);

      try {

        const data =
          await getAllTasks();

        setTasks(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load tasks"
        );

      } finally {

        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {

    loadTasks();

  }, [loadTasks]);

  // =========================
  // CREATE TASK
  // =========================

  const handleCreateTask =
    async (taskData) => {

      try {

        const newTask =
          await createTask(
            taskData
          );

        setTasks(prev => [
          newTask,
          ...prev
        ]);

        setIsModalOpen(false);

      } catch (err) {

        console.error(err);

        setError(
          "Failed to create task"
        );
      }
    };

  // =========================
  // DELETE TASK
  // =========================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this task?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

        await deleteTask(id);

        setTasks(prev =>
          prev.filter(
            task =>
              task.id !== id
          )
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to delete task"
        );
      }
    };

  // =========================
  // UPDATE STATUS
  // =========================

  const handleStatusChange =
    async (
      id,
      status
    ) => {

      try {

        await updateTaskStatus(
          id,
          status
        );

        setTasks(prev =>
          prev.map(task =>

            task.id === id

              ? {
                  ...task,
                  status
                }

              : task
          )
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to update task status"
        );
      }
    };

  // =========================
  // FILTER TASKS
  // =========================

  const filteredTasks =
    tasks.filter(task => {

      const matchesSearch =

        task.title
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        task.description
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        task.employee?.user?.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =

        statusFilter === "ALL"

        ||

        task.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  // =========================
  // STATS
  // =========================

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      t => t.status === "DONE"
    ).length;

  const pendingTasks =
    tasks.filter(
      t =>
        t.status ===
        "PENDING"
    ).length;

  const progressTasks =
    tasks.filter(
      t =>
        t.status ===
        "IN_PROGRESS"
    ).length;

  // =========================
  // PRIORITY COLORS
  // =========================

  const getPriorityClass =
    (priority) => {

      if (priority === "HIGH") {
        return "high";
      }

      if (priority === "MEDIUM") {
        return "medium";
      }

      return "low";
    };

  return (

    <div className="tasks-page">

      {/* HEADER */}

      <div className="tasks-header">

        <div>

          <p className="eyebrow">
            ADMIN COMMAND CENTER
          </p>

          <h1>
            Tasks Management
          </h1>

          <p className="subtitle">
            Create, monitor,
            assign, and track
            employee tasks.
          </p>

        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem"
          }}
        >

          <button
            className="create-btn"
            onClick={() =>
              setIsModalOpen(true)
            }
          >
            + Create Task
          </button>

          <button
            className="refresh-btn"
            onClick={loadTasks}
          >
            Refresh
          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Tasks</h3>
          <h1>
            {totalTasks}
          </h1>
        </div>

        <div className="stat-card done">
          <h3>Completed</h3>
          <h1>
            {completedTasks}
          </h1>
        </div>

        <div className="stat-card progress">
          <h3>In Progress</h3>
          <h1>
            {progressTasks}
          </h1>
        </div>

        <div className="stat-card pending">
          <h3>Pending</h3>
          <h1>
            {pendingTasks}
          </h1>
        </div>

      </div>

      {/* FILTERS */}

      <div className="task-controls">

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="search-input"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="filter-select"
        >

          <option value="ALL">
            All Status
          </option>

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

      </div>

      {/* ERROR */}

      {
        error && (

          <div className="error-box">

            {error}

          </div>

        )
      }

      {/* LOADING */}

      {
        loading && (

          <div className="loading-box">

            Loading tasks...

          </div>

        )
      }

      {/* TABLE */}

      {
        !loading && (

          <div className="table-wrapper">

            <table className="tasks-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Title</th>

                  <th>Description</th>

                  <th>Priority</th>

                  <th>Status</th>

                  <th>Assigned To</th>

                  <th>Due Date</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {
                  filteredTasks.length > 0

                  ?

                  filteredTasks.map(task => (

                    <tr key={task.id}>

                      <td>
                        #{task.id}
                      </td>

                      <td className="task-title">

                        {
                          task.title
                        }

                      </td>

                      <td>

                        {
                          task.description
                          || "No description"
                        }

                      </td>

                      <td>

                        <span
                          className={`priority-badge ${getPriorityClass(task.priority)}`}
                        >

                          {task.priority}

                        </span>

                      </td>

                      <td>

                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(
                              task.id,
                              e.target.value
                            )
                          }
                          className={`status-select ${task.status}`}
                        >

                          <option value="PENDING">
                            PENDING
                          </option>

                          <option value="IN_PROGRESS">
                            IN_PROGRESS
                          </option>

                          <option value="DONE">
                            DONE
                          </option>

                        </select>

                      </td>

                      <td>

                        {
                          task.employee
                            ?.user?.name

                          ||

                          "AI Unassigned"
                        }

                      </td>

                      <td>

                        {
                          task.dueDate
                            || "N/A"
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
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                  :

                  <tr>

                    <td
                      colSpan="8"
                      className="empty-box"
                    >
                      No tasks found.
                    </td>

                  </tr>
                }

              </tbody>

            </table>

          </div>

        )
      }

      {/* MODAL */}

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSubmit={
          handleCreateTask
        }
      />

    </div>
  );
}