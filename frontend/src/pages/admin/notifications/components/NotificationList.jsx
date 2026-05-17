import {
  useEffect,
  useState
} from "react";

import NotificationCard
from "./NotificationCard";

import NotificationStats
from "./NotificationStats";

import {
  getNotifications
} from "../../../../services/api";

export default function NotificationList({

  activeFilter

}) {

  const [notifications, setNotifications] =
    useState([]);

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
      }
    };

  const filteredNotifications =

    notifications.filter((item) => {

      if (activeFilter === "All") {
        return true;
      }

      if (activeFilter === "Unread") {
        return item.unread;
      }

      return (
        item.type.toUpperCase()
        ===
        activeFilter.toUpperCase()
      );
    });

  return (

    <div className="notifications-layout">

      {/* LEFT */}

      <div className="notification-list">

        {
          filteredNotifications.map((item) => (

            <NotificationCard
              key={item.id}
              item={item}
            />

          ))
        }

      </div>

      {/* RIGHT */}

      <NotificationStats />

    </div>
  );
}