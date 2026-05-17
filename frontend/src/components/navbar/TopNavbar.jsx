import "./TopNavbar.css";

import {
  useState,
  useEffect,
  useRef
} from "react";

import {
  FaBell,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaSearch,
  FaSlidersH,
  FaSignOutAlt,
  FaUser,
  FaCamera,
  FaTimes,
  FaUpload,
} from "react-icons/fa";

const getInitials = (name = "Admin") =>

  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function TopNavbar({

  title = "Dashboard",

  eyebrow,

  userName = "Admin",

  searchValue = "",

  onSearchChange,

  onMenuClick,

}) {

  // =========================
  // STATES
  // =========================

  const [profilePhoto, setProfilePhoto] =
    useState(
      localStorage.getItem("profilePhoto") || null
    );

  const [showPhotoModal, setShowPhotoModal] =
    useState(false);

  const photoInputRef =
    useRef(null);

  // =========================
  // ROLE
  // =========================

  const role =
    localStorage.getItem("role");

  const eyebrowText =

    role === "MANAGER"

      ? "Manager Workspace"

      : "Admin Command Center";

  const roleLabel =

    role === "MANAGER"

      ? "Project Manager"

      : role === "EMPLOYEE"

        ? "Employee"

        : "Super Admin";

  // =========================
  // OTHER STATES
  // =========================

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const [showMessages, setShowMessages] =
    useState(false);

  // =========================
  // DARK MODE
  // =========================

  const [darkMode, setDarkMode] =
    useState(

      localStorage.getItem("theme")
      !==
      "light"
    );

  // =========================
  // REFS
  // =========================

  const notificationRef =
    useRef(null);

  const profileRef =
    useRef(null);

  const messageRef =
    useRef(null);

  const now =
    new Date();

  // =========================
  // APPLY THEME
  // =========================

  useEffect(() => {

    if (darkMode) {

      document.body.classList.remove(
        "light-mode"
      );

      document.body.classList.add(
        "dark-mode"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.body.classList.remove(
        "dark-mode"
      );

      document.body.classList.add(
        "light-mode"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }, [darkMode]);

  // =========================
  // CLOSE DROPDOWNS
  // =========================

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          notificationRef.current &&
          !notificationRef.current.contains(
            event.target
          )
        ) {

          setShowNotifications(false);
        }

        if (
          profileRef.current &&
          !profileRef.current.contains(
            event.target
          )
        ) {

          setShowProfileMenu(false);
        }

        if (
          messageRef.current &&
          !messageRef.current.contains(
            event.target
          )
        ) {

          setShowMessages(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.clear();

    window.location.href =
      "/login";
  };

  // =========================
  // PHOTO UPLOAD
  // =========================

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const photoData = event.target?.result;
      setProfilePhoto(photoData);
      localStorage.setItem("profilePhoto", photoData);
      setShowPhotoModal(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    localStorage.removeItem("profilePhoto");
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
    setShowPhotoModal(false);
  };

  // =========================
  // THEME
  // =========================

  const toggleTheme = () => {

    setDarkMode(!darkMode);

  };

  return (

    <header className="top-navbar">

      {/* LEFT */}

      <div className="top-navbar__title">

        <button
          className="top-navbar__menu"
          type="button"
          onClick={onMenuClick}
        >

          <FaSlidersH />

        </button>

        <div>

          <p>
            {
              eyebrow ||
              eyebrowText
            }
          </p>

          <h1>
            {title}
          </h1>

        </div>

      </div>

      {/* RIGHT */}

      <div className="top-navbar__actions">

        {/* SEARCH */}

        <label className="top-navbar__search">

          <FaSearch />

          <input
            value={searchValue}
            onChange={(e) =>
              onSearchChange?.(
                e.target.value
              )
            }
            placeholder="Search employees, projects, tasks..."
          />

        </label>

        {/* TIME */}

        <div className="top-navbar__time">

          <span>

            {
              now.toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                }
              )
            }

          </span>

          <strong>

            {
              now.toLocaleTimeString(
                "en-IN",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            }

          </strong>

        </div>

        {/* NOTIFICATION */}

        <div
          className="top-navbar__notification-wrapper"
          ref={notificationRef}
        >

          <button
            className="top-navbar__icon"
            type="button"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
          >

            <FaBell />

          </button>

          {showNotifications && (

            <div className="top-navbar__dropdown">

              <p>
                New employee joined
              </p>

              <p>
                Project deadline tomorrow
              </p>

              <p>
                Task completed
              </p>

            </div>

          )}

        </div>

        {/* MAIL */}

        <div
          className="top-navbar__notification-wrapper"
          ref={messageRef}
        >

          <button
            className="top-navbar__icon"
            type="button"
            onClick={() =>
              setShowMessages(
                !showMessages
              )
            }
          >

            <FaEnvelope />

          </button>

          {showMessages && (

            <div className="top-navbar__dropdown">

              <p>
                HR sent new mail
              </p>

              <p>
                Project update received
              </p>

              <p>
                Meeting at 4 PM
              </p>

            </div>

          )}

        </div>

        {/* THEME */}

        <button
          className="top-navbar__icon"
          type="button"
          onClick={toggleTheme}
        >

          {
            darkMode
              ? <FaSun />
              : <FaMoon />
          }

        </button>

        {/* PROFILE */}

        <div
          className="top-navbar__profile"
          ref={profileRef}
          onClick={() =>
            setShowProfileMenu(
              !showProfileMenu
            )
          }
        >

          <span 
            className="top-navbar__avatar"
            style={{
              backgroundImage: profilePhoto ? `url(${profilePhoto})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >

            {!profilePhoto && getInitials(userName)}

          </span>

          <div>

            <strong>
              {userName}
            </strong>

            <small>
              {roleLabel}
            </small>

          </div>

          {showProfileMenu && (

            <div className="top-navbar__dropdown">

              <button 
                className="dropdown-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPhotoModal(true);
                }}
              >

                <FaCamera />

                Change Photo

              </button>

              <button className="dropdown-btn">

                <FaUser />

                Profile

              </button>

              <button
                className="dropdown-btn"
                onClick={logout}
              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

      {/* PHOTO UPLOAD MODAL */}
      {showPhotoModal && (
        <div 
          className="photo-modal-overlay"
          onClick={() => setShowPhotoModal(false)}
        >
          <div 
            className="photo-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="photo-modal-header">
              <h3>Upload Profile Photo</h3>
              <button
                className="photo-modal-close"
                onClick={() => setShowPhotoModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="photo-modal-content">
              {profilePhoto && (
                <div className="photo-preview">
                  <img 
                    src={profilePhoto} 
                    alt="Profile"
                  />
                </div>
              )}

              <div className="photo-upload-area">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: "none" }}
                />
                <button
                  className="upload-btn"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <FaUpload />
                  Choose Photo
                </button>
              </div>

              {profilePhoto && (
                <button
                  className="remove-photo-btn"
                  onClick={handleRemovePhoto}
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}