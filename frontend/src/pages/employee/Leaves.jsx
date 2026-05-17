import { useState } from "react";

import {
  FaCalendarAlt,
  FaPlusCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaClipboardList
} from "react-icons/fa";

export default function Leaves() {

  const [leaveType,
    setLeaveType] =
      useState("");

  const [reason,
    setReason] =
      useState("");

  const [fromDate,
    setFromDate] =
      useState("");

  const [toDate,
    setToDate] =
      useState("");

  const [leaveHistory,
    setLeaveHistory] =
      useState([
        {
          id: 1,
          type: "Sick Leave",
          from: "2026-05-02",
          to: "2026-05-03",
          status: "APPROVED",
        },

        {
          id: 2,
          type: "Casual Leave",
          from: "2026-05-10",
          to: "2026-05-11",
          status: "PENDING",
        },
      ]);

  // =========================
  // APPLY LEAVE
  // =========================

  const applyLeave = (
    e
  ) => {

    e.preventDefault();

    if (
      !leaveType ||
      !fromDate ||
      !toDate ||
      !reason
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    const newLeave = {

      id:
        leaveHistory.length + 1,

      type: leaveType,

      from: fromDate,

      to: toDate,

      status: "PENDING",
    };

    setLeaveHistory([
      newLeave,
      ...leaveHistory,
    ]);

    setLeaveType("");
    setReason("");
    setFromDate("");
    setToDate("");

    alert(
      "Leave request submitted"
    );
  };

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
        color: "white",
        minHeight: "100vh",
        background:
          "#0f172a"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          background:
            "linear-gradient(90deg,#667eea,#764ba2)",
          padding: "25px",
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
            fontSize: "18px"
          }}
        >

          Apply and manage your leave requests

        </p>

      </div>

      {/* TOP GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "25px",
          marginBottom: "30px"
        }}
      >

        {/* APPLY FORM */}

        <div
          style={{
            background:
              "#111827",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.25)"
          }}
        >

          <h2
            style={{
              marginBottom: "25px",
              fontSize: "24px"
            }}
          >

            Apply Leave

          </h2>

          <form
            onSubmit={applyLeave}
          >

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px"
              }}
            >

              <select
                value={leaveType}
                onChange={(e) =>
                  setLeaveType(
                    e.target.value
                  )
                }
                style={inputStyle}
              >

                <option value="">
                  Select Leave Type
                </option>

                <option>
                  Sick Leave
                </option>

                <option>
                  Casual Leave
                </option>

                <option>
                  Emergency Leave
                </option>

              </select>

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <textarea
                rows="5"
                placeholder="Enter leave reason"
                value={reason}
                onChange={(e) =>
                  setReason(
                    e.target.value
                  )
                }
                style={{
                  ...inputStyle,
                  resize: "none"
                }}
              />

              <button
                type="submit"
                style={{
                  background:
                    "linear-gradient(90deg,#667eea,#764ba2)",
                  border: "none",
                  color: "white",
                  padding: "16px",
                  borderRadius: "14px",
                  fontSize: "17px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px"
                }}
              >

                <FaPlusCircle />

                Apply Leave

              </button>

            </div>

          </form>

        </div>

        {/* SUMMARY CARD */}

        <div
          style={{
            background:
              "#111827",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.25)"
          }}
        >

          <h2
            style={{
              marginBottom: "25px",
              fontSize: "24px"
            }}
          >

            Leave Summary

          </h2>

          <div
            style={{
              display: "grid",
              gap: "20px"
            }}
          >

            <SummaryCard
              title="Total Leaves"
              value={
                leaveHistory.length
              }
            />

            <SummaryCard
              title="Approved"
              value={
                leaveHistory.filter(
                  (l) =>
                    l.status ===
                    "APPROVED"
                ).length
              }
            />

            <SummaryCard
              title="Pending"
              value={
                leaveHistory.filter(
                  (l) =>
                    l.status ===
                    "PENDING"
                ).length
              }
            />

          </div>

        </div>

      </div>

      {/* HISTORY */}

      <div
        style={{
          background:
            "#111827",
          padding: "25px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.25)"
        }}
      >

        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "25px",
            fontSize: "24px"
          }}
        >

          <FaClipboardList />

          Leave History

        </h2>

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
                  ID
                </th>

                <th style={thStyle}>
                  Type
                </th>

                <th style={thStyle}>
                  From
                </th>

                <th style={thStyle}>
                  To
                </th>

                <th style={thStyle}>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {leaveHistory.map(
                (leave) => (

                  <tr
                    key={leave.id}
                    style={{
                      borderBottom:
                        "1px solid #374151"
                    }}
                  >

                    <td style={tdStyle}>
                      #{leave.id}
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
                            "14px",
                          display:
                            "inline-flex",
                          alignItems:
                            "center",
                          gap: "8px"
                        }}
                      >

                        {leave.status ===
                        "APPROVED" ? (
                          <FaCheckCircle />
                        ) : leave.status ===
                          "REJECTED" ? (
                          <FaTimesCircle />
                        ) : (
                          <FaHourglassHalf />
                        )}

                        {
                          leave.status
                        }

                      </span>

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
// STYLES
// =========================

const inputStyle = {

  width: "100%",

  padding: "14px",

  borderRadius: "12px",

  border:
    "1px solid #374151",

  background:
    "#1f2937",

  color: "white",

  fontSize: "15px",

  outline: "none",
};

const thStyle = {

  padding: "16px",

  textAlign: "left",

  color: "#cbd5e1",
};

const tdStyle = {

  padding: "16px",

  color: "#f8fafc",
};

function SummaryCard({
  title,
  value
}) {

  return (

    <div
      style={{
        background:
          "#1f2937",
        padding: "20px",
        borderRadius: "16px"
      }}
    >

      <h3
        style={{
          color: "#94a3b8",
          marginBottom: "10px"
        }}
      >

        {title}

      </h3>

      <h1
        style={{
          fontSize: "34px"
        }}
      >

        {value}

      </h1>

    </div>
  );
}