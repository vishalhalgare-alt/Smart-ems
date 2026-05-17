import { FaTrash } from "react-icons/fa";

function TaskTable({ tasks = [], deleteTask }) {

  return (

    <div className="tableBox">

      <h2>Recent Tasks</h2>

      {tasks.length === 0 ? (
        <p style={{ color: "#b0b7c3", textAlign: "center", padding: "20px" }}>
          No tasks available
        </p>
      ) : (
        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {tasks.slice(0, 5).map((task) => (

              <tr key={task.id}>

                <td>#{task.id}</td>

                <td>{task.title}</td>

                <td>

                  <span
                    className={
                      task.status === "DONE"
                        ? "done"
                        : task.status === "PENDING"
                        ? "pending"
                        : "progress"
                    }
                  >
                    {task.status === "IN_PROGRESS" ? "In Progress" : task.status === "DONE" ? "Done" : "Pending"}
                  </span>

                </td>

                <td>{task.priority}</td>

                <td>{task.employee?.name || "Unassigned"}</td>

                <td>

                  <button
                    className="deleteBtn"
                    onClick={() => deleteTask && deleteTask(task.id)}
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>

  );

}

export default TaskTable;