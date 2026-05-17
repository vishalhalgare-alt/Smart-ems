import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Activity
} from "lucide-react";

export default function NotificationStats() {

  const cards = [

    {
      title: "Unread",
      value: 1,
      icon: <Bell size={20} />,
      color: "#3b82f6"
    },

    {
      title: "Critical",
      value: 1,
      icon: <AlertTriangle size={20} />,
      color: "#ef4444"
    },

    {
      title: "Resolved",
      value: 0,
      icon: <CheckCircle2 size={20} />,
      color: "#22c55e"
    },

    {
      title: "System Health",
      value: "Stable",
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
                  backgroundColor:
                    item.color
                }}
              >

                {item.icon}

              </div>

              <div className="notification-stat-content">

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