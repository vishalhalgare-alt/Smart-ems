import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { login }
from "../services/api";

import "../styles/login.css";

export default function Login() {

  const [email,
    setEmail] =
      useState("");

  const [password,
    setPassword] =
      useState("");

  const [error,
    setError] =
      useState("");

  const [loading,
    setLoading] =
      useState(false);

  const navigate =
    useNavigate();

  // =========================
  // LOGIN
  // =========================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setError("");

      setLoading(true);

      try {

        const data =
          await login(
            email,
            password
          );

        // =========================
        // STORE USER DATA
        // =========================

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "id",
          data.id
        );

        localStorage.setItem(
          "email",
          data.email
        );

        localStorage.setItem(
          "name",
          data.name
        );

        localStorage.setItem(
          "role",
          data.role
        );

        // =========================
        // ROLE BASED REDIRECT
        // =========================

        if (
          data.role === "ADMIN"
        ) {

          navigate("/admin");

        } else if (
          data.role === "MANAGER"
        ) {

          navigate("/manager");

        } else if (
          data.role === "EMPLOYEE"
        ) {

          navigate("/employee");

        } else {

          navigate("/login");
        }

      } catch (err) {

        setError(

          err.message ||

          "Unable to connect to backend"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>
          Smart EMS Login
        </h2>

        {error && (

          <div className="error-message">

            {error}

          </div>
        )}

        <form
          onSubmit={handleLogin}
        >

          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter your email"
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Enter your password"
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        <p className="register-link">

          New user?

          {" "}

          <a href="#/register">

            Register here

          </a>

        </p>

      </div>

    </div>
  );
}