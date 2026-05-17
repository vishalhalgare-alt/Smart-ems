import { useState } from "react";

export default function ProfileCard() {

  const name =
    localStorage.getItem("name") ||
    "Manager";

  const role =
    localStorage.getItem("role") ||
    "Project Manager";

  const [profilePhoto, setProfilePhoto] =
    useState(

      localStorage.getItem(
        "profilePhoto"
      ) ||

      "https://i.pravatar.cc/150"
    );

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend = () => {

        const image =
          reader.result;

        setProfilePhoto(image);

        localStorage.setItem(
          "profilePhoto",
          image
        );
      };

      reader.readAsDataURL(file);
    };

  return (

    <div className="profileCard">

      {/* IMAGE */}

      <label
        htmlFor="profileUpload"
        style={{
          cursor: "pointer"
        }}
      >

        <img
          src={profilePhoto}
          alt="Profile"
          className="profileImage"
        />

      </label>

      {/* HIDDEN INPUT */}

      <input
        type="file"
        id="profileUpload"
        accept="image/*"
        style={{
          display: "none"
        }}
        onChange={
          handleImageChange
        }
      />

      {/* INFO */}

      <h2>
        {name}
      </h2>

      <p>
        {role}
      </p>

    </div>
  );
}