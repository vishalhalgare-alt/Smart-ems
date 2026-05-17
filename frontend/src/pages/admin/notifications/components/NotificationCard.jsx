export default function NotificationCard({
  item
}) {

  return (

    <div className="notification-card">

      {/* TOP */}

      <div className="notification-top">

        <div className="notification-title-row">

          {
            item.unread && (
              <div className="notification-dot" />
            )
          }

          <h3>
            {item.title}
          </h3>

        </div>

        <span>

          {
            new Date(
              item.createdAt
            ).toLocaleString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              }
            )
          }

        </span>

      </div>

      {/* MESSAGE */}

      <p>
        {item.message}
      </p>

      {/* FOOTER */}

      <div className="notification-footer">

        <small>
          {item.type}
        </small>

      </div>

    </div>
  );
}