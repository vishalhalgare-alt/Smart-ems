export default function LeaveTable({
  leaves
}) {

  if (leaves.length === 0) {

    return (

      <div className="empty-box">
        No leave requests found.
      </div>

    );
  }

  return (

    <div className="leave-table-wrapper">

      <table className="leave-table">

        <thead>

          <tr>

            <th>ID</th>
            <th>Employee</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {
            leaves.map(leave => (

              <tr key={leave.id}>

                <td>
                  #{leave.id}
                </td>

                <td>
                  {
                    leave.employee?.name ||
                    "Unknown"
                  }
                </td>

                <td>
                  {leave.reason}
                </td>

                <td>
                  {leave.startDate}
                </td>

                <td>
                  {leave.endDate}
                </td>

                <td>

                  <span
                    className={`status-badge ${leave.status?.toLowerCase()}`}
                  >
                    {leave.status}
                  </span>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
}