import { useEffect, useState } from "react";

import {
  getAllUsers,
  getManagers,
  makeManager
} from "../../services/api";

export default function Managers() {

  const [users, setUsers] = useState([]);

  const [managers, setManagers] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const usersData =
        await getAllUsers();

      const managersData =
        await getManagers();

      setUsers(usersData);

      setManagers(managersData);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // MAKE MANAGER
  // =========================

  const handleMakeManager = async (id) => {

    try {

      await makeManager(id);

      loadData();

    } catch (error) {

      console.error(error);
    }
  };

  // =========================
  // UI
  // =========================

  return (

    <div className="main">

      <h1
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        Managers
      </h1>

      {
        loading ? (

          <p style={{ color: "white" }}>
            Loading...
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
                  ID
                </th>

                <th style={{ padding: "14px" }}>
                  Name
                </th>

                <th style={{ padding: "14px" }}>
                  Email
                </th>

                <th style={{ padding: "14px" }}>
                  Role
                </th>

                <th style={{ padding: "14px" }}>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {
                users.map((user) => {

                  const canMakeManager =
                    user.role === "EMPLOYEE";

                  return (

                    <tr
                      key={user.id}
                      style={{
                        textAlign: "center",
                        borderBottom:
                          "1px solid #374151",
                        color: "white"
                      }}
                    >

                      <td style={{ padding: "14px" }}>
                        {user.id}
                      </td>

                      <td style={{ padding: "14px" }}>
                        {user.name}
                      </td>

                      <td style={{ padding: "14px" }}>
                        {user.email}
                      </td>

                      <td style={{ padding: "14px" }}>
                        {user.role}
                      </td>

                      <td style={{ padding: "14px" }}>

                        {
                          canMakeManager ? (

                            <button
                              onClick={() =>
                                handleMakeManager(
                                  user.id
                                )
                              }
                              style={{
                                padding:
                                  "8px 14px",
                                border: "none",
                                borderRadius:
                                  "8px",
                                background:
                                  "#2563eb",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "bold"
                              }}
                            >
                              Make Manager
                            </button>

                          ) : (

                            <span
                              style={{
                                color: "#22c55e",
                                fontWeight: "bold"
                              }}
                            >
                              {user.role}
                            </span>

                          )
                        }

                      </td>

                    </tr>

                  );
                })
              }

            </tbody>

          </table>

        )
      }

    </div>
  );
}