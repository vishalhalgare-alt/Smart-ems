import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function GrowthChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(56,189,248,.2)", borderRadius: 8 }} />
        <Line type="monotone" dataKey="employees" stroke="#22c55e" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
