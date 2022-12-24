import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ChartTitle from "./ChartTitle";
import { barColors } from "./BarChart";

function getData(data, collum_name) {
  let dataArr = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i][collum_name].length; j++)
      dataArr.push(data[i][collum_name][j]);
  }
  return dataArr.filter(Boolean);
}

function languageCount(dataArr) {
  const languages = [
    { name: "Inglês", value: 0 },
    { name: "Espanhol", value: 0 },
    { name: "Alemão", value: 0 },
  ];
  for (let i = 0; i < dataArr.length; i++) {
    let found = false;
    for (let j = 0; j < languages.length; j++) {
      if (dataArr[i] === languages[j].name) {
        languages[j].value++;
        found = true;
      }
    }
    if (!found && dataArr[i] !== "") languages.push({ name: dataArr[i], value: 1 });
  }
  return languages.filter(l => l.value > 0);
}

const HorizontalBarchart = ({ title, data }) => {
  const chartData = languageCount(getData(data, "idioma"));
  return (
    <>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="99%" height="99%">
        <BarChart
          data={chartData}
          layout="vertical"
          barCategoryGap={12}
          margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" width={150} dataKey="name" />

          <Bar dataKey="value" fill="#8884d8" label={<CustomizedLabel />}>
            {chartData.map((entry, index) => (
              <Cell
                fill={barColors[index] || "#8884d8"}
                key={`${entry}-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const CustomizedLabel = ({ x, y, fill, value }) => (
  <text
    x={x + 70}
    y={y + 30}
    fontSize="16"
    fontFamily="sans-serif"
    fill={fill}
    textAnchor="end"
  >
    {value.toFixed(0)}
  </text>
);

export default HorizontalBarchart;
