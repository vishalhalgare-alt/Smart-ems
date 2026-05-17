import {
  useEffect,
  useState,
  useCallback
} from "react";

import {
  getAllLeaves
} from "../../../services/api";

import LeaveStats from "./components/LeaveStats";
import LeaveTable from "./components/LeaveTable";

import "./styles/admin-leaves.css";

export default function LeaveRequests() {

  const [leaves, setLeaves] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  // =========================
  // LOAD LEAVES
  // =========================

  const loadLeaves = useCallback(
    async () => {

      setLoading(true);

      setError(null);

      try {

        const data =
          await getAllLeaves();

        setLeaves(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load leave requests"
        );

      } finally {

        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {

    loadLeaves();

  }, [loadLeaves]);

  // =========================
  // FILTER LEAVES
  // =========================

  const filteredLeaves =
    leaves.filter((leave) => {

      const matchesSearch =

        leave.employee?.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        leave.reason
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =

        statusFilter === "ALL" ||

        leave.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (

    <div className="leave-page">

      {/* =========================
          HEADER
      ========================== */}

      <div className="leave-header">

        <div>

          <p className="leave-tag">
            ADMIN WORKSPACE
          </p>

          <h1>
            Leave Requests
          </h1>

          <p className="leave-subtitle">
            Approve or reject leave requests
            and review employee leave
            activity across teams.
          </p>

        </div>

      </div>

      {/* =========================
          STATS
      ========================== */}

      <LeaveStats
        leaves={leaves}
      />

      {/* =========================
          FILTER CONTROLS
      ========================== */}

      <div className="leave-controls">

        <input
          type="text"
          placeholder="Search employee or reason..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="leave-search"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="leave-filter"
        >

          <option value="ALL">
            All Status
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="REJECTED">
            Rejected
          </option>

        </select>

      </div>

      {/* =========================
          ERROR STATE
      ========================== */}

      {
        error && (

          <div className="leave-error">
            {error}
          </div>

        )
      }

      {/* =========================
          LOADING STATE
      ========================== */}

      {
        loading && (

          <div className="leave-loading">
            Loading leave requests...
          </div>

        )
      }

      {/* =========================
          TABLE
      ========================== */}

      {
        !loading && (

          <LeaveTable
            leaves={filteredLeaves}
          />

        )
      }

    </div>
  );
}