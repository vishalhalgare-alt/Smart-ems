export default function AddLeaveModal({
  isOpen,
  onClose
}) {

  if (!isOpen) {
    return null;
  }

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
          Add Leave Request
        </h2>

        <input
          type="text"
          placeholder="Employee Name"
        />

        <input
          type="text"
          placeholder="Reason"
        />

        <input type="date" />

        <input type="date" />

        <select>

          <option>
            PENDING
          </option>

          <option>
            APPROVED
          </option>

          <option>
            REJECTED
          </option>

        </select>

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}