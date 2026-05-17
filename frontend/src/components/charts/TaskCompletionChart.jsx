import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function TaskCompletionChart({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height={245}>
        <PieChart>
          <Pie data={data} innerRadius={62} outerRadius={92} dataKey="value" paddingAngle={5}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(56,189,248,.2)", borderRadius: 8 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="admin-chart-legend">
        {data.map((entry) => (
          <span key={entry.name}>
            <i style={{ background: entry.color }} />
            {entry.name}
          </span>
        ))}
      </div>
    </>
  );
}
