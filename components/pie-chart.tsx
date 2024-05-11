"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Props {
  data: { name: string; value: number }[];
  colors: string[];
}

const PieChartComponent = ({ data, colors }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
