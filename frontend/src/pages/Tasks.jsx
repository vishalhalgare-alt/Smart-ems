import { useState, useEffect } from "react";

import {
  FaSearch,
  FaPlus,
  FaTimes,
  FaTasks,
  FaCalendarAlt,
  FaUserTie,
  FaLayerGroup
} from "react-icons/fa";

import TaskTable from "../components/TaskTable";

import {
  getManagerTasks,
  deleteTask as deleteTaskAPI,
  createTask
} from "../services/api";

function Tasks() {

  // =========================================
  // STATES
  // =========================================

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // FORM STATE

  const [formData, setFormData] = useState({

    title: "",
    description: "",
    project: "",
    assignedTo: "",
    priority: "Medium",
    status: "Pending",
    dueDate: ""

  });

  // =========================================
  // LOAD TASKS
  // =========================================

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      setLoading(true);

      const email =
        localStorage.getItem("email");

      const data =
        await getManagerTasks(email);

      setTasks(data || []);

    } catch (err) {

      console.log(err);

      setError("Failed to load tasks");

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });
  };

  // =========================================
  // CREATE TASK
  // =========================================

  const handleCreateTask = async () => {

    try {

      if (
        !formData.title ||
        !formData.project ||
        !formData.assignedTo
      ) {

        alert("Fill all required fields");

        return;
      }

      const response =
        await createTask(formData);

      setTasks([
        response,
        ...tasks
      ]);

      alert("Task Created");

      setShowModal(false);

      setFormData({

        title: "",
        description: "",
        project: "",
        assignedTo: "",
        priority: "Medium",
        status: "Pending",
        dueDate: ""

      });

    } catch (err) {

      console.log(err);

      alert("Failed to create task");
    }
  };

  // =========================================
  // DELETE TASK
  // =========================================

  const deleteTask = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this task?"
      );

    if (!confirmDelete) return;

    try {

      await deleteTaskAPI(id);

      setTasks(

        tasks.filter(
          (task) => task.id !== id
        )

      );

    } catch (err) {

      console.log(err);

      alert("Delete failed");
    }
  };

  // =========================================
  // FILTER
  // =========================================

  const filteredTasks =
    tasks.filter((task) =>
      task.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="main">

        <div className="loadingBox">

          Loading Tasks...

        </div>

      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {

    return (

      <div className="main">

        <div className="errorBox">

          {error}

        </div>

      </div>
    );
  }

  // =========================================
  // UI
  // =========================================

  return (

    <div className="main">

      {/* TOP HEADER */}

      <div className="taskTopSection">

        <div>

          <h1 className="taskHeading">
            Task Management
          </h1>

          <p className="taskSubText">
            Create, assign and monitor company tasks
          </p>

        </div>

        <button
          className="createTaskBtn"
          onClick={() =>
            setShowModal(true)
          }
        >

          <FaPlus />

          Create Task

        </button>

      </div>

      {/* STATS */}

      <div className="taskStatsGrid">

        <div className="taskStatCard">

          <FaTasks />

          <div>

            <h3>
              {tasks.length}
            </h3>

            <p>Total Tasks</p>

          </div>

        </div>

        <div className="taskStatCard">

          <FaLayerGroup />

          <div>

            <h3>
              {
                tasks.filter(
                  (t) =>
                    t.status === "Pending"
                ).length
              }
            </h3>

            <p>Pending</p>

          </div>

        </div>

        <div className="taskStatCard">

          <FaCalendarAlt />

          <div>

            <h3>
              {
                tasks.filter(
                  (t) =>
                    t.status === "Completed"
                ).length
              }
            </h3>

            <p>Completed</p>

          </div>

        </div>

        <div className="taskStatCard">

          <FaUserTie />

          <div>

            <h3>
              {
                tasks.filter(
                  (t) =>
                    t.priority === "High"
                ).length
              }
            </h3>

            <p>High Priority</p>

          </div>

        </div>

      </div>

      {/* SEARCH */}

      <div className="taskSearchBox">

        <FaSearch />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* TABLE */}

      <TaskTable
        tasks={filteredTasks}
        deleteTask={deleteTask}
      />

      {/* MODAL */}

      {showModal && (

        <div className="modalOverlay">

          <div className="professionalModal">

            {/* HEADER */}

            <div className="modalHeader">

              <h2>Create New Task</h2>

              <button
                className="closeBtn"
                onClick={() =>
                  setShowModal(false)
                }
              >

                <FaTimes />

              </button>

            </div>

            {/* FORM */}

            <div className="taskFormGrid">

              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
              />

              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
              >

                <option value="">
                  Select Project
                </option>

                <option>
                  EMS Dashboard
                </option>

                <option>
                  HR Management
                </option>

                <option>
                  Payroll System
                </option>

              </select>

              <input
                type="text"
                name="assignedTo"
                placeholder="Assign Employee"
                value={formData.assignedTo}
                onChange={handleChange}
              />

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >

                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>

              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option>
                  Pending
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Completed
                </option>

              </select>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />

            </div>

            <textarea
              name="description"
              placeholder="Task Description..."
              value={formData.description}
              onChange={handleChange}
              className="taskDescription"
            />

            <button
              className="submitTaskBtn"
              onClick={handleCreateTask}
            >

              Create Task

            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Tasks;