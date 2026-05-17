import {
  useEffect,
  useState
} from "react";

import {
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMapMarkerAlt
} from "react-icons/fa";

import "../../styles/dashboard.css";

export default function Attendance() {

  const [attendance,
    setAttendance] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  const [filter,
    setFilter] =
      useState("ALL");

  // =========================
  // LOAD REAL ATTENDANCE
  // =========================

  useEffect(() => {

    loadAttendance();

  }, []);

  const loadAttendance =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:8081/attendance"
          );

        const data =
          await response.json();

        setAttendance(data);

      } catch (err) {

        console.error(
          "Failed to load attendance",
          err
        );

      } finally {

        setLoading(false);
      }
    };

  // =========================
  // FILTER
  // =========================

  const filteredAttendance =

    filter === "ALL"

      ? attendance

      : attendance.filter(
          (item) =>
            item.status === filter
        );

  // =========================
  // STATS
  // =========================

  const presentCount =
    attendance.filter(
      (a) =>
        a.status === "PRESENT"
    ).length;

  const absentCount =
    attendance.filter(
      (a) =>
        a.status === "ABSENT"
    ).length;

  const lateCount =
    attendance.filter(
      (a) =>
        a.status === "LATE"
    ).length;

  const totalCount =
    attendance.length;

  // =========================
  // STATUS CLASS
  // =========================

  const getStatusClass =
    (status) => {

      if (
        status === "PRESENT"
      ) {

        return "status-done";
      }

      if (
        status === "LATE"
      ) {

        return "status-in-progress";
      }

      return "status-pending";
    };

  return (

    <div className="analytics-page">

      {/* ====================== */}
      {/* HEADER */}
      {/* ====================== */}

      <div className="analytics-header">

        <div>

          <div className="analytics-tag">

            ATTENDANCE MANAGEMENT

          </div>

          <h1>
            Admin Attendance Dashboard
          </h1>

          <p className="analytics-subtitle">

            Monitor employee attendance,
            work hours and activity.

          </p>

        </div>

      </div>

      {/* ====================== */}
      {/* STATS */}
      {/* ====================== */}

      <div className="analytics-cards-grid">

        <div className="analytics-card">

          <div className="analytics-icon green">

            <FaCheckCircle />

          </div>

          <div>

            <h3>
              Present
            </h3>

            <h2>
              {presentCount}
            </h2>

          </div>

        </div>

        <div className="analytics-card">

          <div className="analytics-icon red">

            <FaTimesCircle />

          </div>

          <div>

            <h3>
              Absent
            </h3>

            <h2>
              {absentCount}
            </h2>

          </div>

        </div>

        <div className="analytics-card">

          <div className="analytics-icon orange">

            <FaClock />

          </div>

          <div>

            <h3>
              Late
            </h3>

            <h2>
              {lateCount}
            </h2>

          </div>

        </div>

        <div className="analytics-card">

          <div className="analytics-icon blue">

            <FaCalendarCheck />

          </div>

          <div>

            <h3>
              Total Records
            </h3>

            <h2>
              {totalCount}
            </h2>

          </div>

        </div>

      </div>

      {/* ====================== */}
      {/* FILTERS */}
      {/* ====================== */}

      <div className="notification-filters">

        {[
          "ALL",
          "PRESENT",
          "LATE",
          "ABSENT"
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

      {/* ====================== */}
      {/* TABLE */}
      {/* ====================== */}

      <div className="chart-box">

        <div className="chart-header">

          <h2>
            Employee Attendance Records
          </h2>

        </div>

        {loading ? (

          <p>
            Loading attendance...
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

                  <th>ID</th>

                  <th>Employee ID</th>

                  <th>Date</th>

                  <th>Status</th>

                  <th>Check In</th>

                  <th>Check Out</th>

                  <th>Hours</th>

                  <th>Location</th>

                </tr>

              </thead>

              <tbody>

                {filteredAttendance.map(
                  (item) => (

                    <tr key={item.id}>

                      <td>
                        #{item.id}
                      </td>

                      <td>
                        EMP-{item.employeeId}
                      </td>

                      <td>
                        {item.date}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${getStatusClass(
                            item.status
                          )}`}
                        >

                          {item.status}

                        </span>

                      </td>

                      <td>
                        {item.checkIn || "-"}
                      </td>

                      <td>
                        {item.checkOut || "-"}
                      </td>

                      <td>
                        {item.workingHours || 0}
                      </td>

                      <td>

                        {item.latitude &&
                        item.longitude ? (

                          <a
                            href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                          >

                            <FaMapMarkerAlt />

                            View

                          </a>

                        ) : (

                          "-"
                        )}

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}