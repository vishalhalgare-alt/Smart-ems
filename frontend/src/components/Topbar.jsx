import {
  FaSearch,
  FaBell,
  FaMoon,
  FaSun,
  FaChevronDown
} from "react-icons/fa";

import { useState } from "react";

function Topbar() {

  const [darkMode, setDarkMode] = useState(true);

  const [showProfile, setShowProfile] = useState(false);

  const [search, setSearch] = useState("");

  const toggleTheme = () => {

    setDarkMode(!darkMode);

    document.body.classList.toggle("lightMode");

  };

  const handleSearch = (e) => {

    setSearch(e.target.value);

    console.log("Searching:", e.target.value);

  };

  return (

    <div className="topbar">

      <div>
        <h1>Manager Dashboard</h1>
        <p>Welcome back, Vishal 👋</p>
      </div>

      <div className="topbarRight">

        {/* SEARCH */}

        <div className="searchBox">

          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />

        </div>

        {/* NOTIFICATION */}

        <button
          className="iconBtn"
          onClick={() => alert("3 New Notifications")}
        >
          <FaBell />
        </button>

        {/* THEME */}

        <button
          className="iconBtn"
          onClick={toggleTheme}
        >
          {
            darkMode ? <FaMoon /> : <FaSun />
          }
        </button>

        {/* PROFILE */}

        <div
          className="profile profileWrapper"
          onClick={() => setShowProfile(!showProfile)}
        >

          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="profile"
          />

          <div>
            <h4>Vishal</h4>
            <p>Project Manager</p>
          </div>

          <FaChevronDown />

          {
            showProfile && (

              <div className="profileDropdown">

                <p>My Profile</p>
                <p>Settings</p>
                <p>Logout</p>

              </div>

            )
          }

        </div>

      </div>

    </div>

  );

}

export default Topbar;