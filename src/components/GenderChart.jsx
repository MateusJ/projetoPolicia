import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ChartTitle from "./ChartTitle";

function genderCount(data, colName = "sexo") {
  const gendersCount = [
    { name: "M", value: 0 },
    { name: "F", value: 0 },
  ];
  for (let i = 0; i < data.length; i++) {
    const gender = data[i][colName];
    if (gender.startsWith("M")) {
      gendersCount[0].value++;
    } else if (gender.startsWith("F")) {
      gendersCount[1].value++;
    }
  }
  return gendersCount;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const GenderChart = ({ title, data }) => {
  const chartData = genderCount(data);
  return (
    <>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="99%" height={300}>
        <PieChart onMouseEnter={() => {}}>
          <Pie
            data={chartData}
            cx={80}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default GenderChart;
