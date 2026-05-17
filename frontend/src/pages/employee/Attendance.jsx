import {
  useEffect,
  useState
} from "react";

import {
  FaCalendarCheck,
  FaClock,
  FaMapMarkerAlt,
  FaSignInAlt,
  FaSignOutAlt
} from "react-icons/fa";

import "../../styles/employee-dashboard.css";

export default function Attendance() {

  const [userName] =
    useState(
      localStorage.getItem("name") || ""
    );

  const [employeeId] =
    useState(
      localStorage.getItem("id")
    );

  const [attendance,
    setAttendance] =
      useState([]);

  const [todayAttendance,
    setTodayAttendance] =
      useState(null);

  const [loading,
    setLoading] =
      useState(false);

  // =========================
  // LOAD REAL ATTENDANCE
  // =========================

  useEffect(() => {

    const loadAttendance = async () => {

      try {

        const response =
          await fetch(
            `http://localhost:8081/attendance/employee/${employeeId}`
          );

        const data =
          await response.json();

        setAttendance(data);

        // =========================
        // TODAY RECORD
        // =========================

        const today =
          new Date()
            .toISOString()
            .split("T")[0];

        const todayData =
          data.find(
            (a) =>
              a.date === today
          );

        if (todayData) {

          setTodayAttendance(
            todayData
          );
        }

      } catch (err) {

        console.error(
          "Failed to load attendance",
          err
        );
      }
    };

    loadAttendance();

  }, [employeeId]);

  // =========================
  // GET LOCATION
  // =========================

  const getLocation =
    () => {

      return new Promise(
        (
          resolve,
          reject
        ) => {

          navigator.geolocation
            .getCurrentPosition(

              (position) => {

                resolve({

                  latitude:
                    position.coords.latitude,

                  longitude:
                    position.coords.longitude,
                });
              },

              (error) => {

                reject(error);
              }
            );
        }
      );
    };

  // =========================
  // PUNCH IN
  // =========================

  const handlePunchIn =
    async () => {

      try {

        setLoading(true);

        const location =
          await getLocation();

        const response =
          await fetch(

            `http://localhost:8081/attendance/checkin/${employeeId}?latitude=${location.latitude}&longitude=${location.longitude}`,

            {
              method: "POST",
            }
          );

        const data =
          await response.json();

        const newAttendance = {

          id: data.id,

          date: data.date,

          checkIn:
            data.checkIn,

          checkOut:
            data.checkOut,

          status:
            data.status,

          latitude:
            data.latitude,

          longitude:
            data.longitude,

          workingHours:
            data.workingHours,
        };

        const updatedHistory = [

          newAttendance,
          ...attendance,
        ];

        setAttendance(
          updatedHistory
        );

        setTodayAttendance(
          newAttendance
        );

        alert(
          "Punch In Successful"
        );

        window.location.reload();

      } catch (err) {

        console.error(err);

        alert(
          "Location access required"
        );

      } finally {

        setLoading(false);
      }
    };

  // =========================
  // PUNCH OUT
  // =========================

  const handlePunchOut =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(

            `http://localhost:8081/attendance/checkout/${employeeId}`,

            {
              method: "POST",
            }
          );

        const data =
          await response.json();

        const updated =
          attendance.map(
            (item) => {

              if (
                item.id ===
                data.id
              ) {

                return {

                  ...item,

                  checkOut:
                    data.checkOut,

                  workingHours:
                    data.workingHours,
                };
              }

              return item;
            }
          );

        setAttendance(
          updated
        );

        setTodayAttendance({
          ...todayAttendance,
          checkOut:
            data.checkOut,
          workingHours:
            data.workingHours,
        });

        alert(
          "Punch Out Successful"
        );

        window.location.reload();

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

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

    <div className="emp-container">

      {/* HEADER */}

      <div className="emp-navbar">

        <div>

          <h1>

            <FaCalendarCheck />

            Attendance Dashboard

          </h1>

          <p>

            Welcome,
            {" "}
            <strong>
              {userName}
            </strong>

          </p>

        </div>

      </div>

      {/* ACTIONS */}

      <div className="emp-main">

        <div className="emp-section">

          <div className="section-header">

            <h2>
              Today's Attendance
            </h2>

          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >

            <button
              className="login-btn"
              onClick={
                handlePunchIn
              }
              disabled={
                loading ||
                todayAttendance
              }
            >

              <FaSignInAlt />

              {loading
                ? "Processing..."
                : "Punch In"}

            </button>

            <button
              className="logout-btn"
              onClick={
                handlePunchOut
              }
              disabled={
                loading ||
                !todayAttendance ||
                todayAttendance.checkOut
              }
            >

              <FaSignOutAlt />

              Punch Out

            </button>

          </div>

          {todayAttendance && (

            <div
              className="profile-card"
              style={{
                marginTop: "20px",
              }}
            >

              <div className="profile-row">

                <strong>
                  Status:
                </strong>

                <span
                  className={`status-badge ${getStatusClass(
                    todayAttendance.status
                  )}`}
                >

                  {
                    todayAttendance.status
                  }

                </span>

              </div>

              <div className="profile-row">

                <strong>
                  Check In:
                </strong>

                <span>

                  {
                    todayAttendance.checkIn
                  }

                </span>

              </div>

              <div className="profile-row">

                <strong>
                  Check Out:
                </strong>

                <span>

                  {
                    todayAttendance.checkOut ||
                    "-"
                  }

                </span>

              </div>

              <div className="profile-row">

                <strong>
                  Working Hours:
                </strong>

                <span>

                  {
                    todayAttendance
                      .workingHours || 0
                  }

                </span>

              </div>

              <div className="profile-row">

                <strong>
                  Location:
                </strong>

                <span>

                  <FaMapMarkerAlt />

                  {" "}

                  {
                    todayAttendance.latitude
                  }

                  ,

                  {
                    todayAttendance.longitude
                  }

                </span>

              </div>

            </div>
          )}

        </div>

        {/* HISTORY */}

        <div className="emp-section">

          <div className="section-header">

            <h2>
              Attendance History
            </h2>

          </div>

          <div className="emp-table-wrapper">

            <table className="emp-task-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Date</th>

                  <th>Status</th>

                  <th>Check In</th>

                  <th>Check Out</th>

                  <th>Hours</th>

                  <th>Location</th>

                </tr>

              </thead>

              <tbody>

                {attendance.map(
                  (item) => (

                    <tr
                      key={item.id}
                    >

                      <td>
                        #{item.id}
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

                          {
                            item.status
                          }

                        </span>

                      </td>

                      <td>
                        {item.checkIn}
                      </td>

                      <td>

                        {item.checkOut ||
                          "-"}

                      </td>

                      <td>

                        {
                          item.workingHours ||
                          0
                        }

                      </td>

                      <td>

                        <a
                          href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                        >

                          View

                        </a>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}