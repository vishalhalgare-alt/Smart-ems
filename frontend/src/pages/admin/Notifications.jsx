import {
  useEffect,
  useState
} from "react";

import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Activity
} from "lucide-react";

import {
  getNotificationStats
} from "../../services/api";
import "./notifications/styles/notifications.css";

export default function NotificationStats() {

  const [stats, setStats] =
    useState({

      unread: 0,
      critical: 0,
      resolved: 0,
      systemHealth: "Stable"
    });

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats =
    async () => {

      try {

        const data =
          await getNotificationStats();

        setStats(data);

      } catch (error) {

        console.error(
          "Failed to load stats",
          error
        );
      }
    };

  const cards = [

    {
      title: "Unread",
      value: stats.unread,
      icon: <Bell size={20} />,
      color: "#3b82f6"
    },

    {
      title: "Critical",
      value: stats.critical,
      icon: <AlertTriangle size={20} />,
      color: "#ef4444"
    },

    {
      title: "Resolved",
      value: stats.resolved,
      icon: <CheckCircle2 size={20} />,
      color: "#22c55e"
    },

    {
      title: "System Health",
      value: stats.systemHealth,
      icon: <Activity size={20} />,
      color: "#8b5cf6"
    }

  ];

  return (

    <div className="notification-stats">

      <h3>
        Activity Summary
      </h3>

      <div className="notification-stats-grid">

        {
          cards.map((item, index) => (

            <div
              key={index}
              className="notification-stat-card"
            >

              <div
                className="notification-stat-icon"
                style={{
                  background:
                    item.color
                }}
              >

                {item.icon}

              </div>

              <div>

                <span>
                  {item.title}
                </span>

                <h2>
                  {item.value}
                </h2>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}