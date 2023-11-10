'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
  { name: 'Page H', uv: 450, pv: 2400, amt: 2400 },
  { name: 'Page I', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Page J', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Page K', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Page L', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Page M', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Page N', uv: 349, pv: 4300, amt: 2100 },
  { name: 'Page O', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page P', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Page Q', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Page R', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Page S', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Page T', uv: 239, pv: 3800, amt: 2500 },
]

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="99%">
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}
