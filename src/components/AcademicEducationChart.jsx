import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { barColors } from "./BarChart";
import ChartTitle from "./ChartTitle";

function getData(data, collum_name) {
  let dataArr = [];
  for (let i = 0; i < data.length; i++) {
    dataArr.push(data[i][collum_name]);
  }
  return dataArr;
}

function coursesCount(dataArr) {
  const fakeData = [];
  for (let i = 0; i < dataArr.length; i++) {
    let found = false;
    for (let j = 0; j < fakeData.length; j++) {
      if (dataArr[i] === fakeData[j].name) {
        fakeData[j].value++;
        found = true;
      }
    }
    if (!found && dataArr[i] !== "" && dataArr[i] !== undefined)
      fakeData.push({ name: dataArr[i], value: 1 });
  }
  return fakeData;
}

const AcademicEducationChart = ({ title, data }) => {
  const chartData = coursesCount(getData(data, "formacao"));
  return (
    <>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="99%" height={300}>
        <BarChart
          width={500}
          height={150}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value">
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

export default AcademicEducationChart;
