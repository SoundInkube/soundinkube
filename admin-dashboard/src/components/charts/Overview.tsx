import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    total: 1200,
    revenue: 2400,
  },
  {
    name: 'Feb',
    total: 1900,
    revenue: 1398,
  },
  {
    name: 'Mar',
    total: 2800,
    revenue: 9800,
  },
  {
    name: 'Apr',
    total: 3908,
    revenue: 3908,
  },
  {
    name: 'May',
    total: 4800,
    revenue: 4800,
  },
  {
    name: 'Jun',
    total: 3800,
    revenue: 3800,
  },
  {
    name: 'Jul',
    total: 4300,
    revenue: 4300,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Bar
          dataKey="revenue"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}