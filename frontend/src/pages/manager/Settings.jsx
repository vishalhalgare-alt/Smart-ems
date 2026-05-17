import { useState } from "react";

import {
  FaUserCog,
  FaEnvelope,
  FaUserTie,
  FaLock,
  FaSave
} from "react-icons/fa";

export default function ManagerSettings() {

  // =========================
  // USER DATA
  // =========================

  const [name,
    setName] =
      useState(
        localStorage.getItem("name") ||
        "Manager"
      );

  const [email,
    setEmail] =
      useState(
        localStorage.getItem("email") ||
        "manager@gmail.com"
      );

  const role =
    localStorage.getItem("role") ||
    "MANAGER";

  // =========================
  // PASSWORD
  // =========================

  const [currentPassword,
    setCurrentPassword] =
      useState("");

  const [newPassword,
    setNewPassword] =
      useState("");

  const [confirmPassword,
    setConfirmPassword] =
      useState("");

  // =========================
  // SAVE PROFILE
  // =========================

  const saveProfile = () => {

    localStorage.setItem(
      "name",
      name
    );

    localStorage.setItem(
      "email",
      email
    );

    alert(
      "Profile updated successfully"
    );
  };

  // =========================
  // CHANGE PASSWORD
  // =========================

  const changePassword = (
    e
  ) => {

    e.preventDefault();

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      alert(
        "Please fill all password fields"
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    alert(
      "Password changed successfully"
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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

          <FaUserCog />

          Manager Settings

        </h1>

        <p
          style={{
            opacity: 0.9,
            fontSize: "17px"
          }}
        >

          Manage your account and security preferences

        </p>

      </div>

      {/* GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "25px"
        }}
      >

        {/* PROFILE */}

        <div
          style={{
            background:
              "#111827",
            padding: "30px",
            borderRadius: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.25)"
          }}
        >

          <h2
            style={{
              marginBottom: "25px",
              fontSize: "26px"
            }}
          >

            Profile Information

          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
          >

            {/* NAME */}

            <div>

              <label style={labelStyle}>

                <FaUserTie />

                Full Name

              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

            </div>

            {/* EMAIL */}

            <div>

              <label style={labelStyle}>

                <FaEnvelope />

                Email Address

              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

            </div>

            {/* ROLE */}

            <div>

              <label style={labelStyle}>

                <FaUserTie />

                Role

              </label>

              <input
                type="text"
                value={role}
                disabled
                style={{
                  ...inputStyle,
                  opacity: 0.7
                }}
              />

            </div>

            {/* SAVE */}

            <button
              onClick={saveProfile}
              style={buttonStyle}
            >

              <FaSave />

              Save Changes

            </button>

          </div>

        </div>

        {/* PASSWORD */}

        <div
          style={{
            background:
              "#111827",
            padding: "30px",
            borderRadius: "20px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.25)"
          }}
        >

          <h2
            style={{
              marginBottom: "25px",
              fontSize: "26px"
            }}
          >

            Change Password

          </h2>

          <form
            onSubmit={changePassword}
          >

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}
            >

              {/* CURRENT */}

              <div>

                <label style={labelStyle}>

                  <FaLock />

                  Current Password

                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

              </div>

              {/* NEW */}

              <div>

                <label style={labelStyle}>

                  <FaLock />

                  New Password

                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

              </div>

              {/* CONFIRM */}

              <div>

                <label style={labelStyle}>

                  <FaLock />

                  Confirm Password

                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                style={buttonStyle}
              >

                <FaSave />

                Update Password

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

// =========================
// STYLES
// =========================

const labelStyle = {

  display: "flex",

  alignItems: "center",

  gap: "10px",

  marginBottom: "10px",

  color: "#cbd5e1",

  fontWeight: "500"
};

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

  outline: "none"
};

const buttonStyle = {

  background:
    "linear-gradient(90deg,#667eea,#764ba2)",

  border: "none",

  color: "white",

  padding: "15px",

  borderRadius: "14px",

  fontSize: "16px",

  fontWeight: "600",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  gap: "10px"
};