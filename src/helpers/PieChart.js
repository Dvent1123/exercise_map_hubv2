import React, { useState } from "react";
import Chart from "react-apexcharts";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";

// @mui

// ----------------------------------------------------------------------
// SECONDARY LIGHT: #ffffff
// SECONDARY DARK: #9fb7c9
// color: "#1976d2"
// bgcolor: "#d1e9fc"

// ----------------------------------------------------------------------

export default function PieChart() {
  const [chartOptions, setChartOptions] = useState({
    //This is how many are unlocked
    series: [10, 2, 8, 1, 2],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [
        "Difficulty - 1",
        "Difficulty - 2",
        "Difficulty - 3",
        "Difficulty - 4",
        "Difficulty - 5",
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <Card
      sx={{
        py: 3,
        boxShadow: 0,
        textAlign: "center",
        color: "#ccc49c",
        bgcolor: "#fff7cd",
        borderRadius: 5,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardHeader title={"Exercises Unlocked"} subheader={"By Difficulty"} />
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="pie"
        width={380}
      />
    </Card>
  );
}
