import { useState, useEffect, useCallback } from "react";

import {
  getAllEmployees,
  deleteEmployee,
  createEmployee
} from "../../services/api";

import AddEmployeeModal from "./components/AddEmployeeModal";

import "./styles/admin-employees.css";

import { useSearchParams } from "react-router-dom";

export default function Employees() {

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [deleteConfirm, setDeleteConfirm] =
    useState(null);

  const [searchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] =
    useState(
      searchParams.get("add") === "true"
    );

  // =========================
  // LOAD EMPLOYEES
  // =========================

  const loadEmployees = useCallback(async () => {

    setLoading(true);

    setError(null);

    try {

      const data =
        await getAllEmployees();

      setEmployees(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      setError(
        "Failed to load employees"
      );

      console.error(err);

    } finally {

      setLoading(false);
    }

  }, []);

  useEffect(() => {

    loadEmployees();

  }, [loadEmployees]);

  // =========================
  // DELETE EMPLOYEE
  // =========================

  const handleDelete = async (id) => {

    try {

      await deleteEmployee(id);

      setEmployees(
        employees.filter(
          emp => emp.id !== id
        )
      );

      setDeleteConfirm(null);

    } catch (err) {

      setError(
        "Failed to delete employee"
      );

      console.error(err);
    }
  };

  // =========================
  // ADD EMPLOYEE
  // =========================

  const handleAddEmployee =
    async (formData) => {

      try {

        const newEmployee =
          await createEmployee(formData);

        setEmployees([
          ...employees,
          newEmployee
        ]);

        setIsModalOpen(false);

      } catch (err) {

        throw new Error(
          "Failed to add employee"
        );
      }
    };

  // =========================
  // FILTER EMPLOYEES
  // =========================

  const filteredEmployees =
    employees.filter(emp => {

      const matchesSearch =

        emp.name?.
          toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        emp.email
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        emp.id
          ?.toString()
          .includes(searchTerm);

      const matchesDept =

        departmentFilter === "All" ||

        emp.skill ===
          departmentFilter;

      return (
        matchesSearch &&
        matchesDept
      );
    });

  // =========================
  // DEPARTMENTS
  // =========================

  const departments = [

    "All",

    ...new Set(
      employees
        .map(emp => emp.skill)
        .filter(Boolean)
    )
  ];

  return (

    <div className="admin-page">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1>
            Employees
          </h1>

          <p>
            Manage employee profiles,
            skills, workload,
            and records
          </p>

        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center"
          }}
        >

          <button
            onClick={() =>
              setIsModalOpen(true)
            }
            className="add-employee-btn"
            title="Add new employee"
          >
            + Add Employee
          </button>

          <div
            style={{
              fontSize: "0.9rem",
              color: "#666"
            }}
          >

            Total:
            <strong>
              {" "}
              {employees.length}
            </strong>
            {" "}employees

          </div>

        </div>

      </div>

      {/* CONTROLS */}

      <div className="employee-controls">

        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="search-input"
        />

        <select
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(
              e.target.value
            )
          }
          className="filter-select"
        >

          {
            departments.map(dept => (

              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>

            ))
          }

        </select>

        <button
          onClick={loadEmployees}
          className="refresh-btn"
        >
          ↻ Refresh
        </button>

      </div>

      {/* ERROR */}

      {
        error && (

          <div className="error-message">

            <span>
              {error}
            </span>

            <button
              onClick={() =>
                setError(null)
              }
            >
              ✕
            </button>

          </div>

        )
      }

      {/* LOADING */}

      {
        loading && (

          <p
            style={{
              textAlign: "center",
              color: "#999"
            }}
          >
            Loading employees...
          </p>

        )
      }

      {/* TABLE */}

      {
        !loading && (

          <div className="table-container">

            {
              filteredEmployees.length === 0 ? (

                <div className="empty-state">

                  <p>
                    No employees found
                  </p>

                  {
                    (
                      searchTerm ||
                      departmentFilter !== "All"
                    ) && (

                      <button
                        onClick={() => {

                          setSearchTerm("");

                          setDepartmentFilter(
                            "All"
                          );
                        }}
                      >
                        Clear Filters
                      </button>

                    )
                  }

                </div>

              ) : (

                <table className="employees-table">

                  <thead>

                    <tr>

                      <th>ID</th>

                      <th>Name</th>

                      <th>Email</th>

                      <th>Role</th>

                      <th>Skill</th>

                      <th>Experience</th>

                      <th>Workload</th>

                      <th>Manager</th>

                      <th>Actions</th>

                    </tr>

                  </thead>

                  <tbody>

  {
    filteredEmployees.map(emp => (

      <tr key={emp.id}>

        <td className="mono">
          {emp.id}
        </td>

        <td className="employee-name">
          {emp.name || "—"}
        </td>

        <td className="mono">
          {emp.email || "—"}
        </td>

        <td>
          {emp.role || "—"}
        </td>

        <td>
          {emp.skill || "—"}
        </td>

        <td>
          {emp.experience || 0} Years
        </td>

        <td>
          {emp.workload || 0}
        </td>

        <td>
          {emp.manager?.name || "Not Assigned"}
        </td>

        <td className="actions">

          <button
            onClick={() =>
              setDeleteConfirm(
                emp.id
              )
            }
            className="delete-btn"
          >
            Delete
          </button>

          {
            deleteConfirm === emp.id && (

              <div className="confirm-dialog">

                <p>
                  Delete {emp.name}?
                </p>

                <button
                  onClick={() =>
                    handleDelete(emp.id)
                  }
                  className="confirm-yes"
                >
                  Yes
                </button>

                <button
                  onClick={() =>
                    setDeleteConfirm(null)
                  }
                  className="confirm-no"
                >
                  No
                </button>

              </div>

            )
          }

        </td>

      </tr>

    ))
  }

</tbody>

                </table>

              )
            }

          </div>

        )
      }

      {/* SUMMARY */}

      {
        !loading &&
        filteredEmployees.length > 0 && (

          <div className="results-summary">

            Showing {
              filteredEmployees.length
            } of {
              employees.length
            } employees

          </div>

        )
      }

      {/* MODAL */}

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSubmit={handleAddEmployee}
      />

    </div>
  );
}