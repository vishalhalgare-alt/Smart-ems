import { useState, useCallback, useEffect } from "react";
import { FaPlus, FaTrash, FaSearch, FaTimes } from "react-icons/fa";
import PageHeader from "../../components/common/PageHeader";
import { getAllEmployees, deleteEmployee, createEmployee } from "../../services/api";
import AddEmployeeModal from "../admin/components/AddEmployeeModal";
import "../admin/styles/admin-employees.css";

export default function ManagerEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Load employees from backend
  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllEmployees();
      console.log(data);
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load employees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Handle adding new employee
  const handleAddEmployee = async (formData) => {
    try {
      const newEmployee = await createEmployee(formData);
      setEmployees([...employees, newEmployee]);
      setShowAddModal(false);
      return { success: true };
    } catch (err) {
      console.error("Error adding employee:", err);
      return { success: false, error: err.message };
    }
  };

  // Handle deleting employee
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError("Failed to delete employee");
    }
  };

  // Extract departments for filter
  const departments = ["All", ...new Set(employees.map(emp => emp.skill || "Other"))];

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = searchTerm === "" || 
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id?.toString() === searchTerm;
    
    const matchesDept = departmentFilter === "All" || emp.skill === departmentFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <>
      <PageHeader 
        eyebrow="Manager Workspace"
        title="Team Employees"
        description="Manage and oversee your team members"
      />

      <div className="admin-employees-page">
        {/* Header with Add Button */}
        <div className="page-header-bar">
          <div className="header-info">
            <h2>Team Members</h2>
            <p>
              Total: <strong>{employees.length}</strong> employees
            </p>
          </div>
          <button 
            className="add-employee-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> Add Employee
          </button>
        </div>

        {/* Search and Filter */}
        <div className="controls-section">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="filter-wrapper">
            <label>Skill / Department:</label>
            <select 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="filter-select"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {(searchTerm || departmentFilter !== "All") && (
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSearchTerm("");
                setDepartmentFilter("All");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            Loading employees...
          </div>
        )}

        {/* Employees Table */}
        {!loading && filteredEmployees.length > 0 && (
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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role || "—"}</td>
                  <td>{emp.skill || "—"}</td>
                  <td>{emp.experience || "—"}</td>
                  <td>{emp.workload || "—"}%</td>
                  <td>
                    <span className="status-badge active">Active</span>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => setDeleteConfirm(emp.id)}
                      title="Delete employee"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* No Results */}
        {!loading && filteredEmployees.length === 0 && !error && (
          <div className="no-results">
            <p>No employees found</p>
          </div>
        )}

        {/* Footer */}
        <div className="table-footer">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <AddEmployeeModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddEmployee}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
