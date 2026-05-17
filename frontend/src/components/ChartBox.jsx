import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function ChartBox() {

  const data = [
    { name: "Mon", tasks: 4 },
    { name: "Tue", tasks: 7 },
    { name: "Wed", tasks: 5 },
    { name: "Thu", tasks: 9 },
    { name: "Fri", tasks: 6 },
    { name: "Sat", tasks: 8 },
    { name: "Sun", tasks: 3 },
  ];

  return (

    <div className="chartBox">

      <h2>Weekly Performance</h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          <XAxis dataKey="name" stroke="#cbd5e1" />

          <YAxis stroke="#cbd5e1" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#38bdf8"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ChartBox;