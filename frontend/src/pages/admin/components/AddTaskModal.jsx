import { useState } from "react";

import "./add-task-modal.css";

export default function AddTaskModal({
  isOpen,
  onClose,
  onSubmit
}) {

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "MEDIUM",
      status: "PENDING",
      dueDate: ""
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        await onSubmit(formData);

        setFormData({
          title: "",
          description: "",
          priority: "MEDIUM",
          status: "PENDING",
          dueDate: ""
        });

        onClose();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to create task"
        );

      } finally {

        setLoading(false);
      }
    };

  if (!isOpen) {
    return null;
  }

  return (

    <div className="modal-overlay">

      <div className="task-modal">

        <div className="modal-header">

          <div>

            <p className="modal-eyebrow">
              SMART TASK ENGINE
            </p>

            <h2>Create Task</h2>

          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="task-form"
        >

          <div className="form-group">

            <label>
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Docker Deployment"
              required
            />

          </div>

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              placeholder="Deploy backend on production server..."
              rows="4"
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>
                Priority
              </label>

              <select
                name="priority"
                value={
                  formData.priority
                }
                onChange={handleChange}
              >

                <option value="LOW">
                  LOW
                </option>

                <option value="MEDIUM">
                  MEDIUM
                </option>

                <option value="HIGH">
                  HIGH
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={
                  formData.dueDate
                }
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="ai-box">

            🤖 Employee will be
            auto-assigned using
            AI workload balancing.

          </div>

          <button
            type="submit"
            className="create-btn"
            disabled={loading}
          >

            {
              loading
                ? "Creating..."
                : "Create Task"
            }

          </button>

        </form>

      </div>

    </div>
  );
}