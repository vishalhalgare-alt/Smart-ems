import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ProductivityChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="productivityFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45} />
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" />
        <XAxis dataKey="day" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(56,189,248,.2)", borderRadius: 8 }} />
        <Area type="monotone" dataKey="productive" stroke="#38bdf8" fill="url(#productivityFill)" strokeWidth={3} />
        <Line type="monotone" dataKey="focused" stroke="#a78bfa" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
