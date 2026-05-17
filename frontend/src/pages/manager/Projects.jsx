import {
  useEffect,
  useState
} from "react";

import {
  FaFolderOpen,
  FaCheckCircle,
  FaClock,
  FaTasks
} from "react-icons/fa";

import "../../styles/dashboard.css";

export default function ManagerProjects() {

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD MANAGER PROJECTS
  // =========================

  useEffect(() => {

    loadProjects();

  }, []);

  const loadProjects = async () => {

    try {

      setLoading(true);

      const email =
        localStorage.getItem(
          "email"
        );

      const response =
        await fetch(

          `http://localhost:8081/api/projects/manager/${email}`
        );

      const data =
        await response.json();

      setProjects(data);

    } catch (error) {

      console.error(
        "Failed to load projects",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // STATS
  // =========================

  const completedProjects =
    projects.filter(

      (p) =>
        p.status ===
        "COMPLETED"
    ).length;

  const activeProjects =
    projects.filter(

      (p) =>

        p.status ===
          "ACTIVE"

        ||

        p.status ===
          "IN_PROGRESS"
    ).length;

  // =========================
  // UI
  // =========================

  return (

    <div className="analytics-page">

      {/* HEADER */}

      <div className="analytics-header">

        <div className="analytics-tag">

          PROJECT MANAGEMENT

        </div>

        <h1>
          My Projects
        </h1>

        <p className="analytics-subtitle">

          Track assigned projects,
          delivery progress,
          deadlines,
          and completion status.

        </p>

      </div>

      {/* STATS */}

      <div className="analytics-cards-grid">

        <div className="analytics-card">

          <div className="analytics-icon blue">

            <FaFolderOpen />

          </div>

          <div>

            <h3>
              Total Projects
            </h3>

            <h2>
              {projects.length}
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
              {completedProjects}
            </h2>

          </div>

        </div>

        <div className="analytics-card">

          <div className="analytics-icon orange">

            <FaClock />

          </div>

          <div>

            <h3>
              Active
            </h3>

            <h2>
              {activeProjects}
            </h2>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="chart-box">

        <div className="chart-header">

          <h2>
            Assigned Projects
          </h2>

        </div>

        {loading ? (

          <p>
            Loading projects...
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
                    Project
                  </th>

                  <th>
                    Manager
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Progress
                  </th>

                  <th>
                    Deadline
                  </th>

                </tr>

              </thead>

              <tbody>

                {projects.length > 0 ? (

                  projects.map(
                    (project) => (

                      <tr key={project.id}>

                        {/* NAME */}

                        <td>
                          {project.name}
                        </td>

                        {/* MANAGER */}

                        <td>

                          {
                            project.manager
                              ?.name ||

                            "Not Assigned"
                          }

                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={`status-badge ${
                              project.status ===
                              "COMPLETED"

                                ? "completed"

                                : project.status ===
                                  "IN_PROGRESS"

                                ? "pending"

                                : "overdue"
                            }`}
                          >

                            {
                              project.status ||
                              "PENDING"
                            }

                          </span>

                        </td>

                        {/* PROGRESS */}

                        <td>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >

                            <FaTasks />

                            <span>

                              {
                                project.progress
                              }%

                            </span>

                          </div>

                        </td>

                        {/* DEADLINE */}

                        <td>

                          {
                            project.endDate ||
                            "N/A"
                          }

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "20px",
                      }}
                    >

                      No projects assigned

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}