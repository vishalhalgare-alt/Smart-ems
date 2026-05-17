import { useState } from "react";

export default function AddProjectModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    deadline: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add Project</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="manager"
            placeholder="Manager Name"
            value={formData.manager}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <div className="modal-actions">
            <button type="submit">
              Save Project
            </button>

            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}