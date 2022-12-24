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
import ChartTitle from "./ChartTitle";

function getData(data, collum_name) {
  let dataArr = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i][collum_name].length; j++)
      dataArr.push(data[i][collum_name][j]);
  }
  return div_item(dataArr);
}

function div_item(data){
  const div_itens = [];
  for(let i = 0; i < data.length; i++){
    let temp_i = 0;
    for(let j = 0; j < data[i].length; j++){
      if(data[i][j] === "/"){
        div_itens.push(data[i].slice(temp_i,j))
        temp_i = j+1;
        
      }
    }
    div_itens.push(data[i].slice(temp_i))
  }
  return courseCount(div_itens)
}

function courseCount(dataArr) {
  const fakeData = [];
  for (let i = 0; i < dataArr.length; i++) {
    let found = false;
    for (let j = 0; j < fakeData.length; j++) {
      if (dataArr[i] === fakeData[j].name) {
        fakeData[j].value++;
        found = true;
      }
    }
    if (!found && dataArr[i] !== "") fakeData.push({ name: dataArr[i], value: 1 });
  }
  return fakeData;
}

export const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#8884d8"];

const Barchart = ({ title, data }) => {
  const chartData = getData(data, "cursosDeFormacao");
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
            {data.map((entry, index) => (
              <Cell
                fill={barColors[index % 4] || "#8884d8"}
                key={`${entry}-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Barchart;