import {
  useEffect,
  useState
} from "react";

import "../../styles/dashboard.css";

import {
  getNotifications
} from "../../services/api";

export default function ManagerNotifications() {

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadNotifications();

  }, []);

  const loadNotifications =
    async () => {

      try {

        const data =
          await getNotifications();

        setNotifications(data);

      } catch (error) {

        console.error(
          "Failed to load notifications",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="analytics-page">

      <div className="analytics-header">

        <div className="analytics-tag">
          ALERT CENTER
        </div>

        <h1>
          Notifications
        </h1>

        <p className="analytics-subtitle">

          Monitor system alerts,
          employee updates,
          and operational activities.

        </p>

      </div>

      <div className="notification-list">

        {loading ? (

          <p>
            Loading notifications...
          </p>

        ) : (

          notifications.map(
            (item) => (

              <div
                key={item.id}
                className="notification-card"
              >

                <div className="notification-top">

                  <h3>
                    {item.title}
                  </h3>

                  <span>

                    {
                      item.createdAt
                    }

                  </span>

                </div>

                <p>
                  {item.message}
                </p>

                <div className="notification-footer">

                  <small>
                    {item.type}
                  </small>

                  {item.unread && (

                    <div className="notification-dot" />

                  )}

                </div>

              </div>
            )
          )

        )}

      </div>

    </div>
  );
}