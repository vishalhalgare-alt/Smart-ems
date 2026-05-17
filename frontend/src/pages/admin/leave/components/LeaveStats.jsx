export default function LeaveStats({
  leaves
}) {

  const total =
    leaves.length;

  const pending =
    leaves.filter(
      leave =>
        leave.status ===
        "PENDING"
    ).length;

  const approved =
    leaves.filter(
      leave =>
        leave.status ===
        "APPROVED"
    ).length;

  const rejected =
    leaves.filter(
      leave =>
        leave.status ===
        "REJECTED"
    ).length;

  return (

    <div className="leave-stats">

      <div className="leave-card">
        <h3>Total</h3>
        <h1>{total}</h1>
      </div>

      <div className="leave-card pending">
        <h3>Pending</h3>
        <h1>{pending}</h1>
      </div>

      <div className="leave-card approved">
        <h3>Approved</h3>
        <h1>{approved}</h1>
      </div>

      <div className="leave-card rejected">
        <h3>Rejected</h3>
        <h1>{rejected}</h1>
      </div>

    </div>
  );
}