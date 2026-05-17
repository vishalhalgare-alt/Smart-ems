import { useEffect, useState } from "react";

import {
  getAllProjects,
  createProject
} from "../services/api";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {

    loadProjects();

  }, []);

  const loadProjects = async () => {

    try {

      const data = await getAllProjects();

      setProjects(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  const handleCreateProject = async () => {

    try {

      await createProject(projectData);

      setShowModal(false);

      setProjectData({
        name: "",
        description: "",
        startDate: "",
        endDate: ""
      });

      loadProjects();

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <div className="main">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >

        <h1 style={{ color: "white" }}>
          Projects
        </h1>

        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          Add Project
        </button>

      </div>

      {
        loading ? (

          <p style={{ color: "white" }}>
            Loading...
          </p>

        ) : projects.length === 0 ? (

          <p style={{ color: "white" }}>
            No projects found
          </p>

        ) : (

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#111827",
              borderRadius: "14px",
              overflow: "hidden"
            }}
          >

            <thead>

              <tr
                style={{
                  background: "#1f2937",
                  color: "white"
                }}
              >

                <th style={{ padding: "14px" }}>
                  Name
                </th>

                <th style={{ padding: "14px" }}>
                  Description
                </th>

                <th style={{ padding: "14px" }}>
                  Start Date
                </th>

                <th style={{ padding: "14px" }}>
                  End Date
                </th>

              </tr>

            </thead>

            <tbody>

              {
                projects.map((project) => (

                  <tr
                    key={project.id}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #374151",
                      color: "white"
                    }}
                  >

                    <td style={{ padding: "14px" }}>
                      {project.name}
                    </td>

                    <td style={{ padding: "14px" }}>
                      {project.description}
                    </td>

                    <td style={{ padding: "14px" }}>
                      {project.startDate}
                    </td>

                    <td style={{ padding: "14px" }}>
                      {project.endDate}
                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        )
      }

      {
        showModal && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >

            <div
              style={{
                background: "#111827",
                padding: "30px",
                borderRadius: "14px",
                width: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "15px"
              }}
            >

              <h2 style={{ color: "white" }}>
                Add Project
              </h2>

              <input
                type="text"
                placeholder="Project Name"
                value={projectData.name}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    name: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Description"
                value={projectData.description}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    description: e.target.value
                  })
                }
              />

              <input
                type="date"
                value={projectData.startDate}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    startDate: e.target.value
                  })
                }
              />

              <input
                type="date"
                value={projectData.endDate}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    endDate: e.target.value
                  })
                }
              />

              <button
                onClick={handleCreateProject}
                style={{
                  padding: "12px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#2563eb",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Save Project
              </button>

            </div>

          </div>

        )
      }

    </div>

  );
}

export default Projects;