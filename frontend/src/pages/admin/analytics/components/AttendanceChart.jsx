import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip
} from "recharts";

export default function AttendanceChart() {

  const data = [

    { day: "Mon", attendance: 96 },

    { day: "Tue", attendance: 92 },

    { day: "Wed", attendance: 94 },

    { day: "Thu", attendance: 91 },

    { day: "Fri", attendance: 98 }
  ];

  return (

    <div className="chart-box">

      <div className="chart-header">

        <h2>
          Weekly Attendance
        </h2>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <XAxis dataKey="day" />

          <Tooltip />

          <Bar
            dataKey="attendance"
            fill="#10b981"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}