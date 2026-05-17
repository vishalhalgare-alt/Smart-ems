import {
  useEffect,
  useState
} from "react";

import {
  Users,
  Briefcase,
  ClipboardCheck,
  TrendingUp
} from "lucide-react";

import {
  getAnalyticsData
} from "../../../../services/api";

import "../styles/analytics.css";

export default function AnalyticsCards() {

  const [stats, setStats] =
    useState({

      totalEmployees: 0,
      activeProjects: 0,
      completedTasks: 0,
      attendanceRate: 0
    });

  // =========================
  // LOAD ANALYTICS
  // =========================

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats =
    async () => {

      try {

        const data =
          await getAnalyticsData();

        console.log(data);

        setStats(data);

      } catch (error) {

        console.error(
          "Analytics load failed",
          error
        );
      }
    };

  // =========================
  // CARDS
  // =========================

  const cards = [

    {
      title: "Employees",

      value:
        stats.totalEmployees,

      subtitle:
        "Active workforce",

      icon:
        <Users size={28} />,

      colorClass:
        "blue"
    },

    {
      title: "Projects",

      value:
        stats.activeProjects,

      subtitle:
        "Running projects",

      icon:
        <Briefcase size={28} />,

      colorClass:
        "green"
    },

    {
      title: "Completed Tasks",

      value:
        stats.completedTasks,

      subtitle:
        "Tasks delivered",

      icon:
        <ClipboardCheck size={28} />,

      colorClass:
        "orange"
    },

    {
      title: "Growth Rate",

      value:
        `${stats.attendanceRate}%`,

      subtitle:
        "Monthly improvement",

      icon:
        <TrendingUp size={28} />,

      colorClass:
        "purple"
    }
  ];

  // =========================
  // UI
  // =========================

  return (

    <div className="analytics-cards-grid">

      {
        cards.map(

          (card, index) => (

            <div
              key={index}
              className="analytics-card"
            >

              <div
                className={`analytics-icon ${card.colorClass}`}
              >

                {card.icon}

              </div>

              <div>

                <h3>
                  {card.title}
                </h3>

                <h2>
                  {card.value}
                </h2>

                <p>
                  {card.subtitle}
                </p>

              </div>

            </div>
          )
        )
      }

    </div>
  );
}