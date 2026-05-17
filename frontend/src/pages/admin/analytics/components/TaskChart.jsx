import {
  useEffect,
  useState
} from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import {
  getDashboardStats
} from "../../../../services/api";

export default function TaskChart() {

  const [data, setData] =
    useState([]);

  // =========================
  // LOAD TASK STATS
  // =========================

  useEffect(() => {

    loadTaskData();

  }, []);

  const loadTaskData =
    async () => {

      try {

        const stats =
          await getDashboardStats();

        const chartData = [

          {
            name: "Completed",
            value:
              stats.completedTasks || 0
          },

          {
            name: "Pending",
            value:
              stats.pendingTasks || 0
          },

          {
            name: "Overdue",
            value:
              stats.overdueTasks || 0
          }
        ];

        // REMOVE ZERO VALUES

        const filteredData =
          chartData.filter(
            item => item.value > 0
          );

        setData(filteredData);

      } catch (error) {

        console.error(
          "Failed to load chart",
          error
        );
      }
    };

  // =========================
  // COLORS
  // =========================

  const COLORS = [

    "#10b981",
    "#f59e0b",
    "#ef4444"
  ];

  return (

    <div className="chart-box">

      <div className="chart-header">

        <h2>
          Task Distribution
        </h2>

      </div>

      {
        data.length === 0 ? (

          <div
            style={{
              height: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#94a3b8",
              fontSize: "18px"
            }}
          >

            No task data available

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >

                {
                  data.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />
                    )
                  )
                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>
        )
      }

    </div>
  );
}