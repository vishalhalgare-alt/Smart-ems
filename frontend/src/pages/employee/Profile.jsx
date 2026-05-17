import { useState } from "react";

import {
  FaUserCircle
} from "react-icons/fa";

import "../../styles/dashboard.css";

export default function Profile() {

  const name =
    localStorage.getItem("name") ||
    "Employee";

  const email =
    localStorage.getItem("email") ||
    "employee@gmail.com";

  const role =
    localStorage.getItem("role") ||
    "EMPLOYEE";

  const [profilePhoto, setProfilePhoto] =
    useState(

      localStorage.getItem("profilePhoto") ||

      "https://i.pravatar.cc/300"
    );

  // =========================
  // CHANGE IMAGE
  // =========================

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      localStorage.setItem(
        "profilePhoto",
        reader.result
      );

      setProfilePhoto(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  return (

  <div className="emp-container">

    <div className="emp-navbar">

      <div>

        <h1>
          <FaUserCircle />
          My Profile
        </h1>

        <p>
          Employee Profile Information
        </p>

      </div>

    </div>

    <div className="emp-main">

      <div
        className="profile-card"
        style={{
          width: "400px",
          margin: "40px auto",
          background: "#111827",
          padding: "30px",
          borderRadius: "20px",
          color: "white"
        }}
      >

        {/* IMAGE */}

        <div style={{ textAlign: "center" }}>

          <img
            src={profilePhoto}
            alt="Profile"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #3b82f6",
              display: "block",
              margin: "0 auto 20px auto"
            }}
          />

          <label
            style={{
              background: "#2563eb",
              color: "white",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "inline-block",
              marginBottom: "25px"
            }}
          >

            Change Photo

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

          </label>

        </div>

        {/* NAME */}

        <div className="profile-row">

          <strong>Name:</strong>

          <span>{name}</span>

        </div>

        {/* EMAIL */}

        <div className="profile-row">

          <strong>Email:</strong>

          <span>{email}</span>

        </div>

        {/* ROLE */}

        <div className="profile-row">

          <strong>Role:</strong>

          <span>{role}</span>

        </div>

      </div>

    </div>

  </div>
);
}