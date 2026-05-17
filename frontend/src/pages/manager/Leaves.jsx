import {
  useState
} from "react";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaUserTie,
  FaClipboardList
} from "react-icons/fa";

export default function Leaves() {

  const [leaveRequests,
    setLeaveRequests] =
      useState([
        {
          id: 1,
          employee:
            "rahul@gmail.com",
          type:
            "Sick Leave",
          from:
            "2026-05-12",
          to:
            "2026-05-13",
          reason:
            "Fever and health issue",
          status:
            "PENDING",
        },

        {
          id: 2,
          employee:
            "priya@gmail.com",
          type:
            "Casual Leave",
          from:
            "2026-05-15",
          to:
            "2026-05-16",
          reason:
            "Family function",
          status:
            "APPROVED",
        },
      ]);

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus =
    (
      id,
      status
    ) => {

      const updated =
        leaveRequests.map(
          (leave) =>

            leave.id === id
              ? {
                  ...leave,
                  status,
                }
              : leave
        );

      setLeaveRequests(
        updated
      );
    };

  // =========================
  // COUNTS
  // =========================

  const totalLeaves =
    leaveRequests.length;

  const approvedLeaves =
    leaveRequests.filter(
      (l) =>
        l.status ===
        "APPROVED"
    ).length;

  const rejectedLeaves =
    leaveRequests.filter(
      (l) =>
        l.status ===
        "REJECTED"
    ).length;

  const pendingLeaves =
    leaveRequests.filter(
      (l) =>
        l.status ===
        "PENDING"
    ).length;

  // =========================
  // STATUS COLORS
  // =========================

  const getStatusStyle = (
    status
  ) => {

    if (
      status === "APPROVED"
    ) {

      return {
        background:
          "#dcfce7",
        color:
          "#166534",
      };
    }

    if (
      status === "REJECTED"
    ) {

      return {
        background:
          "#fee2e2",
        color:
          "#991b1b",
      };
    }

    return {
      background:
        "#dbeafe",
      color:
        "#1e40af",
    };
  };

  return (

    <div
      style={{
        padding: "30px",
        background:
          "#0f172a",
        minHeight: "100vh",
        color: "white"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          background:
            "linear-gradient(90deg,#667eea,#764ba2)",
          padding: "28px",
          borderRadius: "20px",
          marginBottom: "30px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.3)"
        }}
      >

        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "34px",
            fontWeight: "700",
            marginBottom: "10px"
          }}
        >

          <FaCalendarAlt />

          Leave Management

        </h1>

        <p
          style={{
            opacity: 0.9,
            fontSize: "17px"
          }}
        >

          Review and manage employee leave requests

        </p>

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

        <StatCard
          title="Total Requests"
          value={totalLeaves}
        />

        <StatCard
          title="Approved"
          value={approvedLeaves}
        />

        <StatCard
          title="Rejected"
          value={rejectedLeaves}
        />

        <StatCard
          title="Pending"
          value={pendingLeaves}
        />

      </div>

      {/* TABLE */}

      <div
        style={{
          background:
            "#111827",
          borderRadius: "20px",
          padding: "25px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.25)"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "25px"
          }}
        >

          <FaClipboardList size={22} />

          <h2
            style={{
              fontSize: "26px"
            }}
          >

            Leave Requests

          </h2>

        </div>

        <div
          style={{
            overflowX: "auto"
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse"
            }}
          >

            <thead>

              <tr
                style={{
                  background:
                    "#1f2937"
                }}
              >

                <th style={thStyle}>
                  Employee
                </th>

                <th style={thStyle}>
                  Leave Type
                </th>

                <th style={thStyle}>
                  From
                </th>

                <th style={thStyle}>
                  To
                </th>

                <th style={thStyle}>
                  Reason
                </th>

                <th style={thStyle}>
                  Status
                </th>

                <th style={thStyle}>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {leaveRequests.map(
                (leave) => (

                  <tr
                    key={leave.id}
                    style={{
                      borderBottom:
                        "1px solid #374151"
                    }}
                  >

                    <td style={tdStyle}>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px"
                        }}
                      >

                        <FaUserTie />

                        {
                          leave.employee
                        }

                      </div>

                    </td>

                    <td style={tdStyle}>
                      {leave.type}
                    </td>

                    <td style={tdStyle}>
                      {leave.from}
                    </td>

                    <td style={tdStyle}>
                      {leave.to}
                    </td>

                    <td style={tdStyle}>
                      {leave.reason}
                    </td>

                    <td style={tdStyle}>

                      <span
                        style={{
                          ...getStatusStyle(
                            leave.status
                          ),
                          padding:
                            "8px 14px",
                          borderRadius:
                            "999px",
                          fontWeight:
                            "600",
                          fontSize:
                            "14px"
                        }}
                      >

                        {
                          leave.status
                        }

                      </span>

                    </td>

                    <td style={tdStyle}>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px"
                        }}
                      >

                        <button
                          onClick={() =>
                            updateStatus(
                              leave.id,
                              "APPROVED"
                            )
                          }
                          style={{
                            background:
                              "#22c55e",
                            border:
                              "none",
                            color:
                              "white",
                            padding:
                              "10px 14px",
                            borderRadius:
                              "10px",
                            cursor:
                              "pointer",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "8px"
                          }}
                        >

                          <FaCheckCircle />

                          Approve

                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              leave.id,
                              "REJECTED"
                            )
                          }
                          style={{
                            background:
                              "#ef4444",
                            border:
                              "none",
                            color:
                              "white",
                            padding:
                              "10px 14px",
                            borderRadius:
                              "10px",
                            cursor:
                              "pointer",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "8px"
                          }}
                        >

                          <FaTimesCircle />

                          Reject

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

// =========================
// STAT CARD
// =========================

function StatCard({
  title,
  value
}) {

  return (

    <div
      style={{
        background:
          "#111827",
        padding: "25px",
        borderRadius: "18px",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.25)"
      }}
    >

      <h3
        style={{
          color: "#94a3b8",
          marginBottom: "10px",
          fontSize: "16px"
        }}
      >

        {title}

      </h3>

      <h1
        style={{
          fontSize: "38px",
          fontWeight: "700"
        }}
      >

        {value}

      </h1>

    </div>
  );
}

// =========================
// TABLE STYLES
// =========================

const thStyle = {

  padding: "16px",

  textAlign: "left",

  color: "#cbd5e1",

  fontWeight: "600",
};

const tdStyle = {

  padding: "16px",

  color: "#f8fafc",
};